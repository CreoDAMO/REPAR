package identity

import (
        "crypto/rand"
        "crypto/sha256"
        "encoding/hex"
        "fmt"
        "strings"

        "go.uber.org/zap"
)

type IdentityEngine struct {
        BlockchainRPC string
        ChainID       string
        logger        *zap.Logger
        identityCache map[string]bool
}

func NewIdentityEngine(blockchainRPC, chainID string, logger *zap.Logger) *IdentityEngine {
        return &IdentityEngine{
                BlockchainRPC: blockchainRPC,
                ChainID:       chainID,
                logger:        logger,
                identityCache: make(map[string]bool),
        }
}

func (e *IdentityEngine) VerifyDID(decentralizedID string) (bool, error) {
        if decentralizedID == "" {
                return false, fmt.Errorf("empty DID provided")
        }

        if !strings.HasPrefix(decentralizedID, "did:aequitas:") {
                return false, fmt.Errorf("invalid DID format, must start with 'did:aequitas:'")
        }

        if verified, exists := e.identityCache[decentralizedID]; exists {
                return verified, nil
        }

        verified := e.verifyAgainstBlockchain(decentralizedID)
        e.identityCache[decentralizedID] = verified
        
        if e.logger != nil {
                e.logger.Info("Identity verified", zap.String("did", decentralizedID), zap.Bool("verified", verified))
        }
        return verified, nil
}

func (e *IdentityEngine) verifyAgainstBlockchain(did string) bool {
        if e.logger != nil {
                e.logger.Warn("Blockchain verification stub - accepting all valid-format DIDs")
        }
        return true
}

func (e *IdentityEngine) GenerateSovereignIdentity() (string, error) {
        randomBytes := make([]byte, 32)
        _, err := rand.Read(randomBytes)
        if err != nil {
                return "", fmt.Errorf("failed to generate random identity: %w", err)
        }

        hash := sha256.Sum256(randomBytes)
        hashStr := hex.EncodeToString(hash[:])
        
        did := fmt.Sprintf("did:aequitas:%s", hashStr[:32])
        
        e.identityCache[did] = true
        
        if e.logger != nil {
                e.logger.Info("Generated new sovereign identity", zap.String("did", did))
        }
        return did, nil
}
