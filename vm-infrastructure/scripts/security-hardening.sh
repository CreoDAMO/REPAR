#!/bin/bash
#
# Aequitas Protocol Zone VM - Security Hardening Script
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Aequitas Zone - Security Hardening             ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════╝${NC}"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}✗ This script must be run as root${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Running as root${NC}"

# Update system
echo -e "${BLUE}Updating system packages...${NC}"
apt-get update && apt-get upgrade -y
echo -e "${GREEN}✓ System updated${NC}"

# Install security tools
echo -e "${BLUE}Installing security tools...${NC}"
apt-get install -y ufw fail2ban unattended-upgrades aide rkhunter chkrootkit
echo -e "${GREEN}✓ Security tools installed${NC}"

# Configure firewall (UFW)
echo -e "${BLUE}Configuring firewall...${NC}"
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (customize port if needed)
ufw allow 22/tcp comment 'SSH'

# Allow Aequitas Zone ports
ufw allow 26657/tcp comment 'Tendermint RPC'
ufw allow 26656/tcp comment 'Tendermint P2P'
ufw allow 1317/tcp comment 'Cosmos REST API'
ufw allow 9090/tcp comment 'gRPC'
ufw allow 443/tcp comment 'HTTPS'
ufw allow 80/tcp comment 'HTTP'

# Enable firewall
ufw --force enable
echo -e "${GREEN}✓ Firewall configured${NC}"

# Configure fail2ban
echo -e "${BLUE}Configuring fail2ban...${NC}"
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
destemail = admin@aequitasprotocol.zone
sendername = Fail2Ban
action = %(action_mwl)s

[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 3

[nginx-noscript]
enabled = true
filter = nginx-noscript
logpath = /var/log/nginx/access.log
maxretry = 6
EOF

systemctl enable fail2ban
systemctl restart fail2ban
echo -e "${GREEN}✓ Fail2ban configured${NC}"

# Harden SSH configuration
echo -e "${BLUE}Hardening SSH configuration...${NC}"
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config
sed -i 's/X11Forwarding yes/X11Forwarding no/' /etc/ssh/sshd_config

# Add SSH hardening options
cat >> /etc/ssh/sshd_config << 'EOF'

# Aequitas Security Hardening
Protocol 2
MaxAuthTries 3
MaxSessions 2
ClientAliveInterval 300
ClientAliveCountMax 2
PermitEmptyPasswords no
AllowTcpForwarding no
X11Forwarding no
EOF

systemctl restart sshd
echo -e "${GREEN}✓ SSH hardened${NC}"

# Configure automatic security updates
echo -e "${BLUE}Configuring automatic security updates...${NC}"
cat > /etc/apt/apt.conf.d/50unattended-upgrades << 'EOF'
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}-security";
};
Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
EOF

cat > /etc/apt/apt.conf.d/20auto-upgrades << 'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
EOF

echo -e "${GREEN}✓ Automatic security updates configured${NC}"

# Harden kernel parameters
echo -e "${BLUE}Hardening kernel parameters...${NC}"
cat >> /etc/sysctl.conf << 'EOF'

# Aequitas Security Hardening
# IP forwarding
net.ipv4.ip_forward = 0
net.ipv6.conf.all.forwarding = 0

# Syn flood protection
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_syn_retries = 2
net.ipv4.tcp_synack_retries = 2
net.ipv4.tcp_max_syn_backlog = 4096

# Ignore ICMP ping requests
net.ipv4.icmp_echo_ignore_all = 0
net.ipv4.icmp_echo_ignore_broadcasts = 1

# Ignore ICMP redirects
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0

# Ignore IP source routing
net.ipv4.conf.all.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0

# Log martians
net.ipv4.conf.all.log_martians = 1

# Ignore send redirects
net.ipv4.conf.all.send_redirects = 0

# Reverse path filtering
net.ipv4.conf.all.rp_filter = 1
EOF

sysctl -p
echo -e "${GREEN}✓ Kernel parameters hardened${NC}"

# Set up file integrity monitoring (AIDE)
echo -e "${BLUE}Setting up AIDE (File Integrity Monitor)...${NC}"
aideinit
mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db
echo -e "${GREEN}✓ AIDE initialized${NC}"

# Configure audit logging
echo -e "${BLUE}Configuring audit logging...${NC}"
apt-get install -y auditd
systemctl enable auditd
systemctl start auditd
echo -e "${GREEN}✓ Audit logging configured${NC}"

# Secure shared memory
echo -e "${BLUE}Securing shared memory...${NC}"
if ! grep -q "tmpfs /run/shm" /etc/fstab; then
    echo "tmpfs /run/shm tmpfs defaults,noexec,nosuid 0 0" >> /etc/fstab
fi
echo -e "${GREEN}✓ Shared memory secured${NC}"

# Install and configure AppArmor
echo -e "${BLUE}Configuring AppArmor...${NC}"
apt-get install -y apparmor apparmor-utils
systemctl enable apparmor
systemctl start apparmor
echo -e "${GREEN}✓ AppArmor configured${NC}"

# Set up log rotation
echo -e "${BLUE}Configuring log rotation...${NC}"
cat > /etc/logrotate.d/aequitas << 'EOF'
/var/log/aequitas/*.log {
    daily
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 aequitas aequitas
    sharedscripts
    postrotate
        systemctl reload aequitasd > /dev/null 2>&1 || true
    endscript
}
EOF
echo -e "${GREEN}✓ Log rotation configured${NC}"

# Create security audit script
echo -e "${BLUE}Creating security audit script...${NC}"
cat > /usr/local/bin/aequitas-security-audit.sh << 'EOF'
#!/bin/bash
# Aequitas Security Audit Script

echo "=== Aequitas Protocol Zone - Security Audit ==="
echo "Date: $(date)"
echo ""

echo "--- Firewall Status ---"
ufw status
echo ""

echo "--- Failed Login Attempts ---"
grep "Failed password" /var/log/auth.log | tail -n 10
echo ""

echo "--- Active Connections ---"
ss -tunap | grep ESTABLISHED | grep -E ":(26657|26656|1317|9090)"
echo ""

echo "--- Disk Usage ---"
df -h /var/lib/aequitas
echo ""

echo "--- Memory Usage ---"
free -h
echo ""

echo "--- Running Processes ---"
ps aux | grep -E "(aequitasd|cerberus|chaos)" | grep -v grep
echo ""

echo "=== Audit Complete ==="
EOF

chmod +x /usr/local/bin/aequitas-security-audit.sh
echo -e "${GREEN}✓ Security audit script created${NC}"

# Final summary
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Security hardening completed successfully!      ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}Security measures applied:${NC}"
echo -e "  ✓ Firewall (UFW) configured"
echo -e "  ✓ Fail2ban intrusion prevention"
echo -e "  ✓ SSH hardened (key-only access)"
echo -e "  ✓ Automatic security updates"
echo -e "  ✓ Kernel parameters hardened"
echo -e "  ✓ File integrity monitoring (AIDE)"
echo -e "  ✓ Audit logging enabled"
echo -e "  ✓ AppArmor enabled"
echo -e "  ✓ Log rotation configured"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  • Run security audit: ${GREEN}/usr/local/bin/aequitas-security-audit.sh${NC}"
echo -e "  • Review firewall rules: ${GREEN}ufw status verbose${NC}"
echo -e "  • Check fail2ban status: ${GREEN}fail2ban-client status${NC}"
echo ""
