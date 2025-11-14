# 🏛️ Sovereign VM Guide - Aequitas Protocol Zone

## Overview

The Aequitas Protocol now includes **complete VM sovereignty** - run your own blockchain nodes locally without any cloud provider dependencies. This eliminates reliance on DigitalOcean, AWS, GCP, or any external platform.

## Why Sovereign VMs?

### Traditional Problem
- **Cloud Dependency**: Must use DigitalOcean/AWS/GCP to run nodes
- **Monthly Costs**: $40-120/month per node
- **Platform Risk**: Cloud provider can suspend your account
- **Censorship**: Can be shut down by corporate ToS

### Sovereign Solution
- **Self-Hosted**: Run nodes on your own hardware
- **Zero Monthly Cost**: One-time hardware investment only
- **True Ownership**: Complete control over infrastructure
- **Unstoppable**: Cannot be shut down by any company

## Quick Start

### Option 1: Local KVM (Fastest)

Deploy a blockchain node on your local machine using KVM virtualization:

```bash
# Install dependencies (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install qemu-kvm cloud-localds

# Deploy node
cd vm-infrastructure/cli
npm install
npm start deploy -- --provider local-kvm --name my-node --cores 4 --memory 8 --storage 100

# Monitor node
npm start status my-node
npm start logs my-node --follow
```

**Requirements:**
- CPU with virtualization support (Intel VT-x or AMD-V)
- 8GB+ RAM
- 100GB+ free disk space
- Linux host (Ubuntu 22.04+ recommended)

### Option 2: Pre-built Image (Recommended for Distribution)

Build a distributable VM image that's ready to run:

```bash
# Build image once (takes 15-30 minutes)
cd vm-infrastructure/packer
./build.sh

# Distribute compressed image
# Output: output/aequitas-zone-node.qcow2.gz (~ 2-3GB)

# Deploy image on any machine
qemu-img convert -f qcow2 aequitas-zone-node.qcow2 -O qcow2 ~/my-node.qcow2
qemu-system-x86_64 -hda ~/my-node.qcow2 -m 8192 -smp 4 -accel kvm -daemonize
```

## Architecture

### Local KVM Provider

```
┌─────────────────────────────────────────┐
│     CLI: aequitas-vm deploy             │
└──────────────┬──────────────────────────┘
               │
               ├──> Create QCOW2 disk (100GB)
               ├──> Generate cloud-init config
               ├──> Launch QEMU/KVM VM
               └──> Auto-provision blockchain
                    │
                    ├─> Install Go
                    ├─> Clone & build aequitasd
                    ├─> Download genesis
                    └─> Start node (systemd)
```

### Packer Image Pipeline

```
┌─────────────────────────────────────────┐
│   Packer Template (HCL)                 │
└──────────────┬──────────────────────────┘
               │
               ├──> Download Ubuntu ISO
               ├──> Create VM with cloud-init
               ├──> Install all dependencies
               ├──> Pre-compile aequitasd binary
               └──> Package as .qcow2 image
                    │
                    └──> Distribute ready-to-run
```

## Deployment Scenarios

### 1. Home Server (Most Sovereign)

**Hardware**: Old PC, NUC, or dedicated server

```bash
# One-time setup
aequitas-vm deploy --provider local-kvm --name home-validator

# Runs 24/7, zero monthly cost
# Full blockchain history, complete sovereignty
```

**Cost**: $150-500 (one-time hardware) + $5/month electricity

### 2. Raspberry Pi Cluster (Gold Guardian)

**Hardware**: Raspberry Pi 5 (8GB) + 1TB SSD

```bash
# Deploy ARM64 image (coming soon)
aequitas-vm deploy --provider local-kvm --arch arm64 --name rpi-node
```

**Cost**: $278 one-time, $0.50/month electricity

### 3. Community Data Center

**Hardware**: Shared co-location space

```bash
# Deploy multiple validators
for i in {1..10}; do
  aequitas-vm deploy --provider local-kvm --name validator-$i
done
```

**Cost**: Shared hosting fees, complete control

## CLI Commands

### Deploy

```bash
# Basic deployment
aequitas-vm deploy --provider local-kvm --name node-01

# Custom specs
aequitas-vm deploy --provider local-kvm \
  --name mainnet-validator \
  --cores 8 \
  --memory 16 \
  --storage 500

# Use pre-built image
aequitas-vm deploy --provider local-kvm \
  --image ~/aequitas-zone-node.qcow2 \
  --name quick-node
```

### Monitor

```bash
# Check node status
aequitas-vm status node-01

# Stream logs
aequitas-vm logs node-01 --follow

# View metrics
aequitas-vm monitor node-01
```

### Manage

```bash
# List all nodes
aequitas-vm list

# Stop node
aequitas-vm stop node-01

# Start node
aequitas-vm start node-01

# Destroy node
aequitas-vm destroy node-01
```

## Image Distribution

### Build Once, Deploy Everywhere

```bash
# 1. Build official image
cd vm-infrastructure/packer
./build.sh

# 2. Compress for distribution
gzip output/aequitas-zone-node.qcow2

# 3. Upload to release
# https://github.com/CreoDAMO/REPAR/releases

# 4. Community downloads and runs
wget https://github.com/CreoDAMO/REPAR/releases/download/v1.0.0/aequitas-zone-node.qcow2.gz
gunzip aequitas-zone-node.qcow2.gz
aequitas-vm deploy --provider local-kvm --image aequitas-zone-node.qcow2
```

## Integration with Hardware Plan

This VM infrastructure integrates perfectly with the **Hardware Sovereignty Deployment Plan**:

| Tier | Hardware | VM Deployment Method |
|------|----------|---------------------|
| **Bronze Guardian** | Smartphone | Mobile app (no VM needed) |
| **Silver Guardian** | Meshtastic device | Mesh network only |
| **Gold Guardian** | Raspberry Pi 5 | Local KVM (ARM64 image) |
| **Platinum Guardian** | Satellite station | Local KVM + satellite adapter |
| **Cloud Validator** | Optional fallback | Terraform (if desired) |

**Key Insight**: Gold and Platinum Guardians now run on **local KVM**, making cloud providers optional instead of required.

## Security Features

### Isolation
- VM runs in isolated environment
- Port forwarding only for necessary endpoints (26656, 26657, 1317, 9090)
- No external SSH access by default

### Monitoring
- Prometheus node-exporter included
- Systemd journal logging
- Health check endpoints

### Updates
- Systemd service auto-restarts on failure
- Manual updates via CLI
- Image rebuilds for major upgrades

## Troubleshooting

### VM Won't Start

```bash
# Check KVM support
egrep -c '(vmx|svm)' /proc/cpuinfo
# Should return > 0

# Load KVM module
sudo modprobe kvm-intel  # or kvm-amd

# Check VM logs
cat ~/aequitas-vms/my-node/vm.log
```

### Node Not Syncing

```bash
# Check node status
curl http://localhost:26657/status

# View blockchain logs
aequitas-vm logs my-node

# Restart node
systemctl restart aequitasd  # (inside VM)
```

### Disk Space Issues

```bash
# Check disk usage
aequitas-vm exec my-node "df -h"

# Expand disk (if needed)
qemu-img resize ~/aequitas-vms/my-node/disk.qcow2 +100G
```

## Next Steps

1. **Deploy your first node**: `aequitas-vm deploy --provider local-kvm`
2. **Build distributable image**: `cd vm-infrastructure/packer && ./build.sh`
3. **Share with community**: Upload image to IPFS or GitHub releases
4. **Scale to 1000+ nodes**: Community-owned sovereignty network

## Future Enhancements

- [ ] ARM64 support for Raspberry Pi
- [ ] Windows/Mac host support (via VirtualBox)
- [ ] Live migration between nodes
- [ ] Automated backup/restore
- [ ] Multi-node cluster management
- [ ] NVIDIA AI integration for Cerberus Auditor

---

**Built with sovereignty. Powered by justice. No cloud providers required.**

For questions: https://github.com/CreoDAMO/REPAR/issues
