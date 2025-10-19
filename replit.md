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
- **Defendant Database**: Searchable registry with liability tracking.
- **Evidence Explorer**: Chain of Guilt visualizer with IPFS integration.
- **Forensic Audit**: Explorer for the 205-page audit with compound interest calculations.
- **Claims System**: Arbitration demand filing across 172 jurisdictions.
- **DAO Governance**: Reputation-based, time-weighted voting.
- **Transparency Ledger**: Global Reparations Ledger.
- **AI Analytics**: NVIDIA-powered threat detection and analytics.
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

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.x
- **Charts**: Recharts
- **Icons**: Lucide React, cryptocons (with fallback handling)
- **Blockchain SDK**: Cosmos SDK
- **Payment Processing**: Circle USDCKit SDK (for USDC payments)
- **Decentralized Storage**: IPFS
- **AI/ML**: NVIDIA (for AI analytics dashboard)
- **Wallet Integration**: Keplr (for Cosmos native)