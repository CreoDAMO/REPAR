#!/bin/bash
#
# Aequitas Protocol Zone VM - Docker Build Script
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Aequitas Protocol Zone VM - Docker Builder     ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker is not installed${NC}"
    echo -e "${YELLOW}Please install Docker first: https://docs.docker.com/get-docker/${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker is installed${NC}"

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}✗ Docker Compose is not installed${NC}"
    echo -e "${YELLOW}Please install Docker Compose: https://docs.docker.com/compose/install/${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker Compose is installed${NC}"

# Check for .env file
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠ No .env file found, creating from template...${NC}"
    cat > .env << EOF
# Aequitas Protocol Zone VM Environment Variables

# Circle API Configuration
CIRCLE_API_KEY=your_circle_api_key_here
CIRCLE_ENTITY_SECRET=your_circle_entity_secret_here

# NVIDIA NIM API
NVIDIA_API_KEY=your_nvidia_api_key_here

# Grafana
GRAFANA_PASSWORD=admin

# Chain Configuration
CHAIN_ID=aequitas-1
MONIKER=aequitas-node-01

# Node Environment
NODE_ENV=production
EOF
    echo -e "${GREEN}✓ Created .env file - please edit with your API keys${NC}"
fi

# Create necessary directories
echo ""
echo -e "${BLUE}Creating directory structure...${NC}"
mkdir -p configs monitoring security/{cerberus,chaos} blockchain enforcement dashboard

# Build Docker image
echo ""
echo -e "${BLUE}Building Docker image...${NC}"
docker build -t aequitas-protocol-zone:latest .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Docker image built successfully${NC}"
else
    echo -e "${RED}✗ Docker image build failed${NC}"
    exit 1
fi

# Show image info
echo ""
echo -e "${BLUE}Docker Image Information:${NC}"
docker images | grep aequitas-protocol-zone

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Build completed successfully!                   ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Edit .env file with your API keys"
echo -e "2. Run: ${GREEN}docker-compose up -d${NC}"
echo -e "3. Monitor: ${GREEN}docker-compose logs -f${NC}"
echo -e "4. Access dashboard: ${GREEN}http://localhost:3000${NC}"
echo ""
