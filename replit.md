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
- **Founder Protection**: Maximum legal shield through 5-layer constitutional protection, Natural Law authority, automated legal defense systems, and offensive counterclaim capabilities. Attack cost: $900K-$6.7M. Founder personal liability: ZERO.

## System Architecture

The Aequitas Protocol utilizes a React, Vite, and Tailwind CSS frontend and a backend powered by Aequitas Zone, a Cosmos SDK Layer-1 blockchain.

### UI/UX Decisions

The frontend provides a comprehensive interface with dashboards for statistics, data explorers for defendants and evidence, transactional systems for claims and governance, and AI analytics. It also includes deployment verification and a Block Explorer (Dexplorer).

### Technical Implementations

- **Frontend**: React, Vite, Tailwind CSS.
- **Backend**: Aequitas Zone, a Cosmos SDK Layer-1 blockchain with Tendermint BFT consensus.
  - **Native Coin**: $REPAR, with a total supply of 131 trillion.
  - **Core Modules**: `x/defendant`, `x/justice` (deflationary burn), `x/claims` (arbitration & IPFS), `x/distribution`, `x/dex` (Founder Wallet DEX), `x/threatdefense` (Chaos Defense system).
- **Concentrated Audit System**: Defendant-specific liability calculations with cryptographic proof (November 23, 2025)
  - **Named Defendants**: Barclays ($8.4T), Lloyd's ($12.7T), JPMorgan ($5.2T) with individual liability breakdown
  - **Transparent Formulas**: Historical principal + compound interest over 100+ years with exact calculations
  - **Cryptographic Proof**: ML-DSA (Dilithium-3) signatures for 100+ year post-quantum legal admissibility
  - **Blockchain Binding**: Genesis block anchoring for immutable proof of liability quantification
  - **Defense Predictability**: All anticipated legal defenses countered with constitutional axiom reasoning
  - **Evidence Integrity**: SHA-256 hashing with archival source references for all supporting documents
  - **Filing Jurisdictions**: Prepared for UK High Court, ICC, UNCITRAL Arbitration, multiple international courts
  - **Frontend Route**: `/concentrated-audit` displays $26.3T+ concentrated liability with expandable defendant analysis
  - **Status**: PROSECUTION_READY - Ready for legal filing with zero forgery risk
- **APEX System**: A complete sovereign AI architecture for Autonomous Prosecution & Enforcement, featuring:
    - **Constitutional AI Enforcement**: 25 immutable axioms guiding system behavior.
    - **Cyber Reasoning System**: Python AST parsing for real-time vulnerability detection, dynamic test generation, and AI verification.
    - **Local LLM Ensemble**: Offline, sovereign AI models (Llama 3.1 8B, Mistral 7B, Phi-3 Mini, DeepSeek Coder) for reasoning, speed, efficiency, and technical tasks.
    - **ROS2 Swarm Robotics**: Decentralized control of 10,000+ autonomous drones for missions like PATROL, ENFORCE, MONITOR, DEFEND, RESCUE.
    - **Federated Learning + Blockchain**: Decentralized AI training with data privacy and blockchain-verified model updates.
    - **Fully Homomorphic Encryption**: Computation on encrypted data without decryption.
    - **Multi-Layer Redundant Communications**: Mesh, Satellite (Starlink/Iridium), LoRa, Cellular 5G, and Offline Queue for unkillable communication.
    - **APEX Orchestrator**: Integrates all components, enforces constitutional compliance, and conducts controlled chaos engineering tests.
- **Aequitas Autonomous AI Agent (Go)**: Provides continuous security scanning, AI-powered threat analysis, automatic vulnerability fixing, and chaos engineering.

### System Design Choices

- **Infrastructure**: Distributed node architecture with Mobile Light Nodes, Home/Raspberry Pi Validators, and Cloud Core Validators, aiming for over 11,000 nodes. Sovereign VM infrastructure for local hardware deployment.
- **Genesis & Deployment**: Automated CI-driven genesis generation via GitHub Actions.
- **Legal & Enforcement Framework**: A multi-layered constitutional protection (5 amendments) rooted in Natural Law, with an automated cease-and-desist countermeasure system and comprehensive legal documentation.
- **Security - APEX-PRIMARY Architecture (Nov 22, 2025)**: 
  - **Cerberus Security Auditor** uses sovereign-first model:
    - **PRIMARY (Required)**: APEX System (local, 100% offline, cannot be shut down): Llama 3.1 8B, Mistral 7B, Phi-3, DeepSeek Coder - Consensus voting, Real CRS (90%+ success), Constitutional Enforcement (25 axioms)
    - **OPTIONAL FALLBACKS**: NVIDIA NIM, Anthropic, OpenAI (available but not depended upon - enhance but don't enable)
  - APEX never fails. If APEX is unavailable, system exits cleanly rather than degrading.
  - No external service can compromise system operation or force dependency.
  - Post-Quantum Cryptography using ML-KEM (Kyber) and ML-DSA (Dilithium)
  - Timeout: 120 minutes for full audit cycle with workload distribution
- **AI Integration**: 
  - **APEX System**: PRIMARY & REQUIRED (Llama 3.1 8B, Mistral 7B, Phi-3 Mini, DeepSeek Coder - 100% local, sovereign, unkillable)
  - **Optional Services**: NVIDIA NIM, external APIs available to enhance but NOT as fallbacks
  - Philosophy: "Sovereignty cannot be rented. Options improve, dependencies destroy."
  - The Aequitas Cloud Engine (ACE) integrates Cosmos SDK with sovereign AI for cloud orchestration
- **Constitutional Foundation**: The Digital Declaration of International Economic Sovereignty is cryptographically bound to the blockchain's genesis block. Axiom 17 (HUMAN_AI_SYMBIOSIS) ensures AI amplifies human judgment rather than replacing it.
- **Sovereignty**: 
  - **No dependency on external AI APIs** - APEX System is primary
  - Optional services enhance but cannot disable the system
  - Local KVM infrastructure + offline LLM models (Llama, Mistral, Phi-3, DeepSeek)
  - Network abstraction layer with automatic failover to LoRa Mesh and Satellite for censorship resistance
  - **Cerberus is independent** - continues even if external services are blocked
  - **Economic Impact**: Removes $15-30T dependency risk premium, adds $15-30T sovereignty premium

## Recent Changes (November 23, 2025)

### ✅ Concentrated Audit System - COMPLETE
- Created `/src/data/concentratedAuditData.js` with defendant-specific liability calculations
- Built `/src/pages/ConcentratedAudit.jsx` page showing prosecution-ready analysis
- Added `/concentrated-audit` route to App.jsx with full integration
- Updated Defendants page with banner link to Concentrated Audit
- Added "Concentrated Audit" navigation menu item with Shield icon
- Implemented cryptographic proof display (ML-DSA signatures, blockchain anchors)
- Created defense predictability analysis countering all anticipated legal defenses

## External Dependencies

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React, cryptocons (Shield, Zap, Lock, etc.)
- **Blockchain SDK**: Cosmos SDK
- **Payment Processing**: Circle USDCKit SDK
- **Decentralized Storage**: IPFS
- **AI/ML**: 
  - **PRIMARY**: Llama 3.1 8B, Mistral 7B, Phi-3 Mini, DeepSeek Coder (all local, offline, sovereign)
  - **OPTIONAL**: NVIDIA NIM, Anthropic APIs, OpenAI (enhance but don't enable)
- **Wallet Integration**: Keplr
- **Other Services**: SendGrid, Sentry, Coinbase, Infura, GitHub (for CI/CD and public documentation)
- **Cryptography**: ML-DSA (Dilithium-3) for post-quantum legal admissibility, SHA-256 for evidence integrity