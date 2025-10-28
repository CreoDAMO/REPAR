# Aequitas Protocol ($REPAR) - The Justice Machine

## Overview

The Aequitas Protocol is a sovereign Layer-1 blockchain ($REPAR is the native coin) engineered to enforce $131 trillion in reparations for the transatlantic slave trade, which is classified as genocide. Its primary objective is to deliver complete economic, technical, and governance sovereignty, ensuring resilience against shutdown or censorship. The protocol is underpinned by a 205-page forensic audit, establishing historical facts, tracing economic liabilities, and outlining a legal framework based on international law. It aims for universal accountability across over 200 entities (nations, corporations, universities) and incorporates a strategic defense system with controlled vulnerabilities and an automated threat oracle. The project's ambition is to transform reparations enforcement from a moral argument into a mathematical protocol, establishing a sovereign digital jurisdiction under Natural Law and Technological Law.

## User Preferences

- **Coding Style**: Clean, functional React components with clear separation of concerns
- **Documentation**: Comprehensive inline documentation for complex logic
- **Sovereignty Focus**: Always emphasize $REPAR as native coin, NOT a token
- **Security-First**: Implement chaos defense patterns and threat detection
- **Legal Compliance**: FRE 901 evidence standards for all records

## System Architecture

The Aequitas Protocol comprises a React, Vite, and Tailwind CSS frontend, and a backend powered by Aequitas Zone, a Cosmos SDK Layer-1 blockchain.

### UI/UX Decisions

The frontend offers a comprehensive user interface including:
- **Dashboards**: For real-time statistics, investor analytics, and founder insights.
- **Data Explorers**: A defendant database, evidence explorer with IPFS integration, and a forensic audit explorer.
- **Transactional Systems**: Claims filing, DAO governance, transparency ledger, and a Founder Wallet DEX.
- **AI Analytics**: NVIDIA-powered multimodal search, trading signals, and NFT generation capabilities.
- **Verification**: A deployment verification system and a Block Explorer (Dexplorer).

### Technical Implementations

- **Frontend**: Utilizes React, Vite, and Tailwind CSS.
- **Backend**: Aequitas Zone, a Cosmos SDK Layer-1 blockchain leveraging Tendermint BFT consensus.
  - **Native Coin**: $REPAR, with a total supply of 131 trillion.
  - **Core Modules**:
    - `x/defendant`: Manages over 200 defendants and payment types.
    - `x/justice`: Implements a deflationary $REPAR burn mechanism.
    - `x/claims`: Handles arbitration demand filing across 172 jurisdictions, integrating IPFS for evidence.
    - `x/distribution`: Manages reparations distribution to verified descendants.
    - `x/dex`: Founder Wallet DEX for $REPAR native coin swaps (REPAR/USDC pairs) with constant product formula (x*y=k) and 55/30/15 fee distribution.
    - `x/threatdefense`: A 10% Chaos Defense system featuring a ThreatOracle, controlled vulnerabilities, and NFT evidence minting.

### System Design Choices

- **Legal & Enforcement Framework**: A multi-layered strategy incorporating international law (Genocide, jus cogens), Black's Law, UCC Article 9, and international arbitration.
- **Security**: The Cerberus Auditor System, a multi-agent AI system, continuously audits for vulnerabilities, generates patches, and reviews documentation and codebase.
- **AI Integration**: Extensive use of NVIDIA NIM models (Stable Diffusion XL, Llama 3.1 8B, CLIP) for AI-powered features such as search, risk scoring, investment recommendations, and NFT generation.
- **Deployment Verification**: A pre-production system to ensure critical and recommended services are operational before deployment.
- **Constitutional Foundation**: The Digital Declaration of International Economic Sovereignty is cryptographically bound to the blockchain's genesis block, establishing a permanent, immutable constitutional record.

## External Dependencies

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React, cryptocons
- **Blockchain SDK**: Cosmos SDK
- **Payment Processing**: Circle USDCKit SDK
- **Decentralized Storage**: IPFS
- **AI/ML**: Anthropic Claude, OpenAI GPT-4, X.AI Grok, DeepSeek, NVIDIA NIM (Stable Diffusion XL, Llama 3.1 8B, CLIP)
- **Wallet Integration**: Keplr
- **Infrastructure**: Cloudflare, DigitalOcean
- **Other Services**: SendGrid, Sentry, Coinbase, Infura, GitHub