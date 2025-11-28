#!/bin/bash

################################################################################
# AEQUITAS PROTOCOL - Keplr Chain Registry Automation
#
# Automatically updates and submits Keplr chain registry for Aequitas Zone
# Supports both local development and production sovereign infrastructure
#
# Usage:
#   ./scripts/automate-keplr-registry.sh
#   ./scripts/automate-keplr-registry.sh --submit-pr  # Submit PR to Keplr
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
KEPLR_DIR="$PROJECT_ROOT/keplr-chain-registry"
DOMAIN="${DOMAIN:-aequitasprotocol.zone}"
CHAIN_ID="${CHAIN_ID:-aequitas-1}"
SUBMIT_PR=${1:-""}

echo -e "${CYAN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║        AEQUITAS PROTOCOL - KEPLR REGISTRY AUTOMATION              ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"
echo ""

################################################################################
# CHECK PREREQUISITES
################################################################################

check_prerequisites() {
    echo -e "${BLUE}[1/5] Checking prerequisites...${NC}"
    
    if ! command -v jq &> /dev/null; then
        echo -e "${RED}Error: jq is not installed${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ jq available${NC}"
    
    if ! command -v git &> /dev/null; then
        echo -e "${RED}Error: git is not installed${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ git available${NC}"
    
    echo ""
}

################################################################################
# SETUP KEPLR REGISTRY
################################################################################

setup_keplr_registry() {
    echo -e "${BLUE}[2/5] Setting up Keplr chain registry...${NC}"
    
    if [ ! -d "$KEPLR_DIR" ]; then
        echo -e "${YELLOW}Creating Keplr chain registry directory...${NC}"
        mkdir -p "$KEPLR_DIR/cosmos"
    fi
    
    echo -e "${GREEN}✓ Keplr directory ready: $KEPLR_DIR${NC}"
    echo ""
}

################################################################################
# GENERATE CHAIN CONFIG
################################################################################

generate_chain_config() {
    echo -e "${BLUE}[3/5] Generating Aequitas chain configuration...${NC}"
    
    # Create the chain configuration file
    cat > "$KEPLR_DIR/cosmos/aequitas.json" << EOF
{
  "\$schema": "../chain.schema.json",
  "chainId": "$CHAIN_ID",
  "chainName": "Aequitas Zone",
  "chainSymbolImageUrl": "https://app.$DOMAIN/logo.png",
  "rpc": "https://rpc.$DOMAIN",
  "rest": "https://api.$DOMAIN",
  "nodeProvider": {
    "name": "Aequitas Protocol",
    "email": "validators@$DOMAIN",
    "website": "https://$DOMAIN"
  },
  "bip44": {
    "coinType": 118
  },
  "bech32Config": {
    "bech32PrefixAccAddr": "aequitas",
    "bech32PrefixAccPub": "aequitaspub",
    "bech32PrefixValAddr": "aequitasvaloper",
    "bech32PrefixValPub": "aequitasvaloperpub",
    "bech32PrefixConsAddr": "aequitasvalcons",
    "bech32PrefixConsPub": "aequitasvalconspub"
  },
  "currencies": [
    {
      "coinDenom": "REPAR",
      "coinMinimalDenom": "urepar",
      "coinDecimals": 6,
      "coinGeckoId": "repar",
      "coinImageUrl": "https://app.$DOMAIN/repar-token.png"
    }
  ],
  "feeCurrencies": [
    {
      "coinDenom": "REPAR",
      "coinMinimalDenom": "urepar",
      "coinDecimals": 6,
      "coinGeckoId": "repar",
      "gasPriceStep": {
        "low": 0.01,
        "average": 0.025,
        "high": 0.04
      }
    }
  ],
  "stakeCurrency": {
    "coinDenom": "REPAR",
    "coinMinimalDenom": "urepar",
    "coinDecimals": 6,
    "coinGeckoId": "repar"
  },
  "features": [
    "ibc-transfer",
    "ibc-go",
    "cosmwasm"
  ],
  "walletUrlForStaking": "https://app.$DOMAIN/staking"
}
EOF

    echo -e "${GREEN}✓ Chain configuration generated${NC}"
    
    # Validate JSON
    if jq empty "$KEPLR_DIR/cosmos/aequitas.json" 2>/dev/null; then
        echo -e "${GREEN}✓ JSON validation passed${NC}"
    else
        echo -e "${RED}✗ JSON validation failed${NC}"
        exit 1
    fi
    
    echo ""
}

################################################################################
# GENERATE CHAIN SCHEMA
################################################################################

generate_chain_schema() {
    echo -e "${BLUE}[4/5] Generating chain schema...${NC}"
    
    cat > "$KEPLR_DIR/chain.schema.json" << 'EOF'
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Keplr Chain Info",
  "type": "object",
  "required": ["chainId", "chainName", "rpc", "rest", "bip44", "bech32Config", "currencies", "feeCurrencies", "stakeCurrency"],
  "properties": {
    "chainId": {
      "type": "string",
      "description": "The unique identifier of the chain"
    },
    "chainName": {
      "type": "string",
      "description": "The human readable name of the chain"
    },
    "chainSymbolImageUrl": {
      "type": "string",
      "description": "The URL of the chain symbol image"
    },
    "rpc": {
      "type": "string",
      "description": "The RPC endpoint of the chain"
    },
    "rest": {
      "type": "string",
      "description": "The REST API endpoint of the chain"
    },
    "nodeProvider": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "email": { "type": "string" },
        "website": { "type": "string" }
      }
    },
    "bip44": {
      "type": "object",
      "required": ["coinType"],
      "properties": {
        "coinType": { "type": "integer" }
      }
    },
    "bech32Config": {
      "type": "object",
      "required": ["bech32PrefixAccAddr"],
      "properties": {
        "bech32PrefixAccAddr": { "type": "string" },
        "bech32PrefixAccPub": { "type": "string" },
        "bech32PrefixValAddr": { "type": "string" },
        "bech32PrefixValPub": { "type": "string" },
        "bech32PrefixConsAddr": { "type": "string" },
        "bech32PrefixConsPub": { "type": "string" }
      }
    },
    "currencies": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["coinDenom", "coinMinimalDenom", "coinDecimals"],
        "properties": {
          "coinDenom": { "type": "string" },
          "coinMinimalDenom": { "type": "string" },
          "coinDecimals": { "type": "integer" },
          "coinGeckoId": { "type": "string" },
          "coinImageUrl": { "type": "string" }
        }
      }
    },
    "feeCurrencies": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["coinDenom", "coinMinimalDenom", "coinDecimals"],
        "properties": {
          "coinDenom": { "type": "string" },
          "coinMinimalDenom": { "type": "string" },
          "coinDecimals": { "type": "integer" },
          "gasPriceStep": {
            "type": "object",
            "properties": {
              "low": { "type": "number" },
              "average": { "type": "number" },
              "high": { "type": "number" }
            }
          }
        }
      }
    },
    "stakeCurrency": {
      "type": "object",
      "required": ["coinDenom", "coinMinimalDenom", "coinDecimals"],
      "properties": {
        "coinDenom": { "type": "string" },
        "coinMinimalDenom": { "type": "string" },
        "coinDecimals": { "type": "integer" }
      }
    },
    "features": {
      "type": "array",
      "items": { "type": "string" }
    },
    "walletUrlForStaking": {
      "type": "string"
    }
  }
}
EOF

    echo -e "${GREEN}✓ Chain schema generated${NC}"
    echo ""
}

################################################################################
# SUBMIT PR (OPTIONAL)
################################################################################

submit_pr() {
    echo -e "${BLUE}[5/5] Submitting to Keplr chain registry...${NC}"
    
    if [ "$SUBMIT_PR" != "--submit-pr" ]; then
        echo -e "${YELLOW}Skipping PR submission (use --submit-pr to submit)${NC}"
        echo ""
        return
    fi
    
    # Check if GitHub token is available
    if [ -z "$GITHUB_TOKEN" ]; then
        echo -e "${YELLOW}GITHUB_TOKEN not set. Manual PR submission required.${NC}"
        echo ""
        echo -e "${CYAN}To submit manually:${NC}"
        echo "  1. Fork https://github.com/chainapsis/keplr-chain-registry"
        echo "  2. Copy $KEPLR_DIR/cosmos/aequitas.json to cosmos/aequitas.json"
        echo "  3. Create a pull request"
        echo ""
        return
    fi
    
    echo -e "${YELLOW}PR submission not yet implemented. Coming soon!${NC}"
    echo ""
}

################################################################################
# COMPLETION
################################################################################

show_completion() {
    echo -e "${GREEN}"
    cat << "EOF"
═══════════════════════════════════════════════════════════════════
              KEPLR REGISTRY UPDATE COMPLETE!
═══════════════════════════════════════════════════════════════════
EOF
    echo -e "${NC}"
    
    echo -e "${CYAN}Generated Files:${NC}"
    echo "  - $KEPLR_DIR/cosmos/aequitas.json"
    echo "  - $KEPLR_DIR/chain.schema.json"
    echo ""
    
    echo -e "${CYAN}Chain Configuration:${NC}"
    echo "  Chain ID: $CHAIN_ID"
    echo "  RPC: https://rpc.$DOMAIN"
    echo "  REST: https://api.$DOMAIN"
    echo "  Token: \$REPAR (urepar)"
    echo ""
    
    echo -e "${CYAN}Next Steps:${NC}"
    echo "  1. Review the generated configuration"
    echo "  2. Test with Keplr wallet using 'Add Chain'"
    echo "  3. Submit PR to official Keplr registry:"
    echo "     ./scripts/automate-keplr-registry.sh --submit-pr"
    echo ""
    
    echo -e "${GREEN}Aequitas Zone is now Keplr-compatible! 🚀${NC}"
    echo ""
}

################################################################################
# MAIN EXECUTION
################################################################################

main() {
    check_prerequisites
    setup_keplr_registry
    generate_chain_config
    generate_chain_schema
    submit_pr
    show_completion
}

main "$@"
