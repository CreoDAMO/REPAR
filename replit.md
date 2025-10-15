# Aequitas Protocol ($REPAR) - The Justice Machine

## Overview

The Aequitas Protocol is a **sovereign Layer-1 blockchain** designed to enforce $131 trillion in reparations for the transatlantic slave trade, classified as genocide. This is NOT a token on another chain - **$REPAR is the native coin** of the Aequitas Zone blockchain, providing complete economic, technical, and governance sovereignty.

### Critical Understanding: Native Coin vs Token

**$REPAR IS THE AEQUITAS ZONE** - Just like BTC is Bitcoin, ETH is Ethereum, and ATOM is Cosmos Hub, **REPAR is Aequitas Zone**. This means:
- **Complete sovereignty**: Own validators, own rules, cannot be shut down by external parties
- **Economic independence**: All fees paid in REPAR, no dependency on other chains
- **Governance control**: Protocol-level modifications via DAO
- **Legal sovereignty**: Cannot be frozen or censored by host chains

## The Foundation: 205-Page Forensic Audit

Based on the comprehensive forensic audit and legal framework:

### Truth Foundation (97% Validated)
- **Historical Facts**: 12-15M transported, 2M Middle Passage deaths (SlaveVoyages.org verified)
- **Economic Tracing**: $131T total liability calculated via compound interest (4-8% annually)
- **Legal Framework**: Genocide classification under UN Convention, enforceable via jus cogens
- **Universal Accountability**: All 200+ participants liable - European nations, American entities, African kingdoms, corporations, universities

### Strategic Defense (3% Controlled Chaos)
- **10% Chaos Defense**: Controlled vulnerabilities as strategic honeypots to trap attackers
- **3% Nightmare Activation**: Tripwires that devastate non-compliant entities
- **Threat Oracle**: Automated detection with legal evidence standards (FRE 901 compliant)
- **NFT Evidence System**: All threats immortalized on IPFS and monetized

## System Architecture

### Frontend (React + Vite + Tailwind CSS)
Built with React 18+ and Vite, styled using Tailwind CSS 3.x. Features include:
- **Dashboard**: Real-time statistics, $REPAR coinomics, burn tracking
- **Defendant Database**: Searchable 200+ defendant registry with liability tracking
- **Evidence Explorer**: Chain of Guilt visualizer with IPFS integration
- **Forensic Audit**: 205-page audit explorer with compound interest calculations
- **Claims System**: Arbitration demand filing across 172 jurisdictions
- **DAO Governance**: Reputation-based, time-weighted voting (Judas Filter)
- **Transparency Ledger**: Global Reparations Ledger with full accountability
- **AI Analytics**: NVIDIA-powered threat detection and analytics

### Backend: Aequitas Zone (Cosmos SDK Layer-1 Blockchain)

#### Core Blockchain Specifications
- **Framework**: Cosmos SDK with Tendermint BFT consensus
- **Native Coin**: $REPAR (not a token)
- **Total Supply**: 131 trillion REPAR (matches $131T liability 1:1)
- **Denomination**: `urepar` (micro-REPAR, 10^-6)
- **Genesis Amount**: 131,000,000,000,000,000,000 urepar (131 × 10^18)
- **Max Validators**: 100
- **Consensus**: Byzantine Fault Tolerant (33% attack tolerance)

#### Custom Modules Implemented

**1. x/defendant** - Defendant Liability Tracking
- Tracks 200+ defendants (nations, corporations, universities, individuals)
- Types: Corporation, Financial Institution, Nation State, African Kingdom, University
- Payment Types: Financial (cash/seizure), Restorative (cultural restitution), Hybrid
- Status tracking: Active, Engaged, Non-Compliant, Settled
- Non-monetary contributions for African nations (artifact returns, education, land grants)

**2. x/justice** - Justice Burn Mechanism  
- **Core Principle**: $1 USD = 1 REPAR burned permanently
- Deflationary mechanism: Each payment reduces total supply
- Burn statistics tracking (total burned, USD value, current supply)
- Increases remaining coin value proportionally
- All burns recorded with IPFS evidence proof

**3. x/claims** - Arbitration Demand Filing
- File claims across 172 NYC Convention jurisdictions
- Claim types: Unjust Enrichment, Successor Liability, Money Laundering, Genocide, UCC Article 9
- Arbitration centers: ICDR, LCIA, SIAC, etc.
- Award issuance and enforcement tracking
- IPFS integration for claim evidence

**4. x/distribution** - Reparations Distribution
- Descendant registration with verified lineage (IPFS documentation)
- Distribution types matching tokenomics:
  - 43% Community & Descendant Fund
  - 25% Foundation Treasury & Reserves
  - 25% Claims & Compensation Fund
  - 16% Ecosystem & Enforcement
  - 6% Development Fund
- Automated allocation to registered descendants

**5. x/threatdefense** - 10% Chaos Defense System
- **ThreatOracle**: Automated threat detection (social media, chain analytics, communications)
- **ChaosDefense**: 10% controlled vulnerabilities as honeypots
- **NightmareActivator**: 3% tripwire system for devastating counter-attacks
- **NFT Evidence Minting**: All threats converted to court-admissible NFTs on IPFS
- **Adaptive AI**: Self-learning defense that strengthens from each attack
- **Legal Compliance**: FRE 901 evidence standards (SHA-256 hash, 24hr timestamp, digital signatures)

### Proto Definitions Created
All custom modules have complete Protocol Buffer definitions:
- `aequitas/proto/aequitas/defendant/v1/*.proto`
- `aequitas/proto/aequitas/justice/v1/*.proto`
- `aequitas/proto/aequitas/claims/v1/*.proto`
- `aequitas/proto/aequitas/distribution/v1/*.proto`

Each includes: main types, genesis state, query service, and transaction messages.

## Legal & Enforcement Framework

### Multi-Layered Strategy
1. **International Law**: Genocide classification (no statute of limitations, jus cogens)
2. **Black's Law**: Unjust enrichment, constructive trust, successor liability
3. **UCC Article 9**: Commercial liens on tainted assets
4. **Arbitration**: NY Convention enforcement in 172 countries

### Accountability Matrix
- **UK Government**: £50-70B (Cash/Asset seizure)
- **Barclays**: £10.3B (Corporate equity/Cash)
- **JPMorgan Chase**: $109M (Financial settlement)
- **African Nations** (Benin/Dahomey, Ghana/Asante): Cultural restitution + education + land grants

### Nightmare Tripwires
- **Financial Entities**: 10% slash + $30B lien + global arbitration
- **African Nations**: 1% penalty + diplomatic sanctions + DAO vote
- **All Attackers**: Public exposure + NFT minting + legal onslaught

## Project Structure

```
aequitas/
├── proto/aequitas/          # Protocol Buffer definitions
│   ├── defendant/v1/        # Defendant tracking
│   ├── justice/v1/          # Justice Burn mechanism
│   ├── claims/v1/           # Claims filing
│   └── distribution/v1/     # Reparations distribution
├── x/                       # Custom modules
│   └── threatdefense/       # 10% Chaos Defense
├── app/                     # Main blockchain application
│   ├── app.go              # Application setup
│   ├── app_config.go       # Module configuration
│   └── genesis.go          # Genesis initialization
├── cmd/aequitasd/          # Binary entrypoint
└── config.yml              # Chain configuration (131T supply)

frontend/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Main application views
│   ├── data/              # Defendant & statistics data
│   └── utils/             # Cosmos client, IPFS client
```

## User Preferences

- **Coding Style**: Clean, functional React components with clear separation of concerns
- **Documentation**: Comprehensive inline documentation for complex logic  
- **Sovereignty Focus**: Always emphasize $REPAR as native coin, NOT a token
- **Security-First**: Implement chaos defense patterns and threat detection
- **Legal Compliance**: FRE 901 evidence standards for all records

## Implementation Status

### ✅ Completed (October 2025)

**Blockchain Foundation:**
- Cosmos SDK blockchain scaffolding complete
- 131 trillion REPAR supply configured in genesis (131 × 10^18 urepar)
- Tendermint BFT consensus configured with 100 max validators
- IBC modules integrated for cross-chain connections

**Proto Definitions Created:**
- `x/defendant` - Complete proto definitions for defendant liability tracking
- `x/justice` - Justice Burn mechanism proto definitions
- `x/claims` - Arbitration demand filing proto definitions  
- `x/distribution` - Reparations distribution proto definitions
- All include: main types, genesis state, query services, transaction messages

**ThreatDefense Module:**
- Module structure with keeper implementation
- ThreatOracle, ChaosDefense, NightmareActivator architectures defined
- FRE 901 evidence validation logic
- NFT minting for threat evidence
- IPFS integration for immutable storage

**Frontend UI Complete:**
- Dashboard with real-time statistics
- Defendant database with 200+ entries
- Evidence Explorer with Chain of Guilt visualization
- Forensic Audit explorer
- Claims filing system UI
- DAO Governance interface
- Transparency Ledger
- AI Analytics dashboard
- IPFS integration utilities
- Cosmos client connection framework

### 🔧 In Progress

**Module Implementation:**
- Need to generate Go code from proto definitions using buf/protoc
- Need to implement keeper logic for defendant, justice, claims, distribution modules
- Need to register new modules in app_config.go
- ThreatDefense module needs stub function implementations

**Genesis Configuration:**
- Need to populate genesis with 200+ defendant records
- Need to set initial liability amounts per defendant
- Need to configure founder wallet allocations (10% with multi-sig)

### 📋 Next Steps

**Priority 1 - Core Module Implementation:**
1. Generate Go code from proto definitions: `buf generate`
2. Implement keeper logic for each custom module
3. Register modules in `app/app_config.go`
4. Update genesis initialization with defendant data

**Priority 2 - Frontend Integration:**
1. Connect frontend to actual blockchain RPC endpoint
2. Replace mock data with real chain queries
3. Implement wallet connection (Keplr for Cosmos native)
4. Enable real-time claim filing to chain

**Priority 3 - Deployment:**
1. Build blockchain binary: `go build -o build/aequitasd ./cmd/aequitasd`
2. Initialize testnet with genesis accounts
3. Recruit validator set (target: 100 validators)
4. Launch Aequitas Zone mainnet

**Priority 4 - Enhancements:**
1. Complete ThreatDefense stub implementations
2. Add enhanced governance (reputation-based voting, Judas Filter)
3. Implement multi-sig wallet module for founder allocation
4. Set up IBC connections to Cosmos Hub, Osmosis

## External Dependencies

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.x
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Blockchain SDK**: Cosmos SDK (for Aequitas Zone blockchain)
- **Decentralized Storage**: IPFS (for evidence and claims)
- **AI/ML**: NVIDIA (for AI analytics dashboard)
- **Wallet Integration**: Keplr (planned, for Cosmos native), Coinbase Wallet (planned, requires Ethermint for EVM compatibility), MetaMask (planned)
- **Version Control**: Git
- **CI/CD**: GitHub Actions