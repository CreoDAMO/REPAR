#!/bin/bash

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}   Aequitas Protocol - DNS Setup${NC}"
echo -e "${BLUE}   Domain: aequitasprotocol.zone${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}\n"

DROPLET_IP="159.203.92.230"
ZONE_ID="$CLOUDFLARE_ZONE_ID"
API_KEY="$CLOUDFLARE_API_KEY"
DOMAIN="aequitasprotocol.zone"

if [ -z "$ZONE_ID" ] || [ -z "$API_KEY" ]; then
    echo "⚠️  Missing Cloudflare credentials"
    exit 1
fi

create_dns_record() {
    local name=$1
    local type=$2
    local content=$3
    
    echo -e "${BLUE}Setting up: ${name}${NC}"
    
    RECORD_ID=$(curl -s -X GET \
        "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?name=${name}" \
        -H "Authorization: Bearer ${API_KEY}" \
        -H "Content-Type: application/json" | \
        python3 -c "import sys, json; data = json.load(sys.stdin); print(data['result'][0]['id'] if data['result'] else '')")
    
    if [ -n "$RECORD_ID" ]; then
        curl -s -X PUT \
            "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${RECORD_ID}" \
            -H "Authorization: Bearer ${API_KEY}" \
            -H "Content-Type: application/json" \
            --data "{\"type\":\"${type}\",\"name\":\"${name}\",\"content\":\"${content}\",\"proxied\":false,\"ttl\":1}" \
            > /dev/null
        echo -e "${GREEN}✓ Updated${NC}"
    else
        curl -s -X POST \
            "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
            -H "Authorization: Bearer ${API_KEY}" \
            -H "Content-Type: application/json" \
            --data "{\"type\":\"${type}\",\"name\":\"${name}\",\"content\":\"${content}\",\"proxied\":false,\"ttl\":1}" \
            > /dev/null
        echo -e "${GREEN}✓ Created${NC}"
    fi
}

echo -e "\n${BLUE}📋 Configuring DNS Records...${NC}\n"

# Main domain (to Droplet)
create_dns_record "${DOMAIN}" "A" "${DROPLET_IP}"
create_dns_record "www.${DOMAIN}" "A" "${DROPLET_IP}"

# API subdomain
create_dns_record "api.${DOMAIN}" "A" "${DROPLET_IP}"

# RPC endpoints
create_dns_record "rpc.${DOMAIN}" "A" "${DROPLET_IP}"
create_dns_record "testnet-rpc.${DOMAIN}" "A" "${DROPLET_IP}"

# Explorer subdomain
create_dns_record "explorer.${DOMAIN}" "A" "${DROPLET_IP}"

echo -e "\n${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}   DNS Configuration Complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}\n"

echo -e "${BLUE}DNS Records Created:${NC}"
echo -e "  ${DOMAIN} → ${DROPLET_IP}"
echo -e "  www.${DOMAIN} → ${DROPLET_IP}"
echo -e "  api.${DOMAIN} → ${DROPLET_IP}"
echo -e "  rpc.${DOMAIN} → ${DROPLET_IP}"
echo -e "  testnet-rpc.${DOMAIN} → ${DROPLET_IP}"
echo -e "  explorer.${DOMAIN} → ${DROPLET_IP}"

echo -e "\n${GREEN}✓ Your domain is ready!${NC}"
echo -e "\n${BLUE}Your apps will be accessible at:${NC}"
echo -e "  https://aequitasprotocol.zone"
echo -e "  https://www.aequitasprotocol.zone"
echo -e "  https://explorer.aequitasprotocol.zone"
echo -e "  https://api.aequitasprotocol.zone"
echo -e "  https://rpc.aequitasprotocol.zone"
echo -e "  https://testnet-rpc.aequitasprotocol.zone"
