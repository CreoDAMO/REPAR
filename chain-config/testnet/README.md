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
| **Native Coin** | REPAR (test) |
| **Denomination** | urepar |
| **Decimals** | 6 |
| **Bech32 Prefix** | aequitas |
| **Block Time** | 3 seconds (faster for testing) |
| **RPC Endpoint** | http://localhost:26657 (local) |
| **REST API** | http://localhost:1317 (local) |

## Genesis Configuration

The testnet genesis will be generated with:
- Lower staking minimums (100 REPAR) for easy validator onboarding
- Faster block times (3s) for rapid testing
- Faucet allocation for free test REPAR distribution
- Shorter governance voting periods (2 days)
- Declaration of Sovereignty (testnet version)

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
1. Initialize the node with testnet chain ID
2. Create validator keys
3. Generate testnet genesis with lower requirements
4. Configure testnet parameters
5. Start the testnet node

## Faucet Access

Test REPAR tokens can be obtained from the faucet:
- **Faucet URL**: TBD (after testnet launch)
- **Amount**: 1000 REPAR per request
- **Cooldown**: 24 hours

## Validator Requirements

### Testnet Validator Specs (Low Barrier)
- **Minimum Stake**: 100 REPAR (test tokens)
- **Hardware**: 2 CPU, 4GB RAM, 50GB SSD
- **Uptime**: No strict requirements (testing)
- **Commission**: Any rate (for testing governance)

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
