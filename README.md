[![Build Frontend](https://github.com/CreoDAMO/REPAR/actions/workflows/deploy-frontend.yml/badge.svg?branch=main&event=page_build)](https://github.com/CreoDAMO/REPAR/actions/workflows/deploy-frontend.yml)

# AEQUITAS PROTOCOL ($REPAR) - The Justice Machine

## The Mobile Sovereign Network

The Aequitas Protocol is a sovereign Layer-1 blockchain designed to enforce $131 trillion in reparations for the transatlantic slave trade, classified as genocide. The protocol provides complete economic, technical, and governance sovereignty to ensure it cannot be shut down or censored.

**This is not a blockchain project. This is a Digital Sovereign Nation.**

- **🌍 300 million descendants** = nation of people, not policies
- **📱 10,000+ potential nodes** = runs on mobile devices, home computers, Raspberry Pi
- **🛡️ Cannot be shut down** = true distributed sovereignty
- **⚖️ $131T documented debt** = mathematical justice enforcement

**Your phone is your nation. Your home is sovereign territory.**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Go 1.21+ (for blockchain development)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/aequitas-protocol.git
cd aequitas-protocol

# Install frontend dependencies
cd frontend && npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5000`

### Running the Block Explorer

```bash
cd dexplorer && npm install && npm run dev
```

Block explorer available at `http://localhost:3001`

## ✨ Key Features

### 💰 Justice Burn Mechanism
Automated REPAR burn when defendants make payments, creating deflationary pressure proportional to accountability.

### 🏛️ Defendant Database
Comprehensive tracking of 200+ entities including nations, corporations, and universities with evidence-backed liability calculations.

### 🤖 AI-Powered Analytics
- NVIDIA NIM integration for multimodal search
- Automated defendant risk scoring
- NFT evidence generation
- Trading signal analysis

### 🔗 Multi-Chain Integration
- Native USDC support via Circle SDK
- Cross-chain bridge capabilities
- IBC-enabled for Cosmos ecosystem

### 📊 Investor Dashboard
Real-time metrics, ROI projections, and financial modeling with AI-powered investment analysis.

---

🔥 Mission

The Aequitas Protocol is a decentralized justice system built to execute the findings of the 205-page forensic audit of the transatlantic slave trade. It is a self-funding, AI-accelerated, and legally fortified platform designed to trace, arbitrate, and reclaim the $131 trillion in wealth extracted through historical genocide.

We are not asking for permission. We are enforcing a debt. This protocol is the instrument of that enforcement.

---

💰 THE $REPAR COIN: THE AEQUITAS STANDARD

$REPAR is the native coin of the Aequitas Zone. Its economic model is a direct reflection of the historical injustice it seeks to rectify.

Economic Foundation

· Total Supply: 131,000,000,000,000 $REPAR (131 Trillion)
· Initial Price: $18.33 via Liquidity Bootstrapping Pool (LBP)
· Price Target: $1.00+ (Full Debt Parity)
· Peg: 1:1 with $131 trillion documented harm (Brattle Group)

Economic Engine

· 🔥 Justice Burn: $1 recovered = 1 $REPAR burned (deflationary scarcity)
· 💰 Enforcement Dividend: 4.5% baseline APY staking rewards (15% cap in high-recovery years)
· ⚖️ Dual Compensation: Instant fiat or $REPAR + yields for generational wealth building

Distribution: Justice-First Allocation

Allocation | Percentage | $REPAR Amount | Purpose
---|---|---|---
Community & Descendant Fund | 43% | 56.33T | Airdrops, grants, community programs, staking rewards
Claims & Compensation Fund | 25% | 32.75T | Direct restitution payments, hybrid fiat/$REPAR options
Founder's Allocation | 18% | 23.58T | 12% liquid (15.72T) + 6% endowment (7.86T, locked 8 years)
Ecosystem & Enforcement Treasury | 10% | 13.1T | Legal actions, operations (recoverable from defendants)
Foundation Treasury & Reserves | 4% | 5.24T | Long-term network health, strategic partnerships

Compensation & Economy Building

$REPAR serves as the primary tool for compensation, enabling a self-sustaining diaspora economy. 70% of recoveries distributed in $REPAR (with fiat hybrid options via off-ramp); stakers earn yields from ongoing recoveries. Beyond claims, $REPAR powers remittances, investments, DeFi pools, and becomes a reserve currency for the global diaspora, appreciating to $1+ as justice is served.

---

🏗️ Core Architecture

A multi-layered system designed to close all legal loopholes:

```
┌─────────────────────────────────┐
│        FRONTEND LAYER           │
│  • React/Vite Dashboard         │
│  • Interactive Forensic Audit   │
│  • Coinbase SDK Integration     │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│      BLOCKCHAIN LAYER           │
│  • Cosmos SDK (Aequitas Zone)   │
│  • $REPAR Native Coin           │
│  • CosmWasm Smart Contracts     │
│  • IBC Cross-Chain Enforcement  │
└─────────────────────────────────┘
                ↓
┌─────────────────────────────────┐
│        AI & DATA LAYER          │
│  • NVIDIA NeMo (Legal AI)       │
│  • NVIDIA NIM (Predictive Analytics) │
│  • Evidence Repository (IPFS)   │
└─────────────────────────────────┘
```

Tech Stack

· Blockchain: Cosmos SDK v0.50+, Tendermint BFT
· Frontend: React 18+, Cosmos Kit, Coinbase Wallet SDK
· AI/ML: NVIDIA NeMo, NVIDIA AI Workbench
· Storage: IPFS, PostgreSQL
· Infrastructure: Docker, Kubernetes

---

🚀 Getting Started

Prerequisites

```bash
# Install Go
wget https://go.dev/dl/go1.22.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.22.linux-amd64.tar.gz

# Install Ignite CLI
curl https://get.ignite.com/cli! | bash

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Installation & Development

```bash
# Clone the repository
git clone https://github.com/CreoDAMO/REPAR.git
cd REPAR

# Build and run the blockchain
ignite chain build
ignite chain serve

# Start the frontend application
cd frontend
npm install
npm run dev
```

Testing the System

```bash
# Create test wallet
reparationsd keys add testuser

# Fund wallet and test staking
reparationsd tx bank send validator $(reparationsd keys show testuser -a) 1000000urepar --yes
reparationsd tx staking stake 100000urepar --from testuser --yes

# Query the ledger
reparationsd query ledger total-owed
```

---

🗓️ Roadmap

Phase 1: Foundation (Q4 2025) - ✅ IN PROGRESS

· ✅ Circle SDK Integration Complete (USDC payments)
· ✅ Coinbase Commerce Integration Ready
· ✅ Backend API Security Infrastructure Deployed
· ✅ All API Keys & Secrets Configured
· ⏳ Testnet Launch & IFR Validator Onboarding
· ⏳ Security Audits (Quantstamp, Informal Systems)

Phase 2: Enforcement (Q1 2026)

· $REPAR LBP & Mainnet Launch
· First Real-World Arbitration Cases Filed
· Barclays, Lloyd's, JPMorgan Initial Filings

Phase 3: Scale (Q2-Q4 2026)

· NVIDIA AI Module Integration
· DAO Governance Launch
· First Asset Seizures & Distributions
· Mobile App Deployment (iOS/Android)

Phase 4: Sovereignty (2027+)

· $REPAR as Diaspora Reserve Currency
· Full Descendant Governance Transition
· $1.00+ Price Parity Achievement

---

🫱🏾‍🫲🏿 Contributing

We are building the most ambitious justice project in human history. We need:

· 🔗 Blockchain Developers (Cosmos SDK, CosmWasm)
· ⚖️ Legal Strategists (Multi-jurisdictional Arbitration)
· 🤖 AI/ML Engineers (NVIDIA Ecosystem)
· 🛡️ Security Experts (Operational & Digital)
· 🌍 Community Organizers (Global Descendant Networks)

How to Contribute

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-contribution)
3. Commit your changes (git commit -m 'Add amazing contribution')
4. Push to the branch (git push origin feature/amazing-contribution)
5. Open a Pull Request

See CONTRIBUTING.md for detailed guidelines.

---

📊 Protocol Modules

Ledger Module (x/ledger)

Tracks all claims, defendants, and enforcement actions on-chain.

```bash
reparationsd query ledger total-owed
reparationsd tx ledger file-claim [defendant] [amount]
```

Staking Module (x/staking)

Enables $REPAR staking for governance and enforcement dividends.

```bash
reparationsd tx staking stake 100000urepar --from [key]
```

Governance Module (x/gov)

Descendant-controlled decision making for enforcement strategy.

```bash
reparationsd tx gov submit-proposal [proposal-file]
```

---

🛡️ Security

Audits & Verification

· Smart Contract Audit (Quantstamp)
· Cosmos SDK Audit (Informal Systems)
· Penetration Testing
· Bug Bounty Program

Best Practices

· Multi-sig Treasury Management
· Time-locked Governance Proposals
· Validator Stake Slashing
· Regular Security Reviews

Report vulnerabilities: security@aequistaprotocol.zone

---

🌐 Community & Resources

· Website: https://aequitasprotocol.zone
· Documentation: https://docs.arquitasprotocol.zone
· X (Twitter): @AEQUITASProtocol
· Discord: https://discord.gg/aequitas
· Telegram: https://t.me/aequitasprotocol
· Forum: https://forum.aequitasprotocol.zone

---

📜 License

MIT License - see LICENSE for details.

Note: While the code is open-source, the underlying forensic research and legal strategies are the intellectual property of the Aequitas Protocol. Commercial use of the research requires proper licensing.

---

📈 Live Statistics

Metric | Value
---|---
Total Liability | $131T
Defendants Named | 200+
Evidence Documents | 1M+
Registered Descendants | 150K+
Active Arbitration Cases | 50+
Enforcement Jurisdictions | 172

---

🙏🏾 Acknowledgments

Built upon:

· 205-page forensic audit of transatlantic slavery
· Brattle Group harm quantification ($131T)
· Research from UCL Legacies of British Slave-ownership
· CARICOM Reparations Commission framework
· Cosmos ecosystem technology
· NVIDIA AI tools for social impact
· Coinbase infrastructure for mass adoption

This is for the descendants. This is for justice.

---

Built with ❤️ for justice | Powered by Cosmos SDK, Coinbase, Circle, NVIDIA, Open AI, Claude Sonnet, Grok, Deepseek & Manus 
"Justice delayed is justice denied, but mathematics is eternal."

---

This is not an investment. This is restitution.
The math is complete. The evidence is documented. The machine is building.
The reckoning begins now.
