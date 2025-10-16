
package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"aequitas/x/dex/types"
)

type queryServer struct {
	Keeper
}

// NewQueryServerImpl returns an implementation of the QueryServer interface
func NewQueryServerImpl(keeper Keeper) types.QueryServer {
	return &queryServer{Keeper: keeper}
}

var _ types.QueryServer = queryServer{}

func (k queryServer) Params(goCtx context.Context, req *types.QueryParamsRequest) (*types.QueryParamsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	params, err := k.Keeper.Params.Get(ctx)
	if err != nil {
		return nil, err
	}

	return &types.QueryParamsResponse{Params: params}, nil
}

func (k queryServer) OrderBook(goCtx context.Context, req *types.QueryOrderBookRequest) (*types.QueryOrderBookResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	
	orderBook, err := k.Keeper.OrderBooks.Get(ctx, req.PairId)
	if err != nil {
		return nil, types.ErrOrderBookNotFound
	}

	return &types.QueryOrderBookResponse{OrderBook: orderBook}, nil
}

func (k queryServer) Order(goCtx context.Context, req *types.QueryOrderRequest) (*types.QueryOrderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	
	order, err := k.Keeper.Orders.Get(ctx, req.OrderId)
	if err != nil {
		return nil, types.ErrOrderNotFound
	}

	return &types.QueryOrderResponse{Order: order}, nil
}
