# Aequitas Protocol ($REPAR) - The Justice Machine

## Overview

The Aequitas Protocol is a sovereign Layer-1 blockchain ($REPAR is the native coin) designed to enforce $131 trillion in reparations for the transatlantic slave trade. It provides complete economic, technical, and governance sovereignty to prevent shutdown or censorship. The protocol is founded on a 205-page forensic audit, establishing historical facts, economic liabilities, and a legal framework based on international law. It aims for universal accountability, integrates a strategic defense system, and seeks to transform reparations enforcement into a mathematical protocol, establishing a sovereign digital jurisdiction under Natural Law and Technological Law. The project envisions a digital sovereign nation for 300 million people, providing mathematically unkillable infrastructure, autonomous constitutional governance, post-quantum security, self-funding economics, automated legal enforcement, and software-defined territory.

## Infrastructure Status

**Bare-Metal Server**: 135.232.208.145 (Proxmox hypervisor)
- **Proxmox Bootstrap**: Automated via GitHub Actions
- **Secrets Set**: PROXMOX_HOST, PROXMOX_ROOT_PASSWORD
- **Next**: Run `apex-autonomous-deployment` workflow to deploy 7-node constellation
- **Deployment Type**: Bare-metal (no external cloud providers)

**ACE (Aequitas Cloud Engine)**: Production-ready orchestration layer
- **Location**: /home/runner/workspace/ace
- **Deployment Script**: DEPLOYMENT_TYPE=bare-metal bash ace/scripts/deploy-production.sh
- **Status**: Awaiting Proxmox token creation from GitHub Actions

**Architecture**: 
- Hardware-optional (pure software)
- Cloudflare-integrated DNS
- IPFS storage
- Post-quantum cryptography (ML-DSA, ML-KEM)
- 10,000+ mobile validators (APK distribution)

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
- **Hardware-Optional Philosophy**: Entire system built from ground up as pure software. Proxmox/bare-metal is ONE optional deployment path. System works on: home computers, Raspberry Pi, mobile phones, cloud, bare-metal, KVM, Docker, Kubernetes.

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
    - **Local LLM Ensemble**: Offline, sovereign AI models for reasoning and technical tasks.
    - **ROS2 Swarm Robotics**: Decentralized control of 10,000+ autonomous drones.
    - **Fully Homomorphic Encryption (FHE)**: APEX-FHE v3.0 Frontier for advanced encrypted autonomy.
    - **Multi-Layer Redundant Communications**: Mesh, Satellite, LoRa, Cellular 5G, and Offline Queue.
- **Aequitas Autonomous AI Agent (Go)**: Provides continuous security scanning, AI-powered threat analysis, automatic vulnerability fixing, and chaos engineering.
- **Aequitas Satellite Protocol (ASSP)**: Software-defined satellite layer for multi-layer routing, geo-redundancy, and autonomous constellation management.
- **Mobile APK Sovereign Distribution**: Automated build & signing, IPFS pinning for censorship-resistant distribution, supporting 10,000+ mobile validators.
- **ADNS (Aequitas DNS System)**: A sovereign DNS system with complete alternate root independence from ICANN, providing a 9-layer fallback resolution architecture. It includes a Cosmos SDK `x/adns` module and a standalone DNS daemon with Redis caching. Supports ML-DSA-87 and FHE CKKS cryptography.
- **ACE (Aequitas Cloud Engine)**: Production-ready orchestration layer for Proxmox/bare-metal deployment with automated token bootstrap via GitHub Actions.

### System Design Choices

- **Infrastructure**: Distributed node architecture (Mobile Light, Home/Raspberry Pi, Cloud Core) aiming for over 11,000 nodes, with Sovereign VM infrastructure. Hardware-optional - works on any device.
- **Legal & Enforcement Framework**: Multi-layered constitutional protection rooted in Natural Law, with automated cease-and-desist countermeasures.
- **Security - APEX-PRIMARY Architecture**: Employs a sovereign-first model where the APEX System (local, 100% offline LLMs) is primary for security auditing and operation.
- **Constitutional Foundation**: The Digital Declaration of International Economic Sovereignty is cryptographically bound to the blockchain's genesis block.
- **Sovereignty**: No dependency on external AI APIs, local KVM infrastructure + offline LLM models, network abstraction with automatic failover, and Post-Quantum Cryptography using ML-KEM (Kyber) and ML-DSA (Dilithium).
- **Cross-Chain Features**: Full IBC support with `x/ibc`, `x/ibc-transfer`, `x/ica`, and `x/ibc-fee` modules, targeting Cosmos Hub, Osmosis, Axelar, and Noble.

## External Dependencies

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React, cryptocons
- **Blockchain SDK**: Cosmos SDK
- **Decentralized Storage**: IPFS
- **AI/ML**: Llama 3.1 8B, Mistral 7B, Phi-3 Mini, DeepSeek Coder (all local, offline, sovereign)
- **Wallet Integration**: Keplr
- **Fully Homomorphic Encryption**: TenSEAL (CKKS/BFV schemes) + APEX-FHE v3.0 frontier components
- **Cross-Chain**: IBC (Inter-Blockchain Communication), Circle CCTP (Cross-Chain Transfer Protocol)
- **IBC Relayer**: Hermes v1.10.0
- **Cryptography**: ML-DSA (Dilithium-3), ML-KEM (Kyber-768), SHA-256
- **Payment Processing**: Circle USDCKit SDK
- **Infrastructure Orchestration**: Proxmox (optional), Docker (optional), Kubernetes (optional)
