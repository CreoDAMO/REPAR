package keeper

import (
        "context"
        "fmt"

        "cosmossdk.io/math"
        sdk "github.com/cosmos/cosmos-sdk/types"
        "github.com/CreoDAMO/REPAR/aequitas/x/founderendowment/types"
)

type msgServer struct {
        Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
        return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

// InitializeEndowment initializes the founder's endowment with principal amount
func (ms msgServer) InitializeEndowment(goCtx context.Context, msg *types.MsgInitializeEndowment) (*types.MsgInitializeEndowmentResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        // Only authority can initialize the endowment
        if msg.Authority != ms.GetAuthority() {
                return nil, fmt.Errorf("invalid authority; expected %s, got %s", ms.GetAuthority(), msg.Authority)
        }

        // Get founder address from module params
        founderAddr := ms.GetModuleAddress().String()

        if err := ms.Keeper.InitializeEndowment(goCtx, msg.PrincipalAmount, founderAddr); err != nil {
                return nil, err
        }

        ctx.EventManager().EmitEvent(
                sdk.NewEvent(
                        "founder_endowment_initialized",
                        sdk.NewAttribute("principal", msg.PrincipalAmount.String()),
                        sdk.NewAttribute("lock_years", fmt.Sprintf("%d", msg.LockYears)),
                ),
        )

        return &types.MsgInitializeEndowmentResponse{}, nil
}

// DistributeYield distributes accumulated yield to founder and protocol
func (ms msgServer) DistributeYield(goCtx context.Context, msg *types.MsgDistributeYield) (*types.MsgDistributeYieldResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        // Only authority can trigger distribution
        if msg.Authority != ms.GetAuthority() {
                return nil, fmt.Errorf("invalid authority; expected %s, got %s", ms.GetAuthority(), msg.Authority)
        }

        founderAddr, err := sdk.AccAddressFromBech32(msg.FounderAddress)
        if err != nil {
                return nil, fmt.Errorf("invalid founder address: %w", err)
        }

        totalYield, protocolFunding, founderDividend, err := ms.Keeper.DistributeYield(goCtx, founderAddr)
        if err != nil {
                return nil, err
        }

        ctx.EventManager().EmitEvent(
                sdk.NewEvent(
                        "yield_distributed",
                        sdk.NewAttribute("total_yield", totalYield.String()),
                        sdk.NewAttribute("protocol_funding", protocolFunding.String()),
                        sdk.NewAttribute("founder_dividend", founderDividend.String()),
                ),
        )

        return &types.MsgDistributeYieldResponse{
                TotalYield:       totalYield.String(),
                FounderDividend:  founderDividend.String(),
                ProtocolFunding:  protocolFunding.String(),
        }, nil
}

// UpdateDistributionConfig updates the distribution percentages
func (ms msgServer) UpdateDistributionConfig(goCtx context.Context, msg *types.MsgUpdateDistributionConfig) (*types.MsgUpdateDistributionConfigResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        // Only authority can update config
        if msg.Authority != ms.GetAuthority() {
                return nil, fmt.Errorf("invalid authority; expected %s, got %s", ms.GetAuthority(), msg.Authority)
        }

        // Update distribution config
        if err := ms.Keeper.DistributionConfig.Set(goCtx, *msg.DistributionConfig); err != nil {
                return nil, err
        }

        // Update protocol allocation
        if err := ms.Keeper.ProtocolAllocation.Set(goCtx, *msg.ProtocolAllocation); err != nil {
                return nil, err
        }

        ctx.EventManager().EmitEvent(
                sdk.NewEvent(
                        "distribution_config_updated",
                        sdk.NewAttribute("protocol_percentage", fmt.Sprintf("%d", msg.DistributionConfig.ProtocolPercentage)),
                        sdk.NewAttribute("founder_percentage", fmt.Sprintf("%d", msg.DistributionConfig.FounderPercentage)),
                ),
        )

        return &types.MsgUpdateDistributionConfigResponse{}, nil
}

// RenewEndowment renews the endowment after 8 years
func (ms msgServer) RenewEndowment(goCtx context.Context, msg *types.MsgRenewEndowment) (*types.MsgRenewEndowmentResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        // Only authority can trigger renewal
        if msg.Authority != ms.GetAuthority() {
                return nil, fmt.Errorf("invalid authority; expected %s, got %s", ms.GetAuthority(), msg.Authority)
        }

        if err := ms.Keeper.RenewEndowment(goCtx); err != nil {
                return nil, err
        }

        endowment, err := ms.Keeper.Endowment.Get(goCtx)
        if err != nil {
                return nil, err
        }

        // Calculate renewal bonus (6% of total supply)
        totalSupply := math.NewInt(131_000_000_000_000) // 131T REPAR
        renewalBonus := totalSupply.MulRaw(6).QuoRaw(100) // 6% = 7.86T

        ctx.EventManager().EmitEvent(
                sdk.NewEvent(
                        "endowment_renewed",
                        sdk.NewAttribute("renewal_bonus", renewalBonus.String()),
                        sdk.NewAttribute("renewal_count", fmt.Sprintf("%d", endowment.RenewalCount)),
                        sdk.NewAttribute("next_renewal_time", fmt.Sprintf("%d", endowment.UnlockTime)),
                ),
        )

        return &types.MsgRenewEndowmentResponse{
                RenewalBonus:     renewalBonus.String(),
                RenewalCount:     endowment.RenewalCount,
                NextRenewalTime:  endowment.UnlockTime,
        }, nil
}
