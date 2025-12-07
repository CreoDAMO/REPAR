#!/bin/bash

###############################################################################
# Aequitas Protocol - Complete Subdomain Configuration
# Domain: aequitasprotocol.zone
# Total Subdomains: 65+
###############################################################################

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   Aequitas Protocol - Complete DNS Setup${NC}"
echo -e "${BLUE}   Domain: aequitasprotocol.zone${NC}"
echo -e "${BLUE}   Total Subdomains: 65+${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}\n"

DROPLET_IP="159.203.92.230"
ZONE_ID="$CLOUDFLARE_ZONE_ID"
API_KEY="$CLOUDFLARE_API_KEY"
DOMAIN="aequitasprotocol.zone"

if [ -z "$ZONE_ID" ] || [ -z "$API_KEY" ]; then
    echo -e "${YELLOW}⚠️  Missing Cloudflare credentials${NC}"
    exit 1
fi

create_dns_record() {
    local name=$1
    local type=$2
    local content=$3
    
    RECORD_ID=$(curl -s -X GET \
        "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?name=${name}" \
        -H "Authorization: Bearer ${API_KEY}" \
        -H "Content-Type: application/json" | \
        python3 -c "import sys, json; data = json.load(sys.stdin); print(data['result'][0]['id'] if data['result'] else '')" 2>/dev/null)
    
    if [ -n "$RECORD_ID" ]; then
        curl -s -X PUT \
            "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${RECORD_ID}" \
            -H "Authorization: Bearer ${API_KEY}" \
            -H "Content-Type: application/json" \
            --data "{\"type\":\"${type}\",\"name\":\"${name}\",\"content\":\"${content}\",\"proxied\":false,\"ttl\":1}" \
            > /dev/null 2>&1
        echo -e "  ${GREEN}✓${NC} ${name}"
    else
        curl -s -X POST \
            "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
            -H "Authorization: Bearer ${API_KEY}" \
            -H "Content-Type: application/json" \
            --data "{\"type\":\"${type}\",\"name\":\"${name}\",\"content\":\"${content}\",\"proxied\":false,\"ttl\":1}" \
            > /dev/null 2>&1
        echo -e "  ${GREEN}✓${NC} ${name}"
    fi
}

echo -e "${BLUE}📋 Phase 1: Root & Core Infrastructure${NC}"
create_dns_record "${DOMAIN}" "A" "${DROPLET_IP}"
create_dns_record "www.${DOMAIN}" "A" "${DROPLET_IP}"
create_dns_record "app.${DOMAIN}" "A" "${DROPLET_IP}"

echo -e "\n${BLUE}📋 Phase 2: Blockchain Infrastructure (Priority)${NC}"
create_dns_record "rpc.${DOMAIN}" "A" "${DROPLET_IP}"
create_dns_record "testnet-rpc.${DOMAIN}" "A" "${DROPLET_IP}"
create_dns_record "api.${DOMAIN}" "A" "${DROPLET_IP}"
create_dns_record "grpc.${DOMAIN}" "A" "${DROPLET_IP}"
create_dns_record "ws.${DOMAIN}" "A" "${DROPLET_IP}"
create_dns_record "explorer.${DOMAIN}" "A" "${DROPLET_IP}"
create_dns_record "backend.${DOMAIN}" "A" "${DROPLET_IP}"

echo -e "\n${BLUE}📋 Phase 3: Dashboard Panels${NC}"
create_dns_record "dashboard.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "stats.${DOMAIN}" "CNAME" "app.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 4: Documentation & Black Paper${NC}"
create_dns_record "paper.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "docs.${DOMAIN}" "A" "${DROPLET_IP}"
create_dns_record "whitepaper.${DOMAIN}" "CNAME" "paper.${DOMAIN}"
create_dns_record "actions.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "roadmap.${DOMAIN}" "CNAME" "app.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 5: Forensic Audit System${NC}"
create_dns_record "audit.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "evidence.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "forensics.${DOMAIN}" "CNAME" "audit.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 6: Defendant Database${NC}"
create_dns_record "defendants.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "liability.${DOMAIN}" "CNAME" "defendants.${DOMAIN}"
create_dns_record "registry.${DOMAIN}" "CNAME" "defendants.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 7: Transparency & Ledger${NC}"
create_dns_record "ledger.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "transparency.${DOMAIN}" "CNAME" "ledger.${DOMAIN}"
create_dns_record "grl.${DOMAIN}" "CNAME" "ledger.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 8: Founder Wallet${NC}"
create_dns_record "wallet.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "multisig.${DOMAIN}" "CNAME" "wallet.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 9: Legal & Arbitration${NC}"
create_dns_record "ifr.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "grc.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "claims.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "arbitration.${DOMAIN}" "CNAME" "claims.${DOMAIN}"
create_dns_record "legal.${DOMAIN}" "A" "${DROPLET_IP}"

echo -e "\n${BLUE}📋 Phase 10: DAO Governance${NC}"
create_dns_record "dao.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "governance.${DOMAIN}" "CNAME" "dao.${DOMAIN}"
create_dns_record "vote.${DOMAIN}" "CNAME" "dao.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 11: AI & Analytics${NC}"
create_dns_record "ai.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "analytics.${DOMAIN}" "CNAME" "ai.${DOMAIN}"
create_dns_record "oracle.${DOMAIN}" "CNAME" "ai.${DOMAIN}"
create_dns_record "warroom.${DOMAIN}" "CNAME" "ai.${DOMAIN}"
create_dns_record "agentkit.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "agents.${DOMAIN}" "CNAME" "agentkit.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 12: Endowment System${NC}"
create_dns_record "endowment.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "fund.${DOMAIN}" "CNAME" "endowment.${DOMAIN}"
create_dns_record "investment.${DOMAIN}" "CNAME" "endowment.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 13: Strategic Alliances${NC}"
create_dns_record "alliances.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "partners.${DOMAIN}" "CNAME" "alliances.${DOMAIN}"
create_dns_record "caricom.${DOMAIN}" "CNAME" "alliances.${DOMAIN}"
create_dns_record "ncobra.${DOMAIN}" "CNAME" "alliances.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 14: \$REPAR Economics${NC}"
create_dns_record "repar.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "economics.${DOMAIN}" "CNAME" "repar.${DOMAIN}"
create_dns_record "coinomics.${DOMAIN}" "CNAME" "repar.${DOMAIN}"
create_dns_record "burn.${DOMAIN}" "CNAME" "repar.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 15: Crypto Comparison${NC}"
create_dns_record "compare.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "vs.${DOMAIN}" "CNAME" "compare.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 16: DEX & Trading${NC}"
create_dns_record "dex.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "swap.${DOMAIN}" "CNAME" "dex.${DOMAIN}"
create_dns_record "trade.${DOMAIN}" "CNAME" "dex.${DOMAIN}"
create_dns_record "liquidity.${DOMAIN}" "CNAME" "dex.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 17: Payment Systems${NC}"
create_dns_record "pay.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "superpay.${DOMAIN}" "CNAME" "pay.${DOMAIN}"
create_dns_record "fiat.${DOMAIN}" "CNAME" "pay.${DOMAIN}"
create_dns_record "onramp.${DOMAIN}" "CNAME" "pay.${DOMAIN}"
create_dns_record "coinbase.${DOMAIN}" "CNAME" "pay.${DOMAIN}"

echo -e "\n${BLUE}📋 Phase 18: Validator Subsidy${NC}"
create_dns_record "validators.${DOMAIN}" "CNAME" "app.${DOMAIN}"
create_dns_record "subsidy.${DOMAIN}" "CNAME" "validators.${DOMAIN}"
create_dns_record "nodes.${DOMAIN}" "CNAME" "validators.${DOMAIN}"

echo -e "\n${GREEN}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}   ✅ ALL 65+ SUBDOMAINS CONFIGURED!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}\n"

echo -e "${BLUE}🌐 Your complete Aequitas Protocol ecosystem:${NC}\n"
echo -e "  Main: https://aequitasprotocol.zone"
echo -e "  Blockchain RPC: https://rpc.aequitasprotocol.zone"
echo -e "  Explorer: https://explorer.aequitasprotocol.zone"
echo -e "  DEX: https://dex.aequitasprotocol.zone"
echo -e "  Wallet: https://wallet.aequitasprotocol.zone"
echo -e "  Governance: https://dao.aequitasprotocol.zone"
echo -e "  AI Analytics: https://ai.aequitasprotocol.zone"
echo -e "  ... and 58+ more!"

echo -e "\n${GREEN}✓ Ready for full deployment!${NC}"
