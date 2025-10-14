
package types

import sdk "github.com/cosmos/cosmos-sdk/types"

// GenesisState defines the initial state for threat defense
type GenesisState struct {
	// Initial liability records for all 200+ defendants
	LiabilityRecords []LiabilityRecord `json:"liability_records"`
	
	// Controlled vulnerabilities (10% chaos system)
	ControlledVulns []ControlledVulnerability `json:"controlled_vulns"`
	
	// Nightmare tripwires (3% activation system)
	NightmareTriggers []NightmareTrigger `json:"nightmare_triggers"`
	
	// Threat oracle configuration
	OracleConfig OracleConfiguration `json:"oracle_config"`
}

// DefaultGenesis returns default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		LiabilityRecords: GetInitialLiabilityRecords(),
		ControlledVulns: GetControlledVulnerabilities(),
		NightmareTriggers: GetNightmareTriggers(),
		OracleConfig: DefaultOracleConfig(),
	}
}

// GetInitialLiabilityRecords - Load 200+ defendants with debt amounts
func GetInitialLiabilityRecords() []LiabilityRecord {
	records := []LiabilityRecord{
		// European Financial Entities
		{
			Entity:        "barclays",
			Type:          "FINANCIAL",
			TotalDebt:     sdk.NewInt(10_300_000_000), // £10.3B from £83k 1833 compensation
			AmountPaid:    sdk.NewInt(0),
			RemainingDebt: sdk.NewInt(10_300_000_000),
		},
		{
			Entity:        "lloyds_of_london",
			Type:          "FINANCIAL",
			TotalDebt:     sdk.NewInt(15_000_000_000), // Insurance profits
			AmountPaid:    sdk.NewInt(0),
			RemainingDebt: sdk.NewInt(15_000_000_000),
		},
		
		// American Financial Entities
		{
			Entity:        "jpmorgan_chase",
			Type:          "FINANCIAL",
			TotalDebt:     sdk.NewInt(109_000_000), // $3.1M 1860 → $109M today
			AmountPaid:    sdk.NewInt(0),
			RemainingDebt: sdk.NewInt(109_000_000),
		},
		
		// African Restorative Entities
		{
			Entity:        "benin_republic", // Dahomey successor
			Type:          "RESTORATIVE",
			TotalDebt:     sdk.NewInt(1_000_000_000), // $1B historical value
			AmountPaid:    sdk.NewInt(0),
			RemainingDebt: sdk.NewInt(1_000_000_000),
		},
		{
			Entity:        "ghana", // Asante successor
			Type:          "RESTORATIVE",
			TotalDebt:     sdk.NewInt(800_000_000),
			AmountPaid:    sdk.NewInt(0),
			RemainingDebt: sdk.NewInt(800_000_000),
		},
		
		// Add all 200+ defendants here...
	}
	
	return records
}

// GetControlledVulnerabilities - The 10% chaos defense system
func GetControlledVulnerabilities() []ControlledVulnerability {
	return []ControlledVulnerability{
		{
			ID:       "data_ambiguity_trap",
			Type:     "data_ambiguity",
			Severity: "LOW",
			BaitData: "£68.7B UK estimate with intentional rounding",
			Active:   true,
		},
		{
			ID:       "process_delay_trap",
			Type:     "process_delay",
			Severity: "MEDIUM",
			BaitData: "24-hour NFT minting delay",
			Active:   true,
		},
		{
			ID:       "governance_vote_trap",
			Type:     "governance_gap",
			Severity: "MEDIUM",
			BaitData: "Open vote on compounding rate adjustment",
			Active:   true,
		},
	}
}

// GetNightmareTriggers - The 3% activation points
func GetNightmareTriggers() []NightmareTrigger {
	return []NightmareTrigger{
		{
			VulnID:    "data_ambiguity_trap",
			Threshold: "1_challenge", // Single challenge triggers nightmare
			Action:    "financial_devastation",
		},
		{
			VulnID:    "process_delay_trap",
			Threshold: "interference_detected",
			Action:    "legal_onslaught",
		},
		{
			VulnID:    "governance_vote_trap",
			Threshold: "malicious_proposal",
			Action:    "psychological_collapse",
		},
	}
}

type LiabilityRecord struct {
	Entity        string  `json:"entity"`
	Type          string  `json:"type"` 
	TotalDebt     sdk.Int `json:"total_debt"`
	AmountPaid    sdk.Int `json:"amount_paid"`
	RemainingDebt sdk.Int `json:"remaining_debt"`
}

type ControlledVulnerability struct {
	ID       string      `json:"id"`
	Type     string      `json:"type"`
	Severity string      `json:"severity"`
	BaitData interface{} `json:"bait_data"`
	Active   bool        `json:"active"`
}

type NightmareTrigger struct {
	VulnID    string `json:"vuln_id"`
	Threshold string `json:"threshold"`
	Action    string `json:"action"`
}

type OracleConfiguration struct {
	ScanInterval  int64    `json:"scan_interval"` // In blocks
	DataFeeds     []string `json:"data_feeds"`
	AIEnabled     bool     `json:"ai_enabled"`
	LegalStandard string   `json:"legal_standard"` // "FRE_901"
}

func DefaultOracleConfig() OracleConfiguration {
	return OracleConfiguration{
		ScanInterval:  100, // Every 100 blocks (~10 minutes)
		DataFeeds:     []string{"x_api", "email_monitor", "chain_analytics"},
		AIEnabled:     true,
		LegalStandard: "FRE_901",
	}
}
