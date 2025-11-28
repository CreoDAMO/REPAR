#!/bin/bash

################################################################################
# AEQUITAS PROTOCOL - ACE CLI Integration for Sovereign Node Management
#
# Provides unified CLI interface for ACE (Aequitas Cloud Engine) operations
# Integrates with vm-infrastructure CLI for sovereign node management
#
# Usage:
#   ./scripts/ace-cli-integration.sh status
#   ./scripts/ace-cli-integration.sh deploy
#   ./scripts/ace-cli-integration.sh update-dns
#   ./scripts/ace-cli-integration.sh health
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
VM_CLI="$PROJECT_ROOT/vm-infrastructure/cli"
ACE_API="${ACE_API_ENDPOINT:-http://localhost:8080}"
CONFIG_FILE="$PROJECT_ROOT/vm-infrastructure/configs/infrastructure.yaml"

# Command
COMMAND=${1:-"help"}
shift 2>/dev/null || true

################################################################################
# BANNER
################################################################################

show_banner() {
    echo -e "${CYAN}"
    cat << "EOF"
    ╔═══════════════════════════════════════════════════════════════════╗
    ║                                                                   ║
    ║          █████╗  ██████╗███████╗     ██████╗██╗     ██╗          ║
    ║         ██╔══██╗██╔════╝██╔════╝    ██╔════╝██║     ██║          ║
    ║         ███████║██║     █████╗      ██║     ██║     ██║          ║
    ║         ██╔══██║██║     ██╔══╝      ██║     ██║     ██║          ║
    ║         ██║  ██║╚██████╗███████╗    ╚██████╗███████╗██║          ║
    ║         ╚═╝  ╚═╝ ╚═════╝╚══════╝     ╚═════╝╚══════╝╚═╝          ║
    ║                                                                   ║
    ║              Aequitas Cloud Engine - Sovereign Control            ║
    ║                                                                   ║
    ╚═══════════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
}

################################################################################
# HELP
################################################################################

show_help() {
    echo -e "${CYAN}ACE CLI - Aequitas Cloud Engine${NC}"
    echo ""
    echo -e "${YELLOW}Usage:${NC}"
    echo "  $0 <command> [options]"
    echo ""
    echo -e "${YELLOW}Commands:${NC}"
    echo "  status        Show infrastructure status"
    echo "  deploy        Deploy to sovereign infrastructure"
    echo "  update-dns    Update Cloudflare DNS to sovereign IP"
    echo "  health        Run health checks"
    echo "  nodes         List registered nodes"
    echo "  logs          Show service logs"
    echo "  config        Show/edit configuration"
    echo "  migrate       Migrate from DigitalOcean to sovereign"
    echo "  help          Show this help message"
    echo ""
    echo -e "${YELLOW}Examples:${NC}"
    echo "  $0 status                    # Show all services status"
    echo "  $0 deploy --ip 192.168.1.100 # Deploy to specific IP"
    echo "  $0 update-dns                # Update DNS to sovereign"
    echo "  $0 health --full             # Full health check"
    echo ""
    echo -e "${YELLOW}Environment Variables:${NC}"
    echo "  PRIMARY_IP              Sovereign VM IP address"
    echo "  ACE_API_ENDPOINT        ACE API endpoint (default: http://localhost:8080)"
    echo "  CLOUDFLARE_API_TOKEN    Cloudflare API token for DNS updates"
    echo "  INFRASTRUCTURE_TYPE     Type: sovereign, ace, hybrid (default: sovereign)"
    echo ""
}

################################################################################
# STATUS
################################################################################

cmd_status() {
    show_banner
    echo -e "${BLUE}Infrastructure Status${NC}"
    echo ""
    
    # Check ACE API
    echo -e "${CYAN}ACE Cloud Engine:${NC}"
    if curl -sf "$ACE_API/health" > /dev/null 2>&1; then
        echo -e "  API: ${GREEN}✓ Running at $ACE_API${NC}"
        
        # Get node count if available
        nodes=$(curl -sf "$ACE_API/api/v1/nodes" 2>/dev/null | jq -r '.nodes | length' || echo "0")
        echo -e "  Nodes: ${GREEN}$nodes registered${NC}"
    else
        echo -e "  API: ${YELLOW}⚠ Not responding at $ACE_API${NC}"
    fi
    echo ""
    
    # Check configuration
    echo -e "${CYAN}Configuration:${NC}"
    if [ -f "$CONFIG_FILE" ]; then
        infra_type=$(grep "primary_type:" "$CONFIG_FILE" | awk '{print $2}' || echo "unknown")
        echo -e "  Type: ${GREEN}$infra_type${NC}"
        echo -e "  Config: ${GREEN}$CONFIG_FILE${NC}"
    else
        echo -e "  Config: ${YELLOW}⚠ Not found${NC}"
    fi
    echo ""
    
    # Check vm-infrastructure CLI
    echo -e "${CYAN}VM Infrastructure CLI:${NC}"
    if [ -d "$VM_CLI" ]; then
        echo -e "  Location: ${GREEN}$VM_CLI${NC}"
        if [ -f "$VM_CLI/package.json" ]; then
            version=$(jq -r '.version' "$VM_CLI/package.json" 2>/dev/null || echo "unknown")
            echo -e "  Version: ${GREEN}$version${NC}"
        fi
    else
        echo -e "  Status: ${YELLOW}⚠ Not installed${NC}"
    fi
    echo ""
    
    # Check environment
    echo -e "${CYAN}Environment:${NC}"
    if [ -n "$PRIMARY_IP" ]; then
        echo -e "  PRIMARY_IP: ${GREEN}$PRIMARY_IP${NC}"
    else
        echo -e "  PRIMARY_IP: ${YELLOW}Not set${NC}"
    fi
    
    if [ -n "$CLOUDFLARE_API_TOKEN" ]; then
        echo -e "  CLOUDFLARE_API_TOKEN: ${GREEN}Configured${NC}"
    else
        echo -e "  CLOUDFLARE_API_TOKEN: ${YELLOW}Not set${NC}"
    fi
    echo ""
}

################################################################################
# DEPLOY
################################################################################

cmd_deploy() {
    show_banner
    echo -e "${BLUE}Deploy to Sovereign Infrastructure${NC}"
    echo ""
    
    # Parse options
    local ip=""
    while [[ $# -gt 0 ]]; do
        case $1 in
            --ip)
                ip="$2"
                shift 2
                ;;
            *)
                shift
                ;;
        esac
    done
    
    if [ -z "$ip" ] && [ -z "$PRIMARY_IP" ]; then
        echo -e "${YELLOW}Enter sovereign VM IP address:${NC}"
        read -p "> " ip
    else
        ip="${ip:-$PRIMARY_IP}"
    fi
    
    echo -e "${CYAN}Deploying to: $ip${NC}"
    echo ""
    
    # Run deployment script
    if [ -f "$SCRIPT_DIR/deploy-blockchain-complete.sh" ]; then
        export PRIMARY_IP="$ip"
        bash "$SCRIPT_DIR/deploy-blockchain-complete.sh"
    else
        echo -e "${YELLOW}Deployment script not found. Running basic health check...${NC}"
        cmd_health
    fi
}

################################################################################
# UPDATE DNS
################################################################################

cmd_update_dns() {
    show_banner
    echo -e "${BLUE}Update DNS to Sovereign Infrastructure${NC}"
    echo ""
    
    if [ -f "$SCRIPT_DIR/update-dns-ace-avm.sh" ]; then
        bash "$SCRIPT_DIR/update-dns-ace-avm.sh" "$@"
    else
        echo -e "${RED}Error: update-dns-ace-avm.sh not found${NC}"
        exit 1
    fi
}

################################################################################
# HEALTH
################################################################################

cmd_health() {
    show_banner
    echo -e "${BLUE}Health Check${NC}"
    echo ""
    
    local full_check=false
    if [ "$1" = "--full" ]; then
        full_check=true
    fi
    
    # Check services
    local services=(
        "Frontend:5000"
        "Explorer:3001"
        "Backend:3002"
        "RPC:26657"
        "ACE:8080"
    )
    
    local ip="${PRIMARY_IP:-localhost}"
    
    echo -e "${CYAN}Checking services on $ip:${NC}"
    echo ""
    
    for service in "${services[@]}"; do
        name="${service%%:*}"
        port="${service##*:}"
        
        printf "  %-12s " "$name:"
        
        if curl -sf --max-time 3 "http://$ip:$port" > /dev/null 2>&1 || \
           curl -sf --max-time 3 "http://$ip:$port/health" > /dev/null 2>&1 || \
           nc -z -w 2 "$ip" "$port" 2>/dev/null; then
            echo -e "${GREEN}✓ Port $port responding${NC}"
        else
            echo -e "${YELLOW}⚠ Port $port not responding${NC}"
        fi
    done
    echo ""
    
    if [ "$full_check" = true ]; then
        echo -e "${CYAN}Extended checks:${NC}"
        echo ""
        
        # Blockchain status
        if curl -sf "http://$ip:26657/status" > /dev/null 2>&1; then
            block=$(curl -sf "http://$ip:26657/status" | jq -r '.result.sync_info.latest_block_height' 2>/dev/null || echo "N/A")
            echo -e "  Blockchain height: ${GREEN}$block${NC}"
        fi
        
        # ACE nodes
        if curl -sf "$ACE_API/api/v1/nodes" > /dev/null 2>&1; then
            nodes=$(curl -sf "$ACE_API/api/v1/nodes" | jq -r '.nodes | length' 2>/dev/null || echo "0")
            echo -e "  ACE nodes: ${GREEN}$nodes${NC}"
        fi
        
        echo ""
    fi
}

################################################################################
# NODES
################################################################################

cmd_nodes() {
    show_banner
    echo -e "${BLUE}Registered Nodes${NC}"
    echo ""
    
    if ! curl -sf "$ACE_API/api/v1/nodes" > /dev/null 2>&1; then
        echo -e "${YELLOW}ACE API not responding. No nodes to display.${NC}"
        return
    fi
    
    nodes=$(curl -sf "$ACE_API/api/v1/nodes" 2>/dev/null)
    
    if [ -z "$nodes" ] || [ "$nodes" = "null" ]; then
        echo -e "${YELLOW}No nodes registered.${NC}"
        return
    fi
    
    echo "$nodes" | jq -r '.nodes[] | "  \(.id): \(.ip) [\(.status)]"' 2>/dev/null || echo "  No nodes found"
    echo ""
}

################################################################################
# LOGS
################################################################################

cmd_logs() {
    show_banner
    echo -e "${BLUE}Service Logs${NC}"
    echo ""
    
    local service="${1:-all}"
    
    case $service in
        apex)
            journalctl -u aequitas-apex -f 2>/dev/null || echo "APEX logs not available"
            ;;
        ace)
            journalctl -u aequitas-ace -f 2>/dev/null || echo "ACE logs not available"
            ;;
        blockchain)
            journalctl -u aequitas-blockchain -f 2>/dev/null || echo "Blockchain logs not available"
            ;;
        all)
            journalctl -u 'aequitas-*' -f 2>/dev/null || echo "Logs not available (systemd not configured)"
            ;;
        *)
            echo -e "${YELLOW}Usage: $0 logs [apex|ace|blockchain|all]${NC}"
            ;;
    esac
}

################################################################################
# CONFIG
################################################################################

cmd_config() {
    show_banner
    echo -e "${BLUE}Configuration${NC}"
    echo ""
    
    if [ ! -f "$CONFIG_FILE" ]; then
        echo -e "${YELLOW}Configuration file not found at $CONFIG_FILE${NC}"
        return
    fi
    
    echo -e "${CYAN}Configuration file: $CONFIG_FILE${NC}"
    echo ""
    echo -e "${CYAN}Key settings:${NC}"
    
    # Extract key configuration
    grep -E "^  (primary_type|enabled|chain_id|domain):" "$CONFIG_FILE" 2>/dev/null | head -20
    echo ""
    
    echo -e "${CYAN}To edit:${NC}"
    echo "  \$EDITOR $CONFIG_FILE"
    echo ""
}

################################################################################
# MIGRATE
################################################################################

cmd_migrate() {
    show_banner
    echo -e "${BLUE}Migrate from DigitalOcean to Sovereign${NC}"
    echo ""
    
    if [ -f "$SCRIPT_DIR/migrate-from-digitalocean.sh" ]; then
        bash "$SCRIPT_DIR/migrate-from-digitalocean.sh" "$@"
    else
        echo -e "${RED}Error: migrate-from-digitalocean.sh not found${NC}"
        exit 1
    fi
}

################################################################################
# MAIN
################################################################################

case $COMMAND in
    status)
        cmd_status "$@"
        ;;
    deploy)
        cmd_deploy "$@"
        ;;
    update-dns)
        cmd_update_dns "$@"
        ;;
    health)
        cmd_health "$@"
        ;;
    nodes)
        cmd_nodes "$@"
        ;;
    logs)
        cmd_logs "$@"
        ;;
    config)
        cmd_config "$@"
        ;;
    migrate)
        cmd_migrate "$@"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}Unknown command: $COMMAND${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac
