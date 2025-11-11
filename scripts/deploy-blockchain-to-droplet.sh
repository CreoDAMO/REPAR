#!/bin/bash
###############################################################################
# Deploy Aequitas Blockchain to DigitalOcean Droplet
# Run this ON THE DROPLET (159.203.92.230)
###############################################################################

set -e

echo "════════════════════════════════════════════════════════"
echo "   Aequitas Zone Blockchain Deployment"
echo "   Droplet: 159.203.92.230"
echo "   Domain: aequitasprotocol.zone"
echo "════════════════════════════════════════════════════════"
echo ""

# Step 1: Download and install binary
echo "📥 Step 1/5: Downloading blockchain binary from GitHub..."
cd /tmp
wget -q --show-progress https://github.com/CreoDAMO/REPAR/releases/download/v1.0.0-blockchain/aequitasd-v1.0.0-linux-amd64.gz

echo "📦 Extracting..."
gunzip aequitasd-v1.0.0-linux-amd64.gz

echo "🔧 Installing to /usr/local/bin..."
chmod +x aequitasd-v1.0.0-linux-amd64
sudo mv aequitasd-v1.0.0-linux-amd64 /usr/local/bin/aequitasd

echo "✅ Binary installed!"
aequitasd version
echo ""

# Step 2: Download genesis files
echo "📥 Step 2/5: Downloading genesis files..."
mkdir -p /tmp/genesis-files
cd /tmp/genesis-files

wget -q https://raw.githubusercontent.com/CreoDAMO/REPAR/main/chain-config/mainnet/genesis-mainnet.json
wget -q https://raw.githubusercontent.com/CreoDAMO/REPAR/main/chain-config/testnet/genesis-testnet.json

echo "✅ Genesis files downloaded!"
echo ""

# Step 3: Initialize Mainnet
echo "🚀 Step 3/5: Initializing Mainnet (aequitas-1)..."
aequitasd init aequitas-mainnet-validator --chain-id aequitas-1 --home ~/.aequitas

cp genesis-mainnet.json ~/.aequitas/config/genesis.json

# Configure Mainnet RPC
sed -i 's/laddr = "tcp:\/\/127.0.0.1:26657"/laddr = "tcp:\/\/0.0.0.0:26657"/' ~/.aequitas/config/config.toml
sed -i 's/cors_allowed_origins = \[\]/cors_allowed_origins = ["*"]/' ~/.aequitas/config/config.toml

echo "✅ Mainnet initialized (RPC: port 26657)"
echo ""

# Step 4: Initialize Testnet
echo "🚀 Step 4/5: Initializing Testnet (aequitas-testnet-1)..."
aequitasd init aequitas-testnet-validator --chain-id aequitas-testnet-1 --home ~/.aequitas-testnet

cp genesis-testnet.json ~/.aequitas-testnet/config/genesis.json

# Configure Testnet RPC (different port)
sed -i 's/laddr = "tcp:\/\/127.0.0.1:26657"/laddr = "tcp:\/\/0.0.0.0:26658"/' ~/.aequitas-testnet/config/config.toml
sed -i 's/cors_allowed_origins = \[\]/cors_allowed_origins = ["*"]/' ~/.aequitas-testnet/config/config.toml
sed -i 's/laddr = "tcp:\/\/0.0.0.0:26656"/laddr = "tcp:\/\/0.0.0.0:26666"/' ~/.aequitas-testnet/config/config.toml

echo "✅ Testnet initialized (RPC: port 26658)"
echo ""

# Step 5: Create systemd services
echo "🔧 Step 5/5: Creating systemd services..."

# Mainnet service
sudo tee /etc/systemd/system/aequitas-mainnet.service > /dev/null << EOF
[Unit]
Description=Aequitas Mainnet Node
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$HOME
ExecStart=/usr/local/bin/aequitasd start --home $HOME/.aequitas
Restart=on-failure
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF

# Testnet service
sudo tee /etc/systemd/system/aequitas-testnet.service > /dev/null << EOF
[Unit]
Description=Aequitas Testnet Node
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$HOME
ExecStart=/usr/local/bin/aequitasd start --home $HOME/.aequitas-testnet
Restart=on-failure
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload

echo "✅ Systemd services created!"
echo ""
echo "════════════════════════════════════════════════════════"
echo "   ✅ DEPLOYMENT COMPLETE!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "📋 Network Details:"
echo "   • Mainnet Chain ID: aequitas-1"
echo "   • Mainnet RPC: http://159.203.92.230:26657"
echo "   • Testnet Chain ID: aequitas-testnet-1"
echo "   • Testnet RPC: http://159.203.92.230:26658"
echo ""
echo "🚀 Start the blockchain nodes:"
echo ""
echo "   # Start Mainnet"
echo "   sudo systemctl start aequitas-mainnet"
echo "   sudo systemctl enable aequitas-mainnet"
echo ""
echo "   # Start Testnet"
echo "   sudo systemctl start aequitas-testnet"
echo "   sudo systemctl enable aequitas-testnet"
echo ""
echo "📊 Check status:"
echo "   sudo systemctl status aequitas-mainnet"
echo "   sudo systemctl status aequitas-testnet"
echo ""
echo "📝 View logs:"
echo "   sudo journalctl -u aequitas-mainnet -f"
echo "   sudo journalctl -u aequitas-testnet -f"
echo ""
echo "🔍 Test RPC endpoints:"
echo "   curl http://localhost:26657/status"
echo "   curl http://localhost:26658/status"
echo ""
