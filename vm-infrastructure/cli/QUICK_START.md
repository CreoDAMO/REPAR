# Quick Start - Sovereign VM Deployment

## Prerequisites

```bash
# Install QEMU/KVM and cloud-init tools (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install -y qemu-kvm qemu-utils cloud-image-utils

# Verify KVM is enabled
egrep -c '(vmx|svm)' /proc/cpuinfo  # Should return > 0
```

## Deploy Your First Node

```bash
# 1. Install CLI dependencies
cd vm-infrastructure/cli
npm install

# 2. Deploy a local blockchain node (no cloud required!)
npm start deploy -- \
  --provider local-kvm \
  --name my-validator \
  --cores 4 \
  --memory 8 \
  --storage 100

# This will:
# - Download Ubuntu 22.04 cloud image (first time only, ~700MB)
# - Create a 100GB virtual disk
# - Auto-provision with Go + aequitasd binary
# - Download genesis and start blockchain
# - Take ~5 minutes total
```

## Verify It's Working

```bash
# Check node status
curl http://localhost:26657/status

# View logs
npm start logs my-validator

# Monitor continuously
npm start logs my-validator --follow
```

## What Just Happened?

1. **Downloaded base image**: Ubuntu 22.04 Server cloud image (cached for future deploys)
2. **Created VM disk**: Resized to 100GB with qcow2 format
3. **Cloud-init provisioning**: Automated setup including:
   - Install Go 1.21.5
   - Clone Aequitas repo
   - Compile `aequitasd` binary
   - Initialize node with chain-id `aequitas-1`
   - Download mainnet genesis
   - Create systemd service
   - Start blockchain node

4. **Node is running**: Syncing blocks from genesis

## Network Ports

The VM forwards these ports to localhost:

| Port | Service | URL |
|------|---------|-----|
| 26656 | P2P | `tcp://localhost:26656` |
| 26657 | RPC | `http://localhost:26657` |
| 1317 | REST API | `http://localhost:1317` |
| 9090 | gRPC | `http://localhost:9090` |

## Manage Your Node

```bash
# List all nodes
npm start list

# Check specific node status
npm start status my-validator

# Stop node
npm start stop my-validator

# Start node
npm start start my-validator

# Destroy node (deletes VM)
npm start destroy my-validator
```

## Hardware Requirements

| Spec | Minimum | Recommended |
|------|---------|-------------|
| **CPU** | 4 cores | 8 cores |
| **RAM** | 8GB | 16GB |
| **Storage** | 100GB | 500GB SSD |
| **Network** | 10Mbps | 100Mbps |

## Next Steps

### Scale to Multiple Nodes

```bash
# Deploy 3 validators
for i in {1..3}; do
  npm start deploy -- \
    --provider local-kvm \
    --name validator-$i \
    --cores 4 \
    --memory 8 \
    --storage 100
done
```

### Build Distributable Image

```bash
# Create pre-built image (once)
cd ../packer
./build.sh

# Share compressed image (2-3GB)
# Upload to IPFS, GitHub releases, or community server
```

### Deploy from Pre-built Image

```bash
# Download pre-built image
wget https://releases.aequitas.zone/v1.0.0/aequitas-node.qcow2.gz
gunzip aequitas-node.qcow2.gz

# Deploy instantly (no build time!)
npm start deploy -- \
  --provider local-kvm \
  --image ./aequitas-node.qcow2 \
  --name instant-node
```

## Troubleshooting

### VM Won't Start

```bash
# Check KVM module is loaded
lsmod | grep kvm

# Load KVM module
sudo modprobe kvm-intel  # or kvm-amd for AMD CPUs

# Check permissions
sudo adduser $USER kvm
# Then log out and log back in
```

### Download Fails

```bash
# Manually download base image
wget https://cloud-images.ubuntu.com/releases/jammy/release/ubuntu-22.04-server-cloudimg-amd64.img
mv ubuntu-22.04-server-cloudimg-amd64.img vm-infrastructure/cli/images/ubuntu-22.04-base.img
```

### Node Not Syncing

```bash
# Check if node is running
curl http://localhost:26657/status

# View systemd logs (inside VM)
# SSH into VM first, then:
systemctl status aequitasd
journalctl -u aequitasd -f
```

## True Sovereignty Achieved

You now have a blockchain validator running on **your own hardware**:

- ✅ **No cloud provider** - Runs on bare metal or home server
- ✅ **No monthly fees** - One-time hardware cost only
- ✅ **Cannot be shut down** - No ToS, no corporate control
- ✅ **Complete data ownership** - Full blockchain history locally

**Welcome to true sovereignty.**

---

For detailed architecture and advanced usage, see [SOVEREIGN_VM_GUIDE.md](../SOVEREIGN_VM_GUIDE.md)
