#!/bin/bash

# Cloudflare DNS Configuration Script for Aequitas Protocol
# This script automatically creates A records for all subdomains pointing to your DigitalOcean Droplet
#
# Prerequisites:
# - Cloudflare API Token with DNS:Edit permissions
# - Your DigitalOcean Droplet IP address
# - Your domain name managed by Cloudflare
#
# Usage:
#   export CLOUDFLARE_API_TOKEN="your-api-token"
#   export DROPLET_IP="your-droplet-ip"
#   export DOMAIN="aequitasprotocol.zone"
#   ./scripts/setup-cloudflare-dns.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check for required environment variables
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo -e "${RED}Error: CLOUDFLARE_API_TOKEN environment variable is not set${NC}"
    exit 1
fi

if [ -z "$DROPLET_IP" ]; then
    echo -e "${RED}Error: DROPLET_IP environment variable is not set${NC}"
    exit 1
fi

if [ -z "$DOMAIN" ]; then
    echo -e "${RED}Error: DOMAIN environment variable is not set${NC}"
    exit 1
fi

echo -e "${GREEN}🌐 Configuring Cloudflare DNS for Aequitas Protocol${NC}"
echo -e "${YELLOW}Domain: $DOMAIN${NC}"
echo -e "${YELLOW}Droplet IP: $DROPLET_IP${NC}"
echo ""

# Get Zone ID
echo -e "${GREEN}📡 Fetching Zone ID...${NC}"
ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$DOMAIN" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" | jq -r '.result[0].id')

if [ -z "$ZONE_ID" ] || [ "$ZONE_ID" == "null" ]; then
    echo -e "${RED}Error: Could not fetch Zone ID. Check your domain and API token.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Zone ID: $ZONE_ID${NC}"
echo ""

# List of subdomains to create
SUBDOMAINS=(
    "www"
    "calculator"
    "black-paper"
    "audit"
    "defendants"
    "ledger"
    "founder-wallet"
    "roadmap"
    "ifr"
    "grc"
    "dao"
    "ai-analytics"
    "endowment"
    "alliances"
    "economics"
    "crypto-comparison"
    "dex"
    "nft-marketplace"
    "chain-integration"
    "onramp"
    "superpay"
    "validator-subsidy"
    "founder-endowment"
    "explorer"
)

# Function to create or update DNS record
create_dns_record() {
    local subdomain=$1
    local full_domain="${subdomain}.${DOMAIN}"
    
    echo -e "${YELLOW}🔧 Processing: ${full_domain}${NC}"
    
    # Check if record exists
    RECORD_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=A&name=$full_domain" \
      -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
      -H "Content-Type: application/json" | jq -r '.result[0].id')
    
    if [ -z "$RECORD_ID" ] || [ "$RECORD_ID" == "null" ]; then
        # Create new record
        echo -e "${GREEN}   ➕ Creating A record...${NC}"
        RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
          -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
          -H "Content-Type: application/json" \
          --data "{\"type\":\"A\",\"name\":\"$full_domain\",\"content\":\"$DROPLET_IP\",\"ttl\":1,\"proxied\":true}")
    else
        # Update existing record
        echo -e "${GREEN}   🔄 Updating existing A record...${NC}"
        RESPONSE=$(curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
          -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
          -H "Content-Type: application/json" \
          --data "{\"type\":\"A\",\"name\":\"$full_domain\",\"content\":\"$DROPLET_IP\",\"ttl\":1,\"proxied\":true}")
    fi
    
    SUCCESS=$(echo $RESPONSE | jq -r '.success')
    
    if [ "$SUCCESS" == "true" ]; then
        echo -e "${GREEN}   ✅ Success: ${full_domain} → ${DROPLET_IP}${NC}"
    else
        ERROR=$(echo $RESPONSE | jq -r '.errors[0].message')
        echo -e "${RED}   ❌ Error: ${ERROR}${NC}"
    fi
    
    echo ""
}

# Process each subdomain
echo -e "${GREEN}🚀 Creating/updating DNS records...${NC}"
echo ""

for subdomain in "${SUBDOMAINS[@]}"; do
    create_dns_record "$subdomain"
done

echo -e "${GREEN}✅ DNS configuration complete!${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo -e "   1. Wait 1-2 minutes for DNS propagation"
echo -e "   2. Deploy your services using Docker Compose"
echo -e "   3. Configure Nginx Proxy Manager at http://$DROPLET_IP:81"
echo -e "   4. Set up SSL certificates for each subdomain"
echo ""
echo -e "${GREEN}🎉 Your Aequitas Protocol infrastructure is ready!${NC}"
