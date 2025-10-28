# Aequitas Testnet Configuration

## Overview
**Chain ID**: `aequitas-testnet-1`  
**Purpose**: Legal institution testing, smart contract development, regulatory sandbox  
**Network Type**: Public Testnet  
**REPAR Value**: Test tokens (no real economic value)

## Network Details

| Parameter | Value |
|-----------|-------|
| **Chain ID** | aequitas-testnet-1 |
| **Chain Name** | Aequitas Testnet |
| **Native Coin** | REPAR (test tokens - no real value) |
| **Denomination** | urepar |
| **Decimals** | 6 |
| **Bech32 Prefix** | aequitas |
| **Block Time** | 6 seconds (currently mirrors mainnet) |
| **RPC Endpoint** | http://localhost:26657 (local) |
| **REST API** | http://localhost:1317 (local) |

**Note**: Currently uses mainnet parameters. Customization for testing (faster blocks, lower stakes) can be configured in `genesis-testnet.json`.

## Genesis Configuration

The testnet genesis currently uses mainnet parameters with testnet chain ID.

**Current Configuration:**
- Same parameters as mainnet (for accurate testing)
- Testnet chain ID: `aequitas-testnet-1`
- Declaration of Sovereignty included (testnet version)

**Future Customization Options:**
- Lower staking minimums (100 REPAR) for easy validator onboarding
- Faster block times (3s) for rapid testing
- Faucet allocation for free test REPAR distribution
- Shorter governance voting periods (2 days)

To customize testnet parameters, edit `chain-config/testnet/genesis-testnet.json` before initialization.

## Target Users

### Legal Institutions
- **CARICOM Reparations Commission**: Test enforcement mechanisms
- **International Courts**: Experiment with blockchain evidence
- **Law Firms**: Develop smart contract templates
- **Regulators**: Compliance testing sandbox

### Developers
- SDK and API testing
- Smart contract development
- Frontend integration testing
- Performance benchmarking

## Initialization

To initialize the testnet node:

```bash
# Make sure binary is in bin/
chmod +x bin/aequitasd

# Run testnet initialization script
./scripts/init-testnet.sh
```

This will:
1. Initialize the node with testnet chain ID (`aequitas-testnet-1`)
2. Install the testnet genesis file (currently uses mainnet parameters)
3. Optionally create validator keys
4. Prepare node for testnet operation

**Note**: The genesis currently mirrors mainnet parameters for accurate testing. To customize testnet-specific parameters (lower staking minimums, faster blocks, etc.), edit `chain-config/testnet/genesis-testnet.json` before running the init script.

## Faucet Access

Test REPAR tokens can be obtained from the faucet:
- **Faucet URL**: TBD (after testnet launch)
- **Amount**: 1000 REPAR per request
- **Cooldown**: 24 hours

## Validator Requirements

### Testnet Validator Specs
**Current Configuration** (mirrors mainnet for accurate testing):
- **Minimum Stake**: Same as mainnet (currently)
- **Hardware**: 4-8 CPU, 16-32GB RAM, 500GB SSD
- **Uptime**: Recommended for realistic testing
- **Commission**: Any rate (for testing governance)

**Future Customization** (can be configured in genesis):
- Lower minimum stake (e.g., 100 REPAR test tokens)
- Relaxed hardware requirements (2 CPU, 4GB RAM, 50GB SSD)
- No strict uptime requirements

## API Endpoints (After Launch)

### Development (Local)
```bash
RPC:  http://localhost:26657
REST: http://localhost:1317
gRPC: http://localhost:9090
```

### Production Testnet (Future)
```bash
RPC:  https://testnet-rpc.aequitasprotocol.zone
REST: https://testnet-api.aequitasprotocol.zone
gRPC: https://testnet-grpc.aequitasprotocol.zone
```

## Smart Contract Development

Testnet is ideal for:
- Testing justice enforcement smart contracts
- Legal evidence storage mechanisms
- Automated settlement contracts
- DAO governance proposals
- DEX trading simulations

## Reset Policy

⚠️ **Testnet can be reset** without notice to:
- Fix critical bugs
- Upgrade chain parameters
- Test new features
- Improve performance

Do NOT rely on testnet for permanent storage.

## Support

- **Documentation**: https://docs.aequitasprotocol.zone/testnet
- **Discord**: https://discord.gg/aequitas (testnet-support channel)
- **Issues**: https://github.com/CreoDAMO/REPAR/issues
