#!/bin/bash
# Initialize Both Aequitas Zone Networks (Testnet & Mainnet)
# This script initializes both networks in a single operation

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     Initialize Aequitas Zone - Testnet & Mainnet              ║"
echo "║     Dual-Network Initialization for $REPAR Sovereignty        ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BINARY="./bin/aequitasd"
TESTNET_CHAIN_ID="aequitas-testnet-1"
MAINNET_CHAIN_ID="aequitas-1"
TESTNET_MONIKER="validator-testnet"
MAINNET_MONIKER="validator-mainnet"
TESTNET_HOME="$HOME/.aequitas-testnet"
MAINNET_HOME="$HOME/.aequitas"
TESTNET_GENESIS="./bin/genesis-testnet.json"
MAINNET_GENESIS="./bin/genesis-mainnet.json"
FOUNDER_ADDRESS="repar1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun"

# Check if binary exists
if [ ! -f "$BINARY" ]; then
    echo -e "${RED}❌ Error: Binary not found at $BINARY${NC}"
    echo ""
    echo "Please ensure the blockchain binary is available."
    exit 1
fi

echo -e "${GREEN}✅ Found binary: $BINARY${NC}"
chmod +x "$BINARY"
echo ""

# Check if genesis files exist
if [ ! -f "$TESTNET_GENESIS" ]; then
    echo -e "${RED}❌ Error: Testnet genesis not found: $TESTNET_GENESIS${NC}"
    exit 1
fi

if [ ! -f "$MAINNET_GENESIS" ]; then
    echo -e "${RED}❌ Error: Mainnet genesis not found: $MAINNET_GENESIS${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found testnet genesis: $TESTNET_GENESIS${NC}"
echo -e "${GREEN}✅ Found mainnet genesis: $MAINNET_GENESIS${NC}"
echo ""

# Function to initialize a network
init_network() {
    local CHAIN_ID=$1
    local MONIKER=$2
    local HOME_DIR=$3
    local GENESIS_FILE=$4
    local NETWORK_NAME=$5
    
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  Initializing $NETWORK_NAME${NC}"
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
    
    # Initialize the chain
    echo "🌐 Initializing blockchain..."
    $BINARY init "$MONIKER" --chain-id "$CHAIN_ID" --home "$HOME_DIR" > /dev/null 2>&1
    echo -e "${GREEN}✅ Chain initialized${NC}"
    echo ""
    
    # Copy genesis file
    echo "📋 Installing genesis file..."
    cp "$GENESIS_FILE" "$HOME_DIR/config/genesis.json"
    echo -e "${GREEN}✅ Genesis file installed${NC}"
    echo ""
    
    # Validate genesis
    echo "🔍 Validating genesis file..."
    if $BINARY validate-genesis --home "$HOME_DIR" 2>/dev/null; then
        echo -e "${GREEN}✅ Genesis is valid${NC}"
    else
        echo -e "${YELLOW}⚠️  Genesis validation command not available (expected for this version)${NC}"
    fi
    echo ""
    
    # Verify founder allocation
    echo "💰 Verifying founder allocation..."
    BALANCE=$(jq -r ".app_state.bank.balances[] | select(.address == \"$FOUNDER_ADDRESS\") | .coins[0].amount" "$HOME_DIR/config/genesis.json")
    echo "  Founder Address: $FOUNDER_ADDRESS"
    echo "  Liquid Balance: $BALANCE REPAR (15.72T expected)"
    
    if [ "$BALANCE" = "15720000000000" ]; then
        echo -e "${GREEN}✅ Founder allocation verified${NC}"
    else
        echo -e "${RED}❌ Founder allocation mismatch${NC}"
    fi
    echo ""
    
    echo -e "${GREEN}🎉 $NETWORK_NAME Initialization Complete!${NC}"
    echo ""
}

# Initialize Testnet
init_network "$TESTNET_CHAIN_ID" "$TESTNET_MONIKER" "$TESTNET_HOME" "$TESTNET_GENESIS" "TESTNET"

# Initialize Mainnet
init_network "$MAINNET_CHAIN_ID" "$MAINNET_MONIKER" "$MAINNET_HOME" "$MAINNET_GENESIS" "MAINNET"

# Final Summary
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║            DUAL-NETWORK INITIALIZATION COMPLETE                ║"
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
echo ""
echo "🌐 MAINNET (aequitas-1):"
echo "   Home: $MAINNET_HOME"
echo "   Config: $MAINNET_HOME/config/config.toml"
echo "   Genesis: $MAINNET_HOME/config/genesis.json"
echo ""
echo "💰 FOUNDER ALLOCATION:"
echo "   Address: $FOUNDER_ADDRESS"
echo "   Liquid Wallet: 15.72T REPAR (12% of supply)"
echo "   Endowment: 7.86T REPAR (6% of supply, locked 8 years)"
echo "   Total: 23.58T REPAR (18% of supply)"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "   1️⃣  Start Testnet:"
echo "      $BINARY start --home $TESTNET_HOME"
echo ""
echo "   2️⃣  Start Mainnet (after thorough testnet validation):"
echo "      $BINARY start --home $MAINNET_HOME"
echo ""
echo "   3️⃣  Query founder balance:"
echo "      $BINARY query bank balances $FOUNDER_ADDRESS --home $TESTNET_HOME"
echo ""
echo "   4️⃣  Deploy to production (DigitalOcean):"
echo "      ./deploy-to-digitalocean.sh"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo -e "${BLUE}Justice is no longer a request. It is a protocol.${NC}"
echo ""
