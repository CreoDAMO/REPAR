#!/bin/bash
# ACE Bare-Metal Deployment via Proxmox HTTP API
# No SSH required - uses direct Proxmox REST API calls

set -e

# Configuration
PROXMOX_HOST="135.232.208.145"
PROXMOX_PORT="8006"
PROXMOX_USER="root@pam"

echo "🚀 ACE Bare-Metal Deployment (Proxmox API)"
echo "=========================================="
echo ""

# Step 1: Prompt for credentials
read -sp "Enter Proxmox root password: " PROXMOX_PASSWORD
echo ""
echo ""

echo "Step 1: Authenticate with Proxmox API"

# Get authentication ticket
AUTH_RESPONSE=$(curl -s -k -X POST \
  "https://${PROXMOX_HOST}:${PROXMOX_PORT}/api2/json/access/ticket" \
  -d "username=${PROXMOX_USER}&password=${PROXMOX_PASSWORD}" \
  -H "Content-Type: application/x-www-form-urlencoded")

TICKET=$(echo "$AUTH_RESPONSE" | grep -o '"ticket":"[^"]*' | cut -d'"' -f4)
CSRF=$(echo "$AUTH_RESPONSE" | grep -o '"csrftoken":"[^"]*' | cut -d'"' -f4)

if [ -z "$TICKET" ]; then
    echo "❌ Authentication failed. Check your password."
    echo "Response: $AUTH_RESPONSE"
    exit 1
fi

echo "✅ Authentication successful"
echo ""

echo "Step 2: Create Proxmox API token (apex-automation)"

# Create API token
TOKEN_RESPONSE=$(curl -s -k -X POST \
  "https://${PROXMOX_HOST}:${PROXMOX_PORT}/api2/json/access/users/root@pam/tokens" \
  -H "CSRFPreventionToken: ${CSRF}" \
  -H "Cookie: PVEAuthCookie=${TICKET}" \
  -d "tokenid=apex-automation&expire=0&privsep=0")

echo "$TOKEN_RESPONSE" | tee /tmp/proxmox_token_response.json

TOKEN_SECRET=$(echo "$TOKEN_RESPONSE" | grep -o '"secret":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN_SECRET" ]; then
    echo "❌ Token creation may have failed. Check the response above."
    echo "This might be OK if token already exists."
else
    echo ""
    echo "✅ Token created successfully!"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "PROXMOX API TOKEN CREDENTIALS"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Token ID: root@pam!apex-automation"
    echo "Token Secret: $TOKEN_SECRET"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "⚠️  SAVE THESE CREDENTIALS!"
    echo "Add to GitHub secrets:"
    echo "  PROXMOX_API_TOKEN_ID=root@pam!apex-automation"
    echo "  PROXMOX_API_TOKEN_SECRET=$TOKEN_SECRET"
    echo ""
fi

echo "Step 3: Next - Deploy ACE binary"
echo ""
echo "On your bare-metal server (135.232.208.145), run:"
echo ""
echo "  cd /opt/aequitas && git clone https://github.com/CreoDAMO/REPAR.git"
echo "  cd REPAR/ace"
echo "  export DEPLOYMENT_TYPE=bare-metal"
echo "  export BLOCKCHAIN_RPC=http://135.232.208.145:26657"
echo "  export CHAIN_ID=aequitas-1"
echo "  bash scripts/deploy-production.sh"
echo ""
echo "Or use your preferred remote access (RDP, console, VNC, etc.)"
echo ""

