# Aequitas Protocol ($REPAR) - The Justice Machine

## Overview
The Aequitas Protocol is a sovereign Layer-1 blockchain ($REPAR is the native coin) designed to enforce $131 trillion in reparations for the transatlantic slave trade. Its core purpose is to provide complete economic, technical, and governance sovereignty, making it resistant to shutdown or censorship. The protocol is founded on a 205-page forensic audit establishing historical facts, economic tracing of liabilities, and a legal framework. It aims for universal accountability across over 200 entities and features a strategic defense system with controlled vulnerabilities and an automated threat oracle.

## User Preferences
- **Coding Style**: Clean, functional React components with clear separation of concerns
- **Documentation**: Comprehensive inline documentation for complex logic
- **Sovereignty Focus**: Always emphasize $REPAR as native coin, NOT a token
- **Security-First**: Implement chaos defense patterns and threat detection
- **Legal Compliance**: FRE 901 evidence standards for all records

## System Architecture
The Aequitas Protocol comprises a React, Vite, and Tailwind CSS frontend, and a backend powered by Aequitas Zone, a Cosmos SDK Layer-1 blockchain.

### UI/UX Decisions
The frontend provides a comprehensive user interface including:
- **Dashboards**: For real-time statistics, investor analytics, and founder insights.
- **Data Explorers**: A defendant database, evidence explorer with IPFS integration, and a forensic audit explorer.
- **Transactional Systems**: Claims filing, DAO governance, transparency ledger, and a Founder Wallet DEX.
- **AI Analytics**: NVIDIA-powered multimodal search, trading signals, and NFT generation capabilities.
- **Verification**: A deployment verification system and a Block Explorer (Dexplorer).

### Technical Implementations
- **Frontend**: Utilizes React, Vite, and Tailwind CSS.
- **Backend**: Aequitas Zone, a Cosmos SDK Layer-1 blockchain leveraging Tendermint BFT consensus.
  - **Native Coin**: $REPAR, with a total supply of 131 trillion.
  - **Core Modules**: `x/defendant`, `x/justice`, `x/claims` (IPFS for evidence), `x/distribution`, `x/dex` (Founder Wallet DEX for $REPAR/USDC swaps with constant product formula), `x/threatdefense` (10% Chaos Defense with ThreatOracle and NFT evidence minting).

### System Design Choices
- **Legal & Enforcement Framework**: Multi-layered strategy incorporating international law, Black's Law, UCC Article 9, and international arbitration.
- **Security**: The Cerberus Auditor System, a multi-agent AI, continuously audits for vulnerabilities, generates patches, and reviews documentation and codebase.
- **AI Integration**: Extensive use of NVIDIA NIM models (Stable Diffusion XL, Llama 3.1 8B, CLIP) for AI-powered features.
- **Deployment Verification**: A pre-production system ensuring critical and recommended services are operational.

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