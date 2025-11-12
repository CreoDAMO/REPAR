# Aequitas Protocol Zone VM - Quick Start Guide

## Overview

This guide will help you deploy your first Aequitas Protocol Zone VM in under 10 minutes.

## Prerequisites

Choose your deployment method:

### Option 1: Docker (Easiest)
- Docker Engine 20.10+
- Docker Compose 2.0+
- 8GB RAM minimum
- 100GB free disk space

### Option 2: Proxmox VE
- Proxmox VE 7.0+
- 16GB RAM minimum  
- 500GB free disk space
- SSH access to Proxmox host

### Option 3: Terraform (Multi-Cloud)
- Terraform 1.0+
- Cloud provider account (AWS/GCP/DigitalOcean)
- API credentials configured

## Quick Deploy: Docker

### Step 1: Navigate to Docker Directory
```bash
cd vm-infrastructure/docker
```

### Step 2: Configure Environment
```bash
# Edit .env file with your API keys
nano .env
```

Required variables:
```bash
CIRCLE_API_KEY=your_circle_api_key
CIRCLE_ENTITY_SECRET=your_entity_secret
NVIDIA_API_KEY=your_nvidia_api_key
```

### Step 3: Build and Deploy
```bash
# Build the Docker image
./build.sh

# Start all services
docker-compose up -d
```

### Step 4: Verify Deployment
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f aequitas-node

# Check blockchain status
curl http://localhost:26657/status
```

### Step 5: Access Dashboard
Open your browser to:
- **Dashboard**: http://localhost:3000
- **RPC**: http://localhost:26657
- **REST API**: http://localhost:1317

## Quick Deploy: Proxmox VE

### Step 1: Create Template
```bash
cd vm-infrastructure/proxmox

# Upload to Proxmox host and run
./create-template.sh
```

### Step 2: Deploy VM
```bash
# Deploy from template
./deploy-vm.sh --name aequitas-node-01

# Deploy with static IP
./deploy-vm.sh --name aequitas-node-02 --network ip=192.168.1.100/24,gw=192.168.1.1
```

### Step 3: Access VM
```bash
# SSH into VM
ssh aequitas@<VM_IP>

# Check blockchain status
systemctl status aequitas-zone
```

## Quick Deploy: Terraform

### Step 1: Configure Provider
```bash
cd vm-infrastructure/terraform

# Copy example variables
cp terraform.tfvars.example terraform.tfvars

# Edit with your credentials
nano terraform.tfvars
```

### Step 2: Initialize and Deploy
```bash
# Initialize Terraform
terraform init

# Preview deployment
terraform plan

# Deploy infrastructure
terraform apply
```

### Step 3: Get Node Information
```bash
# View deployed nodes
terraform output node_details

# Get endpoints
terraform output endpoints
```

## CLI Management Tool

### Install CLI
```bash
cd vm-infrastructure/cli
npm install
npm link
```

### Deploy Node
```bash
# Deploy with Docker
aequitas-vm deploy --provider docker --name node-01

# Deploy with Proxmox
aequitas-vm deploy --provider proxmox --name node-02 --cores 16 --memory 32
```

### Manage Nodes
```bash
# List all nodes
aequitas-vm list

# Check node status
aequitas-vm status node-01

# Monitor node
aequitas-vm monitor node-01

# View logs
aequitas-vm logs node-01 --follow

# Connect via SSH
aequitas-vm connect node-01
```

## Verify Installation

### Check Blockchain Node
```bash
# Query node status
curl http://localhost:26657/status | jq

# Get latest block
curl http://localhost:26657/block | jq

# Check REST API
curl http://localhost:1317/cosmos/base/tendermint/v1beta1/node_info | jq
```

### Check AI Security Layer
```bash
# Check Cerberus Auditor logs
docker logs cerberus-ai-auditor

# Check Chaos Defense logs
docker logs chaos-defense-system
```

### Check Monitoring
```bash
# Access Prometheus
open http://localhost:9091

# Access Grafana
open http://localhost:3001
# Default login: admin/admin
```

## Common Issues

### Port Already in Use
```bash
# Change ports in docker-compose.yml or .env
# Default ports: 26657, 26656, 1317, 9090, 3000
```

### Insufficient Resources
```bash
# Check system resources
docker stats

# Reduce resource allocation in configs
```

### Connection Refused
```bash
# Check if services are running
docker-compose ps

# Restart services
docker-compose restart
```

## Next Steps

1. **Configure Genesis**: Customize genesis.json for your network
2. **Add Validators**: Join or create a validator network
3. **Deploy Frontend**: Set up the Aequitas Dashboard
4. **Enable Monitoring**: Configure Prometheus/Grafana dashboards
5. **Security Hardening**: Run security hardening script
6. **Backup Setup**: Configure automated backups

## Resources

- [Full Documentation](./README.md)
- [Architecture Guide](./ARCHITECTURE.md)
- [Security Guide](./SECURITY.md)
- [API Reference](./API.md)
- [Troubleshooting](./TROUBLESHOOTING.md)

## Support

For issues or questions:
- GitHub Issues: https://github.com/aequitas-protocol/vm-infrastructure
- Discord: https://discord.gg/aequitas
- Documentation: https://docs.aequitasprotocol.zone

## License

Apache 2.0 - See LICENSE file for details
