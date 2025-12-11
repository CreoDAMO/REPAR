package types

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc"
)

// MsgRegisterDomain registers a new domain
type MsgRegisterDomain struct {
	Creator    string   `protobuf:"bytes,1,opt,name=creator,proto3" json:"creator,omitempty"`
	Domain     string   `protobuf:"bytes,2,opt,name=domain,proto3" json:"domain,omitempty"`
	RecordType string   `protobuf:"bytes,3,opt,name=record_type,json=recordType,proto3" json:"record_type,omitempty"`
	Values     []string `protobuf:"bytes,4,rep,name=values,proto3" json:"values,omitempty"`
	Ttl        uint32   `protobuf:"varint,5,opt,name=ttl,proto3" json:"ttl,omitempty"`
	Category   string   `protobuf:"bytes,6,opt,name=category,proto3" json:"category,omitempty"`
}

func (m *MsgRegisterDomain) Reset()         { *m = MsgRegisterDomain{} }
func (m *MsgRegisterDomain) String() string { return m.Domain }
func (m *MsgRegisterDomain) ProtoMessage()  {}

func (m *MsgRegisterDomain) GetSigners() []sdk.AccAddress {
	addr, _ := sdk.AccAddressFromBech32(m.Creator)
	return []sdk.AccAddress{addr}
}

func (m *MsgRegisterDomain) ValidateBasic() error {
	if m.Creator == "" {
		return ErrUnauthorized.Wrap("creator required")
	}
	if m.Domain == "" {
		return ErrInvalidDomain.Wrap("domain required")
	}
	if len(m.Values) == 0 {
		return ErrNoValues
	}
	return nil
}

// MsgRegisterDomainResponse is the response for RegisterDomain
type MsgRegisterDomainResponse struct {
	Domain    string `protobuf:"bytes,1,opt,name=domain,proto3" json:"domain,omitempty"`
	TokenId   uint64 `protobuf:"varint,2,opt,name=token_id,json=tokenId,proto3" json:"token_id,omitempty"`
	Signature []byte `protobuf:"bytes,3,opt,name=signature,proto3" json:"signature,omitempty"`
}

func (m *MsgRegisterDomainResponse) Reset()         { *m = MsgRegisterDomainResponse{} }
func (m *MsgRegisterDomainResponse) String() string { return m.Domain }
func (m *MsgRegisterDomainResponse) ProtoMessage()  {}

// MsgUpdateRecord updates an existing domain record
type MsgUpdateRecord struct {
	Creator string   `protobuf:"bytes,1,opt,name=creator,proto3" json:"creator,omitempty"`
	Domain  string   `protobuf:"bytes,2,opt,name=domain,proto3" json:"domain,omitempty"`
	Values  []string `protobuf:"bytes,3,rep,name=values,proto3" json:"values,omitempty"`
	Ttl     uint32   `protobuf:"varint,4,opt,name=ttl,proto3" json:"ttl,omitempty"`
}

func (m *MsgUpdateRecord) Reset()         { *m = MsgUpdateRecord{} }
func (m *MsgUpdateRecord) String() string { return m.Domain }
func (m *MsgUpdateRecord) ProtoMessage()  {}

func (m *MsgUpdateRecord) GetSigners() []sdk.AccAddress {
	addr, _ := sdk.AccAddressFromBech32(m.Creator)
	return []sdk.AccAddress{addr}
}

func (m *MsgUpdateRecord) ValidateBasic() error {
	if m.Creator == "" {
		return ErrUnauthorized.Wrap("creator required")
	}
	if m.Domain == "" {
		return ErrInvalidDomain.Wrap("domain required")
	}
	return nil
}

// MsgUpdateRecordResponse is the response for UpdateRecord
type MsgUpdateRecordResponse struct {
	NewSignature []byte `protobuf:"bytes,1,opt,name=new_signature,json=newSignature,proto3" json:"new_signature,omitempty"`
}

func (m *MsgUpdateRecordResponse) Reset()         { *m = MsgUpdateRecordResponse{} }
func (m *MsgUpdateRecordResponse) String() string { return "MsgUpdateRecordResponse" }
func (m *MsgUpdateRecordResponse) ProtoMessage()  {}

// MsgTransferDomain transfers domain ownership
type MsgTransferDomain struct {
	Creator  string `protobuf:"bytes,1,opt,name=creator,proto3" json:"creator,omitempty"`
	Domain   string `protobuf:"bytes,2,opt,name=domain,proto3" json:"domain,omitempty"`
	NewOwner string `protobuf:"bytes,3,opt,name=new_owner,json=newOwner,proto3" json:"new_owner,omitempty"`
}

func (m *MsgTransferDomain) Reset()         { *m = MsgTransferDomain{} }
func (m *MsgTransferDomain) String() string { return m.Domain }
func (m *MsgTransferDomain) ProtoMessage()  {}

func (m *MsgTransferDomain) GetSigners() []sdk.AccAddress {
	addr, _ := sdk.AccAddressFromBech32(m.Creator)
	return []sdk.AccAddress{addr}
}

func (m *MsgTransferDomain) ValidateBasic() error {
	if m.Creator == "" {
		return ErrUnauthorized.Wrap("creator required")
	}
	if m.Domain == "" {
		return ErrInvalidDomain.Wrap("domain required")
	}
	if m.NewOwner == "" {
		return ErrUnauthorized.Wrap("new owner required")
	}
	return nil
}

// MsgTransferDomainResponse is the response for TransferDomain
type MsgTransferDomainResponse struct {
	NewTokenId uint64 `protobuf:"varint,1,opt,name=new_token_id,json=newTokenId,proto3" json:"new_token_id,omitempty"`
}

func (m *MsgTransferDomainResponse) Reset()         { *m = MsgTransferDomainResponse{} }
func (m *MsgTransferDomainResponse) String() string { return "MsgTransferDomainResponse" }
func (m *MsgTransferDomainResponse) ProtoMessage()  {}

// MsgFreezeDomain freezes a domain for constitutional protection
type MsgFreezeDomain struct {
	Creator        string `protobuf:"bytes,1,opt,name=creator,proto3" json:"creator,omitempty"`
	Domain         string `protobuf:"bytes,2,opt,name=domain,proto3" json:"domain,omitempty"`
	Reason         string `protobuf:"bytes,3,opt,name=reason,proto3" json:"reason,omitempty"`
	AxiomReference uint32 `protobuf:"varint,4,opt,name=axiom_reference,json=axiomReference,proto3" json:"axiom_reference,omitempty"`
}

func (m *MsgFreezeDomain) Reset()         { *m = MsgFreezeDomain{} }
func (m *MsgFreezeDomain) String() string { return m.Domain }
func (m *MsgFreezeDomain) ProtoMessage()  {}

func (m *MsgFreezeDomain) GetSigners() []sdk.AccAddress {
	addr, _ := sdk.AccAddressFromBech32(m.Creator)
	return []sdk.AccAddress{addr}
}

func (m *MsgFreezeDomain) ValidateBasic() error {
	if m.Creator == "" {
		return ErrUnauthorized.Wrap("creator required")
	}
	if m.Domain == "" {
		return ErrInvalidDomain.Wrap("domain required")
	}
	return nil
}

// MsgFreezeDomainResponse is the response for FreezeDomain
type MsgFreezeDomainResponse struct {
	Frozen bool `protobuf:"varint,1,opt,name=frozen,proto3" json:"frozen,omitempty"`
}

func (m *MsgFreezeDomainResponse) Reset()         { *m = MsgFreezeDomainResponse{} }
func (m *MsgFreezeDomainResponse) String() string { return "MsgFreezeDomainResponse" }
func (m *MsgFreezeDomainResponse) ProtoMessage()  {}

// MsgServer is the server API for Msg service
type MsgServer interface {
	RegisterDomain(ctx context.Context, msg *MsgRegisterDomain) (*MsgRegisterDomainResponse, error)
	UpdateRecord(ctx context.Context, msg *MsgUpdateRecord) (*MsgUpdateRecordResponse, error)
	TransferDomain(ctx context.Context, msg *MsgTransferDomain) (*MsgTransferDomainResponse, error)
	FreezeDomain(ctx context.Context, msg *MsgFreezeDomain) (*MsgFreezeDomainResponse, error)
}

// RegisterMsgServerImpl registers the MsgServer implementation with grpc
func RegisterMsgServerImpl(s grpc.ServiceRegistrar, srv MsgServer) {
	s.RegisterService(&_Msg_serviceDesc, srv)
}

var _Msg_serviceDesc = grpc.ServiceDesc{
	ServiceName: "aequitas.adns.v1.Msg",
	HandlerType: (*MsgServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams:     []grpc.StreamDesc{},
	Metadata:    "aequitas/adns/v1/tx.proto",
}
