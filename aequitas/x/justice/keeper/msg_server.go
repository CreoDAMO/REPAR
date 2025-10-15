package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/aequitas/aequitas/x/justice/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the justice MsgServer interface
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

// ExecuteBurn executes the Justice Burn mechanism: $1 USD = 1 REPAR burned permanently
func (ms msgServer) ExecuteBurn(goCtx context.Context, msg *types.MsgExecuteBurn) (*types.MsgExecuteBurnResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Validate authority
	if ms.authority != msg.Authority {
		return nil, fmt.Errorf("invalid authority; expected %s, got %s", ms.authority, msg.Authority)
	}

	// Execute the burn
	if err := ms.Keeper.ExecuteJusticeBurn(
		ctx,
		msg.DefendantId,
		msg.UsdAmount,
		msg.ReparAmount,
		msg.EvidenceCid,
		msg.Description,
	); err != nil {
		return nil, err
	}

	// Get updated statistics
	stats, err := ms.Keeper.GetBurnStatistics(ctx)
	if err != nil {
		return nil, err
	}

	return &types.MsgExecuteBurnResponse{
		TotalBurned:   stats.TotalBurned,
		CurrentSupply: stats.CurrentSupply,
	}, nil
}
