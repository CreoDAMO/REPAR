package types

const (
	ModuleName = "adns"
	StoreKey   = ModuleName
	RouterKey  = ModuleName

	// Event types
	EventTypeDNSUpdate     = "dns_update"
	EventTypeDNSRegister   = "dns_register"
	EventTypeDNSTransfer   = "dns_transfer"
	EventTypeDNSFreeze     = "dns_freeze"
	EventTypeFHEEncrypt    = "fhe_encrypt"
	EventTypeMLDSASign     = "mldsa_sign"
	EventTypeAxiomValidate = "axiom_validate"

	// Attribute keys
	AttributeKeyDomain     = "domain"
	AttributeKeyRecordType = "record_type"
	AttributeKeyOwner      = "owner"
	AttributeKeyValues     = "values"
	AttributeKeyFrozen     = "frozen"
	AttributeKeyAxiom      = "axiom"
)

// DNSRecordKey returns the store key for a DNS record
func DNSRecordKey(domain string) []byte {
	return append([]byte("dns/"), []byte(domain)...)
}

// DomainNFTKey returns the store key for a domain NFT
func DomainNFTKey(domain string) []byte {
	return append([]byte("nft/"), []byte(domain)...)
}

// Sovereign TLDs that are constitutionally protected
var SovereignTLDs = []string{
	".aequitas",
	".repar",
	".sovereign",
	".nation",
	".justice",
}

// Genesis domains for sovereign infrastructure
var GenesisSubdomains = []string{
	"rpc", "api", "explorer", "grpc", "rest", "faucet", "monitor", "metrics",
	"grafana", "prometheus", "ace", "avm", "apex", "mobile", "validator",
	"ns1", "ns2", "ns3", "ns4", "ns5", "mail", "smtp", "imap",
	"auth", "oauth", "identity", "kyc", "dna", "claims", "justice",
	"defendant", "evidence", "arbitration", "enforcement", "lien",
	"treasury", "endowment", "founder", "subsidy", "distribution",
	"dex", "swap", "liquidity", "staking", "governance", "vote",
	"nft", "marketplace", "ipfs", "storage", "backup", "archive",
	"docs", "wiki", "blog", "news", "media", "assets", "cdn",
	"ibc", "bridge", "relayer", "interchain", "cosmos", "osmosis",
	"wallet", "app", "desktop", "android", "ios", "web3",
	"testnet", "devnet", "staging", "production", "mainnet",
	"status", "health", "logs", "traces", "debug", "admin",
	"security", "audit", "compliance", "legal", "constitution",
	"root", "a.root", "b.root", "c.root", "resolver", "dns",
}

// Sovereign IP for all genesis records
const SovereignIP = "135.232.208.145"
