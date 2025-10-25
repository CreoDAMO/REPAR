
package keeper

import (
        "context"
        
        "cosmossdk.io/math"
        
        "github.com/CreoDAMO/REPAR/aequitas/x/dex/types"
)

// InitGenesis initializes the DEX module's state from a provided genesis state
func (k Keeper) InitGenesis(ctx context.Context, data types.GenesisState) error {
        // Set initial pools
        for _, pool := range data.Pools {
                if err := k.SetPool(ctx, pool); err != nil {
                        return err
                }
        }
        
        // Create default REPAR/USDC pool if none exist
        pools, err := k.Pools.Iterate(ctx, nil)
        if err != nil {
                return err
        }
        defer pools.Close()
        
        hasPool := false
        for ; pools.Valid(); pools.Next() {
                hasPool = true
                break
        }
        
        if !hasPool {
                // Create initial REPAR/USDC pool
                // NOTE: $REPAR is the NATIVE COIN of Aequitas Zone L1 (not a token)
                // "urepar" is the micro-denomination (1 REPAR = 1,000,000 urepar)
                // This pool enables native coin-to-coin swaps at $18.33 initial price
                poolID, err := k.NextPoolID.Next(ctx)
                if err != nil {
                        return err
                }
                
                pool := types.Pool{
                        Id:            poolID,
                        ReserveA:      math.NewInt(1_000_000_000_000), // 1M REPAR (in micro units = urepar)
                        ReserveB:      math.NewInt(18_330_000_000),    // $18.33M USDC (1M REPAR * $18.33)
                        DenomA:        "urepar",                       // Native coin denomination (NOT a token)
                        DenomB:        "uusdc",                        // USDC native coin denomination
                        TotalShares:   math.NewInt(1_000_000_000_000), // Initial LP shares
                        SwapFeeRate:   30,                              // 0.3% fee (55% to LPs, 30% Endowment, 15% Treasury)
                        LpTokenDenom:  "pool1-lp",                     // LP receipt token (separate from native coins)
                        LpTokenSupply: math.NewInt(1_000_000_000_000), // LP token supply
                }
                
                if err := k.SetPool(ctx, pool); err != nil {
                        return err
                }
        }
        
        return nil
}

// ExportGenesis returns the DEX module's exported genesis
func (k Keeper) ExportGenesis(ctx context.Context) (*types.GenesisState, error) {
        var pools []types.Pool
        
        err := k.Pools.Walk(ctx, nil, func(key uint64, value types.Pool) (stop bool, err error) {
                pools = append(pools, value)
                return false, nil
        })
        
        if err != nil {
                return nil, err
        }
        
        return &types.GenesisState{
                Pools: pools,
        }, nil
}
