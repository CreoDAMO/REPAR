package keeper

import (
        "context"

        "github.com/CreoDAMO/REPAR/aequitas/x/distribution/types"
)

type queryServer struct {
        Keeper
}

// NewQueryServerImpl returns an implementation of the QueryServer interface
func NewQueryServerImpl(keeper Keeper) types.QueryServer {
        return &queryServer{Keeper: keeper}
}

var _ types.QueryServer = queryServer{}

// GetDescendant queries a specific descendant by address
func (q queryServer) GetDescendant(ctx context.Context, req *types.QueryGetDescendantRequest) (*types.QueryGetDescendantResponse, error) {
        descendant, err := q.Keeper.GetDescendant(ctx, req.Address)
        if err != nil {
                return nil, err
        }

        return &types.QueryGetDescendantResponse{Descendant: descendant}, nil
}

// ListDescendants queries all registered descendants
func (q queryServer) ListDescendants(ctx context.Context, req *types.QueryListDescendantsRequest) (*types.QueryListDescendantsResponse, error) {
        descendants, err := q.Keeper.ListDescendants(ctx)
        if err != nil {
                return nil, err
        }

        return &types.QueryListDescendantsResponse{Descendants: descendants}, nil
}

// ListDistributions queries all distributions
func (q queryServer) ListDistributions(ctx context.Context, req *types.QueryListDistributionsRequest) (*types.QueryListDistributionsResponse, error) {
        distributions, err := q.Keeper.ListDistributions(ctx)
        if err != nil {
                return nil, err
        }

        return &types.QueryListDistributionsResponse{Distributions: distributions}, nil
}
