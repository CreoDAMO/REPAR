# Aequitas Protocol ($REPAR) - The Justice Machine

## Overview

The Aequitas Protocol is a sovereign Layer-1 blockchain ($REPAR is the native coin) designed to enforce $131 trillion in reparations for the transatlantic slave trade, classified as genocide. Its core purpose is to provide complete economic, technical, and governance sovereignty, making it resistant to shutdown or censorship. The protocol is founded on a 205-page forensic audit, establishing historical facts, economic tracing of liabilities, and a legal framework based on international law. It aims for universal accountability across over 200 entities (nations, corporations, universities) and features a strategic defense system with controlled vulnerabilities and an automated threat oracle.

## User Preferences

- **Coding Style**: Clean, functional React components with clear separation of concerns
- **Documentation**: Comprehensive inline documentation for complex logic
- **Sovereignty Focus**: Always emphasize $REPAR as native coin, NOT a token
- **Security-First**: Implement chaos defense patterns and threat detection
- **Legal Compliance**: FRE 901 evidence standards for all records

## System Architecture

The Aequitas Protocol consists of a React, Vite, and Tailwind CSS frontend, and a backend powered by Aequitas Zone, a Cosmos SDK Layer-1 blockchain.

### UI/UX Decisions
The frontend provides a comprehensive user interface including:
- **Dashboards**: For real-time statistics, investor analytics, and founder insights.
- **Data Explorers**: A defendant database, evidence explorer with IPFS integration, and a forensic audit explorer.
- **Transactional Systems**: Claims filing, DAO governance, transparency ledger, and a Founder Wallet DEX.
- **AI Analytics**: NVIDIA-powered multimodal search, trading signals, and NFT generation capabilities.
- **Verification**: A deployment verification system and a Block Explorer (Dexplorer).

### Technical Implementations
- **Frontend**: Utilizes React, Vite, and Tailwind CSS, with manual code splitting for production optimization.
- **Backend**: Aequitas Zone, a Cosmos SDK Layer-1 blockchain leveraging Tendermint BFT consensus.
  - **Native Coin**: $REPAR, with a total supply of 131 trillion.
  - **Core Modules**:
    - `x/defendant`: Manages over 200 defendants and payment types.
    - `x/justice`: Implements a deflationary $REPAR burn mechanism.
    - `x/claims`: Handles arbitration demand filing across 172 jurisdictions, integrating IPFS for evidence.
    - `x/distribution`: Manages reparations distribution to verified descendants.
    - `x/dex`: Founder Wallet DEX for $REPAR token swaps with constant product formula (x*y=k) and 55/30/15 fee distribution.
    - `x/threatdefense`: A 10% Chaos Defense system featuring a ThreatOracle, controlled vulnerabilities, and NFT evidence minting.

### System Design Choices
- **Legal & Enforcement Framework**: A multi-layered strategy incorporating international law (Genocide, jus cogens), Black's Law, UCC Article 9, and international arbitration.
- **Security**: The Cerberus Auditor System, a multi-agent AI system, continuously audits for vulnerabilities, generates patches, and reviews documentation and codebase.
- **AI Integration**: Extensive use of NVIDIA NIM models (Stable Diffusion XL, Llama 3.1 8B, CLIP) for AI-powered features such as search, risk scoring, investment recommendations, and NFT generation.
- **Deployment Verification**: A pre-production system to ensure critical and recommended services are operational before deployment.

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
## Recent Changes (October 23, 2025)

### DEX Module Implementation (x/dex)
- **Complete DEX Module**: Fully implemented Founder Wallet DEX module for $REPAR token swaps
  - Created `module.go` with proper Cosmos SDK AppModule structure
  - Implemented all type definitions: `msgs.go`, `query.go`, `models.go`, `interfaces.go`, `codec.go`, `genesis.go`
  - Keeper logic with pool management, liquidity provision, and constant product formula swaps
  - MsgServer with CreatePool, AddLiquidity, RemoveLiquidity, and Swap handlers
  - QueryServer for pool queries, liquidity positions, and swap estimation
  - Fee distribution system (55% to LPs, 30% to Endowment, 15% to Treasury)
  - Initial REPAR/USDC pool with $18.33 pricing built into genesis
- **Go Dependency Updates**: Migrated to Go 1.24 toolchain, downgraded incompatible dependencies

### GitHub Actions Workflow Fixes
- **DigitalOcean Deployment:** Updated appleboy/ssh-action to v1.0.3 (fixed invalid SHA)
- **Cerberus Audit:** Fixed reports directory creation with parents=True
- **Blockchain Build:** Updated Go version to 1.23.x, fixed Cosmos SDK import paths (cosmossdk.io/store)

### Security Fixes (Dependabot Alerts)
- **parse-duration:** Updated to 2.1.3+ via overrides (CVE-2025-25283 - ReDoS vulnerability)
- **nanoid:** Updated to 5.0.9+ via overrides (CVE-2024-55565 - infinite loop vulnerability)
- **Impact:** Eliminated all high-severity vulnerabilities, clean security posture for investor pitch

### Replit Configuration
- **Frontend:** Running on port 5000 with Vite dev server, properly configured for Replit proxy
- **Backend:** Running on port 3002 with Circle API integration (dev mode)
- **Block Explorer:** Running on port 3001 with TypeScript support, configured for Replit proxy

### System Status
- ✅ All Replit workflows running successfully
- ✅ All GitHub Actions workflows fixed and ready for CI/CD
- ✅ All Dependabot security alerts resolved (0 high-severity vulnerabilities)
- ✅ Comprehensive documentation created (SYSTEM_ANALYSIS.md, WORKFLOW_FIXES_SUMMARY.md, SECURITY_FIXES.md)
- ✅ Ready for feature development and production deployment
