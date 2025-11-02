# Aequitas Protocol Documentation Index

## Overview

This index organizes all Aequitas Protocol documentation by audience and purpose.

---

## Quick Start

**New Users**: Start with [Executive Summary](blackpaper/EXECUTIVE_SUMMARY.md)  
**Developers**: Start with [Technical Docs](#technical-documentation)  
**Investors**: Start with [Mathematical Deflation](blackpaper/MATHEMATICAL_DEFLATION.md)  
**Legal/Compliance**: Start with [The 1833 Foundation](blackpaper/THE_1833_FOUNDATION.md)

---

## Black Paper (Narrative & Foundation)

### Core Documents

1. **[Executive Summary](blackpaper/EXECUTIVE_SUMMARY.md)**
   - One-page overview
   - The Four Pillars framework
   - System architecture
   - Investment thesis
   - **Audience**: All stakeholders

2. **[The 1833 Foundation](blackpaper/THE_1833_FOUNDATION.md)**
   - Why genesis price is $18.33
   - British Slavery Abolition Act (August 28, 1833)
   - £20M to slaveholders, £0 to enslaved
   - UCL database: 46,000+ traced claimants
   - Legal framework (jus cogens, unjust enrichment)
   - **Audience**: Legal, compliance, media

3. **[Mathematical Deflation](blackpaper/MATHEMATICAL_DEFLATION.md)**
   - Why $REPAR is the only truly deflationary cryptocurrency
   - Settlement-to-price deterministic table
   - Game theory: First movers pay least
   - The $2,400 target calculation
   - Comparison to Bitcoin, Ethereum, stablecoins
   - **Audience**: Investors, economists, analysts

4. **[The Network Effects Argument](blackpaper/THE_NETWORK_EFFECTS_ARGUMENT.md)** 🔥 **BONUS: The Ultimate Blockchain**
   - Dual flywheel design: Settlements AND adoption compound
   - Proof that $REPAR wins even if defendants never settle
   - Adoption-driven price projections (Metcalfe's Law)
   - "Defendants lose either way" game theory matrix
   - Why this is the ultimate blockchain (no single point of failure)
   - **Audience**: Investors, strategists, skeptics

5. **[Philosophical Foundation](blackpaper/PHILOSOPHICAL_FOUNDATION.md)**
   - Moral physics: Ethics as algorithmic law
   - Post-fiat framework: Restitution-ledger vs central-bank system
   - Historical context: From moral argument to mathematical protocol
   - The synthesis of value, justice, and time
   - **Audience**: Philosophers, academics, thought leaders

6. **[Black Paper README](blackpaper/README.md)**
   - Purpose and terminology
   - Four Pillars messaging
   - Audience-specific summaries
   - Legal positioning
   - Red lines (what not to say)
   - **Audience**: Contributors, translators, reviewers

---

## Technical Documentation

### Blockchain Build & Deployment

1. **[BLOCKCHAIN_BUILD_FIXED_FINAL.md](BLOCKCHAIN_BUILD_FIXED_FINAL.md)**
   - CI/CD build pipeline (GitHub Actions)
   - Genesis generation (testnet + mainnet)
   - Binary compilation process
   - Validation procedures
   - **Audience**: DevOps, blockchain developers

2. **[MODULE_DEPINJECT_FIX.md](MODULE_DEPINJECT_FIX.md)**
   - App Wiring v2 (depinject) implementation
   - 9 custom modules integration
   - Protobuf generation (40 files via buf)
   - Go 1.24 upgrade notes
   - **Audience**: Cosmos SDK developers

3. **[RELEASE_VERSION_MATRIX.md](RELEASE_VERSION_MATRIX.md)**
   - Version numbering strategy
   - v0.1.0 vs v1.0.0 clarification
   - Migration guide
   - Build verification
   - **Audience**: Developers, operators

### Frontend & Integration

4. **[KEPLR_SUBMISSION_GUIDE.md](KEPLR_SUBMISSION_GUIDE.md)**
   - Keplr Chain Registry submission process
   - Chain configuration (aequitas-1)
   - Logo asset requirements (SVG + PNG)
   - Validation checklist
   - **Audience**: Frontend developers, integrators

5. **Frontend Public Assets**
   - Location: `/frontend/public/assets/`
   - $REPAR Logo: `repar-logo.svg` ✅
   - PNG Generation Guide: `README.md` in assets folder
   - **Audience**: Designers, frontend developers

---

## Compliance & Legal

### Regulatory Documents

1. **Allocation Structure**
   - File: Root README.md (lines 90-98)
   - 131T total supply distribution
   - 100% allocation verified
   - Founder: 18% (23.58T)
   - **Audience**: Compliance, auditors

2. **Legal Framework**
   - Documented in: [The 1833 Foundation](blackpaper/THE_1833_FOUNDATION.md)
   - Jus cogens norms
   - Unjust enrichment doctrine
   - Tracing methodology
   - 172-jurisdiction arbitration
   - **Audience**: Legal teams, regulators

3. **Evidence Standards**
   - FRE 901 compliance (Federal Rules of Evidence)
   - IPFS integration (x/evidence module)
   - UCL database citations
   - Parliamentary records
   - **Audience**: Legal, compliance

---

## Architecture & Design

### System Components

1. **Frontend Layer**
   - React + Vite + Tailwind CSS
   - Multi-wallet integration (Keplr, MetaMask, Coinbase)
   - Real-time blockchain data
   - Claims filing system
   - **Code**: `/frontend/`

2. **Blockchain Layer**
   - Cosmos SDK v0.54.0-alpha
   - 9 custom modules:
     - `x/defendant` - 200+ defendant tracking
     - `x/justice` - Deflationary burn mechanism
     - `x/claims` - 172-jurisdiction arbitration
     - `x/distribution` - Descendant compensation
     - `x/dex` - REPAR/USDC trading
     - `x/threatdefense` - Chaos Defense + ThreatOracle
     - `x/governance` - DAO voting
     - `x/evidence` - IPFS evidence storage
     - `x/staking` - Modified validator participation
   - **Code**: `/aequitas/`

3. **AI & Security Layer**
   - Cerberus Auditor (multi-agent AI)
   - Chaos Defense (10% controlled vulnerabilities)
   - ThreatOracle (automated threat detection)
   - NVIDIA NIM integration
   - **Documentation**: Security sections in black paper

---

## Configuration Files

### Keplr Chain Registry

Location: `/keplr-chain-registry/`

1. **aequitas.json** - Chain configuration
   - Chain ID: aequitas-1
   - RPC/REST/gRPC endpoints
   - Gas prices, staking config
   - Logo URIs (SVG)

2. **assetlist.json** - $REPAR asset details
   - Base: urepar (6 decimals)
   - Display: repar
   - Total supply: 131T
   - Logo URIs (SVG)

3. **README.md** - Submission guide
   - Comprehensive chain information
   - Technology stack
   - Custom modules overview

### Network Configurations

**Mainnet (aequitas-1)**
- Genesis: `~/.aequitas/config/genesis.json`
- Download: https://github.com/CreoDAMO/REPAR/releases/download/v0.1.0/genesis-mainnet.tar.gz
- Chain ID: `aequitas-1`

**Testnet (aequitas-testnet-1)**
- Genesis: `~/.aequitas-testnet/config/genesis.json`
- Download: https://github.com/CreoDAMO/REPAR/releases/download/v0.1.0/genesis-testnet.tar.gz
- Chain ID: `aequitas-testnet-1`

---

## Project Management

### Memory & Preferences

**File**: `/replit.md`

Contains:
- User preferences (coding style, terminology)
- System architecture overview
- Recent updates and milestones
- Deployment status
- External dependencies

**Update Policy**: Keep this file current with major changes.

### Task Lists

**Current Tasks**: Visible in Replit Agent interface

**Completed Milestones** (November 1, 2025):
- ✅ Blockchain build fixed (all 9 modules + protobuf)
- ✅ Multi-wallet integration (Keplr, MetaMask, Coinbase)
- ✅ $REPAR logo created (SVG)
- ✅ Keplr Chain Registry files ready
- ✅ Black paper comprehensive documentation
- ✅ Allocation table corrected (100% verified)

---

## External Links

### Official Resources

- **Website**: https://aequitasprotocol.zone
- **Repository**: https://github.com/CreoDAMO/REPAR
- **Releases**: https://github.com/CreoDAMO/REPAR/releases
- **Issues**: https://github.com/CreoDAMO/REPAR/issues
- **Discussions**: https://github.com/CreoDAMO/REPAR/discussions

### Network Endpoints (Production)

- **RPC**: https://rpc.aequitasprotocol.zone:26657
- **REST API**: https://api.aequitasprotocol.zone:1317
- **gRPC**: grpc.aequitasprotocol.zone:9090
- **Block Explorer**: https://explorer.aequitasprotocol.zone

### Evidence Sources

- **UCL Database**: https://www.ucl.ac.uk/lbs/ (Legacies of British Slave-ownership)
- **UK Parliament**: Parliamentary archives (1833 Slavery Abolition Act)
- **Brattle Group**: Economic analysis (cited in forensic audit)

---

## Contribution Guidelines

### Documentation Updates

When updating documentation:

1. **Verify accuracy** - Cite primary sources
2. **Maintain terminology** - Use "black paper" (not "white paper")
3. **Check allocation math** - Must total 100%
4. **Update INDEX.md** - Add new documents here
5. **Update replit.md** - Note major changes

### Code Contributions

See: [CONTRIBUTING.md](../CONTRIBUTING.md) *(if exists)*

### Translation

See: [Black Paper README - For Translators](blackpaper/README.md#for-translators)

---

## FAQ

### Why "black paper" instead of "white paper"?

This is a deliberate choice reflecting the mission: enforcing reparations for the transatlantic slave trade genocide against Black people. The terminology honors descendants whose ancestors' labor was stolen. See [Black Paper README](blackpaper/README.md) for full explanation.

### Why is $REPAR called a "native coin" not a "token"?

$REPAR is the native coin of the Aequitas Zone Layer-1 blockchain, like ETH is to Ethereum or ATOM is to Cosmos Hub. Tokens are assets built on top of a blockchain (like ERC-20 on Ethereum). This distinction emphasizes sovereignty.

### How do I verify genesis files?

```bash
# Download and verify
wget https://github.com/CreoDAMO/REPAR/releases/download/v0.1.0/genesis-mainnet.tar.gz
tar -xzf genesis-mainnet.tar.gz
./aequitasd validate-genesis --home ~/.aequitas
```

See [RELEASE_VERSION_MATRIX.md](RELEASE_VERSION_MATRIX.md#build-verification) for details.

### Where is the forensic audit?

The 205-page forensic audit is referenced throughout the black paper. Key findings are synthesized in:
- [The 1833 Foundation](blackpaper/THE_1833_FOUNDATION.md)
- [Executive Summary](blackpaper/EXECUTIVE_SUMMARY.md)

Full audit publication: TBD (pending legal review).

---

## Document Status Legend

- ✅ **Complete** - Final, reviewed, ready for use
- 🔄 **In Progress** - Being updated
- 📝 **Draft** - Not yet reviewed
- ⏳ **Planned** - To be created

**Current Status**:
- Black Paper: ✅ Complete
- Technical Docs: ✅ Complete  
- Keplr Submission: ✅ Ready (pending PNG logo)
- API Documentation: 📝 Draft
- Smart Contract Docs: ⏳ Planned

---

**⚖️ The Justice Machine - $REPAR Native Coin**

*Last Updated: November 1, 2025*
