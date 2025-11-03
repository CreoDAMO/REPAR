#!/bin/bash
#
# Aequitas Zone Raspberry Pi Validator Setup Script
# For Raspberry Pi 4/5 running Ubuntu Server or Raspberry Pi OS
#
# Usage: curl -fsSL https://get.aequitas.zone/rpi | bash
#

set -e

echo "🍓 ═══════════════════════════════════════════════════════════"
echo "   AEQUITAS ZONE RASPBERRY PI VALIDATOR SETUP"
echo "   Transform your Raspberry Pi into sovereign territory"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
CHAIN_ID="aequitas-1"
BINARY_VERSION="v1.0.0"
BINARY_URL="https://github.com/CreoDAMO/REPAR/releases/download/${BINARY_VERSION}/aequitasd-linux-arm64"
GENESIS_URL="https://github.com/CreoDAMO/REPAR/releases/download/${BINARY_VERSION}/genesis-mainnet.json"

# Check architecture
ARCH=$(uname -m)
if [[ "$ARCH" != "aarch64" && "$ARCH" != "armv7l" ]]; then
    echo -e "${RED}Error: This script is for ARM architecture (Raspberry Pi) only.${NC}"
    echo "Detected architecture: $ARCH"
    exit 1
fi

echo -e "${GREEN}✓ Detected ARM architecture: $ARCH${NC}"

# Detect Raspberry Pi model
if [ -f /proc/device-tree/model ]; then
    PI_MODEL=$(cat /proc/device-tree/model)
    echo -e "${BLUE}📟 Detected: $PI_MODEL${NC}"
    
    # Check if it's a supported model
    if [[ ! "$PI_MODEL" =~ "Raspberry Pi 4" ]] && [[ ! "$PI_MODEL" =~ "Raspberry Pi 5" ]] && [[ ! "$PI_MODEL" =~ "Raspberry Pi 400" ]]; then
        echo -e "${YELLOW}⚠️  Warning: Raspberry Pi 4, 5, or 400 recommended for best performance${NC}"
    fi
fi

# Check RAM
TOTAL_RAM=$(free -m | awk '/^Mem:/{print $2}')
TOTAL_RAM_GB=$((TOTAL_RAM / 1024))

if [ "$TOTAL_RAM_GB" -lt 4 ]; then
    echo -e "${RED}⚠️  Warning: Only ${TOTAL_RAM_GB}GB RAM. 4GB+ recommended. Performance may be limited.${NC}"
else
    echo -e "${GREEN}✓ RAM: ${TOTAL_RAM_GB}GB${NC}"
fi

# Check for external SSD
echo ""
echo "💾 Storage Configuration"
echo "⚠️  IMPORTANT: Using an external USB SSD is strongly recommended."
echo "   SD cards are too slow for blockchain data."
echo ""
echo "Detected storage devices:"
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT | grep -E "disk|part"
echo ""

read -p "Do you have an external USB SSD connected? (y/n): " HAS_SSD

if [ "$HAS_SSD" = "y" ]; then
    echo ""
    echo "Available unmounted disks:"
    lsblk -o NAME,SIZE,TYPE,MOUNTPOINT | grep disk | grep -v mmcblk
    echo ""
    read -p "Enter the device name for your SSD (e.g., sda): " SSD_DEVICE
    SSD_DEVICE="/dev/${SSD_DEVICE}"
    
    # Check if already mounted
    if mount | grep "$SSD_DEVICE" > /dev/null; then
        SSD_MOUNT=$(mount | grep "$SSD_DEVICE" | awk '{print $3}' | head -1)
        echo -e "${YELLOW}ℹ  SSD already mounted at $SSD_MOUNT${NC}"
    else
        SSD_MOUNT="/mnt/ssd"
        echo "🔧 Mounting SSD to $SSD_MOUNT..."
        sudo mkdir -p "$SSD_MOUNT"
        
        # Format if needed
        read -p "Format SSD as ext4? This will ERASE all data! (y/n): " FORMAT_SSD
        if [ "$FORMAT_SSD" = "y" ]; then
            sudo mkfs.ext4 -F "${SSD_DEVICE}1"
        fi
        
        sudo mount "${SSD_DEVICE}1" "$SSD_MOUNT"
        
        # Add to fstab for auto-mount
        SSD_UUID=$(sudo blkid -s UUID -o value "${SSD_DEVICE}1")
        if ! grep -q "$SSD_UUID" /etc/fstab; then
            echo "UUID=$SSD_UUID $SSD_MOUNT ext4 defaults,nofail 0 2" | sudo tee -a /etc/fstab
        fi
        
        echo -e "${GREEN}✓ SSD mounted at $SSD_MOUNT${NC}"
    fi
    
    NODE_HOME="$SSD_MOUNT/aequitas"
else
    echo -e "${YELLOW}⚠️  Using SD card storage. Performance will be limited.${NC}"
    NODE_HOME="/home/pi/.aequitas"
fi

# System optimization for Raspberry Pi
echo ""
echo "⚡ Optimizing system for validator performance..."

# Increase swap if low RAM
if [ "$TOTAL_RAM_GB" -lt 8 ]; then
    echo "💾 Increasing swap space (low RAM detected)..."
    sudo dphys-swapfile swapoff 2>/dev/null || true
    sudo sed -i 's/CONF_SWAPSIZE=100/CONF_SWAPSIZE=2048/' /etc/dphys-swapfile 2>/dev/null || true
    sudo dphys-swapfile setup 2>/dev/null || true
    sudo dphys-swapfile swapon 2>/dev/null || true
fi

# Kernel parameters
echo "vm.swappiness=10" | sudo tee -a /etc/sysctl.conf
echo "vm.vfs_cache_pressure=50" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

echo -e "${GREEN}✓ System optimized${NC}"

# Update system
echo ""
echo "📦 Updating system packages..."
sudo apt-get update -qq
sudo apt-get upgrade -y -qq
sudo apt-get install -y -qq curl wget jq git htop

echo -e "${GREEN}✓ System updated${NC}"

# Download ARM binary
echo ""
echo "⬇️  Downloading Aequitas ARM validator binary..."
wget -q --show-progress "$BINARY_URL" -O /tmp/aequitasd
chmod +x /tmp/aequitasd

# Install binary
sudo mv /tmp/aequitasd /usr/local/bin/
echo -e "${GREEN}✓ Binary installed to /usr/local/bin/aequitasd${NC}"

# Verify it runs
echo "🔍 Verifying binary..."
/usr/local/bin/aequitasd version
echo -e "${GREEN}✓ Binary is functional${NC}"

# Get validator name
echo ""
echo "📝 Node Configuration"
read -p "Enter your validator name (e.g., rpi-validator): " VALIDATOR_NAME
VALIDATOR_NAME=${VALIDATOR_NAME:-rpi-validator-$(date +%s)}

# Initialize node
echo "🔧 Initializing validator node..."
mkdir -p "$NODE_HOME"
sudo chown -R $USER:$USER "$NODE_HOME"
aequitasd init "$VALIDATOR_NAME" --chain-id "$CHAIN_ID" --home "$NODE_HOME"
echo -e "${GREEN}✓ Node initialized at $NODE_HOME${NC}"

# Download genesis
echo "📜 Downloading genesis file..."
wget -q "$GENESIS_URL" -O "$NODE_HOME/config/genesis.json"
echo -e "${GREEN}✓ Genesis file downloaded${NC}"

# Configure for Raspberry Pi (lighter settings)
echo "⚙️  Configuring for Raspberry Pi..."

# Minimum gas prices
sed -i 's/minimum-gas-prices = ""/minimum-gas-prices = "0.01urepar"/' "$NODE_HOME/config/app.toml"

# Reduce cache size for low RAM
sed -i 's/cache_size = 10000/cache_size = 1000/' "$NODE_HOME/config/app.toml"

# P2P settings
sed -i 's/max_num_inbound_peers = 40/max_num_inbound_peers = 20/' "$NODE_HOME/config/config.toml"
sed -i 's/max_num_outbound_peers = 10/max_num_outbound_peers = 5/' "$NODE_HOME/config/config.toml"

# Add persistent peers
PEERS="core1@rpc.aequitasprotocol.zone:26656,core2@rpc2.aequitasprotocol.zone:26656"
sed -i "s/persistent_peers = \"\"/persistent_peers = \"$PEERS\"/" "$NODE_HOME/config/config.toml"

# Enable state sync
sed -i 's/enable = false/enable = true/' "$NODE_HOME/config/config.toml"

echo -e "${GREEN}✓ Node configured for Raspberry Pi${NC}"

# Create systemd service
echo "🚀 Creating systemd service..."
sudo tee /etc/systemd/system/aequitas-rpi.service > /dev/null << EOF
[Unit]
Description=Aequitas Raspberry Pi Validator Node
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$HOME
ExecStart=/usr/local/bin/aequitasd start --home $NODE_HOME
Restart=always
RestartSec=3
LimitNOFILE=65536
StandardOutput=journal
StandardError=journal
SyslogIdentifier=aequitas-rpi

# Raspberry Pi specific
Nice=10
CPUQuota=90%

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable aequitas-rpi
echo -e "${GREEN}✓ Systemd service created${NC}"

# Start node
echo ""
read -p "Start validator node now? (y/n): " START_NOW
if [ "$START_NOW" = "y" ]; then
    echo "🚀 Starting validator node..."
    sudo systemctl start aequitas-rpi
    sleep 3
    
    if sudo systemctl is-active --quiet aequitas-rpi; then
        echo -e "${GREEN}✓ Validator node is running!${NC}"
    else
        echo -e "${RED}⚠️  Node failed to start. Check logs with: sudo journalctl -u aequitas-rpi -f${NC}"
    fi
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${GREEN}🎉 RASPBERRY PI VALIDATOR SETUP COMPLETE!${NC}"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "🍓 Raspberry Pi Validator Information:"
echo "   Name:     $VALIDATOR_NAME"
echo "   Model:    $PI_MODEL"
echo "   RAM:      ${TOTAL_RAM_GB}GB"
echo "   Storage:  $NODE_HOME"
echo "   Chain ID: $CHAIN_ID"
echo ""
echo "🔧 Useful Commands:"
echo "   Start:    sudo systemctl start aequitas-rpi"
echo "   Stop:     sudo systemctl stop aequitas-rpi"
echo "   Status:   sudo systemctl status aequitas-rpi"
echo "   Logs:     sudo journalctl -u aequitas-rpi -f"
echo "   Monitor:  htop"
echo ""
echo "💡 Performance Tips:"
echo "   - Keep your Pi cool (add a fan if needed)"
echo "   - Use a quality power supply (official recommended)"
echo "   - Monitor temperature: vcgencmd measure_temp"
echo "   - Check disk I/O: iostat -x 1"
echo ""
echo "🌐 Next Steps:"
echo "   1. Wait for node to sync (check logs)"
echo "   2. Monitor system resources with htop"
echo "   3. Join Discord: https://discord.gg/aequitas"
echo "   4. Register as 'Sovereign Infrastructure Guardian'"
echo ""
echo "⚖️  Your Raspberry Pi is now sovereign territory!"
echo "═══════════════════════════════════════════════════════════"
