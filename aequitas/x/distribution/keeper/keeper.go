package keeper

import (
	"context"
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/CreoDAMO/REPAR/aequitas/x/distribution/types"
)

type Keeper struct {
	cdc          codec.BinaryCodec
	storeService store.KVStoreService
	authority    string
	bankKeeper   types.BankKeeper

	// Collections for state management
	Descendants   collections.Map[string, types.Descendant]
	Distributions collections.Map[string, types.Distribution]
	Schema        collections.Schema
}

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	authority string,
	bankKeeper types.BankKeeper,
) Keeper {
	sb := collections.NewSchemaBuilder(storeService)

	k := Keeper{
		cdc:           cdc,
		storeService:  storeService,
		authority:     authority,
		bankKeeper:    bankKeeper,
		Descendants:   collections.NewMap(sb, collections.NewPrefix(0), "descendants", collections.StringKey, codec.CollValue[types.Descendant](cdc)),
		Distributions: collections.NewMap(sb, collections.NewPrefix(1), "distributions", collections.StringKey, codec.CollValue[types.Distribution](cdc)),
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
	return sdkCtx.Logger().With("module", "x/distribution")
}

// RegisterDescendant registers a new descendant with verified lineage
func (k Keeper) RegisterDescendant(ctx context.Context, descendant types.Descendant) error {
	return k.Descendants.Set(ctx, descendant.Id, descendant)
}

// GetDescendant retrieves a descendant by ID
func (k Keeper) GetDescendant(ctx context.Context, id string) (types.Descendant, error) {
	descendant, err := k.Descendants.Get(ctx, id)
	if err != nil {
		return types.Descendant{}, fmt.Errorf("descendant not found: %s", id)
	}
	return descendant, nil
}

// ListDescendants returns all descendants
func (k Keeper) ListDescendants(ctx context.Context) ([]types.Descendant, error) {
	var descendants []types.Descendant
	err := k.Descendants.Walk(ctx, nil, func(key string, value types.Descendant) (bool, error) {
		descendants = append(descendants, value)
		return false, nil
	})
	return descendants, err
}

// ProcessDistribution processes a reparations distribution to a descendant or fund
func (k Keeper) ProcessDistribution(ctx context.Context, distribution types.Distribution) error {
	sdkCtx := sdk.UnwrapSDKContext(ctx)

	// Distribute tokens from module account to recipient
	coins := sdk.NewCoins(sdk.NewCoin("urepar", distribution.Amount))
	recipientAddr, err := sdk.AccAddressFromBech32(distribution.RecipientAddress)
	if err != nil {
		return fmt.Errorf("invalid recipient address: %w", err)
	}

	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, recipientAddr, coins); err != nil {
		return fmt.Errorf("failed to send distribution: %w", err)
	}

	// Save distribution record
	if err := k.Distributions.Set(ctx, distribution.Id, distribution); err != nil {
		return err
	}

	// Update descendant total received if applicable
	if distribution.Type == types.DistributionType_DISTRIBUTION_TYPE_DESCENDANT {
		descendant, err := k.GetDescendant(ctx, distribution.RecipientAddress)
		if err == nil {
			descendant.TotalReceived = descendant.TotalReceived.Add(distribution.Amount)
			k.Descendants.Set(ctx, descendant.Id, descendant)
		}
	}

	// Emit event
	sdkCtx.EventManager().EmitEvent(
		sdk.NewEvent(
			"reparations_distributed",
			sdk.NewAttribute("distribution_id", distribution.Id),
			sdk.NewAttribute("recipient", distribution.RecipientAddress),
			sdk.NewAttribute("amount", distribution.Amount.String()),
			sdk.NewAttribute("type", distribution.Type.String()),
		),
	)

	k.Logger(ctx).Info("Reparations distributed",
		"distribution_id", distribution.Id,
		"recipient", distribution.RecipientAddress,
		"amount", distribution.Amount.String(),
	)

	return nil
}

// GetDistributionsByDescendant returns all distributions for a specific descendant
func (k Keeper) GetDistributionsByDescendant(ctx context.Context, descendantId string) ([]types.Distribution, math.Int, error) {
	var distributions []types.Distribution
	totalAmount := math.ZeroInt()

	err := k.Distributions.Walk(ctx, nil, func(key string, value types.Distribution) (bool, error) {
		if value.RecipientAddress == descendantId {
			distributions = append(distributions, value)
			totalAmount = totalAmount.Add(value.Amount)
		}
		return false, nil
	})

	return distributions, totalAmount, err
}