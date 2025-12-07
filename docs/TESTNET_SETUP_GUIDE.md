# Aequitas Zone Testnet Setup Guide

## Overview

This guide walks you through setting up your local Aequitas Zone testnet node, from pinning the Declaration to IPFS through starting your first validator.

---

## Step 1: Pin Declaration to IPFS

### Why Pin to IPFS?

IPFS (InterPlanetary File System) provides permanent, decentralized storage for your Declaration of Sovereignty. Once pinned, the document becomes:
- **Immutable** - Cannot be altered
- **Permanent** - Cannot be deleted
- **Verifiable** - Hash proves authenticity
- **Censorship-resistant** - No single point of failure

### Options for Pinning

Since IPFS isn't installed in Replit by default, use one of these web-based services:

#### Option 1: Pinata (Recommended for Production)
- **Service**: https://app.pinata.cloud/
- **Free Tier**: 1 GB storage, 100 GB bandwidth/month
- **Best For**: Professional, long-term storage
- **Steps**:
  1. Create free account at Pinata
  2. Click "Upload" → "File"
  3. Select `DECLARATION_OF_SOVEREIGNTY.md`
  4. Copy the CID (Content Identifier)
  5. Access via: `https://gateway.pinata.cloud/ipfs/YOUR_CID`

#### Option 2: NFT.Storage (Free, Unlimited)
- **Service**: https://nft.storage/
- **Free Tier**: Unlimited storage (backed by Filecoin)
- **Best For**: Maximum permanence
- **Steps**:
  1. Create free account
  2. Upload `DECLARATION_OF_SOVEREIGNTY.md`
  3. Copy the CID
  4. Access via: `https://YOUR_CID.ipfs.nftstorage.link/`

#### Option 3: Web3.Storage
- **Service**: https://web3.storage/
- **Free Tier**: 5 GB storage
- **Best For**: Web3-native projects

### After Pinning

Once you have the CID, update your genesis file:

```bash
# Edit genesis-template.json
# Replace "TO_BE_PINNED" with your CID in:
# metadata.founding_document.ipfs_cid
```

Example CID format: `QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

Your Declaration will be accessible globally at:
- `ipfs://YOUR_CID`
- `https://ipfs.io/ipfs/YOUR_CID`
- `https://gateway.pinata.cloud/ipfs/YOUR_CID`

---

## Step 2: Obtain the Binary

You have **two options** for getting the `aequitasd` binary:

### Option A: Compile Locally (Recommended - Fastest)

Since Go 1.21.13 is already installed in Replit, you can compile directly:

```bash
# Navigate to blockchain directory
cd aequitas

# Download dependencies
go mod download

# Build the binary
go build -o ../bin/aequitasd ./cmd/aequitasd

# Verify
cd ..
./bin/aequitasd version
```

**Advantages:**
- ✅ Immediate compilation (2-3 minutes)
- ✅ Latest code from your repository
- ✅ No download authentication needed
- ✅ Custom modifications included

### Option B: Download from GitHub Actions

Download the pre-compiled binary from GitHub:

1. Visit: https://github.com/CreoDAMO/REPAR/actions
2. Click latest successful "Build Aequitas Zone Blockchain" workflow
3. Scroll to "Artifacts" section
4. Download `aequitasd-latest.zip`
5. Extract and upload to `bin/` directory in Replit

**Latest Artifact:**
- URL: https://github.com/CreoDAMO/REPAR/actions/runs/18846055981/artifacts/4383146372
- SHA-256: `3b3db469e1185d3be9cf63881e79500573a0a3e5983b715f6d66f4d8b027f0ce`
- Size: 57.6 MB

---

## Step 3: Initialize the Testnet

Once you have the binary, initialize your node:

```bash
# Run the initialization script
./scripts/init-testnet.sh
```

This script will:
1. ✅ Check for binary existence
2. ✅ Initialize the chain with `aequitas-1` chain ID
3. ✅ Install the genesis file with Declaration hash
4. ✅ Create validator configuration
5. ✅ Generate validator keys (optional)
6. ✅ Validate genesis configuration

### Manual Initialization (Alternative)

If you prefer manual control:

```bash
# Set variables
CHAIN_ID="aequitas-1"
HOME_DIR="$HOME/.aequitas"
BINARY="./bin/aequitasd"

# Initialize chain
$BINARY init validator --chain-id $CHAIN_ID --home $HOME_DIR

# Copy genesis file
cp genesis-template.json $HOME_DIR/config/genesis.json

# Create validator key
$BINARY keys add validator --home $HOME_DIR

# Validate genesis
$BINARY validate-genesis --home $HOME_DIR
```

---

## Step 4: Configure Your Node

### Edit Configuration Files

#### config.toml (Node Settings)
```bash
nano ~/.aequitas/config/config.toml
```

Key settings:
- `moniker`: Your validator name (e.g., "Aequitas Founder Node")
- `persistent_peers`: Other validator nodes (empty for single-node testnet)
- `cors_allowed_origins`: ["*"] for testnet

#### app.toml (Application Settings)
```bash
nano ~/.aequitas/config/app.toml
```

Key settings:
- `minimum-gas-prices`: "0repar" (free for testnet)
- `api.enable`: true (enables REST API)
- `grpc.enable`: true (enables gRPC)

---

## Step 5: Add Genesis Accounts (Optional)

Add additional accounts to genesis:

```bash
# Add account with initial balance
./bin/aequitasd genesis add-genesis-account \
  <address> \
  1000000000000repar \
  --home ~/.aequitas

# Example addresses:
# - Treasury account
# - DAO multisig
# - Community pool
# - Test accounts
```

---

## Step 6: Create Genesis Transaction

For a single-node testnet, create the genesis validator transaction:

```bash
# Create genesis transaction (gentx)
./bin/aequitasd genesis gentx validator \
  1000000000repar \
  --chain-id aequitas-1 \
  --home ~/.aequitas \
  --moniker "Aequitas Founder Validator"

# Collect all genesis transactions
./bin/aequitasd genesis collect-gentxs --home ~/.aequitas
```

This stakes 1 billion REPAR as your initial validator stake.

---

## Step 7: Start the Node

### Single-Node Testnet

For a simple single-node testnet:

```bash
# Start the node
./bin/aequitasd start --home ~/.aequitas
```

The node will:
1. ✅ Load genesis (Block 0 with your Declaration hash)
2. ✅ Begin producing blocks
3. ✅ Start RPC server (default: localhost:26657)
4. ✅ Start API server (default: localhost:1317)
5. ✅ Start gRPC server (default: localhost:9090)

### As a Replit Workflow (Recommended)

To run the blockchain as a persistent Replit workflow:

```bash
# Add workflow configuration
# This keeps the node running in the background
```

You can configure this through the Replit UI or use the workflow tools.

---

## Step 8: Verify the Node

### Check Node Status

```bash
# Check if node is running
curl http://localhost:26657/status

# View latest block
curl http://localhost:26657/block

# Check account balance
./bin/aequitasd query bank balances <your-address> --home ~/.aequitas
```

### Query Genesis Metadata

```bash
# View genesis file
cat ~/.aequitas/config/genesis.json | jq '.metadata'

# Verify Declaration hash
cat ~/.aequitas/config/genesis.json | jq '.metadata.founding_document.document_hash'
# Should output: 9e649e60801d2f37925a82dbab5e2ce28dc09ae484638d682cdbe4dc76288eaa
```

---

## Step 9: Connect Frontend

Update your frontend configuration to connect to the local testnet:

```javascript
// frontend/src/config/network.ts
export const NETWORK_CONFIG = {
  chainId: "aequitas-1",
  chainName: "Aequitas Zone Testnet",
  rpc: "http://localhost:26657",
  rest: "http://localhost:1317",
  stakeCurrency: {
    coinDenom: "REPAR",
    coinMinimalDenom: "repar",
    coinDecimals: 0
  }
};
```

---

## Troubleshooting

### Binary Won't Run
```bash
# Make sure it's executable
chmod +x ./bin/aequitasd

# Check architecture
file ./bin/aequitasd
# Should show: ELF 64-bit LSB executable, x86-64
```

### Genesis Validation Fails
```bash
# Check JSON syntax
jq . ~/.aequitas/config/genesis.json

# Verify all module states are present
jq '.app_state | keys' ~/.aequitas/config/genesis.json
```

### Port Already in Use
```bash
# Check what's using the port
lsof -i :26657

# Use custom ports
./bin/aequitasd start --rpc.laddr tcp://0.0.0.0:26658 --home ~/.aequitas
```

### Compilation Errors
```bash
# Update dependencies
cd aequitas
go mod tidy
go mod download

# Clean build
go clean
go build -o ../bin/aequitasd ./cmd/aequitasd
```

---

## Next Steps After Testnet Launch

1. **Test All Modules**:
   - Submit test claims
   - Register test defendants
   - Perform DEX swaps
   - Test Justice Burn mechanism

2. **Recruit Validators**:
   - Share genesis file
   - Provide seed nodes
   - Document validator requirements

3. **IBC Integration**:
   - Enable IBC module
   - Create channels to Cosmos Hub
   - Test cross-chain transfers

4. **Security Audit**:
   - Review custom modules
   - Test attack vectors
   - Validate economic models

5. **Mainnet Preparation**:
   - Document all procedures
   - Create validator onboarding
   - Establish governance processes

---

## Important Files Reference

```
Project Structure:
├── bin/
│   └── aequitasd                          # Compiled binary
├── scripts/
│   ├── pin-to-ipfs.sh                     # IPFS pinning guide
│   ├── download-binary.sh                 # Binary download guide
│   └── init-testnet.sh                    # Testnet initialization
├── DECLARATION_OF_SOVEREIGNTY.md          # Constitutional document
├── genesis-template.json                  # Genesis configuration
└── ~/.aequitas/                           # Node data (created on init)
    ├── config/
    │   ├── genesis.json                   # Active genesis
    │   ├── config.toml                    # Node config
    │   └── app.toml                       # App config
    ├── data/                              # Blockchain data
    └── keyring-test/                      # Validator keys
```

---

## Summary Commands

```bash
# Quick Start (Local Compilation)
cd aequitas && go build -o ../bin/aequitasd ./cmd/aequitasd && cd ..
./scripts/init-testnet.sh
./bin/aequitasd start --home ~/.aequitas

# Or use helper scripts
./scripts/pin-to-ipfs.sh          # Shows IPFS options
./scripts/download-binary.sh      # Shows download options
./scripts/init-testnet.sh         # Initialize testnet
```

---

**Your blockchain is ready to launch. Justice is about to become a protocol.**
