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
- **Wallet Integration**: Coinbase Wallet SDK (planned)

### Key Components
- `pages/Dashboard.jsx` - Main dashboard with statistics and $REPAR coinomics
- `pages/ForensicAudit.jsx` - Interactive forensic audit explorer
- `pages/Defendants.jsx` - Searchable defendant database
- `pages/TransparencyLedger.jsx` - Public enforcement actions ledger
- `components/Navigation.jsx` - Main navigation bar
- `components/StatCard.jsx` - Reusable statistics card component

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

### October 11, 2025 - Initial MVP Implementation

**Application Built**:
- Complete React/Vite frontend with 4 main pages (Dashboard, Forensic Audit, Defendants, Transparency Ledger)
- Interactive data visualizations using Recharts
- Responsive design with Tailwind CSS
- Configured for Replit deployment

**Critical Terminology Update**:
- **Directive**: Changed all references from "$REPAR token" to "$REPAR coin" and "Token Economics" to "Coinomics"
- **Rationale**: $REPAR is the native asset of a sovereign Layer-1 blockchain (Cosmos SDK), not a token on another chain. This distinction is fundamental to the protocol's sovereignty and legal strategy.

**Files Created/Updated**:
- `frontend/src/data/statistics.js` - Core statistics and coin allocation data
- `frontend/src/data/defendants.js` - Defendant database with 8 sample entries
- `frontend/src/pages/Dashboard.jsx` - Main dashboard with $REPAR Coinomics
- `frontend/src/pages/ForensicAudit.jsx` - Interactive audit explorer
- `frontend/src/pages/Defendants.jsx` - Searchable defendant database
- `frontend/src/pages/TransparencyLedger.jsx` - Public enforcement ledger
- `docs/REPAR_Coin_Classification_Directive.md` - Official terminology directive

See: `docs/REPAR_Coin_Classification_Directive.md` for full details.

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

## Documentation

All project documentation is in the `docs/` folder:
- `Building_REPAR.md` - Comprehensive build documentation and application architecture
- `TAST_Full_Audit_&_Arbitration_By-Jacque_Antoine_DeGraff.md` - Complete 205-page forensic audit
- `REPAR_Coin_Classification_Directive.md` - Official terminology directive

## Roadmap

### Phase 1: Foundation (Q4 2025)
- ✅ Frontend application deployed
- 🔄 Testnet launch
- 🔄 Security audits
- 🔄 Coinbase SDK integration

### Phase 2: Enforcement (Q1 2026)
- $REPAR LBP & Mainnet launch
- First real-world arbitration cases filed
- Initial filings against Barclays, Lloyd's, JPMorgan

### Phase 3: Scale (Q2-Q4 2026)
- NVIDIA AI module integration
- DAO governance launch
- First asset seizures & distributions

## Contact & Resources

- **Website**: https://repar.network (planned)
- **Documentation**: https://docs.repar.network (planned)
- **X (Twitter)**: @REPARProtocol
- **Discord**: https://discord.gg/repar (planned)

---

**Built with ❤️ for justice | Powered by Cosmos SDK, Coinbase, & NVIDIA**

*This is not an investment. This is restitution.*
