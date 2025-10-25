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

// Descendant queries a specific descendant by wallet address
func (q queryServer) Descendant(ctx context.Context, req *types.QueryDescendantRequest) (*types.QueryDescendantResponse, error) {
        descendant, err := q.Keeper.GetDescendant(ctx, req.WalletAddress)
        if err != nil {
                return nil, err
        }

        return &types.QueryDescendantResponse{Descendant: &descendant}, nil
}

// Descendants queries all descendants with pagination
func (q queryServer) Descendants(ctx context.Context, req *types.QueryDescendantsRequest) (*types.QueryDescendantsResponse, error) {
        descendants, err := q.Keeper.ListDescendants(ctx)
        if err != nil {
                return nil, err
        }

        return &types.QueryDescendantsResponse{Descendants: descendants}, nil
}

// DistributionHistory queries distribution history for a descendant
func (q queryServer) DistributionHistory(ctx context.Context, req *types.QueryDistributionHistoryRequest) (*types.QueryDistributionHistoryResponse, error) {
        history, err := q.Keeper.GetDistributionHistory(ctx, req.WalletAddress)
        if err != nil {
                return nil, err
        }

        return &types.QueryDistributionHistoryResponse{Distributions: history}, nil
}

// TotalDistributed queries the total amount distributed
func (q queryServer) TotalDistributed(ctx context.Context, req *types.QueryTotalDistributedRequest) (*types.QueryTotalDistributedResponse, error) {
        total, err := q.Keeper.GetTotalDistributed(ctx)
        if err != nil {
                return nil, err
        }

        return &types.QueryTotalDistributedResponse{TotalAmount: total.String()}, nil
}
