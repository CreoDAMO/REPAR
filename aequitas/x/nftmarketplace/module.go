package nftmarketplace

import (
	"context"
	"encoding/json"
	"fmt"

	"cosmossdk.io/core/appmodule"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"

	"github.com/aequitas/aequitas/x/nftmarketplace/keeper"
	"github.com/aequitas/aequitas/x/nftmarketplace/types"
)

var (
	_ module.AppModuleBasic = AppModule{}
	_ module.HasGenesis     = AppModule{}
	_ module.HasServices    = AppModule{}
	_ appmodule.AppModule   = AppModule{}
)

const ModuleName = "nftmarketplace"

type AppModuleBasic struct{}

func (AppModuleBasic) Name() string { return ModuleName }

func (AppModuleBasic) RegisterLegacyAminoCodec(cdc *codec.LegacyAmino) {
	types.RegisterCodec(cdc)
}

func (AppModuleBasic) RegisterInterfaces(registry codectypes.InterfaceRegistry) {
	types.RegisterInterfaces(registry)
}

func (AppModuleBasic) RegisterGRPCGatewayRoutes(clientCtx client.Context, mux *runtime.ServeMux) {
	if err := types.RegisterQueryHandlerClient(context.Background(), mux, types.NewQueryClient(clientCtx)); err != nil {
		panic(err)
	}
}

type AppModule struct {
	AppModuleBasic
	keeper keeper.Keeper
}

func NewAppModule(keeper keeper.Keeper) AppModule {
	return AppModule{
		keeper: keeper,
	}
}

func (am AppModule) IsOnePerModuleType() {}
func (am AppModule) IsAppModule()        {}

func (am AppModule) RegisterServices(cfg module.Configurator) {
	types.RegisterMsgServer(cfg.MsgServer(), keeper.NewMsgServerImpl(am.keeper))
	types.RegisterQueryServer(cfg.QueryServer(), keeper.NewQueryServerImpl(am.keeper))
}

func (am AppModule) DefaultGenesis(cdc codec.JSONCodec) json.RawMessage {
	return cdc.MustMarshalJSON(types.DefaultGenesis())
}

func (am AppModule) ValidateGenesis(cdc codec.JSONCodec, _ client.TxEncodingConfig, bz json.RawMessage) error {
	var data types.GenesisState
	if err := cdc.UnmarshalJSON(bz, &data); err != nil {
		return fmt.Errorf("failed to unmarshal %s genesis state: %w", ModuleName, err)
	}
	return data.Validate()
}

func (am AppModule) InitGenesis(ctx sdk.Context, cdc codec.JSONCodec, data json.RawMessage) {
	var genesisState types.GenesisState
	cdc.MustUnmarshalJSON(data, &genesisState)

	// Initialize params
	if err := am.keeper.Params.Set(ctx, genesisState.Params); err != nil {
		panic(err)
	}

	// Initialize NFTs
	for _, nft := range genesisState.Nfts {
		if err := am.keeper.NFTs.Set(ctx, nft.Id, nft); err != nil {
			panic(err)
		}
	}

	// Initialize collections
	for _, collection := range genesisState.Collections {
		if err := am.keeper.Collections.Set(ctx, collection.Id, collection); err != nil {
			panic(err)
		}
	}

	// Initialize listings
	for _, listing := range genesisState.Listings {
		if err := am.keeper.Listings.Set(ctx, listing.Id, listing); err != nil {
			panic(err)
		}
	}

	// Initialize sales
	for _, sale := range genesisState.Sales {
		if err := am.keeper.Sales.Set(ctx, sale.Id, sale); err != nil {
			panic(err)
		}
	}

	// Set counters
	if err := am.keeper.NextNFTID.Set(ctx, genesisState.NextNftId); err != nil {
		panic(err)
	}
	if err := am.keeper.NextCollectionID.Set(ctx, genesisState.NextCollectionId); err != nil {
		panic(err)
	}
	if err := am.keeper.NextListingID.Set(ctx, genesisState.NextListingId); err != nil {
		panic(err)
	}
	if err := am.keeper.NextSaleID.Set(ctx, genesisState.NextSaleId); err != nil {
		panic(err)
	}
}

func (am AppModule) ExportGenesis(ctx sdk.Context, cdc codec.JSONCodec) json.RawMessage {
	var nfts []types.NFT
	var collections []types.Collection
	var listings []types.Listing
	var sales []types.Sale

	// Export all NFTs
	_ = am.keeper.NFTs.Walk(ctx, nil, func(key string, value types.NFT) (bool, error) {
		nfts = append(nfts, value)
		return false, nil
	})

	// Export all collections
	_ = am.keeper.Collections.Walk(ctx, nil, func(key string, value types.Collection) (bool, error) {
		collections = append(collections, value)
		return false, nil
	})

	// Export all listings
	_ = am.keeper.Listings.Walk(ctx, nil, func(key string, value types.Listing) (bool, error) {
		listings = append(listings, value)
		return false, nil
	})

	// Export all sales
	_ = am.keeper.Sales.Walk(ctx, nil, func(key string, value types.Sale) (bool, error) {
		sales = append(sales, value)
		return false, nil
	})

	// Get params
	params, _ := am.keeper.Params.Get(ctx)

	// Get counters
	nextNFTID, _ := am.keeper.NextNFTID.Peek(ctx)
	nextCollectionID, _ := am.keeper.NextCollectionID.Peek(ctx)
	nextListingID, _ := am.keeper.NextListingID.Peek(ctx)
	nextSaleID, _ := am.keeper.NextSaleID.Peek(ctx)

	gs := &types.GenesisState{
		Params:           params,
		Nfts:             nfts,
		Collections:      collections,
		Listings:         listings,
		Sales:            sales,
		NextNftId:        nextNFTID,
		NextCollectionId: nextCollectionID,
		NextListingId:    nextListingID,
		NextSaleId:       nextSaleID,
	}

	return cdc.MustMarshalJSON(gs)
}

func (am AppModule) ConsensusVersion() uint64 { return 1 }
