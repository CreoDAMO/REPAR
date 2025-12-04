# Aequitas Protocol ($REPAR) - The Justice Machine

## Overview

The Aequitas Protocol is a sovereign Layer-1 blockchain ($REPAR is the native coin) designed to enforce $131 trillion in reparations for the transatlantic slave trade. It provides complete economic, technical, and governance sovereignty, ensuring resilience against shutdown or censorship. The protocol is founded on a 205-page forensic audit establishing historical facts, economic liabilities, and a legal framework based on international law. It aims for universal accountability across over 200 entities, integrates a strategic defense system, and seeks to transform reparations enforcement into a mathematical protocol, establishing a sovereign digital jurisdiction under Natural Law and Technological Law. The project envisions a digital sovereign nation for 300 million people. This is the first operational Sovereign Digital Nation in human history, serving its descendants with mathematically unkillable infrastructure, autonomous constitutional governance, post-quantum security, self-funding economics, automated legal enforcement, and software-defined territory.

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

The Aequitas Protocol uses a React, Vite, and Tailwind CSS frontend and a backend powered by Aequitas Zone, a Cosmos SDK Layer-1 blockchain.

### UI/UX Decisions

The frontend offers dashboards, data explorers for defendants and evidence, transactional systems for claims and governance, AI analytics, deployment verification, and a Block Explorer (Dexplorer). The UI reflects a constellation-first architecture.

### Technical Implementations

- **Frontend**: React, Vite, Tailwind CSS.
- **Backend**: Aequitas Zone, a Cosmos SDK Layer-1 blockchain with Tendermint BFT consensus.
  - **Native Coin**: $REPAR, total supply of 131 trillion.
  - **Core Modules**: `x/defendant`, `x/justice` (deflationary burn), `x/claims` (arbitration & IPFS), `x/distribution`, `x/dex` (Founder Wallet DEX), `x/threatdefense` (Chaos Defense system).
- **Concentrated Audit System**: Calculates defendant-specific liability with cryptographic proof (ML-DSA signatures) for entities based on historical principal and compound interest, including blockchain anchoring and legal defense countermeasures.
- **APEX System**: A sovereign AI architecture for Autonomous Prosecution & Enforcement, featuring:
    - **Constitutional AI Enforcement**: 25 immutable axioms guide system behavior.
    - **Cyber Reasoning System**: Python AST parsing for real-time vulnerability detection and AI verification.
    - **Local LLM Ensemble**: Offline, sovereign AI models (Llama 3.1 8B, Mistral 7B, Phi-3 Mini, DeepSeek Coder) for reasoning and technical tasks.
    - **ROS2 Swarm Robotics**: Decentralized control of 10,000+ autonomous drones for various missions.
    - **Fully Homomorphic Encryption (FHE)**: APEX-FHE v3.0 Frontier for advanced encrypted autonomy.
    - **Multi-Layer Redundant Communications**: Mesh, Satellite (Starlink/Iridium), LoRa, Cellular 5G, and Offline Queue.
- **Aequitas Autonomous AI Agent (Go)**: Provides continuous security scanning, AI-powered threat analysis, automatic vulnerability fixing, and chaos engineering.
- **Aequitas Satellite Protocol (ASSP)**: Software-defined satellite layer for multi-layer routing, geo-redundancy, and autonomous constellation management (self-healing, self-monitoring, self-scaling).

### System Design Choices

- **Infrastructure**: Distributed node architecture with Mobile Light Nodes, Home/Raspberry Pi Validators, and Cloud Core Validators, aiming for over 11,000 nodes, with Sovereign VM infrastructure for local hardware deployment.
- **Legal & Enforcement Framework**: Multi-layered constitutional protection rooted in Natural Law, with automated cease-and-desist countermeasures.
- **Security - APEX-PRIMARY Architecture**: Employs a sovereign-first model where the APEX System (local, 100% offline LLMs) is primary and required for security auditing and operation.
- **Constitutional Foundation**: The Digital Declaration of International Economic Sovereignty is cryptographically bound to the blockchain's genesis block.
- **Sovereignty**: Emphasizes no dependency on external AI APIs, local KVM infrastructure + offline LLM models, a network abstraction layer with automatic failover for censorship resistance, and Post-Quantum Cryptography using ML-KEM (Kyber) and ML-DSA (Dilithium).

## External Dependencies

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React, cryptocons
- **Blockchain SDK**: Cosmos SDK
- **Decentralized Storage**: IPFS
- **AI/ML**: Llama 3.1 8B, Mistral 7B, Phi-3 Mini, DeepSeek Coder (all local, offline, sovereign)
- **Optional AI Enhancements**: NVIDIA NIM, Anthropic APIs, OpenAI
- **Wallet Integration**: Keplr
- **Fully Homomorphic Encryption**: TenSEAL (CKKS/BFV schemes) + APEX-FHE v3.0 frontier components
- **Cryptography**: ML-DSA (Dilithium-3), ML-KEM (Kyber-768), SHA-256
- **Payment Processing**: Circle USDCKit SDK
- **Wolfram Documentation**: Strategic playbooks for defendant collection, deterrence economics, mathematical engines

## Recent Changes (December 4, 2025)

### Terminology Audit Complete
- Replaced all "token/tokenomics" references with "coin/coinomics" across 15+ files
- REPAR is a NATIVE COIN (like ETH on Ethereum), not a token
- DNS subdomain changed from `tokenomics.` to `coinomics.`
- AI sentiment prompts updated to reference "REPAR coin"

### Genesis Deflationary Enforcement
- CRITICAL: Removed all "minter" permissions from module accounts
- All 5 module accounts (descendant_fund, claims_fund, founderendowment, enforcement_treasury, foundation_treasury) now have "burner" only permissions
- Genesis descriptions updated to state "100% deflationary. Burns only, no minting."
- Applies to: all 4 genesis files (mainnet/testnet in both chain-config and bin directories)

### Micro-Denomination Alignment (Triple-Verified)
- All 4 genesis files now have consistent denomination structure:
  - `urepar` (base, exponent 0) - blockchain internal
  - `mrepar` (exponent 3) - milli-REPAR
  - `repar` (exponent 6) - display unit (what users see)
- All balances/supply now use `urepar` denom with amounts scaled ×10^6
- Total supply: 131,000,000,000,000,000,000 urepar = 131T REPAR (display)
- Supports micropayments as low as ~$0.00001833 (1 urepar)

### Keplr Registry CI Fix Documented
- Issue 5 added to GITHUB_WORKFLOW_FIXES.md
- Fix: `mkdir -p keplr-chain-registry/cosmos` before JSON write
- Keplr JSON uses correct `urepar` base denomination with 6 decimals

### Economic Model Preserved
- Total supply: 131 trillion REPAR (unchanged)
- Zero inflation from genesis block 0
- Supply can only decrease through Justice Burn mechanism
- Value preservation at $18.33/REPAR peg with enforcement

### External AI Verification (December 4, 2025)
- ChatGPT 5, DeepSeek, and Claude Sonnet 4.5 triple-verified:
  - ✅ No minter permissions remain (burner-only)
  - ✅ Terminology consistent (native coin, not token)
  - ✅ Micro-denomination structure aligned across all genesis files
  - ✅ Economic integrity mathematically guaranteed