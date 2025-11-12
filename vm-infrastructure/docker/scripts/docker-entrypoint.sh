#!/bin/bash
set -e

# Aequitas Protocol Zone - Docker Entrypoint Script
# Initializes blockchain node based on environment configuration

CHAIN_FLAVOR=${CHAIN_FLAVOR:-mainnet}
NODE_MONIKER=${NODE_MONIKER:-aequitas-node}
AEQUITAS_HOME=${AEQUITAS_HOME:-/root/.aequitas}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Aequitas Protocol Zone - Sovereign Blockchain"
echo "Chain: $CHAIN_FLAVOR | Moniker: $NODE_MONIKER"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if node is already initialized
if [ ! -d "$AEQUITAS_HOME/config" ]; then
    echo "📦 Initializing new node..."
    aequitasd init "$NODE_MONIKER" --chain-id aequitas-${CHAIN_FLAVOR}
    
    # Copy genesis file from mounted volume
    if [ -f "/genesis/${CHAIN_FLAVOR}/genesis.json" ]; then
        echo "📋 Copying genesis file for $CHAIN_FLAVOR..."
        cp "/genesis/${CHAIN_FLAVOR}/genesis.json" "$AEQUITAS_HOME/config/genesis.json"
    elif [ -f "/genesis/genesis-${CHAIN_FLAVOR}.json" ]; then
        echo "📋 Copying genesis file for $CHAIN_FLAVOR..."
        cp "/genesis/genesis-${CHAIN_FLAVOR}.json" "$AEQUITAS_HOME/config/genesis.json"
    else
        echo "⚠️  Warning: No genesis file found for $CHAIN_FLAVOR"
        echo "    Searched: /genesis/${CHAIN_FLAVOR}/genesis.json"
        echo "    Searched: /genesis/genesis-${CHAIN_FLAVOR}.json"
    fi
    
    echo "✅ Node initialization complete"
else
    echo "♻️  Using existing node configuration"
fi

# Display configuration
echo ""
echo "Configuration:"
echo "  Chain ID:     aequitas-${CHAIN_FLAVOR}"
echo "  Moniker:      $NODE_MONIKER"
echo "  Home Dir:     $AEQUITAS_HOME"
echo "  Genesis:      $(ls -lh $AEQUITAS_HOME/config/genesis.json 2>/dev/null | awk '{print $5}' || echo 'not found')"
echo ""
echo "Endpoints:"
echo "  RPC:          http://0.0.0.0:26657"
echo "  REST:         http://0.0.0.0:1317"
echo "  gRPC:         http://0.0.0.0:9090"
echo "  P2P:          tcp://0.0.0.0:26656"
echo ""

# Start the blockchain node
echo "🚀 Starting Aequitas Protocol Zone node..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

exec aequitasd start
