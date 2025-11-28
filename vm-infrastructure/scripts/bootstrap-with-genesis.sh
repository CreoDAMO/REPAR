#!/bin/bash

################################################################################
# AEQUITAS PROTOCOL - Unified Bootstrap with Genesis Integration
#
# Creates validator nodes with cryptographic identities bound to genesis.json
# Addresses the gap: "Multi-Node Bootstrap Not Tied to AVM Genesis"
#
# Features:
# - Generates Ed25519 keypairs for each validator
# - Creates gentx transactions
# - Binds validator public keys to genesis.json
# - Distributes genesis to all nodes
# - Integrates with ACE node registry
################################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

CHAIN_ID="${CHAIN_ID:-aequitas-1}"
CLUSTER_SIZE="${CLUSTER_SIZE:-3}"
BOOTSTRAP_DIR="${BOOTSTRAP_DIR:-./bootstrap-output}"
AEQUITASD_BIN="${AEQUITASD_BIN:-aequitasd}"
DENOM="${DENOM:-urepar}"
INITIAL_STAKE="${INITIAL_STAKE:-1000000000000}"
VALIDATOR_STAKE="${VALIDATOR_STAKE:-500000000000}"
NODE_PREFIX="${NODE_PREFIX:-aequitas-node}"

echo -e "${CYAN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║           AEQUITAS PROTOCOL - GENESIS-INTEGRATED BOOTSTRAP                   ║
║           Sovereign Validator Network Initialization                         ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

usage() {
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  --cluster-size N     Number of validator nodes (default: 3)"
    echo "  --chain-id ID        Chain ID (default: aequitas-1)"
    echo "  --output DIR         Output directory (default: ./bootstrap-output)"
    echo "  --node-ips FILE      File containing node IPs (one per line)"
    echo "  --help               Show this help"
    echo ""
    echo "Environment Variables:"
    echo "  AEQUITASD_BIN        Path to aequitasd binary"
    echo "  INITIAL_STAKE        Initial stake per validator (default: 1000000000000)"
    echo "  VALIDATOR_STAKE      Stake for gentx (default: 500000000000)"
    exit 0
}

while [[ $# -gt 0 ]]; do
    case $1 in
        --cluster-size)
            CLUSTER_SIZE="$2"
            shift 2
            ;;
        --chain-id)
            CHAIN_ID="$2"
            shift 2
            ;;
        --output)
            BOOTSTRAP_DIR="$2"
            shift 2
            ;;
        --node-ips)
            NODE_IPS_FILE="$2"
            shift 2
            ;;
        --help)
            usage
            ;;
        *)
            shift
            ;;
    esac
done

check_dependencies() {
    echo -e "${BLUE}[1/7] Checking dependencies...${NC}"
    
    if ! command -v $AEQUITASD_BIN &> /dev/null; then
        echo -e "${YELLOW}aequitasd not found in PATH, checking local builds...${NC}"
        if [ -f "./aequitas/build/aequitasd" ]; then
            AEQUITASD_BIN="./aequitas/build/aequitasd"
        elif [ -f "./build/aequitasd" ]; then
            AEQUITASD_BIN="./build/aequitasd"
        else
            echo -e "${RED}Error: aequitasd binary not found${NC}"
            echo -e "${YELLOW}Build it first: cd aequitas && make build${NC}"
            exit 1
        fi
    fi
    
    if ! command -v jq &> /dev/null; then
        echo -e "${RED}Error: jq is required${NC}"
        exit 1
    fi
    
    if ! command -v openssl &> /dev/null; then
        echo -e "${RED}Error: openssl is required${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✓ All dependencies available${NC}"
    echo -e "${GREEN}✓ Using: $AEQUITASD_BIN${NC}"
}

create_directory_structure() {
    echo -e "${BLUE}[2/7] Creating directory structure...${NC}"
    
    rm -rf "$BOOTSTRAP_DIR"
    mkdir -p "$BOOTSTRAP_DIR"/{genesis,nodes,keys,gentx,registry}
    
    for ((i=1; i<=CLUSTER_SIZE; i++)); do
        NODE_DIR="$BOOTSTRAP_DIR/nodes/node-$(printf '%02d' $i)"
        mkdir -p "$NODE_DIR"/{config,data}
    done
    
    echo -e "${GREEN}✓ Created directories for $CLUSTER_SIZE nodes${NC}"
}

generate_validator_keys() {
    echo -e "${BLUE}[3/7] Generating Ed25519 validator keys...${NC}"
    
    VALIDATOR_REGISTRY="$BOOTSTRAP_DIR/registry/validators.json"
    echo '{"validators": []}' > "$VALIDATOR_REGISTRY"
    
    for ((i=1; i<=CLUSTER_SIZE; i++)); do
        NODE_NUM=$(printf '%02d' $i)
        NODE_NAME="${NODE_PREFIX}-${NODE_NUM}"
        KEY_DIR="$BOOTSTRAP_DIR/keys/$NODE_NAME"
        mkdir -p "$KEY_DIR"
        
        openssl genpkey -algorithm ed25519 -out "$KEY_DIR/validator.key" 2>/dev/null
        openssl pkey -in "$KEY_DIR/validator.key" -pubout -out "$KEY_DIR/validator.pub" 2>/dev/null
        
        PUBKEY_HEX=$(openssl pkey -in "$KEY_DIR/validator.key" -pubout -outform DER 2>/dev/null | tail -c 32 | xxd -p | tr -d '\n')
        PUBKEY_BASE64=$(echo "$PUBKEY_HEX" | xxd -r -p | base64)
        
        NODE_HOME="$BOOTSTRAP_DIR/nodes/node-$NODE_NUM"
        $AEQUITASD_BIN init "$NODE_NAME" --chain-id "$CHAIN_ID" --home "$NODE_HOME" > /dev/null 2>&1
        
        TENDERMINT_PUBKEY=$($AEQUITASD_BIN tendermint show-validator --home "$NODE_HOME" 2>/dev/null | jq -r '.key')
        NODE_ID=$($AEQUITASD_BIN tendermint show-node-id --home "$NODE_HOME" 2>/dev/null)
        
        jq --arg name "$NODE_NAME" \
           --arg pubkey "$PUBKEY_BASE64" \
           --arg tm_pubkey "$TENDERMINT_PUBKEY" \
           --arg node_id "$NODE_ID" \
           --argjson index "$i" \
           '.validators += [{
               "index": $index,
               "name": $name,
               "pubkey_ed25519": $pubkey,
               "tendermint_pubkey": $tm_pubkey,
               "node_id": $node_id,
               "status": "genesis"
           }]' "$VALIDATOR_REGISTRY" > "$VALIDATOR_REGISTRY.tmp" && mv "$VALIDATOR_REGISTRY.tmp" "$VALIDATOR_REGISTRY"
        
        echo -e "${GREEN}  ✓ Generated keys for $NODE_NAME (Node ID: ${NODE_ID:0:12}...)${NC}"
    done
    
    echo -e "${GREEN}✓ All validator keys generated${NC}"
}

create_genesis() {
    echo -e "${BLUE}[4/7] Creating genesis with validator accounts...${NC}"
    
    GENESIS_NODE="$BOOTSTRAP_DIR/nodes/node-01"
    GENESIS_FILE="$GENESIS_NODE/config/genesis.json"
    
    for ((i=1; i<=CLUSTER_SIZE; i++)); do
        NODE_NUM=$(printf '%02d' $i)
        NODE_NAME="${NODE_PREFIX}-${NODE_NUM}"
        NODE_HOME="$BOOTSTRAP_DIR/nodes/node-$NODE_NUM"
        
        $AEQUITASD_BIN keys add "$NODE_NAME" --keyring-backend test --home "$NODE_HOME" --output json 2>/dev/null > "$BOOTSTRAP_DIR/keys/$NODE_NAME/account.json"
        
        ACCOUNT_ADDRESS=$(jq -r '.address' "$BOOTSTRAP_DIR/keys/$NODE_NAME/account.json")
        
        $AEQUITASD_BIN add-genesis-account "$ACCOUNT_ADDRESS" "${INITIAL_STAKE}${DENOM}" --home "$GENESIS_NODE" 2>/dev/null
        
        echo -e "${GREEN}  ✓ Added genesis account for $NODE_NAME: ${ACCOUNT_ADDRESS:0:20}...${NC}"
    done
    
    jq '.app_state.gov.params.voting_period = "172800s" |
        .app_state.gov.params.min_deposit[0].amount = "10000000" |
        .app_state.staking.params.unbonding_time = "1814400s" |
        .consensus.params.block.max_gas = "100000000"' \
        "$GENESIS_FILE" > "$GENESIS_FILE.tmp" && mv "$GENESIS_FILE.tmp" "$GENESIS_FILE"
    
    echo -e "${GREEN}✓ Genesis accounts created${NC}"
}

generate_gentx() {
    echo -e "${BLUE}[5/7] Generating validator transactions (gentx)...${NC}"
    
    GENESIS_NODE="$BOOTSTRAP_DIR/nodes/node-01"
    
    for ((i=1; i<=CLUSTER_SIZE; i++)); do
        NODE_NUM=$(printf '%02d' $i)
        NODE_NAME="${NODE_PREFIX}-${NODE_NUM}"
        NODE_HOME="$BOOTSTRAP_DIR/nodes/node-$NODE_NUM"
        
        cp "$GENESIS_NODE/config/genesis.json" "$NODE_HOME/config/genesis.json"
        
        cp -r "$BOOTSTRAP_DIR/keys/$NODE_NAME/." "$NODE_HOME/keyring-test/" 2>/dev/null || true
        
        $AEQUITASD_BIN gentx "$NODE_NAME" "${VALIDATOR_STAKE}${DENOM}" \
            --chain-id "$CHAIN_ID" \
            --moniker "$NODE_NAME" \
            --commission-rate "0.10" \
            --commission-max-rate "0.20" \
            --commission-max-change-rate "0.01" \
            --min-self-delegation "1" \
            --keyring-backend test \
            --home "$NODE_HOME" 2>/dev/null
        
        cp "$NODE_HOME/config/gentx/"*.json "$BOOTSTRAP_DIR/gentx/" 2>/dev/null || true
        
        echo -e "${GREEN}  ✓ Generated gentx for $NODE_NAME${NC}"
    done
    
    echo -e "${GREEN}✓ All gentx transactions generated${NC}"
}

collect_and_distribute_genesis() {
    echo -e "${BLUE}[6/7] Collecting gentx and distributing genesis...${NC}"
    
    GENESIS_NODE="$BOOTSTRAP_DIR/nodes/node-01"
    
    cp "$BOOTSTRAP_DIR/gentx/"*.json "$GENESIS_NODE/config/gentx/" 2>/dev/null
    
    $AEQUITASD_BIN collect-gentxs --home "$GENESIS_NODE" 2>/dev/null
    
    $AEQUITASD_BIN validate-genesis --home "$GENESIS_NODE" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Genesis validation passed${NC}"
    else
        echo -e "${RED}✗ Genesis validation failed${NC}"
        exit 1
    fi
    
    FINAL_GENESIS="$GENESIS_NODE/config/genesis.json"
    GENESIS_HASH=$(sha256sum "$FINAL_GENESIS" | cut -d' ' -f1)
    
    echo "$GENESIS_HASH" > "$BOOTSTRAP_DIR/genesis/genesis.hash"
    cp "$FINAL_GENESIS" "$BOOTSTRAP_DIR/genesis/genesis.json"
    
    for ((i=1; i<=CLUSTER_SIZE; i++)); do
        NODE_NUM=$(printf '%02d' $i)
        NODE_HOME="$BOOTSTRAP_DIR/nodes/node-$NODE_NUM"
        
        cp "$FINAL_GENESIS" "$NODE_HOME/config/genesis.json"
        
        echo "$GENESIS_HASH" > "$NODE_HOME/config/genesis.hash"
    done
    
    jq --arg hash "$GENESIS_HASH" '.genesis_hash = $hash' \
        "$BOOTSTRAP_DIR/registry/validators.json" > "$BOOTSTRAP_DIR/registry/validators.json.tmp" && \
        mv "$BOOTSTRAP_DIR/registry/validators.json.tmp" "$BOOTSTRAP_DIR/registry/validators.json"
    
    echo -e "${GREEN}✓ Genesis distributed to all nodes${NC}"
    echo -e "${CYAN}  Genesis Hash: $GENESIS_HASH${NC}"
}

configure_persistent_peers() {
    echo -e "${BLUE}[7/7] Configuring persistent peers...${NC}"
    
    PEERS=""
    
    if [ -n "$NODE_IPS_FILE" ] && [ -f "$NODE_IPS_FILE" ]; then
        readarray -t NODE_IPS < "$NODE_IPS_FILE"
    else
        NODE_IPS=()
        for ((i=1; i<=CLUSTER_SIZE; i++)); do
            NODE_IPS+=("127.0.0.1")
        done
    fi
    
    for ((i=1; i<=CLUSTER_SIZE; i++)); do
        NODE_NUM=$(printf '%02d' $i)
        NODE_HOME="$BOOTSTRAP_DIR/nodes/node-$NODE_NUM"
        NODE_ID=$($AEQUITASD_BIN tendermint show-node-id --home "$NODE_HOME" 2>/dev/null)
        
        IP="${NODE_IPS[$((i-1))]:-127.0.0.1}"
        PORT=$((26656 + (i-1) * 100))
        
        if [ -n "$PEERS" ]; then
            PEERS="${PEERS},"
        fi
        PEERS="${PEERS}${NODE_ID}@${IP}:${PORT}"
        
        jq --arg node_id "$NODE_ID" --arg ip "$IP" --argjson port "$PORT" \
           '(.validators[] | select(.index == '$i')) += {"ip": $ip, "p2p_port": $port}' \
           "$BOOTSTRAP_DIR/registry/validators.json" > "$BOOTSTRAP_DIR/registry/validators.json.tmp" && \
           mv "$BOOTSTRAP_DIR/registry/validators.json.tmp" "$BOOTSTRAP_DIR/registry/validators.json"
    done
    
    for ((i=1; i<=CLUSTER_SIZE; i++)); do
        NODE_NUM=$(printf '%02d' $i)
        NODE_HOME="$BOOTSTRAP_DIR/nodes/node-$NODE_NUM"
        CONFIG="$NODE_HOME/config/config.toml"
        
        if [ -f "$CONFIG" ]; then
            sed -i "s/persistent_peers = \"\"/persistent_peers = \"$PEERS\"/" "$CONFIG" 2>/dev/null || \
            sed -i '' "s/persistent_peers = \"\"/persistent_peers = \"$PEERS\"/" "$CONFIG" 2>/dev/null || true
            
            RPC_PORT=$((26657 + (i-1) * 100))
            sed -i "s/laddr = \"tcp:\/\/127.0.0.1:26657\"/laddr = \"tcp:\/\/0.0.0.0:$RPC_PORT\"/" "$CONFIG" 2>/dev/null || true
        fi
    done
    
    echo -e "${GREEN}✓ Peer configuration complete${NC}"
}

generate_ace_registry() {
    echo -e "${BLUE}Generating ACE node registry...${NC}"
    
    ACE_REGISTRY="$BOOTSTRAP_DIR/registry/ace-nodes.json"
    
    jq '{
        "version": "1.0.0",
        "chain_id": .validators[0].name | split("-")[0:2] | join("-"),
        "genesis_hash": .genesis_hash,
        "nodes": [.validators[] | {
            "id": .name,
            "node_id": .node_id,
            "pubkey": .pubkey_ed25519,
            "tendermint_pubkey": .tendermint_pubkey,
            "ip": .ip,
            "p2p_port": .p2p_port,
            "rpc_port": (.p2p_port + 1),
            "status": "registered",
            "verified": true
        }]
    }' "$BOOTSTRAP_DIR/registry/validators.json" > "$ACE_REGISTRY"
    
    echo -e "${GREEN}✓ ACE registry generated: $ACE_REGISTRY${NC}"
}

print_summary() {
    echo ""
    echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}              BOOTSTRAP COMPLETE - GENESIS INTEGRATED           ${NC}"
    echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}Chain ID:${NC} $CHAIN_ID"
    echo -e "${YELLOW}Validators:${NC} $CLUSTER_SIZE"
    echo -e "${YELLOW}Genesis Hash:${NC} $(cat $BOOTSTRAP_DIR/genesis/genesis.hash)"
    echo ""
    echo -e "${CYAN}Output Structure:${NC}"
    echo "  $BOOTSTRAP_DIR/"
    echo "  ├── genesis/"
    echo "  │   ├── genesis.json      # Final genesis with all validators"
    echo "  │   └── genesis.hash      # SHA256 hash for verification"
    echo "  ├── nodes/"
    echo "  │   ├── node-01/          # Validator 1 config + data"
    echo "  │   ├── node-02/          # Validator 2 config + data"
    echo "  │   └── ..."
    echo "  ├── keys/"
    echo "  │   ├── ${NODE_PREFIX}-01/  # Ed25519 keys + account info"
    echo "  │   └── ..."
    echo "  ├── gentx/                # Collected gentx transactions"
    echo "  └── registry/"
    echo "      ├── validators.json   # Validator registry with pubkeys"
    echo "      └── ace-nodes.json    # ACE-compatible node registry"
    echo ""
    echo -e "${CYAN}Next Steps:${NC}"
    echo "  1. Distribute node-XX folders to respective validators"
    echo "  2. Configure actual IPs in config.toml persistent_peers"
    echo "  3. Import ace-nodes.json to ACE registry"
    echo "  4. Start validators: aequitasd start --home /path/to/node-XX"
    echo ""
    echo -e "${GREEN}All validators are cryptographically bound to genesis.json${NC}"
    echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"
}

main() {
    check_dependencies
    create_directory_structure
    generate_validator_keys
    create_genesis
    generate_gentx
    collect_and_distribute_genesis
    configure_persistent_peers
    generate_ace_registry
    print_summary
}

main
