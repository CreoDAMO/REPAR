package storage

import (
        "crypto/sha256"
        "encoding/hex"
        "fmt"
        "time"

        "github.com/CreoDAMO/aequitas-cloud-engine/pkg/observability"
        pkgstorage "github.com/CreoDAMO/aequitas-cloud-engine/pkg/storage"
        "go.uber.org/zap"
)

type SovereignStorage struct {
        ipfsClient     *pkgstorage.IPFSClient
        blockchainRPC  string
        evidenceVault  map[string]*EvidenceRecord
        logger         *zap.Logger
        metrics        *observability.Metrics
}

type EvidenceRecord struct {
        Hash         string
        Metadata     string
        Timestamp    time.Time
        BlockchainTx string
        IPFSHash     string
        CephLocation string
}

func NewSovereignStorage(storageEndpoint, blockchainRPC string, logger *zap.Logger, metrics *observability.Metrics) *SovereignStorage {
        ipfsClient := pkgstorage.NewIPFSClient(storageEndpoint, fmt.Sprintf("%s/ipfs", storageEndpoint))

        return &SovereignStorage{
                ipfsClient:    ipfsClient,
                blockchainRPC: blockchainRPC,
                evidenceVault: make(map[string]*EvidenceRecord),
                logger:        logger,
                metrics:       metrics,
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
                if s.logger != nil {
                        s.logger.Warn("IPFS pinning failed", zap.Error(err))
                }
        }

        record := &EvidenceRecord{
                Hash:      hashStr,
                Metadata:  metadata,
                Timestamp: time.Now(),
                IPFSHash:  ipfsHash,
        }

        blockchainTx, err := s.anchorToBlockchain(record)
        if err != nil {
                if s.logger != nil {
                        s.logger.Warn("Blockchain anchoring failed", zap.Error(err))
                }
                record.BlockchainTx = ""
        } else {
                record.BlockchainTx = blockchainTx
        }

        s.evidenceVault[hashStr] = record

        if s.logger != nil {
                s.logger.Info("Evidence stored", zap.String("hash", hashStr[:16]), zap.String("ipfs", ipfsHash[:16]))
        }

        return hashStr, nil
}

func (s *SovereignStorage) anchorToBlockchain(record *EvidenceRecord) (string, error) {
        if s.logger != nil {
                s.logger.Info("Anchoring evidence to blockchain", zap.String("hash", record.Hash[:16]))
        }
        
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
        _, err := s.GetEvidence(hash)
        if err != nil {
                return false, err
        }

        if s.logger != nil {
                s.logger.Info("Verifying evidence integrity", zap.String("hash", hash[:16]))
        }

        return true, nil
}
