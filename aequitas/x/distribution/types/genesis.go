package types

import (
        "cosmossdk.io/math"
)

// GenesisState defines the distribution module's genesis state
type GenesisState struct {
        Descendants   []Descendant   `json:"descendants"`
        Distributions []Distribution `json:"distributions"`
}

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
        return &GenesisState{
                Descendants:   []Descendant{},
                Distributions: []Distribution{},
        }
}

// Validate performs basic genesis state validation
func (gs GenesisState) Validate() error {
        return nil
}

// Descendant represents a verified descendant registration
type Descendant struct {
        Id            string   `json:"id"`
        Address       string   `json:"address"`
        LineageCid    string   `json:"lineage_cid"`
        RegisteredAt  int64    `json:"registered_at"`
        Verified      bool     `json:"verified"`
        TotalReceived math.Int `json:"total_received"`
}

// Distribution represents a reparations distribution event
type Distribution struct {
        Id               string           `json:"id"`
        Type             DistributionType `json:"type"`
        RecipientAddress string           `json:"recipient_address"`
        Amount           math.Int         `json:"amount"`
        Timestamp        int64            `json:"timestamp"`
}

// DistributionType defines the type of distribution
type DistributionType int32

const (
        DistributionType_DISTRIBUTION_TYPE_UNSPECIFIED DistributionType = 0
        DistributionType_DISTRIBUTION_TYPE_DESCENDANT  DistributionType = 1
        DistributionType_DISTRIBUTION_TYPE_COMMUNITY   DistributionType = 2
        DistributionType_DISTRIBUTION_TYPE_TREASURY    DistributionType = 3
)

func (DistributionType) String() string {
        return "DistributionType"
}
