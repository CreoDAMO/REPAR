# Aequitas Protocol Zone VM Infrastructure

## Overview
Complete VM management system for deploying and managing Aequitas Protocol Zone blockchain nodes with integrated AI security and legal enforcement capabilities.

## Architecture

### Core Components
- **Blockchain Layer**: Cosmos SDK-based Aequitas Zone with 9 custom modules
- **Security Layer**: Cerberus AI Auditor + Chaos Defense System
- **Enforcement Layer**: Multi-jurisdictional arbitration engine
- **Management Layer**: Automated deployment and monitoring

### VM Specifications
```
Name: Aequitas Protocol Zone VM
Base OS: Ubuntu 22.04 LTS (Hardened)
CPU: 8+ cores (AI security processing)
RAM: 16GB+ (blockchain node + AI monitoring)
Storage: 500GB+ SSD (blockchain data + evidence storage)
Network: Dual NIC (public/private networks)
```

## Deployment Methods

### 1. Docker Containerization
```bash
cd docker
./build.sh
docker-compose up -d
```

### 2. Proxmox VE Template
```bash
cd proxmox
./create-template.sh
./deploy-vm.sh --name aequitas-node-01
```

### 3. Terraform Multi-Cloud
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### 4. CLI Management Tool
```bash
npm install -g aequitas-vm-cli
aequitas-vm deploy --provider proxmox --name node-01
aequitas-vm monitor --node node-01
```

## Features

- 🔗 **Blockchain Node**: Full Aequitas Zone validator/node
- 🤖 **AI Security**: Cerberus auditor with threat detection
- ⚖️ **Legal Engine**: 172-jurisdiction arbitration system
- 🔥 **Burn Mechanism**: Deflationary economics engine
- 📊 **Monitoring**: Real-time dashboard and alerts
- 🔒 **Security**: Hardened OS, firewall, SSL/TLS
- 🚀 **Auto-Deploy**: One-command deployment
- 📦 **Templates**: Pre-configured VM images

## Network Endpoints

```
RPC: https://rpc.aequitasprotocol.zone:26657
REST: https://api.aequitasprotocol.zone:1317
gRPC: grpc.aequitasprotocol.zone:9090
Explorer: https://explorer.aequitasprotocol.zone
Dashboard: https://dashboard.aequitasprotocol.zone
```

## Quick Start

1. Choose your deployment method
2. Configure your environment variables
3. Run the deployment script
4. Monitor via dashboard

## Documentation

- [Docker Deployment](./docker/README.md)
- [Proxmox Setup](./proxmox/README.md)
- [Terraform Guide](./terraform/README.md)
- [CLI Reference](./cli/README.md)
- [Security Hardening](./docs/security.md)
