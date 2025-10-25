package keeper

import (
        "context"
        "fmt"

        sdk "github.com/cosmos/cosmos-sdk/types"

        "github.com/CreoDAMO/REPAR/aequitas/x/justice/types"
)

type msgServer struct {
        Keeper
}

// NewMsgServerImpl returns an implementation of the justice MsgServer interface
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
        return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

// ExecuteJusticeBurn executes the Justice Burn mechanism: $1 USD = 1 REPAR burned permanently
func (ms msgServer) ExecuteJusticeBurn(goCtx context.Context, msg *types.MsgExecuteJusticeBurn) (*types.MsgExecuteJusticeBurnResponse, error) {
        ctx := sdk.UnwrapSDKContext(goCtx)

        // Validate authority
        if ms.authority != msg.Authority {
                return nil, fmt.Errorf("invalid authority; expected %s, got %s", ms.authority, msg.Authority)
        }

        // Create burn ID
        burnId := fmt.Sprintf("burn-%d", ctx.BlockHeight())

        // Execute the burn
        if err := ms.Keeper.ExecuteJusticeBurn(
                ctx,
                msg.DefendantId,
                msg.UsdValue,
                msg.AmountToBurn,
                msg.EvidenceCid,
                msg.Description,
        ); err != nil {
                return nil, err
        }

        // Get updated statistics
        stats, err := ms.Keeper.GetBurnStatistics(ctx)
        if err != nil {
                return nil, err
        }

        return &types.MsgExecuteJusticeBurnResponse{
                BurnId:                burnId,
                TotalSupplyAfterBurn:  stats.CurrentSupply,
                TotalBurnedToDate:     stats.TotalBurned,
        }, nil
}
