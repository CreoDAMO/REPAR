# Aequitas Protocol ($REPAR) - The Justice Machine

## Overview

The Aequitas Protocol is a sovereign Layer-1 blockchain ($REPAR is the native coin) engineered to enforce $131 trillion in reparations for the transatlantic slave trade, which is classified as genocide. Its primary objective is to deliver complete economic, technical, and governance sovereignty, ensuring resilience against shutdown or censorship. The protocol is underpinned by a 205-page forensic audit, establishing historical facts, tracing economic liabilities, and outlining a legal framework based on international law. It aims for universal accountability across over 200 entities (nations, corporations, universities) and incorporates a strategic defense system with controlled vulnerabilities and an automated threat oracle. The project's ambition is to transform reparations enforcement from a moral argument into a mathematical protocol, establishing a sovereign digital jurisdiction under Natural Law and Technological Law.

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

The Aequitas Protocol comprises a React, Vite, and Tailwind CSS frontend, and a backend powered by Aequitas Zone, a Cosmos SDK Layer-1 blockchain.

### Genesis & Deployment

- **CI-Driven Genesis Generation**: Automated system for generating deterministic testnet and mainnet genesis files through GitHub Actions
- **Allocation Structure**: Canonical JSON specification ensuring proper $REPAR coin distribution (131T total)
- **Blockchain Build Pipeline**: GitHub Actions workflow builds binary, generates genesis files, validates, and uploads artifacts
- **Scripts**: Python allocation generator and shell validation scripts for reproducible genesis creation

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

## Blockchain Deployment

The blockchain build process uses GitHub Actions instead of local builds to avoid binary size issues:

1. **Automated Build**: `.github/workflows/blockchain-build.yml` builds the blockchain binary (Go 1.23.x)
2. **Genesis Generation**: Automatically generates testnet and mainnet genesis files with proper allocations
3. **Validation**: Validates genesis files using the built binary before artifact upload
4. **Artifacts**: Binary, genesis files (testnet/mainnet), checksums, and allocation structure are uploaded
5. **Initialization**: Use `scripts/init-both-pregenerated.sh` to initialize both networks

**Recent Updates (Nov 1, 2025):**
- ✅ **BUILD FIXED**: Blockchain now compiles successfully in Replit
- ✅ **Protobuf Generation**: All 40 missing .pb.go files generated via buf
- ✅ **Depinject Configuration**: All 9 custom modules properly wired with App Wiring v2
- ✅ **Go Version**: Updated to Go 1.24 (required by dependencies)
- ✅ Both Testnet and Mainnet initialized successfully
- ✅ Founder allocation verified: 23.58T REPAR (18% of 131T total supply)
  - Liquid wallet: 15.72T REPAR (12%)
  - Endowment: 7.86T REPAR (6%, locked 8 years)
- ✅ Sovereignty declaration cryptographically bound to genesis blocks
- ✅ All allocations verified against specification
- ✅ **Multi-Wallet Integration**: Keplr, MetaMask, Coinbase Wallet
- ✅ **Keplr Chain Registry**: Ready for submission (SVG logo, chain config, asset list)
- ✅ **$REPAR Logo**: Created SVG logo with scales of justice (PNG generation guide provided)
- ✅ **Wallet Dashboards**: Live blockchain data when connected, proper disconnect flow
- 🚀 **READY FOR DEPLOYMENT** - Binary runs without configuration panics

**Network Directories:**
- Testnet: `~/.aequitas-testnet` (chain-id: aequitas-testnet-1)
- Mainnet: `~/.aequitas` (chain-id: aequitas-1)

**Build Documentation:**
- `docs/BLOCKCHAIN_BUILD_FIXED_FINAL.md` - Original CI/CD build fix
- `docs/MODULE_DEPINJECT_FIX.md` - Latest local build fix (Nov 1, 2025)

**Local Build Process:**
```bash
# Build blockchain from source
cd aequitas
go build -o ./build/aequitasd ./cmd/aequitasd

# Binary: 152MB at aequitas/build/aequitasd
# Status: ✅ Compiles successfully, no runtime panics
```

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