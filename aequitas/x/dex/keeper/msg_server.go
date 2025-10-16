package keeper

import (
        "context"
        "fmt"

        "cosmossdk.io/math"
        sdk "github.com/cosmos/cosmos-sdk/types"
        
        "aequitas/x/dex/types"
)

type msgServer struct {
        Keeper
}

func NewMsgServerImpl(keeper Keeper) types.MsgServer {
        return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

func (k msgServer) CreatePool(goCtx context.Context, msg *types.MsgCreatePool) (*types.MsgCreatePoolResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        if msg.TokenA.Denom == msg.TokenB.Denom {
                return nil, types.ErrInvalidTokenDenom
        }

        if msg.SwapFeeRate > 10000 {
                return nil, types.ErrInvalidSwapFeeRate
        }

        creator, err := sdk.AccAddressFromBech32(msg.Creator)
        if err != nil {
                return nil, err
        }

        poolID, err := k.NextPoolID.Next(ctx)
        if err != nil {
                return nil, err
        }

        coins := sdk.NewCoins(msg.TokenA, msg.TokenB)
        if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, creator, types.ModuleName, coins); err != nil {
                return nil, err
        }

        shares := k.CalculateLiquidityShares(
                math.NewIntFromBigInt(msg.TokenA.Amount.BigInt()),
                math.NewIntFromBigInt(msg.TokenB.Amount.BigInt()),
                math.ZeroInt(),
                math.ZeroInt(),
                math.ZeroInt(),
        )

        pool := types.Pool{
                Id:          poolID,
                ReserveA:    math.NewIntFromBigInt(msg.TokenA.Amount.BigInt()),
                ReserveB:    math.NewIntFromBigInt(msg.TokenB.Amount.BigInt()),
                DenomA:      msg.TokenA.Denom,
                DenomB:      msg.TokenB.Denom,
                TotalShares: shares,
                SwapFeeRate: msg.SwapFeeRate,
        }

        if err := k.SetPool(ctx, pool); err != nil {
                return nil, err
        }

        position := types.LiquidityPosition{
                PoolId: poolID,
                Owner:  msg.Creator,
                Shares: shares,
        }

        if err := k.SetLiquidityPosition(ctx, position); err != nil {
                return nil, err
        }

        ctx.EventManager().EmitEvent(
                sdk.NewEvent(
                        types.EventTypeCreatePool,
                        sdk.NewAttribute(types.AttributeKeyPoolID, fmt.Sprintf("%d", poolID)),
                        sdk.NewAttribute(types.AttributeKeyCreator, msg.Creator),
                ),
        )

        return &types.MsgCreatePoolResponse{
                PoolId:       poolID,
                SharesIssued: shares,
        }, nil
}

func (k msgServer) AddLiquidity(goCtx context.Context, msg *types.MsgAddLiquidity) (*types.MsgAddLiquidityResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        pool, err := k.GetPool(ctx, msg.PoolId)
        if err != nil {
                return nil, err
        }

        if msg.TokenA.Denom != pool.DenomA || msg.TokenB.Denom != pool.DenomB {
                return nil, types.ErrInvalidTokenDenom
        }

        sender, err := sdk.AccAddressFromBech32(msg.Sender)
        if err != nil {
                return nil, err
        }

        coins := sdk.NewCoins(msg.TokenA, msg.TokenB)
        if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, sender, types.ModuleName, coins); err != nil {
                return nil, err
        }

        shares := k.CalculateLiquidityShares(
                math.NewIntFromBigInt(msg.TokenA.Amount.BigInt()),
                math.NewIntFromBigInt(msg.TokenB.Amount.BigInt()),
                pool.ReserveA,
                pool.ReserveB,
                pool.TotalShares,
        )

        if shares.LT(msg.MinShares) {
                return nil, types.ErrSlippageExceeded
        }

        pool.ReserveA = pool.ReserveA.Add(math.NewIntFromBigInt(msg.TokenA.Amount.BigInt()))
        pool.ReserveB = pool.ReserveB.Add(math.NewIntFromBigInt(msg.TokenB.Amount.BigInt()))
        pool.TotalShares = pool.TotalShares.Add(shares)

        if err := k.SetPool(ctx, pool); err != nil {
                return nil, err
        }

        position, err := k.GetLiquidityPosition(ctx, msg.Sender, msg.PoolId)
        if err != nil {
                position = types.LiquidityPosition{
                        PoolId: msg.PoolId,
                        Owner:  msg.Sender,
                        Shares: math.ZeroInt(),
                }
        }

        position.Shares = position.Shares.Add(shares)
        if err := k.SetLiquidityPosition(ctx, position); err != nil {
                return nil, err
        }

        return &types.MsgAddLiquidityResponse{
                SharesIssued: shares,
        }, nil
}

func (k msgServer) RemoveLiquidity(goCtx context.Context, msg *types.MsgRemoveLiquidity) (*types.MsgRemoveLiquidityResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        pool, err := k.GetPool(ctx, msg.PoolId)
        if err != nil {
                return nil, err
        }

        position, err := k.GetLiquidityPosition(ctx, msg.Sender, msg.PoolId)
        if err != nil {
                return nil, types.ErrInsufficientShares
        }

        if position.Shares.LT(msg.Shares) {
                return nil, types.ErrInsufficientShares
        }

        tokenAAmount := msg.Shares.Mul(pool.ReserveA).Quo(pool.TotalShares)
        tokenBAmount := msg.Shares.Mul(pool.ReserveB).Quo(pool.TotalShares)

        if tokenAAmount.LT(msg.MinTokenA) || tokenBAmount.LT(msg.MinTokenB) {
                return nil, types.ErrSlippageExceeded
        }

        sender, err := sdk.AccAddressFromBech32(msg.Sender)
        if err != nil {
                return nil, err
        }

        coins := sdk.NewCoins(
                sdk.NewCoin(pool.DenomA, sdk.NewIntFromBigInt(tokenAAmount.BigInt())),
                sdk.NewCoin(pool.DenomB, sdk.NewIntFromBigInt(tokenBAmount.BigInt())),
        )

        if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, sender, coins); err != nil {
                return nil, err
        }

        pool.ReserveA = pool.ReserveA.Sub(tokenAAmount)
        pool.ReserveB = pool.ReserveB.Sub(tokenBAmount)
        pool.TotalShares = pool.TotalShares.Sub(msg.Shares)

        if err := k.SetPool(ctx, pool); err != nil {
                return nil, err
        }

        position.Shares = position.Shares.Sub(msg.Shares)
        if err := k.SetLiquidityPosition(ctx, position); err != nil {
                return nil, err
        }

        return &types.MsgRemoveLiquidityResponse{
                TokenA: coins[0],
                TokenB: coins[1],
        }, nil
}

func (k msgServer) Swap(goCtx context.Context, msg *types.MsgSwap) (*types.MsgSwapResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        if len(msg.Routes) == 0 {
                return nil, types.ErrInvalidSwapRoute
        }

        sender, err := sdk.AccAddressFromBech32(msg.Sender)
        if err != nil {
                return nil, err
        }

        if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, sender, types.ModuleName, sdk.NewCoins(msg.TokenIn)); err != nil {
                return nil, err
        }

        currentAmount := math.NewIntFromBigInt(msg.TokenIn.Amount.BigInt())
        currentDenom := msg.TokenIn.Denom

        for _, route := range msg.Routes {
                pool, err := k.GetPool(ctx, route.PoolId)
                if err != nil {
                        return nil, err
                }

                var reserveIn, reserveOut math.Int
                var denomOut string

                if currentDenom == pool.DenomA {
                        reserveIn = pool.ReserveA
                        reserveOut = pool.ReserveB
                        denomOut = pool.DenomB
                } else if currentDenom == pool.DenomB {
                        reserveIn = pool.ReserveB
                        reserveOut = pool.ReserveA
                        denomOut = pool.DenomA
                } else {
                        return nil, types.ErrInvalidSwapRoute
                }

                outputAmount := k.CalculateSwapOutput(currentAmount, reserveIn, reserveOut, pool.SwapFeeRate)

                if currentDenom == pool.DenomA {
                        pool.ReserveA = pool.ReserveA.Add(currentAmount)
                        pool.ReserveB = pool.ReserveB.Sub(outputAmount)
                } else {
                        pool.ReserveB = pool.ReserveB.Add(currentAmount)
                        pool.ReserveA = pool.ReserveA.Sub(outputAmount)
                }

                if err := k.SetPool(ctx, pool); err != nil {
                        return nil, err
                }

                currentAmount = outputAmount
                currentDenom = denomOut
        }

        if currentAmount.LT(msg.MinTokenOut) {
                return nil, types.ErrSlippageExceeded
        }

        tokenOut := sdk.NewCoin(currentDenom, sdk.NewIntFromBigInt(currentAmount.BigInt()))
        if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, sender, sdk.NewCoins(tokenOut)); err != nil {
                return nil, err
        }

        return &types.MsgSwapResponse{
                TokenOut: tokenOut,
        }, nil
}
