package identity

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"log"
	"strings"
)

type IdentityEngine struct {
	BlockchainRPC string
	identityCache map[string]bool
}

func NewIdentityEngine(blockchainRPC string) *IdentityEngine {
	return &IdentityEngine{
		BlockchainRPC: blockchainRPC,
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
	
	log.Printf("🔐 Identity verified: %s -> %v\n", decentralizedID, verified)
	return verified, nil
}

func (e *IdentityEngine) verifyAgainstBlockchain(did string) bool {
	log.Printf("⚠️  Blockchain verification stub - accepting all valid-format DIDs\n")
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
	
	log.Printf("🆔 Generated new sovereign identity: %s\n", did)
	return did, nil
}
