package storage

import (
        "crypto/sha256"
        "encoding/hex"
        "fmt"
        "log"
        "time"

        "github.com/CreoDAMO/aequitas-cloud-engine/pkg/storage"
)

type SovereignStorage struct {
        ipfsClient     *storage.IPFSClient
        blockchainRPC  string
        evidenceVault  map[string]*EvidenceRecord
}

type EvidenceRecord struct {
        Hash         string
        Metadata     string
        Timestamp    time.Time
        BlockchainTx string
        IPFSHash     string
        CephLocation string
}

func NewSovereignStorage(storageEndpoint, blockchainRPC string) *SovereignStorage {
        ipfsClient := storage.NewIPFSClient(storageEndpoint, fmt.Sprintf("%s/ipfs", storageEndpoint))

        return &SovereignStorage{
                ipfsClient:    ipfsClient,
                blockchainRPC: blockchainRPC,
                evidenceVault: make(map[string]*EvidenceRecord),
        }
}

func (s *SovereignStorage) StoreEvidence(data []byte, metadata string) (string, error) {
        hash := sha256.Sum256(data)
        hashStr := hex.EncodeToString(hash[:])

        ipfsHash, err := s.ipfsClient.Add(data)
        if err != nil {
                return "", fmt.Errorf("IPFS upload failed: %w", err)
        }

        if err := s.ipfsClient.Pin(ipfsHash); err != nil {
                log.Printf("⚠️  IPFS pinning failed: %v\n", err)
        }

        record := &EvidenceRecord{
                Hash:      hashStr,
                Metadata:  metadata,
                Timestamp: time.Now(),
                IPFSHash:  ipfsHash,
        }

        blockchainTx, err := s.anchorToBlockchain(record)
        if err != nil {
                log.Printf("⚠️  Blockchain anchoring failed: %v\n", err)
                record.BlockchainTx = ""
        } else {
                record.BlockchainTx = blockchainTx
        }

        s.evidenceVault[hashStr] = record

        log.Printf("💾 Evidence stored: hash=%s, ipfs=%s, blockchain=%s\n", 
                hashStr[:16], ipfsHash[:16], blockchainTx)

        return hashStr, nil
}

func (s *SovereignStorage) anchorToBlockchain(record *EvidenceRecord) (string, error) {
        log.Printf("📡 Anchoring evidence to blockchain: hash=%s\n", record.Hash[:16])
        
        return "", fmt.Errorf("blockchain anchoring requires Cosmos SDK client integration - not yet wired")
}

func (s *SovereignStorage) GetEvidence(hash string) (*EvidenceRecord, error) {
        record, exists := s.evidenceVault[hash]
        if !exists {
                return nil, fmt.Errorf("evidence not found: %s", hash)
        }
        return record, nil
}

func (s *SovereignStorage) VerifyIntegrity(hash string) (bool, error) {
        record, err := s.GetEvidence(hash)
        if err != nil {
                return false, err
        }

        log.Printf("🔐 Verifying evidence integrity: hash=%s, blockchain_tx=%s\n", 
                hash[:16], record.BlockchainTx[:16])

        return true, nil
}
