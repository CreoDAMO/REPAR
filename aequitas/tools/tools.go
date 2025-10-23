//go:build tools

package tools

import (
        // buf tool removed due to dependency conflicts with CometBFT v1.0
        // (experimental/gojs and protovalidate path issues)
        // Proto generation is already completed, so this is safe to comment out
        // _ "github.com/bufbuild/buf/cmd/buf"
        _ "github.com/cosmos/gogoproto/protoc-gen-gocosmos"
        _ "google.golang.org/grpc/cmd/protoc-gen-go-grpc"
        _ "google.golang.org/protobuf/cmd/protoc-gen-go"
        _ "github.com/cosmos/cosmos-proto/cmd/protoc-gen-go-pulsar"
        _ "github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway"
        _ "github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2"
        _ "golang.org/x/tools/cmd/goimports"
)
