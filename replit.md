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

## Critical Tasks - Final 20-25% to Production Ready

### Priority 1: Blockchain Backend (HIGH PRIORITY)

#### Task 1.1: Fix Validator Subsidy Module
**Files**: `aequitas/x/validatorsubsidy/keeper/keeper.go`

**Issues**:
- Replace `time.Now()` with `ctx.BlockTime()` for deterministic blockchain time
- Implement actual coin transfers using `bankKeeper.SendCoinsFromModuleToAccount()`
- Calculate dynamic costs based on submitted operator expenses instead of fixed 6.54 REPAR
- Add proper state updates for pool balances after distributions
- Persist payment records to blockchain state

**Code Fixes Needed**:
```go
// Replace time.Now() usage
lastDist := ctx.BlockTime() // instead of time.Now()

// Add actual bank transfer
coins := sdk.NewCoins(sdk.NewCoin("repar", subsidyAmount))
err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, operatorAddr, coins)

// Update pool balance
pool.TotalAllocated = pool.TotalAllocated.Add(subsidyAmount)
k.Pool.Set(ctx, pool)
```

**Acceptance Criteria**:
- [ ] All blockchain time uses `ctx.BlockTime()`
- [ ] Actual REPAR transfers occur via bankKeeper
- [ ] Pool state updates after each distribution
- [ ] Payment records persisted to state
- [ ] Unit tests pass for all keeper functions

#### Task 1.2: Complete Module Wiring in app.go
**File**: `aequitas/app/app.go`

**Issues**:
- Validator subsidy module not injected via depinject
- Missing keeper declarations in App struct
- Module manager not including validatorsubsidy module

**Required Changes**:
```go
// In App struct, add:
ValidatorSubsidyKeeper validatorsubsidykeeper.Keeper

// In depinject.Inject, add:
&app.ValidatorSubsidyKeeper,

// In module registration
validatorsubsidy.NewAppModule(app.ValidatorSubsidyKeeper)
```

**Acceptance Criteria**:
- [ ] Module appears in `aequitasd q --help` output
- [ ] Queries execute without errors
- [ ] Transactions can be submitted
- [ ] Module included in genesis export

#### Task 1.3: Write Comprehensive Tests
**Files**: Create `aequitas/x/validatorsubsidy/keeper/*_test.go`

**Tests Needed**:
- `TestDistributeSubsidies` - Verify REPAR transfers correctly
- `TestCheckDistribution` - Verify 30-day interval logic
- `TestInsufficientFunds` - Verify error handling
- `TestPoolUpdate` - Verify state persistence
- `TestGenesisImportExport` - Verify genesis handling

**Acceptance Criteria**:
- [ ] 80%+ code coverage
- [ ] All edge cases tested
- [ ] Integration tests pass
- [ ] No race conditions

### Priority 2: Frontend-Backend Integration (HIGH PRIORITY)

#### Task 2.1: Replace Mock Data with Real API Calls
**Files**: 
- `frontend/src/pages/ValidatorSubsidy.jsx`
- `frontend/src/pages/InvestorDashboard.jsx`
- `frontend/src/pages/Dashboard.jsx`

**Issues**:
- Hardcoded mock data instead of API queries
- No gRPC/REST client connections
- Missing real-time updates

**Implementation**:
```javascript
// Add gRPC query client
import { QueryClient } from '@cosmjs/stargate'

const fetchPoolStatus = async () => {
  const client = await QueryClient.connect(RPC_ENDPOINT)
  const pool = await client.validatorsubsidy.pool()
  return pool
}
```

**Acceptance Criteria**:
- [ ] All dashboards query live blockchain data
- [ ] Real-time updates every 6 seconds
- [ ] Error handling for failed queries
- [ ] Loading states during data fetch

#### Task 2.2: Complete Keplr Wallet Integration
**Files**: 
- `frontend/src/components/WalletConnect.jsx`
- `frontend/src/utils/cosmosClient.js`

**Issues**:
- Wallet connection UI exists but not functional
- Transaction signing not implemented
- Account balance queries missing

**Implementation**:
```javascript
// Complete transaction signing
const signAndBroadcast = async (messages) => {
  const offlineSigner = window.getOfflineSigner(CHAIN_ID)
  const accounts = await offlineSigner.getAccounts()
  const client = await SigningStargateClient.connectWithSigner(RPC_ENDPOINT, offlineSigner)
  return await client.signAndBroadcast(accounts[0].address, messages, FEE)
}
```

**Acceptance Criteria**:
- [ ] Users can connect Keplr wallet
- [ ] Account balances display correctly
- [ ] Transactions can be signed and broadcast
- [ ] Transaction history displays

#### Task 2.3: Implement NVIDIA AI Features Fully
**Files**: 
- `frontend/src/utils/nvidiaAI.js`
- `frontend/src/components/AIFeatures/*`

**Issues**:
- API calls structured but not fully connected
- Error handling incomplete
- Rate limiting not implemented
- Image generation not saving to IPFS

**Implementation**:
```javascript
// Add proper error handling and rate limiting
const generateNFT = async (prompt) => {
  try {
    const response = await fetch(NVIDIA_ENDPOINT, {
      headers: { 'Authorization': `Bearer ${NVIDIA_API_KEY}` },
      body: JSON.stringify({ prompt })
    })
    if (!response.ok) throw new Error('Generation failed')
    const imageBlob = await response.blob()
    const ipfsHash = await uploadToIPFS(imageBlob)
    return ipfsHash
  } catch (error) {
    console.error('NFT generation failed:', error)
    throw error
  }
}
```

**Acceptance Criteria**:
- [ ] AI search returns relevant results
- [ ] NFT generation saves to IPFS
- [ ] Trading signals display accurately
- [ ] Rate limits enforced (max 100 req/day)

### Priority 3: Configuration & Deployment (MEDIUM PRIORITY)

#### Task 3.1: Complete Environment Configuration
**File**: `.env.template`

**Issues**:
- Missing required API keys
- No validation for required variables
- Production vs development configs not separated

**Required Variables**:
```bash
# Blockchain
RPC_ENDPOINT=http://localhost:26657
CHAIN_ID=aequitas-1
DENOM=repar

# AI Services
NVIDIA_API_KEY=<required>
OPENAI_API_KEY=<optional>
ANTHROPIC_API_KEY=<optional>

# Infrastructure
IPFS_GATEWAY=https://ipfs.io
CIRCLE_API_KEY=<required>
```

**Acceptance Criteria**:
- [ ] All critical API keys documented
- [ ] Deployment verification checks all required keys
- [ ] Development .env.local separate from production
- [ ] Secrets stored securely in Replit Secrets

#### Task 3.2: Setup Production Deployment
**Files**: 
- `.replit` (deployment config)
- `frontend/nginx.conf`
- `docker-compose.yml`

**Issues**:
- CORS headers not configured
- SSL/TLS setup incomplete
- Health check endpoints missing

**Implementation**:
```toml
[deployment]
run = ["sh", "-c", "cd aequitas && aequitasd start & cd frontend && npm run build && npx serve -s dist -l 5000"]
build = ["sh", "-c", "cd aequitas && make install && cd ../frontend && npm install"]
```

**Acceptance Criteria**:
- [ ] Frontend builds for production
- [ ] Blockchain node starts automatically
- [ ] HTTPS enabled via Cloudflare
- [ ] Health checks return 200 OK

#### Task 3.3: Implement Monitoring & Logging
**Files**: Create `monitoring/` directory

**Missing**:
- Application metrics (Prometheus/Grafana)
- Error tracking (Sentry integration)
- Transaction monitoring
- Uptime alerts

**Acceptance Criteria**:
- [ ] Sentry captures frontend errors
- [ ] Blockchain metrics exported
- [ ] Alert triggers for downtime
- [ ] Logs centralized and searchable

### Priority 4: Security & Testing (MEDIUM PRIORITY)

#### Task 4.1: Security Hardening
**Files**: Multiple

**Issues**:
- CSRF protection incomplete
- Input validation missing in some endpoints
- Rate limiting not enforced
- API keys exposed in client code

**Required**:
- [ ] CSRF tokens on all state-changing operations
- [ ] Input sanitization on all user inputs
- [ ] API rate limiting (100 req/min per IP)
- [ ] API keys moved to backend only

#### Task 4.2: End-to-End Testing
**Files**: Create `tests/e2e/` directory

**Missing Tests**:
- User flows (wallet connect → transaction → confirmation)
- Module interactions (justice → burn → distribution)
- Error scenarios (insufficient funds, network failures)

**Acceptance Criteria**:
- [ ] 10+ E2E test scenarios
- [ ] All critical paths covered
- [ ] Tests run in CI/CD
- [ ] Test coverage report generated

### Priority 5: Documentation & Polish (LOW PRIORITY)

#### Task 5.1: API Documentation
**Files**: Create `docs/api/` directory

**Missing**:
- REST API endpoint documentation
- WebSocket event documentation
- Error code reference
- Rate limit documentation

**Acceptance Criteria**:
- [ ] OpenAPI/Swagger spec generated
- [ ] All endpoints documented
- [ ] Example requests/responses
- [ ] Postman collection available

#### Task 5.2: User Documentation
**Files**: Update `README.md`, create `docs/user-guide/`

**Missing**:
- Getting started guide
- Wallet setup instructions
- Transaction tutorials
- Troubleshooting guide

**Acceptance Criteria**:
- [ ] Complete README with screenshots
- [ ] Video walkthrough embedded
- [ ] FAQ section with 20+ questions
- [ ] Support contact information

## 🎯 INVESTOR READINESS - FINAL 20-25% TASKS

### HIGH PRIORITY (Complete Before Investor Meetings)

#### 1. Legal Documentation (CRITICAL)
- [ ] Engage securities counsel for PPM (Private Placement Memorandum) drafting - Budget: $50-100K
- [ ] Draft Form D for SEC filing (within 15 days of first investment)
- [ ] Set up accredited investor verification system (via third-party provider)
- [ ] Create subscription agreement templates
- [ ] Finalize NDA templates for data room access
- [ ] Legal opinion on REPAR native coin status (commodity vs security)

#### 2. Data Room Population
- [ ] **Tier 1 (Public)**: Populate with live links and public documents
  - [ ] Add link to 205-page forensic audit
  - [ ] Add GitHub repository links
  - [ ] Add live system demo URLs
  - [ ] Create executive summary PDF
- [ ] **Tier 2 (NDA-Protected)**: Prepare sensitive materials
  - [ ] Financial model Excel file (formulas unlocked for verification)
  - [ ] Complete technical architecture documentation
  - [ ] AI performance metrics dashboard
  - [ ] Use of funds detailed allocation spreadsheet
- [ ] **Tier 3 (Due Diligence)**: Ready for post-term sheet
  - [ ] Source code security audit reports
  - [ ] Penetration testing results
  - [ ] Bank statements and financial history
  - [ ] Cap table verification documents

#### 3. Investor Demo Preparation
- [ ] Practice 15-minute pitch until flawless (record and review)
- [ ] Create backup screenshots for all live demos (in case of connectivity issues)
- [ ] Test all system URLs before each meeting
- [ ] Prepare FAQ response cards for common objections
- [ ] Set up screen recording for demo replays

#### 4. Crowdfunding Campaign Setup
- [ ] Complete StartEngine application (Regulation CF platform)
- [ ] Generate "Evidence Burn #001" NFT artwork (Justice Ignition Series)
- [ ] Create NFT smart contracts for 3 tiers ($250/$1,000/$5,000)
- [ ] Draft campaign page copy for StartEngine
- [ ] Draft campaign page for native NFT marketplace
- [ ] Create community announcement email template
- [ ] Prepare social media campaign assets

### MEDIUM PRIORITY (Complete Within 30 Days)

#### 5. AI System Enhancements
- [ ] Add real-time performance monitoring dashboard for investors
- [ ] Create AI confidence scoring visualization
- [ ] Implement automated reporting for AI analysis results
- [ ] Add comparative analysis (AI vs human legal review accuracy)
- [ ] Document AI scaling plan with GPU cost projections

#### 6. Financial Model Validation
- [ ] Third-party review of financial projections
- [ ] Sensitivity analysis across 10+ scenarios
- [ ] Add regulatory cost modeling (SEC compliance scenarios)
- [ ] Create investor-specific ROI calculators
- [ ] Add exit scenario modeling (acquisition, IPO, token distribution)

#### 7. Technical Due Diligence Prep
- [ ] Complete smart contract audit (recommend CertiK or Trail of Bits)
- [ ] Run penetration testing on all public endpoints
- [ ] Document disaster recovery procedures
- [ ] Create infrastructure cost projections at scale
- [ ] Prepare technical debt assessment

#### 8. Regulatory Compliance
- [ ] FinCEN MSB registration analysis (if required)
- [ ] State-by-state money transmitter license review
- [ ] CFTC commodity classification legal memo
- [ ] International arbitration jurisdiction analysis
- [ ] KYC/AML provider selection and integration plan

### ONGOING (Continuous Improvement)

#### 9. Community Engagement
- [ ] Weekly community updates on progress
- [ ] Monthly AMA (Ask Me Anything) sessions
- [ ] Descendant verification process documentation
- [ ] Community governance structure design
- [ ] DAO voting mechanism implementation

#### 10. Investor Relations
- [ ] Create investor update template (monthly reporting)
- [ ] Set up investor portal for data room access
- [ ] Design cap table management system
- [ ] Prepare board meeting materials template
- [ ] Create investor onboarding checklist

---

## ✅ COMPLETION CRITERIA

### Definition of "Investment-Ready"
- [ ] All Tier 1 and Tier 2 data room materials accessible
- [ ] Legal counsel engaged and PPM in draft stage
- [ ] Demo script practiced and tested successfully 10+ times
- [ ] At least 5 scheduled investor meetings confirmed
- [ ] Crowdfunding campaign 80%+ ready for launch
- [ ] AI systems demonstrating 95%+ uptime over 30 days
- [ ] Financial model validated by third-party CFO/accountant

### Success Metrics
- **Week 1**: Legal engagement + data room structure complete
- **Week 2**: First 3 investor demos delivered successfully
- **Week 3**: Crowdfunding soft launch to engaged community (1,000 members)
- **Week 4**: Term sheet negotiations with 1-2 lead investors
- **Month 2**: $1-4M crowdfunding closed + $18-22M institutional committed

---

## 🚨 CRITICAL PATH ITEMS (DO NOT DELAY)

1. **Legal Engagement**: Without PPM and Form D, cannot legally close investments
2. **Accredited Investor Verification**: Required before accepting any capital
3. **Demo Readiness**: First impression is everything - must be flawless
4. **Data Room**: Investors expect immediate access to materials upon request

---

## 📞 NEXT ACTIONS (This Week)

- [ ] Monday: Contact 3 securities law firms for PPM quotes
- [ ] Tuesday: Complete Tier 1 data room population
- [ ] Wednesday: Record and review demo practice session
- [ ] Thursday: Finalize NFT artwork and campaign copy
- [ ] Friday: Send first 5 investor outreach emails (warm introductions)

## Task Tracking

Use this checklist to track completion:

**Backend (50% of remaining work)**
- [ ] Task 1.1: Fix Validator Subsidy Module (3-4 hours)
- [ ] Task 1.2: Complete Module Wiring (2 hours)
- [ ] Task 1.3: Write Comprehensive Tests (4-5 hours)

**Frontend Integration (30% of remaining work)**
- [ ] Task 2.1: Replace Mock Data (3-4 hours)
- [ ] Task 2.2: Complete Wallet Integration (3 hours)
- [ ] Task 2.3: Implement AI Features Fully (4 hours)

**Deployment (10% of remaining work)**
- [ ] Task 3.1: Complete Environment Config (1 hour)
- [ ] Task 3.2: Setup Production Deployment (2-3 hours)
- [ ] Task 3.3: Implement Monitoring (2 hours)

**Security & Testing (8% of remaining work)**
- [ ] Task 4.1: Security Hardening (2-3 hours)
- [ ] Task 4.2: End-to-End Testing (3-4 hours)

**Documentation (2% of remaining work)**
- [ ] Task 5.1: API Documentation (2 hours)
- [ ] Task 5.2: User Documentation (2 hours)

**Estimated Total Time**: 35-45 hours to completion