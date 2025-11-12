#!/bin/bash
#
# Aequitas Protocol Zone VM - Proxmox Deployment Script
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Default values
TEMPLATE_ID=9000
NODE_NAME=""
VM_ID=""
NETWORK_CONFIG="ip=dhcp"
START_VM=true

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --name)
            NODE_NAME="$2"
            shift 2
            ;;
        --id)
            VM_ID="$2"
            shift 2
            ;;
        --network)
            NETWORK_CONFIG="$2"
            shift 2
            ;;
        --no-start)
            START_VM=false
            shift
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

# Validate required parameters
if [ -z "$NODE_NAME" ]; then
    echo -e "${RED}✗ Node name is required${NC}"
    echo "Usage: $0 --name <node-name> [--id <vm-id>] [--network <config>] [--no-start]"
    exit 1
fi

# Auto-generate VM ID if not provided
if [ -z "$VM_ID" ]; then
    VM_ID=$(pvesh get /cluster/nextid)
fi

echo -e "${BLUE}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Aequitas Zone - VM Deployment                  ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}Deployment Configuration:${NC}"
echo -e "  Node Name: ${GREEN}${NODE_NAME}${NC}"
echo -e "  VM ID: ${GREEN}${VM_ID}${NC}"
echo -e "  Template ID: ${GREEN}${TEMPLATE_ID}${NC}"
echo -e "  Network: ${GREEN}${NETWORK_CONFIG}${NC}"
echo ""

# Check if template exists
if ! qm status ${TEMPLATE_ID} &> /dev/null; then
    echo -e "${RED}✗ Template ${TEMPLATE_ID} not found${NC}"
    echo -e "${YELLOW}Run ./create-template.sh first${NC}"
    exit 1
fi

# Clone template
echo -e "${BLUE}Cloning template ${TEMPLATE_ID}...${NC}"
qm clone ${TEMPLATE_ID} ${VM_ID} --name "${NODE_NAME}" --full
echo -e "${GREEN}✓ Cloned template to VM ${VM_ID}${NC}"

# Set network configuration
if [ "$NETWORK_CONFIG" != "ip=dhcp" ]; then
    echo -e "${BLUE}Configuring network...${NC}"
    qm set ${VM_ID} --ipconfig0 "${NETWORK_CONFIG}"
    echo -e "${GREEN}✓ Network configured${NC}"
fi

# Set cloud-init password (random)
RANDOM_PASSWORD=$(openssl rand -base64 32)
qm set ${VM_ID} --cipassword "${RANDOM_PASSWORD}"

# Save password to secure location
mkdir -p /root/.aequitas
echo "${VM_ID}:${RANDOM_PASSWORD}" >> /root/.aequitas/passwords.txt
chmod 600 /root/.aequitas/passwords.txt

echo -e "${GREEN}✓ Set random password (saved to /root/.aequitas/passwords.txt)${NC}"

# Start VM if requested
if [ "$START_VM" = true ]; then
    echo -e "${BLUE}Starting VM ${VM_ID}...${NC}"
    qm start ${VM_ID}
    echo -e "${GREEN}✓ VM started${NC}"
    
    # Wait for VM to boot
    echo -e "${BLUE}Waiting for VM to boot...${NC}"
    sleep 10
    
    # Get VM IP
    echo -e "${BLUE}Getting VM IP address...${NC}"
    for i in {1..30}; do
        VM_IP=$(qm guest cmd ${VM_ID} network-get-interfaces 2>/dev/null | jq -r '.[] | select(.name == "eth0") | .["ip-addresses"][] | select(.["ip-address-type"] == "ipv4") | .["ip-address"]' 2>/dev/null || echo "")
        if [ -n "$VM_IP" ]; then
            echo -e "${GREEN}✓ VM IP: ${VM_IP}${NC}"
            break
        fi
        sleep 2
    done
fi

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Deployment completed successfully!              ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}VM Information:${NC}"
echo -e "  VM ID: ${GREEN}${VM_ID}${NC}"
echo -e "  Name: ${GREEN}${NODE_NAME}${NC}"
if [ -n "$VM_IP" ]; then
    echo -e "  IP Address: ${GREEN}${VM_IP}${NC}"
fi
echo ""
echo -e "${YELLOW}Access Commands:${NC}"
echo -e "  SSH: ${GREEN}ssh aequitas@${VM_IP}${NC}"
echo -e "  Console: ${GREEN}qm terminal ${VM_ID}${NC}"
echo -e "  Status: ${GREEN}qm status ${VM_ID}${NC}"
echo -e "  Shutdown: ${GREEN}qm shutdown ${VM_ID}${NC}"
echo ""
echo -e "${YELLOW}Aequitas Zone Endpoints:${NC}"
echo -e "  RPC: ${GREEN}http://${VM_IP}:26657${NC}"
echo -e "  REST: ${GREEN}http://${VM_IP}:1317${NC}"
echo -e "  Dashboard: ${GREEN}http://${VM_IP}:3000${NC}"
echo ""
