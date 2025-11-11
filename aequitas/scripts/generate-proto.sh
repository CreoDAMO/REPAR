#!/bin/bash
# Script to regenerate all protobuf files for Aequitas blockchain
# This should be run whenever .proto files are modified

set -e

echo "🔧 Regenerating Protobuf Files for Aequitas Blockchain"
echo "======================================================"

# Check if buf is installed
if ! command -v buf &> /dev/null; then
    echo "❌ buf is not installed. Installing..."
    go install github.com/bufbuild/buf/cmd/buf@latest
fi

# Check if protoc-gen-gocosmos is installed
if ! command -v protoc-gen-gocosmos &> /dev/null; then
    echo "❌ protoc-gen-gocosmos is not installed. Installing..."
    go install github.com/cosmos/gogoproto/protoc-gen-gocosmos@latest
fi

# Check if protoc-gen-grpc-gateway is installed
if ! command -v protoc-gen-grpc-gateway &> /dev/null; then
    echo "❌ protoc-gen-grpc-gateway is not installed. Installing..."
    go install github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway@latest
fi

echo "✅ All required tools are installed"
echo ""

# Change to proto directory
cd "$(dirname "$0")/../proto" || exit 1

echo "📁 Working directory: $(pwd)"
echo ""

# Run buf generate
echo "🔄 Running buf generate..."
buf generate

# Move generated files from nested path to correct location
if [ -d "../github.com/CreoDAMO/REPAR/aequitas/x" ]; then
    echo "📦 Moving generated files to correct location..."
    cp -r ../github.com/CreoDAMO/REPAR/aequitas/x/* ../x/
    rm -rf ../github.com
    echo "✅ Files moved successfully"
fi

# Count generated files
GENERATED_COUNT=$(find ../x -name "*.pb.go" -type f | wc -l)
echo ""
echo "✅ Protobuf generation complete!"
echo "📊 Generated $GENERATED_COUNT .pb.go files"
echo ""

# List modules with generated files
echo "📋 Modules with generated protobuf files:"
for module in ../x/*/types; do
    if [ -d "$module" ]; then
        module_name=$(basename $(dirname "$module"))
        pb_count=$(find "$module" -name "*.pb.go" | wc -l)
        if [ $pb_count -gt 0 ]; then
            echo "   ✓ $module_name: $pb_count files"
        fi
    fi
done

echo ""
echo "🎉 Done! Protobuf files are ready for commit."
