# 🏗️ System Architecture

## Overview

The Aequitas Protocol is a comprehensive multi-layer system designed for sovereignty, resilience, and justice enforcement.

---

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACES                          │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  Mobile App  │ Web Frontend │ Block        │  API Clients   │
│  (Expo)      │ (React/Vite) │ Explorer     │  (REST/gRPC)   │
└──────┬───────┴──────┬───────┴──────┬───────┴────────┬───────┘
       │              │              │                │
       └──────────────┴──────────────┴────────────────┘
                           │
       ┌───────────────────┴────────────────────┐
       │          BACKEND SERVICES               │
       ├─────────────────┬──────────────────────┤
       │  Circle API     │  IPFS Storage        │
       │  (USDC)         │  (Evidence/Data)     │
       └────────┬────────┴──────────┬───────────┘
                │                   │
       ┌────────┴───────────────────┴───────────┐
       │       AEQUITAS BLOCKCHAIN               │
       │     (Cosmos SDK Layer-1)                │
       ├──────────────────────────────────────┬──┤
       │  12 Custom Modules │ Tendermint BFT  │  │
       │  - defendant       │ Consensus        │  │
       │  - justice         │                  │  │
       │  - claims          │  $REPAR Native   │  │
       │  - distribution    │  Coin (131T)     │  │
       │  - dex             │                  │  │
       │  - threatdefense   │  11,000+ Nodes   │  │
       │  - agentkit        │  Multi-Cloud     │  │
       │  - endowment       │  + Home + Mobile │  │
       │  - + 4 more        │                  │  │
       └────────────────────┴──────────────────┴──┘
                           │
       ┌───────────────────┴────────────────────┐
       │     DISTRIBUTED INFRASTRUCTURE          │
       ├─────────────┬────────────┬─────────────┤
       │ Cloud Nodes │ Home Nodes │ Mobile Light│
       │ (8-12)      │ (1,000+)   │ Nodes       │
       │             │            │ (10,000+)   │
       │ DigitalOcean│ Raspberry  │ iOS/Android │
       │ AWS/Vultr   │ Pi 4/5     │ Smartphones │
       └─────────────┴────────────┴─────────────┘
```

---

## 🧱 Component Breakdown

### 1. **User Interfaces Layer**

#### Mobile App (Expo/React Native)
- **Platform:** iOS & Android
- **Framework:** Expo 52, React Native
- **Features:**
  - BIP39 HD wallet with biometric auth
  - Tendermint light client validator
  - DAO governance voting
  - Claims filing with camera
  - QR payment scanning
  - Background sync (15-min intervals)
- **Battery:** <5% per day
- **Data:** <500MB per month
- **Status:** Production-ready, TestFlight pending

#### Web Frontend (React/Vite)
- **Framework:** React 19, Vite 7, Tailwind CSS 3
- **Pages:** 29 feature pages
- **Wallet Integration:**
  - Keplr (recommended for full features)
  - MetaMask (EVM compatibility)
  - Coinbase Wallet
- **Features:**
  - Real-time dashboard
  - Defendant database
  - Evidence explorer
  - Claims filing
  - DAO governance
  - DEX trading
  - AI analytics
  - Forensic audit viewer
- **Deployment:** Cloudflare, port 5000
- **Status:** Production-deployed

#### Block Explorer (Dexplorer)
- **Framework:** Next.js
- **Port:** 3001
- **Features:**
  - Real-time block data
  - Transaction search
  - Address lookup
  - Validator stats
  - Network metrics

---

### 2. **Backend Services Layer**

#### Circle API Backend (Node.js)
- **Framework:** Express.js
- **Port:** 3002
- **Purpose:** USDC payment processing
- **SDK:** @circle-fin/usdckit
- **Features:**
  - Payment gateway
  - Settlement processing
  - Fiat on/off ramps

#### IPFS Storage
- **SDK:** ipfs-http-client
- **Purpose:**
  - Evidence storage (claims)
  - Document archival
  - Distributed data
- **Standards:** FRE 901 compliant

---

### 3. **Blockchain Layer (Aequitas Zone)**

#### Core Specifications
- **Framework:** Cosmos SDK v0.50.x
- **Consensus:** Tendermint BFT
- **Native Coin:** $REPAR (NOT a token)
- **Total Supply:** 131 trillion REPAR
- **Block Time:** ~6 seconds
- **Finality:** Instant (BFT consensus)

#### Custom Modules (12 Total)

| Module | Purpose | Key Features |
|--------|---------|-------------|
| **x/defendant** | Defendant tracking | 200+ entities, payment obligations, compliance |
| **x/justice** | Burn mechanism | Deflationary $REPAR burn, justice economics |
| **x/claims** | Arbitration demands | IPFS evidence, 172 jurisdictions, FRE 901 |
| **x/distribution** | Reparations payment | Verified descendant distribution, DNA verification |
| **x/dex** | Founder Wallet DEX | REPAR/USDC pairs, constant product (x*y=k) |
| **x/threatdefense** | Chaos Defense | ThreatOracle, controlled vulnerabilities, NFT minting |
| **x/agentkit** | AI agent toolkit | Autonomous agents, multi-agent systems |
| **x/endowment** | Foundation endowment | Long-term sustainability fund |
| **x/founderendowment** | Founder endowment | 8-year locked allocation (7.86T REPAR) |
| **x/infrastructure** | Infrastructure funding | Node subsidies, development grants |
| **x/nftmarketplace** | NFT marketplace | Evidence NFTs, Guardian badges |
| **x/validatorsubsidy** | Validator rewards | Home/mobile node incentives |

**See [Blockchain Modules](./Blockchain-Modules.md) for detailed documentation.**

---

### 4. **Infrastructure Layer**

#### Tier 0: Mobile Light Nodes (10,000+ target)
- **Hardware:** Android/iOS smartphones
- **Requirements:**
  - 4GB RAM minimum
  - 10GB storage
  - WiFi or mobile data
- **Battery:** <5% per day (measured 4.2%)
- **Data:** <500MB per month
- **Activation:** One-tap via mobile app
- **Rewards:** Bronze Guardian NFT
- **Status:** Implemented, ready to scale

#### Tier 1: Home/Raspberry Pi Validators (1,000+ target)
- **Hardware:**
  - Raspberry Pi 4/5 ($150 complete kit)
  - Home computers (Linux/macOS/Windows)
- **Requirements:**
  - 4GB RAM minimum
  - 100GB SSD storage
  - 24/7 operation
- **Cost:** $5-10/month electricity
- **Rewards:** Validator rewards + Silver Guardian NFT
- **Status:** Setup scripts ready

#### Tier 2: Cloud Core Validators (8-12 nodes)
- **Providers:**
  - DigitalOcean (primary)
  - Vultr, Linode
  - AWS (backup)
- **Specs:**
  - 8GB RAM
  - 200GB SSD
  - 99%+ uptime
- **Cost:** $28-40/month per node
- **Purpose:** Core infrastructure backbone
- **Status:** Deployment scripts ready

**Total Network: 11,000+ nodes achievable Year 1**

---

## 🔄 Data Flow

### Transaction Lifecycle

```
1. User initiates transaction
   ├─ Mobile App (biometric auth)
   ├─ Web Frontend (wallet signature)
   └─ API Client (programmatic)
        ↓
2. Transaction broadcast to blockchain
   ├─ Tendermint P2P network
   ├─ Mempool validation
   └─ Gas fee check
        ↓
3. Consensus & Block Production
   ├─ Validators propose blocks
   ├─ 2/3+ vote for commit
   └─ Instant finality (BFT)
        ↓
4. State Update
   ├─ Module-specific logic
   ├─ Balance updates
   └─ Event emissions
        ↓
5. Confirmation
   ├─ Block explorer update
   ├─ Mobile app notification
   └─ Web UI refresh
```

### Claims Filing Flow

```
1. Evidence Collection
   ├─ Camera capture (mobile app)
   ├─ Document upload (web)
   └─ Witness statements
        ↓
2. IPFS Upload
   ├─ Encrypted storage
   ├─ Content hash generation
   └─ FRE 901 metadata
        ↓
3. On-Chain Filing
   ├─ MsgFileClaim transaction
   ├─ Jurisdiction selection (172 options)
   └─ Defendant selection (200+ entities)
        ↓
4. DAO Review
   ├─ Community voting
   ├─ Legal expert validation
   └─ Approval/rejection
        ↓
5. Enforcement
   ├─ International arbitration
   ├─ Settlement tracking
   └─ Distribution to descendants
```

---

## 🔐 Security Architecture

### Multi-Layer Security

1. **Cryptography:**
   - Ed25519 signatures
   - SHA-256 hashing
   - BIP39 mnemonics
   - Tendermint BFT consensus

2. **Access Control:**
   - Biometric authentication (mobile)
   - Hardware wallet support
   - Multi-signature governance
   - Role-based permissions

3. **Network Security:**
   - DDoS protection (Cloudflare)
   - Rate limiting (API Gateway)
   - TLS/SSL encryption
   - Firewall rules

4. **Data Protection:**
   - Encrypted IPFS storage
   - Zero-knowledge proofs (planned)
   - GDPR/CCPA compliance
   - Privacy by design

5. **Smart Contract Security:**
   - AGPL-3.0 copyleft (prevents adversarial forks)
   - Formal verification (planned)
   - Multi-agent auditing (Cerberus system)
   - Bug bounty program

---

## 📈 Scalability

### Current Capacity
- **TPS:** ~1,000 transactions per second (Tendermint)
- **Block Time:** 6 seconds
- **Nodes:** 11,000+ possible (Year 1)
- **Descendants:** 300 million (target)

### Scaling Strategy
- **Horizontal:** Add more validators
- **Vertical:** Optimize module code
- **IBC:** Cosmos Inter-Blockchain Communication (cross-chain)
- **Sharding:** Planned for Phase 4 (2027+)

---

## 🌐 Network Topology

### Decentralization Metrics

| Metric | Value | Benchmark |
|--------|-------|-----------|
| **Nodes (Year 1)** | 11,000+ | Bitcoin: 15,000, Ethereum: 7,000 |
| **Geographic Distribution** | 100+ countries | Best-in-class |
| **Nakamoto Coefficient** | 1,000+ (home validators) | Highly decentralized |
| **Cloud Dependency** | <1% (12/11,000 nodes) | Industry-leading |
| **Shutdown Resistance** | Virtually impossible | Cannot censor 11,000 nodes |

---

## 🔗 Integration Points

### External Integrations
- **Circle API:** USDC payments
- **IPFS:** Distributed storage
- **Keplr Wallet:** Primary wallet
- **MetaMask:** EVM compatibility
- **Coinbase Wallet:** Mainstream adoption
- **Cloudflare:** DNS, DDoS protection
- **DigitalOcean:** Cloud infrastructure
- **GitHub Actions:** CI/CD automation

### Internal Integrations
- **Mobile ↔ Blockchain:** Tendermint RPC
- **Frontend ↔ Blockchain:** CosmJS SDK
- **Backend ↔ Circle:** USDCKit SDK
- **Evidence ↔ IPFS:** ipfs-http-client

---

## 📊 Technology Stack

### Frontend
- **Framework:** React 19, Vite 7
- **Styling:** Tailwind CSS 3
- **Charts:** Recharts
- **Icons:** Lucide React, Cryptocons
- **Wallet:** CosmJS, @coinbase/wallet-sdk

### Mobile
- **Framework:** Expo 52, React Native
- **State:** MobX
- **Storage:** Expo SecureStore
- **Biometrics:** expo-local-authentication
- **Camera:** expo-camera

### Backend
- **Language:** Node.js 20
- **Framework:** Express.js
- **Payments:** Circle USDCKit
- **Storage:** IPFS

### Blockchain
- **Framework:** Cosmos SDK v0.50.x
- **Language:** Go 1.23+
- **Consensus:** Tendermint BFT
- **Build:** Buf, Protobuf

### Infrastructure
- **Cloud:** DigitalOcean, AWS, Vultr
- **CDN:** Cloudflare
- **DNS:** Cloudflare DNS
- **CI/CD:** GitHub Actions
- **Monitoring:** Prometheus, Grafana (planned)

---

## 🎯 Design Principles

1. **Sovereignty First:** Cannot be shut down or censored
2. **Descendant-Centric:** Unlimited rights for 300M descendants
3. **Open Source:** MIT + AGPL-3.0 licenses
4. **Privacy by Design:** GDPR/CCPA compliant
5. **Mobile-First:** Accessible via smartphone
6. **Resilience:** 11,000+ nodes, multi-cloud
7. **Justice-Driven:** $131T enforcement focus
8. **Reunification:** Counter Willie Lynch divisions

---

**Last Updated:** November 04, 2025
**Version:** 1.0  
**Next:** [Blockchain Modules](./Blockchain-Modules.md) | [Frontend Components](./Frontend-Components.md)
