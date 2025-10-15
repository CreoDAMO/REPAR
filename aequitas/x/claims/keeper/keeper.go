package keeper

import (
	"context"
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/aequitas/aequitas/x/claims/types"
)

type Keeper struct {
	cdc          codec.BinaryCodec
	storeService store.KVStoreService
	authority    string

	// Collections for state management
	Claims collections.Map[string, types.ArbitrationClaim]
	Awards collections.Map[string, types.ArbitrationAward]
	Schema collections.Schema
}

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	authority string,
) Keeper {
	sb := collections.NewSchemaBuilder(storeService)

	k := Keeper{
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		Claims:       collections.NewMap(sb, collections.NewPrefix(0), "claims", collections.StringKey, codec.CollValue[types.ArbitrationClaim](cdc)),
		Awards:       collections.NewMap(sb, collections.NewPrefix(1), "awards", collections.StringKey, codec.CollValue[types.ArbitrationAward](cdc)),
	}

	schema, err := sb.Build()
	if err != nil {
		panic(err)
	}
	k.Schema = schema

	return k
}

func (k Keeper) Logger(ctx context.Context) log.Logger {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	return sdkCtx.Logger().With("module", "x/claims")
}

// FileClaim files a new arbitration claim
func (k Keeper) FileClaim(ctx context.Context, claim types.ArbitrationClaim) error {
	return k.Claims.Set(ctx, claim.Id, claim)
}

// GetClaim retrieves a claim by ID
func (k Keeper) GetClaim(ctx context.Context, id string) (types.ArbitrationClaim, error) {
	claim, err := k.Claims.Get(ctx, id)
	if err != nil {
		return types.ArbitrationClaim{}, fmt.Errorf("claim not found: %s", id)
	}
	return claim, nil
}

// ListClaims returns all claims
func (k Keeper) ListClaims(ctx context.Context) ([]types.ArbitrationClaim, error) {
	var claims []types.ArbitrationClaim
	err := k.Claims.Walk(ctx, nil, func(key string, value types.ArbitrationClaim) (bool, error) {
		claims = append(claims, value)
		return false, nil
	})
	return claims, err
}

// IssueAward issues an arbitration award
func (k Keeper) IssueAward(ctx context.Context, award types.ArbitrationAward) error {
	// Update claim status
	claim, err := k.GetClaim(ctx, award.ClaimId)
	if err != nil {
		return err
	}

	claim.Status = types.ClaimStatus_CLAIM_STATUS_AWARDED
	if err := k.Claims.Set(ctx, claim.Id, claim); err != nil {
		return err
	}

	// Save award
	return k.Awards.Set(ctx, award.Id, award)
}

// GetClaimsByDefendant returns all claims for a specific defendant
func (k Keeper) GetClaimsByDefendant(ctx context.Context, defendantId string) ([]types.ArbitrationClaim, error) {
	var claims []types.ArbitrationClaim
	err := k.Claims.Walk(ctx, nil, func(key string, value types.ArbitrationClaim) (bool, error) {
		if value.DefendantId == defendantId {
			claims = append(claims, value)
		}
		return false, nil
	})
	return claims, err
}

// GetClaimsByJurisdiction returns all claims for a specific jurisdiction
func (k Keeper) GetClaimsByJurisdiction(ctx context.Context, jurisdiction string) ([]types.ArbitrationClaim, error) {
	var claims []types.ArbitrationClaim
	err := k.Claims.Walk(ctx, nil, func(key string, value types.ArbitrationClaim) (bool, error) {
		if value.Jurisdiction == jurisdiction {
			claims = append(claims, value)
		}
		return false, nil
	})
	return claims, err
}
