package keeper

import (
        "context"
        "fmt"

        "cosmossdk.io/math"
        sdk "github.com/cosmos/cosmos-sdk/types"
        
        "aequitas/x/dex/types"
)

func (k Keeper) DistributeTradingFees(ctx context.Context, totalFees math.Int, feeDenom string) error {
        sdkCtx := sdk.UnwrapSDKContext(ctx)

        communityAllocation := totalFees.MulRaw(55).QuoRaw(100)
        lpAllocation := totalFees.MulRaw(30).QuoRaw(100)
        socialAllocation := totalFees.MulRaw(15).QuoRaw(100)

        communityCoins := sdk.NewCoins(sdk.NewCoin(feeDenom, communityAllocation))
        lpCoins := sdk.NewCoins(sdk.NewCoin(feeDenom, lpAllocation))
        socialCoins := sdk.NewCoins(sdk.NewCoin(feeDenom, socialAllocation))

        communityAddr := k.accountKeeper.GetModuleAddress("distribution")
        if communityAddr != nil {
                if err := k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.ModuleName, "distribution", communityCoins); err != nil {
                        return fmt.Errorf("failed to send community allocation: %w", err)
                }
        }

        endowmentAddr := k.accountKeeper.GetModuleAddress("endowment")
        if endowmentAddr != nil {
                if err := k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.ModuleName, "endowment", lpCoins); err != nil {
                        return fmt.Errorf("failed to send LP allocation: %w", err)
                }

                if err := k.bankKeeper.SendCoinsFromModuleToModule(ctx, types.ModuleName, "endowment", socialCoins); err != nil {
                        return fmt.Errorf("failed to send social allocation: %w", err)
                }
        }

        sdkCtx.EventManager().EmitEvent(
                sdk.NewEvent(
                        "fee_distribution",
                        sdk.NewAttribute("total_fees", totalFees.String()),
                        sdk.NewAttribute("community_allocation", communityAllocation.String()),
                        sdk.NewAttribute("lp_allocation", lpAllocation.String()),
                        sdk.NewAttribute("social_allocation", socialAllocation.String()),
                ),
        )

        return nil
}

func (k Keeper) CollectAndDistributeFees(ctx context.Context, feeAmount math.Int, feeDenom string) error {
        if feeAmount.IsZero() {
                return nil
        }

        return k.DistributeTradingFees(ctx, feeAmount, feeDenom)
}
