#!/bin/bash
#
# Aequitas Protocol Zone - VM Installation Script
# This script delegates to the existing deployment infrastructure
# and adds VM-specific enhancements
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
GO_VERSION="1.21.0"
NODE_VERSION="20"
PYTHON_VERSION="3.11"
COSMOS_SDK_VERSION="v0.50.11"
AEQUITAS_HOME="/var/lib/aequitas"
EVIDENCE_HOME="/var/lib/evidence"

echo -e "${BLUE}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Aequitas Protocol Zone - Full Stack Installer  ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════╝${NC}"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}✗ This script must be run as root${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Running as root${NC}"

# Update system
echo -e "${BLUE}Updating system...${NC}"
apt-get update && apt-get upgrade -y
echo -e "${GREEN}✓ System updated${NC}"

# Install system dependencies
echo -e "${BLUE}Installing system dependencies...${NC}"
apt-get install -y \
    curl wget git build-essential jq vim nano \
    nginx supervisor python3 python3-pip nodejs npm \
    fail2ban ufw ca-certificates gnupg lsb-release \
    libssl-dev pkg-config protobuf-compiler
echo -e "${GREEN}✓ System dependencies installed${NC}"

# Install Go
echo -e "${BLUE}Installing Go ${GO_VERSION}...${NC}"
if ! command -v go &> /dev/null; then
    wget https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz
    tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz
    rm go${GO_VERSION}.linux-amd64.tar.gz
    
    # Add Go to PATH
    cat >> /etc/profile << 'EOF'
export PATH=$PATH:/usr/local/go/bin
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
EOF
    source /etc/profile
    echo -e "${GREEN}✓ Go installed${NC}"
else
    echo -e "${YELLOW}⚠ Go already installed${NC}"
fi

# Install Node.js
echo -e "${BLUE}Installing Node.js ${NODE_VERSION}...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt-get install -y nodejs
    echo -e "${GREEN}✓ Node.js installed${NC}"
else
    echo -e "${YELLOW}⚠ Node.js already installed${NC}"
fi

# Install Python dependencies
echo -e "${BLUE}Installing Python dependencies...${NC}"
pip3 install --upgrade pip
pip3 install anthropic openai requests aiohttp psycopg2-binary sqlalchemy
echo -e "${GREEN}✓ Python dependencies installed${NC}"

# Create aequitas user
echo -e "${BLUE}Creating aequitas user...${NC}"
if ! id "aequitas" &>/dev/null; then
    useradd -m -s /bin/bash aequitas
    echo -e "${GREEN}✓ Aequitas user created${NC}"
else
    echo -e "${YELLOW}⚠ Aequitas user already exists${NC}"
fi

# Create directory structure
echo -e "${BLUE}Creating directory structure...${NC}"
mkdir -p \
    ${AEQUITAS_HOME}/{config,data,keyring-test} \
    ${EVIDENCE_HOME} \
    /var/log/aequitas \
    /etc/aequitas \
    /opt/{cerberus,chaos-defense,arbitration,dashboard}

chown -R aequitas:aequitas ${AEQUITAS_HOME}
chown -R aequitas:aequitas ${EVIDENCE_HOME}
chown -R aequitas:aequitas /var/log/aequitas
echo -e "${GREEN}✓ Directory structure created${NC}"

# Install Cosmos SDK
echo -e "${BLUE}Installing Cosmos SDK ${COSMOS_SDK_VERSION}...${NC}"
if ! command -v cosmovisor &> /dev/null; then
    go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
    echo -e "${GREEN}✓ Cosmovisor installed${NC}"
else
    echo -e "${YELLOW}⚠ Cosmovisor already installed${NC}"
fi

# =========================================================================
# DELEGATE TO EXISTING DEPLOYMENT SCRIPT
# =========================================================================
# The main blockchain deployment is handled by the existing production script
# This ensures consistency across all deployment methods

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  Running Core Blockchain Deployment${NC}"
echo -e "${BLUE}================================================${NC}"

# Check if we're in the correct directory structure
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

if [ ! -f "$PROJECT_ROOT/scripts/deploy-blockchain-complete.sh" ]; then
    echo -e "${RED}✗ Cannot find deployment script${NC}"
    echo -e "${YELLOW}Expected: $PROJECT_ROOT/scripts/deploy-blockchain-complete.sh${NC}"
    exit 1
fi

# Run the existing deployment script
echo -e "${GREEN}✓ Using existing deployment infrastructure${NC}"
cd "$PROJECT_ROOT"
bash ./scripts/deploy-blockchain-complete.sh

# =========================================================================
# VM-SPECIFIC ENHANCEMENTS
# =========================================================================
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  Adding VM-Specific Features${NC}"
echo -e "${BLUE}================================================${NC}"

# Verify Aequitas blockchain binary was built  
echo -e "${BLUE}Verifying Aequitas blockchain binary...${NC}"
if command -v aequitasd &> /dev/null; then
    aequitasd version
    echo -e "${GREEN}✓ Aequitas blockchain binary verified${NC}"
else
    echo -e "${RED}✗ Binary not found - deployment script may have failed${NC}"
    exit 1
fi

# =========================================================================
# INSTALL CERBERUS AI AUDITOR (from existing production code)
# =========================================================================
echo -e "${BLUE}Installing Cerberus AI Auditor...${NC}"

# Create cerberus user
if ! id "cerberus" &>/dev/null; then
    useradd -m -s /bin/bash cerberus
    echo -e "${GREEN}✓ Cerberus user created${NC}"
fi

# Copy production Cerberus code
cp -r "$PROJECT_ROOT/auditor" /opt/cerberus
chown -R cerberus:cerberus /opt/cerberus
mkdir -p /var/lib/cerberus /var/log/cerberus
chown cerberus:cerberus /var/lib/cerberus /var/log/cerberus

# Install Python dependencies
cd /opt/cerberus
pip3 install -r requirements.txt

# Install systemd service
cp "$SCRIPT_DIR/cerberus-auditor.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable cerberus-auditor
echo -e "${GREEN}✓ Cerberus AI Auditor installed${NC}"

# =========================================================================
# SECURITY HARDENING
# =========================================================================
echo -e "${BLUE}Applying security hardening...${NC}"
if [ -f "$SCRIPT_DIR/security-hardening.sh" ]; then
    bash "$SCRIPT_DIR/security-hardening.sh"
    echo -e "${GREEN}✓ Security hardening applied${NC}"
else
    echo -e "${YELLOW}⚠ Security hardening script not found${NC}"
fi

# =========================================================================
# COMPLETE
# =========================================================================
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}  VM Installation Complete!${NC}"
echo -e "${GREEN}================================================${NC}"
user=root

[program:aequitasd]
command=/usr/local/bin/aequitasd start --home /var/lib/aequitas
directory=/var/lib/aequitas
user=aequitas
autostart=true
autorestart=true
stdout_logfile=/var/log/aequitas/aequitasd.log
stderr_logfile=/var/log/aequitas/aequitasd-error.log

[program:cerberus]
command=/usr/bin/python3 /opt/cerberus/cerberus_auditor.py
user=aequitas
autostart=true
autorestart=true
stdout_logfile=/var/log/aequitas/cerberus.log
stderr_logfile=/var/log/aequitas/cerberus-error.log

[program:chaos-defense]
command=/usr/bin/python3 /opt/chaos-defense/chaos_defense.py
user=aequitas
autostart=true
autorestart=true
stdout_logfile=/var/log/aequitas/chaos-defense.log
stderr_logfile=/var/log/aequitas/chaos-defense-error.log
SUPERVISOR

echo -e "${GREEN}✓ Supervisor configured${NC}"

# Configure Nginx
echo -e "${BLUE}Configuring Nginx...${NC}"
cat > /etc/nginx/sites-available/aequitas << 'NGINX'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:1317/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    location /rpc/ {
        proxy_pass http://localhost:26657/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/aequitas /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
echo -e "${GREEN}✓ Nginx configured${NC}"

# Create systemd service
echo -e "${BLUE}Creating systemd service...${NC}"
cat > /etc/systemd/system/aequitas-zone.service << 'SYSTEMD'
[Unit]
Description=Aequitas Protocol Zone
After=network-online.target
Wants=network-online.target

[Service]
User=aequitas
Group=aequitas
Type=simple
ExecStart=/usr/local/bin/aequitasd start --home /var/lib/aequitas
Restart=on-failure
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
SYSTEMD

systemctl daemon-reload
echo -e "${GREEN}✓ Systemd service created${NC}"

# Final summary
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Installation completed successfully!            ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}Installed components:${NC}"
echo -e "  ✓ Go ${GO_VERSION}"
echo -e "  ✓ Node.js ${NODE_VERSION}"
echo -e "  ✓ Python ${PYTHON_VERSION}"
echo -e "  ✓ Cosmos SDK ${COSMOS_SDK_VERSION}"
echo -e "  ✓ Aequitas Zone blockchain"
echo -e "  ✓ Cerberus AI Auditor"
echo -e "  ✓ Chaos Defense System"
echo -e "  ✓ Nginx reverse proxy"
echo -e "  ✓ Supervisor process manager"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  • Start services: ${GREEN}systemctl start aequitas-zone${NC}"
echo -e "  • Enable on boot: ${GREEN}systemctl enable aequitas-zone${NC}"
echo -e "  • Check status: ${GREEN}systemctl status aequitas-zone${NC}"
echo -e "  • View logs: ${GREEN}journalctl -u aequitas-zone -f${NC}"
echo ""
echo -e "${YELLOW}Service endpoints:${NC}"
echo -e "  • RPC: ${GREEN}http://localhost:26657${NC}"
echo -e "  • REST: ${GREEN}http://localhost:1317${NC}"
echo -e "  • Dashboard: ${GREEN}http://localhost:3000${NC}"
echo ""
