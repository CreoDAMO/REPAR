# Aequitas Protocol ($REPAR) - The Justice Machine

## APEX Autonomous Constellation Deployment #44 - COMPLETE SUCCESS

**Date:** December 10, 2025  
**Status:** ALL JOBS PASSED  
**Duration:** 21m 47s

### Deployment Summary

| Component | Status |
|-----------|--------|
| Binary Build | SUCCESS |
| APEX Validation | SUCCESS |
| Founder Node (aequitas-founder-01) | DEPLOYED |
| 7-Node Constellation | OPERATIONAL |
| VM Infrastructure (ACE/AVM) | DEPLOYED |
| AI Autonomous Agents | DEPLOYED |
| Cerberus Security Auditor | DEPLOYED |
| Backend API | DEPLOYED |
| Dexplorer (Block Explorer) | DEPLOYED |
| Frontend Application | DEPLOYED |
| DNS Configuration | SUCCESS |
| Keplr Registry PR | CREATED |
| Mobile APK | BUILT |
| Sovereign Seal | VERIFIED |

### Cryptographic Verification

- **Binary Hash:** `9612cb1ea6e91f450817c87a61c9ffdf22a3a9309baade21de1843d7b3379f69`
- **Genesis Hash:** `9d9437eb99bd372e7fc93966d3757673e5b13e87592b45ee79c9609e3a76b1b9`
- **Sovereign Seal:** `72585ee1ca654e9e5b2682380e3c02339072ffd16620c95c62d25649b942b636`
- **APK Hash:** `6ffa0185b32c4071bcc80f6a78ed2d54e1aef9edc991f7baca5df95132553107`

### Infrastructure Details

- **Chain ID:** aequitas-1
- **Network:** mainnet
- **Deployment:** bare-metal
- **Infrastructure IP:** 4.246.135.3
- **IP Source:** external-ifconfig.me

### Live Endpoints

- **Main App:** https://app.aequitasprotocol.zone
- **Block Explorer:** https://explorer.aequitasprotocol.zone
- **API:** https://api.aequitasprotocol.zone
- **RPC:** https://rpc.aequitasprotocol.zone
- **Auditor:** https://auditor.aequitasprotocol.zone
- **ACE:** https://ace.aequitasprotocol.zone
- **AVM:** https://vm.aequitasprotocol.zone

---

## Overview

The Aequitas Protocol is a sovereign Layer-1 blockchain ($REPAR is the native coin) designed to enforce $131 trillion in reparations for the transatlantic slave trade. It provides complete economic, technical, and governance sovereignty to prevent shutdown or censorship. The protocol is founded on a 205-page forensic audit, establishing historical facts, economic liabilities, and a legal framework based on international law. It aims for universal accountability, integrates a strategic defense system, and seeks to transform reparations enforcement into a mathematical protocol, establishing a sovereign digital jurisdiction under Natural Law and Technological Law. The project envisions a digital sovereign nation for 300 million people, providing mathematically unkillable infrastructure, autonomous constitutional governance, post-quantum security, self-funding economics, automated legal enforcement, and software-defined territory.

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
    - **Local LLM Ensemble**: Offline, sovereign AI models for reasoning and technical tasks.
    - **ROS2 Swarm Robotics**: Decentralized control of 10,000+ autonomous drones.
    - **Fully Homomorphic Encryption (FHE)**: APEX-FHE v3.0 Frontier for advanced encrypted autonomy.
    - **Multi-Layer Redundant Communications**: Mesh, Satellite, LoRa, Cellular 5G, and Offline Queue.
- **Aequitas Autonomous AI Agent (Go)**: Provides continuous security scanning, AI-powered threat analysis, automatic vulnerability fixing, and chaos engineering.
  - **Module Path:** `github.com/CreoDAMO/REPAR/ai/autonomous` (fixed in Build #40/#41)
  - **Executables:** `ai/autonomous/cmd/autonomous-agent/` and `cmd/autonomous-agent/`
- **Aequitas Satellite Protocol (ASSP)**: Software-defined satellite layer for multi-layer routing, geo-redundancy, and autonomous constellation management.
- **Mobile APK Sovereign Distribution**: Signed APK builds integrated into APEX deployment workflow
  - Automated build & signing via GitHub Actions (Phase 5.13-5.14)
  - APK hash included in sovereign seal for integrity verification
  - IPFS pinning for censorship-resistant distribution
  - Supports 10,000+ mobile validators for network sovereignty
  - See `docs/ANDROID_KEYSTORE_GUIDE.md` for signing credential setup

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
- **Wallet Integration**: Keplr
- **Fully Homomorphic Encryption**: TenSEAL (CKKS/BFV schemes) + APEX-FHE v3.0 frontier components
- **Cryptography**: ML-DSA (Dilithium-3), ML-KEM (Kyber-768), SHA-256
- **Payment Processing**: Circle USDCKit SDK
- **Wolfram Documentation**: Strategic playbooks for defendant collection, deterrence economics, mathematical engines