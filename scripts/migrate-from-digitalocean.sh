#!/bin/bash

################################################################################
# AEQUITAS PROTOCOL - Migrate Scripts from DigitalOcean to Sovereign
#
# Updates all hardcoded DigitalOcean IP references in scripts to use
# environment variables for sovereign infrastructure deployment
#
# Usage:
#   ./scripts/migrate-from-digitalocean.sh
#   ./scripts/migrate-from-digitalocean.sh --dry-run  # Preview changes only
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DRY_RUN=${1:-""}
OLD_IP="159.203.92.230"
BACKUP_DIR="$PROJECT_ROOT/.backup-$(date +%Y%m%d_%H%M%S)"

echo -e "${CYAN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║    AEQUITAS PROTOCOL - MIGRATE FROM DIGITALOCEAN TO SOVEREIGN    ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"
echo ""

################################################################################
# FIND FILES WITH HARDCODED IPS
################################################################################

find_hardcoded_ips() {
    echo -e "${BLUE}[1/4] Scanning for hardcoded DigitalOcean IPs...${NC}"
    echo ""
    
    # Find all files with the old IP
    FILES_WITH_IP=$(grep -rl "$OLD_IP" "$SCRIPT_DIR" 2>/dev/null || echo "")
    
    if [ -z "$FILES_WITH_IP" ]; then
        echo -e "${GREEN}✓ No hardcoded IPs found in scripts directory${NC}"
        return 0
    fi
    
    echo -e "${YELLOW}Found hardcoded IP ($OLD_IP) in:${NC}"
    for file in $FILES_WITH_IP; do
        count=$(grep -c "$OLD_IP" "$file" || echo "0")
        echo -e "  ${CYAN}$file${NC} ($count occurrences)"
    done
    echo ""
    
    return 1
}

################################################################################
# CREATE BACKUP
################################################################################

create_backup() {
    echo -e "${BLUE}[2/4] Creating backup...${NC}"
    
    if [ "$DRY_RUN" = "--dry-run" ]; then
        echo -e "${YELLOW}Dry run - skipping backup${NC}"
        return
    fi
    
    mkdir -p "$BACKUP_DIR"
    
    for file in $FILES_WITH_IP; do
        cp "$file" "$BACKUP_DIR/"
    done
    
    echo -e "${GREEN}✓ Backup created at: $BACKUP_DIR${NC}"
    echo ""
}

################################################################################
# UPDATE SCRIPTS
################################################################################

update_scripts() {
    echo -e "${BLUE}[3/4] Updating scripts to use environment variables...${NC}"
    echo ""
    
    if [ "$DRY_RUN" = "--dry-run" ]; then
        echo -e "${YELLOW}Dry run - showing what would be changed:${NC}"
        echo ""
        for file in $FILES_WITH_IP; do
            echo -e "${CYAN}File: $file${NC}"
            grep -n "$OLD_IP" "$file" | head -5
            echo ""
        done
        return
    fi
    
    # Update each file
    for file in $FILES_WITH_IP; do
        echo -e "${YELLOW}Updating: $file${NC}"
        
        # Replace hardcoded IP with environment variable reference
        # Strategy: Replace "159.203.92.230" with ${PRIMARY_IP:-159.203.92.230} for backwards compatibility
        sed -i "s/$OLD_IP/\${PRIMARY_IP:-$OLD_IP}/g" "$file"
        
        # Check if file has IP variable declaration, add if not
        if ! grep -q 'PRIMARY_IP=' "$file" && ! grep -q 'DROPLET_IP=' "$file"; then
            # Add IP variable at the top of config section
            if grep -q '# Configuration' "$file"; then
                sed -i '/# Configuration/a\PRIMARY_IP="${PRIMARY_IP:-}"  # Set via environment for sovereign deployment' "$file"
            fi
        fi
        
        echo -e "${GREEN}  ✓ Updated${NC}"
    done
    
    echo ""
}

################################################################################
# SHOW SUMMARY
################################################################################

show_summary() {
    echo -e "${BLUE}[4/4] Migration summary...${NC}"
    echo ""
    
    if [ "$DRY_RUN" = "--dry-run" ]; then
        echo -e "${YELLOW}This was a dry run. No files were modified.${NC}"
        echo -e "${YELLOW}Run without --dry-run to apply changes.${NC}"
        echo ""
        return
    fi
    
    echo -e "${GREEN}"
    cat << "EOF"
═══════════════════════════════════════════════════════════════════
                 MIGRATION COMPLETE!
═══════════════════════════════════════════════════════════════════
EOF
    echo -e "${NC}"
    
    echo -e "${CYAN}What was done:${NC}"
    echo "  - Replaced hardcoded IP ($OLD_IP) with environment variable"
    echo "  - Scripts now use \${PRIMARY_IP:-$OLD_IP}"
    echo "  - Backwards compatible with existing deployments"
    echo ""
    
    echo -e "${CYAN}To use sovereign infrastructure:${NC}"
    echo "  export PRIMARY_IP=\"your-sovereign-ip\""
    echo "  ./scripts/update-dns-ace-avm.sh"
    echo ""
    
    echo -e "${CYAN}To keep using DigitalOcean (legacy):${NC}"
    echo "  # No changes needed - scripts default to old IP"
    echo ""
    
    echo -e "${CYAN}Backup location:${NC}"
    echo "  $BACKUP_DIR"
    echo ""
    
    echo -e "${GREEN}Your scripts are now infrastructure-agnostic! 🚀${NC}"
    echo ""
}

################################################################################
# MAIN EXECUTION
################################################################################

main() {
    # Find files with hardcoded IPs
    if find_hardcoded_ips; then
        echo -e "${GREEN}No migration needed - scripts are already clean.${NC}"
        exit 0
    fi
    
    create_backup
    update_scripts
    show_summary
}

main "$@"
