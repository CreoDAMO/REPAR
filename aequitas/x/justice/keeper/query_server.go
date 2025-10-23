package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/CreoDAMO/REPAR/aequitas/x/justice/types"
)

var _ types.QueryServer = queryServer{}

type queryServer struct {
	Keeper
}

// NewQueryServerImpl returns an implementation of the justice QueryServer interface
func NewQueryServerImpl(keeper Keeper) types.QueryServer {
	return &queryServer{Keeper: keeper}
}

// GetBurnStatistics queries burn statistics
func (qs queryServer) GetBurnStatistics(goCtx context.Context, req *types.QueryGetBurnStatisticsRequest) (*types.QueryGetBurnStatisticsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	stats, err := qs.Keeper.GetBurnStatistics(ctx)
	if err != nil {
		return nil, err
	}

	return &types.QueryGetBurnStatisticsResponse{
		Statistics: stats,
	}, nil
}

// ListBurns queries all burns with pagination
func (qs queryServer) ListBurns(goCtx context.Context, req *types.QueryListBurnsRequest) (*types.QueryListBurnsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	burns, err := qs.Keeper.ListBurns(ctx)
	if err != nil {
		return nil, err
	}

	return &types.QueryListBurnsResponse{
		Burns: burns,
	}, nil
}

// GetBurnByDefendant queries burns by defendant ID
func (qs queryServer) GetBurnByDefendant(goCtx context.Context, req *types.QueryGetBurnByDefendantRequest) (*types.QueryGetBurnByDefendantResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	burns, totalBurned, err := qs.Keeper.GetBurnsByDefendant(ctx, req.DefendantId)
	if err != nil {
		return nil, err
	}

	return &types.QueryGetBurnByDefendantResponse{
		Burns:        burns,
		TotalBurned:  totalBurned,
	}, nil
}
