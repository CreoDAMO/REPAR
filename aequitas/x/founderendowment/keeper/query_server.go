package keeper

import (
	"context"

	"github.com/CreoDAMO/REPAR/aequitas/x/founderendowment/types"
)

type queryServer struct {
	Keeper
}

// NewQueryServerImpl returns an implementation of the QueryServer interface
// for the provided Keeper.
func NewQueryServerImpl(keeper Keeper) types.QueryServer {
	return &queryServer{Keeper: keeper}
}

var _ types.QueryServer = queryServer{}

// GetEndowment returns the founder's endowment details
func (qs queryServer) GetEndowment(goCtx context.Context, req *types.QueryGetEndowmentRequest) (*types.QueryGetEndowmentResponse, error) {
	endowment, err := qs.Keeper.Endowment.Get(goCtx)
	if err != nil {
		return nil, err
	}

	return &types.QueryGetEndowmentResponse{
		Endowment: &endowment,
	}, nil
}

// GetDistributionConfig returns the distribution configuration
func (qs queryServer) GetDistributionConfig(goCtx context.Context, req *types.QueryGetDistributionConfigRequest) (*types.QueryGetDistributionConfigResponse, error) {
	config, err := qs.Keeper.DistributionConfig.Get(goCtx)
	if err != nil {
		return nil, err
	}

	return &types.QueryGetDistributionConfigResponse{
		DistributionConfig: &config,
	}, nil
}

// GetProtocolAllocation returns the protocol allocation breakdown
func (qs queryServer) GetProtocolAllocation(goCtx context.Context, req *types.QueryGetProtocolAllocationRequest) (*types.QueryGetProtocolAllocationResponse, error) {
	allocation, err := qs.Keeper.ProtocolAllocation.Get(goCtx)
	if err != nil {
		return nil, err
	}

	return &types.QueryGetProtocolAllocationResponse{
		ProtocolAllocation: &allocation,
	}, nil
}

// GetStatistics returns overall endowment statistics
func (qs queryServer) GetStatistics(goCtx context.Context, req *types.QueryGetStatisticsRequest) (*types.QueryGetStatisticsResponse, error) {
	stats, err := qs.Keeper.Statistics.Get(goCtx)
	if err != nil {
		return nil, err
	}

	return &types.QueryGetStatisticsResponse{
		Statistics: &stats,
	}, nil
}

// GetProjectedYield returns projected yield calculations
func (qs queryServer) GetProjectedYield(goCtx context.Context, req *types.QueryGetProjectedYieldRequest) (*types.QueryGetProjectedYieldResponse, error) {
	annualYield, quarterlyYield, founderAnnualDividend, protocolAnnualFunding, err := qs.Keeper.GetProjectedYield(goCtx)
	if err != nil {
		return nil, err
	}

	return &types.QueryGetProjectedYieldResponse{
		AnnualYield:            annualYield.String(),
		QuarterlyYield:         quarterlyYield.String(),
		FounderAnnualDividend:  founderAnnualDividend.String(),
		ProtocolAnnualFunding:  protocolAnnualFunding.String(),
	}, nil
}

// GetDistribution returns a specific distribution event by ID
func (qs queryServer) GetDistribution(goCtx context.Context, req *types.QueryGetDistributionRequest) (*types.QueryGetDistributionResponse, error) {
	distribution, err := qs.Keeper.Distributions.Get(goCtx, req.Id)
	if err != nil {
		return nil, err
	}

	return &types.QueryGetDistributionResponse{
		Distribution: &distribution,
	}, nil
}
