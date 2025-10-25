package keeper

import (
        "context"

        "github.com/CreoDAMO/REPAR/aequitas/x/claims/types"
)

type queryServer struct {
        Keeper
}

// NewQueryServerImpl returns an implementation of the QueryServer interface
func NewQueryServerImpl(keeper Keeper) types.QueryServer {
        return &queryServer{Keeper: keeper}
}

var _ types.QueryServer = queryServer{}

// GetClaim queries a specific claim by ID
func (q queryServer) GetClaim(ctx context.Context, req *types.QueryGetClaimRequest) (*types.QueryGetClaimResponse, error) {
        claim, err := q.Keeper.GetClaim(ctx, req.Id)
        if err != nil {
                return nil, err
        }

        return &types.QueryGetClaimResponse{Claim: claim}, nil
}

// ListClaims queries all claims with pagination
func (q queryServer) ListClaims(ctx context.Context, req *types.QueryListClaimsRequest) (*types.QueryListClaimsResponse, error) {
        claims, err := q.Keeper.ListClaims(ctx)
        if err != nil {
                return nil, err
        }

        return &types.QueryListClaimsResponse{Claims: claims}, nil
}

// ListClaimsByDefendant queries claims by defendant ID
func (q queryServer) ListClaimsByDefendant(ctx context.Context, req *types.QueryListClaimsByDefendantRequest) (*types.QueryListClaimsByDefendantResponse, error) {
        claims, err := q.Keeper.GetClaimsByDefendant(ctx, req.DefendantId)
        if err != nil {
                return nil, err
        }

        return &types.QueryListClaimsByDefendantResponse{Claims: claims}, nil
}

// ListClaimsByClaimant queries claims by claimant address
func (q queryServer) ListClaimsByClaimant(ctx context.Context, req *types.QueryListClaimsByClaimantRequest) (*types.QueryListClaimsByClaimantResponse, error) {
        claims, err := q.Keeper.GetClaimsByClaimant(ctx, req.Claimant)
        if err != nil {
                return nil, err
        }

        return &types.QueryListClaimsByClaimantResponse{Claims: claims}, nil
}
