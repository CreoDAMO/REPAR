package keeper

import (
	"context"

	"cosmossdk.io/math"
	"github.com/CreoDAMO/REPAR/aequitas/x/endowment/types"
)

type queryServer struct {
	Keeper
}

func NewQueryServerImpl(keeper Keeper) types.QueryServer {
	return &queryServer{Keeper: keeper}
}

var _ types.QueryServer = queryServer{}

func (q queryServer) Params(ctx context.Context, req *types.QueryParamsRequest) (*types.QueryParamsResponse, error) {
	params, err := q.Keeper.Params.Get(ctx)
	if err != nil {
		return nil, err
	}

	return &types.QueryParamsResponse{Params: params}, nil
}

func (q queryServer) Endowment(ctx context.Context, req *types.QueryEndowmentRequest) (*types.QueryEndowmentResponse, error) {
	endowment, err := q.Keeper.Endowments.Get(ctx, req.Id)
	if err != nil {
		return nil, types.ErrEndowmentNotFound
	}

	return &types.QueryEndowmentResponse{Endowment: endowment}, nil
}

func (q queryServer) AllEndowments(ctx context.Context, req *types.QueryAllEndowmentsRequest) (*types.QueryAllEndowmentsResponse, error) {
	var endowments []types.Endowment

	err := q.Keeper.Endowments.Walk(ctx, nil, func(key string, value types.Endowment) (bool, error) {
		endowments = append(endowments, value)
		return false, nil
	})

	if err != nil {
		return nil, err
	}

	return &types.QueryAllEndowmentsResponse{
		Endowments: endowments,
	}, nil
}

func (q queryServer) InvestmentStrategies(ctx context.Context, req *types.QueryInvestmentStrategiesRequest) (*types.QueryInvestmentStrategiesResponse, error) {
	strategies, err := q.Keeper.GetInvestmentStrategiesByEndowment(ctx, req.EndowmentId)
	if err != nil {
		return nil, err
	}

	return &types.QueryInvestmentStrategiesResponse{
		Strategies: strategies,
	}, nil
}

func (q queryServer) SocialPrograms(ctx context.Context, req *types.QuerySocialProgramsRequest) (*types.QuerySocialProgramsResponse, error) {
	var programs []types.SocialProgram

	err := q.Keeper.SocialPrograms.Walk(ctx, nil, func(key string, value types.SocialProgram) (bool, error) {
		programs = append(programs, value)
		return false, nil
	})

	if err != nil {
		return nil, err
	}

	return &types.QuerySocialProgramsResponse{
		Programs: programs,
	}, nil
}

func (q queryServer) EndowmentStats(ctx context.Context, req *types.QueryEndowmentStatsRequest) (*types.QueryEndowmentStatsResponse, error) {
	endowment, err := q.Keeper.Endowments.Get(ctx, req.EndowmentId)
	if err != nil {
		return nil, types.ErrEndowmentNotFound
	}

	blendedAPY, err := q.Keeper.CalculateBlendedAPY(ctx, req.EndowmentId)
	if err != nil {
		blendedAPY = 700
	}

	stats := types.EndowmentStats{
		TotalPrincipal:        endowment.Principal,
		TotalYieldDistributed: math.ZeroInt(),
		BeneficiaryCount:      0,
		AverageApyBps:         blendedAPY,
	}

	return &types.QueryEndowmentStatsResponse{
		Stats: stats,
	}, nil
}

func (q queryServer) YieldProjection(ctx context.Context, req *types.QueryYieldProjectionRequest) (*types.QueryYieldProjectionResponse, error) {
	endowment, err := q.Keeper.Endowments.Get(ctx, req.EndowmentId)
	if err != nil {
		return nil, types.ErrEndowmentNotFound
	}

	var projections []types.YearProjection

	currentPrincipal := endowment.Principal

	for year := uint64(1); year <= req.YearsAhead; year++ {
		annualYield := currentPrincipal.MulRaw(int64(endowment.TargetApyBps)).QuoRaw(10000)

		projection := types.YearProjection{
			Year:        year,
			Principal:   currentPrincipal,
			AnnualYield: annualYield,
		}

		projections = append(projections, projection)
	}

	return &types.QueryYieldProjectionResponse{
		Projections: projections,
	}, nil
}
