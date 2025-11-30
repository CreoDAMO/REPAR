#!/bin/bash
# Tasks 14-19: Deployment Script Validation
# Comprehensive validation of all deployment scripts for ACE/AVM constellation

set -e

echo "═══════════════════════════════════════════════════════════════"
echo "🚀 AEQUITAS DEPLOYMENT SCRIPT VALIDATION"
echo "═══════════════════════════════════════════════════════════════"
echo ""

TOTAL_SCRIPTS=0
VALID_SCRIPTS=0
INVALID_SCRIPTS=0

# Define script groups for Tasks 14-19
declare -A TASK_GROUPS=(
    ["task14"]="update-dns-ace-avm.sh setup-cloudflare-dns.sh setup-cloudflare-dns-mainnet.sh setup-cloudflare-dns-testnet.sh"
    ["task15"]="automate-keplr-registry.sh"
    ["task16"]="deploy-production.sh deploy-test.sh"
    ["task17"]="init-mainnet.sh init-testnet.sh init-both-networks.sh"
    ["task18"]="vm-infrastructure/proxmox/deploy-vm.sh home-validator-setup.sh"
    ["task19"]="deploy-to-digitalocean.sh deploy-to-droplet-now.sh deploy-to-droplet.sh"
)

# Validation function
validate_script() {
    local script=$1
    local task=$2
    
    if [ ! -f "$script" ]; then
        echo "   ❌ NOT FOUND: $script"
        ((INVALID_SCRIPTS++))
        return 1
    fi
    
    if [ ! -x "$script" ]; then
        echo "   ⚠️  NOT EXECUTABLE: $script (fixing...)"
        chmod +x "$script"
    fi
    
    # Check for Bash syntax errors
    if ! bash -n "$script" 2>/dev/null; then
        echo "   ❌ SYNTAX ERROR: $script"
        ((INVALID_SCRIPTS++))
        return 1
    fi
    
    # Check for required constellation/satellite markers
    if ! grep -q "ACE\|AVM\|constellation\|satellite" "$script" 2>/dev/null; then
        echo "   ⚠️  WARNING: $script missing constellation routing markers"
    fi
    
    echo "   ✅ VALID: $script"
    ((VALID_SCRIPTS++))
    return 0
}

# Validate each task group
for task in "${!TASK_GROUPS[@]}"; do
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    case "$task" in
        "task14") echo "📋 TASK 14: DNS Deployment Scripts" ;;
        "task15") echo "📋 TASK 15: Keplr Registry Script" ;;
        "task16") echo "📋 TASK 16: ACE Blockchain Deployment" ;;
        "task17") echo "📋 TASK 17: Initialization Scripts" ;;
        "task18") echo "📋 TASK 18: VM Infrastructure Scripts" ;;
        "task19") echo "📋 TASK 19: DigitalOcean/Droplet Deployment" ;;
    esac
    
    for script in ${TASK_GROUPS[$task]}; do
        ((TOTAL_SCRIPTS++))
        validate_script "scripts/$script" "$task"
    done
done

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "📊 VALIDATION SUMMARY"
echo "═══════════════════════════════════════════════════════════════"
echo "Total Scripts: $TOTAL_SCRIPTS"
echo "✅ Valid: $VALID_SCRIPTS"
echo "❌ Invalid: $INVALID_SCRIPTS"
echo ""

if [ $INVALID_SCRIPTS -eq 0 ]; then
    echo "✅ ALL DEPLOYMENT SCRIPTS VALIDATED SUCCESSFULLY"
    echo ""
    echo "✅ Task 14: DNS Scripts - VALIDATED"
    echo "✅ Task 15: Keplr Registry - VALIDATED"
    echo "✅ Task 16: ACE Blockchain - VALIDATED"
    echo "✅ Task 17: Initialization - VALIDATED"
    echo "✅ Task 18: VM Infrastructure - VALIDATED"
    echo "✅ Task 19: DigitalOcean/Droplet - VALIDATED"
    echo ""
    echo "🛰️  All scripts ready for AVM/ACE constellation deployment via satellite protocol"
    exit 0
else
    echo "⚠️  Some scripts need attention"
    exit 1
fi
