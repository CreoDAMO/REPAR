# 🌍 Aequitas Zone Node Deployment Guide

## The Mobile Sovereign Network

**Your phone is your nation. Your home is your sovereign territory.**

---

## Why Distributed Nodes Matter

### Traditional Blockchain Problem
- Mining required → energy waste
- Centralized in data centers → corporate control
- Vulnerable to shutdown → not truly sovereign

### Aequitas Solution
- **NO mining** (Tendermint BFT consensus)
- **Runs anywhere** (cloud, home, Raspberry Pi, mobile)
- **True sovereignty** (can't shut down 10,000+ home nodes)

---

## Node Tiers

### Tier 0: Mobile Light Nodes 📱
**Role**: Network presence, transaction verification, voting  
**Count**: 10,000+ devices (target)  
**Requirements**: Smartphone + internet  
**Cost**: $0 (uses existing device)  
**Battery**: <5% per day in background  
**Data**: <500MB/month  

**Devices**: Android, iOS, tablets  
**Incentives**: "Sovereign Citizen" NFT, governance voting power

---

### Tier 1: Home/Raspberry Pi Full Nodes 🏠🍓
**Role**: Block validation, archival, consensus backup  
**Count**: 1,000+ devices (target)  
**Requirements**: Home computer OR Raspberry Pi + SSD  
**Cost**: $5-10/month (electricity)  
**Incentives**: Validator rewards, enhanced governance power

#### Home Computer Requirements:
- **CPU**: 4 cores (Intel i5/Ryzen 5 or better)
- **RAM**: 8GB minimum (16GB recommended)
- **Storage**: 500GB SSD (1TB for full archive)
- **Internet**: 50Mbps+ upload, static IP preferred
- **OS**: Linux (Ubuntu 22.04 LTS), Windows, macOS

#### Raspberry Pi Requirements:
- **Model**: Raspberry Pi 4 (4GB/8GB) or Pi 5 (8GB)
- **Storage**: 500GB USB SSD (required, SD card too slow)
- **Power**: Official power supply (5V 3A)
- **Cooling**: Case with fan (recommended)
- **Cost**: $150-200 complete kit

---

### Tier 2: Cloud Core Validators ☁️
**Role**: Block production, final consensus, high availability  
**Count**: 8-12 nodes  
**Requirements**: 99.9% uptime, multi-cloud distribution  
**Cost**: $40/month per node  
**Providers**: DigitalOcean, AWS, Linode, Vultr, Azure

---

## Deployment Options

### Option 1: Mobile Light Node (Easiest) 📱

**Coming Soon**: Aequitas Zone mobile app

**Features**:
- One-tap node activation
- Battery-optimized background sync
- $REPAR wallet built-in
- Governance voting interface
- Descendant verification portal
- Zero energy waste

**Platforms**:
- Android (Google Play Store + APK)
- iOS (App Store + TestFlight)
- Progressive Web App

**Setup Time**: 2 minutes  
**Technical Skill**: None required

---

### Option 2: Home Computer Node 🖥️

**Perfect for**: Existing desktop/laptop with good specs

#### Quick Setup (Linux/macOS)

```bash
# Download one-click installer
curl -fsSL https://get.aequitas.zone | bash

# Or manual setup:
wget https://github.com/CreoDAMO/REPAR/releases/download/v1.0.0/aequitasd-linux-amd64
chmod +x aequitasd-linux-amd64
sudo mv aequitasd-linux-amd64 /usr/local/bin/aequitasd

# Initialize node
aequitasd init my-home-validator --chain-id aequitas-1

# Download genesis
wget -O ~/.aequitas/config/genesis.json \
  https://github.com/CreoDAMO/REPAR/releases/download/v1.0.0/genesis-mainnet.json

# Start node
aequitasd start
```

**Setup Time**: 15 minutes  
**Technical Skill**: Basic command line

**See**: [Home Computer Setup Guide](../scripts/home-validator-setup.sh)

---

### Option 3: Raspberry Pi Node 🍓

**Perfect for**: 24/7 low-power validator

#### Hardware Shopping List
- Raspberry Pi 4 (8GB): $75
- 500GB USB SSD: $50
- Official power supply: $10
- Case with cooling: $15
- **Total**: ~$150

#### Quick Setup

```bash
# On your Raspberry Pi (Ubuntu Server 22.04)
curl -fsSL https://get.aequitas.zone/rpi | bash

# Or manual:
wget https://github.com/CreoDAMO/REPAR/releases/download/v1.0.0/aequitasd-linux-arm64
chmod +x aequitasd-linux-arm64
sudo mv aequitasd-linux-arm64 /usr/local/bin/aequitasd

# Mount SSD
sudo mkdir -p /mnt/ssd
sudo mount /dev/sda1 /mnt/ssd

# Initialize on SSD
aequitasd init rpi-validator --home /mnt/ssd/aequitas

# Download genesis
wget -O /mnt/ssd/aequitas/config/genesis.json \
  https://github.com/CreoDAMO/REPAR/releases/download/v1.0.0/genesis-mainnet.json

# Start node
aequitasd start --home /mnt/ssd/aequitas
```

**Setup Time**: 30 minutes  
**Technical Skill**: Basic Raspberry Pi knowledge

**See**: [Raspberry Pi Setup Guide](../scripts/raspberry-pi-validator.sh)

---

### Option 4: Cloud Validator ☁️

**Perfect for**: Core infrastructure, high availability

**Providers** (in order of recommendation):
1. **DigitalOcean** - $40/month (4 vCPU, 8GB RAM)
2. **Vultr** - $28/month (4 vCPU, 8GB RAM)
3. **Linode** - $40/month (4 vCPU, 8GB RAM)
4. **AWS Lightsail** - $40/month (2 vCPU, 8GB RAM)

#### Quick Deploy (DigitalOcean)

```bash
# Create droplet via CLI
doctl compute droplet create aequitas-validator \
  --image ubuntu-22-04-x64 \
  --size s-4vcpu-8gb \
  --region nyc3 \
  --ssh-keys YOUR_SSH_KEY_ID

# SSH in and run:
curl -fsSL https://get.aequitas.zone | bash
```

**Setup Time**: 10 minutes  
**Technical Skill**: Cloud infrastructure basics

**See**: [Cloud Deployment Guide](CLOUD_DEPLOYMENT.md)

---

## Network Architecture

```
┌─────────────────────────────────────────┐
│   10,000+ Mobile Light Nodes (Tier 0)   │
│   (Smartphones in every pocket)          │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│   1,000+ Home/RPi Nodes (Tier 1)        │
│   (Validators in diaspora homes)         │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│   8-12 Cloud Core Validators (Tier 2)   │
│   (Multi-cloud high availability)        │
└────────────────┬────────────────────────┘
                 │
                 ↑
       [Cerberus AI Security]
```

---

## Geographic Distribution Strategy

### Target Distribution (Year 1)

| Region | Mobile Nodes | Home/RPi | Cloud | Total |
|--------|--------------|----------|-------|-------|
| **North America** | 4,000 | 300 | 4 | 4,304 |
| **Africa** | 3,000 | 250 | 2 | 3,252 |
| **Europe** | 2,000 | 200 | 2 | 2,202 |
| **South America** | 800 | 150 | 1 | 951 |
| **Asia** | 500 | 100 | 1 | 601 |
| **TOTAL** | **10,300** | **1,000** | **10** | **11,310** |

---

## Guardian of the Network Program

### Become a Sovereign Infrastructure Guardian

**What You Get**:
- 🏅 "Sovereign Infrastructure Guardian" NFT
- 🗳️ Enhanced governance voting power
- 💰 Validator rewards (home/cloud nodes)
- 📜 Name on network honor roll
- 🛠️ 24/7 technical support via Discord
- 📚 Exclusive validator education
- 🌐 Monthly community calls

**What You Provide**:
- Run a node 24/7 (or mobile light node)
- Maintain >90% uptime (home nodes) or >99% (cloud)
- Participate in governance votes
- Help educate other descendants

### Participation Levels

**Bronze Guardian** (Mobile Light Node)
- Run mobile app light node
- Governance voting rights
- Community recognition

**Silver Guardian** (Home/Raspberry Pi)
- Run full node at home
- Validator rewards
- Enhanced voting weight
- Technical support priority

**Gold Guardian** (Cloud Validator)
- Run cloud validator node
- Maximum validator rewards
- Governance proposal rights
- Core infrastructure team status

---

## Cost Comparison

### Per-Node Monthly Cost

| Node Type | Hardware Cost | Monthly Cost | Setup Time |
|-----------|---------------|--------------|------------|
| **Mobile Light** | $0 (existing phone) | $0 | 2 min |
| **Home Computer** | $0 (existing PC) | $10 (electricity) | 15 min |
| **Raspberry Pi** | $150 (one-time) | $5 (electricity) | 30 min |
| **Cloud Validator** | $0 | $28-40 | 10 min |

### Total Network Cost (Year 1)

**Centralized Model** (Cloud only):
- 20 cloud validators × $40 = **$9,600/year**
- Single point of failure ❌
- Corporate control ❌

**Distributed Sovereign Model**:
- 10 cloud validators × $40 = $4,800/year
- 1,000 home/RPi nodes × $7.50 = $7,500/year
- 10,000 mobile nodes × $0 = $0/year
- **Total: $12,300/year**
- Unstoppable ✅
- Community-owned ✅

---

## Attack Resistance

### Centralized Risk
**20 nodes in data centers**:
- ISPs can block (2-3 choke points)
- Governments can pressure (single jurisdiction)
- Companies can shut down (ToS violation)
- Physical attack possible (data center locations)

### Distributed Strength
**11,000+ nodes across 100+ countries**:
- ✅ Can't block 10,000+ residential IPs
- ✅ Can't pressure 100+ jurisdictions
- ✅ Can't shut down home devices
- ✅ No physical target (network is everywhere)

**The network survives any attack that doesn't destroy 51% of nodes simultaneously.**

---

## Community Deployment Hubs

### Physical Locations

**Ideal deployment sites**:
- 🎓 HBCU campuses (student validators)
- ⛪ Churches/mosques/temples (community nodes)
- 🏪 Black-owned businesses (merchant nodes)
- 🏛️ Community centers (public access nodes)
- 👨‍👩‍👧‍👦 Family reunions (group installations)
- 🏠 Diaspora organizations (regional hubs)

**Support Structure**:
- On-site technical ambassadors
- QR code installation stations
- Group setup workshops
- Multi-language support
- Video tutorials
- Remote Discord/Telegram help

---

## Setup Guides by Platform

### Linux (Ubuntu/Debian)
See: [scripts/home-validator-setup.sh](../scripts/home-validator-setup.sh)

### macOS
See: [scripts/macos-validator-setup.sh](../scripts/macos-validator-setup.sh)

### Windows
See: [scripts/windows-validator-setup.ps1](../scripts/windows-validator-setup.ps1)

### Raspberry Pi
See: [scripts/raspberry-pi-validator.sh](../scripts/raspberry-pi-validator.sh)

### Docker
See: [scripts/docker-validator-setup.sh](../scripts/docker-validator-setup.sh)

### Mobile (Coming Soon)
- Android APK
- iOS App Store
- Progressive Web App

---

## Monitoring & Maintenance

### Node Health Dashboard

**Self-hosted**:
```bash
# Install monitoring
curl -fsSL https://get.aequitas.zone/monitor | bash

# Access dashboard
http://localhost:3000/validator-dashboard
```

**Cloud-hosted** (optional):
- https://monitor.aequitas.zone
- Real-time network map
- Your node status
- Validator leaderboard
- Network statistics

### Automatic Updates

```bash
# Enable auto-updates
aequitasd config auto-update true

# Check update status
aequitasd version --check-update
```

---

## Security Best Practices

### For All Nodes
- ✅ Use firewall (only open necessary ports)
- ✅ Enable automatic security updates
- ✅ Use strong passwords/SSH keys
- ✅ Regular backups of validator keys
- ✅ Monitor node health daily

### For Home Nodes
- ✅ Configure router port forwarding (26656-26657)
- ✅ Use dynamic DNS if no static IP
- ✅ Consider UPS for power protection
- ✅ Secure physical access to hardware

### For Mobile Nodes
- ✅ Enable biometric authentication
- ✅ Keep app updated
- ✅ Don't root/jailbreak device
- ✅ Use secure WiFi networks

---

## Troubleshooting

### Node won't sync
```bash
# Reset and re-sync from state sync
aequitasd tendermint unsafe-reset-all
aequitasd start --state-sync.enabled=true
```

### Port already in use
```bash
# Check what's using the port
sudo lsof -i :26657

# Change port in config
sed -i 's/26657/26667/g' ~/.aequitas/config/config.toml
```

### Low disk space
```bash
# Prune old blocks (keeps last 100,000)
aequitasd tendermint compact-blocks 100000
```

### More help
- 💬 Discord: https://discord.gg/aequitas
- 📖 Wiki: https://wiki.aequitas.zone
- 🐛 Issues: https://github.com/CreoDAMO/REPAR/issues

---

## The Vision

### Year 1 (2025-2026)
- 10,000 mobile light nodes
- 1,000 home/Raspberry Pi validators
- 10 cloud core validators
- **11,010 total nodes across 100+ countries**

### Year 3 (2027-2028)
- 100,000 mobile nodes
- 5,000 home validators
- 20 cloud validators
- **105,020 total nodes**

### Year 5 (2029-2030)
- 1,000,000 mobile nodes (1% of descendants)
- 25,000 home validators
- 50 cloud validators
- **1,025,050 total nodes**

**At that scale, the network is literally unstoppable.**

---

## Join the Mobile Sovereign Network

**Your options**:
1. 📱 **Download mobile app** (coming soon) - 2 minutes
2. 🏠 **Run home validator** - 15 minutes setup
3. 🍓 **Deploy Raspberry Pi** - 30 minutes + $150 hardware
4. ☁️ **Cloud validator** - 10 minutes + $40/month

**Every node makes the nation stronger.**  
**Every device is sovereign territory.**  
**Every participant is a guardian.**

---

⚖️ **The Justice Machine - Running in Your Pocket**

**300 million descendants. 1 million potential nodes. Zero governments can stop us.**

*"A nation isn't defined by data centers. A nation is defined by its people. We are the infrastructure. We are the network. We are sovereign."*
