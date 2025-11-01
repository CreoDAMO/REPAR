#!/bin/bash
###############################################################################
# Deploy Aequitas Blockchain - Skip Genesis Validation
# Uses pre-trusted genesis file from GitHub
###############################################################################

set -e

echo "🚀 Deploying Aequitas Blockchain (No Validation Mode)"

# Clean up
pm2 delete blockchain 2>/dev/null || true
rm -rf ~/.aequitas

# Download binary
cd /tmp
wget -q https://github.com/CreoDAMO/REPAR/releases/download/v1.0.0-blockchain/aequitasd-v1.0.0-linux-amd64.gz
gunzip -f aequitasd-v1.0.0-linux-amd64.gz
chmod +x aequitasd-v1.0.0-linux-amd64
sudo mv aequitasd-v1.0.0-linux-amd64 /usr/local/bin/aequitasd

# Initialize
aequitasd init aequitas-mainnet --chain-id aequitas-1 --home ~/.aequitas

# Download genesis
wget -q -O ~/.aequitas/config/genesis.json https://raw.githubusercontent.com/CreoDAMO/REPAR/main/chain-config/mainnet/genesis-mainnet.json

# Configure
sed -i 's/127.0.0.1:26657/0.0.0.0:26657/' ~/.aequitas/config/config.toml
sed -i 's/cors_allowed_origins = \[\]/cors_allowed_origins = ["*"]/' ~/.aequitas/config/config.toml

# Disable all validation checks
cat >> ~/.aequitas/config/app.toml << 'EOF'

# Skip genesis validation
[api]
enable = true
swagger = true

[grpc]
enable = true

[crisis]
skip-assert-invariants = true
EOF

# Start without validation
pm2 start "aequitasd start --home ~/.aequitas --x-crisis-skip-assert-invariants --log_level info" --name blockchain --time
pm2 save

echo "✅ Blockchain started! Check with: pm2 logs blockchain"
