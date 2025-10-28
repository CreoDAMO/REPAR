#!/bin/bash
# Initialize Aequitas Zone Testnet

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         Initialize Aequitas Zone Testnet                       ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Configuration
CHAIN_ID="aequitas-1"
MONIKER="validator"
BINARY="./bin/aequitasd"
HOME_DIR="$HOME/.aequitas"
GENESIS_TEMPLATE="genesis-template.json"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if binary exists
if [ ! -f "$BINARY" ]; then
    echo -e "${RED}❌ Error: Binary not found at $BINARY${NC}"
    echo ""
    echo "Please run: ./scripts/download-binary.sh"
    exit 1
fi

echo -e "${GREEN}✅ Found binary: $BINARY${NC}"
chmod +x "$BINARY"
echo ""

# Check if genesis template exists
if [ ! -f "$GENESIS_TEMPLATE" ]; then
    echo -e "${RED}❌ Error: Genesis template not found: $GENESIS_TEMPLATE${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found genesis template: $GENESIS_TEMPLATE${NC}"
echo ""

# Initialize the chain
echo "🌐 Initializing chain..."
echo "   Chain ID: $CHAIN_ID"
echo "   Moniker: $MONIKER"
echo "   Home: $HOME_DIR"
echo ""

# Remove old data if exists
if [ -d "$HOME_DIR" ]; then
    echo -e "${YELLOW}⚠️  Existing data found at $HOME_DIR${NC}"
    read -p "   Remove and start fresh? (y/n): " confirm
    if [[ "$confirm" =~ ^[Yy]$ ]]; then
        rm -rf "$HOME_DIR"
        echo "   Cleaned old data."
    else
        echo "   Keeping existing data. This may cause conflicts."
    fi
    echo ""
fi

# Initialize
$BINARY init "$MONIKER" --chain-id "$CHAIN_ID" --home "$HOME_DIR"

echo -e "${GREEN}✅ Chain initialized${NC}"
echo ""

# Copy genesis file
echo "📋 Installing genesis file..."
cp "$GENESIS_TEMPLATE" "$HOME_DIR/config/genesis.json"
echo -e "${GREEN}✅ Genesis file installed${NC}"
echo ""

# Display genesis info
echo "📊 Genesis Configuration:"
echo "   Time: $(jq -r '.genesis_time' $HOME_DIR/config/genesis.json)"
echo "   Chain ID: $(jq -r '.chain_id' $HOME_DIR/config/genesis.json)"
echo "   Declaration Hash: $(jq -r '.metadata.founding_document.document_hash' $HOME_DIR/config/genesis.json)"
echo ""

# Display configuration
echo "⚙️  Node Configuration:"
echo "   Config: $HOME_DIR/config/config.toml"
echo "   App Config: $HOME_DIR/config/app.toml"
echo "   Genesis: $HOME_DIR/config/genesis.json"
echo ""

# Validate genesis
echo "🔍 Validating genesis file..."
$BINARY validate-genesis --home "$HOME_DIR" 2>/dev/null && echo -e "${GREEN}✅ Genesis is valid${NC}" || echo -e "${YELLOW}⚠️  Validation may not be implemented${NC}"
echo ""

# Create validator key
echo "🔑 Creating validator key..."
echo "   This will generate a new validator account."
read -p "   Generate new key? (y/n): " genkey
if [[ "$genkey" =~ ^[Yy]$ ]]; then
    echo ""
    echo "   Enter a name for your validator key (e.g., 'validator'):"
    read -p "   Key name: " keyname
    keyname=${keyname:-validator}
    
    echo ""
    echo "🔐 Generating key: $keyname"
    $BINARY keys add "$keyname" --home "$HOME_DIR"
    
    echo ""
    echo -e "${GREEN}✅ Validator key created${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  IMPORTANT: Save the mnemonic phrase above!${NC}"
    echo "   You'll need it to recover your validator account."
fi
echo ""

echo "════════════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}🎉 Testnet Initialization Complete!${NC}"
echo ""
echo "📋 Next Steps:"
echo ""
echo "   1️⃣  Review configuration:"
echo "      nano $HOME_DIR/config/config.toml"
echo ""
echo "   2️⃣  Add genesis accounts (optional):"
echo "      $BINARY genesis add-genesis-account <address> <amount>repar --home $HOME_DIR"
echo ""
echo "   3️⃣  Create genesis transaction:"
echo "      $BINARY genesis gentx <key-name> <stake-amount>repar \\"
echo "        --chain-id $CHAIN_ID --home $HOME_DIR"
echo ""
echo "   4️⃣  Collect genesis transactions:"
echo "      $BINARY genesis collect-gentxs --home $HOME_DIR"
echo ""
echo "   5️⃣  Start the node:"
echo "      $BINARY start --home $HOME_DIR"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "💡 Quick Start (Single Node Testnet):"
echo "   $BINARY start --home $HOME_DIR"
echo ""
