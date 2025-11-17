# Aequitas Protocol Zone - Sovereign VM Infrastructure

**True sovereignty means no dependencies.** Run Aequitas blockchain nodes on your own hardware - no cloud providers required.

## 🎯 Overview

This VM infrastructure enables deployment of **Aequitas Protocol Zone** validator nodes with complete sovereignty:

### 🏛️ **Sovereign Deployment (No Cloud Required)**
- **Local KVM**: Run nodes on your own Linux server (NEW!)
- **Packer Images**: Pre-built, distributable VM images (NEW!)
- **Docker**: Local development and testing
- **Proxmox**: Private cloud / on-premises infrastructure

### ☁️ **Optional Cloud Deployment**
- **AWS EC2**: Amazon Web Services (optional)
- **GCP Compute Engine**: Google Cloud Platform (optional)
- **DigitalOcean**: Simple droplets (optional)

**Key Principle**: Cloud providers are now **optional fallbacks**, not requirements. True sovereignty means running on your own metal.

All deployments use **existing blockchain source code** from `aequitas/` directory and **production genesis files** from `chain-config/` directory.

## 🏗️ Architecture

```
vm-infrastructure/
├── docker/                  # Docker containerization
│   ├── Dockerfile          # Multi-stage build (golang:1.24.9 → ubuntu:22.04)
│   ├── docker-compose.yml  # Orchestration (node + Cerberus)
│   └── docker-entrypoint.sh # Startup script
├── terraform/              # Multi-cloud IaC
│   ├── main.tf            # Root configuration
│   ├── variables.tf       # Input variables
│   └── modules/           # Provider-specific modules
│       ├── aws/           # EC2 instances
│       ├── gcp/           # Compute Engine VMs
│       └── digitalocean/  # Droplets
├── proxmox/               # Proxmox VE templates
├── cli/                   # CLI management tool
│   ├── bin/
│   │   └── aequitas-vm.js # Main CLI entry
│   └── commands/          # CLI commands
│       ├── list.js        # List nodes (real Docker API)
│       ├── deploy.js      # Deploy nodes
│       ├── status.js      # Node status (real RPC queries)
│       └── logs.js        # Stream logs (real Docker logs)
├── configs/               # Symlinks to ../../chain-config/
│   ├── mainnet/          → ../../chain-config/mainnet/
│   ├── testnet/          → ../../chain-config/testnet/
│   └── allocation-structure.json → ../../chain-config/allocation-structure.json
└── scripts/
    ├── install-aequitas-stack.sh  # Delegates to existing deploy script
    └── cerberus-auditor.service   # Systemd unit for Cerberus

Integration with existing project:
├── aequitas/              # Blockchain source (Cosmos SDK + custom modules)
├── chain-config/          # Genesis files, validator configs
├── auditor/               # Cerberus AI security system
└── scripts/deploy-blockchain-complete.sh  # Full deployment automation
```

## 🚀 Quick Start

### 1. Docker Deployment (Recommended for Development)

```bash
cd vm-infrastructure/docker
docker-compose up -d

# Verify node is running
docker-compose ps

# Check logs
docker-compose logs -f aequitas-protocol-zone

# Check RPC endpoint
curl http://localhost:26657/status
```

### 2. CLI Tool

```bash
cd vm-infrastructure/cli
npm install

# List running nodes
npm start list

# Deploy a node
npm start deploy --provider docker --name aequitas-node-01

# Check node status
npm start status aequitas-node-01

# Stream logs
npm start logs aequitas-node-01 --follow
```

### 3. Terraform Deployment

```bash
cd vm-infrastructure/terraform

# Initialize Terraform
terraform init

# Plan deployment (AWS example)
terraform plan -var="provider_type=aws" \
               -var="aws_ami_id=ami-xxxx" \
               -var="aws_subnet_id=subnet-xxxx" \
               -var="aws_key_name=your-key"

# Apply deployment
terraform apply -var="provider_type=aws"

# View outputs
terraform output
```

## 📋 Prerequisites

### All Deployments
- Git (for cloning the repository)
- Docker & Docker Compose (for containerization)

### Cloud Deployments
- **AWS**: AWS CLI configured with credentials, AMI ID for Ubuntu 22.04
- **GCP**: gcloud CLI authenticated, project ID
- **DigitalOcean**: API token, SSH key uploaded

### API Keys for Cerberus AI (Optional but Recommended)
```bash
export OPENAI_API_KEY=sk-...
export ANTHROPIC_API_KEY=sk-ant-...
export XAI_API_KEY=xai-...
export DEEPSEEK_API_KEY=sk-...
```

## 🔗 Additional Resources

- **Main Project**: https://github.com/CreoDAMO/REPAR
- **Cosmos SDK**: https://docs.cosmos.network
- **Terraform**: https://www.terraform.io/docs
- **Docker**: https://docs.docker.com

---

**Built with sovereignty. Powered by justice. Secured by Cerberus AI.**
**Mission: $131T reparations for transatlantic slave trade.**
