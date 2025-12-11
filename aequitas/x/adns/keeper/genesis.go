package keeper

import (
	"fmt"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/CreoDAMO/REPAR/aequitas/x/adns/types"
)

// InitGenesis initializes the ADNS module genesis state
func (k *Keeper) InitGenesis(ctx sdk.Context, genState types.GenesisState) {
	k.Logger(ctx).Info("Initializing ADNS genesis state")

	// Seed sovereign root zone
	k.seedAlternateRoot(ctx)

	// Seed all 94+ genesis subdomains
	k.seedGenesisSubdomains(ctx)

	// Import any additional genesis records
	for _, record := range genState.Records {
		if err := k.Records.Set(ctx, record.Domain, record); err != nil {
			panic(fmt.Errorf("failed to set genesis record %s: %w", record.Domain, err))
		}
	}

	// Import genesis NFTs
	for _, nft := range genState.Nfts {
		if err := k.NFTs.Set(ctx, nft.Domain, nft); err != nil {
			panic(fmt.Errorf("failed to set genesis NFT %s: %w", nft.Domain, err))
		}
	}

	k.Logger(ctx).Info("ADNS genesis initialization complete",
		"records", len(genState.Records)+len(types.GenesisSubdomains)+5,
	)
}

// seedAlternateRoot seeds the sovereign alternate root zone
func (k *Keeper) seedAlternateRoot(ctx sdk.Context) {
	now := time.Now().Unix()
	founderAddr := "aequitas1founder"

	// Root zone record
	rootRecord := types.DNSRecord{
		Domain:     ".",
		RecordType: "NS",
		Values:     []string{"a.root.aequitas.", "b.root.aequitas.", "c.root.aequitas."},
		Ttl:        86400,
		Owner:      founderAddr,
		Frozen:     true,
		CreatedAt:  now,
		UpdatedAt:  now,
		Category:   "root",
		Genesis:    true,
	}
	if err := k.setGenesisRecord(ctx, rootRecord); err != nil {
		panic(fmt.Errorf("failed to seed root zone: %w", err))
	}

	// Seed sovereign TLDs
	tlds := []struct {
		domain string
		ns     []string
	}{
		{"aequitas.", []string{"ns1.aequitasprotocol.zone."}},
		{"repar.", []string{"ns1.aequitasprotocol.zone."}},
		{"sovereign.", []string{"ns1.aequitasprotocol.zone."}},
		{"nation.", []string{"ns1.aequitasprotocol.zone."}},
		{"justice.", []string{"ns1.aequitasprotocol.zone."}},
	}

	for _, tld := range tlds {
		record := types.DNSRecord{
			Domain:     tld.domain,
			RecordType: "NS",
			Values:     tld.ns,
			Ttl:        86400,
			Owner:      founderAddr,
			Frozen:     true,
			CreatedAt:  now,
			UpdatedAt:  now,
			Category:   "tld",
			Genesis:    true,
		}
		if err := k.setGenesisRecord(ctx, record); err != nil {
			panic(fmt.Errorf("failed to seed TLD %s: %w", tld.domain, err))
		}
	}
}

// seedGenesisSubdomains seeds all 94+ sovereign subdomains
func (k *Keeper) seedGenesisSubdomains(ctx sdk.Context) {
	now := time.Now().Unix()
	founderAddr := "aequitas1founder"

	// Subdomain categories for organization
	categories := map[string][]string{
		"core": {"rpc", "api", "explorer", "grpc", "rest", "faucet"},
		"monitoring": {"monitor", "metrics", "grafana", "prometheus", "status", "health", "logs", "traces", "debug"},
		"compute": {"ace", "avm", "apex"},
		"mobile": {"mobile", "android", "ios", "app", "desktop", "web3"},
		"validators": {"validator", "ns1", "ns2", "ns3", "ns4", "ns5"},
		"communication": {"mail", "smtp", "imap"},
		"identity": {"auth", "oauth", "identity", "kyc", "dna"},
		"justice": {"claims", "justice", "defendant", "evidence", "arbitration", "enforcement", "lien"},
		"treasury": {"treasury", "endowment", "founder", "subsidy", "distribution"},
		"defi": {"dex", "swap", "liquidity", "staking", "governance", "vote"},
		"nft": {"nft", "marketplace"},
		"storage": {"ipfs", "storage", "backup", "archive"},
		"content": {"docs", "wiki", "blog", "news", "media", "assets", "cdn"},
		"interchain": {"ibc", "bridge", "relayer", "interchain", "cosmos", "osmosis", "wallet"},
		"environments": {"testnet", "devnet", "staging", "production", "mainnet"},
		"admin": {"admin", "security", "audit", "compliance", "legal", "constitution"},
		"dns": {"root", "a.root", "b.root", "c.root", "resolver", "dns"},
	}

	for category, subdomains := range categories {
		for _, sub := range subdomains {
			domain := sub + ".aequitas"
			record := types.DNSRecord{
				Domain:     domain,
				RecordType: "A",
				Values:     []string{types.SovereignIP},
				Ttl:        300,
				Owner:      founderAddr,
				Frozen:     true,
				CreatedAt:  now,
				UpdatedAt:  now,
				Category:   category,
				Genesis:    true,
			}
			if err := k.setGenesisRecord(ctx, record); err != nil {
				k.Logger(ctx).Error("Failed to seed subdomain", "domain", domain, "error", err)
			}
		}
	}
}

// setGenesisRecord sets a genesis record with FHE and ML-DSA
func (k *Keeper) setGenesisRecord(ctx sdk.Context, record types.DNSRecord) error {
	// FHE encrypt
	if len(record.Values) > 0 {
		encrypted, err := k.FHEEncrypt(record.Values[0])
		if err != nil {
			return fmt.Errorf("FHE encrypt failed: %w", err)
		}
		record.FheEncryptedData = encrypted
		k.fheEncryptions++
	}

	// ML-DSA sign
	recordBytes, err := k.cdc.Marshal(&record)
	if err != nil {
		return fmt.Errorf("marshal failed: %w", err)
	}

	signature, err := k.MLDSASign(recordBytes)
	if err != nil {
		return fmt.Errorf("ML-DSA sign failed: %w", err)
	}
	record.Signature = signature
	k.mldsaSignatures++

	// Store
	if err := k.Records.Set(ctx, record.Domain, record); err != nil {
		return fmt.Errorf("store failed: %w", err)
	}

	// Mint NFT for genesis domains
	k.MintDomainNFT(ctx, record.Domain, record.Owner)

	return nil
}

// ExportGenesis exports the module state for genesis
func (k Keeper) ExportGenesis(ctx sdk.Context) *types.GenesisState {
	records, err := k.ListRecords(ctx, "", false)
	if err != nil {
		panic(fmt.Errorf("failed to export records: %w", err))
	}

	var nfts []types.DomainNFT
	err = k.NFTs.Walk(ctx, nil, func(key string, value types.DomainNFT) (bool, error) {
		nfts = append(nfts, value)
		return false, nil
	})
	if err != nil {
		panic(fmt.Errorf("failed to export NFTs: %w", err))
	}

	return &types.GenesisState{
		Records: records,
		Nfts:    nfts,
		Params: types.Params{
			DefaultTtl:         300,
			FheEnabled:         true,
			MldsaEnabled:       true,
			MldsaMode:          "Dilithium87",
			SovereignTlds:      types.SovereignTLDs,
			MaxAxiomViolations: 0,
		},
		FheStatus:   &types.FHEStatus{Version: "APEX-FHE v3.0", Active: true},
		MldsaStatus: &types.MLDSAStatus{Mode: "Dilithium87", Active: true},
	}
}
