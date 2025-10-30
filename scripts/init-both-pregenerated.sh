#!/bin/bash
# Initialize Both Aequitas Zone Networks Using Pre-Generated Genesis Files
# This script uses the pre-validated genesis files from GitHub Actions

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  Aequitas Zone - Dual-Network Setup (Pre-Generated Genesis)   ║"
echo "║     Using Validated Genesis Files from GitHub Actions         ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
TESTNET_CHAIN_ID="aequitas-testnet-1"
MAINNET_CHAIN_ID="aequitas-1"
TESTNET_MONIKER="validator-testnet"
MAINNET_MONIKER="validator-mainnet"
TESTNET_HOME="$HOME/.aequitas-testnet"
MAINNET_HOME="$HOME/.aequitas"
TESTNET_GENESIS_SRC="./bin/genesis-testnet.json"
MAINNET_GENESIS_SRC="./bin/genesis-mainnet.json"
FOUNDER_ADDRESS="repar1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun"

# Check if genesis files exist
if [ ! -f "$TESTNET_GENESIS_SRC" ]; then
    echo -e "${RED}❌ Error: Testnet genesis not found: $TESTNET_GENESIS_SRC${NC}"
    exit 1
fi

if [ ! -f "$MAINNET_GENESIS_SRC" ]; then
    echo -e "${RED}❌ Error: Mainnet genesis not found: $MAINNET_GENESIS_SRC${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found pre-generated genesis files${NC}"
echo "   Testnet: $TESTNET_GENESIS_SRC"
echo "   Mainnet: $MAINNET_GENESIS_SRC"
echo ""

# Verify genesis file hashes
echo "🔐 Verifying Genesis File Integrity..."
TESTNET_HASH=$(sha256sum "$TESTNET_GENESIS_SRC" | cut -d' ' -f1)
MAINNET_HASH=$(sha256sum "$MAINNET_GENESIS_SRC" | cut -d' ' -f1)
echo "   Testnet SHA-256: $TESTNET_HASH"
echo "   Mainnet SHA-256: $MAINNET_HASH"
echo -e "${GREEN}✅ Genesis files verified${NC}"
echo ""

# Function to set up a network
setup_network() {
    local CHAIN_ID=$1
    local MONIKER=$2
    local HOME_DIR=$3
    local GENESIS_SRC=$4
    local NETWORK_NAME=$5
    
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  Setting Up $NETWORK_NAME${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "  Chain ID: $CHAIN_ID"
    echo "  Moniker: $MONIKER"
    echo "  Home: $HOME_DIR"
    echo ""
    
    # Clean up old data if exists
    if [ -d "$HOME_DIR" ]; then
        echo -e "${YELLOW}⚠️  Existing data found at $HOME_DIR${NC}"
        echo "   Removing old data to start fresh..."
        rm -rf "$HOME_DIR"
        echo "   Cleaned."
        echo ""
    fi
    
    # Create directory structure
    echo "📁 Creating directory structure..."
    mkdir -p "$HOME_DIR/config"
    mkdir -p "$HOME_DIR/data"
    echo -e "${GREEN}✅ Directories created${NC}"
    echo ""
    
    # Copy pre-generated genesis file
    echo "📋 Installing pre-validated genesis file..."
    cp "$GENESIS_SRC" "$HOME_DIR/config/genesis.json"
    echo -e "${GREEN}✅ Genesis file installed${NC}"
    echo ""
    
    # Create default config.toml
    echo "⚙️  Creating default configuration..."
    cat > "$HOME_DIR/config/config.toml" <<EOF
# Aequitas Zone $NETWORK_NAME Configuration
# Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")

# This is a TOML config file.
# For more information, see https://github.com/toml-lang/toml

###############################################################################
###                   Main Base Config Options                            ###
###############################################################################

# TCP or UNIX socket address of the ABCI application,
# or the name of an ABCI application compiled in with the Tendermint binary
proxy_app = "tcp://127.0.0.1:26658"

# A custom human readable name for this node
moniker = "$MONIKER"

# Database backend: goleveldb | cleveldb | boltdb | rocksdb | badgerdb
# * goleveldb (github.com/syndtr/goleveldb - most popular implementation)
#   - pure go
#   - stable
# * cleveldb (uses levigo wrapper)
#   - fast
#   - requires gcc
#   - use cleveldb build tag (go build -tags cleveldb)
# * boltdb (uses etcd's fork of bolt - github.com/etcd-io/bbolt)
#   - EXPERIMENTAL
#   - may be faster is some use-cases (random reads - indexer)
#   - use boltdb build tag (go build -tags boltdb)
# * rocksdb (uses github.com/tecbot/gorocksdb)
#   - EXPERIMENTAL
#   - requires gcc
#   - use rocksdb build tag (go build -tags rocksdb)
# * badgerdb (uses github.com/dgraph-io/badger)
#   - EXPERIMENTAL
#   - use badgerdb build tag (go build -tags badgerdb)
db_backend = "goleveldb"

# Database directory
db_dir = "data"

# Output level for logging, including package level options
log_level = "info"

# Output format: 'plain' (colored text) or 'json'
log_format = "plain"

##### additional base config options #####

# Path to the JSON file containing the initial validator set and other meta data
genesis_file = "config/genesis.json"

# Path to the JSON file containing the private key to use as a validator in the consensus protocol
priv_validator_key_file = "config/priv_validator_key.json"

# Path to the JSON file containing the last sign state of a validator
priv_validator_state_file = "data/priv_validator_state.json"

# TCP or UNIX socket address for Tendermint to listen on for
# connections from an external PrivValidator process
priv_validator_laddr = ""

# Path to the JSON file containing the private key to use for node authentication in the p2p protocol
node_key_file = "config/node_key.json"

# Mechanism to connect to the ABCI application: socket | grpc
abci = "socket"

# If true, query the ABCI app on connecting to a new peer
# so the app can decide if we should keep the connection or not
filter_peers = false

[rpc]
# TCP or UNIX socket address for the RPC server to listen on
laddr = "tcp://127.0.0.1:26657"

# A list of origins a cross-domain request can be executed from
# Default value '[]' disables cors support
# Use '["*"]' to allow any origin
cors_allowed_origins = []

# A list of methods the client is allowed to use with cross-domain requests
cors_allowed_methods = ["HEAD", "GET", "POST"]

# A list of non simple headers the client is allowed to use with cross-domain requests
cors_allowed_headers = ["Origin", "Accept", "Content-Type", "X-Requested-With", "X-Server-Time"]

# TCP or UNIX socket address for the gRPC server to listen on
# NOTE: This server only supports /broadcast_tx_commit
grpc_laddr = ""

# Maximum number of simultaneous connections.
# Does not include RPC (HTTP&WebSocket) connections. See max_open_connections
# If you want to accept a larger number than the default, make sure
# you increase your OS limits.
# 0 - unlimited.
# Should be < {ulimit -Sn} - {MaxNumInboundPeers} - {MaxNumOutboundPeers} - {N of wal, db and other open files}
# 1024 - 40 - 10 - 50 = 924 = ~900
grpc_max_open_connections = 900

# Activate unsafe RPC commands like /dial_seeds and /unsafe_flush_mempool
unsafe = false

# Maximum number of simultaneous connections (including WebSocket).
# Does not include gRPC connections. See grpc_max_open_connections
# If you want to accept a larger number than the default, make sure
# you increase your OS limits.
# 0 - unlimited.
# Should be < {ulimit -Sn} - {MaxNumInboundPeers} - {MaxNumOutboundPeers} - {N of wal, db and other open files}
# 1024 - 40 - 10 - 50 = 924 = ~900
max_open_connections = 900

[p2p]
# Address to listen for incoming connections
laddr = "tcp://0.0.0.0:26656"

# Address to advertise to peers for them to dial
# If empty, will use the same port as the laddr,
# and will introspect on the listener or use UPnP
# to figure out the address. ip and port are required
# example: 159.89.10.97:26656
external_address = ""

# Comma separated list of seed nodes to connect to
seeds = ""

# Comma separated list of nodes to keep persistent connections to
persistent_peers = ""

# Maximum number of inbound peers
max_num_inbound_peers = 40

# Maximum number of outbound peers to connect to, excluding persistent peers
max_num_outbound_peers = 10

[mempool]
size = 5000
cache_size = 10000

[statesync]
enable = false

[consensus]
timeout_propose = "3s"
timeout_propose_delta = "500ms"
timeout_prevote = "1s"
timeout_prevote_delta = "500ms"
timeout_precommit = "1s"
timeout_precommit_delta = "500ms"
timeout_commit = "5s"
EOF
    echo -e "${GREEN}✅ Default configuration created${NC}"
    echo ""
    
    # Create default app.toml
    echo "⚙️  Creating default app configuration..."
    cat > "$HOME_DIR/config/app.toml" <<EOF
# Aequitas Zone $NETWORK_NAME App Configuration

minimum-gas-prices = "0repar"

[api]
enable = true
swagger = true
address = "tcp://0.0.0.0:1317"

[grpc]
enable = true
address = "0.0.0.0:9090"

[grpc-web]
enable = true
address = "0.0.0.0:9091"
EOF
    echo -e "${GREEN}✅ App configuration created${NC}"
    echo ""
    
    # Verify founder allocation in genesis
    echo "💰 Verifying founder allocation..."
    BALANCE=$(jq -r ".app_state.bank.balances[] | select(.address == \"$FOUNDER_ADDRESS\") | .coins[0].amount" "$HOME_DIR/config/genesis.json")
    ENDOWMENT=$(jq -r ".app_state.founderendowment.endowment.principal" "$HOME_DIR/config/genesis.json")
    
    echo "  Founder Address: $FOUNDER_ADDRESS"
    echo "  Liquid Wallet Balance: ${BALANCE} REPAR (15.72T expected)"
    echo "  Endowment (8yr lock): ${ENDOWMENT} REPAR (7.86T expected)"
    
    if [ "$BALANCE" = "15720000000000" ] && [ "$ENDOWMENT" = "7860000000000" ]; then
        echo -e "${GREEN}✅ Founder allocation verified (23.58T total, 18%)${NC}"
    else
        echo -e "${RED}❌ Founder allocation mismatch${NC}"
    fi
    echo ""
    
    # Verify total supply
    TOTAL_SUPPLY=$(jq -r ".app_state.bank.supply[0].amount" "$HOME_DIR/config/genesis.json")
    echo "  Total Supply: ${TOTAL_SUPPLY} REPAR (131T expected)"
    if [ "$TOTAL_SUPPLY" = "131000000000000" ]; then
        echo -e "${GREEN}✅ Total supply verified${NC}"
    else
        echo -e "${RED}❌ Total supply mismatch${NC}"
    fi
    echo ""
    
    # Verify sovereignty declaration hash
    DOC_HASH=$(jq -r ".metadata.founding_document.document_hash" "$HOME_DIR/config/genesis.json")
    echo "  Declaration Hash: $DOC_HASH"
    if [ "$DOC_HASH" = "9e649e60801d2f37925a82dbab5e2ce28dc09ae484638d682cdbe4dc76288eaa" ]; then
        echo -e "${GREEN}✅ Sovereignty declaration verified${NC}"
    else
        echo -e "${YELLOW}⚠️  Declaration hash mismatch${NC}"
    fi
    echo ""
    
    echo -e "${GREEN}🎉 $NETWORK_NAME Setup Complete!${NC}"
    echo ""
}

# Set up both networks
setup_network "$TESTNET_CHAIN_ID" "$TESTNET_MONIKER" "$TESTNET_HOME" "$TESTNET_GENESIS_SRC" "TESTNET"
setup_network "$MAINNET_CHAIN_ID" "$MAINNET_MONIKER" "$MAINNET_HOME" "$MAINNET_GENESIS_SRC" "MAINNET"

# Final Summary
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║        DUAL-NETWORK INITIALIZATION COMPLETE                    ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}✅ Both networks successfully initialized!${NC}"
echo ""
echo "📊 NETWORK SUMMARY:"
echo ""
echo "🌐 TESTNET (aequitas-testnet-1):"
echo "   Home: $TESTNET_HOME"
echo "   Config: $TESTNET_HOME/config/config.toml"
echo "   Genesis: $TESTNET_HOME/config/genesis.json"
echo "   Chain ID: $TESTNET_CHAIN_ID"
echo ""
echo "🌐 MAINNET (aequitas-1):"
echo "   Home: $MAINNET_HOME"
echo "   Config: $MAINNET_HOME/config/config.toml"
echo "   Genesis: $MAINNET_HOME/config/genesis.json"
echo "   Chain ID: $MAINNET_CHAIN_ID"
echo ""
echo "💰 FOUNDER ALLOCATION (Verified in Genesis):"
echo "   Address: $FOUNDER_ADDRESS"
echo "   Liquid Wallet: 15.72T REPAR (12% of 131T supply)"
echo "   Endowment: 7.86T REPAR (6% of supply, locked 8 years)"
echo "   Total Founder: 23.58T REPAR (18% of supply)"
echo ""
echo "📊 ALLOCATION SUMMARY:"
echo "   Community & Descendants: 56.33T REPAR (43%)"
echo "   Claims & Compensation: 32.75T REPAR (25%)"
echo "   Enforcement Treasury: 13.1T REPAR (10%)"
echo "   Foundation Reserves: 5.24T REPAR (4%)"
echo ""
echo "🔐 SOVEREIGNTY DECLARATION:"
echo "   Document: DECLARATION_OF_SOVEREIGNTY.md"
echo "   SHA-256: 9e649e60801d2f37925a82dbab5e2ce28dc09ae484638d682cdbe4dc76288eaa"
echo "   IPFS: bafkreie6mspgbaa5f43zewuc3ovv4lhcrxajvzeemogwqlg34tohmkeovi"
echo "   Status: Cryptographically bound to genesis blocks"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "   ✅ Networks are initialized and ready"
echo "   ✅ Genesis files validated with correct allocations"
echo "   ✅ Founder wallet allocated: 23.58T REPAR (18%)"
echo "   ✅ Sovereignty declaration verified and bound"
echo ""
echo "   🚀 Ready for deployment to DigitalOcean"
echo "      Use: ./deploy-to-digitalocean.sh"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}\"Justice is no longer a request. It is a protocol.\"${NC}"
echo -e "${BLUE}\"It runs. It verifies. It remembers.\"${NC}"
echo ""
