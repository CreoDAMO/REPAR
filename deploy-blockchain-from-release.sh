#!/bin/bash
###############################################################################
# Deploy Aequitas Blockchain from GitHub Release
# Clean installation from pre-built binary
# Run on DigitalOcean Droplet: bash <(curl -s https://raw.githubusercontent.com/CreoDAMO/REPAR/main/deploy-blockchain-from-release.sh)
###############################################################################

set -e

echo "════════════════════════════════════════════════════════"
echo "   Aequitas Zone Blockchain Deployment"
echo "   From GitHub Release: v1.0.0-blockchain"
echo "════════════════════════════════════════════════════════"
echo ""

# Clean up any previous installation
echo "🧹 Cleaning up previous installation..."
pm2 delete blockchain 2>/dev/null || true
rm -rf ~/.aequitas ~/.aequitas-testnet
rm -f /usr/local/bin/aequitasd

# Download and install binary
echo "📥 Downloading blockchain binary (61MB compressed)..."
cd /tmp
wget -q --show-progress https://github.com/CreoDAMO/REPAR/releases/download/v1.0.0-blockchain/aequitasd-v1.0.0-linux-amd64.gz

echo "📦 Extracting binary..."
gunzip -f aequitasd-v1.0.0-linux-amd64.gz

echo "🔧 Installing to /usr/local/bin..."
chmod +x aequitasd-v1.0.0-linux-amd64
sudo mv aequitasd-v1.0.0-linux-amd64 /usr/local/bin/aequitasd

echo "✅ Binary installed!"
aequitasd version
echo ""

# Initialize Mainnet
echo "🚀 Initializing Mainnet (aequitas-1)..."
aequitasd init aequitas-mainnet --chain-id aequitas-1 --home ~/.aequitas

# Download genesis file
echo "📥 Downloading Mainnet genesis..."
wget -q -O ~/.aequitas/config/genesis.json https://raw.githubusercontent.com/CreoDAMO/REPAR/main/chain-config/mainnet/genesis-mainnet.json

# Configure RPC to listen on all interfaces
echo "⚙️  Configuring RPC endpoint..."
sed -i 's/laddr = "tcp:\/\/127.0.0.1:26657"/laddr = "tcp:\/\/0.0.0.0:26657"/' ~/.aequitas/config/config.toml
sed -i 's/cors_allowed_origins = \[\]/cors_allowed_origins = ["*"]/' ~/.aequitas/config/config.toml

# Start with PM2
echo "🚀 Starting blockchain with PM2..."
pm2 start "aequitasd start --home ~/.aequitas --x-crisis-skip-assert-invariants" --name blockchain
pm2 save

echo ""
echo "════════════════════════════════════════════════════════"
echo "   ✅ DEPLOYMENT COMPLETE!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "📊 Check status:"
echo "   pm2 status"
echo "   pm2 logs blockchain"
echo ""
echo "🔍 Test RPC endpoint:"
echo "   curl http://localhost:26657/status"
echo ""
echo "📈 Monitor block height:"
echo "   watch -n 2 'curl -s http://localhost:26657/status | jq .result.sync_info.latest_block_height'"
echo ""
