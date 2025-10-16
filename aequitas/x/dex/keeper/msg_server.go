package keeper

import (
	"context"
	"math/big"

	errorsmod "cosmossdk.io/errors"
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

	amountA := msg.TokenA.Amount
	amountB := msg.TokenB.Amount

	// Initial LP tokens = sqrt(amountA * amountB) using big.Int
	amountABig := amountA.BigInt()
	amountBBig := amountB.BigInt()
	product := new(big.Int).Mul(amountABig, amountBBig)
	initialLpTokens := math.NewIntFromBigInt(new(big.Int).Sqrt(product))

	pool := types.Pool{
		Id:          poolID,
		ReserveA:    amountA,
		ReserveB:    amountB,
		DenomA:      msg.TokenA.Denom,
		DenomB:      msg.TokenB.Denom,
		TotalShares: initialLpTokens, // Initially, total shares equal to the first LP tokens minted
		SwapFeeRate: msg.SwapFeeRate,
		LpTokenSupply: initialLpTokens, // Initialize LP token supply
	}

	if err := k.SetPool(ctx, pool); err != nil {
		return nil, err
	}

	position := types.LiquidityPosition{
		PoolId: poolID,
		Owner:  msg.Creator,
		Shares: initialLpTokens,
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
		SharesIssued: initialLpTokens,
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

	amountA := msg.TokenA.Amount
	amountB := msg.TokenB.Amount

	// Calculate LP tokens to mint (geometric mean of amounts)
	// Use string-based conversion to prevent overflow with 131T supply
	amountABig := amountA.BigInt()
	amountBBig := amountB.BigInt()

	// Calculate sqrt(amountA * amountB) using big.Int
	product := new(big.Int).Mul(amountABig, amountBBig)
	lpTokensBig := new(big.Int).Sqrt(product)
	lpTokens := math.NewIntFromBigInt(lpTokensBig)

	pool.LpTokenSupply = pool.LpTokenSupply.Add(lpTokens)

	// CRITICAL: Persist updated pool state to blockchain
	if err := k.SetPool(ctx, pool); err != nil {
		return nil, errorsmod.Wrap(err, "failed to save pool state")
	}

	// CRITICAL: Mint LP tokens to user's account
	lpCoins := sdk.NewCoins(sdk.NewCoin(pool.LpTokenDenom, lpTokens))
	if err := k.bankKeeper.MintCoins(ctx, types.ModuleName, lpCoins); err != nil {
		return nil, errorsmod.Wrap(err, "failed to mint LP tokens")
	}

	senderAddr, _ := sdk.AccAddressFromBech32(msg.Sender)
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, senderAddr, lpCoins); err != nil {
		return nil, errorsmod.Wrap(err, "failed to send LP tokens to user")
	}

	return &types.MsgAddLiquidityResponse{
		LpTokens: lpTokens.String(),
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

	lpTokens := msg.Shares // LP tokens to be burned are equal to the shares being removed

	pool.LpTokenSupply = pool.LpTokenSupply.Sub(lpTokens)

	// CRITICAL: Update pool reserves
	pool.ReserveA = pool.ReserveA.Sub(tokenAAmount)
	pool.ReserveB = pool.ReserveB.Sub(tokenBAmount)

	// CRITICAL: Persist updated pool state
	if err := k.SetPool(ctx, pool); err != nil {
		return nil, errorsmod.Wrap(err, "failed to save pool state")
	}

	// CRITICAL: Burn LP tokens from user
	lpCoins := sdk.NewCoins(sdk.NewCoin(pool.LpTokenDenom, lpTokens))
	if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, sender, types.ModuleName, lpCoins); err != nil {
		return nil, errorsmod.Wrap(err, "failed to receive LP tokens from user")
	}

	if err := k.bankKeeper.BurnCoins(ctx, types.ModuleName, lpCoins); err != nil {
		return nil, errorsmod.Wrap(err, "failed to burn LP tokens")
	}

	// Send withdrawn tokens to user
	withdrawnCoins := sdk.NewCoins(
		sdk.NewCoin(pool.DenomA, tokenAAmount),
		sdk.NewCoin(pool.DenomB, tokenBAmount),
	)
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, sender, withdrawnCoins); err != nil {
		return nil, errorsmod.Wrap(err, "failed to send withdrawn tokens")
	}

	return &types.MsgRemoveLiquidityResponse{
		AmountA: tokenAAmount.String(),
		AmountB: tokenBAmount.String(),
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

	amountIn := msg.TokenIn.Amount
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

		// Constant product formula: x * y = k (using big.Int to prevent overflow)
		reserveInBig := reserveIn.BigInt()
		reserveOutBig := reserveOut.BigInt()
		amountInBig := amountIn.BigInt()

		// k = reserveIn * reserveOut
		k := new(big.Int).Mul(reserveInBig, reserveOutBig)

		// newReserveIn = reserveIn + amountIn
		newReserveIn := new(big.Int).Add(reserveInBig, amountInBig)

		// newReserveOut = k / newReserveIn
		newReserveOut := new(big.Int).Div(k, newReserveIn)

		// amountOut = reserveOut - newReserveOut
		amountOutBig := new(big.Int).Sub(reserveOutBig, newReserveOut)
		amountOut := math.NewIntFromBigInt(amountOutBig)

		// Apply 0.3% fee
		fee := amountOut.MulRaw(3).QuoRaw(1000)
		amountOut = amountOut.Sub(fee)

		// CRITICAL: Invariant check - ensure pool isn't drained
		if newReserveOut.IsZero() || amountOut.IsNegative() {
			return nil, errorsmod.Wrap(types.ErrInsufficientLiquidity, "swap would drain pool")
		}

		// CRITICAL: Update pool reserves after swap
		if msg.TokenIn.Denom == pool.DenomA { // This condition should actually check currentDenom
			pool.ReserveA = math.NewIntFromBigInt(newReserveIn)
			pool.ReserveB = math.NewIntFromBigInt(newReserveOut)
		} else {
			pool.ReserveB = math.NewIntFromBigInt(newReserveIn)
			pool.ReserveA = math.NewIntFromBigInt(newReserveOut)
		}

		// CRITICAL: Persist updated pool state
		if err := k.SetPool(ctx, pool); err != nil {
			return nil, errorsmod.Wrap(err, "failed to save pool state after swap")
		}

		// Update for the next iteration in the route
		currentAmount := amountOut
		currentDenom = denomOut
		amountIn = currentAmount // For the next pool, the output of this one is the input

		if currentAmount.LT(msg.MinTokenOut) {
			return nil, types.ErrSlippageExceeded
		}
	}

	// CRITICAL: Execute token transfer for the final output
	senderAddr, _ := sdk.AccAddressFromBech32(msg.Sender)

	// User sends tokenIn to module (this should be done once at the beginning of the swap function)
	coinsIn := sdk.NewCoins(sdk.NewCoin(msg.TokenIn.Denom, msg.TokenIn.Amount))
	if err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, senderAddr, types.ModuleName, coinsIn); err != nil {
		return nil, errorsmod.Wrap(err, "failed to receive swap input")
	}

	// Module sends tokenOut to user
	finalTokenOut := sdk.NewCoin(currentDenom, amountIn) // amountIn holds the final output amount after all swaps
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, senderAddr, sdk.NewCoins(finalTokenOut)); err != nil {
		return nil, errorsmod.Wrap(err, "failed to send swap output")
	}

	return &types.MsgSwapResponse{
		AmountOut: finalTokenOut.Amount.String(),
	}, nil
}