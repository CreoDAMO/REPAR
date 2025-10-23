package keeper

import (
        "context"

        "cosmossdk.io/collections"
        "cosmossdk.io/math"
        "google.golang.org/grpc/codes"
        "google.golang.org/grpc/status"

        "github.com/CreoDAMO/REPAR/aequitas/x/dex/types"
)

type queryServer struct {
        Keeper
}

func NewQueryServerImpl(keeper Keeper) types.QueryServer {
        return &queryServer{Keeper: keeper}
}

var _ types.QueryServer = queryServer{}

func (k queryServer) Pool(goCtx context.Context, req *types.QueryPoolRequest) (*types.QueryPoolResponse, error) {
        if req == nil {
                return nil, status.Error(codes.InvalidArgument, "invalid request")
        }

        pool, err := k.GetPool(goCtx, req.PoolId)
        if err != nil {
                return nil, err
        }

        return &types.QueryPoolResponse{
                Pool: pool,
        }, nil
}

func (k queryServer) Pools(goCtx context.Context, req *types.QueryPoolsRequest) (*types.QueryPoolsResponse, error) {
        if req == nil {
                return nil, status.Error(codes.InvalidArgument, "invalid request")
        }

        var pools []types.Pool
        err := k.Keeper.Pools.Walk(goCtx, nil, func(key uint64, value types.Pool) (stop bool, err error) {
                pools = append(pools, value)
                return false, nil
        })

        if err != nil {
                return nil, err
        }

        return &types.QueryPoolsResponse{
                Pools: pools,
        }, nil
}

func (k queryServer) LiquidityPosition(goCtx context.Context, req *types.QueryLiquidityPositionRequest) (*types.QueryLiquidityPositionResponse, error) {
        if req == nil {
                return nil, status.Error(codes.InvalidArgument, "invalid request")
        }

        position, err := k.GetLiquidityPosition(goCtx, req.Owner, req.PoolId)
        if err != nil {
                return nil, err
        }

        return &types.QueryLiquidityPositionResponse{
                Position: position,
        }, nil
}

func (k queryServer) LiquidityPositions(goCtx context.Context, req *types.QueryLiquidityPositionsRequest) (*types.QueryLiquidityPositionsResponse, error) {
        if req == nil {
                return nil, status.Error(codes.InvalidArgument, "invalid request")
        }

        var positions []types.LiquidityPosition
        
        rng := collections.NewPrefixedPairRange[string, uint64](req.Owner)
        err := k.Keeper.LiquidityPositions.Walk(goCtx, rng, func(key collections.Pair[string, uint64], value types.LiquidityPosition) (stop bool, err error) {
                positions = append(positions, value)
                return false, nil
        })

        if err != nil {
                return nil, err
        }

        return &types.QueryLiquidityPositionsResponse{
                Positions: positions,
        }, nil
}

func (k queryServer) EstimateSwap(goCtx context.Context, req *types.QueryEstimateSwapRequest) (*types.QueryEstimateSwapResponse, error) {
        if req == nil {
                return nil, status.Error(codes.InvalidArgument, "invalid request")
        }

        pool, err := k.GetPool(goCtx, req.PoolId)
        if err != nil {
                return nil, err
        }

        var reserveIn, reserveOut math.Int

        if req.TokenInDenom == pool.DenomA {
                reserveIn = pool.ReserveA
                reserveOut = pool.ReserveB
        } else if req.TokenInDenom == pool.DenomB {
                reserveIn = pool.ReserveB
                reserveOut = pool.ReserveA
        } else {
                return nil, types.ErrInvalidTokenDenom
        }

        outputAmount := k.CalculateSwapOutput(req.TokenInAmount, reserveIn, reserveOut, pool.SwapFeeRate)
        
        priceImpact := calculatePriceImpact(req.TokenInAmount, reserveIn, outputAmount, reserveOut)
        
        feeAmount := req.TokenInAmount.MulRaw(int64(pool.SwapFeeRate)).QuoRaw(10000)

        return &types.QueryEstimateSwapResponse{
                TokenOutAmount: outputAmount,
                PriceImpact:    priceImpact,
                SwapFee:        feeAmount,
        }, nil
}

func calculatePriceImpact(amountIn, reserveIn, amountOut, reserveOut math.Int) string {
        if reserveIn.IsZero() || reserveOut.IsZero() {
                return "0"
        }
        
        priceBefore := reserveOut.Mul(math.NewInt(10000)).Quo(reserveIn)
        
        newReserveIn := reserveIn.Add(amountIn)
        newReserveOut := reserveOut.Sub(amountOut)
        
        if newReserveIn.IsZero() {
                return "100"
        }
        
        priceAfter := newReserveOut.Mul(math.NewInt(10000)).Quo(newReserveIn)
        
        if priceBefore.IsZero() {
                return "0"
        }
        
        impact := priceBefore.Sub(priceAfter).Mul(math.NewInt(100)).Quo(priceBefore)
        
        return impact.String()
}
