#!/bin/bash
# Deterministic Genesis Generation for Aequitas Protocol
# Generates and validates genesis files for testnet and mainnet
# Usage: ./scripts/generate-genesis.sh <testnet|mainnet>

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

if [ -z "$1" ]; then
    echo -e "${RED}Error: Network parameter required${NC}"
    echo "Usage: $0 <testnet|mainnet>"
    exit 1
fi

NETWORK=$1
if [ "$NETWORK" != "testnet" ] && [ "$NETWORK" != "mainnet" ]; then
    echo -e "${RED}Error: Network must be 'testnet' or 'mainnet'${NC}"
    exit 1
fi

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║     Aequitas Genesis Generation - ${NETWORK^^}                 "
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

ALLOCATION_FILE="chain-config/allocation-structure.json"
if [ "$NETWORK" == "testnet" ]; then
    GENESIS_FILE="chain-config/testnet/genesis-testnet.json"
    CHAIN_ID="aequitas-testnet-1"
else
    GENESIS_FILE="chain-config/mainnet/genesis-mainnet.json"
    CHAIN_ID="aequitas-1"
fi

if [ ! -f "$ALLOCATION_FILE" ]; then
    echo -e "${RED}❌ Error: Allocation file not found: $ALLOCATION_FILE${NC}"
    exit 1
fi

if [ ! -f "$GENESIS_FILE" ]; then
    echo -e "${RED}❌ Error: Genesis template not found: $GENESIS_FILE${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found allocation structure: $ALLOCATION_FILE${NC}"
echo -e "${GREEN}✅ Found genesis template: $GENESIS_FILE${NC}"
echo ""

echo "📊 Generating allocations for $NETWORK..."
python3 scripts/generate_genesis_allocations.py "$NETWORK"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Genesis allocation generation failed${NC}"
    exit 1
fi

echo ""
echo "🔍 Validating genesis file structure..."

if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  jq not found, skipping JSON validation${NC}"
else
    if ! jq empty "$GENESIS_FILE" 2>/dev/null; then
        echo -e "${RED}❌ Invalid JSON in genesis file${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Genesis JSON is valid${NC}"
    
    TOTAL_SUPPLY=$(jq -r '.app_state.bank.supply[0].amount' "$GENESIS_FILE")
    echo "  Total supply: $TOTAL_SUPPLY REPAR"
    
    BALANCE_COUNT=$(jq '.app_state.bank.balances | length' "$GENESIS_FILE")
    echo "  Balance entries: $BALANCE_COUNT"
    
    ACCOUNT_COUNT=$(jq '.app_state.auth.accounts | length' "$GENESIS_FILE")
    echo "  Account entries: $ACCOUNT_COUNT"
fi

echo ""
echo "📝 Generating checksum..."
CHECKSUM_FILE="${GENESIS_FILE}.sha256"
shasum -a 256 "$GENESIS_FILE" > "$CHECKSUM_FILE"
CHECKSUM=$(cat "$CHECKSUM_FILE" | awk '{print $1}')
echo -e "${GREEN}✅ Checksum: $CHECKSUM${NC}"
echo "  Saved to: $CHECKSUM_FILE"

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo -e "║  ${GREEN}Genesis Generation Complete${NC}                           "
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""
echo "📋 Summary:"
echo "  Network: $NETWORK"
echo "  Chain ID: $CHAIN_ID"
echo "  Genesis: $GENESIS_FILE"
echo "  Checksum: $CHECKSUM_FILE"
echo ""
echo "🎯 Next Steps:"
if [ "$NETWORK" == "testnet" ]; then
    echo "  1. Run: ./scripts/init-testnet.sh"
    echo "  2. Validate: ./bin/aequitasd validate-genesis --home ~/.aequitas-testnet"
    echo "  3. Start: ./bin/aequitasd start --home ~/.aequitas-testnet"
else
    echo "  1. Run: ./scripts/init-mainnet.sh"
    echo "  2. Validate: ./bin/aequitasd validate-genesis --home ~/.aequitas"
    echo "  3. Coordinate with validators for genesis ceremony"
    echo "  4. Start: ./bin/aequitasd start --home ~/.aequitas"
fi
echo ""
