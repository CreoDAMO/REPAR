package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"

	"github.com/CreoDAMO/REPAR/aequitas/x/defendant/types"
)

var _ types.QueryServer = queryServer{}

type queryServer struct {
	Keeper
}

// NewQueryServerImpl returns an implementation of the defendant QueryServer interface
func NewQueryServerImpl(keeper Keeper) types.QueryServer {
	return &queryServer{Keeper: keeper}
}

// GetDefendant queries a defendant by ID
func (qs queryServer) GetDefendant(goCtx context.Context, req *types.QueryGetDefendantRequest) (*types.QueryGetDefendantResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	defendant, err := qs.Keeper.GetDefendant(ctx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QueryGetDefendantResponse{
		Defendant: defendant,
	}, nil
}

// ListDefendants queries all defendants with pagination
func (qs queryServer) ListDefendants(goCtx context.Context, req *types.QueryListDefendantsRequest) (*types.QueryListDefendantsResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var defendants []types.Defendant
	defendants, pageRes, err := query.CollectionPaginate(
		ctx,
		qs.Keeper.Defendants,
		req.Pagination,
		func(key string, value types.Defendant) (types.Defendant, error) {
			return value, nil
		},
	)
	if err != nil {
		return nil, err
	}

	return &types.QueryListDefendantsResponse{
		Defendants: defendants,
		Pagination: pageRes,
	}, nil
}

// GetTotalLiability queries the total outstanding liability
func (qs queryServer) GetTotalLiability(goCtx context.Context, req *types.QueryGetTotalLiabilityRequest) (*types.QueryGetTotalLiabilityResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	total, paid, remaining, err := qs.Keeper.GetTotalLiability(ctx)
	if err != nil {
		return nil, err
	}

	return &types.QueryGetTotalLiabilityResponse{
		TotalLiability: total,
		TotalPaid:      paid,
		Remaining:      remaining,
	}, nil
}