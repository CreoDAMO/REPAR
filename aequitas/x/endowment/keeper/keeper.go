package keeper

import (
	"context"
	"fmt"
	"time"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"cosmossdk.io/log"
	"cosmossdk.io/math"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"aequitas/x/endowment/types"
)

const (
	LP_ENDOWMENT_ID     = "lp_endowment"
	SOCIAL_ENDOWMENT_ID = "social_endowment"

	SECONDS_PER_YEAR = 365 * 24 * 60 * 60

	STRATEGY_BTC_STAKING    = "btc_staking"
	STRATEGY_ETH_STAKING    = "eth_staking"
	STRATEGY_STABLE_LENDING = "stable_lending"
	STRATEGY_LST_STAKING    = "lst_staking"
)

type Keeper struct {
	cdc          codec.BinaryCodec
	storeService store.KVStoreService
	logger       log.Logger
	authority    string

	bankKeeper    types.BankKeeper
	accountKeeper types.AccountKeeper

	Schema              collections.Schema
	Params              collections.Item[types.Params]
	Endowments          collections.Map[string, types.Endowment]
	InvestmentStrategies collections.Map[string, types.InvestmentStrategy]
	SocialPrograms      collections.Map[string, types.SocialProgram]
	YieldDistributions  collections.Map[collections.Pair[string, uint64], types.YieldDistribution]
	NextEndowmentID     collections.Sequence
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
		Params:       collections.NewItem(sb, types.ParamsKey, "params", codec.CollValue[types.Params](cdc)),
		Endowments:   collections.NewMap(sb, types.EndowmentKey, "endowments", collections.StringKey, codec.CollValue[types.Endowment](cdc)),
		InvestmentStrategies: collections.NewMap(sb, types.InvestmentStrategyKey, "investment_strategies",
			collections.StringKey, codec.CollValue[types.InvestmentStrategy](cdc)),
		SocialPrograms: collections.NewMap(sb, types.SocialProgramKey, "social_programs",
			collections.StringKey, codec.CollValue[types.SocialProgram](cdc)),
		YieldDistributions: collections.NewMap(sb, types.YieldDistributionKey, "yield_distributions",
			collections.PairKeyCodec(collections.StringKey, collections.Uint64Key), codec.CollValue[types.YieldDistribution](cdc)),
		NextEndowmentID: collections.NewSequence(sb, types.NextEndowmentIDKey, "next_endowment_id"),
	}

	schema, err := sb.Build()
	if err != nil {
		panic(err)
	}
	k.Schema = schema

	return k
}

func (k Keeper) GetAuthority() string {
	return k.authority
}

func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k Keeper) DepositToEndowment(ctx context.Context, endowmentID string, amount math.Int) error {
	endowment, err := k.Endowments.Get(ctx, endowmentID)
	if err != nil {
		return fmt.Errorf("endowment not found: %w", err)
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	endowment.Principal = endowment.Principal.Add(amount)
	endowment.LastYieldCalc = sdkCtx.BlockTime().Unix()

	if err := k.Endowments.Set(ctx, endowmentID, endowment); err != nil {
		return err
	}

	return k.DeployCapitalToStrategies(ctx, endowmentID, amount)
}

func (k Keeper) DeployCapitalToStrategies(ctx context.Context, endowmentID string, amount math.Int) error {
	btcAmount := amount.MulRaw(40).QuoRaw(100)
	ethAmount := amount.MulRaw(30).QuoRaw(100)
	stableAmount := amount.MulRaw(20).QuoRaw(100)
	lstAmount := amount.MulRaw(10).QuoRaw(100)

	strategyAllocations := map[string]math.Int{
		STRATEGY_BTC_STAKING:    btcAmount,
		STRATEGY_ETH_STAKING:    ethAmount,
		STRATEGY_STABLE_LENDING: stableAmount,
		STRATEGY_LST_STAKING:    lstAmount,
	}

	for strategyType, allocated := range strategyAllocations {
		strategyID := fmt.Sprintf("%s_%s", endowmentID, strategyType)
		strategy, err := k.InvestmentStrategies.Get(ctx, strategyID)
		if err != nil {
			strategy = types.InvestmentStrategy{
				Id:                    strategyID,
				Name:                  strategyType,
				AllocationPercentage:  k.getStrategyAllocationPercentage(strategyType),
				InvestedAmount:        math.ZeroInt(),
				CurrentValue:          math.ZeroInt(),
				ApyBps:                k.getStrategyAPYBps(strategyType),
				StrategyType:          strategyType,
			}
		}

		strategy.InvestedAmount = strategy.InvestedAmount.Add(allocated)
		strategy.CurrentValue = strategy.CurrentValue.Add(allocated)

		if err := k.InvestmentStrategies.Set(ctx, strategyID, strategy); err != nil {
			return err
		}
	}

	return nil
}

func (k Keeper) getStrategyAllocationPercentage(strategyType string) uint64 {
	switch strategyType {
	case STRATEGY_BTC_STAKING:
		return 40
	case STRATEGY_ETH_STAKING:
		return 30
	case STRATEGY_STABLE_LENDING:
		return 20
	case STRATEGY_LST_STAKING:
		return 10
	default:
		return 0
	}
}

func (k Keeper) getStrategyAPYBps(strategyType string) uint64 {
	switch strategyType {
	case STRATEGY_BTC_STAKING:
		return 500
	case STRATEGY_ETH_STAKING:
		return 400
	case STRATEGY_STABLE_LENDING:
		return 1000
	case STRATEGY_LST_STAKING:
		return 1200
	default:
		return 700
	}
}

func (k Keeper) CalculateYield(ctx context.Context, endowmentID string) (math.Int, error) {
	endowment, err := k.Endowments.Get(ctx, endowmentID)
	if err != nil {
		return math.ZeroInt(), err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	currentTime := sdkCtx.BlockTime().Unix()
	timeElapsed := currentTime - endowment.LastYieldCalc

	if timeElapsed <= 0 {
		return math.ZeroInt(), nil
	}

	annualYield := endowment.Principal.MulRaw(int64(endowment.TargetApyBps)).QuoRaw(10000)

	proRatedYield := annualYield.MulRaw(timeElapsed).QuoRaw(SECONDS_PER_YEAR)

	endowment.YieldAccumulated = endowment.YieldAccumulated.Add(proRatedYield)
	endowment.LastYieldCalc = currentTime

	if err := k.Endowments.Set(ctx, endowmentID, endowment); err != nil {
		return math.ZeroInt(), err
	}

	return proRatedYield, nil
}

func (k Keeper) DistributeYield(ctx context.Context, endowmentID string) (math.Int, error) {
	endowment, err := k.Endowments.Get(ctx, endowmentID)
	if err != nil {
		return math.ZeroInt(), err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	currentTime := sdkCtx.BlockTime().Unix()

	if endowment.IsLocked && currentTime < endowment.UnlockTime {
		return math.ZeroInt(), fmt.Errorf("endowment is still locked until %d", endowment.UnlockTime)
	}

	if _, err := k.CalculateYield(ctx, endowmentID); err != nil {
		return math.ZeroInt(), err
	}

	endowment, _ = k.Endowments.Get(ctx, endowmentID)

	if endowment.YieldAccumulated.IsZero() {
		return math.ZeroInt(), fmt.Errorf("no yield available to distribute")
	}

	distributionAmount := endowment.YieldAccumulated

	endowment.YieldAccumulated = math.ZeroInt()
	if err := k.Endowments.Set(ctx, endowmentID, endowment); err != nil {
		return math.ZeroInt(), err
	}

	return distributionAmount, nil
}

func (k Keeper) InitializeLPEndowment(ctx context.Context, unlockYears uint64) error {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	unlockTime := sdkCtx.BlockTime().Add(time.Duration(unlockYears) * 365 * 24 * time.Hour).Unix()

	lpEndowment := types.Endowment{
		Id:               LP_ENDOWMENT_ID,
		EndowmentType:    "LP Provider Dividend",
		Principal:        math.ZeroInt(),
		YieldAccumulated: math.ZeroInt(),
		LastYieldCalc:    sdkCtx.BlockTime().Unix(),
		UnlockTime:       unlockTime,
		Beneficiary:      "lp_providers",
		IsLocked:         true,
		TargetApyBps:     700,
	}

	return k.Endowments.Set(ctx, LP_ENDOWMENT_ID, lpEndowment)
}

func (k Keeper) InitializeSocialEndowment(ctx context.Context, unlockYears uint64) error {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	unlockTime := sdkCtx.BlockTime().Add(time.Duration(unlockYears) * 365 * 24 * time.Hour).Unix()

	socialEndowment := types.Endowment{
		Id:               SOCIAL_ENDOWMENT_ID,
		EndowmentType:    "Social Infrastructure",
		Principal:        math.ZeroInt(),
		YieldAccumulated: math.ZeroInt(),
		LastYieldCalc:    sdkCtx.BlockTime().Unix(),
		UnlockTime:       unlockTime,
		Beneficiary:      "social_programs",
		IsLocked:         true,
		TargetApyBps:     700,
	}

	if err := k.Endowments.Set(ctx, SOCIAL_ENDOWMENT_ID, socialEndowment); err != nil {
		return err
	}

	return k.InitializeSocialPrograms(ctx)
}

func (k Keeper) InitializeSocialPrograms(ctx context.Context) error {
	programs := []types.SocialProgram{
		{
			Id:                   "global_ubi",
			Name:                 "Global Universal Basic Income",
			AllocationPercentage: 20,
			AnnualBudget:         math.ZeroInt(),
			TotalDistributed:     math.ZeroInt(),
			Beneficiaries:        []string{},
		},
		{
			Id:                   "generational_trusts",
			Name:                 "Generational Wealth Trusts",
			AllocationPercentage: 20,
			AnnualBudget:         math.ZeroInt(),
			TotalDistributed:     math.ZeroInt(),
			Beneficiaries:        []string{},
		},
		{
			Id:                   "aequitas_defi",
			Name:                 "Aequitas DeFi Platform",
			AllocationPercentage: 13,
			AnnualBudget:         math.ZeroInt(),
			TotalDistributed:     math.ZeroInt(),
			Beneficiaries:        []string{},
		},
		{
			Id:                   "dex_treasury",
			Name:                 "DEX Emergency Treasury",
			AllocationPercentage: 20,
			AnnualBudget:         math.ZeroInt(),
			TotalDistributed:     math.ZeroInt(),
			Beneficiaries:        []string{},
		},
		{
			Id:                   "charitable_giving",
			Name:                 "Charitable Giving Fund",
			AllocationPercentage: 13,
			AnnualBudget:         math.ZeroInt(),
			TotalDistributed:     math.ZeroInt(),
			Beneficiaries:        []string{},
		},
		{
			Id:                   "dao_treasury",
			Name:                 "DAO Governance Treasury",
			AllocationPercentage: 14,
			AnnualBudget:         math.ZeroInt(),
			TotalDistributed:     math.ZeroInt(),
			Beneficiaries:        []string{},
		},
	}

	for _, program := range programs {
		if err := k.SocialPrograms.Set(ctx, program.Id, program); err != nil {
			return err
		}
	}

	return nil
}

func (k Keeper) DistributeToSocialPrograms(ctx context.Context) (math.Int, error) {
	distributedYield, err := k.DistributeYield(ctx, SOCIAL_ENDOWMENT_ID)
	if err != nil {
		return math.ZeroInt(), err
	}

	totalAllocated := math.ZeroInt()

	programIDs := []string{
		"global_ubi",
		"generational_trusts",
		"aequitas_defi",
		"dex_treasury",
		"charitable_giving",
		"dao_treasury",
	}

	for _, programID := range programIDs {
		program, err := k.SocialPrograms.Get(ctx, programID)
		if err != nil {
			continue
		}

		programAllocation := distributedYield.MulRaw(int64(program.AllocationPercentage)).QuoRaw(100)

		program.AnnualBudget = programAllocation
		program.TotalDistributed = program.TotalDistributed.Add(programAllocation)

		if err := k.SocialPrograms.Set(ctx, programID, program); err != nil {
			return math.ZeroInt(), err
		}

		totalAllocated = totalAllocated.Add(programAllocation)
	}

	return totalAllocated, nil
}

func (k Keeper) GetModuleAddress() sdk.AccAddress {
	return k.accountKeeper.GetModuleAddress(types.ModuleName)
}

func (k Keeper) GetInvestmentStrategiesByEndowment(ctx context.Context, endowmentID string) ([]types.InvestmentStrategy, error) {
	var strategies []types.InvestmentStrategy

	strategyTypes := []string{
		STRATEGY_BTC_STAKING,
		STRATEGY_ETH_STAKING,
		STRATEGY_STABLE_LENDING,
		STRATEGY_LST_STAKING,
	}

	for _, strategyType := range strategyTypes {
		strategyID := fmt.Sprintf("%s_%s", endowmentID, strategyType)
		strategy, err := k.InvestmentStrategies.Get(ctx, strategyID)
		if err == nil {
			strategies = append(strategies, strategy)
		}
	}

	return strategies, nil
}

func (k Keeper) CalculateBlendedAPY(ctx context.Context, endowmentID string) (uint64, error) {
	strategies, err := k.GetInvestmentStrategiesByEndowment(ctx, endowmentID)
	if err != nil {
		return 0, err
	}

	totalInvested := math.ZeroInt()
	weightedAPY := math.ZeroInt()

	for _, strategy := range strategies {
		totalInvested = totalInvested.Add(strategy.InvestedAmount)
		weightedAPY = weightedAPY.Add(strategy.InvestedAmount.MulRaw(int64(strategy.ApyBps)))
	}

	if totalInvested.IsZero() {
		return 700, nil
	}

	blendedAPY := weightedAPY.Quo(totalInvested)
	return blendedAPY.Uint64(), nil
}
