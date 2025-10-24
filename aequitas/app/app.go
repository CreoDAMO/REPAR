package app

import (
        "io"

        clienthelpers "cosmossdk.io/client/v2/helpers"
        "cosmossdk.io/depinject"
        "cosmossdk.io/log"
        storetypes "cosmossdk.io/store/types"
        circuitkeeper "cosmossdk.io/x/circuit/keeper"
        evidencekeeper "cosmossdk.io/x/evidence/keeper"
        feegrantkeeper "cosmossdk.io/x/feegrant/keeper"
        upgradekeeper "cosmossdk.io/x/upgrade/keeper"
        _ "cosmossdk.io/api/cosmos/tx/config/v1"          // import for side-effects
        _ "github.com/cosmos/cosmos-sdk/x/auth/tx/config" // import for side-effects
        _ "github.com/cosmos/cosmos-sdk/x/bank"           // import for side-effects
        _ "github.com/cosmos/cosmos-sdk/x/consensus"      // import for side-effects
        _ "github.com/cosmos/cosmos-sdk/x/distribution"   // import for side-effects
        _ "github.com/cosmos/cosmos-sdk/x/mint"           // import for side-effects
        _ "github.com/cosmos/cosmos-sdk/x/staking"        // import for side-effects
        _ "cosmossdk.io/x/circuit"                                          // import for side-effects
        _ "cosmossdk.io/x/evidence"                                         // import for side-effects
        _ "cosmossdk.io/x/feegrant/module"                                  // import for side-effects
        _ "cosmossdk.io/x/nft/module"                                                                           // import for side-effects
        nftkeeper "cosmossdk.io/x/nft/keeper"
        _ "cosmossdk.io/x/upgrade"                                          // import for side-effects
        _ "github.com/cosmos/cosmos-sdk/x/auth/vesting"                     // import for side-effects
        _ "github.com/cosmos/cosmos-sdk/x/authz/module"                     // import for side-effects
        _ "github.com/cosmos/cosmos-sdk/x/crisis"                           // import for side-effects
        _ "github.com/cosmos/cosmos-sdk/x/group/module"                     // import for side-effects
        _ "github.com/cosmos/cosmos-sdk/x/params"                           // import for side-effects
        _ "github.com/cosmos/cosmos-sdk/x/slashing"                         // import for side-effects
        _ "github.com/cosmos/ibc-go/modules/capability"                     // import for side-effects
        _ "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts" // import for side-effects
        _ "github.com/cosmos/ibc-go/v8/modules/apps/29-fee"                 // import for side-effects
        dbm "github.com/cosmos/cosmos-db"
        abci "github.com/cometbft/cometbft/abci/types"
        "github.com/cosmos/cosmos-sdk/baseapp"
        "github.com/cosmos/cosmos-sdk/client"
        "github.com/cosmos/cosmos-sdk/codec"
        codectypes "github.com/cosmos/cosmos-sdk/codec/types"
        "github.com/cosmos/cosmos-sdk/runtime"
        "github.com/cosmos/cosmos-sdk/server"
        "github.com/cosmos/cosmos-sdk/server/api"
        "github.com/cosmos/cosmos-sdk/server/config"
        sdk "github.com/cosmos/cosmos-sdk/types"
        servertypes "github.com/cosmos/cosmos-sdk/server/types"
        "github.com/cosmos/cosmos-sdk/types/module"
        "github.com/cosmos/cosmos-sdk/x/auth"
        authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
        authsims "github.com/cosmos/cosmos-sdk/x/auth/simulation"
        authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
        authzkeeper "github.com/cosmos/cosmos-sdk/x/authz/keeper"
        bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
        consensuskeeper "github.com/cosmos/cosmos-sdk/x/consensus/keeper"
        crisiskeeper "github.com/cosmos/cosmos-sdk/x/crisis/keeper"
        distrkeeper "github.com/cosmos/cosmos-sdk/x/distribution/keeper"
        "github.com/cosmos/cosmos-sdk/x/genutil"
        genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
        "github.com/cosmos/cosmos-sdk/x/gov"
        govclient "github.com/cosmos/cosmos-sdk/x/gov/client"
        govkeeper "github.com/cosmos/cosmos-sdk/x/gov/keeper"
        govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
        groupkeeper "github.com/cosmos/cosmos-sdk/x/group/keeper"
        mintkeeper "github.com/cosmos/cosmos-sdk/x/mint/keeper"
        paramsclient "github.com/cosmos/cosmos-sdk/x/params/client"
        paramskeeper "github.com/cosmos/cosmos-sdk/x/params/keeper"
        paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
        slashingkeeper "github.com/cosmos/cosmos-sdk/x/slashing/keeper"
        stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
        capabilitykeeper "github.com/cosmos/ibc-go/modules/capability/keeper"
        icacontrollerkeeper "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts/controller/keeper"
        icahostkeeper "github.com/cosmos/ibc-go/v8/modules/apps/27-interchain-accounts/host/keeper"
        ibcfeekeeper "github.com/cosmos/ibc-go/v8/modules/apps/29-fee/keeper"
        ibctransferkeeper "github.com/cosmos/ibc-go/v8/modules/apps/transfer/keeper"
        ibckeeper "github.com/cosmos/ibc-go/v8/modules/core/keeper"

        // this line is used by starport scaffolding # stargate/app/moduleImport

        "github.com/CreoDAMO/REPAR/aequitas/docs"
        
        // Custom modules
        claimskeeper "github.com/CreoDAMO/REPAR/aequitas/x/claims/keeper"
        claimsmodule "github.com/CreoDAMO/REPAR/aequitas/x/claims"
        claimstypes "github.com/CreoDAMO/REPAR/aequitas/x/claims/types"
        
        defendantkeeper "github.com/CreoDAMO/REPAR/aequitas/x/defendant/keeper"
        defendantmodule "github.com/CreoDAMO/REPAR/aequitas/x/defendant"
        defendanttypes "github.com/CreoDAMO/REPAR/aequitas/x/defendant/types"
        
        dexkeeper "github.com/CreoDAMO/REPAR/aequitas/x/dex/keeper"
        dexmodule "github.com/CreoDAMO/REPAR/aequitas/x/dex"
        dextypes "github.com/CreoDAMO/REPAR/aequitas/x/dex/types"
        
        distributionkeeper "github.com/CreoDAMO/REPAR/aequitas/x/distribution/keeper"
        distributionmodule "github.com/CreoDAMO/REPAR/aequitas/x/distribution"
        distributiontypes "github.com/CreoDAMO/REPAR/aequitas/x/distribution/types"
        
        endowmentkeeper "github.com/CreoDAMO/REPAR/aequitas/x/endowment/keeper"
        endowmentmodule "github.com/CreoDAMO/REPAR/aequitas/x/endowment"
        endowmenttypes "github.com/CreoDAMO/REPAR/aequitas/x/endowment/types"
        
        founderendowmentkeeper "github.com/CreoDAMO/REPAR/aequitas/x/founderendowment/keeper"
        founderendowmentmodule "github.com/CreoDAMO/REPAR/aequitas/x/founderendowment"
        founderendowmenttypes "github.com/CreoDAMO/REPAR/aequitas/x/founderendowment/types"
        
        justicekeeper "github.com/CreoDAMO/REPAR/aequitas/x/justice/keeper"
        justicemodule "github.com/CreoDAMO/REPAR/aequitas/x/justice"
        justicetypes "github.com/CreoDAMO/REPAR/aequitas/x/justice/types"
        
        nftmarketplacekeeper "github.com/CreoDAMO/REPAR/aequitas/x/nftmarketplace/keeper"
        nftmarketplacemodule "github.com/CreoDAMO/REPAR/aequitas/x/nftmarketplace"
        nftmarketplacetypes "github.com/CreoDAMO/REPAR/aequitas/x/nftmarketplace/types"
        
        validatorsubsidykeeper "github.com/CreoDAMO/REPAR/aequitas/x/validatorsubsidy/keeper"
        validatorsubsidymodule "github.com/CreoDAMO/REPAR/aequitas/x/validatorsubsidy"
        validatorsubsidytypes "github.com/CreoDAMO/REPAR/aequitas/x/validatorsubsidy/types"
)

const (
        // Name is the name of the application.
        Name                 = "aequitas"
        // AccountAddressPrefix is the prefix for accounts addresses.
        AccountAddressPrefix = "cosmos"
        // ChainCoinType is the coin type of the chain.
        ChainCoinType        = 118
)

var (
        // DefaultNodeHome default home directories for the application daemon
        DefaultNodeHome string
        
        // Module account permissions
        moduleAccPerms = []struct {
                Account     string
                Permissions []string
        }{
                {Account: dextypes.ModuleName, Permissions: []string{authtypes.Minter, authtypes.Burner}},
                {Account: justicetypes.ModuleName, Permissions: []string{authtypes.Burner}},
                {Account: endowmenttypes.ModuleName, Permissions: []string{authtypes.Minter, authtypes.Burner}},
                {Account: founderendowmenttypes.ModuleName, Permissions: []string{authtypes.Minter}},
                {Account: distributiontypes.ModuleName, Permissions: []string{authtypes.Minter}},
                {Account: nftmarketplacetypes.ModuleName, Permissions: []string{authtypes.Minter, authtypes.Burner}},
                {Account: validatorsubsidytypes.ModuleName, Permissions: []string{authtypes.Minter}},
        }
)

var (
        _ runtime.AppI            = (*App)(nil)
        _ servertypes.Application = (*App)(nil)
)

// App extends an ABCI application, but with most of its parameters exported.
// They are exported for convenience in creating helper functions, as object
// capabilities aren't needed for testing.
type App struct {
        *runtime.App
        legacyAmino       *codec.LegacyAmino
        appCodec          codec.Codec
        txConfig          client.TxConfig
        interfaceRegistry codectypes.InterfaceRegistry

        // keepers
        AccountKeeper         authkeeper.AccountKeeper
        BankKeeper            bankkeeper.Keeper
        StakingKeeper         *stakingkeeper.Keeper
        DistrKeeper           distrkeeper.Keeper
        ConsensusParamsKeeper consensuskeeper.Keeper

        SlashingKeeper        slashingkeeper.Keeper
        MintKeeper            mintkeeper.Keeper
        GovKeeper             *govkeeper.Keeper
        CrisisKeeper          *crisiskeeper.Keeper
        UpgradeKeeper         *upgradekeeper.Keeper
        ParamsKeeper          paramskeeper.Keeper
        AuthzKeeper           authzkeeper.Keeper
        EvidenceKeeper        evidencekeeper.Keeper
        FeeGrantKeeper        feegrantkeeper.Keeper
        GroupKeeper           groupkeeper.Keeper
        NFTKeeper             nftkeeper.Keeper
        CircuitBreakerKeeper  circuitkeeper.Keeper

    // IBC
        IBCKeeper           *ibckeeper.Keeper // IBC Keeper must be a pointer in the app, so we can SetRouter on it correctly
        CapabilityKeeper    *capabilitykeeper.Keeper
        IBCFeeKeeper        ibcfeekeeper.Keeper
        ICAControllerKeeper icacontrollerkeeper.Keeper
        ICAHostKeeper       icahostkeeper.Keeper
        TransferKeeper      ibctransferkeeper.Keeper

        // Scoped IBC
        ScopedIBCKeeper           capabilitykeeper.ScopedKeeper
        ScopedIBCTransferKeeper   capabilitykeeper.ScopedKeeper
        ScopedICAControllerKeeper capabilitykeeper.ScopedKeeper
        ScopedICAHostKeeper       capabilitykeeper.ScopedKeeper
        ScopedKeepers             map[string]capabilitykeeper.ScopedKeeper

        // Custom module keepers
        ClaimsKeeper            claimskeeper.Keeper
        DefendantKeeper         defendantkeeper.Keeper
        DexKeeper               dexkeeper.Keeper
        DistributionKeeper      distributionkeeper.Keeper
        EndowmentKeeper         endowmentkeeper.Keeper
        FounderEndowmentKeeper  founderendowmentkeeper.Keeper
        JusticeKeeper           justicekeeper.Keeper
        NftMarketplaceKeeper    nftmarketplacekeeper.Keeper
        ValidatorSubsidyKeeper  validatorsubsidykeeper.Keeper

        // simulation manager
        sm *module.SimulationManager
}

func init() {
        var err error
        clienthelpers.EnvPrefix = Name
        DefaultNodeHome, err = clienthelpers.GetNodeHomeDirectory("."+Name)
        if err != nil {
                panic(err)
        }
}

// getGovProposalHandlers return the chain proposal handlers.
func getGovProposalHandlers() []govclient.ProposalHandler {
        var govProposalHandlers []govclient.ProposalHandler
        // this line is used by starport scaffolding # stargate/app/govProposalHandlers

        govProposalHandlers = append(govProposalHandlers,
                paramsclient.ProposalHandler,
                // this line is used by starport scaffolding # stargate/app/govProposalHandler
        )

        return govProposalHandlers
}

// AppConfig returns the default app config.
func AppConfig() depinject.Config {
        return depinject.Configs(
                appConfig,
                // Alternatively, load the app config from a YAML file.
                // appconfig.LoadYAML(AppConfigYAML),
                depinject.Supply(
                        // supply custom module basics
                        map[string]module.AppModuleBasic{
                                genutiltypes.ModuleName: genutil.NewAppModuleBasic(genutiltypes.DefaultMessageValidator),
                                govtypes.ModuleName:     gov.NewAppModuleBasic(getGovProposalHandlers()),
                                // this line is used by starport scaffolding # stargate/appConfig/moduleBasic
                        },
                ),
        )
}

// New returns a reference to an initialized App.
func New(
        logger log.Logger,
        db dbm.DB,
        traceStore io.Writer,
        loadLatest bool,
        appOpts servertypes.AppOptions,
        baseAppOptions ...func(*baseapp.BaseApp),
) (*App, error) {
        var (
                app        = &App{ScopedKeepers: make(map[string]capabilitykeeper.ScopedKeeper)}
                appBuilder *runtime.AppBuilder

                // merge the AppConfig and other configuration in one config
                appConfig = depinject.Configs(
                        AppConfig(),
                        depinject.Supply(
                                appOpts, // supply app options
                                logger, // supply logger
                                // Supply with IBC keeper getter for the IBC modules with App Wiring.
                                // The IBC Keeper cannot be passed because it has not been initiated yet.
                                // Passing the getter, the app IBC Keeper will always be accessible.
                                // This needs to be removed after IBC supports App Wiring.
                                app.GetIBCKeeper,
                                app.GetCapabilityScopedKeeper,

                                // here alternative options can be supplied to the DI container.
                                // those options can be used f.e to override the default behavior of some modules.
                                // for instance supplying a custom address codec for not using bech32 addresses.
                                // read the depinject documentation and depinject module wiring for more information
                                // on available options and how to use them.
                        ),
                )
        )

        if err := depinject.Inject(appConfig,
                &appBuilder,
                &app.appCodec,
                &app.legacyAmino,
                &app.txConfig,
                &app.interfaceRegistry,
                &app.AccountKeeper,
                &app.BankKeeper,
                &app.StakingKeeper,
                &app.DistrKeeper,
                &app.ConsensusParamsKeeper,
                &app.SlashingKeeper,
                &app.MintKeeper,
                &app.GovKeeper,
                &app.CrisisKeeper,
                &app.UpgradeKeeper,
                &app.ParamsKeeper,
                &app.AuthzKeeper,
                &app.EvidenceKeeper,
                &app.FeeGrantKeeper,
                &app.NFTKeeper,
                &app.GroupKeeper,
                &app.CircuitBreakerKeeper,
                &app.ClaimsKeeper,
                &app.DefendantKeeper,
                &app.DexKeeper,
                &app.DistributionKeeper,
                &app.EndowmentKeeper,
                &app.FounderEndowmentKeeper,
                &app.JusticeKeeper,
                &app.NftMarketplaceKeeper,
                &app.ValidatorSubsidyKeeper,
        ); err != nil {
                panic(err)
        }

        // add to default baseapp options
        // enable optimistic execution
        baseAppOptions = append(baseAppOptions, baseapp.SetOptimisticExecution())

        // build app
        app.App = appBuilder.Build(db, traceStore, baseAppOptions...)

        // register legacy modules
        if err := app.registerIBCModules(appOpts); err != nil {
                return nil, err
        }

        // register streaming services
        if err := app.RegisterStreamingServices(appOpts, app.kvStoreKeys()); err != nil {
                return nil, err
        }

        /****  Module Options ****/

        app.ModuleManager.RegisterInvariants(app.CrisisKeeper)

        // create the simulation manager and define the order of the modules for deterministic simulations
        overrideModules := map[string]module.AppModuleSimulation{
                authtypes.ModuleName: auth.NewAppModule(app.appCodec, app.AccountKeeper, authsims.RandomGenesisAccounts, app.GetSubspace(authtypes.ModuleName)),
        }
        app.sm = module.NewSimulationManagerFromAppModules(app.ModuleManager.Modules, overrideModules)
        app.sm.RegisterStoreDecoders()

        // Note: In cosmos-sdk v0.50.x, the runtime app handles InitChainer automatically.
        // The module version map is set by the framework during initialization.
        // Custom InitChainer logic has been removed for v0.50 compatibility.

        if err := app.Load(loadLatest); err != nil {
                return nil, err
        }

        return app, nil
}

// LegacyAmino returns App's amino codec.
//
// NOTE: This is solely to be used for testing purposes as it may be desirable
// for modules to register their own custom testing types.
func (app *App) LegacyAmino() *codec.LegacyAmino {
        return app.legacyAmino
}

// AppCodec returns App's app codec.
//
// NOTE: This is solely to be used for testing purposes as it may be desirable
// for modules to register their own custom testing types.
func (app *App) AppCodec() codec.Codec {
        return app.appCodec
}

// InterfaceRegistry returns App's interfaceRegistry.
func (app *App) InterfaceRegistry() codectypes.InterfaceRegistry {
        return app.interfaceRegistry
}

// TxConfig returns App's tx config.
func (app *App) TxConfig() client.TxConfig {
        return app.txConfig
}

// GetKey returns the KVStoreKey for the provided store key.
func (app *App) GetKey(storeKey string) *storetypes.KVStoreKey {
        kvStoreKey, ok := app.UnsafeFindStoreKey(storeKey).(*storetypes.KVStoreKey)
        if !ok {
                return nil
        }
        return kvStoreKey
}

// GetMemKey returns the MemoryStoreKey for the provided store key.
func (app *App) GetMemKey(storeKey string) *storetypes.MemoryStoreKey {
        key, ok := app.UnsafeFindStoreKey(storeKey).(*storetypes.MemoryStoreKey)
        if !ok {
                return nil
        }

        return key
}

// kvStoreKeys returns all the kv store keys registered inside App.
func (app *App) kvStoreKeys() map[string]*storetypes.KVStoreKey {
        keys := make(map[string]*storetypes.KVStoreKey)
        for _, k := range app.GetStoreKeys() {
                if kv, ok := k.(*storetypes.KVStoreKey); ok {
                        keys[kv.Name()] = kv
                }
        }

        return keys
}

// GetSubspace returns a param subspace for a given module name.
func (app *App) GetSubspace(moduleName string) paramstypes.Subspace {
        subspace, _ := app.ParamsKeeper.GetSubspace(moduleName)
        return subspace
}

// GetIBCKeeper returns the IBC keeper.
func (app *App) GetIBCKeeper() *ibckeeper.Keeper {
        return app.IBCKeeper
}

// GetCapabilityScopedKeeper returns the capability scoped keeper.
func (app *App) GetCapabilityScopedKeeper(moduleName string) capabilitykeeper.ScopedKeeper {
        sk, ok := app.ScopedKeepers[moduleName]
        if !ok {
                sk = app.CapabilityKeeper.ScopeToModule(moduleName)
                app.ScopedKeepers[moduleName] = sk
        }
        return sk
}

// SimulationManager implements the SimulationApp interface.
func (app *App) SimulationManager() *module.SimulationManager {
        return app.sm
}

// RegisterAPIRoutes registers all application module routes with the provided
// API server.
func (app *App) RegisterAPIRoutes(apiSvr *api.Server, apiConfig config.APIConfig) {
        app.App.RegisterAPIRoutes(apiSvr, apiConfig)
        // register swagger API in app.go so that other applications can override easily
        if err := server.RegisterSwaggerAPI(apiSvr.ClientCtx, apiSvr.Router, apiConfig.Swagger); err != nil {
                panic(err)
        }

        // register app's OpenAPI routes.
        docs.RegisterOpenAPIService(Name, apiSvr.Router)
}

// GetMaccPerms returns a copy of the module account permissions
//
// NOTE: This is solely to be used for testing purposes.
func GetMaccPerms() map[string][]string {
        dup := make(map[string][]string)
        for _, perms := range moduleAccPerms {
                dup[perms.Account] = perms.Permissions
        }
        return dup
}

// BlockedAddresses returns all the app's blocked account addresses.
func BlockedAddresses() map[string]bool {
        result := make(map[string]bool)
        if len(blockAccAddrs) > 0 {
                for _, addr := range blockAccAddrs {
                        result[addr] = true
                }
        } else {
                for addr := range GetMaccPerms() {
                        result[addr] = true
                }
        }
        return result
}