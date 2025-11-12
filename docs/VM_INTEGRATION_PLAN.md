# Aequitas Protocol VM - Integration Plan

## 🎯 Mission: Connect All Existing Components

After comprehensive codebase analysis, we discovered we have **95% of the infrastructure already built**. This isn't a build project - it's an **integration project**.

## 📊 What We Have

### ✅ Complete & Working
1. **Cosmos SDK Blockchain** - Full implementation in `aequitas/`
2. **Deployment Scripts** - Tested on DigitalOcean (`scripts/`)
3. **Cerberus AI Auditor** - Production-ready security system
4. **3 Frontend Apps** - Dashboard, Explorer, Backend (all running)
5. **Chain Configs** - Mainnet + testnet genesis files
6. **VM Framework** - Docker, Proxmox, Terraform templates (`vm-infrastructure/`)

### ⚙️ Needs Integration
1. Docker build - point to existing blockchain
2. CLI tool - connect to real APIs
3. Security - integrate Cerberus with VM
4. Deployment - unify scripts
5. Terraform - add resource definitions

## 🔧 Integration Tasks (Priority Order)

### Task 1: Fix Docker Integration ⭐ CRITICAL
**Problem**: Dockerfile expects non-existent `./blockchain` directory  
**Solution**: Point to existing `../aequitas` blockchain

**Changes Required**:
```dockerfile
# vm-infrastructure/docker/Dockerfile
# Line ~35: Change from
COPY ./blockchain /opt/aequitas-blockchain

# To:
COPY ../../aequitas /opt/aequitas-blockchain
WORKDIR /opt/aequitas-blockchain

# Use existing build process
RUN make install
# OR
RUN go build -o /usr/local/bin/aequitasd ./cmd/aequitasd
```

**Also Update**:
- docker-compose.yml: Mount existing chain-config/ directory
- build.sh: Copy from aequitas/ directory
- .env: Use actual blockchain parameters

### Task 2: Integrate Deployment Scripts
**Problem**: VM install script recreates what exists  
**Solution**: Use existing deployment scripts

**Changes Required**:
```bash
# vm-infrastructure/scripts/install-aequitas-stack.sh
# Replace custom installation with:
#!/bin/bash
# Source the existing deployment script
cd /var/www/aequitas
./scripts/deploy-blockchain-complete.sh

# Then add VM-specific enhancements:
# - Security hardening
# - Cerberus installation
# - Monitoring setup
```

### Task 3: Integrate Cerberus Security
**Problem**: Cerberus separate from VM deployment  
**Solution**: Add Cerberus to Docker and VM images

**Changes Required**:

#### Docker Compose Addition:
```yaml
# vm-infrastructure/docker/docker-compose.yml
  cerberus-auditor:
    build:
      context: ../../auditor
      dockerfile: Dockerfile
    container_name: cerberus-ai-auditor
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    volumes:
      - ../../aequitas:/workspace/aequitas:ro
    depends_on:
      - aequitas-node
```

#### VM Installation:
```bash
# Add to vm-infrastructure/scripts/install-aequitas-stack.sh
cp -r /var/www/aequitas/auditor /opt/cerberus
cd /opt/cerberus
pip3 install -r requirements.txt

# Create systemd service
cat > /etc/systemd/system/cerberus-auditor.service << EOF
[Unit]
Description=Cerberus AI Security Auditor
After=network.target

[Service]
User=aequitas
WorkingDirectory=/opt/cerberus
ExecStart=/usr/bin/python3 orchestrator.py
Restart=always

[Install]
WantedBy=multi-user.target
EOF

systemctl enable cerberus-auditor
systemctl start cerberus-auditor
```

### Task 4: CLI API Integration
**Problem**: CLI returns mock data  
**Solution**: Connect to real Docker/Proxmox/Terraform APIs

**Changes Required**:

#### Package.json additions:
```json
{
  "dependencies": {
    "dockerode": "^4.0.0",
    "proxmox-api": "^1.1.0",
    "@terraform-js/terraform": "^1.0.0",
    "axios": "^1.6.0"
  }
}
```

#### list.js - Real Docker integration:
```javascript
const Docker = require('dockerode');
const docker = new Docker();

module.exports = async function listCommand(options) {
  const containers = await docker.listContainers({all: true});
  const aequitasNodes = containers.filter(c => 
    c.Image.includes('aequitas') || 
    c.Names.some(n => n.includes('aequitas'))
  );
  
  // Process and display real data
  aequitasNodes.forEach(node => {
    // Display actual container info
  });
};
```

#### deploy.js - Real deployment:
```javascript
async function deployDocker(options) {
  const docker = new Docker();
  
  // Build image
  const stream = await docker.buildImage({
    context: path.join(__dirname, '../../docker'),
    src: ['Dockerfile', 'docker-compose.yml']
  }, {t: `aequitas-zone:${options.name}`});
  
  // Start container
  const container = await docker.createContainer({
    Image: `aequitas-zone:${options.name}`,
    name: options.name,
    Env: [
      `CHAIN_ID=${options.chainId}`,
      `MONIKER=${options.name}`
    ]
  });
  
  await container.start();
  return container;
}
```

### Task 5: Unify Configuration
**Problem**: Duplicate configs between vm-infrastructure/ and chain-config/  
**Solution**: Use existing chain-config/ directory

**Changes Required**:
```bash
# Create symlinks in vm-infrastructure
cd vm-infrastructure/configs
ln -s ../../chain-config/mainnet ./mainnet
ln -s ../../chain-config/testnet ./testnet
ln -s ../../chain-config/allocation-structure.json ./

# Update docker-compose.yml to mount these
volumes:
  - ../../chain-config:/etc/aequitas/chain-config:ro
```

### Task 6: Complete Terraform Resources
**Problem**: Terraform has structure but no actual resources  
**Solution**: Add real compute resources

**Add to terraform/main.tf**:
```hcl
# AWS EC2 Instance
resource "aws_instance" "aequitas_node" {
  count         = var.provider_type == "aws" ? var.node_count : 0
  ami           = var.aws_ami_id
  instance_type = "m5.2xlarge"
  
  tags = {
    Name = "${var.node_name_prefix}-${count.index + 1}"
  }
  
  user_data = file("${path.module}/../scripts/install-aequitas-stack.sh")
}

# GCP Compute Instance  
resource "google_compute_instance" "aequitas_node" {
  count        = var.provider_type == "gcp" ? var.node_count : 0
  name         = "${var.node_name_prefix}-${count.index + 1}"
  machine_type = "n2-standard-8"
  zone         = var.gcp_zone
  
  boot_disk {
    initialize_params {
      image = var.gcp_image
      size  = 500
    }
  }
  
  metadata_startup_script = file("${path.module}/../scripts/install-aequitas-stack.sh")
}

# DigitalOcean Droplet
resource "digitalocean_droplet" "aequitas_node" {
  count  = var.provider_type == "digitalocean" ? var.node_count : 0
  name   = "${var.node_name_prefix}-${count.index + 1}"
  size   = "s-8vcpu-16gb"
  image  = "ubuntu-22-04-x64"
  region = var.do_region
  
  user_data = file("${path.module}/../scripts/install-aequitas-stack.sh")
}
```

### Task 7: Build Blockchain Binary
**Problem**: No compiled aequitasd binary yet  
**Solution**: Build from source

**Commands**:
```bash
cd aequitas

# Install dependencies
go mod download
go mod tidy

# Build binary
go build -o build/aequitasd ./cmd/aequitasd

# Verify
./build/aequitasd version

# Install system-wide
sudo cp build/aequitasd /usr/local/bin/
sudo chmod +x /usr/local/bin/aequitasd
```

### Task 8: Test End-to-End
**Problem**: Haven't validated full stack  
**Solution**: Run complete deployment test

**Test Script**:
```bash
#!/bin/bash
# test-complete-deployment.sh

echo "=== Aequitas Protocol - Full Stack Test ==="

# 1. Build blockchain
echo "1. Building blockchain..."
cd aequitas
go build -o build/aequitasd ./cmd/aequitasd || exit 1

# 2. Test Docker deployment
echo "2. Testing Docker deployment..."
cd ../vm-infrastructure/docker
./build.sh || exit 1
docker-compose up -d || exit 1

# Wait for blockchain to start
sleep 30

# 3. Verify RPC endpoint
echo "3. Verifying RPC endpoint..."
curl http://localhost:26657/status | jq .result.node_info

# 4. Test Cerberus
echo "4. Testing Cerberus auditor..."
cd ../../auditor
python3 orchestrator.py

# 5. Test CLI
echo "5. Testing CLI..."
cd ../vm-infrastructure/cli
npm install
node bin/aequitas-vm.js list

echo "=== All tests passed! ==="
```

## 📋 Implementation Checklist

### Phase 1: Core Integration (2-3 hours)
- [ ] Fix Docker Dockerfile paths
- [ ] Update docker-compose.yml with real configs
- [ ] Build blockchain binary
- [ ] Test Docker deployment end-to-end

### Phase 2: Security Integration (1-2 hours)
- [ ] Add Cerberus to Docker compose
- [ ] Create Cerberus systemd service
- [ ] Test security audits
- [ ] Integrate with VM deployment

### Phase 3: CLI Enhancement (2-3 hours)
- [ ] Add Docker SDK to CLI
- [ ] Implement real list command
- [ ] Implement real deploy command
- [ ] Implement real status/logs commands
- [ ] Test all CLI commands

### Phase 4: Terraform Completion (1-2 hours)
- [ ] Add AWS EC2 resources
- [ ] Add GCP Compute resources
- [ ] Add DigitalOcean droplet resources
- [ ] Test terraform plan/apply

### Phase 5: Documentation & Testing (1 hour)
- [ ] Update README with integration info
- [ ] Create integration test script
- [ ] Run full stack test
- [ ] Document any issues

**Total Estimated Time**: 7-11 hours

## 🎯 Expected Outcomes

After integration:

### ✅ Docker Deployment
```bash
cd vm-infrastructure/docker
./build.sh
docker-compose up -d
# → Full Aequitas node running with Cerberus security
```

### ✅ CLI Management
```bash
aequitas-vm deploy --provider docker --name node-01
aequitas-vm list  # Shows real containers
aequitas-vm status node-01  # Shows actual metrics
aequitas-vm monitor node-01  # Real-time data
```

### ✅ Proxmox Deployment
```bash
cd vm-infrastructure/proxmox
./create-template.sh  # Creates VM with aequitasd
./deploy-vm.sh --name validator-01
# → Production validator node
```

### ✅ Terraform Multi-Cloud
```bash
cd vm-infrastructure/terraform
terraform apply
# → Deploys to AWS/GCP/DigitalOcean
```

## 🔄 Migration Path

### Current Deployment (scripts/deploy-blockchain-complete.sh)
```bash
# Works today on DigitalOcean
./scripts/deploy-blockchain-complete.sh
# → Mainnet + Testnet on single droplet
```

### Integrated VM Deployment (after integration)
```bash
# Works everywhere
aequitas-vm deploy --provider digitalocean --name mainnet-01
# → Single mainnet node with Cerberus + monitoring
```

### Advantage
- Same blockchain
- Better isolation (Docker/VMs)
- Professional management (CLI)
- Multi-cloud support
- Integrated security (Cerberus)
- Easier scaling

## 💡 Key Insights

1. **Don't Rebuild** - Use existing blockchain code
2. **Don't Duplicate** - Reuse deployment scripts
3. **Don't Recreate** - Leverage Cerberus
4. **Do Connect** - Integrate components
5. **Do Enhance** - Add VM framework benefits

## 🚀 Quick Start After Integration

```bash
# Option 1: Docker (fastest)
cd vm-infrastructure/docker && ./build.sh && docker-compose up -d

# Option 2: CLI (easiest)
aequitas-vm deploy --provider docker

# Option 3: Existing (works now)
./scripts/deploy-blockchain-complete.sh

# All three should result in the same running blockchain
```

## 📊 Integration vs Rebuild

### If We Rebuild (BAD)
- ⏰ 40+ hours of work
- 🐛 Many new bugs
- 📚 Duplicate documentation
- 🔄 Lose existing tests
- ❌ Break existing deployments

### If We Integrate (GOOD)  
- ⏰ 7-11 hours of work
- ✅ Leverage existing code
- 📚 Unified documentation
- 🔄 Keep existing deployments
- ⚡ Best of both worlds

## 🎯 Success Criteria

Integration is complete when:

1. ✅ `docker-compose up -d` starts full Aequitas node
2. ✅ `aequitas-vm list` shows real containers
3. ✅ Cerberus runs continuous security audits
4. ✅ Terraform can deploy to any cloud
5. ✅ CLI manages real infrastructure
6. ✅ All existing scripts still work
7. ✅ Documentation is unified
8. ✅ End-to-end tests pass

---

**Next Action**: Start with Task 1 (Fix Docker Integration) - highest impact, lowest effort.
