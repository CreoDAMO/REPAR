package types

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"google.golang.org/grpc"
)

// MsgServer defines the Msg gRPC service
type MsgServer interface {
	CreatePool(context.Context, *MsgCreatePool) (*MsgCreatePoolResponse, error)
	AddLiquidity(context.Context, *MsgAddLiquidity) (*MsgAddLiquidityResponse, error)
	RemoveLiquidity(context.Context, *MsgRemoveLiquidity) (*MsgRemoveLiquidityResponse, error)
	Swap(context.Context, *MsgSwap) (*MsgSwapResponse, error)
}

// QueryServer defines the Query gRPC service
type QueryServer interface {
	Pool(context.Context, *QueryPoolRequest) (*QueryPoolResponse, error)
	Pools(context.Context, *QueryPoolsRequest) (*QueryPoolsResponse, error)
	LiquidityPosition(context.Context, *QueryLiquidityPositionRequest) (*QueryLiquidityPositionResponse, error)
	LiquidityPositions(context.Context, *QueryLiquidityPositionsRequest) (*QueryLiquidityPositionsResponse, error)
	EstimateSwap(context.Context, *QueryEstimateSwapRequest) (*QueryEstimateSwapResponse, error)
}

// RegisterQueryServer registers the Query gRPC service
func RegisterQueryServer(s grpc.ServiceRegistrar, srv QueryServer) {
	// This will be properly implemented by generated code or manual registration
}

// RegisterMsgServer registers the Msg gRPC service
func RegisterMsgServer(s grpc.ServiceRegistrar, srv MsgServer) {
	// This will be properly implemented by generated code or manual registration
}

// RegisterQueryHandlerClient registers the Query service handler client
func RegisterQueryHandlerClient(ctx context.Context, mux *runtime.ServeMux, client QueryClient) error {
	// This will be properly implemented by generated code
	return nil
}

// QueryClient is the client API for Query service
type QueryClient interface {
	Pool(ctx context.Context, in *QueryPoolRequest, opts ...grpc.CallOption) (*QueryPoolResponse, error)
	Pools(ctx context.Context, in *QueryPoolsRequest, opts ...grpc.CallOption) (*QueryPoolsResponse, error)
	LiquidityPosition(ctx context.Context, in *QueryLiquidityPositionRequest, opts ...grpc.CallOption) (*QueryLiquidityPositionResponse, error)
	LiquidityPositions(ctx context.Context, in *QueryLiquidityPositionsRequest, opts ...grpc.CallOption) (*QueryLiquidityPositionsResponse, error)
	EstimateSwap(ctx context.Context, in *QueryEstimateSwapRequest, opts ...grpc.CallOption) (*QueryEstimateSwapResponse, error)
}

// NewQueryClient creates a new QueryClient
func NewQueryClient(cc client.Context) QueryClient {
	return nil // This will be implemented properly
}

// Service descriptor for Msg service
var _Msg_serviceDesc = grpc.ServiceDesc{
	ServiceName: "aequitas.dex.v1.Msg",
	HandlerType: (*MsgServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams:     []grpc.StreamDesc{},
	Metadata:    "github.com/CreoDAMO/REPAR/aequitas/dex/v1/tx.proto",
}
