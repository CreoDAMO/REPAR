package adns

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
	"google.golang.org/grpc"

	"github.com/CreoDAMO/REPAR/aequitas/x/adns/keeper"
	"github.com/CreoDAMO/REPAR/aequitas/x/adns/types"
)

var (
	_ module.AppModuleBasic = AppModule{}
	_ module.HasGenesis     = AppModule{}
	_ module.HasServices    = AppModule{}
	_ appmodule.AppModule   = AppModule{}
)

const ModuleName = types.ModuleName

// AppModuleBasic implements the AppModuleBasic interface
type AppModuleBasic struct{}

// Name returns the module name
func (AppModuleBasic) Name() string { return ModuleName }

// RegisterLegacyAminoCodec registers the amino codec
func (AppModuleBasic) RegisterLegacyAminoCodec(cdc *codec.LegacyAmino) {
	types.RegisterCodec(cdc)
}

// RegisterInterfaces registers the module interfaces
func (AppModuleBasic) RegisterInterfaces(registry codectypes.InterfaceRegistry) {
	types.RegisterInterfaces(registry)
}

// RegisterGRPCGatewayRoutes registers the gRPC gateway routes
func (AppModuleBasic) RegisterGRPCGatewayRoutes(clientCtx client.Context, mux *runtime.ServeMux) {
}

// AppModule implements the AppModule interface
type AppModule struct {
	AppModuleBasic
	keeper *keeper.Keeper
}

// NewAppModule creates a new AppModule
func NewAppModule(keeper *keeper.Keeper) AppModule {
	return AppModule{
		keeper: keeper,
	}
}

// IsOnePerModuleType implements the depinject.OnePerModuleType interface
func (am AppModule) IsOnePerModuleType() {}

// IsAppModule implements the appmodule.AppModule interface
func (am AppModule) IsAppModule() {}

// RegisterServices registers module services
func (am AppModule) RegisterServices(cfg module.Configurator) {
	types.RegisterMsgServerImpl(cfg.MsgServer(), keeper.NewMsgServerImpl(am.keeper))
	types.RegisterQueryServerImpl(cfg.QueryServer(), keeper.NewQueryServerImpl(*am.keeper))
}

// DefaultGenesis returns the default genesis state
func (am AppModule) DefaultGenesis(cdc codec.JSONCodec) json.RawMessage {
	return cdc.MustMarshalJSON(&types.GenesisState{
		Records: []types.DNSRecord{},
		Nfts:    []types.DomainNFT{},
		Params: types.Params{
			DefaultTtl:         300,
			FheEnabled:         true,
			MldsaEnabled:       true,
			MldsaMode:          "Dilithium87",
			SovereignTlds:      types.SovereignTLDs,
			MaxAxiomViolations: 0,
		},
	})
}

// ValidateGenesis validates the genesis state
func (am AppModule) ValidateGenesis(cdc codec.JSONCodec, _ client.TxEncodingConfig, bz json.RawMessage) error {
	var data types.GenesisState
	if err := cdc.UnmarshalJSON(bz, &data); err != nil {
		return fmt.Errorf("failed to unmarshal %s genesis state: %w", ModuleName, err)
	}

	for _, record := range data.Records {
		if record.Domain == "" {
			return fmt.Errorf("invalid record: domain cannot be empty")
		}
		if len(record.Values) == 0 {
			return fmt.Errorf("invalid record %s: no values", record.Domain)
		}
	}

	return nil
}

// InitGenesis initializes the genesis state
func (am AppModule) InitGenesis(ctx sdk.Context, cdc codec.JSONCodec, data json.RawMessage) {
	var genesisState types.GenesisState
	cdc.MustUnmarshalJSON(data, &genesisState)

	am.keeper.InitGenesis(ctx, genesisState)
}

// ExportGenesis exports the genesis state
func (am AppModule) ExportGenesis(ctx sdk.Context, cdc codec.JSONCodec) json.RawMessage {
	gs := am.keeper.ExportGenesis(ctx)
	return cdc.MustMarshalJSON(gs)
}

// ConsensusVersion returns the consensus version
func (am AppModule) ConsensusVersion() uint64 { return 1 }

// MsgServerWrapper wraps the msg server for grpc registration
type MsgServerWrapper struct {
	inner types.MsgServer
}

func (w *MsgServerWrapper) RegisterDomain(ctx context.Context, req *types.MsgRegisterDomain) (*types.MsgRegisterDomainResponse, error) {
	return w.inner.RegisterDomain(ctx, req)
}
func (w *MsgServerWrapper) UpdateRecord(ctx context.Context, req *types.MsgUpdateRecord) (*types.MsgUpdateRecordResponse, error) {
	return w.inner.UpdateRecord(ctx, req)
}
func (w *MsgServerWrapper) TransferDomain(ctx context.Context, req *types.MsgTransferDomain) (*types.MsgTransferDomainResponse, error) {
	return w.inner.TransferDomain(ctx, req)
}
func (w *MsgServerWrapper) FreezeDomain(ctx context.Context, req *types.MsgFreezeDomain) (*types.MsgFreezeDomainResponse, error) {
	return w.inner.FreezeDomain(ctx, req)
}

// QueryServerWrapper wraps the query server for grpc registration
type QueryServerWrapper struct {
	inner types.QueryServer
}

func (w *QueryServerWrapper) Resolve(ctx context.Context, req *types.QueryResolveRequest) (*types.QueryResolveResponse, error) {
	return w.inner.Resolve(ctx, req)
}
func (w *QueryServerWrapper) GetRecord(ctx context.Context, req *types.QueryGetRecordRequest) (*types.QueryGetRecordResponse, error) {
	return w.inner.GetRecord(ctx, req)
}
func (w *QueryServerWrapper) ListDomains(ctx context.Context, req *types.QueryListDomainsRequest) (*types.QueryListDomainsResponse, error) {
	return w.inner.ListDomains(ctx, req)
}
func (w *QueryServerWrapper) FHEStatus(ctx context.Context, req *types.QueryFHEStatusRequest) (*types.QueryFHEStatusResponse, error) {
	return w.inner.FHEStatus(ctx, req)
}
func (w *QueryServerWrapper) MLDSAStatus(ctx context.Context, req *types.QueryMLDSAStatusRequest) (*types.QueryMLDSAStatusResponse, error) {
	return w.inner.MLDSAStatus(ctx, req)
}
func (w *QueryServerWrapper) Params(ctx context.Context, req *types.QueryParamsRequest) (*types.QueryParamsResponse, error) {
	return w.inner.Params(ctx, req)
}
func (w *QueryServerWrapper) ValidateAxioms(ctx context.Context, req *types.QueryValidateAxiomsRequest) (*types.QueryValidateAxiomsResponse, error) {
	return w.inner.ValidateAxioms(ctx, req)
}

// GRPC Service descriptors for registration
var _Msg_serviceDesc_grpc = grpc.ServiceDesc{
	ServiceName: "aequitas.adns.v1.Msg",
	HandlerType: (*types.MsgServer)(nil),
	Methods: []grpc.MethodDesc{
		{MethodName: "RegisterDomain", Handler: _Msg_RegisterDomain_Handler},
		{MethodName: "UpdateRecord", Handler: _Msg_UpdateRecord_Handler},
		{MethodName: "TransferDomain", Handler: _Msg_TransferDomain_Handler},
		{MethodName: "FreezeDomain", Handler: _Msg_FreezeDomain_Handler},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "aequitas/adns/v1/tx.proto",
}

var _Query_serviceDesc_grpc = grpc.ServiceDesc{
	ServiceName: "aequitas.adns.v1.Query",
	HandlerType: (*types.QueryServer)(nil),
	Methods: []grpc.MethodDesc{
		{MethodName: "Resolve", Handler: _Query_Resolve_Handler},
		{MethodName: "GetRecord", Handler: _Query_GetRecord_Handler},
		{MethodName: "ListDomains", Handler: _Query_ListDomains_Handler},
		{MethodName: "FHEStatus", Handler: _Query_FHEStatus_Handler},
		{MethodName: "MLDSAStatus", Handler: _Query_MLDSAStatus_Handler},
		{MethodName: "Params", Handler: _Query_Params_Handler},
		{MethodName: "ValidateAxioms", Handler: _Query_ValidateAxioms_Handler},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "aequitas/adns/v1/query.proto",
}

func _Msg_RegisterDomain_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(types.MsgRegisterDomain)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(types.MsgServer).RegisterDomain(ctx, in)
	}
	info := &grpc.UnaryServerInfo{Server: srv, FullMethod: "/aequitas.adns.v1.Msg/RegisterDomain"}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(types.MsgServer).RegisterDomain(ctx, req.(*types.MsgRegisterDomain))
	}
	return interceptor(ctx, in, info, handler)
}

func _Msg_UpdateRecord_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(types.MsgUpdateRecord)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(types.MsgServer).UpdateRecord(ctx, in)
	}
	info := &grpc.UnaryServerInfo{Server: srv, FullMethod: "/aequitas.adns.v1.Msg/UpdateRecord"}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(types.MsgServer).UpdateRecord(ctx, req.(*types.MsgUpdateRecord))
	}
	return interceptor(ctx, in, info, handler)
}

func _Msg_TransferDomain_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(types.MsgTransferDomain)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(types.MsgServer).TransferDomain(ctx, in)
	}
	info := &grpc.UnaryServerInfo{Server: srv, FullMethod: "/aequitas.adns.v1.Msg/TransferDomain"}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(types.MsgServer).TransferDomain(ctx, req.(*types.MsgTransferDomain))
	}
	return interceptor(ctx, in, info, handler)
}

func _Msg_FreezeDomain_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(types.MsgFreezeDomain)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(types.MsgServer).FreezeDomain(ctx, in)
	}
	info := &grpc.UnaryServerInfo{Server: srv, FullMethod: "/aequitas.adns.v1.Msg/FreezeDomain"}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(types.MsgServer).FreezeDomain(ctx, req.(*types.MsgFreezeDomain))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_Resolve_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(types.QueryResolveRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(types.QueryServer).Resolve(ctx, in)
	}
	info := &grpc.UnaryServerInfo{Server: srv, FullMethod: "/aequitas.adns.v1.Query/Resolve"}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(types.QueryServer).Resolve(ctx, req.(*types.QueryResolveRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_GetRecord_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(types.QueryGetRecordRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(types.QueryServer).GetRecord(ctx, in)
	}
	info := &grpc.UnaryServerInfo{Server: srv, FullMethod: "/aequitas.adns.v1.Query/GetRecord"}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(types.QueryServer).GetRecord(ctx, req.(*types.QueryGetRecordRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_ListDomains_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(types.QueryListDomainsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(types.QueryServer).ListDomains(ctx, in)
	}
	info := &grpc.UnaryServerInfo{Server: srv, FullMethod: "/aequitas.adns.v1.Query/ListDomains"}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(types.QueryServer).ListDomains(ctx, req.(*types.QueryListDomainsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_FHEStatus_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(types.QueryFHEStatusRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(types.QueryServer).FHEStatus(ctx, in)
	}
	info := &grpc.UnaryServerInfo{Server: srv, FullMethod: "/aequitas.adns.v1.Query/FHEStatus"}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(types.QueryServer).FHEStatus(ctx, req.(*types.QueryFHEStatusRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_MLDSAStatus_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(types.QueryMLDSAStatusRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(types.QueryServer).MLDSAStatus(ctx, in)
	}
	info := &grpc.UnaryServerInfo{Server: srv, FullMethod: "/aequitas.adns.v1.Query/MLDSAStatus"}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(types.QueryServer).MLDSAStatus(ctx, req.(*types.QueryMLDSAStatusRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_Params_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(types.QueryParamsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(types.QueryServer).Params(ctx, in)
	}
	info := &grpc.UnaryServerInfo{Server: srv, FullMethod: "/aequitas.adns.v1.Query/Params"}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(types.QueryServer).Params(ctx, req.(*types.QueryParamsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Query_ValidateAxioms_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(types.QueryValidateAxiomsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(types.QueryServer).ValidateAxioms(ctx, in)
	}
	info := &grpc.UnaryServerInfo{Server: srv, FullMethod: "/aequitas.adns.v1.Query/ValidateAxioms"}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(types.QueryServer).ValidateAxioms(ctx, req.(*types.QueryValidateAxiomsRequest))
	}
	return interceptor(ctx, in, info, handler)
}
