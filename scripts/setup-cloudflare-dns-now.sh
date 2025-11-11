#!/bin/bash

###############################################################################
# Aequitas Protocol - Cloudflare DNS Automation
# Configures DNS records for DigitalOcean deployment
###############################################################################

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}   Aequitas Protocol - DNS Setup${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}\n"

# Configuration
DROPLET_IP="159.203.92.230"
ZONE_ID="$CLOUDFLARE_ZONE_ID"
API_KEY="$CLOUDFLARE_API_KEY"
DOMAIN="aequitaszone.io"

if [ -z "$ZONE_ID" ] || [ -z "$API_KEY" ]; then
    echo -e "${YELLOW}⚠️  Missing Cloudflare credentials in environment${NC}"
    echo -e "${YELLOW}Set CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_KEY${NC}"
    exit 1
fi

# Function to create/update DNS record
create_dns_record() {
    local name=$1
    local type=$2
    local content=$3
    local proxied=${4:-false}
    
    echo -e "${BLUE}Setting up: ${name}${NC}"
    
    # Check if record exists
    RECORD_ID=$(curl -s -X GET \
        "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?name=${name}" \
        -H "Authorization: Bearer ${API_KEY}" \
        -H "Content-Type: application/json" | \
        python3 -c "import sys, json; data = json.load(sys.stdin); print(data['result'][0]['id'] if data['result'] else '')")
    
    if [ -n "$RECORD_ID" ]; then
        # Update existing record
        curl -s -X PUT \
            "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${RECORD_ID}" \
            -H "Authorization: Bearer ${API_KEY}" \
            -H "Content-Type: application/json" \
            --data "{\"type\":\"${type}\",\"name\":\"${name}\",\"content\":\"${content}\",\"proxied\":${proxied},\"ttl\":1}" \
            > /dev/null
        echo -e "${GREEN}✓ Updated${NC}"
    else
        # Create new record
        curl -s -X POST \
            "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
            -H "Authorization: Bearer ${API_KEY}" \
            -H "Content-Type: application/json" \
            --data "{\"type\":\"${type}\",\"name\":\"${name}\",\"content\":\"${content}\",\"proxied\":${proxied},\"ttl\":1}" \
            > /dev/null
        echo -e "${GREEN}✓ Created${NC}"
    fi
}

echo -e "\n${BLUE}📋 Configuring DNS Records...${NC}\n"

# Main domain (will point to App Platform URL after deployment)
echo -e "${YELLOW}Note: Update aequitasprotocol.zone to point to your App Platform URL after deployment${NC}"

# API subdomain (to Droplet)
create_dns_record "api.${DOMAIN}" "A" "${DROPLET_IP}" false

# RPC endpoints (to Droplet)
create_dns_record "rpc.${DOMAIN}" "A" "${DROPLET_IP}" false
create_dns_record "testnet-rpc.${DOMAIN}" "A" "${DROPLET_IP}" false

# Explorer subdomain (will point to App Platform)
echo -e "${YELLOW}Note: Update explorer.${DOMAIN} to point to App Platform URL after deployment${NC}"

echo -e "\n${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}   DNS Configuration Complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}\n"

echo -e "${BLUE}DNS Records Created:${NC}"
echo -e "  api.${DOMAIN} → ${DROPLET_IP}"
echo -e "  rpc.${DOMAIN} → ${DROPLET_IP}"
echo -e "  testnet-rpc.${DOMAIN} → ${DROPLET_IP}"

echo -e "\n${YELLOW}Next Steps:${NC}"
echo -e "1. Deploy to App Platform (get the URL)"
echo -e "2. Update main domain CNAME:"
echo -e "   ${DOMAIN} → your-app-platform-url.ondigitalocean.app"
echo -e "3. Update explorer CNAME:"
echo -e "   explorer.${DOMAIN} → your-app-platform-url.ondigitalocean.app"

echo -e "\n${GREEN}✓ Ready for deployment!${NC}"
