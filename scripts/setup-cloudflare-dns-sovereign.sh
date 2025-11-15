#!/bin/bash

###############################################################################
# AEQUITAS PROTOCOL - Sovereign Infrastructure Cloudflare DNS Configuration
# 
# This script configures Cloudflare DNS for infrastructure-agnostic deployments:
# - Sovereign VMs (vm-infrastructure)
# - ACE Cloud Engine
# - DigitalOcean (optional fallback)
# - Hybrid deployments
#
# Security: Use Replit Secrets or environment variables for API tokens
#
# Prerequisites:
# 1. Cloudflare API Token with DNS:Edit permissions
# 2. Infrastructure deployed and IPs available
# 3. jq installed for JSON parsing
#
# Usage:
#   # Sovereign VM deployment
#   export INFRASTRUCTURE_TYPE="sovereign"
#   export PRIMARY_IP="192.168.1.100"
#   ./scripts/setup-cloudflare-dns-sovereign.sh
#
#   # ACE deployment
#   export INFRASTRUCTURE_TYPE="ace"
#   export ACE_API="http://localhost:8080"
#   ./scripts/setup-cloudflare-dns-sovereign.sh
#
#   # Hybrid deployment
#   export INFRASTRUCTURE_TYPE="hybrid"
#   export PRIMARY_IP="192.168.1.100"      # Sovereign VM
#   export FALLBACK_IP="164.90.x.x"        # DigitalOcean
#   ./scripts/setup-cloudflare-dns-sovereign.sh
###############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
INFRASTRUCTURE_TYPE=${INFRASTRUCTURE_TYPE:-"sovereign"}
DOMAIN=${DOMAIN:-"aequitasprotocol.zone"}
HEALTH_CHECK=${HEALTH_CHECK:-"true"}

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   AEQUITAS PROTOCOL - Sovereign Cloudflare DNS Setup${NC}"
echo -e "${BLUE}   Infrastructure: ${INFRASTRUCTURE_TYPE}${NC}"
echo -e "${BLUE}   Domain: ${DOMAIN}${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}\n"

# Check for jq
if ! command -v jq &> /dev/null; then
    echo -e "${RED}❌ Error: jq is not installed${NC}"
    echo -e "${YELLOW}Install it: sudo apt-get install jq${NC}"
    exit 1
fi

# Get Cloudflare API Token (prefer Replit Secrets)
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo -e "${RED}❌ Error: CLOUDFLARE_API_TOKEN not set${NC}"
    echo -e "${YELLOW}Set it in Replit Secrets or export it:${NC}"
    echo -e "${YELLOW}  export CLOUDFLARE_API_TOKEN='your-token-here'${NC}"
    exit 1
fi

# Function: Get infrastructure IPs based on type
get_infrastructure_ips() {
    local infra_type=$1
    
    case "$infra_type" in
        "sovereign")
            if [ -z "$PRIMARY_IP" ]; then
                echo -e "${YELLOW}🔍 Attempting to auto-detect sovereign VM IP...${NC}"
                # Try to get from vm-infrastructure CLI
                if [ -d "vm-infrastructure/cli" ]; then
                    VM_IP=$(cd vm-infrastructure/cli && npm start status 2>/dev/null | grep -oP 'IP: \K[0-9.]+' | head -1 || echo "")
                    if [ -n "$VM_IP" ]; then
                        PRIMARY_IP=$VM_IP
                        echo -e "${GREEN}✅ Detected VM IP: $PRIMARY_IP${NC}"
                    else
                        echo -e "${RED}❌ Could not auto-detect VM IP${NC}"
                        echo -e "${YELLOW}Please set PRIMARY_IP environment variable${NC}"
                        exit 1
                    fi
                else
                    echo -e "${RED}❌ VM infrastructure not found${NC}"
                    echo -e "${YELLOW}Please set PRIMARY_IP environment variable${NC}"
                    exit 1
                fi
            fi
            echo "$PRIMARY_IP"
            ;;
            
        "ace")
            if [ -z "$ACE_API" ]; then
                ACE_API="http://localhost:8080"
            fi
            echo -e "${YELLOW}🔍 Querying ACE API for node IPs...${NC}"
            # Query ACE API for registered nodes
            ACE_IP=$(curl -sf "$ACE_API/api/v1/nodes" 2>/dev/null | jq -r '.nodes[0].ip // empty' || echo "")
            if [ -z "$ACE_IP" ]; then
                echo -e "${RED}❌ Could not get IP from ACE API${NC}"
                echo -e "${YELLOW}Falling back to PRIMARY_IP if set${NC}"
                if [ -n "$PRIMARY_IP" ]; then
                    echo "$PRIMARY_IP"
                else
                    exit 1
                fi
            else
                echo -e "${GREEN}✅ Got IP from ACE: $ACE_IP${NC}"
                echo "$ACE_IP"
            fi
            ;;
            
        "digitalocean")
            if [ -z "$DROPLET_IP" ]; then
                echo -e "${RED}❌ DROPLET_IP not set for DigitalOcean mode${NC}"
                exit 1
            fi
            echo "$DROPLET_IP"
            ;;
            
        "hybrid")
            # Primary should be sovereign, fallback can be cloud
            if [ -z "$PRIMARY_IP" ]; then
                echo -e "${RED}❌ PRIMARY_IP not set for hybrid mode${NC}"
                exit 1
            fi
            echo "$PRIMARY_IP"
            ;;
            
        *)
            echo -e "${RED}❌ Unknown infrastructure type: $infra_type${NC}"
            echo -e "${YELLOW}Valid types: sovereign, ace, digitalocean, hybrid${NC}"
            exit 1
            ;;
    esac
}

# Function: Health check an IP
health_check_ip() {
    local ip=$1
    local port=${2:-80}
    
    if [ "$HEALTH_CHECK" != "true" ]; then
        return 0
    fi
    
    echo -e "${YELLOW}🏥 Health checking $ip:$port...${NC}"
    
    # Try HTTP health check
    if curl -sf --max-time 5 "http://$ip:$port/health" &>/dev/null || \
       curl -sf --max-time 5 "http://$ip:$port" &>/dev/null || \
       nc -zv -w 5 "$ip" "$port" &>/dev/null; then
        echo -e "${GREEN}✅ Health check passed${NC}"
        return 0
    else
        echo -e "${RED}❌ Health check failed${NC}"
        return 1
    fi
}

# Function: Get Cloudflare Zone ID
get_zone_id() {
    local domain=$1
    
    echo -e "${YELLOW}📡 Fetching Cloudflare Zone ID for $domain...${NC}"
    
    ZONE_ID=$(curl -sf -X GET "https://api.cloudflare.com/client/v4/zones?name=$domain" \
      -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
      -H "Content-Type: application/json" | jq -r '.result[0].id // empty')
    
    if [ -z "$ZONE_ID" ] || [ "$ZONE_ID" == "null" ]; then
        echo -e "${RED}❌ Could not fetch Zone ID${NC}"
        echo -e "${YELLOW}Check your domain and API token${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Zone ID: $ZONE_ID${NC}"
    echo "$ZONE_ID"
}

# Function: Create or update DNS A record
create_dns_record() {
    local subdomain=$1
    local ip=$2
    local zone_id=$3
    local proxied=${4:-true}
    
    local full_domain="${subdomain}.${DOMAIN}"
    if [ "$subdomain" == "@" ]; then
        full_domain="$DOMAIN"
    fi
    
    echo -e "${YELLOW}🔧 Processing: ${full_domain} → ${ip}${NC}"
    
    # Check if record exists
    RECORD_ID=$(curl -sf -X GET "https://api.cloudflare.com/client/v4/zones/$zone_id/dns_records?type=A&name=$full_domain" \
      -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
      -H "Content-Type: application/json" | jq -r '.result[0].id // empty')
    
    if [ -z "$RECORD_ID" ] || [ "$RECORD_ID" == "null" ]; then
        # Create new record
        echo -e "${GREEN}   ➕ Creating A record...${NC}"
        RESPONSE=$(curl -sf -X POST "https://api.cloudflare.com/client/v4/zones/$zone_id/dns_records" \
          -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
          -H "Content-Type: application/json" \
          --data "{\"type\":\"A\",\"name\":\"$full_domain\",\"content\":\"$ip\",\"ttl\":300,\"proxied\":$proxied}")
    else
        # Update existing record
        echo -e "${GREEN}   🔄 Updating existing A record...${NC}"
        RESPONSE=$(curl -sf -X PUT "https://api.cloudflare.com/client/v4/zones/$zone_id/dns_records/$RECORD_ID" \
          -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
          -H "Content-Type: application/json" \
          --data "{\"type\":\"A\",\"name\":\"$full_domain\",\"content\":\"$ip\",\"ttl\":300,\"proxied\":$proxied}")
    fi
    
    SUCCESS=$(echo "$RESPONSE" | jq -r '.success // false')
    
    if [ "$SUCCESS" == "true" ]; then
        echo -e "${GREEN}   ✅ Success: ${full_domain} → ${ip}${NC}"
    else
        ERROR=$(echo "$RESPONSE" | jq -r '.errors[0].message // "Unknown error"')
        echo -e "${RED}   ❌ Error: ${ERROR}${NC}"
    fi
}

# Main execution
echo -e "${GREEN}🚀 Starting Cloudflare DNS configuration...${NC}\n"

# Get infrastructure IPs
PRIMARY_IP=$(get_infrastructure_ips "$INFRASTRUCTURE_TYPE")

echo -e "${GREEN}✅ Primary IP: $PRIMARY_IP${NC}"

# Health check
if ! health_check_ip "$PRIMARY_IP"; then
    echo -e "${RED}❌ Primary IP failed health check${NC}"
    if [ "$INFRASTRUCTURE_TYPE" == "hybrid" ] && [ -n "$FALLBACK_IP" ]; then
        echo -e "${YELLOW}⚠️  Attempting fallback to: $FALLBACK_IP${NC}"
        if health_check_ip "$FALLBACK_IP"; then
            PRIMARY_IP=$FALLBACK_IP
            echo -e "${GREEN}✅ Using fallback IP${NC}"
        else
            echo -e "${RED}❌ Fallback IP also failed health check${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}⚠️  Proceeding anyway (health check can be disabled with HEALTH_CHECK=false)${NC}"
    fi
fi

# Get Cloudflare Zone ID
ZONE_ID=$(get_zone_id "$DOMAIN")

echo ""
echo -e "${GREEN}🌐 Configuring DNS records...${NC}\n"

# Core infrastructure (proxied for DDoS protection)
create_dns_record "@" "$PRIMARY_IP" "$ZONE_ID" "true"
create_dns_record "app" "$PRIMARY_IP" "$ZONE_ID" "true"

# Blockchain infrastructure (DNS-only for direct access)
create_dns_record "rpc" "$PRIMARY_IP" "$ZONE_ID" "false"
create_dns_record "api" "$PRIMARY_IP" "$ZONE_ID" "false"
create_dns_record "grpc" "$PRIMARY_IP" "$ZONE_ID" "false"
create_dns_record "ws" "$PRIMARY_IP" "$ZONE_ID" "false"
create_dns_record "explorer" "$PRIMARY_IP" "$ZONE_ID" "true"
create_dns_record "backend" "$PRIMARY_IP" "$ZONE_ID" "true"

# ACE Cloud Engine subdomains (NEW)
if [ "$INFRASTRUCTURE_TYPE" == "ace" ] || [ "$INFRASTRUCTURE_TYPE" == "hybrid" ]; then
    echo -e "${YELLOW}🤖 Configuring ACE-specific subdomains...${NC}"
    create_dns_record "ace" "$PRIMARY_IP" "$ZONE_ID" "true"
    create_dns_record "ace-metrics" "$PRIMARY_IP" "$ZONE_ID" "false"
    create_dns_record "ace-ai" "$PRIMARY_IP" "$ZONE_ID" "true"
fi

# Sovereign VM subdomains
if [ "$INFRASTRUCTURE_TYPE" == "sovereign" ] || [ "$INFRASTRUCTURE_TYPE" == "hybrid" ]; then
    echo -e "${YELLOW}🏛️  Configuring sovereign infrastructure subdomains...${NC}"
    create_dns_record "vm" "$PRIMARY_IP" "$ZONE_ID" "true"
fi

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Cloudflare DNS configuration complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}\n"

echo -e "${BLUE}📋 Summary:${NC}"
echo -e "   Infrastructure Type: ${INFRASTRUCTURE_TYPE}"
echo -e "   Primary IP: ${PRIMARY_IP}"
if [ -n "$FALLBACK_IP" ]; then
    echo -e "   Fallback IP: ${FALLBACK_IP}"
fi
echo -e "   Domain: ${DOMAIN}"
echo -e "   Zone ID: ${ZONE_ID}"

echo ""
echo -e "${YELLOW}🔍 Verify DNS propagation:${NC}"
echo -e "   dig app.${DOMAIN}"
echo -e "   dig rpc.${DOMAIN}"
if [ "$INFRASTRUCTURE_TYPE" == "ace" ] || [ "$INFRASTRUCTURE_TYPE" == "hybrid" ]; then
    echo -e "   dig ace.${DOMAIN}"
fi

echo ""
echo -e "${GREEN}🎉 Your sovereign infrastructure is now connected to Cloudflare DNS!${NC}"
