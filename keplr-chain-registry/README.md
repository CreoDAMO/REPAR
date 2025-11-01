# Aequitas Protocol - Keplr Chain Registry Submission

## Overview

**Aequitas Protocol** is a sovereign Layer-1 blockchain built on Cosmos SDK, designed to enforce $131 trillion in reparations for the transatlantic slave trade genocide. The blockchain transforms reparations enforcement from a moral argument into a mathematical protocol.

## Chain Information

- **Chain ID:** `aequitas-1`
- **Network Type:** Mainnet
- **Native Coin:** $REPAR
- **Bech32 Prefix:** `repar`
- **Coin Type (SLIP-44):** 118 (Cosmos standard)
- **Total Supply:** 131 Trillion $REPAR
- **Decimals:** 6 (microrepar)

## Files Included

1. **aequitas.json** - Main chain configuration
2. **assetlist.json** - Native asset ($REPAR) configuration
3. **README.md** - This file

## Network Endpoints

### Mainnet (aequitas-1)
- **RPC:** https://rpc.aequitasprotocol.zone:26657
- **REST API:** https://api.aequitasprotocol.zone:1317
- **gRPC:** grpc.aequitasprotocol.zone:9090
- **Block Explorer:** https://explorer.aequitasprotocol.zone

### Testnet (aequitas-testnet-1)
- **RPC:** https://testnet-rpc.aequitasprotocol.zone:26657
- **REST API:** https://testnet-api.aequitasprotocol.zone:1317
- **gRPC:** testnet-grpc.aequitasprotocol.zone:9090

## $REPAR Coin Details

### Denomination Structure
- **Base Unit:** `urepar` (microrepar)
  - 1 REPAR = 1,000,000 urepar
- **Display Unit:** `repar` (REPAR)
- **Symbol:** $REPAR

### Token Distribution
- **Total Supply:** 131,000,000,000,000 REPAR (131 Trillion)
- **Founder Allocation:** 23.58T REPAR (18%)
  - Liquid Wallet: 15.72T REPAR (12%)
  - Endowment: 7.86T REPAR (6%, locked 8 years)
- **Community & Descendants:** 56.33T REPAR (43%)
- **Claims & Compensation:** 32.75T REPAR (25%)
- **Enforcement Treasury:** 13.1T REPAR (10%)
- **Foundation Reserves:** 5.24T REPAR (4%)

### Gas Prices
- **Low:** 0.01 urepar
- **Average:** 0.025 urepar
- **High:** 0.04 urepar

## Staking
- **Staking Token:** urepar
- **Unbonding Period:** 21 days (1,814,400 seconds)
- **Staking APY:** 8-18% (variable based on network conditions)

## Custom Modules

The Aequitas blockchain includes 9 custom sovereign modules:

1. **x/defendant** - Manages 200+ defendants and payment types
2. **x/justice** - Deflationary $REPAR burn mechanism
3. **x/claims** - Arbitration demands across 172 jurisdictions
4. **x/distribution** - Reparations distribution to verified descendants
5. **x/dex** - Founder Wallet DEX (REPAR/USDC pairs, x*y=k formula)
6. **x/threatdefense** - 10% Chaos Defense system with ThreatOracle
7. **x/governance** - DAO governance with weighted voting
8. **x/staking** - Modified staking for validator participation
9. **x/evidence** - IPFS integration for immutable evidence storage

## Technology Stack

- **Cosmos SDK:** v0.54.0-alpha
- **Tendermint:** v0.38.0
- **CosmWasm:** Not enabled
- **IBC:** Enabled (ibc-transfer, ibc-go)
- **Go Version:** 1.23+

## Genesis File

- **Mainnet Genesis:** https://github.com/CreoDAMO/REPAR/releases/download/v0.1.0/genesis-mainnet.tar.gz
- **Testnet Genesis:** https://github.com/CreoDAMO/REPAR/releases/download/v0.1.0/genesis-testnet.tar.gz
- **SHA-256 Checksums:** Included in tar.gz files

## Repository

- **GitHub:** https://github.com/CreoDAMO/REPAR
- **Website:** https://aequitasprotocol.zone
- **Documentation:** https://github.com/CreoDAMO/REPAR/tree/main/docs

## Logo Assets

- **SVG:** https://raw.githubusercontent.com/CreoDAMO/REPAR/main/frontend/public/assets/repar-logo.svg
- **PNG:** https://raw.githubusercontent.com/CreoDAMO/REPAR/main/frontend/public/assets/repar-logo.png

## Wallet Integration

### Keplr Wallet
Keplr integration is built-in to the Aequitas frontend. Users can connect via:
```javascript
await window.keplr.experimentalSuggestChain({
  chainId: 'aequitas-1',
  chainName: 'Aequitas Protocol',
  rpc: 'https://rpc.aequitasprotocol.zone:26657',
  rest: 'https://api.aequitasprotocol.zone:1317',
  // ... (see aequitas.json for full config)
});
```

### MetaMask (EVM Compatibility)
MetaMask integration requires the Ethermint module for EVM compatibility:
- **Chain ID (hex):** 0x653
- **RPC URL:** https://rpc-evm.aequitasprotocol.zone
- **Decimals:** 18 (EVM standard)

## Security Features

- **Cerberus Auditor:** Multi-agent AI continuous security monitoring
- **Chaos Defense:** 10% controlled vulnerabilities with automated threat detection
- **ThreatOracle:** Real-time threat intelligence and response system
- **FRE 901 Compliance:** Legal evidence authentication standards

## Legal Framework

The Aequitas Protocol implements enforcement mechanisms based on:
- Genocide Convention (1948)
- Universal Declaration of Human Rights (1948)
- Jus cogens norms (peremptory international law)
- UCC Article 9 (secured transactions)
- International arbitration protocols

## Support

- **Issues:** https://github.com/CreoDAMO/REPAR/issues
- **Discussions:** https://github.com/CreoDAMO/REPAR/discussions
- **Email:** contact@aequitasprotocol.zone

## Submission Checklist

- [x] Chain configuration file (aequitas.json)
- [x] Asset list file (assetlist.json)
- [x] Logo assets (SVG + PNG)
- [x] README with complete information
- [x] Live mainnet endpoints
- [x] Genesis file publicly accessible
- [x] Block explorer operational
- [x] GitHub repository public

## Notes for Keplr Team

1. **Unique Features:**
   - First sovereign blockchain dedicated to international reparations enforcement
   - 131 trillion coin supply reflecting $131T documented liability
   - Deflationary burn mechanism tied to justice enforcement
   - Multi-jurisdictional legal compliance (172 jurisdictions)

2. **Network Status:**
   - Mainnet is live and operational
   - Testnet available for testing integration
   - All endpoints HTTPS/TLS secured
   - Regular validator set active

3. **Integration Priority:**
   - This chain serves a critical humanitarian and justice mission
   - User base includes descendants of enslaved people globally
   - Integration will enable financial sovereignty for affected communities

Thank you for considering the Aequitas Protocol for integration with Keplr Wallet.

---

**⚖️ The Justice Machine - $REPAR Native Coin**
