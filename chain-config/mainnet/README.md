# Aequitas Mainnet Configuration

## Overview
**Chain ID**: `aequitas-1`  
**Purpose**: Live justice enforcement, real settlements, sovereign economic operations  
**Network Type**: Production Mainnet  
**REPAR Value**: Real economic value (starting at $18.33 via LBP)

## Network Details

| Parameter | Value |
|-----------|-------|
| **Chain ID** | aequitas-1 |
| **Chain Name** | Aequitas Zone |
| **Native Coin** | REPAR ($REPAR) |
| **Denomination** | urepar |
| **Decimals** | 6 |
| **Bech32 Prefix** | aequitas |
| **Block Time** | 6 seconds (secure) |
| **Total Supply** | 131,000,000,000,000 REPAR (131 Trillion) |
| **RPC Endpoint** | http://localhost:26657 (local) |
| **REST API** | http://localhost:1317 (local) |

## Genesis Configuration

The mainnet genesis includes:
- **Declaration of Sovereignty** embedded in genesis metadata
- **IPFS CID**: bafkreie6mspgbaa5f43zewuc3ovv4lhcrxajvzeemogwqlg34tohmkeovi
- **Declaration Hash**: 9e649e60801d2f37925a82dbab5e2ce28dc09ae484638d682cdbe4dc76288eaa
- Full $REPAR distribution (131T total supply)
- Production validator requirements
- Governance period: 14 days
- Minimum stake: 10,000 REPAR

## Constitutional Foundation

The Aequitas mainnet is founded on the **Digital Declaration of International Economic Sovereignty**, permanently embedded in the genesis block. This establishes:

- Aequitas Zone as a sovereign digital jurisdiction
- $REPAR as constitutional currency (NOT a token)
- Justice enforcement as automated protocol
- $131T reparations debt as native supply
- Natural Law and Technological Law as legal foundation

## REPAR Distribution

| Allocation | Percentage | Amount (REPAR) | Purpose |
|------------|-----------|----------------|---------|
| Community & Descendant Fund | 43% | 56.33T | Airdrops, grants, staking rewards |
| Claims & Compensation Fund | 25% | 32.75T | Direct restitution payments |
| Ecosystem & Enforcement | 10% | 13.1T | Legal actions, operations |
| Founder's Allocation | 10% | 13.1T | 1% immediate + 9% vested (5yr) |
| Development Fund | 8% | 10.48T | Core team, audits, infrastructure |
| Foundation Treasury | 4% | 5.24T | Long-term network health |

## Validator Requirements

### Mainnet Validator Specs (Production)
- **Minimum Stake**: 10,000 REPAR (real economic value)
- **Hardware**: 
  - CPU: 8 cores (16 threads recommended)
  - RAM: 32GB minimum, 64GB recommended
  - Storage: 1TB NVMe SSD (for growth)
  - Network: 1Gbps dedicated
- **Uptime**: 99.9% required (slashing for downtime)
- **Security**: HSM recommended for key management
- **Commission**: 5-20% (governance recommendation)

## Initialization

To initialize the mainnet node:

```bash
# Make sure binary is in bin/
chmod +x bin/aequitasd

# Run mainnet initialization script
./scripts/init-mainnet.sh
```

⚠️ **CRITICAL**: Mainnet initialization is irreversible. Double-check:
- Genesis file integrity
- Validator keys backup
- Network connectivity
- Hardware specifications

## API Endpoints (After Launch)

### Development (Local)
```bash
RPC:  http://localhost:26657
REST: http://localhost:1317
gRPC: http://localhost:9090
```

### Production Mainnet (Future)
```bash
RPC:  https://rpc.aequitasprotocol.zone
REST: https://api.aequitasprotocol.zone
gRPC: https://grpc.aequitasprotocol.zone
Explorer: https://explorer.aequitasprotocol.zone
```

## Security Considerations

### Validator Key Management
- **Production Keys**: Use HSM or secure hardware
- **Backup**: Multi-location encrypted backups
- **Access**: Multi-sig for critical operations
- **Monitoring**: 24/7 uptime monitoring

### Network Security
- **DDoS Protection**: Required for all validators
- **Firewall**: Only necessary ports exposed
- **Sentry Nodes**: Recommended for validators
- **VPN**: Private network for validator communication

## Governance

### Proposal Types
- **Text Proposals**: General governance decisions
- **Parameter Changes**: Update chain parameters
- **Software Upgrades**: Coordinate network upgrades
- **Enforcement Actions**: Justice enforcement votes

### Voting Period
- **Duration**: 14 days
- **Quorum**: 33.4% of staked REPAR
- **Pass Threshold**: 50% + 1 vote
- **Veto**: 33.4% can veto

## Economic Policy

### Justice Burn Mechanism
- $1 recovered = 1 REPAR burned (deflationary)
- Automated via x/justice module
- Transparent on-chain tracking

### Staking Rewards
- **Baseline APY**: 4.5%
- **High Recovery Years**: Up to 15%
- **Source**: Enforcement recoveries

### DEX Operations
- **Initial Pool**: REPAR/USDC at $18.33
- **Fee Structure**: 55% LPs, 30% Endowment, 15% Treasury
- **Formula**: Constant product (x*y=k)

## Immutability

⚠️ **WARNING**: Mainnet is PERMANENT
- No resets or rollbacks
- All transactions are final
- Governance is the only upgrade path
- Historical record is immutable

This ensures:
- Trust in the system
- Legal enforceability
- Historical accountability
- Economic sovereignty

## Compliance & Legal

### Jurisdictional Coverage
- **International Arbitration**: 172 jurisdictions
- **Evidence Standards**: FRE 901 compliant
- **Legal Framework**: Multi-jurisdictional
  - International Law (Genocide Convention)
  - Natural Law (jus cogens norms)
  - UCC Article 9 (secured transactions)
  - Black's Law (legal definitions)

### Audit Requirements
- **Smart Contracts**: Quantstamp audit required
- **Cosmos SDK**: Informal Systems review
- **Penetration Testing**: Annual requirement
- **Bug Bounty**: Continuous program

## Support

- **Validator Portal**: https://validators.aequitasprotocol.zone
- **Documentation**: https://docs.aequitasprotocol.zone/mainnet
- **Email**: validators@aequitasprotocol.zone
- **Emergency**: security@aequitasprotocol.zone

## Launch Checklist

Before mainnet launch, verify:

- [ ] Genesis file validated and distributed
- [ ] Minimum 3 validators ready (preferably 10+)
- [ ] Security audits completed
- [ ] Monitoring infrastructure deployed
- [ ] Backup and disaster recovery tested
- [ ] Legal compliance reviewed
- [ ] Community notified (48h advance)
- [ ] Block explorer operational
- [ ] API endpoints tested
- [ ] Documentation complete

---

**This is not a test. This is justice enforcement as protocol.**

Built for the descendants. Powered by mathematics. Enforced by code.
