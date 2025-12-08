# Aequitas Protocol - Quick Start Guide

## Overview
The Aequitas Protocol is a sovereign Layer-1 blockchain ($REPAR) designed to enforce $131 trillion in reparations for the transatlantic slave trade. This platform features complete economic, technical, and governance sovereignty.

## Running the Project

### Current Workflows (all running):
1. **Frontend** - React dashboard on port 5000
2. **Block Explorer** - Blockchain explorer on port 5173
3. **Circle API Backend** - USDC integration backend on port 3000

### ACE (Aequitas Cloud Engine)
The sovereign cloud orchestration layer has been rebuilt with:
- Structured zap logging for production observability
- Prometheus metrics integration
- Multi-layer satellite networking
- AI-powered workload scheduling (NVIDIA NIM ready)

Build ACE Kernel:
```bash
cd ace && go build -o bin/ace-kernel ./cmd/ace-kernel
```

## Required Secrets
The following secrets need to be configured for full functionality:
- `CIRCLE_API_KEY` - For USDC payment processing
- `CIRCLE_ENTITY_SECRET` - Circle wallet entity secret
- `NVIDIA_API_KEY` - For AI/NIM integration
- `CLOUDFLARE_ACCOUNT_ID` - For CDN and DDoS protection
- `CLOUDFLARE_API_KEY` - Cloudflare API access
- `CLOUDFLARE_ZONE_ID` - Cloudflare zone ID
- `GITHUB_ACCESS_TOKEN` - For CI/CD deployment

## Architecture

### Core Components
- **blockchain/** - Cosmos SDK based sovereign chain
- **ace/** - Aequitas Cloud Engine (sovereign cloud)
- **frontend/** - React dashboard
- **backend/** - Circle API integration
- **dexplorer/** - Block explorer

### Key Features
- Sovereign identity (DID-based)
- IPFS evidence storage
- Multi-layer satellite networking
- AI-powered workload scheduling
- Prometheus metrics and structured logging

## Deployment
Run the autonomous deployment script:
```bash
./ace/scripts/deploy-production.sh
```

## License
Subject to the Sovereign Necessity Commons License (SNCL)
