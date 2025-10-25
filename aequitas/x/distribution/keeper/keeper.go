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
        Descendants   collections.Map[string, types.DescendantRegistration]
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
                Descendants:   collections.NewMap(sb, collections.NewPrefix(0), "descendants", collections.StringKey, codec.CollValue[types.DescendantRegistration](cdc)),
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
func (k Keeper) RegisterDescendant(ctx context.Context, descendant types.DescendantRegistration) error {
        return k.Descendants.Set(ctx, descendant.Address, descendant)
}

// GetDescendant retrieves a descendant by ID
func (k Keeper) GetDescendant(ctx context.Context, address string) (types.DescendantRegistration, error) {
        descendant, err := k.Descendants.Get(ctx, address)
        if err != nil {
                return types.DescendantRegistration{}, fmt.Errorf("descendant not found: %s", address)
        }
        return descendant, nil
}

// ListDescendants returns all descendants
func (k Keeper) ListDescendants(ctx context.Context) ([]types.DescendantRegistration, error) {
        var descendants []types.DescendantRegistration
        err := k.Descendants.Walk(ctx, nil, func(key string, value types.DescendantRegistration) (bool, error) {
                descendants = append(descendants, value)
                return false, nil
        })
        return descendants, err
}

// ProcessDistribution processes a reparations distribution
func (k Keeper) ProcessDistribution(ctx context.Context, distribution types.Distribution) error {
        sdkCtx := sdk.UnwrapSDKContext(ctx)

        // Save distribution record
        if err := k.Distributions.Set(ctx, distribution.Id, distribution); err != nil {
                return err
        }

        // Emit event
        sdkCtx.EventManager().EmitEvent(
                sdk.NewEvent(
                        "reparations_distribution_scheduled",
                        sdk.NewAttribute("distribution_id", distribution.Id),
                        sdk.NewAttribute("total_amount", distribution.TotalAmount.String()),
                        sdk.NewAttribute("type", distribution.Type.String()),
                        sdk.NewAttribute("source_defendant", distribution.SourceDefendant),
                ),
        )

        k.Logger(ctx).Info("Reparations distribution scheduled",
                "distribution_id", distribution.Id,
                "total_amount", distribution.TotalAmount.String(),
                "type", distribution.Type.String(),
        )

        return nil
}

// GetDistributionsByDefendant returns all distributions from a specific defendant
func (k Keeper) GetDistributionsByDefendant(ctx context.Context, defendantId string) ([]types.Distribution, math.Int, error) {
        var distributions []types.Distribution
        totalAmount := math.ZeroInt()

        err := k.Distributions.Walk(ctx, nil, func(key string, value types.Distribution) (bool, error) {
                if value.SourceDefendant == defendantId {
                        distributions = append(distributions, value)
                        totalAmount = totalAmount.Add(value.TotalAmount)
                }
                return false, nil
        })

        return distributions, totalAmount, err
}