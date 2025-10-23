# Aequitas Protocol ($REPAR) - The Justice Machine

## Overview

The Aequitas Protocol is a sovereign Layer-1 blockchain ($REPAR is the native coin) designed to enforce $131 trillion in reparations for the transatlantic slave trade, classified as genocide. Its purpose is to provide complete economic, technical, and governance sovereignty, ensuring it cannot be shut down or censored. The protocol is founded on a 205-page forensic audit, establishing historical facts, economic tracing of liabilities ($131T via compound interest), and a legal framework based on international law. It targets universal accountability across 200+ entities including nations, corporations, and universities, and incorporates a strategic defense system with controlled vulnerabilities and an automated threat oracle.

## User Preferences

- **Coding Style**: Clean, functional React components with clear separation of concerns
- **Documentation**: Comprehensive inline documentation for complex logic
- **Sovereignty Focus**: Always emphasize $REPAR as native coin, NOT a token
- **Security-First**: Implement chaos defense patterns and threat detection
- **Legal Compliance**: FRE 901 evidence standards for all records

## System Architecture

The Aequitas Protocol comprises a frontend built with React, Vite, and Tailwind CSS, and a backend powered by a Cosmos SDK Layer-1 blockchain named Aequitas Zone.

### UI/UX Decisions
The frontend features a comprehensive UI including:
- **Dashboards**: Real-time statistics, investor analytics, founder endowment insights.
- **Data Explorers**: Defendant database, evidence explorer with IPFS integration, forensic audit explorer.
- **Transactional Systems**: Claims filing, DAO governance, transparency ledger, Founder Wallet DEX.
- **AI Analytics**: NVIDIA-powered multimodal search, trading signals, and NFT generation.
- **Verification**: Deployment verification system and Block Explorer (Dexplorer).

### Technical Implementations
- **Frontend**: React, Vite, Tailwind CSS. Includes manual code splitting for optimized production builds.
- **Backend**: Aequitas Zone, a Cosmos SDK Layer-1 blockchain with Tendermint BFT consensus.
  - **Native Coin**: $REPAR (not a token), total supply 131 trillion.
  - **Core Modules**:
    - `x/defendant`: Tracks 200+ defendants and payment types.
    - `x/justice`: Implements a deflationary $REPAR burn mechanism for payments.
    - `x/claims`: Manages arbitration demand filing across 172 jurisdictions with IPFS for evidence.
    - `x/distribution`: Handles reparations distribution to verified descendants.
    - `x/threatdefense`: A 10% Chaos Defense system with ThreatOracle, controlled vulnerabilities, and NFT evidence minting.

### System Design Choices
- **Legal & Enforcement Framework**: Multi-layered strategy using international law (Genocide, jus cogens), Black's Law, UCC Article 9, and international arbitration (NY Convention).
- **Security**: Cerberus Auditor System, a multi-agent AI system with Analyst, Adversary, and Engineer guilds, for continuous security auditing, vulnerability detection, automated patch generation, and document/codebase auditing.
- **AI Integration**: Extensive use of NVIDIA NIM models (Stable Diffusion XL, Llama 3.1 8B, CLIP) for AI-powered features across dashboards (search, risk scoring, investment recommendations, NFT generation).
- **Deployment Verification**: A pre-production API key verification system to ensure critical and recommended services are configured and operational before deployment.

## External Dependencies

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React, cryptocons
- **Blockchain SDK**: Cosmos SDK
- **Payment Processing**: Circle USDCKit SDK
- **Decentralized Storage**: IPFS
- **AI/ML**:
  - Anthropic Claude
  - OpenAI GPT-4
  - X.AI Grok
  - DeepSeek
  - NVIDIA NIM (Stable Diffusion XL, Llama 3.1 8B, CLIP)
- **Wallet Integration**: Keplr
- **Infrastructure**: Cloudflare, DigitalOcean (configurable via `.env`)
- **Other Services**: SendGrid, Sentry, Coinbase, Infura, GitHub (configurable via `.env`)