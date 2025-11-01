package distribution

import (
	"cosmossdk.io/core/appmodule"
	"cosmossdk.io/core/store"
	"cosmossdk.io/depinject"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/cosmos/cosmos-sdk/codec"

	"github.com/CreoDAMO/REPAR/aequitas/x/distribution/keeper"
	"github.com/CreoDAMO/REPAR/aequitas/x/distribution/types"
)

var _ appmodule.AppModule = AppModule{}

type ModuleInputs struct {
	depinject.In

	Cdc          codec.Codec
	StoreService store.KVStoreService
	BankKeeper   types.BankKeeper
}

type ModuleOutputs struct {
	depinject.Out

	Keeper keeper.Keeper
	Module appmodule.AppModule
}

func ProvideModule(in ModuleInputs) ModuleOutputs {
	authority := authtypes.NewModuleAddress("gov").String()

	k := keeper.NewKeeper(
		in.Cdc,
		in.StoreService,
		authority,
		in.BankKeeper,
	)

	m := NewAppModule(k)

	return ModuleOutputs{
		Keeper: k,
		Module: m,
	}
}
