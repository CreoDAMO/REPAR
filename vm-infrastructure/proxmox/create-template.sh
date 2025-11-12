#!/bin/bash
#
# Aequitas Protocol Zone VM - Proxmox Template Creator
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
TEMPLATE_ID=9000
TEMPLATE_NAME="aequitas-zone-template"
UBUNTU_VERSION="22.04"
UBUNTU_IMAGE="ubuntu-22.04-server-cloudimg-amd64.img"
UBUNTU_URL="https://cloud-images.ubuntu.com/releases/${UBUNTU_VERSION}/release/${UBUNTU_IMAGE}"
STORAGE="local-lvm"
MEMORY=16384
CORES=8
DISK_SIZE="500G"

echo -e "${BLUE}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Aequitas Zone - Proxmox Template Creator       ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════╝${NC}"
echo ""

# Check if running on Proxmox
if ! command -v qm &> /dev/null; then
    echo -e "${RED}✗ This script must be run on a Proxmox VE host${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Running on Proxmox VE${NC}"

# Download Ubuntu Cloud Image
echo -e "${BLUE}Downloading Ubuntu ${UBUNTU_VERSION} Cloud Image...${NC}"
if [ ! -f "${UBUNTU_IMAGE}" ]; then
    wget "${UBUNTU_URL}" -O "${UBUNTU_IMAGE}"
    echo -e "${GREEN}✓ Downloaded Ubuntu image${NC}"
else
    echo -e "${YELLOW}⚠ Image already exists, skipping download${NC}"
fi

# Create VM
echo -e "${BLUE}Creating VM ${TEMPLATE_ID}...${NC}"
if qm status ${TEMPLATE_ID} &> /dev/null; then
    echo -e "${YELLOW}⚠ VM ${TEMPLATE_ID} exists, destroying...${NC}"
    qm destroy ${TEMPLATE_ID}
fi

qm create ${TEMPLATE_ID} \
    --name "${TEMPLATE_NAME}" \
    --memory ${MEMORY} \
    --cores ${CORES} \
    --net0 virtio,bridge=vmbr0 \
    --scsihw virtio-scsi-pci

echo -e "${GREEN}✓ Created VM${NC}"

# Import disk
echo -e "${BLUE}Importing disk image...${NC}"
qm importdisk ${TEMPLATE_ID} ${UBUNTU_IMAGE} ${STORAGE}
qm set ${TEMPLATE_ID} --scsi0 ${STORAGE}:vm-${TEMPLATE_ID}-disk-0
echo -e "${GREEN}✓ Imported disk${NC}"

# Add cloud-init drive
echo -e "${BLUE}Adding cloud-init drive...${NC}"
qm set ${TEMPLATE_ID} --ide2 ${STORAGE}:cloudinit
echo -e "${GREEN}✓ Added cloud-init${NC}"

# Configure boot
echo -e "${BLUE}Configuring boot order...${NC}"
qm set ${TEMPLATE_ID} --boot c --bootdisk scsi0
echo -e "${GREEN}✓ Configured boot${NC}"

# Add serial console
echo -e "${BLUE}Adding serial console...${NC}"
qm set ${TEMPLATE_ID} --serial0 socket --vga serial0
echo -e "${GREEN}✓ Added serial console${NC}"

# Enable QEMU agent
echo -e "${BLUE}Enabling QEMU agent...${NC}"
qm set ${TEMPLATE_ID} --agent enabled=1
echo -e "${GREEN}✓ Enabled QEMU agent${NC}"

# Add additional blockchain storage
echo -e "${BLUE}Adding blockchain storage disk...${NC}"
qm set ${TEMPLATE_ID} --scsi1 ${STORAGE}:${DISK_SIZE}
echo -e "${GREEN}✓ Added blockchain storage${NC}"

# Add evidence storage
echo -e "${BLUE}Adding evidence storage disk...${NC}"
qm set ${TEMPLATE_ID} --scsi2 ${STORAGE}:1000
echo -e "${GREEN}✓ Added evidence storage${NC}"

# Set cloud-init defaults
echo -e "${BLUE}Setting cloud-init defaults...${NC}"
qm set ${TEMPLATE_ID} --ciuser aequitas
qm set ${TEMPLATE_ID} --sshkeys ~/.ssh/id_rsa.pub
qm set ${TEMPLATE_ID} --ipconfig0 ip=dhcp
echo -e "${GREEN}✓ Set cloud-init defaults${NC}"

# Create installation script snippet
cat > /var/lib/vz/snippets/aequitas-install.sh << 'INSTALL_SCRIPT'
#!/bin/bash
# Aequitas Protocol Zone - Auto Installation Script

set -e

echo "Installing Aequitas Protocol Zone..."

# Update system
apt-get update
apt-get upgrade -y

# Install dependencies
apt-get install -y \
    curl wget git build-essential jq nginx supervisor \
    python3 python3-pip nodejs npm fail2ban ufw

# Install Go
wget https://go.dev/dl/go1.21.0.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.21.0.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> /etc/profile
source /etc/profile

# Create aequitas user
useradd -m -s /bin/bash aequitas

# Create directory structure
mkdir -p /var/lib/aequitas /var/lib/evidence /var/log/aequitas /etc/aequitas /opt/cerberus /opt/arbitration

# Install Cosmos SDK
git clone https://github.com/cosmos/cosmos-sdk.git /tmp/cosmos-sdk
cd /tmp/cosmos-sdk && make install

# Configure firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 26657/tcp
ufw allow 26656/tcp
ufw allow 1317/tcp
ufw allow 9090/tcp
ufw allow 443/tcp
ufw allow 80/tcp
ufw --force enable

# Configure fail2ban
systemctl enable fail2ban
systemctl start fail2ban

echo "Aequitas Protocol Zone installation completed!"
INSTALL_SCRIPT

echo -e "${GREEN}✓ Created installation script${NC}"

# Set custom data
echo -e "${BLUE}Setting custom data...${NC}"
qm set ${TEMPLATE_ID} --cicustom "user=local:snippets/aequitas-install.sh"
echo -e "${GREEN}✓ Set custom data${NC}"

# Convert to template
echo -e "${BLUE}Converting to template...${NC}"
qm template ${TEMPLATE_ID}
echo -e "${GREEN}✓ Converted to template${NC}"

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Template created successfully!                  ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}Template Details:${NC}"
echo -e "  ID: ${TEMPLATE_ID}"
echo -e "  Name: ${TEMPLATE_NAME}"
echo -e "  Memory: ${MEMORY}MB"
echo -e "  Cores: ${CORES}"
echo -e "  Disk: ${DISK_SIZE}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Clone template: ${GREEN}./deploy-vm.sh --name aequitas-node-01${NC}"
echo -e "2. Monitor deployment: ${GREEN}qm status <VM_ID>${NC}"
echo ""
