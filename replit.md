# Aequitas Protocol ($REPAR) - The Justice Machine

## Overview

The Aequitas Protocol is a sovereign Layer-1 blockchain ($REPAR is the native coin) designed to enforce $131 trillion in reparations for the transatlantic slave trade, classified as genocide. It provides complete economic, technical, and governance sovereignty, ensuring it cannot be shut down or censored. The protocol is founded on a 205-page forensic audit, establishing historical facts, economic tracing of liabilities ($131T via compound interest), and a legal framework based on international law (jus cogens, UN Genocide Convention). It targets universal accountability across 200+ entities, including nations, corporations, and universities. The project also incorporates a strategic defense system with controlled vulnerabilities and tripwires to deter and counter non-compliant entities, utilizing an automated threat oracle and NFT-based evidence system.

## User Preferences

- **Coding Style**: Clean, functional React components with clear separation of concerns
- **Documentation**: Comprehensive inline documentation for complex logic
- **Sovereignty Focus**: Always emphasize $REPAR as native coin, NOT a token
- **Security-First**: Implement chaos defense patterns and threat detection
- **Legal Compliance**: FRE 901 evidence standards for all records

## System Architecture

The Aequitas Protocol consists of a frontend built with React, Vite, and Tailwind CSS, and a backend powered by a Cosmos SDK Layer-1 blockchain named Aequitas Zone.

### Frontend
The frontend features a comprehensive UI including:
- **Dashboard**: Real-time statistics, coinomics, burn tracking.
- **Investor Dashboard**: Complete financial analysis & ROI calculator with interactive scenarios.
- **Defendant Database**: Searchable registry with liability tracking.
- **Evidence Explorer**: Chain of Guilt visualizer with IPFS integration.
- **Forensic Audit**: Explorer for the 205-page audit with compound interest calculations.
- **Claims System**: Arbitration demand filing across 172 jurisdictions.
- **DAO Governance**: Reputation-based, time-weighted voting.
- **Transparency Ledger**: Global Reparations Ledger.
- **AI Analytics**: NVIDIA-powered multimodal search, trading signals, and NFT generation.
- **Deployment Verification**: Pre-production API key verification system.
- **Founder Wallet DEX**: Multi-cryptocurrency support.
- **Block Explorer (Dexplorer)**.

### Backend: Aequitas Zone (Cosmos SDK Layer-1 Blockchain)
- **Framework**: Cosmos SDK with Tendermint BFT consensus.
- **Native Coin**: $REPAR (not a token).
- **Total Supply**: 131 trillion REPAR (1:1 with $131T liability), denominated as `urepar`.
- **Max Validators**: 100.
- **Core Modules**:
    - **x/defendant**: Tracks 200+ defendants (Corporation, Financial Institution, Nation State, African Kingdom, University) with status tracking and payment types (Financial, Restorative, Hybrid).
    - **x/justice**: Implements a deflationary burn mechanism where 1 USD equivalent of $REPAR is permanently burned for each payment, with burn statistics tracking.
    - **x/claims**: Manages arbitration demand filing across 172 NYC Convention jurisdictions for claim types like Unjust Enrichment, Genocide, with IPFS integration for evidence.
    - **x/distribution**: Handles reparations distribution to registered descendants based on verified lineage, with automated allocation from various funds (Community & Descendant, Foundation Treasury, Claims & Compensation, Ecosystem & Enforcement, Development).
    - **x/threatdefense**: A 10% Chaos Defense system with ThreatOracle for automated detection, controlled vulnerabilities as honeypots, a 3% Nightmare Activator for counter-attacks, and NFT evidence minting for legal compliance (FRE 901 standards).

### Legal & Enforcement Framework
A multi-layered strategy involving international law (Genocide classification, jus cogens), Black's Law (unjust enrichment, constructive trust), UCC Article 9 (commercial liens), and international arbitration (NY Convention). This framework includes specific accountability matrices for entities like the UK Government, Barclays, and JPMorgan Chase, and "Nightmare Tripwires" for non-compliant entities.

### Security: Cerberus Auditor System ✓
Implemented comprehensive multi-agent AI security auditing system:
- **Architecture**: 3 AI guilds (Analyst, Adversary, Engineer) coordinated by master orchestrator
- **Analyst Guild**: 4 AI agents (Claude Sonnet 4, GPT-4 Turbo, Grok, Deepseek) working in parallel
- **Adversary Guild**: Exploit testing, chaos engineering, Byzantine fault tolerance tests
- **Engineer Guild**: Automated patch generation with test cases
- **Features**:
  - Consensus mechanism (vulnerabilities must be found by multiple AI agents)
  - Threat ledger for permanent vulnerability tracking
  - Automated fix generation and verification
  - Security scoring system (0-100)
  - Document auditing (for TAST and legal documents)
  - Codebase auditing (for Cosmos SDK Go modules)
- **Location**: `/auditor/` directory
- **Usage**: `python auditor/orchestrator.py`
- **Reports**: Saved to `/auditor/reports/` in JSON format

## Recent Changes (October 23, 2025)

### Production Readiness Updates (Latest) ✓
- **Dependencies Updated**: All npm packages updated to latest minor versions (Vite 7.1.12, ESLint 9.38.0, Tailwind 3.4.18)
- **Security**: Zero vulnerabilities detected in dependency scan
- **Build Optimization**: Production build tested and working (5.6MB bundle - code splitting recommended for future optimization)
- **IPFS Deprecation**: Documented ipfs-http-client deprecation with migration notes to Helia (current implementation still works)
- **Known Issues**: Large bundle size (5.6MB) - future optimization recommended via dynamic imports and code splitting

### NVIDIA AI Integration ✓
Integrated NVIDIA NIM AI models for enhanced capabilities across the platform:
- **NFT Generator**: Stable Diffusion XL for justice-themed NFT art generation (~$0.002/image)
  - Interactive prompt-based generation
  - Automatic justice-themed styling
  - Download and regeneration capabilities
  - Mock mode for development (real API when NVIDIA_API_KEY configured)
- **AI Trading Signals**: Llama 3.1 8B for sentiment analysis and market insights (~$0.005/1K tokens)
  - Real-time sentiment analysis for REPAR token
  - Bullish/bearish score calculation
  - Quick example queries for testing
  - Mock mode with keyword-based analysis
- **Multimodal Search**: CLIP for liability database queries (~$0.001/search)
  - Text and image-based evidence search
  - $131T defendant database integration
  - Confidence scoring and evidence matching
  - Mock results for development testing

**Features**:
- Production-ready architecture with graceful fallbacks
- Mock API layer for development without real API keys
- Cost-effective implementation ($100-230/month at scale)
- Easy integration with existing Cerberus AI system
- Comprehensive error handling and user feedback

**Files Created**:
- `frontend/src/utils/nvidiaAI.js` - NVIDIA API wrapper with mock fallbacks
- `frontend/src/components/AIFeatures/NFTGenerator.jsx` - AI NFT generation component
- `frontend/src/components/AIFeatures/TradingSignals.jsx` - AI sentiment analysis component
- `frontend/src/components/AIFeatures/MultimodalSearch.jsx` - AI search component
- `frontend/src/pages/AIAnalyticsEnhanced.jsx` - Unified NVIDIA AI dashboard
- `.env.template` - Complete environment configuration template

### Deployment Verification System ✓
Created comprehensive pre-production API key verification system:
- **Critical APIs**: Cloudflare, DigitalOcean, AI models (Anthropic, OpenAI, X.AI, DeepSeek), Coinbase, Circle
- **Recommended APIs**: NVIDIA NIM, GitHub, SendGrid, Infura
- **Optional APIs**: Sentry, Pinata IPFS, Discord, Twitter/X
- **Features**:
  - Automated testing with mock responses
  - Real-time status indicators and latency reporting
  - Readiness scoring and production-ready verification
  - Categorized API organization (MUST HAVE, RECOMMENDED, OPTIONAL)
  - Visual feedback for connection status

**Files Created**:
- `frontend/src/pages/DeploymentVerification.jsx` - Full deployment verification dashboard
- Accessible at `/deployment` route

### Investor Dashboard Enhancements ✓
Previously implemented (October 23, 2025):
- Updated React-Vite dependencies to latest versions (React 19.2.0, Vite 7.1.11)
- Created comprehensive Investor Dashboard with financial calculators
- Fixed division-by-zero bugs with production-grade input validation
- All changes architect-reviewed and production-ready

## Recent Changes (October 21, 2025)

### Cerberus Auditor Implementation
Built the complete AI security auditing system as specified in the documentation:
- Created `/auditor` directory structure with agents/, reports/ subdirectories
- Implemented all three guilds (Analyst, Adversary, Engineer)
- Configured API keys for OpenAI, Anthropic, xAI/Grok, and Deepseek
- Added consensus mechanism for high-confidence vulnerability detection
- Integrated automated patch generation and security fix verification

## Recent Changes (October 19, 2025)

### DEX Black Screen Fix ✓
Fixed critical rendering issue where DEX, Liquidity, and Pools tabs would crash to black screen when switching cryptocurrencies:
- **Root Cause**: Improper error handling for cryptocons icon library
- **Solution**: Created shared `CryptoIcon` component with comprehensive fallback system
- **Files Modified**:
  - Created: `frontend/src/components/CryptoIcon.jsx` (centralized icon rendering)
  - Updated: `frontend/src/components/SwapInterface.jsx`
  - Updated: `frontend/src/components/LiquidityInterface.jsx`
  - Updated: `frontend/src/pages/AequitasDEX.jsx`
- **Result**: All tabs now render gracefully with letter-based fallbacks if icons fail
- **Test Route**: `/icon-test` - displays all 15 cryptocurrency icons

### Workflow Optimization
Updated all three workflows to auto-install dependencies on startup:
- Frontend workflow now runs: `npm install --prefer-offline --no-audit && npm run dev`
- Backend workflow now runs: `npm install --prefer-offline --no-audit && npm start`
- Block Explorer workflow now runs: `npm install --prefer-offline --no-audit && npm run dev`

This ensures dependencies are always up-to-date without manual intervention.

## External Dependencies

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.1.11
- **Styling**: Tailwind CSS 3.x
- **Charts**: Recharts 3.3.0
- **Icons**: Lucide React 0.546.0, cryptocons (with fallback handling)
- **Blockchain SDK**: Cosmos SDK
- **Payment Processing**: Circle USDCKit SDK (for USDC payments)
- **Decentralized Storage**: IPFS
- **AI/ML**: 
  - Cerberus Multi-Agent System (Anthropic Claude, OpenAI GPT-4, X.AI Grok, DeepSeek)
  - NVIDIA NIM (Stable Diffusion XL, Llama 3.1 8B, CLIP, Whisper, Gemma 2)
- **Wallet Integration**: Keplr (for Cosmos native)

## Deployment Configuration

### Environment Variables
A comprehensive `.env.template` file is provided with 200+ configuration options including:
- **Infrastructure**: Cloudflare DNS, DigitalOcean deployment
- **AI Models**: Anthropic, OpenAI, X.AI, DeepSeek, NVIDIA NIM
- **Payments**: Coinbase, Circle USDC
- **Blockchain**: Cosmos Hub, Ethereum, Polygon RPCs
- **Services**: SendGrid email, Sentry monitoring, IPFS storage
- **Security**: JWT secrets, CORS origins, rate limiting

### Pre-Deployment Checklist
Use `/deployment` route to verify:
1. All critical API keys are configured
2. AI model endpoints are accessible
3. Payment systems are operational
4. Infrastructure services are connected
5. Production readiness score ≥ 100%

### Cost Estimates
- **NVIDIA AI**: $100-230/month (NFT generation, trading signals, multimodal search)
- **Cerberus AI**: Variable based on usage (~$50-200/month)
- **Infrastructure**: DigitalOcean, Cloudflare (varies by traffic)
- **Total Estimated**: $300-600/month at moderate scale