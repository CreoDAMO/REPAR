# Testnet Initialization from Replit Environment

**Date:** October 29, 2025  
**Status:** Production Ready ✅  
**Environment:** Replit → Local Testnet → Export for Production

---

## 🎯 Overview

This guide explains how to initialize the Aequitas Protocol testnet directly from your Replit environment, allocate the founder wallet, and export the complete system for production deployment.

### Why Initialize from Replit?

✅ **Everything works here**: All dependencies installed, APIs configured  
✅ **Complete control**: Full access to configuration and secrets  
✅ **Easy export**: Package and download for production deployment  
✅ **Safe testing**: Isolated testnet environment before mainnet

---

## 📋 Prerequisites

### ✅ Verified Complete in Your Environment:
- [x] Frontend running on port 5000
- [x] Backend running on port 3002
- [x] Block Explorer running on port 3001
- [x] All dependencies installed
- [x] All API keys configured in Replit Secrets
- [x] Genesis files validated locally

---

## 🚀 Step 1: Build the Blockchain Binary

The blockchain binary needs to be built before initialization. Since GitHub Actions workflow hasn't been pushed yet, we'll build locally if possible, or download from a successful GitHub Actions build.

### Option A: Download from GitHub Actions (Recommended)

```bash
# Check if there's a successful blockchain build
cd ~/workspace

# Download the latest successful build artifact
# (This will work once you push the Go 1.23.x fixes)
# For now, we'll use Option B
```

### Option B: Build Locally in Replit

**Note:** Building the blockchain in Replit requires significant resources and may take 15-20 minutes.

```bash
cd ~/workspace/aequitas

# Install Go 1.23 (if not already installed)
# Replit should have this available

# Verify Go version
go version  # Should be 1.23.x

# Download dependencies
go mod download

# Build the binary
mkdir -p build
go build -v \
  -ldflags "-X github.com/cosmos/cosmos-sdk/version.Name=aequitas \
    -X github.com/cosmos/cosmos-sdk/version.AppName=aequitasd \
    -X github.com/cosmos/cosmos-sdk/version.Version=v1.0.0-testnet \
    -X github.com/cosmos/cosmos-sdk/version.Commit=$(git rev-parse HEAD)" \
  -o ./build/aequitasd \
  ./cmd/aequitasd

# Verify binary
chmod +x ./build/aequitasd
./build/aequitasd version
```

---

## 🌐 Step 2: Initialize Testnet

Once you have the `aequitasd` binary, initialize the testnet:

```bash
cd ~/workspace

# Set up paths
export AEQUITAS_HOME="$HOME/.aequitas-testnet"
export CHAIN_ID="aequitas-testnet-1"

# Initialize node
./aequitas/build/aequitasd init validator \
  --chain-id $CHAIN_ID \
  --home $AEQUITAS_HOME

echo "✅ Testnet node initialized"
```

---

## 👛 Step 3: Create Founder Wallet

Create and securely store your founder wallet:

```bash
# Create founder wallet key
./aequitas/build/aequitasd keys add founder \
  --keyring-backend test \
  --home $AEQUITAS_HOME

# IMPORTANT: Save the mnemonic phrase shown above!
# This is your ONLY way to recover the wallet.

# Get founder address
FOUNDER_ADDRESS=$(./aequitas/build/aequitasd keys show founder \
  -a --keyring-backend test --home $AEQUITAS_HOME)

echo "Founder Address: $FOUNDER_ADDRESS"

# Expected address from genesis:
# repar1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun
```

---

## 📄 Step 4: Configure Genesis File

Replace the initialized genesis with your properly allocated genesis:

```bash
# Backup the default genesis
cp $AEQUITAS_HOME/config/genesis.json \
   $AEQUITAS_HOME/config/genesis.json.backup

# Copy your validated testnet genesis
cp ~/workspace/chain-config/testnet/genesis-testnet.json \
   $AEQUITAS_HOME/config/genesis.json

# Verify genesis
./aequitas/build/aequitasd genesis validate --home $AEQUITAS_HOME

echo "✅ Genesis file configured and validated"
```

---

## 🔐 Step 5: Export Founder Wallet Keys

Export your founder wallet keys for safekeeping:

```bash
# Create secure export directory
mkdir -p ~/founder-wallet-export
chmod 700 ~/founder-wallet-export

# Export founder key
./aequitas/build/aequitasd keys export founder \
  --keyring-backend test \
  --home $AEQUITAS_HOME \
  > ~/founder-wallet-export/founder-key.json

# Export address info
./aequitas/build/aequitasd keys show founder \
  --keyring-backend test \
  --home $AEQUITAS_HOME \
  > ~/founder-wallet-export/founder-address.txt

# Export mnemonic (if you want to back it up again)
echo "IMPORTANT: Store your mnemonic phrase securely!"
echo "It was displayed when you created the key."

# Create a README
cat > ~/founder-wallet-export/README.txt << 'EOF'
AEQUITAS PROTOCOL FOUNDER WALLET EXPORT
========================================

This directory contains your founder wallet credentials.

Contents:
- founder-key.json: Encrypted private key
- founder-address.txt: Public address and key info
- mnemonic.txt: Recovery phrase (ADD THIS MANUALLY!)

Your Allocation:
- Total: 23.58T REPAR (18% of total supply)
  - Founder Wallet: 15.72T REPAR (12%)
  - Founder Endowment: 7.86T REPAR (6%, locked 8 years)

Address: repar1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun

CRITICAL SECURITY NOTES:
1. Store the mnemonic phrase in a secure location (offline recommended)
2. Never share your private key or mnemonic
3. Make multiple backups in different secure locations
4. Consider using a hardware wallet for mainnet

If you lose both the mnemonic AND the exported key, your funds are
PERMANENTLY LOST. There is no recovery mechanism.
EOF

echo "✅ Founder wallet exported to ~/founder-wallet-export/"
echo "⚠️  BACKUP THIS DIRECTORY SECURELY!"
```

---

## ⚙️ Step 6: Configure Node Settings

Optimize node configuration for testnet:

```bash
# Update config.toml for better performance
CONFIG_FILE="$AEQUITAS_HOME/config/config.toml"

# Enable RPC server
sed -i 's/laddr = "tcp:\/\/127.0.0.1:26657"/laddr = "tcp:\/\/0.0.0.0:26657"/' $CONFIG_FILE

# Enable CORS for local development
sed -i 's/cors_allowed_origins = \[\]/cors_allowed_origins = \["*"\]/' $CONFIG_FILE

# Update app.toml for API
APP_CONFIG="$AEQUITAS_HOME/config/app.toml"

# Enable API server
sed -i 's/enable = false/enable = true/' $APP_CONFIG
sed -i 's/address = "tcp:\/\/localhost:1317"/address = "tcp:\/\/0.0.0.0:1317"/' $APP_CONFIG

echo "✅ Node configuration updated"
```

---

## 🚀 Step 7: Start the Testnet

Start your single-node testnet:

```bash
# Start the node
./aequitas/build/aequitasd start --home $AEQUITAS_HOME

# Expected output:
# INF starting ABCI with Tendermint
# INF service start impl=Node
# INF Starting multiAppConn service impl=multiAppConn
# INF Starting Node service impl=Node
# ...
# INF Executed block
```

**In a new shell/terminal (or use tmux/screen):**

```bash
# Check node status
curl http://localhost:26657/status

# Check your founder balance
./aequitas/build/aequitasd query bank balances \
  repar1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun \
  --home $AEQUITAS_HOME

# Expected output:
# balances:
# - amount: "23580000000000000000"  # 23.58 Trillion
#   denom: repar
```

---

## 📦 Step 8: Create Complete System Export

Package everything for download and deployment:

```bash
cd ~/workspace

# Create export directory
EXPORT_DIR="aequitas-complete-system-$(date +%Y%m%d-%H%M%S)"
mkdir -p ~/$EXPORT_DIR

# Copy blockchain binary
cp aequitas/build/aequitasd ~/$EXPORT_DIR/

# Copy genesis files
cp -r chain-config ~/$EXPORT_DIR/

# Copy node configuration
mkdir -p ~/$EXPORT_DIR/node-config
cp -r $AEQUITAS_HOME/config ~/$EXPORT_DIR/node-config/

# Copy founder wallet (SECURE THIS!)
cp -r ~/founder-wallet-export ~/$EXPORT_DIR/

# Copy frontend, backend, dexplorer (without node_modules)
rsync -a --exclude 'node_modules' frontend/ ~/$EXPORT_DIR/frontend/
rsync -a --exclude 'node_modules' backend/ ~/$EXPORT_DIR/backend/
rsync -a --exclude 'node_modules' dexplorer/ ~/$EXPORT_DIR/dexplorer/

# Copy scripts
cp -r scripts ~/$EXPORT_DIR/

# Copy documentation
cp -r docs ~/$EXPORT_DIR/

# Create deployment README
cat > ~/$EXPORT_DIR/DEPLOYMENT_INSTRUCTIONS.md << 'EOF'
# Aequitas Protocol - Complete System Package

This package contains everything needed to deploy the Aequitas Protocol.

## Contents:
- aequitasd: Blockchain binary
- chain-config/: Genesis files and chain configuration
- node-config/: Validator node configuration
- founder-wallet-export/: Founder wallet credentials (SECURE!)
- frontend/: React frontend application
- backend/: Circle API backend
- dexplorer/: Block explorer
- scripts/: Deployment and initialization scripts
- docs/: Complete documentation

## Deployment Instructions:

### 1. DigitalOcean Deployment
See: docs/REPLIT_TO_DIGITALOCEAN_DEPLOYMENT.md

### 2. Blockchain Node
```bash
# Copy binary to /usr/local/bin
sudo cp aequitasd /usr/local/bin/
sudo chmod +x /usr/local/bin/aequitasd

# Initialize node
aequitasd init validator --chain-id aequitas-testnet-1

# Copy genesis
cp chain-config/testnet/genesis-testnet.json ~/.aequitas/config/

# Start node
aequitasd start
```

### 3. Frontend/Backend
See: docs/REPLIT_TO_DIGITALOCEAN_DEPLOYMENT.md

## Security Notes:
- founder-wallet-export/ contains sensitive keys - ENCRYPT AND SECURE!
- Never commit founder-wallet-export/ to version control
- Make offline backups of mnemonic phrase
- Use hardware wallet for mainnet

## Support:
- Black Paper: docs/BLACK_PAPER_v1.1.md
- Deployment Guide: docs/REPLIT_TO_DIGITALOCEAN_DEPLOYMENT.md
- Genesis Guide: docs/GENESIS_LAUNCH_GUIDE.md
EOF

# Create archive
cd ~
tar -czf ${EXPORT_DIR}.tar.gz $EXPORT_DIR

echo "✅ Complete system packaged"
echo "📦 Archive: ~/${EXPORT_DIR}.tar.gz"
echo "📊 Size: $(du -h ${EXPORT_DIR}.tar.gz | cut -f1)"
echo ""
echo "🔐 IMPORTANT: This archive contains your founder wallet keys!"
echo "   Encrypt it before downloading or transferring."
```

---

## 💾 Step 9: Download from Replit

Download your complete system package:

```bash
# In Replit, you can download files by:
# 1. Right-click the file in the file tree → Download
# 2. Or use the Shell to create a download link:

echo "Download your system package:"
echo "File: ~/${EXPORT_DIR}.tar.gz"
echo ""
echo "To download:"
echo "1. Navigate to the file in Replit file tree"
echo "2. Right-click → Download"
echo "3. Or open in browser: $(replit info | grep -o 'https://[^"]*')/~/${EXPORT_DIR}.tar.gz"
```

---

## 🔒 Step 10: Secure Your Download

Before downloading, encrypt the archive:

```bash
# Install gpg if not available
# (May not be available in Replit, use local machine after download)

# On your local machine after download:
gpg --symmetric --cipher-algo AES256 ${EXPORT_DIR}.tar.gz

# Enter a strong passphrase
# This creates ${EXPORT_DIR}.tar.gz.gpg

# Now you can safely store/transfer the encrypted file
# Delete the unencrypted version:
rm ${EXPORT_DIR}.tar.gz
```

---

## ✅ Verification Checklist

Before considering testnet initialized:

- [ ] Blockchain binary built successfully
- [ ] Testnet node initialized
- [ ] Founder wallet created and backed up
- [ ] Genesis file validated
- [ ] Node started successfully
- [ ] Founder balance verified (23.58T REPAR)
- [ ] Complete system exported and packaged
- [ ] Archive encrypted and downloaded
- [ ] Mnemonic phrase backed up in 3+ secure locations
- [ ] Frontend, Backend, Block Explorer tested locally

---

## 🎯 Next Steps

### Option A: Continue in Replit
Keep the testnet running in Replit for development and testing:
```bash
# Keep node running
./aequitas/build/aequitasd start --home $AEQUITAS_HOME

# In another terminal, run transactions
./aequitas/build/aequitasd tx bank send founder <address> 1000repar \
  --chain-id aequitas-testnet-1 \
  --keyring-backend test \
  --home $AEQUITAS_HOME
```

### Option B: Deploy to DigitalOcean
Use the exported package to deploy to your Droplet:
1. Download the encrypted archive
2. Transfer to DigitalOcean Droplet
3. Decrypt and extract
4. Follow deployment guide

### Option C: Mainnet Preparation
Once testnet is stable:
1. Run full security audit (Cerberus)
2. External audit (Quantstamp/Informal)
3. Genesis ceremony
4. Mainnet launch

---

## 🚨 Common Issues

### Binary won't build
```bash
# Check Go version
go version  # Must be 1.23.x

# Clean and rebuild
cd aequitas
rm -rf build
go clean -cache
go mod tidy
go build -o ./build/aequitasd ./cmd/aequitasd
```

### Genesis validation fails
```bash
# Use the validated genesis from chain-config
cp chain-config/testnet/genesis-testnet.json \
   $AEQUITAS_HOME/config/genesis.json
```

### Can't connect to RPC
```bash
# Check if node is running
curl http://localhost:26657/status

# Check config allows connections
grep "laddr" $AEQUITAS_HOME/config/config.toml
# Should show: laddr = "tcp://0.0.0.0:26657"
```

---

## 📊 Expected Allocations

After initialization, your founder wallet should have:

```bash
# Query balance
./aequitas/build/aequitasd query bank balances \
  repar1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun

# Expected output:
balances:
- amount: "23580000000000000000"  # 23.58 Trillion REPAR
  denom: repar

# Breakdown:
# - Founder Wallet: 15.72T (liquid, accessible)
# - Founder Endowment: 7.86T (locked for 8 years, 90% reinvest)
```

---

## 🎉 Success!

You now have:
✅ A fully initialized Aequitas testnet  
✅ Founder wallet with 23.58T REPAR allocation  
✅ Complete system package ready for production deployment  
✅ Secure backups of all critical credentials  
✅ Working frontend, backend, and block explorer

**You can now:**
1. Deploy to DigitalOcean
2. Connect frontend to live blockchain
3. Test all 12 custom modules
4. Begin onboarding validators
5. Prepare for mainnet launch

---

**Document Version:** 1.0  
**Last Updated:** October 29, 2025  
**Status:** Production Ready ✅
