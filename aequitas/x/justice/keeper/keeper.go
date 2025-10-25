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

        "github.com/CreoDAMO/REPAR/aequitas/x/justice/types"
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
func (k Keeper) ExecuteJusticeBurn(ctx context.Context, defendantId string, usdAmount math.LegacyDec, reparAmount math.Int, evidenceCid string, txHash string) error {
        sdkCtx := sdk.UnwrapSDKContext(ctx)

        // Create burn record using proto field names
        burn := types.JusticeBurn{
                Id:            fmt.Sprintf("burn-%d", sdkCtx.BlockHeight()),
                DefendantId:   defendantId,
                AmountBurned:  reparAmount,
                UsdEquivalent: usdAmount,
                Timestamp:     sdkCtx.BlockTime().Unix(),
                BlockHeight:   sdkCtx.BlockHeight(),
                TxHash:        txHash,
                EvidenceCid:   evidenceCid,
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
                        TotalUsdValue: math.LegacyNewDec(0),
                        CurrentSupply: math.ZeroInt(),
                        InitialSupply: math.ZeroInt(),
                        TotalBurns:    0,
                        LastBurnTimestamp: 0,
                }
        }

        stats.TotalBurned = stats.TotalBurned.Add(reparAmount)
        stats.TotalUsdValue = stats.TotalUsdValue.Add(usdAmount)
        stats.TotalBurns++
        stats.LastBurnTimestamp = sdkCtx.BlockTime().Unix()

        // Calculate current supply
        supply := k.bankKeeper.GetSupply(ctx, "urepar")
        stats.CurrentSupply = supply.Amount

        if err := k.Statistics.Set(ctx, stats); err != nil {
                return err
        }

        // Emit event
        sdkCtx.EventManager().EmitEvent(
                sdk.NewEvent(
                        "justice_burn",
                        sdk.NewAttribute("burn_id", burn.Id),
                        sdk.NewAttribute("defendant_id", defendantId),
                        sdk.NewAttribute("usd_equivalent", usdAmount.String()),
                        sdk.NewAttribute("amount_burned", reparAmount.String()),
                        sdk.NewAttribute("current_supply", stats.CurrentSupply.String()),
                ),
        )

        k.Logger(ctx).Info("Justice Burn executed",
                "burn_id", burn.Id,
                "defendant_id", defendantId,
                "amount_burned", reparAmount.String(),
                "remaining_supply", stats.CurrentSupply.String(),
        )

        return nil
}

// GetBurnStatistics retrieves burn statistics
func (k Keeper) GetBurnStatistics(ctx context.Context) (types.BurnStatistics, error) {
        stats, err := k.Statistics.Get(ctx)
        if err != nil && err == collections.ErrNotFound {
                // Handle case where statistics item might not exist yet
                return types.BurnStatistics{
                        TotalBurned:       math.ZeroInt(),
                        TotalUsdValue:     math.LegacyNewDec(0),
                        CurrentSupply:     math.ZeroInt(),
                        InitialSupply:     math.ZeroInt(),
                        TotalBurns:        0,
                        LastBurnTimestamp: 0,
                }, nil
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
                        totalBurned = totalBurned.Add(value.AmountBurned)
                }
                return false, nil
        })

        return burns, totalBurned, err
}