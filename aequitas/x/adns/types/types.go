package types

// DNSRecord represents a blockchain-backed DNS entry with post-quantum security
type DNSRecord struct {
	Domain           string   `protobuf:"bytes,1,opt,name=domain,proto3" json:"domain,omitempty"`
	RecordType       string   `protobuf:"bytes,2,opt,name=record_type,json=recordType,proto3" json:"record_type,omitempty"`
	Values           []string `protobuf:"bytes,3,rep,name=values,proto3" json:"values,omitempty"`
	Ttl              uint32   `protobuf:"varint,4,opt,name=ttl,proto3" json:"ttl,omitempty"`
	Owner            string   `protobuf:"bytes,5,opt,name=owner,proto3" json:"owner,omitempty"`
	Frozen           bool     `protobuf:"varint,6,opt,name=frozen,proto3" json:"frozen,omitempty"`
	Signature        []byte   `protobuf:"bytes,7,opt,name=signature,proto3" json:"signature,omitempty"`
	CreatedAt        int64    `protobuf:"varint,8,opt,name=created_at,json=createdAt,proto3" json:"created_at,omitempty"`
	UpdatedAt        int64    `protobuf:"varint,9,opt,name=updated_at,json=updatedAt,proto3" json:"updated_at,omitempty"`
	FheEncryptedData []byte   `protobuf:"bytes,10,opt,name=fhe_encrypted_data,json=fheEncryptedData,proto3" json:"fhe_encrypted_data,omitempty"`
	Category         string   `protobuf:"bytes,11,opt,name=category,proto3" json:"category,omitempty"`
	Genesis          bool     `protobuf:"varint,12,opt,name=genesis,proto3" json:"genesis,omitempty"`
}

func (m *DNSRecord) Reset()         { *m = DNSRecord{} }
func (m *DNSRecord) String() string { return m.Domain }
func (m *DNSRecord) ProtoMessage()  {}

// DomainNFT represents NFT-based domain ownership
type DomainNFT struct {
	Domain       string `protobuf:"bytes,1,opt,name=domain,proto3" json:"domain,omitempty"`
	Owner        string `protobuf:"bytes,2,opt,name=owner,proto3" json:"owner,omitempty"`
	TokenUri     string `protobuf:"bytes,3,opt,name=token_uri,json=tokenUri,proto3" json:"token_uri,omitempty"`
	Transferable bool   `protobuf:"varint,4,opt,name=transferable,proto3" json:"transferable,omitempty"`
	MintHeight   uint64 `protobuf:"varint,5,opt,name=mint_height,json=mintHeight,proto3" json:"mint_height,omitempty"`
	TokenId      uint64 `protobuf:"varint,6,opt,name=token_id,json=tokenId,proto3" json:"token_id,omitempty"`
}

func (m *DomainNFT) Reset()         { *m = DomainNFT{} }
func (m *DomainNFT) String() string { return m.Domain }
func (m *DomainNFT) ProtoMessage()  {}

// AxiomValidation tracks constitutional axiom compliance
type AxiomValidation struct {
	AxiomNumber uint32 `protobuf:"varint,1,opt,name=axiom_number,json=axiomNumber,proto3" json:"axiom_number,omitempty"`
	AxiomName   string `protobuf:"bytes,2,opt,name=axiom_name,json=axiomName,proto3" json:"axiom_name,omitempty"`
	Passed      bool   `protobuf:"varint,3,opt,name=passed,proto3" json:"passed,omitempty"`
	Reason      string `protobuf:"bytes,4,opt,name=reason,proto3" json:"reason,omitempty"`
}

func (m *AxiomValidation) Reset()         { *m = AxiomValidation{} }
func (m *AxiomValidation) String() string { return m.AxiomName }
func (m *AxiomValidation) ProtoMessage()  {}

// FHEStatus tracks Fully Homomorphic Encryption status
type FHEStatus struct {
	Version          string `protobuf:"bytes,1,opt,name=version,proto3" json:"version,omitempty"`
	Active           bool   `protobuf:"varint,2,opt,name=active,proto3" json:"active,omitempty"`
	Algorithm        string `protobuf:"bytes,3,opt,name=algorithm,proto3" json:"algorithm,omitempty"`
	EncryptedRecords uint64 `protobuf:"varint,4,opt,name=encrypted_records,json=encryptedRecords,proto3" json:"encrypted_records,omitempty"`
	DecryptionCount  uint64 `protobuf:"varint,5,opt,name=decryption_count,json=decryptionCount,proto3" json:"decryption_count,omitempty"`
}

func (m *FHEStatus) Reset()         { *m = FHEStatus{} }
func (m *FHEStatus) String() string { return m.Version }
func (m *FHEStatus) ProtoMessage()  {}

// MLDSAStatus tracks post-quantum signature status
type MLDSAStatus struct {
	Mode                string `protobuf:"bytes,1,opt,name=mode,proto3" json:"mode,omitempty"`
	Active              bool   `protobuf:"varint,2,opt,name=active,proto3" json:"active,omitempty"`
	SignaturesCreated   uint64 `protobuf:"varint,3,opt,name=signatures_created,json=signaturesCreated,proto3" json:"signatures_created,omitempty"`
	SignaturesVerified  uint64 `protobuf:"varint,4,opt,name=signatures_verified,json=signaturesVerified,proto3" json:"signatures_verified,omitempty"`
}

func (m *MLDSAStatus) Reset()         { *m = MLDSAStatus{} }
func (m *MLDSAStatus) String() string { return m.Mode }
func (m *MLDSAStatus) ProtoMessage()  {}

// Params defines the module parameters
type Params struct {
	DefaultTtl         uint32   `protobuf:"varint,1,opt,name=default_ttl,json=defaultTtl,proto3" json:"default_ttl,omitempty"`
	FheEnabled         bool     `protobuf:"varint,2,opt,name=fhe_enabled,json=fheEnabled,proto3" json:"fhe_enabled,omitempty"`
	MldsaEnabled       bool     `protobuf:"varint,3,opt,name=mldsa_enabled,json=mldsaEnabled,proto3" json:"mldsa_enabled,omitempty"`
	MldsaMode          string   `protobuf:"bytes,4,opt,name=mldsa_mode,json=mldsaMode,proto3" json:"mldsa_mode,omitempty"`
	SovereignTlds      []string `protobuf:"bytes,5,rep,name=sovereign_tlds,json=sovereignTlds,proto3" json:"sovereign_tlds,omitempty"`
	MaxAxiomViolations uint32   `protobuf:"varint,6,opt,name=max_axiom_violations,json=maxAxiomViolations,proto3" json:"max_axiom_violations,omitempty"`
}

func (m *Params) Reset()         { *m = Params{} }
func (m *Params) String() string { return m.MldsaMode }
func (m *Params) ProtoMessage()  {}

// GenesisState defines the ADNS module's genesis state
type GenesisState struct {
	Records     []DNSRecord  `protobuf:"bytes,1,rep,name=records,proto3" json:"records"`
	Nfts        []DomainNFT  `protobuf:"bytes,2,rep,name=nfts,proto3" json:"nfts"`
	Params      Params       `protobuf:"bytes,3,opt,name=params,proto3" json:"params"`
	FheStatus   *FHEStatus   `protobuf:"bytes,4,opt,name=fhe_status,json=fheStatus,proto3" json:"fhe_status,omitempty"`
	MldsaStatus *MLDSAStatus `protobuf:"bytes,5,opt,name=mldsa_status,json=mldsaStatus,proto3" json:"mldsa_status,omitempty"`
}

func (m *GenesisState) Reset()         { *m = GenesisState{} }
func (m *GenesisState) String() string { return "GenesisState" }
func (m *GenesisState) ProtoMessage()  {}

// ConditionalDNS for smart contract-based DNS resolution
type ConditionalDNS struct {
	Domain        string `protobuf:"bytes,1,opt,name=domain,proto3" json:"domain,omitempty"`
	WasmContract  string `protobuf:"bytes,2,opt,name=wasm_contract,json=wasmContract,proto3" json:"wasm_contract,omitempty"`
	ContractState []byte `protobuf:"bytes,3,opt,name=contract_state,json=contractState,proto3" json:"contract_state,omitempty"`
}

func (m *ConditionalDNS) Reset()         { *m = ConditionalDNS{} }
func (m *ConditionalDNS) String() string { return m.Domain }
func (m *ConditionalDNS) ProtoMessage()  {}
