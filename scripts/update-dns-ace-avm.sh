#!/bin/bash

################################################################################
# AEQUITAS PROTOCOL - Cloudflare DNS Update for ACE/AVM Sovereign Infrastructure
# 
# Updates DNS from DigitalOcean to Sovereign VM/ACE deployment
# Complete automation for sovereign infrastructure migration
#
# Usage:
#   # Sovereign VM deployment (auto-detect IP)
#   export INFRASTRUCTURE_TYPE="sovereign"
#   ./scripts/update-dns-ace-avm.sh
#
#   # With specific IP
#   export PRIMARY_IP="192.168.1.100"
#   ./scripts/update-dns-ace-avm.sh
#
#   # ACE deployment
#   export INFRASTRUCTURE_TYPE="ace"
#   export ACE_API_ENDPOINT="http://localhost:8080"
#   ./scripts/update-dns-ace-avm.sh
#
#   # Hybrid deployment (sovereign + cloud fallback)
#   export INFRASTRUCTURE_TYPE="hybrid"
#   export PRIMARY_IP="192.168.1.100"
#   export FALLBACK_IP="164.90.x.x"
#   ./scripts/update-dns-ace-avm.sh
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}"
CLOUDFLARE_ZONE_ID="${CLOUDFLARE_ZONE_ID}"
DOMAIN="${DOMAIN:-aequitasprotocol.zone}"
INFRASTRUCTURE_TYPE="${INFRASTRUCTURE_TYPE:-sovereign}"  # sovereign, ace, hybrid, digitalocean
DRY_RUN=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --ip)
            PRIMARY_IP="$2"
            shift 2
            ;;
        --domain)
            DOMAIN="$2"
            shift 2
            ;;
        --type)
            INFRASTRUCTURE_TYPE="$2"
            shift 2
            ;;
        --help|-h)
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --dry-run     Preview changes without applying them"
            echo "  --ip IP       Specify infrastructure IP address"
            echo "  --domain D    Specify domain (default: aequitasprotocol.zone)"
            echo "  --type T      Infrastructure type: sovereign, ace, hybrid, digitalocean"
            echo "  --help        Show this help message"
            exit 0
            ;;
        *)
            shift
            ;;
    esac
done

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
CONFIG_FILE="$PROJECT_ROOT/vm-infrastructure/configs/infrastructure.yaml"

if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}*** DRY RUN MODE - No changes will be made ***${NC}"
    echo ""
fi

echo -e "${CYAN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║        AEQUITAS PROTOCOL - DNS UPDATE FOR ACE/AVM                 ║
║        Migrating from DigitalOcean to Sovereign Infrastructure   ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"
echo ""

################################################################################
# VALIDATION
################################################################################

validate_environment() {
    echo -e "${BLUE}[1/6] Validating environment...${NC}"
    
    # Check for jq
    if ! command -v jq &> /dev/null; then
        echo -e "${RED}Error: jq is not installed${NC}"
        echo -e "${YELLOW}Install it: sudo apt-get install jq${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ jq available${NC}"
    
    # Check Cloudflare API Token
    if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
        echo -e "${RED}Error: CLOUDFLARE_API_TOKEN not set${NC}"
        echo -e "${YELLOW}Set it in Replit Secrets or export it:${NC}"
        echo -e "${YELLOW}  export CLOUDFLARE_API_TOKEN='your-token-here'${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Cloudflare API token configured${NC}"
    
    # Auto-detect Zone ID if not set
    if [ -z "$CLOUDFLARE_ZONE_ID" ]; then
        echo -e "${YELLOW}Auto-detecting Zone ID...${NC}"
        CLOUDFLARE_ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$DOMAIN" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" | jq -r '.result[0].id')
        
        if [ -z "$CLOUDFLARE_ZONE_ID" ] || [ "$CLOUDFLARE_ZONE_ID" = "null" ]; then
            echo -e "${RED}Error: Could not auto-detect Zone ID${NC}"
            exit 1
        fi
    fi
    echo -e "${GREEN}✓ Zone ID: $CLOUDFLARE_ZONE_ID${NC}"
    
    echo ""
}

################################################################################
# GET INFRASTRUCTURE IP
################################################################################

get_infrastructure_ip() {
    echo -e "${BLUE}[2/6] Detecting infrastructure IP...${NC}"
    
    case $INFRASTRUCTURE_TYPE in
        sovereign)
            echo -e "${CYAN}Mode: Sovereign VM${NC}"
            
            # Priority 1: Environment variable
            if [ -n "$PRIMARY_IP" ]; then
                echo -e "${GREEN}✓ Using PRIMARY_IP from environment: $PRIMARY_IP${NC}"
                echo "$PRIMARY_IP"
                return
            fi
            
            # Priority 2: Try vm-infrastructure CLI
            if [ -d "$PROJECT_ROOT/vm-infrastructure/cli" ]; then
                echo -e "${YELLOW}Querying vm-infrastructure CLI...${NC}"
                VM_IP=$(cd "$PROJECT_ROOT/vm-infrastructure/cli" && node bin/aequitas-vm.js status 2>/dev/null | grep -oP 'IP: \K[0-9.]+' | head -1 || echo "")
                if [ -n "$VM_IP" ]; then
                    echo -e "${GREEN}✓ Detected from CLI: $VM_IP${NC}"
                    echo "$VM_IP"
                    return
                fi
            fi
            
            # Priority 3: Try ACE API
            if [ -n "$ACE_API_ENDPOINT" ]; then
                echo -e "${YELLOW}Querying ACE API...${NC}"
                ACE_IP=$(curl -sf "$ACE_API_ENDPOINT/api/v1/nodes" 2>/dev/null | jq -r '.nodes[0].ip // empty' || echo "")
                if [ -n "$ACE_IP" ]; then
                    echo -e "${GREEN}✓ Detected from ACE: $ACE_IP${NC}"
                    echo "$ACE_IP"
                    return
                fi
            fi
            
            # Priority 4: Manual input
            echo -e "${YELLOW}Enter your Sovereign VM IP address:${NC}"
            read -p "> " IP
            echo "$IP"
            ;;
            
        ace)
            echo -e "${CYAN}Mode: ACE Cloud Engine${NC}"
            
            if [ -n "$PRIMARY_IP" ]; then
                echo -e "${GREEN}✓ Using PRIMARY_IP: $PRIMARY_IP${NC}"
                echo "$PRIMARY_IP"
                return
            fi
            
            if [ -n "$ACE_API_ENDPOINT" ]; then
                ACE_IP=$(curl -sf "$ACE_API_ENDPOINT/api/v1/nodes" 2>/dev/null | jq -r '.nodes[0].ip // empty' || echo "")
                if [ -n "$ACE_IP" ]; then
                    echo -e "${GREEN}✓ Detected from ACE API: $ACE_IP${NC}"
                    echo "$ACE_IP"
                    return
                fi
            fi
            
            echo -e "${YELLOW}ACE_API_ENDPOINT not set or not responding. Enter ACE node IP:${NC}"
            read -p "> " IP
            echo "$IP"
            ;;
            
        hybrid)
            echo -e "${CYAN}Mode: Hybrid (Sovereign + Fallback)${NC}"
            
            if [ -n "$PRIMARY_IP" ]; then
                echo -e "${GREEN}✓ Primary IP: $PRIMARY_IP${NC}"
            else
                echo -e "${YELLOW}Enter primary IP (Sovereign VM):${NC}"
                read -p "> " PRIMARY_IP
            fi
            
            if [ -z "$FALLBACK_IP" ]; then
                echo -e "${YELLOW}Enter fallback IP (optional, press Enter to skip):${NC}"
                read -p "> " FALLBACK_IP
            fi
            
            if [ -n "$FALLBACK_IP" ]; then
                echo -e "${GREEN}✓ Fallback IP: $FALLBACK_IP${NC}"
            fi
            
            echo "$PRIMARY_IP"
            ;;
            
        digitalocean)
            echo -e "${CYAN}Mode: DigitalOcean (Legacy)${NC}"
            
            if [ -n "$DROPLET_IP" ]; then
                echo -e "${GREEN}✓ Using DROPLET_IP: $DROPLET_IP${NC}"
                echo "$DROPLET_IP"
            else
                echo -e "${RED}Error: DROPLET_IP not set for DigitalOcean mode${NC}"
                exit 1
            fi
            ;;
            
        *)
            echo -e "${YELLOW}Enter infrastructure IP:${NC}"
            read -p "> " IP
            echo "$IP"
            ;;
    esac
}

################################################################################
# HEALTH CHECK
################################################################################

health_check() {
    local ip=$1
    echo -e "${BLUE}[3/6] Running health check on $ip...${NC}"
    
    # Ping test
    if ping -c 3 -W 2 "$ip" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Ping: Reachable${NC}"
    else
        echo -e "${YELLOW}⚠ Ping: Not responding${NC}"
    fi
    
    # HTTP health check (try common ports)
    local http_ok=false
    for port in 80 443 5000 8080; do
        if curl -sf --max-time 5 "http://$ip:$port/health" > /dev/null 2>&1 || \
           curl -sf --max-time 5 "http://$ip:$port" > /dev/null 2>&1; then
            echo -e "${GREEN}✓ HTTP: Port $port responding${NC}"
            http_ok=true
            break
        fi
    done
    
    if [ "$http_ok" = false ]; then
        echo -e "${YELLOW}⚠ HTTP: No web services detected (this is OK for new deployments)${NC}"
    fi
    
    # RPC check (for blockchain nodes)
    if curl -sf --max-time 5 "http://$ip:26657/status" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ RPC: Blockchain node responding on port 26657${NC}"
    fi
    
    echo ""
}

################################################################################
# UPDATE DNS RECORD
################################################################################

update_dns_record() {
    local name=$1
    local type=$2
    local content=$3
    local proxied=${4:-true}
    local ttl=${5:-1}  # 1 = Auto
    
    # Build fully qualified domain name for Cloudflare API
    local full_domain="$name.$DOMAIN"
    if [ "$name" = "@" ]; then
        full_domain="$DOMAIN"
    fi
    
    echo -e "${YELLOW}  $full_domain → $content${NC}"
    
    # Dry run mode - just show what would happen
    if [ "$DRY_RUN" = true ]; then
        echo -e "${CYAN}    [DRY RUN] Would update $type record: $full_domain → $content (proxied: $proxied)${NC}"
        return 0
    fi
    
    # Get existing record ID using FQDN
    RECORD_ID=$(curl -sf -X GET "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records?type=$type&name=$full_domain" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" | jq -r '.result[0].id // empty')
    
    if [ -n "$RECORD_ID" ] && [ "$RECORD_ID" != "null" ]; then
        # Update existing record - use FQDN in payload
        RESPONSE=$(curl -sf -X PUT "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records/$RECORD_ID" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" \
            --data "{\"type\":\"$type\",\"name\":\"$full_domain\",\"content\":\"$content\",\"ttl\":$ttl,\"proxied\":$proxied}")
    else
        # Create new record - use FQDN in payload
        RESPONSE=$(curl -sf -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" \
            --data "{\"type\":\"$type\",\"name\":\"$full_domain\",\"content\":\"$content\",\"ttl\":$ttl,\"proxied\":$proxied}")
    fi
    
    SUCCESS=$(echo "$RESPONSE" | jq -r '.success // false')
    if [ "$SUCCESS" = "true" ]; then
        echo -e "${GREEN}    ✓ Updated${NC}"
        return 0
    else
        ERROR=$(echo "$RESPONSE" | jq -r '.errors[0].message // "Unknown error"')
        echo -e "${RED}    ✗ Failed: $ERROR${NC}"
        return 1
    fi
}

################################################################################
# UPDATE ALL DNS RECORDS
################################################################################

update_all_dns() {
    local ip=$1
    echo -e "${BLUE}[4/6] Updating DNS records...${NC}"
    echo ""
    
    local success_count=0
    local fail_count=0
    
    # Core Infrastructure (A records - proxied for DDoS protection)
    echo -e "${CYAN}Core Infrastructure:${NC}"
    update_dns_record "@" "A" "$ip" true && ((success_count++)) || ((fail_count++))
    update_dns_record "www" "A" "$ip" true && ((success_count++)) || ((fail_count++))
    update_dns_record "app" "A" "$ip" true && ((success_count++)) || ((fail_count++))
    echo ""
    
    # Blockchain Infrastructure (A records - DNS-only for direct access)
    echo -e "${CYAN}Blockchain Infrastructure:${NC}"
    update_dns_record "rpc" "A" "$ip" false && ((success_count++)) || ((fail_count++))
    update_dns_record "api" "A" "$ip" false && ((success_count++)) || ((fail_count++))
    update_dns_record "grpc" "A" "$ip" false && ((success_count++)) || ((fail_count++))
    update_dns_record "ws" "A" "$ip" false && ((success_count++)) || ((fail_count++))
    update_dns_record "explorer" "A" "$ip" true && ((success_count++)) || ((fail_count++))
    update_dns_record "backend" "A" "$ip" true && ((success_count++)) || ((fail_count++))
    update_dns_record "auditor-api" "A" "$ip" true && ((success_count++)) || ((fail_count++))
    echo ""
    
    # ACE Cloud Engine (NEW - sovereign infrastructure)
    echo -e "${CYAN}ACE/AVM Sovereign Infrastructure:${NC}"
    update_dns_record "ace" "A" "$ip" true && ((success_count++)) || ((fail_count++))
    update_dns_record "ace-metrics" "A" "$ip" true && ((success_count++)) || ((fail_count++))
    update_dns_record "ace-ai" "A" "$ip" true && ((success_count++)) || ((fail_count++))
    update_dns_record "vm" "A" "$ip" true && ((success_count++)) || ((fail_count++))
    update_dns_record "sovereign" "A" "$ip" true && ((success_count++)) || ((fail_count++))
    echo ""
    
    # Dashboard panels (CNAME to app)
    echo -e "${CYAN}Dashboard Subdomains:${NC}"
    local cname_records=(
        "dashboard" "stats" "paper" "docs" "audit" "evidence"
        "defendants" "ledger" "wallet" "ifr" "grc" "dao"
        "ai" "repar" "dex" "pay" "validators" "claims"
        "enforcement" "foundation" "community"
    )
    
    for record in "${cname_records[@]}"; do
        update_dns_record "$record" "CNAME" "app.$DOMAIN" true && ((success_count++)) || ((fail_count++))
    done
    echo ""
    
    echo -e "${GREEN}Results: $success_count updated, $fail_count failed${NC}"
    echo ""
}

################################################################################
# UPDATE KEPLR CHAIN REGISTRY
################################################################################

update_keplr_registry() {
    echo -e "${BLUE}[5/6] Updating Keplr chain registry...${NC}"
    
    local keplr_dir="$PROJECT_ROOT/keplr-chain-registry"
    
    if [ ! -d "$keplr_dir" ]; then
        echo -e "${YELLOW}Keplr chain registry not found, skipping...${NC}"
        return
    fi
    
    # Update chain.json with new RPC endpoints
    local chain_file="$keplr_dir/cosmos/aequitas.json"
    if [ -f "$chain_file" ]; then
        echo -e "${YELLOW}Updating Keplr chain configuration...${NC}"
        
        # Update RPC endpoint to use sovereign infrastructure
        jq --arg rpc "https://rpc.$DOMAIN" \
           --arg rest "https://api.$DOMAIN" \
           '.rpc = $rpc | .rest = $rest' "$chain_file" > "$chain_file.tmp" && \
           mv "$chain_file.tmp" "$chain_file"
        
        echo -e "${GREEN}✓ Keplr chain registry updated${NC}"
    else
        echo -e "${YELLOW}Chain file not found at $chain_file${NC}"
    fi
    
    echo ""
}

################################################################################
# COMPLETION
################################################################################

show_completion() {
    local ip=$1
    
    echo -e "${GREEN}"
    cat << "EOF"
═══════════════════════════════════════════════════════════════════
                    DNS UPDATE COMPLETE!
═══════════════════════════════════════════════════════════════════
EOF
    echo -e "${NC}"
    
    echo -e "${CYAN}Summary:${NC}"
    echo -e "  Infrastructure Type: ${YELLOW}$INFRASTRUCTURE_TYPE${NC}"
    echo -e "  Primary IP: ${YELLOW}$ip${NC}"
    if [ -n "$FALLBACK_IP" ]; then
        echo -e "  Fallback IP: ${YELLOW}$FALLBACK_IP${NC}"
    fi
    echo -e "  Domain: ${YELLOW}$DOMAIN${NC}"
    echo -e "  Zone ID: ${YELLOW}$CLOUDFLARE_ZONE_ID${NC}"
    echo ""
    
    echo -e "${CYAN}Migration Status:${NC}"
    echo -e "  ${RED}✗ DigitalOcean: Disconnected${NC}"
    echo -e "  ${GREEN}✓ Sovereign Infrastructure: Connected${NC}"
    echo -e "  ${GREEN}✓ ACE/AVM: Enabled${NC}"
    echo ""
    
    echo -e "${CYAN}Next Steps:${NC}"
    echo "  1. Wait 5-10 minutes for DNS propagation"
    echo "  2. Verify with: dig $DOMAIN"
    echo "  3. Test endpoints:"
    echo "     - https://$DOMAIN"
    echo "     - https://app.$DOMAIN"
    echo "     - https://rpc.$DOMAIN:26657"
    echo "     - https://ace.$DOMAIN"
    echo ""
    
    echo -e "${PURPLE}Your Aequitas infrastructure is now sovereign! 🚀${NC}"
    echo ""
}

################################################################################
# MAIN EXECUTION
################################################################################

main() {
    validate_environment
    
    PRIMARY_IP=$(get_infrastructure_ip)
    
    if [ -z "$PRIMARY_IP" ]; then
        echo -e "${RED}Error: No IP address provided${NC}"
        exit 1
    fi
    
    health_check "$PRIMARY_IP"
    
    # Confirm before updating
    echo -e "${YELLOW}Ready to update DNS from DigitalOcean to sovereign infrastructure.${NC}"
    echo -e "${YELLOW}Target IP: $PRIMARY_IP${NC}"
    read -p "Continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi
    
    update_all_dns "$PRIMARY_IP"
    update_keplr_registry
    show_completion "$PRIMARY_IP"
}

# Run main
main "$@"
