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

	"github.com/aequitas/aequitas/x/justice/types"
)

type Keeper struct {
	cdc          codec.BinaryCodec
	storeService store.KVStoreService
	authority    string
	bankKeeper   types.BankKeeper

	// Collections for state management
	Burns      collections.Map[string, types.JusticeBurn]
	Statistics collections.Item[types.BurnStatistics]
	Schema     collections.Schema
}

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	authority string,
	bankKeeper types.BankKeeper,
) Keeper {
	sb := collections.NewSchemaBuilder(storeService)

	k := Keeper{
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		bankKeeper:   bankKeeper,
		Burns:        collections.NewMap(sb, collections.NewPrefix(0), "burns", collections.StringKey, codec.CollValue[types.JusticeBurn](cdc)),
		Statistics:   collections.NewItem(sb, collections.NewPrefix(1), "statistics", codec.CollValue[types.BurnStatistics](cdc)),
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
	return sdkCtx.Logger().With("module", "x/justice")
}

// ExecuteJusticeBurn burns REPAR tokens permanently (deflationary mechanism)
// Core principle: $1 USD payment = 1 REPAR burned
func (k Keeper) ExecuteJusticeBurn(ctx context.Context, defendantId string, usdAmount math.Int, reparAmount math.Int, evidenceCid string, description string) error {
	sdkCtx := sdk.UnwrapSDKContext(ctx)

	// Create burn record
	burn := types.JusticeBurn{
		Id:          fmt.Sprintf("burn-%d", sdkCtx.BlockHeight()),
		DefendantId: defendantId,
		UsdAmount:   usdAmount,
		ReparAmount: reparAmount,
		EvidenceCid: evidenceCid,
		Description: description,
		Timestamp:   sdkCtx.BlockTime(),
		BurnedBy:    k.authority,
	}

	// Burn the REPAR tokens from the module account
	burnCoins := sdk.NewCoins(sdk.NewCoin("urepar", reparAmount))

	// Burn tokens (permanently remove from supply)
	if err := k.bankKeeper.BurnCoins(ctx, types.ModuleName, burnCoins); err != nil {
		return fmt.Errorf("failed to burn coins: %w", err)
	}

	// Save burn record
	if err := k.Burns.Set(ctx, burn.Id, burn); err != nil {
		return err
	}

	// Update statistics
	stats, err := k.GetBurnStatistics(ctx)
	if err != nil {
		// Initialize if not exists
		stats = types.BurnStatistics{
			TotalBurned:   math.ZeroInt(),
			TotalUsdValue: math.ZeroInt(),
			BurnCount:     0,
		}
	}

	stats.TotalBurned = stats.TotalBurned.Add(reparAmount)
	stats.TotalUsdValue = stats.TotalUsdValue.Add(usdAmount)
	stats.BurnCount++
	stats.LastBurnTime = sdkCtx.BlockTime()

	if err := k.Statistics.Set(ctx, stats); err != nil {
		return err
	}

	// Calculate current supply
	supply := k.bankKeeper.GetSupply(ctx, "urepar")
	stats.CurrentSupply = supply.Amount

	// Emit event
	sdkCtx.EventManager().EmitEvent(
		sdk.NewEvent(
			"justice_burn",
			sdk.NewAttribute("burn_id", burn.Id),
			sdk.NewAttribute("defendant_id", defendantId),
			sdk.NewAttribute("usd_amount", usdAmount.String()),
			sdk.NewAttribute("repar_burned", reparAmount.String()),
			sdk.NewAttribute("current_supply", stats.CurrentSupply.String()),
		),
	)

	k.Logger(ctx).Info("Justice Burn executed",
		"burn_id", burn.Id,
		"defendant_id", defendantId,
		"repar_burned", reparAmount.String(),
		"remaining_supply", stats.CurrentSupply.String(),
	)

	return nil
}

// GetBurnStatistics retrieves burn statistics
func (k Keeper) GetBurnStatistics(ctx context.Context) (types.BurnStatistics, error) {
	stats, err := k.Statistics.Get(ctx)
	if err != nil {
		// Handle case where statistics item might not exist yet
		if collections.ErrNotFound.Is(err) {
			return types.BurnStatistics{
				TotalBurned:   math.ZeroInt(),
				TotalUsdValue: math.ZeroInt(),
				BurnCount:     0,
			}, nil
		}
		return types.BurnStatistics{}, err
	}
	return stats, nil
}

// ListBurns returns all burn records
func (k Keeper) ListBurns(ctx context.Context) ([]types.JusticeBurn, error) {
	var burns []types.JusticeBurn
	err := k.Burns.Walk(ctx, nil, func(key string, value types.JusticeBurn) (bool, error) {
		burns = append(burns, value)
		return false, nil
	})
	return burns, err
}

// GetBurnsByDefendant returns all burns for a specific defendant
func (k Keeper) GetBurnsByDefendant(ctx context.Context, defendantId string) ([]types.JusticeBurn, math.Int, error) {
	var burns []types.JusticeBurn
	totalBurned := math.ZeroInt()

	err := k.Burns.Walk(ctx, nil, func(key string, value types.JusticeBurn) (bool, error) {
		if value.DefendantId == defendantId {
			burns = append(burns, value)
			totalBurned = totalBurned.Add(value.ReparAmount)
		}
		return false, nil
	})

	return burns, totalBurned, err
}