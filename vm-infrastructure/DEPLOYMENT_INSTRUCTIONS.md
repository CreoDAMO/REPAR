# 🚀 Sovereign VM Deployment Instructions

## Complete Guide to Deploying Aequitas Blockchain Nodes Without Cloud Dependencies

---

## Prerequisites

### Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **CPU** | 4 cores with VT-x/AMD-V | 8 cores |
| **RAM** | 8GB | 16GB+ |
| **Storage** | 100GB SSD | 500GB NVMe SSD |
| **Network** | 10Mbps up/down | 100Mbps+ fiber |
| **OS** | Ubuntu 22.04 LTS | Ubuntu 22.04/24.04 LTS |

### Software Dependencies

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y \
  qemu-kvm \
  qemu-utils \
  cloud-image-utils \
  wget \
  nodejs \
  npm

# Verify KVM support
egrep -c '(vmx|svm)' /proc/cpuinfo
# Should return number > 0

# Load KVM module (if not loaded)
sudo modprobe kvm-intel  # or kvm-amd for AMD CPUs

# Add your user to kvm group
sudo usermod -a -G kvm $USER
# Log out and back in for group to take effect
```

---

## Method 1: Quick Deploy with CLI (5 minutes)

**Best for**: Testing, single node deployment, rapid prototyping

### Step 1: Install CLI

```bash
cd vm-infrastructure/cli
npm install
```

### Step 2: Deploy Node

```bash
# Deploy with default settings (4 cores, 8GB RAM, 100GB disk)
npm start deploy -- \
  --provider local-kvm \
  --name aequitas-validator-01

# Deploy with custom specs
npm start deploy -- \
  --provider local-kvm \
  --name mainnet-validator \
  --cores 8 \
  --memory 16 \
  --storage 500
```

### Step 3: Verify Deployment

```bash
# Check node status
npm start status aequitas-validator-01

# View logs
npm start logs aequitas-validator-01

# Check blockchain sync
curl http://localhost:26657/status | jq .result.sync_info
```

### What Happens:

1. **Downloads Ubuntu 22.04 cloud image** (~700MB, cached for future deploys)
2. **Creates VM disk** from base image, resized to your specification
3. **Generates cloud-init config** with automated provisioning
4. **Boots QEMU/KVM VM** with port forwarding (26656, 26657, 1317, 9090)
5. **Auto-provisions blockchain**:
   - Installs Go 1.21.5
   - Clones Aequitas repo
   - Compiles `aequitasd` binary
   - Initializes node with chain-id `aequitas-1`
   - Downloads mainnet genesis
   - Starts blockchain via systemd
6. **Waits for node to sync** and become healthy

**Total time**: ~5 minutes (first time), ~2 minutes (subsequent deploys)

---

## Method 2: Pre-built Image Distribution (Recommended for Scale)

**Best for**: Community distribution, rapid scaling, consistent deployments

### Step 1: Build Distributable Image (Once)

```bash
cd vm-infrastructure/packer

# Build image using Packer
./build.sh

# This creates:
# - output/aequitas-zone-node.qcow2 (~4GB uncompressed)
# - output/aequitas-zone-node.qcow2.gz (~2GB compressed)

# Build time: 15-30 minutes (one time only)
```

### Step 2: Distribute Image

```bash
# Option A: Upload to GitHub releases
gh release create v1.0.0 \
  output/aequitas-zone-node.qcow2.gz \
  --title "Aequitas Zone v1.0.0" \
  --notes "Pre-built blockchain node image"

# Option B: Upload to IPFS
ipfs add output/aequitas-zone-node.qcow2.gz

# Option C: Torrent distribution
transmission-create -o aequitas-node-v1.0.0.torrent \
  output/aequitas-zone-node.qcow2.gz
```

### Step 3: Community Downloads and Deploys

```bash
# Download from GitHub releases
wget https://github.com/CreoDAMO/REPAR/releases/download/v1.0.0/aequitas-zone-node.qcow2.gz

# Or from IPFS
ipfs get <IPFS_HASH> -o aequitas-zone-node.qcow2.gz

# Decompress
gunzip aequitas-zone-node.qcow2.gz

# Deploy with CLI
cd vm-infrastructure/cli
npm start deploy -- \
  --provider local-kvm \
  --image ../../packer/output/aequitas-zone-node.qcow2 \
  --name instant-node
```

**Advantage**: Community members deploy in **under 60 seconds** (no compilation, pre-provisioned)

---

## Method 3: Manual QEMU Deployment (Advanced)

**Best for**: Custom configurations, non-standard environments

```bash
# 1. Download base image
wget https://cloud-images.ubuntu.com/releases/jammy/release/ubuntu-22.04-server-cloudimg-amd64.img

# 2. Create VM disk from base
qemu-img create -f qcow2 -F qcow2 \
  -b ubuntu-22.04-server-cloudimg-amd64.img \
  aequitas-node.qcow2 100G

# 3. Create cloud-init config
cat > cloud-init.yaml <<EOF
#cloud-config
hostname: aequitas-node
users:
  - name: aequitas
    sudo: ALL=(ALL) NOPASSWD:ALL
    shell: /bin/bash
packages:
  - curl
  - wget
  - git
  - build-essential
runcmd:
  - wget https://go.dev/dl/go1.21.5.linux-amd64.tar.gz
  - tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz
  - git clone https://github.com/CreoDAMO/REPAR.git /opt/aequitas
  - cd /opt/aequitas/aequitas && /usr/local/go/bin/go build -o /usr/local/bin/aequitasd ./cmd/aequitasd
  - aequitasd init aequitas-node --chain-id aequitas-1
  - systemctl enable aequitasd
  - systemctl start aequitasd
EOF

# 4. Create cloud-init ISO
cloud-localds seed.iso cloud-init.yaml

# 5. Launch VM
qemu-system-x86_64 \
  -name aequitas-node \
  -machine type=q35,accel=kvm \
  -cpu host \
  -smp 4 \
  -m 8192 \
  -drive file=aequitas-node.qcow2,format=qcow2,if=virtio \
  -drive file=seed.iso,format=raw,if=virtio \
  -netdev user,id=net0,hostfwd=tcp::26656-:26656,hostfwd=tcp::26657-:26657,hostfwd=tcp::1317-:1317,hostfwd=tcp::9090-:9090 \
  -device virtio-net-pci,netdev=net0 \
  -display none \
  -daemonize
```

---

## Deployment at Scale

### Deploy 10 Validators (Gold Guardian Tier)

```bash
#!/bin/bash
# deploy-guardian-network.sh

for i in {1..10}; do
  npm start deploy -- \
    --provider local-kvm \
    --name guardian-validator-$i \
    --cores 4 \
    --memory 8 \
    --storage 100 &
done

wait
echo "✅ 10 validators deployed"
```

### Deploy 100+ Nodes (Community Network)

```bash
# Use pre-built image for speed
for i in {1..100}; do
  npm start deploy -- \
    --provider local-kvm \
    --image ~/aequitas-node.qcow2 \
    --name community-node-$i \
    --cores 2 \
    --memory 4 \
    --storage 50 &
  
  # Batch in groups of 10 to avoid overwhelming host
  if [ $((i % 10)) -eq 0 ]; then
    wait
  fi
done
```

---

## Monitoring and Management

### Check All Nodes

```bash
# List all VMs
npm start list

# Monitor specific node
npm start monitor guardian-validator-01

# Stream logs
npm start logs guardian-validator-01 --follow
```

### Health Checks

```bash
# RPC health
curl http://localhost:26657/health

# Sync status
curl http://localhost:26657/status | jq .result.sync_info

# Validator info
curl http://localhost:26657/validators

# REST API
curl http://localhost:1317/cosmos/base/tendermint/v1beta1/node_info
```

### Backup and Recovery

```bash
# Backup VM disk
qemu-img convert -c -O qcow2 \
  ~/aequitas-vms/my-node/disk.qcow2 \
  ~/backups/my-node-$(date +%Y%m%d).qcow2.backup

# Restore from backup
qemu-img convert -O qcow2 \
  ~/backups/my-node-20250101.qcow2.backup \
  ~/aequitas-vms/my-node/disk.qcow2
```

---

## Integration with Aequitas AI (NVIDIA-Powered Security)

### Enable Unified AI Model

```bash
# Set NVIDIA API key
export NVIDIA_API_KEY="nvapi-..."

# Run Cerberus auditor with Aequitas AI
cd auditor
python3 orchestrator.py

# The orchestrator will automatically use:
# - Aequitas AI (NVIDIA NIM) if NVIDIA_API_KEY is set
# - Falls back to 4-model approach if not available
```

### What This Gives You:

- **1 API endpoint** instead of 4 (Claude, GPT-4, Grok, Deepseek)
- **Lower costs** (NVIDIA NIM is more efficient)
- **Self-hostable** (can run NVIDIA NIM on-premises)
- **Consistent results** (single model, multi-temperature sampling)

---

## Troubleshooting

### VM Won't Boot

```bash
# Check KVM support
egrep -c '(vmx|svm)' /proc/cpuinfo

# Load KVM module
sudo modprobe kvm-intel  # or kvm-amd

# Check VM logs
cat ~/aequitas-vms/my-node/vm.log
```

### Node Not Syncing

```bash
# Check if aequitasd is running
curl http://localhost:26657/status

# Check logs
npm start logs my-node

# Restart node (inside VM)
# First SSH into VM, then:
systemctl restart aequitasd
```

### Port Conflicts

```bash
# If ports 26656, 26657, 1317, 9090 are already in use:

# Option 1: Stop conflicting service
sudo lsof -i :26657
sudo systemctl stop <conflicting-service>

# Option 2: Use different ports (modify QEMU command in deploy.js)
```

### Disk Space Issues

```bash
# Check disk usage
df -h ~/aequitas-vms/

# Expand VM disk
qemu-img resize ~/aequitas-vms/my-node/disk.qcow2 +100G

# Resize partition inside VM (requires VM restart)
```

---

## Production Deployment Checklist

- [ ] Hardware meets recommended specs (8+ cores, 16GB+ RAM, 500GB+ SSD)
- [ ] KVM virtualization enabled in BIOS
- [ ] Static IP or dynamic DNS configured
- [ ] Firewall rules allow P2P (26656) and RPC (26657)
- [ ] Monitoring enabled (Prometheus + Grafana)
- [ ] Automated backups scheduled (daily snapshots)
- [ ] systemd service configured for auto-restart
- [ ] Security updates automated (unattended-upgrades)
- [ ] NVIDIA_API_KEY set for AI-powered security auditing
- [ ] Node registered as validator (if staking $REPAR)

---

## Cost Analysis: Sovereign vs Cloud

### Sovereign Deployment (Home Server)

**Hardware**: Dell OptiPlex 7090 (refurbished)
- CPU: Intel i7-10700 (8 cores)
- RAM: 32GB DDR4
- Storage: 1TB NVMe SSD
- **One-time cost**: $450

**Monthly costs**:
- Electricity: ~$5/month (100W @ $0.15/kWh)
- Internet: $0 (existing home connection)
- **Total**: $5/month

**5-year TCO**: $450 + ($5 × 60) = $750

### Cloud Deployment (DigitalOcean)

**Droplet**: CPU-Optimized 8 cores, 16GB RAM, 100GB SSD
- **Monthly cost**: $120/month

**5-year TCO**: $120 × 60 = $7,200

**Savings**: $6,450 (86% cheaper) + **complete sovereignty**

---

## Next Steps

1. **Deploy your first node**: Follow Method 1 (Quick Deploy)
2. **Join the network**: Configure as validator or full node
3. **Enable AI security**: Set NVIDIA_API_KEY for Cerberus auditing
4. **Scale up**: Use Method 2 for distributing to community
5. **Monitor performance**: Track sync status and block height

**Questions?** https://github.com/CreoDAMO/REPAR/issues

---

**Built with sovereignty. Powered by justice. Zero cloud dependencies.**
