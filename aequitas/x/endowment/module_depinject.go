package endowment

import (
        "cosmossdk.io/core/appmodule"
        "cosmossdk.io/core/store"
        "cosmossdk.io/depinject"
        "cosmossdk.io/log"
        authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
        "github.com/cosmos/cosmos-sdk/codec"

        "github.com/CreoDAMO/REPAR/aequitas/x/endowment/keeper"
        "github.com/CreoDAMO/REPAR/aequitas/x/endowment/types"
)

var _ appmodule.AppModule = AppModule{}

type ModuleInputs struct {
        depinject.In

        Cdc           codec.Codec
        StoreService  store.KVStoreService
        Logger        log.Logger
        BankKeeper    types.BankKeeper
        AccountKeeper types.AccountKeeper
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
                in.Logger,
                authority,
                in.BankKeeper,
                in.AccountKeeper,
        )

        m := NewAppModule(in.Cdc, k)

        return ModuleOutputs{
                Keeper: k,
                Module: m,
        }
}
