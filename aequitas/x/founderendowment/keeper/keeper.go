
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

	"github.com/CreoDAMO/REPAR/aequitas/x/founderendowment/types"
)

const (
	FOUNDER_ENDOWMENT_ID = "founder_endowment"
	SECONDS_PER_YEAR     = 365 * 24 * 60 * 60
	TARGET_APY_BPS       = 450 // 4.5%
)

type Keeper struct {
	cdc          codec.BinaryCodec
	storeService store.KVStoreService
	logger       log.Logger
	authority    string

	bankKeeper    types.BankKeeper
	accountKeeper types.AccountKeeper

	Schema             collections.Schema
	Endowment          collections.Item[types.FounderEndowment]
	DistributionConfig collections.Item[types.DistributionConfig]
	ProtocolAllocation collections.Item[types.ProtocolAllocation]
	Statistics         collections.Item[types.EndowmentStats]
	Distributions      collections.Map[string, types.YieldDistribution]
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
		Endowment:    collections.NewItem(sb, types.EndowmentKey, "endowment", codec.CollValue[types.FounderEndowment](cdc)),
		DistributionConfig: collections.NewItem(sb, types.DistributionConfigKey, "distribution_config", codec.CollValue[types.DistributionConfig](cdc)),
		ProtocolAllocation: collections.NewItem(sb, types.ProtocolAllocationKey, "protocol_allocation", codec.CollValue[types.ProtocolAllocation](cdc)),
		Statistics: collections.NewItem(sb, types.StatisticsKey, "statistics", codec.CollValue[types.EndowmentStats](cdc)),
		Distributions: collections.NewMap(sb, types.DistributionsKey, "distributions", collections.StringKey, codec.CollValue[types.YieldDistribution](cdc)),
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

// InitializeEndowment sets up the founder's endowment with 6% of total supply (7.86T REPAR)
// This comes from the 8% Development Fund allocation (6% endowment + 2% discretionary)
// Separate from the 10% Founder Allocation (9% vested + 1% discretionary)
func (k Keeper) InitializeEndowment(ctx context.Context, principalAmount math.Int, founderAddress string) error {
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	
	// Endowment is locked perpetually (can only be renewed after 8 years)
	unlockTime := sdkCtx.BlockTime().Add(8 * 365 * 24 * time.Hour).Unix()

	endowment := types.FounderEndowment{
		Id:               FOUNDER_ENDOWMENT_ID,
		Principal:        principalAmount, // 6% of 131T = 7.86T REPAR (from 8% dev fund)
		YieldAccumulated: math.ZeroInt(),
		TargetApyBps:     TARGET_APY_BPS, // 4.5%
		LastYieldCalc:    sdkCtx.BlockTime().Unix(),
		UnlockTime:       unlockTime, // 8 years for renewal vote
		IsLocked:         true,
		FounderAddress:   founderAddress,
		RenewalCount:     0,
	}

	if err := k.Endowment.Set(ctx, endowment); err != nil {
		return err
	}

	// Initialize distribution config: 90% protocol, 10% founder
	distConfig := types.DistributionConfig{
		ProtocolPercentage: 90,
		FounderPercentage:  10,
	}
	if err := k.DistributionConfig.Set(ctx, distConfig); err != nil {
		return err
	}

	// Initialize protocol allocation: 25/25/25/15
	// 25% DEX Liquidity, 25% DAO Treasury, 25% Social Endowment, 15% Validator Subsidy
	protocolAlloc := types.ProtocolAllocation{
		DexLiquidityPercentage:    25,
		DaoTreasuryPercentage:     25,
		SocialEndowmentPercentage: 25,
		ValidatorSubsidyPercentage: 15,
	}
	if err := k.ProtocolAllocation.Set(ctx, protocolAlloc); err != nil {
		return err
	}

	// Initialize statistics
	stats := types.EndowmentStats{
		TotalPrincipal:        principalAmount,
		TotalYieldDistributed: math.ZeroInt(),
		TotalFounderDividends: math.ZeroInt(),
		TotalProtocolFunding:  math.ZeroInt(),
		DistributionCount:     0,
	}
	if err := k.Statistics.Set(ctx, stats); err != nil {
		return err
	}

	k.Logger().Info("Founder's Endowment initialized",
		"principal", principalAmount.String(),
		"percentage_of_supply", "9%",
		"target_apy", "4.5%",
		"renewal_period", "8 years",
		"founder_address", founderAddress,
	)

	return nil
}

// RenewEndowment is called after 8 years via governance proposal
// Awards founder an additional 6% of total supply as renewal bonus
func (k Keeper) RenewEndowment(ctx context.Context) error {
	endowment, err := k.Endowment.Get(ctx)
	if err != nil {
		return err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	
	// Check if renewal period has passed
	if sdkCtx.BlockTime().Unix() < endowment.UnlockTime {
		return fmt.Errorf("renewal period not reached, must wait until %d", endowment.UnlockTime)
	}

	// Calculate renewal bonus: 6% of total supply = 7.86T REPAR
	totalSupply := math.NewInt(131_000_000_000_000) // 131T REPAR
	renewalBonus := totalSupply.MulRaw(6).QuoRaw(100) // 6% = 7.86T

	// Mint renewal bonus to founder's discretionary address
	founderAddr, err := sdk.AccAddressFromBech32(endowment.FounderAddress)
	if err != nil {
		return err
	}

	renewalCoins := sdk.NewCoins(sdk.NewCoin("urepar", renewalBonus))
	if err := k.bankKeeper.MintCoins(ctx, types.ModuleName, renewalCoins); err != nil {
		return fmt.Errorf("failed to mint renewal bonus: %w", err)
	}

	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, founderAddr, renewalCoins); err != nil {
		return fmt.Errorf("failed to send renewal bonus: %w", err)
	}

	// Update endowment renewal count and reset unlock time for next 8-year period
	endowment.RenewalCount++
	endowment.UnlockTime = sdkCtx.BlockTime().Add(8 * 365 * 24 * time.Hour).Unix()
	
	if err := k.Endowment.Set(ctx, endowment); err != nil {
		return err
	}

	k.Logger().Info("Founder's Endowment renewed",
		"renewal_bonus", renewalBonus.String(),
		"renewal_count", endowment.RenewalCount,
		"next_renewal", endowment.UnlockTime,
		"founder_total_allocation", "18%",
	)

	return nil
}

// CalculateYield computes accumulated yield at 4.5% APY
func (k Keeper) CalculateYield(ctx context.Context) (math.Int, error) {
	endowment, err := k.Endowment.Get(ctx)
	if err != nil {
		return math.ZeroInt(), err
	}

	sdkCtx := sdk.UnwrapSDKContext(ctx)
	currentTime := sdkCtx.BlockTime().Unix()
	timeElapsed := currentTime - endowment.LastYieldCalc

	if timeElapsed <= 0 {
		return math.ZeroInt(), nil
	}

	// Annual yield = Principal * 4.5%
	annualYield := endowment.Principal.MulRaw(int64(TARGET_APY_BPS)).QuoRaw(10000)

	// Pro-rated yield based on time elapsed
	proRatedYield := annualYield.MulRaw(timeElapsed).QuoRaw(SECONDS_PER_YEAR)

	endowment.YieldAccumulated = endowment.YieldAccumulated.Add(proRatedYield)
	endowment.LastYieldCalc = currentTime

	if err := k.Endowment.Set(ctx, endowment); err != nil {
		return math.ZeroInt(), err
	}

	return proRatedYield, nil
}

// DistributeYield executes the 90/10 split and distributes to protocol and founder
func (k Keeper) DistributeYield(ctx context.Context, founderAddress sdk.AccAddress) (math.Int, math.Int, math.Int, error) {
	// Calculate current yield
	if _, err := k.CalculateYield(ctx); err != nil {
		return math.ZeroInt(), math.ZeroInt(), math.ZeroInt(), err
	}

	endowment, err := k.Endowment.Get(ctx)
	if err != nil {
		return math.ZeroInt(), math.ZeroInt(), math.ZeroInt(), err
	}

	if endowment.YieldAccumulated.IsZero() {
		return math.ZeroInt(), math.ZeroInt(), math.ZeroInt(), fmt.Errorf("no yield available to distribute")
	}

	distConfig, err := k.DistributionConfig.Get(ctx)
	if err != nil {
		return math.ZeroInt(), math.ZeroInt(), math.ZeroInt(), err
	}

	totalYield := endowment.YieldAccumulated

	// 90% to protocol operations
	protocolAmount := totalYield.MulRaw(int64(distConfig.ProtocolPercentage)).QuoRaw(100)

	// 10% to founder dividend
	founderDividend := totalYield.MulRaw(int64(distConfig.FounderPercentage)).QuoRaw(100)

	// Distribute protocol funding to sub-allocations
	if err := k.DistributeProtocolFunding(ctx, protocolAmount); err != nil {
		return math.ZeroInt(), math.ZeroInt(), math.ZeroInt(), err
	}

	// Pay founder dividend in USDC
	if err := k.PayFounderDividend(ctx, founderAddress, founderDividend); err != nil {
		return math.ZeroInt(), math.ZeroInt(), math.ZeroInt(), err
	}

	// Reset accumulated yield
	endowment.YieldAccumulated = math.ZeroInt()
	if err := k.Endowment.Set(ctx, endowment); err != nil {
		return math.ZeroInt(), math.ZeroInt(), math.ZeroInt(), err
	}

	// Update statistics
	stats, _ := k.Statistics.Get(ctx)
	stats.TotalYieldDistributed = stats.TotalYieldDistributed.Add(totalYield)
	stats.TotalFounderDividends = stats.TotalFounderDividends.Add(founderDividend)
	stats.TotalProtocolFunding = stats.TotalProtocolFunding.Add(protocolAmount)
	stats.DistributionCount++
	if err := k.Statistics.Set(ctx, stats); err != nil {
		return math.ZeroInt(), math.ZeroInt(), math.ZeroInt(), err
	}

	// Record distribution event
	sdkCtx := sdk.UnwrapSDKContext(ctx)
	distribution := types.YieldDistribution{
		Id:                fmt.Sprintf("dist-%d", sdkCtx.BlockHeight()),
		TotalYield:        totalYield,
		ProtocolAmount:    protocolAmount,
		FounderDividend:   founderDividend,
		Timestamp:         sdkCtx.BlockTime().Unix(),
		DistributionType:  "quarterly",
	}
	if err := k.Distributions.Set(ctx, distribution.Id, distribution); err != nil {
		return math.ZeroInt(), math.ZeroInt(), math.ZeroInt(), err
	}

	k.Logger().Info("Yield distributed",
		"total_yield", totalYield.String(),
		"protocol_funding", protocolAmount.String(),
		"founder_dividend", founderDividend.String(),
	)

	return totalYield, protocolAmount, founderDividend, nil
}

// DistributeProtocolFunding splits 90% yield into 25/25/25/15 allocation
func (k Keeper) DistributeProtocolFunding(ctx context.Context, protocolAmount math.Int) error {
	allocation, err := k.ProtocolAllocation.Get(ctx)
	if err != nil {
		return err
	}

	// 25% to DEX Liquidity
	dexAmount := protocolAmount.MulRaw(int64(allocation.DexLiquidityPercentage)).QuoRaw(100)

	// 25% to DAO Treasury
	daoAmount := protocolAmount.MulRaw(int64(allocation.DaoTreasuryPercentage)).QuoRaw(100)

	// 25% to Social Endowment
	socialAmount := protocolAmount.MulRaw(int64(allocation.SocialEndowmentPercentage)).QuoRaw(100)

	// 15% to Validator Subsidy
	validatorAmount := protocolAmount.MulRaw(int64(allocation.ValidatorSubsidyPercentage)).QuoRaw(100)

	// TODO: Integrate with actual module accounts once ready
	// For now, log the allocations
	k.Logger().Info("Protocol funding allocated",
		"dex_liquidity", dexAmount.String(),
		"dao_treasury", daoAmount.String(),
		"social_endowment", socialAmount.String(),
		"validator_subsidy", validatorAmount.String(),
	)

	return nil
}

// PayFounderDividend sends founder's 10% dividend in USDC
func (k Keeper) PayFounderDividend(ctx context.Context, founderAddress sdk.AccAddress, amount math.Int) error {
	// Convert REPAR value to USDC (1:1 peg assumed)
	usdcCoins := sdk.NewCoins(sdk.NewCoin("uusdc", amount))

	// Send from module account to founder
	if err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, founderAddress, usdcCoins); err != nil {
		return fmt.Errorf("failed to pay founder dividend: %w", err)
	}

	k.Logger().Info("Founder dividend paid",
		"amount", amount.String(),
		"recipient", founderAddress.String(),
	)

	return nil
}

// GetProjectedYield calculates projected annual and quarterly yields
func (k Keeper) GetProjectedYield(ctx context.Context) (math.Int, math.Int, math.Int, math.Int, error) {
	endowment, err := k.Endowment.Get(ctx)
	if err != nil {
		return math.ZeroInt(), math.ZeroInt(), math.ZeroInt(), math.ZeroInt(), err
	}

	distConfig, err := k.DistributionConfig.Get(ctx)
	if err != nil {
		return math.ZeroInt(), math.ZeroInt(), math.ZeroInt(), math.ZeroInt(), err
	}

	// Annual yield at 4.5%
	annualYield := endowment.Principal.MulRaw(int64(TARGET_APY_BPS)).QuoRaw(10000)

	// Quarterly yield
	quarterlyYield := annualYield.QuoRaw(4)

	// Founder's annual dividend (10%)
	founderAnnualDividend := annualYield.MulRaw(int64(distConfig.FounderPercentage)).QuoRaw(100)

	// Protocol's annual funding (90%)
	protocolAnnualFunding := annualYield.MulRaw(int64(distConfig.ProtocolPercentage)).QuoRaw(100)

	return annualYield, quarterlyYield, founderAnnualDividend, protocolAnnualFunding, nil
}

func (k Keeper) GetModuleAddress() sdk.AccAddress {
	return k.accountKeeper.GetModuleAddress(types.ModuleName)
}
