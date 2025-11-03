#!/bin/bash
#
# Aequitas Zone Home Validator Setup Script
# For Linux (Ubuntu/Debian) home computers
#
# Usage: curl -fsSL https://get.aequitas.zone | bash
#

set -e

echo "🏠 ═══════════════════════════════════════════════════════════"
echo "   AEQUITAS ZONE HOME VALIDATOR SETUP"
echo "   Your home computer becomes sovereign territory"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
CHAIN_ID="aequitas-1"
BINARY_VERSION="v1.0.0"
BINARY_URL="https://github.com/CreoDAMO/REPAR/releases/download/${BINARY_VERSION}/aequitasd-linux-amd64"
GENESIS_URL="https://github.com/CreoDAMO/REPAR/releases/download/${BINARY_VERSION}/genesis-mainnet.json"
EXPECTED_CHECKSUM="3b3db469e1185d3be9cf63881e79500573a0a3e5983b715f6d66f4d8b027f0ce"

# Detect OS
if [[ "$OSTYPE" != "linux-gnu"* ]]; then
    echo -e "${RED}Error: This script is for Linux only.${NC}"
    echo "For macOS, use: curl -fsSL https://get.aequitas.zone/macos | bash"
    echo "For Windows, use PowerShell script: scripts/windows-validator-setup.ps1"
    exit 1
fi

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo -e "${YELLOW}Warning: Running as root. Consider using a regular user.${NC}"
    SUDO=""
else
    SUDO="sudo"
fi

# System requirements check
echo "📋 Checking system requirements..."

# CPU cores
CPU_CORES=$(nproc)
if [ "$CPU_CORES" -lt 4 ]; then
    echo -e "${RED}⚠️  Warning: Only $CPU_CORES CPU cores detected. 4+ recommended.${NC}"
else
    echo -e "${GREEN}✓ CPU: $CPU_CORES cores${NC}"
fi

# RAM
TOTAL_RAM=$(free -g | awk '/^Mem:/{print $2}')
if [ "$TOTAL_RAM" -lt 8 ]; then
    echo -e "${RED}⚠️  Warning: Only ${TOTAL_RAM}GB RAM detected. 8GB+ recommended.${NC}"
else
    echo -e "${GREEN}✓ RAM: ${TOTAL_RAM}GB${NC}"
fi

# Disk space
AVAILABLE_DISK=$(df -BG / | awk 'NR==2 {print $4}' | sed 's/G//')
if [ "$AVAILABLE_DISK" -lt 500 ]; then
    echo -e "${RED}⚠️  Warning: Only ${AVAILABLE_DISK}GB disk space available. 500GB+ recommended.${NC}"
else
    echo -e "${GREEN}✓ Disk: ${AVAILABLE_DISK}GB available${NC}"
fi

echo ""

# Install dependencies
echo "📦 Installing dependencies..."
$SUDO apt-get update -qq
$SUDO apt-get install -y -qq curl wget jq git > /dev/null 2>&1
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Download binary
echo "⬇️  Downloading Aequitas validator binary..."
wget -q --show-progress "$BINARY_URL" -O /tmp/aequitasd
chmod +x /tmp/aequitasd

# Verify checksum
echo "🔐 Verifying binary checksum..."
ACTUAL_CHECKSUM=$(sha256sum /tmp/aequitasd | awk '{print $1}')
if [ "$ACTUAL_CHECKSUM" != "$EXPECTED_CHECKSUM" ]; then
    echo -e "${RED}Error: Checksum mismatch!${NC}"
    echo "Expected: $EXPECTED_CHECKSUM"
    echo "Got:      $ACTUAL_CHECKSUM"
    exit 1
fi
echo -e "${GREEN}✓ Checksum verified${NC}"

# Install binary
$SUDO mv /tmp/aequitasd /usr/local/bin/
echo -e "${GREEN}✓ Binary installed to /usr/local/bin/aequitasd${NC}"

# Create dedicated user (optional, skip if exists)
if ! id -u aequitas-validator > /dev/null 2>&1; then
    echo "👤 Creating validator user..."
    $SUDO useradd -m -s /bin/bash aequitas-validator
    echo -e "${GREEN}✓ User 'aequitas-validator' created${NC}"
else
    echo -e "${YELLOW}ℹ  User 'aequitas-validator' already exists${NC}"
fi

# Get validator name
echo ""
echo "📝 Node Configuration"
read -p "Enter your validator name (e.g., home-validator): " VALIDATOR_NAME
VALIDATOR_NAME=${VALIDATOR_NAME:-home-validator-$(date +%s)}

# Initialize node
echo "🔧 Initializing validator node..."
$SUDO -u aequitas-validator aequitasd init "$VALIDATOR_NAME" --chain-id "$CHAIN_ID" --home /home/aequitas-validator/.aequitas
echo -e "${GREEN}✓ Node initialized${NC}"

# Download genesis
echo "📜 Downloading genesis file..."
$SUDO -u aequitas-validator wget -q "$GENESIS_URL" -O /home/aequitas-validator/.aequitas/config/genesis.json
echo -e "${GREEN}✓ Genesis file downloaded${NC}"

# Configure node
echo "⚙️  Configuring node..."

# Set minimum gas prices
$SUDO -u aequitas-validator sed -i 's/minimum-gas-prices = ""/minimum-gas-prices = "0.01urepar"/' /home/aequitas-validator/.aequitas/config/app.toml

# Enable API
$SUDO -u aequitas-validator sed -i 's/enable = false/enable = true/' /home/aequitas-validator/.aequitas/config/app.toml

# Configure RPC to listen on all interfaces (for monitoring)
$SUDO -u aequitas-validator sed -i 's|laddr = "tcp://127.0.0.1:26657"|laddr = "tcp://0.0.0.0:26657"|' /home/aequitas-validator/.aequitas/config/config.toml

# Add persistent peers (will be populated with core validators)
PEERS="core1@rpc.aequitasprotocol.zone:26656,core2@rpc2.aequitasprotocol.zone:26656"
$SUDO -u aequitas-validator sed -i "s/persistent_peers = \"\"/persistent_peers = \"$PEERS\"/" /home/aequitas-validator/.aequitas/config/config.toml

# Enable state sync for faster initial sync
$SUDO -u aequitas-validator sed -i 's/enable = false/enable = true/' /home/aequitas-validator/.aequitas/config/config.toml

echo -e "${GREEN}✓ Node configured${NC}"

# Create systemd service
echo "🚀 Creating systemd service..."
$SUDO tee /etc/systemd/system/aequitas-home.service > /dev/null << EOF
[Unit]
Description=Aequitas Home Validator Node
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=aequitas-validator
WorkingDirectory=/home/aequitas-validator
ExecStart=/usr/local/bin/aequitasd start --home /home/aequitas-validator/.aequitas
Restart=always
RestartSec=3
LimitNOFILE=65536
StandardOutput=journal
StandardError=journal
SyslogIdentifier=aequitas-validator

[Install]
WantedBy=multi-user.target
EOF

$SUDO systemctl daemon-reload
$SUDO systemctl enable aequitas-home
echo -e "${GREEN}✓ Systemd service created and enabled${NC}"

# Firewall configuration
echo ""
echo "🛡️  Firewall Configuration"
if command -v ufw > /dev/null; then
    read -p "Configure UFW firewall? (y/n): " CONFIGURE_FW
    if [ "$CONFIGURE_FW" = "y" ]; then
        $SUDO ufw allow 26656/tcp comment 'Aequitas P2P'
        $SUDO ufw allow 26657/tcp comment 'Aequitas RPC'
        echo -e "${GREEN}✓ Firewall rules added${NC}"
        echo -e "${YELLOW}⚠️  Note: You may need to configure router port forwarding for external access${NC}"
    fi
fi

# Start node
echo ""
read -p "Start validator node now? (y/n): " START_NOW
if [ "$START_NOW" = "y" ]; then
    echo "🚀 Starting validator node..."
    $SUDO systemctl start aequitas-home
    sleep 3
    
    # Check status
    if $SUDO systemctl is-active --quiet aequitas-home; then
        echo -e "${GREEN}✓ Validator node is running!${NC}"
    else
        echo -e "${RED}⚠️  Node failed to start. Check logs with: sudo journalctl -u aequitas-home -f${NC}"
    fi
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}🎉 SETUP COMPLETE!${NC}"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📊 Validator Information:"
echo "   Name:     $VALIDATOR_NAME"
echo "   Chain ID: $CHAIN_ID"
echo "   Home:     /home/aequitas-validator/.aequitas"
echo ""
echo "🔧 Useful Commands:"
echo "   Start:    sudo systemctl start aequitas-home"
echo "   Stop:     sudo systemctl stop aequitas-home"
echo "   Status:   sudo systemctl status aequitas-home"
echo "   Logs:     sudo journalctl -u aequitas-home -f"
echo "   Version:  aequitasd version"
echo ""
echo "🌐 Next Steps:"
echo "   1. Configure router port forwarding for ports 26656-26657"
echo "   2. Wait for node to sync (check logs)"
echo "   3. Join Discord for support: https://discord.gg/aequitas"
echo "   4. Register as 'Sovereign Infrastructure Guardian'"
echo ""
echo "📚 Documentation:"
echo "   https://docs.aequitas.zone/validators/home-setup"
echo ""
echo "⚖️  Your home is now sovereign territory of the Aequitas Nation!"
echo "═══════════════════════════════════════════════════════════"
