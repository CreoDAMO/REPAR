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

// Claim queries a specific claim by ID
func (q queryServer) Claim(ctx context.Context, req *types.QueryClaimRequest) (*types.QueryClaimResponse, error) {
        claim, err := q.Keeper.GetClaim(ctx, req.Id)
        if err != nil {
                return nil, err
        }

        return &types.QueryClaimResponse{Claim: claim}, nil
}

// Claims queries all claims with pagination
func (q queryServer) Claims(ctx context.Context, req *types.QueryClaimsRequest) (*types.QueryClaimsResponse, error) {
        claims, err := q.Keeper.ListClaims(ctx)
        if err != nil {
                return nil, err
        }

        return &types.QueryClaimsResponse{Claims: claims}, nil
}

// ClaimsByDefendant queries claims by defendant ID
func (q queryServer) ClaimsByDefendant(ctx context.Context, req *types.QueryClaimsByDefendantRequest) (*types.QueryClaimsByDefendantResponse, error) {
        claims, err := q.Keeper.GetClaimsByDefendant(ctx, req.DefendantId)
        if err != nil {
                return nil, err
        }

        return &types.QueryClaimsByDefendantResponse{Claims: claims}, nil
}

// ClaimsByJurisdiction queries claims by jurisdiction
func (q queryServer) ClaimsByJurisdiction(ctx context.Context, req *types.QueryClaimsByJurisdictionRequest) (*types.QueryClaimsByJurisdictionResponse, error) {
        claims, err := q.Keeper.GetClaimsByJurisdiction(ctx, req.Jurisdiction)
        if err != nil {
                return nil, err
        }

        return &types.QueryClaimsByJurisdictionResponse{Claims: claims}, nil
}
