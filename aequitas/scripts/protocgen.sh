#!/usr/bin/env bash

set -e

echo "Generating Protobuf files for Aequitas modules..."

# Set PATH to include Go binaries
export PATH=$PATH:$(go env GOPATH)/bin

# Change to proto directory
cd proto

# Get all proto directories
proto_dirs=$(find aequitas -type d -name 'v1')

for dir in $proto_dirs; do
  module_name=$(echo $dir | cut -d'/' -f2)
  echo "Generating proto files for module: $module_name"
  
  # Generate for each proto file
  for file in $(find "$dir" -maxdepth 1 -name '*.proto'); do
    echo "  Processing: $file"
    
    # Run protoc-gen-gocosmos
    buf generate \
      --template buf.gen.yaml \
      --path "$file" \
      2>&1 || true
  done
done

echo "Proto generation complete!"
