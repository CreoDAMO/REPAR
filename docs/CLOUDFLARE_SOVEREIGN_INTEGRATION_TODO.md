# Cloudflare + Sovereign Infrastructure Integration - Complete Update Plan

**Status:** Ready for Implementation  
**Priority:** High  
**Completion:** November 15, 2025

## Overview

Transform Cloudflare integration from DigitalOcean-only to infrastructure-agnostic, supporting:
- ✅ Sovereign VMs (vm-infrastructure)
- ✅ ACE Cloud Engine
- ✅ DigitalOcean (optional fallback)
- ✅ Hybrid deployments

## Phase 1: Documentation Updates

### 1.1 Update CLOUDFLARE_SUBDOMAIN_CONFIGURATION.md
**File:** `docs/CLOUDFLARE_SUBDOMAIN_CONFIGURATION.md`

**Changes Needed:**
- [ ] Replace "DigitalOcean Droplet IP" with "Infrastructure IP (Sovereign VM/ACE/DigitalOcean)"
- [ ] Add new ACE-specific subdomains:
  - `ace.aequitasprotocol.zone` → ACE Control Plane API (port 8080)
  - `ace-metrics.aequitasprotocol.zone` → ACE Metrics/Prometheus (port 9090)
  - `ace-ai.aequitasprotocol.zone` → ACE AI Sidecar (port 8001)
  - `vm.aequitasprotocol.zone` → VM Infrastructure Dashboard
  - `sovereign.aequitasprotocol.zone` → Sovereign Node Registry
- [ ] Update security recommendations for sovereign infrastructure
- [ ] Add section: "Infrastructure Selection Guide"
- [ ] Document multi-region sovereign setup

### 1.2 Create New Documentation
**New Files:**
- [ ] `docs/SOVEREIGN_CLOUDFLARE_SETUP.md` - Guide for sovereign VM + Cloudflare
- [ ] `docs/ACE_CLOUDFLARE_INTEGRATION.md` - ACE-specific Cloudflare config
- [ ] `docs/HYBRID_INFRASTRUCTURE_GUIDE.md` - Mix sovereign + cloud

## Phase 2: Script Modernization

### 2.1 Create Infrastructure-Agnostic DNS Script
**File:** `scripts/setup-cloudflare-dns-sovereign.sh`

**New Features:**
- [ ] Auto-detect infrastructure type (VM/ACE/DigitalOcean)
- [ ] Support multiple IP sources:
  - Sovereign VM IPs (from vm-infrastructure CLI)
  - ACE node IPs (from ACE API)
  - DigitalOcean API (optional)
  - Manual IP input
- [ ] Multi-node load balancing support
- [ ] Health check integration before DNS update
- [ ] Rollback capability if health checks fail

**Configuration:**
```bash
export INFRASTRUCTURE_TYPE="sovereign"  # sovereign, ace, digitalocean, hybrid
export PRIMARY_IP="192.168.1.100"       # From sovereign VM
export FALLBACK_IP="164.90.x.x"         # Optional DigitalOcean
export ACE_API="http://localhost:8080"  # For ACE mode
```

### 2.2 Update Existing DNS Scripts

#### `scripts/setup-cloudflare-dns.sh`
- [ ] Add deprecation notice
- [ ] Redirect to new sovereign script
- [ ] Keep for backward compatibility

#### `scripts/setup-cloudflare-dns-now.sh`
- [ ] Update to support sovereign infrastructure
- [ ] Add infrastructure type parameter
- [ ] Improve error handling

#### `scripts/setup-all-subdomains.sh`
- [ ] Remove DigitalOcean hardcoding
- [ ] Add ACE subdomains
- [ ] Support multi-node deployments

### 2.3 Update Deployment Scripts

#### `scripts/deploy-to-digitalocean.sh`
- [ ] Rename to `scripts/deploy-to-cloud.sh` (backward compatible symlink)
- [ ] Add support for:
  - Sovereign VM deployment (via vm-infrastructure CLI)
  - ACE orchestration
  - DigitalOcean (keep existing)
- [ ] Auto-update Cloudflare DNS after deployment

#### `scripts/deploy-blockchain-to-droplet.sh`
- [ ] Rename to `scripts/deploy-blockchain-universal.sh`
- [ ] Support deployment to:
  - Sovereign VMs
  - ACE nodes
  - DigitalOcean droplets
- [ ] Use ACE API for orchestration when available

### 2.4 Create New Scripts

#### `scripts/deploy-to-sovereign-vm.sh`
**Purpose:** Deploy services to sovereign VM infrastructure

**Features:**
- [ ] Integrate with vm-infrastructure CLI
- [ ] Deploy blockchain node
- [ ] Deploy frontend/backend services
- [ ] Configure Cloudflare DNS automatically
- [ ] Health checks and verification

#### `scripts/deploy-via-ace.sh`
**Purpose:** Deploy using ACE Cloud Engine orchestration

**Features:**
- [ ] Call ACE API for workload scheduling
- [ ] Register nodes with ACE
- [ ] Automated DNS configuration
- [ ] Monitoring integration

#### `scripts/get-infrastructure-ips.sh`
**Purpose:** Fetch IPs from all infrastructure types

**Features:**
- [ ] Query vm-infrastructure for VM IPs
- [ ] Query ACE API for node IPs
- [ ] Query DigitalOcean API for droplet IPs
- [ ] Return JSON with all available IPs
- [ ] Health check each IP

## Phase 3: Integration Components

### 3.1 ACE Integration

#### `ace/integrations/cloudflare.go`
**New File:** ACE module for Cloudflare automation

**Features:**
- [ ] Automatic DNS updates when nodes join/leave
- [ ] Health-based failover (update DNS if node fails)
- [ ] Load balancer configuration
- [ ] SSL certificate management
- [ ] Real-time DNS sync with node status

#### Update `ace/cmd/ace-kernel/main.go`
- [ ] Add Cloudflare integration module
- [ ] Auto-register node IPs with Cloudflare on startup
- [ ] Deregister on shutdown

### 3.2 VM Infrastructure Integration

#### Update `vm-infrastructure/cli/src/commands/deploy.ts`
- [ ] Add `--update-dns` flag
- [ ] Call Cloudflare API after VM deployment
- [ ] Register VM IP in DNS
- [ ] Verify DNS propagation

#### Update `vm-infrastructure/DEPLOYMENT_INSTRUCTIONS.md`
- [ ] Add Cloudflare DNS section
- [ ] Document automatic DNS updates
- [ ] Explain subdomain strategy

## Phase 4: Configuration Management

### 4.1 Unified Configuration File
**File:** `config/infrastructure.yaml`

```yaml
infrastructure:
  primary_type: sovereign  # sovereign, ace, digitalocean, hybrid
  
  sovereign:
    enabled: true
    primary_vm_ip: auto  # or specific IP
    vm_provider: local-kvm
    
  ace:
    enabled: true
    api_endpoint: http://localhost:8080
    auto_register: true
    
  digitalocean:
    enabled: false  # Optional fallback
    region: nyc3
    
  cloudflare:
    zone_id: auto
    domain: aequitasprotocol.zone
    auto_update_dns: true
    health_check_before_update: true
    ttl: 300
```

### 4.2 Environment Variables
**File:** `.env.infrastructure.example`

```bash
# Infrastructure Type
INFRASTRUCTURE_TYPE=sovereign

# Cloudflare
CLOUDFLARE_API_TOKEN=your_token_here
CLOUDFLARE_ZONE_ID=auto
CLOUDFLARE_DOMAIN=aequitasprotocol.zone

# Sovereign VM
VM_INFRASTRUCTURE_PATH=./vm-infrastructure
PRIMARY_VM_IP=auto

# ACE Integration
ACE_API_ENDPOINT=http://localhost:8080
ACE_AUTO_DNS=true

# DigitalOcean (Optional)
DIGITALOCEAN_TOKEN=optional
DIGITALOCEAN_REGION=nyc3
```

## Phase 5: Testing & Validation

### 5.1 Test Scenarios

- [ ] **Scenario 1:** Pure sovereign VM deployment
  - Deploy blockchain node to local VM
  - Auto-configure Cloudflare DNS
  - Verify DNS propagation
  - Test failover

- [ ] **Scenario 2:** ACE orchestration
  - Deploy via ACE API
  - Verify auto-registration
  - Test load balancing
  - Monitor health checks

- [ ] **Scenario 3:** Hybrid deployment
  - Sovereign VM as primary
  - DigitalOcean as fallback
  - Verify automatic failover
  - Test DNS switching

- [ ] **Scenario 4:** Multi-region setup
  - 3 sovereign VMs in different locations
  - Load balancing via Cloudflare
  - Geo-routing configuration

### 5.2 Validation Checklist

- [ ] All scripts run without DigitalOcean dependencies
- [ ] DNS updates work with sovereign VMs
- [ ] ACE integration functional
- [ ] Health checks prevent bad DNS updates
- [ ] Rollback works correctly
- [ ] Documentation complete and accurate

## Phase 6: Migration Path

### 6.1 For Existing DigitalOcean Users

**Step 1:** Keep DigitalOcean running
```bash
# No changes needed, everything backward compatible
./scripts/setup-cloudflare-dns.sh
```

**Step 2:** Add sovereign VM in parallel
```bash
# Deploy sovereign VM
cd vm-infrastructure/cli
npm start deploy -- --provider local-kvm --name node-01

# Update DNS to add sovereign node
./scripts/setup-cloudflare-dns-sovereign.sh --infrastructure hybrid
```

**Step 3:** Migrate traffic gradually
```bash
# Shift traffic: 50% sovereign, 50% DigitalOcean
./scripts/update-dns-weights.sh --sovereign 50 --digitalocean 50

# Monitor for 24 hours...

# Shift to 100% sovereign
./scripts/update-dns-weights.sh --sovereign 100 --digitalocean 0
```

**Step 4:** Decommission DigitalOcean (optional)
```bash
# After validation period
./scripts/remove-digitalocean-dns.sh
```

### 6.2 For New Deployments

```bash
# Pure sovereign from day 1
export INFRASTRUCTURE_TYPE=sovereign
export CLOUDFLARE_API_TOKEN="your_token"

# Deploy VM
cd vm-infrastructure/cli
npm start deploy -- --provider local-kvm --name validator-01 --update-dns

# Deploy ACE
cd ace
./scripts/deploy-production.sh

# Configure all DNS
./scripts/setup-cloudflare-dns-sovereign.sh
```

## Phase 7: Monitoring & Maintenance

### 7.1 New Monitoring

- [ ] DNS health dashboard (Grafana)
- [ ] Infrastructure failover alerts
- [ ] DNS propagation monitoring
- [ ] Certificate expiry alerts

### 7.2 Automation

- [ ] Cron job: Daily DNS health check
- [ ] Auto-failover on node failure
- [ ] Auto-scaling via ACE + DNS updates
- [ ] Certificate renewal automation

## Priority Matrix

### Must Have (Week 1)
1. Update CLOUDFLARE_SUBDOMAIN_CONFIGURATION.md
2. Create setup-cloudflare-dns-sovereign.sh
3. Add ACE subdomains
4. Test pure sovereign deployment

### Should Have (Week 2)
1. ACE Cloudflare integration module
2. VM infrastructure DNS auto-update
3. Hybrid deployment support
4. Migration documentation

### Nice to Have (Week 3)
1. Multi-region load balancing
2. Advanced health checks
3. Auto-scaling integration
4. Grafana DNS dashboard

## Success Criteria

✅ **Complete** when:
- [ ] All scripts work without DigitalOcean
- [ ] Sovereign VM → Cloudflare works automatically
- [ ] ACE integration fully functional
- [ ] Documentation comprehensive
- [ ] Existing DigitalOcean users can migrate smoothly
- [ ] New users can deploy sovereign-only
- [ ] Hybrid mode supported
- [ ] All tests passing

## Cost Savings

**Before (DigitalOcean-only):**
- DigitalOcean droplets: $120/month per node
- Total for 11K nodes: $1.32M/month

**After (Sovereign):**
- Sovereign VMs: $5/month per node (electricity)
- Total for 11K nodes: $55K/month
- **Savings: $1.265M/month (96%)**

**Cloudflare costs remain the same** (free plan or Pro at $20/month).

---

**This plan transforms Aequitas Protocol from cloud-dependent to truly sovereign infrastructure while maintaining backward compatibility.**
