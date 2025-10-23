# Aequitas Blockchain - Production Deployment Guide

## Overview

The Aequitas blockchain (`aequitas-1`) is a Cosmos SDK Layer-1 blockchain that requires compilation before deployment. Due to the complexity and size of Cosmos SDK dependencies, **building via CI/CD (GitHub Actions) is the recommended approach**.

## Current Status

- ✅ **Blockchain Code**: Fully implemented in `/aequitas` directory
- ✅ **Custom Modules**: All 11 modules implemented (defendant, justice, claims, dex, etc.)
- ✅ **Configuration**: Chain parameters set (131T $REPAR supply, 0% inflation)
- ⚠️ **Binary**: Needs compilation (10-15 minute build via CI/CD)
- 📦 **Frontend**: Configured to work with mock data (dev) and real chain (production)

## Why CI/CD Build?

**Cosmos SDK chains are resource-intensive to compile:**
- 200+ dependencies to download
- 10-15 minutes build time with 4GB+ RAM
- Best practices recommend automated builds
- Ensures consistent binary across environments

## Quick Start (Recommended): GitHub Actions

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Deploy Aequitas blockchain"
git push origin main
```

### Step 2: GitHub Actions Auto-Build

The workflow `.github/workflows/blockchain-build.yml` will automatically:
1. Set up Go 1.24
2. Download all Cosmos SDK dependencies
3. Compile `aequitasd` binary
4. Run tests
5. Upload binary as artifact

**Build time**: ~10-15 minutes

### Step 3: Download Binary

1. Go to your GitHub repository
2. Click "Actions" tab
3. Find the latest successful workflow run
4. Download `aequitasd-linux-amd64` artifact
5. Extract and make executable:

```bash
unzip aequitasd-linux-amd64.zip
chmod +x aequitasd
```

### Step 4: Initialize Chain

```bash
# Initialize node
./aequitasd init aequitas-validator --chain-id aequitas-1

# Create validator key
./aequitasd keys add validator

# Add genesis account (131 trillion REPAR supply)
./aequitasd genesis add-genesis-account validator 131000000000000000000repar

# Create validator genesis transaction
./aequitasd genesis gentx validator 1000000000000stake \
  --chain-id aequitas-1 \
  --moniker="Aequitas Genesis Validator"

# Collect genesis transactions
./aequitasd genesis collect-gentxs

# Verify genesis
./aequitasd genesis validate
```

### Step 5: Start Blockchain

```bash
# Start the node
./aequitasd start

# RPC will be available at:
# - RPC: http://localhost:26657
# - gRPC: localhost:9090
# - REST: http://localhost:1317
```

### Step 6: Update Frontend

Update `frontend/src/utils/cosmosClient.js`:

```javascript
const RPC_ENDPOINT = process.env.VITE_RPC_ENDPOINT || 'http://localhost:26657';
```

Set in `.env`:
```bash
VITE_RPC_ENDPOINT=http://localhost:26657  # Local development
# OR
VITE_RPC_ENDPOINT=https://rpc.aequitas.example.com  # Production
```

## Alternative: Local Build (Advanced)

### Prerequisites

- Go 1.24+
- 4GB+ RAM available
- 10GB+ disk space
- Fast internet connection

### Build Steps

```bash
cd aequitas

# Download dependencies (5-10 minutes)
go mod download

# Verify dependencies
go mod verify

# Build binary (3-5 minutes)
go build -o ./build/aequitasd ./cmd/aequitasd

# Verify build
./build/aequitasd version
```

**Note**: This may timeout in resource-constrained environments (Replit, small VPS). Use GitHub Actions for reliable builds.

## Alternative: Use Ignite CLI

```bash
cd aequitas

# Build and serve (includes live reload)
ignite chain serve

# Or just build
ignite chain build
```

## Production Deployment Options

### Option A: DigitalOcean Droplet (Recommended)

**Specifications:**
- 16GB RAM, 8 vCPU, 320GB SSD
- Ubuntu 22.04
- Docker + Docker Compose

```bash
# SSH into droplet
ssh root@your-droplet-ip

# Download binary from GitHub Artifacts
wget https://github.com/YOUR_REPO/actions/artifacts/aequitasd-linux-amd64.zip
unzip aequitasd-linux-amd64.zip

# Initialize and start (see Step 4-5 above)
./aequitasd start
```

### Option B: Kubernetes (Scalable)

Use the provided `k8s/` manifests:
```bash
kubectl apply -f k8s/aequitas-deployment.yaml
kubectl apply -f k8s/aequitas-service.yaml
```

### Option C: Systemd Service (Simple)

```bash
# Create systemd service
sudo nano /etc/systemd/system/aequitasd.service
```

```ini
[Unit]
Description=Aequitas Blockchain Node
After=network.target

[Service]
Type=simple
User=aequitas
WorkingDirectory=/home/aequitas
ExecStart=/usr/local/bin/aequitasd start
Restart=on-failure
RestartSec=3
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start
sudo systemctl enable aequitasd
sudo systemctl start aequitasd
sudo systemctl status aequitasd
```

## Frontend Integration

### Development Mode (Mock Data)

When blockchain is not running, the frontend automatically uses mock data:

```javascript
// cosmosClient.js automatically handles this
const client = await QueryClient.connect(RPC_ENDPOINT);
// On connection failure, falls back to mock data
```

### Production Mode (Real Chain)

Once blockchain is running:

1. Update `VITE_RPC_ENDPOINT` environment variable
2. Frontend automatically connects to real chain
3. All mock data is replaced with live blockchain queries

## Monitoring

### Check Node Status

```bash
# Node info
./aequitasd status

# Query block height
./aequitasd query block

# List validators
./aequitasd query staking validators
```

### View Logs

```bash
# If running via systemd
sudo journalctl -u aequitasd -f

# If running manually
./aequitasd start 2>&1 | tee aequitas.log
```

## Troubleshooting

### Build Fails: "timeout"

**Solution**: Use GitHub Actions instead of local build

### "Cannot connect to RPC"

**Check**:
1. Is node running? `ps aux | grep aequitasd`
2. Is port 26657 open? `netstat -tuln | grep 26657`
3. Firewall blocking? `sudo ufw allow 26657`

### "Invalid genesis"

**Fix**:
```bash
./aequitasd genesis validate
# Review errors and fix genesis.json
```

## Resources

- **Chain ID**: `aequitas-1`
- **Native Denom**: `repar`
- **Total Supply**: 131,000,000,000,000 REPAR (131 trillion)
- **Inflation**: 0% (deflationary model)
- **Block Time**: ~6 seconds
- **Consensus**: Tendermint BFT

## Next Steps After Deployment

1. **Connect Frontend**: Update RPC endpoint
2. **Fund Wallets**: Distribute REPAR to test accounts
3. **Deploy Contracts**: Upload smart contracts if any
4. **Test Modules**: Verify all 11 custom modules work
5. **Setup Validators**: Onboard additional validators
6. **Configure Monitoring**: Prometheus + Grafana

## Support

For build issues, check:
- GitHub Actions logs
- `aequitas/BUILD_STATUS.md`
- Go version: `go version` (need 1.24+)

---

**Status**: Code ready, build via CI/CD recommended ✅
