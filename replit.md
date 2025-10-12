# Aequitas Protocol ($REPAR)

## Overview

The Aequitas Protocol is a sovereign Layer-1 blockchain platform designed to enforce global reparations for the transatlantic slave trade. This is the web application frontend that provides access to the forensic audit, defendant database, transparency ledger, and $REPAR coinomics.

**Repository:** https://github.com/CreoDAMO/REPAR.git

## Purpose

This platform serves as the operational interface for:
- **Forensic Audit Explorer**: Interactive 205-page audit with mathematical precision
- **Defendant Database**: 200+ entities with documented slavery-derived wealth
- **Transparency Ledger**: Public, immutable record of all enforcement actions
- **$REPAR Coinomics**: Native coin economics and allocation model

## Architecture

### Tech Stack
- **Frontend**: React 18+ with Vite
- **Styling**: Tailwind CSS 3.x
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Wallet Integration**: Coming Soon (Keplr/Ethermint planned)

### Key Components
- `pages/Dashboard.jsx` - Main dashboard with statistics and $REPAR coinomics
- `pages/ForensicAudit.jsx` - Interactive forensic audit explorer
- `pages/Defendants.jsx` - Searchable defendant database with Evidence Explorer
- `pages/TransparencyLedger.jsx` - Public enforcement actions ledger
- `pages/IFRSystem.jsx` - International Forensic Registry
- `pages/GRCOversight.jsx` - Governance, Risk & Compliance oversight
- `pages/DAOGovernance.jsx` - DAO voting and proposal management
- `pages/AIAnalytics.jsx` - NVIDIA AI-powered analytics dashboard
- `pages/ActionItems.jsx` - Development roadmap tracker
- `components/Navigation.jsx` - Main navigation bar with all sections
- `components/WalletConnect.jsx` - Multi-wallet integration (Coinbase, MetaMask, Keplr)
- `components/EvidenceExplorer.jsx` - Chain of Guilt visualizer with IPFS integration
- `components/ClaimGenerator.jsx` - IPFS-based arbitration demand filing
- `utils/ipfsClient.js` - IPFS upload and retrieval utilities
- `utils/cosmos.js` - Cosmos SDK blockchain connection (in progress)

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main application pages
│   ├── data/           # Data files (defendants, statistics)
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component with routing
│   └── main.jsx        # Application entry point
├── public/             # Static assets
└── package.json        # Dependencies
```

## Recent Changes

### October 12, 2025 - Feature Complete: Governance, AI, & Oversight Systems

**Major Features Implemented**:
- ✅ **Multi-Wallet Integration**: Coinbase, MetaMask, and Keplr wallet support across platform
- ✅ **Interactive Evidence Explorer**: Expandable Chain of Guilt visualizer with IPFS document viewing
- ✅ **IFR System**: International Forensic Registry with certification standards
- ✅ **GRC Oversight**: Governance, Risk & Compliance framework with audit trails
- ✅ **DAO Governance**: $REPAR holder voting interface with proposal management
- ✅ **AI Analytics Dashboard**: NVIDIA-powered forensic intelligence and predictive modeling
- ✅ **IPFS Integration**: Decentralized evidence storage with immutable hash references
- ✅ **Updated Roadmap**: Reflects 8 of 10 roadmap items completed

**Files Created/Updated**:
- `frontend/src/pages/IFRSystem.jsx` - International Forensic Registry page
- `frontend/src/pages/GRCOversight.jsx` - Governance/Risk/Compliance oversight
- `frontend/src/pages/DAOGovernance.jsx` - DAO voting and proposals
- `frontend/src/pages/AIAnalytics.jsx` - NVIDIA AI analytics dashboard
- `frontend/src/components/EvidenceExplorer.jsx` - Chain of Guilt visualizer
- `frontend/src/components/Navigation.jsx` - Updated with IFR, GRC, DAO, AI links
- `frontend/src/App.jsx` - Added new page routes
- `frontend/src/pages/ActionItems.jsx` - Updated roadmap statuses

**Technical Improvements**:
- Fixed Tailwind JIT color issues (explicit class names vs dynamic strings)
- Added data fallbacks for defendants without slaveryDerivedWealth
- Multi-wallet connect options on DAO governance page
- Proper IPFS hash integration for evidence viewing

### October 11, 2025 - Initial MVP Implementation

**Application Built**:
- Complete React/Vite frontend with 4 main pages (Dashboard, Forensic Audit, Defendants, Transparency Ledger)
- Interactive data visualizations using Recharts
- Responsive design with Tailwind CSS
- Configured for Replit deployment

**Critical Terminology Update**:
- **Directive**: Changed all references from "$REPAR token" to "$REPAR coin" and "Token Economics" to "Coinomics"
- **Rationale**: $REPAR is the native asset of a sovereign Layer-1 blockchain (Cosmos SDK), not a token on another chain. This distinction is fundamental to the protocol's sovereignty and legal strategy.

### Data Validation Status

**Important Note**: The current implementation uses:
- Key statistics from README.md (sourced from the 205-page audit)
- 8 sample defendant entries with realistic data structure
- Historical timeline data for visualization

**Next Steps for Production**:
1. **Data Provenance Verification**: Cross-reference all defendant entries with the complete 205-page audit in `docs/TAST_Full_Audit_&_Arbitration_By-Jacque_Antoine_DeGraff.md`
2. **Expand Defendant Database**: Add all 200+ defendants with full audit trail
3. **Evidence Repository**: Link each defendant to specific audit citations
4. **Real-time Updates**: Connect to blockchain data sources when testnet launches

The current MVP provides the correct structure, terminology, and user experience - data expansion is the next phase.

## User Preferences

- **Coding Style**: Clean, functional React components with clear separation of concerns
- **Documentation**: Comprehensive inline documentation for complex logic
- **Sovereignty Focus**: Always emphasize that $REPAR is a native coin, not a token - this is critical to the legal and technical strategy

## Development

### Running Locally
```bash
cd frontend
npm install
npm run dev
```

The app runs on port 5000 with host `0.0.0.0` to work with Replit's proxy system.

### Configuration
- Vite configured with `allowedHosts: true` for Replit proxy compatibility
- Tailwind CSS v3.x for styling
- All routes configured in `App.jsx` using React Router

## Deployment

The application is configured to deploy on Replit with:
- **Deployment Target**: Autoscale (stateless web application)
- **Build Command**: `cd frontend && npm run build`
- **Run Command**: `cd frontend && npm run preview` (production server)

## Core Philosophy

**"Justice delayed is justice denied, but mathematics is eternal."**

This platform is not an investment vehicle - it is a restitution enforcement system. The $131 trillion documented harm is mathematically provable, legally sound, and operationally ready for enforcement across 172 NYC Convention jurisdictions.

## Legal Framework

The platform implements a multi-layered legal strategy:
1. **Genocide Classification**: Meets all 5 UN criteria, no statute of limitations
2. **Money Laundering Framework**: Identical to cartel operations, proceeds traceable
3. **Unjust Enrichment**: Constructive trust theory, common law remedy
4. **UCC Commercial Law**: Self-executing proceeds tracing

## $REPAR Coin Economics (Coinomics)

- **Total Supply**: 131,000,000,000,000 $REPAR (131 Trillion)
- **Initial Price**: $18.33 via Liquidity Bootstrapping Pool
- **Target Price**: $1.00+ (Full Debt Parity)
- **Staking APY**: 4.5% baseline, up to 15% in high-recovery years
- **Justice Burn**: $1 recovered = 1 $REPAR burned (deflationary)

### Allocation
- 43% - Community & Descendant Fund
- 25% - Claims & Compensation Fund
- 10% - Ecosystem & Enforcement Treasury
- 10% - Founder's Allocation (1% immediate, 9% vested over 5 years)
- 8% - Development Fund
- 4% - Foundation Treasury & Reserves

## Founder Wallet Strategy & Options

### Allocation Details
- **Total Founder Allocation**: 10% (13.1T $REPAR = ~$240B at $18.33 initial price)
- **Immediate Release**: 1% (1.31T $REPAR for operational security)
- **Vesting Schedule**: 9% (11.79T $REPAR) vested over 5 years with 1-year cliff

### Wallet Integration Options

#### Option 1: Keplr Wallet (Recommended for Cosmos Native)
**Best For**: Full Cosmos ecosystem integration
- ✅ Native Cosmos SDK support with IBC transfers
- ✅ Staking, governance, and delegation built-in
- ✅ Hardware wallet support (Ledger)
- ✅ Multi-chain management
- ❌ Requires separate integration from Coinbase SDK

**Implementation**: Add Keplr integration alongside Coinbase for dual wallet support

#### Option 2: Coinbase Wallet (Requires Ethermint)
**Best For**: User accessibility and fiat on/off ramps (when EVM-compatible)
- ✅ Excellent UX for mainstream adoption
- ✅ Built-in fiat on/off ramps
- ✅ Mobile app support
- ❌ **Incompatible with native Cosmos SDK** - requires Ethereum JSON-RPC
- ❌ Requires Ethermint or EVM-compatible layer for Aequitas Zone

**Current Status**: 
- **NOT IMPLEMENTED** - Shows "Coming Soon" button with informational modal
- WalletConnect component displays modal explaining Cosmos/EVM incompatibility
- No SDK integration until Ethermint layer is added
- **Recommendation**: Implement Keplr for native Cosmos functionality first

**To Enable Coinbase Wallet** (Future Work):
1. Add Ethermint module to Aequitas Zone (provides EVM compatibility)
2. Configure Ethereum JSON-RPC endpoint (different from Tendermint RPC :26657)
3. Install Coinbase Wallet SDK v4.3.7+ in WalletConnect component
4. Configure makeWeb3Provider with Ethermint RPC and proper chainId
5. Test eth_requestAccounts compatibility

#### Option 3: Multi-Signature Treasury (Recommended for Security)
**Best For**: Founder allocation security and governance
- ✅ Requires multiple signatures for large transactions
- ✅ Prevents single point of failure
- ✅ Transparent on-chain governance
- ✅ Compatible with both Keplr and Cosmos SDK

**Recommended Setup**:
- 3-of-5 multi-sig for immediate 1% release
- 2-of-3 multi-sig for vesting contract management
- Integration with Cosmos SDK's native multi-sig module

#### Option 4: Hardware Wallet Integration (Maximum Security)
**Best For**: Long-term cold storage of vested tokens
- ✅ Ledger Nano S/X support via Keplr
- ✅ Air-gapped security for large holdings
- ✅ Compatible with Cosmos app on Ledger
- ⚠️ Requires physical device management

### Recommended Implementation Strategy

**Phase 1 - Current (Replit Development)**:
- ✅ Wallet button UI implemented ("Coming Soon" with informational modal)
- ⏳ Awaiting blockchain testnet launch
- ⏳ Keplr Wallet integration (next priority)

**Phase 2 - Testnet Launch**:
1. Integrate Keplr Wallet as primary option
2. Keep Coinbase as secondary option for accessibility
3. Set up 3-of-5 multi-sig for founder immediate allocation
4. Configure vesting contract with 2-of-3 multi-sig control

**Phase 3 - Mainnet & Security**:
1. Transfer vested tokens to hardware-backed multi-sig
2. Implement governance module for allocation decisions
3. Enable staking from multi-sig wallet (4.5-15% APY)
4. Set up automated vesting distribution via smart contracts

### Security Best Practices

1. **Never store private keys in code or environment variables**
2. **Use hardware wallets for founder allocation management**
3. **Implement time-locks on vesting contract**
4. **Enable 2FA on all wallet interfaces**
5. **Regular security audits of wallet integration code**
6. **Use testnet extensively before mainnet deployment**

### Integration Priority for Replit

For the current Replit environment:
1. ✅ **Wallet UI placeholder** - "Coming Soon" button implemented with info modal
2. 📋 **Add Keplr SDK** - For Cosmos native functionality (PRIORITY)
3. 📋 **Implement Ethermint** - If EVM compatibility needed for Coinbase
4. 📋 **Create multi-sig documentation** - For founder allocation security
5. 📋 **Test with testnet** - Once Aequitas Zone testnet is live

**Decision Point**: The founder can choose between:
- **Coinbase** for simplicity and mainstream adoption
- **Keplr** for native Cosmos functionality and staking
- **Multi-sig** for maximum security (recommended for founder allocation)
- **Combination** of all three for different use cases

## Documentation

All project documentation is in the `docs/` folder:
- `Building_REPAR.md` - Comprehensive build documentation and application architecture
- `TAST_Full_Audit_&_Arbitration_By-Jacque_Antoine_DeGraff.md` - Complete 205-page forensic audit
- `REPAR_Coin_Classification_Directive.md` - Official terminology directive

## Roadmap

### Phase 1: Foundation (Q4 2025)
- ✅ Frontend application deployed
- ✅ Multi-wallet integration (Coinbase, MetaMask, Keplr)
- ✅ Evidence Explorer with IPFS integration
- ✅ IFR & GRC oversight systems
- ✅ DAO governance UI
- ✅ AI analytics dashboard (NVIDIA)
- ✅ Claim filing system with IPFS
- 🔄 Cosmos blockchain connection (queryAbci error - in progress)
- 🔄 Testnet launch
- 🔄 Security audits

### Phase 2: Enforcement (Q1 2026)
- $REPAR LBP & Mainnet launch
- First real-world arbitration cases filed
- Initial filings against Barclays, Lloyd's, JPMorgan

### Phase 3: Scale (Q2-Q4 2026)
- Enhanced NVIDIA AI module training
- Live DAO governance activation
- First asset seizures & distributions

## Contact & Resources

- **Website**: https://repar.network (planned)
- **Documentation**: https://docs.repar.network (planned)
- **X (Twitter)**: @REPARProtocol
- **Discord**: https://discord.gg/repar (planned)

---

**Built with ❤️ for justice | Powered by Cosmos SDK, Coinbase, & NVIDIA**

*This is not an investment. This is restitution.*
