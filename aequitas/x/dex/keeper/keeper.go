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
	
	"aequitas/x/dex/types"
)

type Keeper struct {
	cdc          codec.BinaryCodec
	storeService store.KVStoreService
	logger       log.Logger

	// the address capable of executing a MsgUpdateParams message
	authority string

	bankKeeper    types.BankKeeper
	accountKeeper types.AccountKeeper

	Schema collections.Schema
	Params collections.Item[types.Params]
	Pools  collections.Map[uint64, types.Pool]
	LiquidityPositions collections.Map[collections.Pair[string, uint64], types.LiquidityPosition]
	NextPoolID collections.Sequence
}

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,
	bankKeeper types.BankKeeper,
	accountKeeper types.AccountKeeper,
) Keeper {
	sb := collections.NewSchemaBuilder(storeService)

	k := Keeper{
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		logger:       logger,
		bankKeeper:   bankKeeper,
		accountKeeper: accountKeeper,
		Params:        collections.NewItem(sb, types.ParamsKey, "params", codec.CollValue[types.Params](cdc)),
		Pools:         collections.NewMap(sb, types.PoolKey, "pools", collections.Uint64Key, codec.CollValue[types.Pool](cdc)),
		LiquidityPositions: collections.NewMap(sb, types.LiquidityPositionKey, "liquidity_positions", 
			collections.PairKeyCodec(collections.StringKey, collections.Uint64Key), codec.CollValue[types.LiquidityPosition](cdc)),
		NextPoolID:    collections.NewSequence(sb, types.NextPoolIDKey, "next_pool_id"),
	}

	schema, err := sb.Build()
	if err != nil {
		panic(err)
	}
	k.Schema = schema

	return k
}

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// GetPool retrieves a pool by ID
func (k Keeper) GetPool(ctx context.Context, poolID uint64) (types.Pool, error) {
	pool, err := k.Pools.Get(ctx, poolID)
	if err != nil {
		return types.Pool{}, types.ErrPoolNotFound
	}
	return pool, nil
}

// SetPool stores a pool
func (k Keeper) SetPool(ctx context.Context, pool types.Pool) error {
	return k.Pools.Set(ctx, pool.Id, pool)
}

// GetLiquidityPosition retrieves a liquidity position
func (k Keeper) GetLiquidityPosition(ctx context.Context, owner string, poolID uint64) (types.LiquidityPosition, error) {
	position, err := k.LiquidityPositions.Get(ctx, collections.Join(owner, poolID))
	if err != nil {
		return types.LiquidityPosition{}, err
	}
	return position, nil
}

// SetLiquidityPosition stores a liquidity position
func (k Keeper) SetLiquidityPosition(ctx context.Context, position types.LiquidityPosition) error {
	return k.LiquidityPositions.Set(ctx, collections.Join(position.Owner, position.PoolId), position)
}

// CalculateSwapOutput calculates the output amount for a swap using constant product formula (x*y=k)
// Formula: amountOut = (amountIn * reserveOut * (10000 - feeRate)) / ((reserveIn * 10000) + (amountIn * (10000 - feeRate)))
func (k Keeper) CalculateSwapOutput(amountIn, reserveIn, reserveOut math.Int, feeRate uint64) math.Int {
	// Calculate fee (in basis points, e.g., 30 = 0.3%)
	tenThousand := math.NewInt(10000)
	feeRateInt := math.NewInt(int64(feeRate))
	
	// amountInWithFee = amountIn * (10000 - feeRate)
	amountInWithFee := amountIn.Mul(tenThousand.Sub(feeRateInt))
	
	// numerator = amountInWithFee * reserveOut
	numerator := amountInWithFee.Mul(reserveOut)
	
	// denominator = (reserveIn * 10000) + amountInWithFee
	denominator := reserveIn.Mul(tenThousand).Add(amountInWithFee)
	
	// amountOut = numerator / denominator
	if denominator.IsZero() {
		return math.ZeroInt()
	}
	
	return numerator.Quo(denominator)
}

// CalculateLiquidityShares calculates shares to mint when adding liquidity
func (k Keeper) CalculateLiquidityShares(amountA, amountB, reserveA, reserveB, totalShares math.Int) math.Int {
	// If this is the first liquidity provision, shares = sqrt(amountA * amountB)
	if totalShares.IsZero() {
		// Simple geometric mean for initial shares
		product := amountA.Mul(amountB)
		return Sqrt(product)
	}
	
	// shares = min(amountA * totalShares / reserveA, amountB * totalShares / reserveB)
	sharesFromA := amountA.Mul(totalShares).Quo(reserveA)
	sharesFromB := amountB.Mul(totalShares).Quo(reserveB)
	
	if sharesFromA.LT(sharesFromB) {
		return sharesFromA
	}
	return sharesFromB
}

// Sqrt calculates the square root of x using Newton's method
func Sqrt(x math.Int) math.Int {
	if x.IsZero() {
		return math.ZeroInt()
	}
	
	// Initial guess: x / 2
	z := x.QuoRaw(2)
	y := x
	
	// Newton's method: z = (z + x/z) / 2
	for z.LT(y) {
		y = z
		z = x.Quo(z).Add(z).QuoRaw(2)
	}
	
	return y
}

// GetModuleAddress returns the dex module's address
func (k Keeper) GetModuleAddress() sdk.AccAddress {
	return k.accountKeeper.GetModuleAddress(types.ModuleName)
}
