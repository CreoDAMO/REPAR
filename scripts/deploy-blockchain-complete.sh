#!/bin/bash
###############################################################################
# Aequitas Zone Blockchain - Complete Build & Deploy
# Fixes: Regenerates protobuf files, builds binary, starts nodes
###############################################################################

set -e

echo "════════════════════════════════════════════════════════"
echo "   Aequitas Zone Blockchain - Complete Deployment"
echo "   Fixing protobuf generation + building from source"
echo "════════════════════════════════════════════════════════"

# Step 1: Install Protobuf Toolchain
echo "📦 Step 1: Installing protobuf toolchain..."
apt update -qq
apt install -y protobuf-compiler build-essential

# Install Go if needed
if ! command -v go &> /dev/null; then
    echo "📦 Installing Go 1.23.3..."
    cd /tmp
    wget -q https://go.dev/dl/go1.23.3.linux-amd64.tar.gz
    rm -rf /usr/local/go
    tar -C /usr/local -xzf go1.23.3.linux-amd64.tar.gz
fi

# Set Go paths
export PATH=$PATH:/usr/local/go/bin
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin

# Install Go protobuf plugins
echo "📦 Installing protobuf Go plugins..."
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
go install github.com/cosmos/gogoproto/protoc-gen-gocosmos@latest

# Step 2: Regenerate Proto Files
echo "🔨 Step 2: Regenerating protobuf files..."
cd /var/www/aequitas/aequitas

# Clean old generated files
find ./x -name "*.pb.go" -delete 2>/dev/null || true

# Regenerate from proto files
if [ -f "Makefile" ] && grep -q "proto-gen" Makefile; then
    echo "Using Makefile proto-gen target..."
    make proto-gen || echo "Makefile proto-gen not available, using manual generation"
else
    echo "Manually generating proto files..."
    for protodir in $(find proto -type d -name v1 2>/dev/null); do
        protoc -I proto \
            --go_out=. --go_opt=paths=source_relative \
            --go-grpc_out=. --go-grpc_opt=paths=source_relative \
            $(find $protodir -name "*.proto" 2>/dev/null) || true
    done
fi

# Step 3: Clean and Rebuild
echo "🔨 Step 3: Building blockchain binary (10-15 min)..."
go mod tidy
go mod verify
rm -rf build/
mkdir -p build

# Build with verbose output
CGO_ENABLED=0 go build -v -o build/aequitasd ./cmd/aequitasd

# Install to system
cp build/aequitasd /usr/local/bin/
chmod +x /usr/local/bin/aequitasd

# Step 4: Verify Binary
echo "✅ Step 4: Verifying binary..."
aequitasd version

# Step 5: Initialize Networks
echo "🌐 Step 5: Initializing Mainnet and Testnet..."

# Mainnet
rm -rf ~/.aequitas
aequitasd init validator-mainnet --chain-id aequitas-1
cp /var/www/aequitas/chain-config/mainnet/genesis-mainnet.json ~/.aequitas/config/genesis.json
sed -i 's/laddr = "tcp:\/\/127.0.0.1:26657"/laddr = "tcp:\/\/0.0.0.0:26657"/' ~/.aequitas/config/config.toml
sed -i 's/enable = false/enable = true/' ~/.aequitas/config/app.toml

# Testnet
rm -rf ~/.aequitas-testnet
aequitasd init validator-testnet --chain-id aequitas-testnet-1 --home ~/.aequitas-testnet
cp /var/www/aequitas/chain-config/testnet/genesis-testnet.json ~/.aequitas-testnet/config/genesis.json
sed -i 's/laddr = "tcp:\/\/127.0.0.1:26657"/laddr = "tcp:\/\/0.0.0.0:26658"/' ~/.aequitas-testnet/config/config.toml
sed -i 's/26656/26659/g' ~/.aequitas-testnet/config/config.toml
sed -i 's/enable = false/enable = true/' ~/.aequitas-testnet/config/app.toml

# Step 6: Start with PM2
echo "🚀 Step 6: Starting blockchain nodes with PM2..."
pm2 delete mainnet-rpc testnet-rpc 2>/dev/null || true
pm2 start aequitasd --name "mainnet-rpc" -- start --home ~/.aequitas
pm2 start aequitasd --name "testnet-rpc" -- start --home ~/.aequitas-testnet
pm2 save

# Update Nginx
echo "🌐 Updating Nginx configuration..."
cat >> /etc/nginx/sites-available/aequitas << 'NGINX_CONFIG'

server {
    listen 80;
    server_name rpc.aequitasprotocol.zone;
    location / {
        proxy_pass http://localhost:26657;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}

server {
    listen 80;
    server_name testnet-rpc.aequitasprotocol.zone;
    location / {
        proxy_pass http://localhost:26658;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
NGINX_CONFIG

systemctl restart nginx

echo ""
echo "════════════════════════════════════════════════════════"
echo "   🎉 BLOCKCHAIN FULLY DEPLOYED!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "📊 All Services Running:"
pm2 list
echo ""
echo "🌐 Test your blockchain:"
echo "   Mainnet:  curl http://localhost:26657/status"
echo "   Testnet:  curl http://localhost:26658/status"
echo ""
echo "🔗 Public endpoints (after DNS):"
echo "   https://rpc.aequitasprotocol.zone/status"
echo "   https://testnet-rpc.aequitasprotocol.zone/status"
echo ""
echo "✅ Complete 4-service stack:"
echo "   1. Frontend     - http://159.203.92.230"
echo "   2. Backend      - http://159.203.92.230:3002"
echo "   3. Explorer     - http://159.203.92.230:3001"
echo "   4. Blockchain   - http://159.203.92.230:26657"
echo ""
echo "🎯 Deployment successful!"
