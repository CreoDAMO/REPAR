
package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"aequitas/x/dex/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

func (k msgServer) CreateOrderBook(goCtx context.Context, msg *types.MsgCreateOrderBook) (*types.MsgCreateOrderBookResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if err := k.Keeper.CreateOrderBook(ctx, msg.BaseDenom, msg.QuoteDenom); err != nil {
		return nil, err
	}

	return &types.MsgCreateOrderBookResponse{}, nil
}

func (k msgServer) PlaceOrder(goCtx context.Context, msg *types.MsgPlaceOrder) (*types.MsgPlaceOrderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	orderID, err := k.Keeper.PlaceOrder(ctx, msg.Creator, msg.OrderType, msg.BaseDenom, msg.QuoteDenom, msg.Amount, msg.Price)
	if err != nil {
		return nil, err
	}

	return &types.MsgPlaceOrderResponse{
		OrderId: orderID,
	}, nil
}

func (k msgServer) CancelOrder(goCtx context.Context, msg *types.MsgCancelOrder) (*types.MsgCancelOrderResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if err := k.Keeper.CancelOrder(ctx, msg.OrderId, msg.Creator); err != nil {
		return nil, err
	}

	return &types.MsgCancelOrderResponse{}, nil
}
