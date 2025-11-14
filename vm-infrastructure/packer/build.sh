#!/bin/bash
# Build Aequitas Protocol Zone VM Image using Packer

set -e

echo "🛡️  Building Aequitas Protocol Zone VM Image"
echo "=========================================="

# Check if Packer is installed
if ! command -v packer &> /dev/null; then
    echo "❌ Packer is not installed. Installing..."
    wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
    sudo apt update && sudo apt install packer
fi

# Initialize Packer
echo "📦 Initializing Packer..."
packer init aequitas-node.pkr.hcl

# Validate template
echo "✅ Validating Packer template..."
packer validate aequitas-node.pkr.hcl

# Build image
echo "🔨 Building VM image (this will take 15-30 minutes)..."
packer build aequitas-node.pkr.hcl

echo ""
echo "✅ Build complete!"
echo "📁 Image location: ./output/aequitas-zone-node.qcow2"
echo ""
echo "To use this image:"
echo "  1. Copy to your VM directory: cp output/aequitas-zone-node.qcow2 ~/.aequitas-vms/"
echo "  2. Deploy with CLI: aequitas-vm deploy --provider local-kvm --image ~/.aequitas-vms/aequitas-zone-node.qcow2"
echo ""
