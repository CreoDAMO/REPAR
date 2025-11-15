# Aequitas Protocol ($REPAR) - The Justice Machine

## Overview

The Aequitas Protocol is a sovereign Layer-1 blockchain ($REPAR is the native coin) designed to enforce $131 trillion in reparations for the transatlantic slave trade. Its core purpose is to provide complete economic, technical, and governance sovereignty, ensuring resilience against shutdown or censorship. The protocol is founded on a 205-page forensic audit, establishing historical facts, tracing economic liabilities, and outlining a legal framework based on international law. It aims for universal accountability across over 200 entities and integrates a strategic defense system. The project seeks to transform reparations enforcement into a mathematical protocol, establishing a sovereign digital jurisdiction under Natural Law and Technological Law, envisioning a digital sovereign nation for 300 million people.

## User Preferences

- **Coding Style**: Clean, functional React components with clear separation of concerns
- **Documentation**: Comprehensive inline documentation for complex logic
- **Sovereignty Focus**: Always emphasize $REPAR as native coin, NOT a token
- **Security-First**: Implement chaos defense patterns and threat detection
- **Legal Compliance**: FRE 901 evidence standards for all records
- **Multi-Wallet Support**: Keplr (recommended for full features), MetaMask (EVM), Coinbase Wallet
- **Terminology**: Use "black paper" (NOT "white paper") for project documentation - intentional choice reflecting project's mission
- **Digital Sovereign Nation**: This is a nation of 300M people (12-15M enslaved + descendants), not a corporate project. Nations are defined by people, not policies. Counter Willie Lynch divide-and-conquer tactics through unified blockchain infrastructure.
- **Censorship Resistance**: Mobile validators with satellite/mesh fallback. Cannot be shut down by any single government or corporation.
- **Licensing**: 14-license framework protects sovereignty at legal, technical, and cultural levels. All implementations are OPERATIONAL (ThreatOracle, Cerberus AI, etc.)

## System Architecture

The Aequitas Protocol utilizes a React, Vite, and Tailwind CSS frontend and a backend powered by Aequitas Zone, a Cosmos SDK Layer-1 blockchain.

### UI/UX Decisions

The frontend provides a comprehensive interface with dashboards for statistics, data explorers for defendants and evidence, transactional systems for claims and governance, and AI analytics. It also includes deployment verification and a Block Explorer (Dexplorer).

### Technical Implementations

- **Frontend**: React, Vite, Tailwind CSS.
- **Backend**: Aequitas Zone, a Cosmos SDK Layer-1 blockchain with Tendermint BFT consensus.
  - **Native Coin**: $REPAR, with a total supply of 131 trillion.
  - **Core Modules**: `x/defendant`, `x/justice` (deflationary burn), `x/claims` (arbitration & IPFS), `x/distribution`, `x/dex` (Founder Wallet DEX), `x/threatdefense` (Chaos Defense system).

### System Design Choices

- **Infrastructure**: Distributed node architecture with Mobile Light Nodes, Home/Raspberry Pi Validators, and Cloud Core Validators. This multi-tiered approach targets over 11,000 nodes for resilience and community ownership. Sovereign VM infrastructure allows deployment on local hardware with automated provisioning and significant cost savings.
- **Genesis & Deployment**: Automated CI-driven genesis generation via GitHub Actions with a canonical JSON allocation structure for $REPAR.
- **Legal & Enforcement Framework**: Multi-layered strategy combining international law, Black's Law, UCC Article 9, and international arbitration.
- **Security**: The Cerberus Auditor System, a multi-agent AI, continuously audits for vulnerabilities.
- **AI Integration**: Extensive use of NVIDIA NIM models for search, risk scoring, investment recommendations, and NFT generation, replacing external AI APIs for sovereignty and cost reduction. The Aequitas Cloud Engine (ACE) integrates Cosmos SDK with NVIDIA NIM AI for sovereign cloud orchestration.
- **Constitutional Foundation**: The Digital Declaration of International Economic Sovereignty is cryptographically bound to the blockchain's genesis block.
- **Sovereignty**: Complete independence from cloud providers and external AI APIs through local KVM infrastructure and NVIDIA NIM for AI. Network abstraction layer with automatic failover to LoRa Mesh and Satellite for censorship resistance.

## External Dependencies

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React, cryptocons
- **Blockchain SDK**: Cosmos SDK
- **Payment Processing**: Circle USDCKit SDK
- **Decentralized Storage**: IPFS
- **AI/ML**: NVIDIA NIM (sovereign, self-hostable)
- **Wallet Integration**: Keplr
- **Other Services**: SendGrid, Sentry, Coinbase, Infura, GitHub

**Sovereignty Status**: Infrastructure (self-hosted VMs) + AI (NVIDIA NIM on-premises) = **Zero mandatory cloud dependencies**