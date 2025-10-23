package types

import (
	"cosmossdk.io/math"
)

// Query types for the dex module

// QueryPoolRequest is request type for the Query/Pool RPC method
type QueryPoolRequest struct {
	PoolId uint64
}

// QueryPoolResponse is response type for the Query/Pool RPC method
type QueryPoolResponse struct {
	Pool Pool
}

// QueryPoolsRequest is request type for the Query/Pools RPC method
type QueryPoolsRequest struct {
	Pagination interface{} // cosmos.base.query.v1beta1.PageRequest
}

// QueryPoolsResponse is response type for the Query/Pools RPC method
type QueryPoolsResponse struct {
	Pools      []Pool
	Pagination interface{} // cosmos.base.query.v1beta1.PageResponse
}

// QueryLiquidityPositionRequest is request type for the Query/LiquidityPosition RPC method
type QueryLiquidityPositionRequest struct {
	Owner  string
	PoolId uint64
}

// QueryLiquidityPositionResponse is response type for the Query/LiquidityPosition RPC method
type QueryLiquidityPositionResponse struct {
	Position LiquidityPosition
}

// QueryLiquidityPositionsRequest is request type for the Query/LiquidityPositions RPC method
type QueryLiquidityPositionsRequest struct {
	Owner      string
	Pagination interface{} // cosmos.base.query.v1beta1.PageRequest
}

// QueryLiquidityPositionsResponse is response type for the Query/LiquidityPositions RPC method
type QueryLiquidityPositionsResponse struct {
	Positions  []LiquidityPosition
	Pagination interface{} // cosmos.base.query.v1beta1.PageResponse
}

// QueryEstimateSwapRequest is request type for the Query/EstimateSwap RPC method
type QueryEstimateSwapRequest struct {
	PoolId         uint64
	TokenInDenom   string
	TokenInAmount  math.Int
	TokenOutDenom  string
}

// QueryEstimateSwapResponse is response type for the Query/EstimateSwap RPC method
type QueryEstimateSwapResponse struct {
	TokenOutAmount math.Int
	PriceImpact    string
	SwapFee        math.Int
}
