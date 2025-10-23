package endowment

import (
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/CreoDAMO/REPAR/aequitas/x/endowment/keeper"
	"github.com/CreoDAMO/REPAR/aequitas/x/endowment/types"
)

func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	if err := k.InitGenesis(ctx, genState); err != nil {
		panic(err)
	}
}

func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis, err := k.ExportGenesis(ctx)
	if err != nil {
		panic(err)
	}
	return &genesis
}
