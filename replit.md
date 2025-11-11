# Aequitas Protocol ($REPAR) - The Justice Machine

## Overview

The Aequitas Protocol is a sovereign Layer-1 blockchain ($REPAR is the native coin) designed to enforce $131 trillion in reparations for the transatlantic slave trade. Its core purpose is to provide complete economic, technical, and governance sovereignty, ensuring resilience against shutdown or censorship. The protocol is founded on a 205-page forensic audit, establishing historical facts, tracing economic liabilities, and outlining a legal framework based on international law. It aims for universal accountability across over 200 entities and integrates a strategic defense system. The project seeks to transform reparations enforcement into a mathematical protocol, establishing a sovereign digital jurisdiction under Natural Law and Technological Law, envisioning a digital sovereign nation for 300 million people.

## User Preferences

- **Coding Style**: Clean, functional React components with clear separation of concerns
- **Documentation**: Comprehensive inline documentation for complex logic
- **Sovereignty Focus**: Always emphasize $REPAR as native coin, NOT a token
- **Security-First**: Implement chaos defense patterns and threat detection
- **Legal Compliance**: FRE 901 evidence standards for all records
- **Multi-Wallet Support**: Keplr (recommended for full features), MetaMask (EVM), Coinbase Wallet
- **Terminology**: Use "black paper" (NOT "white paper") for project documentation - intentional choice reflecting project's mission
- **Digital Sovereign Nation**: This is a nation of 300M people (12-15M enslaved + descendants), not a corporate project. Nations are defined by people, not policies. Counter Willie Lynch divide-and-conquer tactics through unified blockchain infrastructure.

## System Architecture

The Aequitas Protocol utilizes a React, Vite, and Tailwind CSS frontend and a backend powered by Aequitas Zone, a Cosmos SDK Layer-1 blockchain.

### Infrastructure: The Mobile Sovereign Network

The network employs a distributed node architecture using Tendermint BFT, enabling nodes to run on various device types:
- **Tier 0: Mobile Light Nodes**: On smartphones (Android/iOS) with minimal resource consumption, supporting governance voting.
- **Tier 1: Home/Raspberry Pi Validators**: On home computers and Raspberry Pis for 24/7 operation, offering validator rewards and enhanced governance.
- **Tier 2: Cloud Core Validators**: Distributed across multiple cloud providers (DigitalOcean, Vultr, Linode, AWS) for high uptime and as the core infrastructure backbone.
This multi-tiered approach targets over 11,000 nodes in Year 1, significantly enhancing resilience and community ownership.

### Genesis & Deployment

- **CI-Driven Genesis Generation**: Automated system via GitHub Actions for deterministic testnet and mainnet genesis files.
- **Allocation Structure**: Canonical JSON specification for $REPAR coin distribution (131T total).
- **Blockchain Build Pipeline**: GitHub Actions workflow for binary build, genesis generation, validation, and artifact upload.
- **Scripts**: Python allocation generator and shell validation scripts ensure reproducible genesis creation.

### UI/UX Decisions

The frontend provides a comprehensive interface:
- **Dashboards**: For real-time statistics, investor analytics, and founder insights.
- **Data Explorers**: Defendant database, evidence explorer (IPFS integration), and forensic audit explorer.
- **Transactional Systems**: Claims filing, DAO governance, transparency ledger, and Founder Wallet DEX.
- **AI Analytics**: NVIDIA-powered multimodal search, trading signals, and NFT generation.
- **Verification**: Deployment verification system and a Block Explorer (Dexplorer).

### Technical Implementations

- **Frontend**: React, Vite, Tailwind CSS.
- **Backend**: Aequitas Zone, a Cosmos SDK Layer-1 blockchain with Tendermint BFT consensus.
  - **Native Coin**: $REPAR, with a total supply of 131 trillion.
  - **Core Modules**:
    - `x/defendant`: Manages defendants and payment types.
    - `x/justice`: Implements a deflationary $REPAR burn mechanism.
    - `x/claims`: Handles arbitration demand filing across 172 jurisdictions, with IPFS integration for evidence.
    - `x/distribution`: Manages reparations distribution to verified descendants.
    - `x/dex`: Founder Wallet DEX for $REPAR native coin swaps (REPAR/USDC) with a constant product formula and specific fee distribution.
    - `x/threatdefense`: A 10% Chaos Defense system with a ThreatOracle, controlled vulnerabilities, and NFT evidence minting.

### System Design Choices

- **Legal & Enforcement Framework**: Multi-layered strategy combining international law (Genocide, jus cogens), Black's Law, UCC Article 9, and international arbitration.
- **Security**: The Cerberus Auditor System, a multi-agent AI, continuously audits for vulnerabilities and generates patches.
- **AI Integration**: Extensive use of NVIDIA NIM models (Stable Diffusion XL, Llama 3.1 8B, CLIP) for search, risk scoring, investment recommendations, and NFT generation.
- **Deployment Verification**: A pre-production system to ensure operational services before deployment.
- **Constitutional Foundation**: The Digital Declaration of International Economic Sovereignty is cryptographically bound to the blockchain's genesis block, creating an immutable constitutional record.

## External Dependencies

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React, cryptocons
- **Blockchain SDK**: Cosmos SDK
- **Payment Processing**: Circle USDCKit SDK
- **Decentralized Storage**: IPFS
- **AI/ML**: Anthropic Claude, OpenAI GPT-4, X.AI Grok, DeepSeek, NVIDIA NIM
- **Wallet Integration**: Keplr
- **Infrastructure**: Cloudflare, DigitalOcean
- **Other Services**: SendGrid, Sentry, Coinbase, Infura, GitHub