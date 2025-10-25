# Aequitas Protocol System Analysis
**Date:** October 23, 2025  
**Status:** Import Migration to Replit Environment

## Executive Summary

The Aequitas Protocol is a comprehensive sovereign Layer-1 blockchain system designed to enforce $131 trillion in reparations for the transatlantic slave trade. The system consists of multiple interconnected components including a Cosmos SDK blockchain, React frontend, Node.js backend, and AI-powered security auditing system.

## System Architecture Overview

### Core Components

#### 1. **Aequitas Zone Blockchain** (`aequitas/`)
- **Type:** Cosmos SDK v0.54.0-alpha Layer-1 Blockchain
- **Native Coin:** $REPAR (NOT a token - emphasizes sovereignty)
- **Total Supply:** 131 trillion $REPAR
- **Consensus:** Tendermint BFT
- **Language:** Go 1.23.x (requires downgrade from 1.24.x in workflow)
- **Custom Modules:**
  - `x/defendant` - Manages 200+ defendants and payment types
  - `x/justice` - Deflationary $REPAR burn mechanism
  - `x/claims` - Arbitration demand filing across 172 jurisdictions
  - `x/distribution` - Reparations distribution to verified descendants
  - `x/threatdefense` - 10% Chaos Defense system with ThreatOracle
  - `x/dex` - Decentralized exchange for $REPAR trading
  - `x/endowment` - Founder and validator subsidy management
  - `x/nftmarketplace` - NFT evidence minting and trading
  - `x/infrastructure` - Infrastructure management
  - `x/validatorsubsidy` - Validator incentive mechanism

#### 2. **Frontend** (`frontend/`)
- **Framework:** React 19.2.0 + Vite
- **Styling:** Tailwind CSS
- **Key Features:**
  - Real-time dashboards (investor analytics, founder insights)
  - Data explorers (defendant database, evidence explorer with IPFS)
  - Claims filing system
  - DAO governance interface
  - Transparency ledger
  - Founder Wallet DEX
  - AI-powered multimodal search (NVIDIA NIM models)
- **Deployment:** Nginx proxy, port 5000
- **Vite Config:** Must allow all hosts for Replit proxy

#### 3. **Backend** (`backend/`)
- **Runtime:** Node.js
- **Purpose:** Circle USDC API integration, middleware, routing
- **Port:** 3000 (internal)
- **Key Services:**
  - Payment processing (Circle USDCKit SDK)
  - API gateway for blockchain interactions
  - Authentication and authorization

#### 4. **Block Explorer** (`dexplorer/`)
- **Framework:** Next.js/Vite + TypeScript
- **Purpose:** Aequitas blockchain transaction and block explorer
- **Features:**
  - Real-time block monitoring
  - Transaction tracking
  - Validator information
  - Network statistics

#### 5. **Cerberus Auditor** (`auditor/`)
- **Language:** Python 3.11
- **Architecture:** Multi-agent AI orchestrator
- **Guilds:**
  - **Analyst Guild:** 4 AI agents (Claude, GPT-4, Grok, DeepSeek)
  - **Adversary Guild:** Exploit testing and chaos engineering
  - **Engineer Guild:** Automated patch generation
- **Database:** PostgreSQL (required, no fallback)
- **Key Agents:**
  - Vulnerability Scanner (CVE database integration)
  - Smart Contract Analyzer (Aequitas module analysis)
  - Protocol Tuner (governance proposal generation)

#### 6. **Calculator** (`calculator/`)
- **Purpose:** Reparations calculation engine
- **Database:** MySQL (configured in docker-compose)

#### 7. **Ignite CLI** (`ignite-cli/`)
- **Purpose:** Cosmos SDK blockchain scaffolding and development tools
- **Version:** Custom fork for Aequitas-specific features

## Current Issues and Resolutions

### Issue #1: DigitalOcean Deployment Workflow
**File:** `.github/workflows/deploy-to-digitalocean.yml`  
**Problem:** Invalid SSH action SHA (`102c0d2ccd03f26e73ac5e793e2ab28bf3e69b98`) causing action not found error  
**Resolution:** Update to `appleboy/ssh-action@v1.0.3` (latest stable tag)  
**Impact:** Prevents automated deployment to DigitalOcean droplet (159.203.92.230)

### Issue #2: Cerberus Security Audit Workflow
**File:** `auditor/orchestrator.py` (line 58)  
**Problem:** `FileNotFoundError` when creating reports directory - `mkdir(exist_ok=True)` doesn't create parent directories  
**Resolution:** Change to `mkdir(parents=True, exist_ok=True)` to create nested directories  
**Impact:** Security audit workflow fails during initialization, preventing automated vulnerability scanning

### Issue #3: Blockchain Build Workflow
**Files:** 
- `.github/workflows/blockchain-build.yml`
- `aequitas/x/validatorsubsidy/keeper/keeper.go` (and potentially other files)

**Problems:**
1. Go version set to `1.24.x` which doesn't exist (current stable is 1.23.x)
2. Old Cosmos SDK import path `github.com/cosmos/cosmos-sdk/store` still used in some files, should be `cosmossdk.io/store`

**Resolution:**
1. Update workflow Go version to `1.23.x`
2. Replace old import paths with new cosmossdk.io paths

**Impact:** Blockchain build fails during `go mod tidy`, preventing binary generation

## Replit Environment Configuration

### Workflows (Configured)
1. **Block Explorer** - `cd dexplorer && npm install && npm run dev`
2. **Circle API Backend** - `cd backend && npm install && npm start`
3. **Frontend** - `cd frontend && npm install && npm run dev`

### Package Dependencies
- **Node.js Packages:**
  - @coinbase/wallet-sdk, @cosmjs/* (proto-signing, stargate, tendermint-rpc)
  - ipfs-http-client, react, react-dom, react-icons, react-router-dom
- **Python Packages:**
  - anthropic, openai

### Integrations (Needs Setup)
- python_openai==1.0.0
- python_anthropic==1.0.0
- python_database==1.0.0

## Security Architecture

### Multi-Layered Defense
1. **Legal Framework:** International law (Genocide, jus cogens), Black's Law, UCC Article 9
2. **Chaos Defense:** 10% controlled vulnerability system with automated threat oracle
3. **Cerberus Auditor:** Continuous AI-powered security monitoring
4. **Blockchain Security:** Tendermint BFT consensus, slashing mechanisms

### Evidence Standards
- **FRE 901:** All records meet Federal Rules of Evidence authentication standards
- **IPFS Integration:** Immutable evidence storage with cryptographic verification
- **205-Page Forensic Audit:** Foundational document establishing historical facts and liabilities

## External Dependencies

### Blockchain & Infrastructure
- Cosmos SDK v0.54.0-alpha
- CometBFT v0.38.19
- Cloudflare (DNS, CDN)
- DigitalOcean (hosting)

### Payment & Financial
- Circle USDCKit SDK (payment processing)
- Coinbase Wallet SDK
- Keplr (wallet integration)

### AI/ML Services
- Anthropic Claude (security analysis, governance)
- OpenAI GPT-4 (patch generation, vulnerability detection)
- X.AI Grok (threat intelligence)
- DeepSeek (code analysis)
- NVIDIA NIM:
  - Stable Diffusion XL (NFT generation)
  - Llama 3.1 8B (natural language processing)
  - CLIP (multimodal search)

### Storage & Communication
- IPFS/Infura (decentralized storage)
- SendGrid (email notifications)
- Sentry (error tracking)

### Development Tools
- GitHub (version control, CI/CD)
- PostgreSQL (Cerberus audit database)
- MySQL (calculator database)

## Deployment Architecture

### Development (Replit)
- **Frontend:** Port 5000 (public-facing, must allow all hosts)
- **Backend:** Port 3000 (internal)
- **Block Explorer:** Integrated with frontend workflow
- **Database:** Replit PostgreSQL (development only)

### Production (DigitalOcean)
- **Droplet IP:** 159.203.92.230
- **Orchestration:** Docker Compose
- **Services:**
  - Frontend (Nginx proxy)
  - Backend API
  - Blockchain node (aequitasd)
  - Cerberus auditor
  - Calculator service
  - MySQL database
  - PostgreSQL database

### CI/CD Pipelines
1. **Blockchain Build:** Compiles aequitasd binary, uploads artifacts
2. **Cerberus Audit:** Runs on every push, PR, and daily schedule
3. **DigitalOcean Deploy:** Manual/push trigger for production deployment
4. **Frontend Deploy:** Automated deployment of React application

## Data Integrity Principles

1. **No Mock Data:** All production paths use authentic data
2. **Authoritative Sources:** External APIs > web search > model knowledge
3. **Explicit Errors:** Surface error messages instead of silent fallbacks
4. **Secret Management:** Use Replit integrations for API keys and secrets
5. **Copyright Compliance:** Never copy media files directly from websites

## Next Steps

1. ✅ Fix GitHub Actions workflows (DigitalOcean, Cerberus, Blockchain)
2. Verify Replit workflows are running correctly
3. Set up required integrations (OpenAI, Anthropic, Database)
4. Configure environment variables for API keys
5. Test end-to-end functionality
6. Deploy to production environment
7. Run comprehensive security audit

## User Preferences

- **Coding Style:** Clean, functional React components with clear separation of concerns
- **Documentation:** Comprehensive inline documentation for complex logic
- **Sovereignty Focus:** Always emphasize $REPAR as native coin, NOT a token
- **Security-First:** Implement chaos defense patterns and threat detection
- **Legal Compliance:** FRE 901 evidence standards for all records
- **Non-Technical Communication:** Translate technical jargon into everyday concepts

## Project State

- **Phase:** Import migration to Replit environment
- **Status:** Fixing GitHub Actions workflows, verifying local workflows
- **Blockers:** 3 failing GitHub Actions workflows
- **Priority:** Get all workflows green, then proceed with feature development
- **Timeline:** ~20-30 minutes to fix all workflows
