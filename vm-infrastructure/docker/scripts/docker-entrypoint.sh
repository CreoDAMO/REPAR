#!/bin/bash
# Aequitas Protocol Zone - Docker Entrypoint Script
# Handles initialization with environment-based chain selection

set -e

# Environment variables with defaults
CHAIN_ID=${CHAIN_ID:-aequitas-1}
CHAIN_FLAVOR=${CHAIN_FLAVOR:-mainnet}
MONIKER=${MONIKER:-aequitas-node-01}
AEQUITAS_HOME=${AEQUITAS_HOME:-/var/lib/aequitas}

echo "================================================"
echo "Aequitas Protocol Zone - Sovereign Node"
echo "================================================"
echo "Chain ID: $CHAIN_ID"
echo "Chain Flavor: $CHAIN_FLAVOR"
echo "Moniker: $MONIKER"
echo "Home: $AEQUITAS_HOME"
echo "================================================"

# Function to initialize node if not already initialized
initialize_node() {
    if [ ! -d "$AEQUITAS_HOME/config" ]; then
        echo "Initializing new Aequitas node..."
        aequitasd init "$MONIKER" --chain-id "$CHAIN_ID" --home "$AEQUITAS_HOME"
        
        # Copy genesis file based on chain flavor (mounted from host)
        if [ -f "/etc/aequitas/chain-config/$CHAIN_FLAVOR/genesis.json" ]; then
            echo "Using $CHAIN_FLAVOR genesis file..."
            cp "/etc/aequitas/chain-config/$CHAIN_FLAVOR/genesis.json" "$AEQUITAS_HOME/config/genesis.json"
        else
            echo "WARNING: No genesis file found for $CHAIN_FLAVOR"
        fi
        
        # Set keyring backend to test for development
        aequitasd config chain-id "$CHAIN_ID" --home "$AEQUITAS_HOME"
        aequitasd config keyring-backend test --home "$AEQUITAS_HOME"
        
        echo "Node initialized successfully!"
    else
        echo "Node already initialized, skipping initialization..."
    fi
}

# Function to start the node
start_node() {
    echo "Starting Aequitas node..."
    exec aequitasd start --home "$AEQUITAS_HOME" --log_level info
}

# Main execution
case "$1" in
    start)
        initialize_node
        start_node
        ;;
    init)
        initialize_node
        ;;
    version)
        aequitasd version
        ;;
    *)
        # Pass through any other commands to aequitasd
        exec aequitasd "$@"
        ;;
esac
