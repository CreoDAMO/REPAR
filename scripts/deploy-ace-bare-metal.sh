#!/bin/bash
# ACE Bare-Metal Deployment from Replit Shell
# Non-interactive SSH automation for Proxmox token creation + ACE deployment

set -e

# Configuration
PROXMOX_HOST="135.232.208.145"
PROXMOX_USER="root"
DEPLOYMENT_DIR="/opt/aequitas"
SSH_KEY="/tmp/apex_deploy_key"

echo "🚀 ACE Bare-Metal Deployment Automation"
echo "========================================"
echo ""
echo "Step 1: Generate SSH Key (non-interactive)"

# Generate SSH key if it doesn't exist
if [ ! -f "$SSH_KEY" ]; then
    ssh-keygen -t ed25519 -C "apex-automation-$(date +%s)" -f "$SSH_KEY" -q -N ""
    echo "✅ SSH key generated: $SSH_KEY"
else
    echo "✅ SSH key already exists: $SSH_KEY"
fi

# Make sure permissions are correct
chmod 600 "$SSH_KEY"
chmod 644 "$SSH_KEY.pub"

echo ""
echo "Step 2: Copy public key to bare-metal server (first time only)"
echo "⚠️  This may ask for Proxmox root password"

# Try to copy public key to server (may need password once)
ssh-copy-id -i "$SSH_KEY" -o StrictHostKeyChecking=no "$PROXMOX_USER@$PROXMOX_HOST" 2>/dev/null || \
  echo "Note: If key copy failed, ensure Proxmox password-auth is enabled, or manually add the public key:"
echo ""
cat "$SSH_KEY.pub"
echo ""

echo "Step 3: Create Proxmox API token (non-interactive SSH)"

ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$PROXMOX_USER@$PROXMOX_HOST" \
  'pveum apitoken add root@pam apex-automation --privsep 0 --expire 0' | tee /tmp/proxmox_token.txt

echo ""
echo "✅ Token created! Saved to /tmp/proxmox_token.txt"
echo ""
echo "Step 4: Extract token credentials"

# Extract token info
TOKEN_ID=$(grep "tokenid" /tmp/proxmox_token.txt | awk -F': ' '{print $2}' || echo "root@pam!apex-automation")
TOKEN_SECRET=$(grep "secret" /tmp/proxmox_token.txt | awk -F': ' '{print $2}' || echo "MANUALLY_COPY_FROM_OUTPUT")

echo "Token ID: $TOKEN_ID"
echo "Token Secret: $TOKEN_SECRET"
echo ""

echo "Step 5: Deploy ACE via SSH"

ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$PROXMOX_USER@$PROXMOX_HOST" << 'REMOTE_SCRIPT'
# On the remote server
cd /home/runner/workspace 2>/dev/null || mkdir -p /opt/aequitas && cd /opt/aequitas

# Clone repo if not already present
if [ ! -d "REPAR" ]; then
    git clone https://github.com/CreoDAMO/REPAR.git
fi

cd REPAR/ace

# Set environment and deploy
export DEPLOYMENT_TYPE=bare-metal
export BLOCKCHAIN_RPC=http://135.232.208.145:26657
export CHAIN_ID=aequitas-1
export ACE_PORT=8080

echo "Building ACE on bare-metal server..."
bash scripts/deploy-production.sh

REMOTE_SCRIPT

echo ""
echo "✅ ACE Deployment Complete!"
echo ""
echo "Verify ACE is running:"
echo "  curl -k https://$PROXMOX_HOST:8080/health"
echo ""
echo "SSH Key saved at: $SSH_KEY (keep this secure!)"
echo "Public key at: $SSH_KEY.pub"

