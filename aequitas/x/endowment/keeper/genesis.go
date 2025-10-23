package keeper

import (
	"context"

	"github.com/CreoDAMO/REPAR/aequitas/x/endowment/types"
)

func (k Keeper) InitGenesis(ctx context.Context, genState types.GenesisState) error {
	if err := k.Params.Set(ctx, genState.Params); err != nil {
		return err
	}

	for _, endowment := range genState.Endowments {
		if err := k.Endowments.Set(ctx, endowment.Id, endowment); err != nil {
			return err
		}
	}

	for _, strategy := range genState.Strategies {
		if err := k.InvestmentStrategies.Set(ctx, strategy.Id, strategy); err != nil {
			return err
		}
	}

	for _, program := range genState.SocialPrograms {
		if err := k.SocialPrograms.Set(ctx, program.Id, program); err != nil {
			return err
		}
	}

	if err := k.NextEndowmentID.Set(ctx, genState.NextEndowmentId); err != nil {
		return err
	}

	if err := k.InitializeLPEndowment(ctx, genState.Params.LpLockPeriodYears); err != nil {
		return err
	}

	if err := k.InitializeSocialEndowment(ctx, genState.Params.SocialLockPeriodYears); err != nil {
		return err
	}

	return nil
}

func (k Keeper) ExportGenesis(ctx context.Context) (types.GenesisState, error) {
	params, err := k.Params.Get(ctx)
	if err != nil {
		return types.GenesisState{}, err
	}

	var endowments []types.Endowment
	err = k.Endowments.Walk(ctx, nil, func(key string, value types.Endowment) (bool, error) {
		endowments = append(endowments, value)
		return false, nil
	})
	if err != nil {
		return types.GenesisState{}, err
	}

	var strategies []types.InvestmentStrategy
	err = k.InvestmentStrategies.Walk(ctx, nil, func(key string, value types.InvestmentStrategy) (bool, error) {
		strategies = append(strategies, value)
		return false, nil
	})
	if err != nil {
		return types.GenesisState{}, err
	}

	var programs []types.SocialProgram
	err = k.SocialPrograms.Walk(ctx, nil, func(key string, value types.SocialProgram) (bool, error) {
		programs = append(programs, value)
		return false, nil
	})
	if err != nil {
		return types.GenesisState{}, err
	}

	nextID, err := k.NextEndowmentID.Peek(ctx)
	if err != nil {
		nextID = 0
	}

	return types.GenesisState{
		Params:          params,
		Endowments:      endowments,
		Strategies:      strategies,
		SocialPrograms:  programs,
		NextEndowmentId: nextID,
	}, nil
}
