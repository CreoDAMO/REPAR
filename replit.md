# Aequitas Protocol ($REPAR)

## Overview

The Aequitas Protocol is a sovereign Layer-1 blockchain platform designed to enforce global reparations for the transatlantic slave trade. This web application frontend provides access to the forensic audit, defendant database, transparency ledger, and $REPAR coinomics. Its purpose is to serve as the operational interface for the Forensic Audit Explorer, Defendant Database, Transparency Ledger, and $REPAR Coinomics. The project aims to establish a restitution enforcement system based on mathematically provable and legally sound documentation of $131 trillion in harm, enforceable across 172 NYC Convention jurisdictions.

## User Preferences

- **Coding Style**: Clean, functional React components with clear separation of concerns
- **Documentation**: Comprehensive inline documentation for complex logic
- **Sovereignty Focus**: Always emphasize that $REPAR is a native coin, not a token - this is critical to the legal and technical strategy

## System Architecture

The frontend is built with React 18+ and Vite, styled using Tailwind CSS 3.x, and uses React Router DOM for navigation and Recharts for data visualization. Key components include `Dashboard.jsx`, `ForensicAudit.jsx`, `Defendants.jsx`, `TransparencyLedger.jsx`, `IFRSystem.jsx`, `GRCOversight.jsx`, `DAOGovernance.jsx`, and `AIAnalytics.jsx`. Core features include a searchable defendant database with an Evidence Explorer (Chain of Guilt visualizer with IPFS integration), an International Forensic Registry, Governance, Risk & Compliance oversight, DAO voting, and an NVIDIA AI-powered analytics dashboard. The system also includes an IPFS-based arbitration demand filing system.

The backend is a Cosmos SDK-based Layer-1 blockchain named Aequitas Zone, featuring a custom `x/repar` module for reparations logic and a total supply of 131 trillion $REPAR configured in genesis. The project employs a multi-layered legal strategy based on genocide classification, money laundering frameworks, unjust enrichment, and UCC commercial law.

The project structure is organized with `components/` for reusable UI, `pages/` for main application views, `data/` for static data, and `utils/` for helper functions.

## External Dependencies

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.x
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Blockchain SDK**: Cosmos SDK (for Aequitas Zone blockchain)
- **Decentralized Storage**: IPFS (for evidence and claims)
- **AI/ML**: NVIDIA (for AI analytics dashboard)
- **Wallet Integration**: Keplr (planned, for Cosmos native), Coinbase Wallet (planned, requires Ethermint for EVM compatibility), MetaMask (planned)
- **Version Control**: Git
- **CI/CD**: GitHub Actions