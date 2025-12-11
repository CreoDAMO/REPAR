package types

import (
	"context"

	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc"
)

// QueryResolveRequest is the request for DNS resolution
type QueryResolveRequest struct {
	Domain     string `protobuf:"bytes,1,opt,name=domain,proto3" json:"domain,omitempty"`
	RecordType string `protobuf:"bytes,2,opt,name=record_type,json=recordType,proto3" json:"record_type,omitempty"`
}

// QueryResolveResponse is the response for DNS resolution
type QueryResolveResponse struct {
	Record          *DNSRecord `protobuf:"bytes,1,opt,name=record,proto3" json:"record,omitempty"`
	CachedUntil     int64      `protobuf:"varint,2,opt,name=cached_until,json=cachedUntil,proto3" json:"cached_until,omitempty"`
	ResolutionLayer string     `protobuf:"bytes,3,opt,name=resolution_layer,json=resolutionLayer,proto3" json:"resolution_layer,omitempty"`
}

// QueryGetRecordRequest is the request to get a single record
type QueryGetRecordRequest struct {
	Domain string `protobuf:"bytes,1,opt,name=domain,proto3" json:"domain,omitempty"`
}

// QueryGetRecordResponse is the response for getting a record
type QueryGetRecordResponse struct {
	Record *DNSRecord `protobuf:"bytes,1,opt,name=record,proto3" json:"record,omitempty"`
	Nft    *DomainNFT `protobuf:"bytes,2,opt,name=nft,proto3" json:"nft,omitempty"`
}

// QueryListDomainsRequest is the request to list all domains
type QueryListDomainsRequest struct {
	Pagination *query.PageRequest `protobuf:"bytes,1,opt,name=pagination,proto3" json:"pagination,omitempty"`
	Category   string             `protobuf:"bytes,2,opt,name=category,proto3" json:"category,omitempty"`
	FrozenOnly bool               `protobuf:"varint,3,opt,name=frozen_only,json=frozenOnly,proto3" json:"frozen_only,omitempty"`
}

// QueryListDomainsResponse is the response for listing domains
type QueryListDomainsResponse struct {
	Records    []DNSRecord         `protobuf:"bytes,1,rep,name=records,proto3" json:"records"`
	Pagination *query.PageResponse `protobuf:"bytes,2,opt,name=pagination,proto3" json:"pagination,omitempty"`
}

// QueryFHEStatusRequest is the request for FHE status
type QueryFHEStatusRequest struct{}

// QueryFHEStatusResponse is the response for FHE status
type QueryFHEStatusResponse struct {
	Status *FHEStatus `protobuf:"bytes,1,opt,name=status,proto3" json:"status,omitempty"`
}

// QueryMLDSAStatusRequest is the request for ML-DSA status
type QueryMLDSAStatusRequest struct{}

// QueryMLDSAStatusResponse is the response for ML-DSA status
type QueryMLDSAStatusResponse struct {
	Status *MLDSAStatus `protobuf:"bytes,1,opt,name=status,proto3" json:"status,omitempty"`
}

// QueryParamsRequest is the request for module params
type QueryParamsRequest struct{}

// QueryParamsResponse is the response for module params
type QueryParamsResponse struct {
	Params Params `protobuf:"bytes,1,opt,name=params,proto3" json:"params"`
}

// QueryValidateAxiomsRequest validates domain against constitutional axioms
type QueryValidateAxiomsRequest struct {
	Domain string `protobuf:"bytes,1,opt,name=domain,proto3" json:"domain,omitempty"`
}

// QueryValidateAxiomsResponse returns axiom validation results
type QueryValidateAxiomsResponse struct {
	Valid       bool              `protobuf:"varint,1,opt,name=valid,proto3" json:"valid,omitempty"`
	Validations []AxiomValidation `protobuf:"bytes,2,rep,name=validations,proto3" json:"validations"`
}

// QueryServer is the server API for Query service
type QueryServer interface {
	Resolve(ctx context.Context, req *QueryResolveRequest) (*QueryResolveResponse, error)
	GetRecord(ctx context.Context, req *QueryGetRecordRequest) (*QueryGetRecordResponse, error)
	ListDomains(ctx context.Context, req *QueryListDomainsRequest) (*QueryListDomainsResponse, error)
	FHEStatus(ctx context.Context, req *QueryFHEStatusRequest) (*QueryFHEStatusResponse, error)
	MLDSAStatus(ctx context.Context, req *QueryMLDSAStatusRequest) (*QueryMLDSAStatusResponse, error)
	Params(ctx context.Context, req *QueryParamsRequest) (*QueryParamsResponse, error)
	ValidateAxioms(ctx context.Context, req *QueryValidateAxiomsRequest) (*QueryValidateAxiomsResponse, error)
}

// RegisterQueryServerImpl registers the QueryServer implementation with grpc
func RegisterQueryServerImpl(s grpc.ServiceRegistrar, srv QueryServer) {
	s.RegisterService(&_Query_serviceDesc, srv)
}

var _Query_serviceDesc = grpc.ServiceDesc{
	ServiceName: "aequitas.adns.v1.Query",
	HandlerType: (*QueryServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams:     []grpc.StreamDesc{},
	Metadata:    "aequitas/adns/v1/query.proto",
}
