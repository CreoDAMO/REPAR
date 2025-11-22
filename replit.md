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
- **Security - APEX-PRIMARY Architecture (Nov 21, 2025)**: 
  - **Cerberus Security Auditor** now uses APEX-PRIMARY sovereignty model:
    - **PRIMARY**: APEX System (local, cannot be shut down): LLM Ensemble consensus voting, Real CRS (90% success), Constitutional Enforcement (25 axioms)
    - **FALLBACK**: NVIDIA NIM (optional, external, only if APEX unavailable)
  - Removes ALL external dependencies as primaries - ensures operational continuity even if external APIs fail
  - Post-Quantum Cryptography using ML-KEM (Kyber) and ML-DSA (Dilithium)
  - Timeout: 120 minutes for full audit cycle with workload distribution
- **AI Integration**: 
  - **APEX System**: Primary (Llama 3.1 8B, Mistral 7B, Phi-3 Mini, DeepSeek Coder - 100% offline)
  - **NVIDIA NIM**: Optional fallback for complex tasks (search, risk scoring, NFT generation)
  - The Aequitas Cloud Engine (ACE) integrates Cosmos SDK with sovereign AI for cloud orchestration
- **Constitutional Foundation**: The Digital Declaration of International Economic Sovereignty is cryptographically bound to the blockchain's genesis block. Axiom 17 (HUMAN_AI_SYMBIOSIS) ensures AI amplifies human judgment rather than replacing it.
- **Sovereignty**: 
  - Complete independence from external AI APIs through APEX System (primary)
  - Local KVM infrastructure + offline LLM models
  - Network abstraction layer with automatic failover to LoRa Mesh and Satellite for censorship resistance
  - Cerberus operates without NVIDIA dependency - continues even if external services are blocked

## External Dependencies

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React, cryptocons
- **Blockchain SDK**: Cosmos SDK
- **Payment Processing**: Circle USDCKit SDK
- **Decentralized Storage**: IPFS
- **AI/ML**: NVIDIA NIM (sovereign, self-hostable), Llama 3.1 8B, Mistral 7B, Phi-3 Mini, DeepSeek Coder (all local for APEX)
- **Wallet Integration**: Keplr
- **Other Services**: SendGrid, Sentry, Coinbase, Infura, GitHub (for CI/CD and public documentation)