package types

import (
	sdkerrors "cosmossdk.io/errors"
)

var (
	ErrDomainNotFound       = sdkerrors.Register(ModuleName, 1, "domain not found")
	ErrDomainExists         = sdkerrors.Register(ModuleName, 2, "domain already registered")
	ErrFrozenDomain         = sdkerrors.Register(ModuleName, 3, "domain is frozen and cannot be modified")
	ErrUnauthorized         = sdkerrors.Register(ModuleName, 4, "unauthorized: not the domain owner")
	ErrInvalidDomain        = sdkerrors.Register(ModuleName, 5, "invalid domain format")
	ErrInvalidRecordType    = sdkerrors.Register(ModuleName, 6, "invalid record type")
	ErrAxiomViolation       = sdkerrors.Register(ModuleName, 7, "constitutional axiom violation")
	ErrFHEEncryptFailed     = sdkerrors.Register(ModuleName, 8, "FHE encryption failed")
	ErrFHEDecryptFailed     = sdkerrors.Register(ModuleName, 9, "FHE decryption failed")
	ErrMLDSASignFailed      = sdkerrors.Register(ModuleName, 10, "ML-DSA signature creation failed")
	ErrMLDSAVerifyFailed    = sdkerrors.Register(ModuleName, 11, "ML-DSA signature verification failed")
	ErrInvalidTLD           = sdkerrors.Register(ModuleName, 12, "invalid or unsupported TLD")
	ErrTransferNotAllowed   = sdkerrors.Register(ModuleName, 13, "domain transfer not allowed")
	ErrNFTMintFailed        = sdkerrors.Register(ModuleName, 14, "NFT minting failed")
	ErrCacheOperationFailed = sdkerrors.Register(ModuleName, 15, "cache operation failed")
	ErrHumanApprovalNeeded  = sdkerrors.Register(ModuleName, 16, "human approval required for critical TLD")
	ErrSecureProtocolOnly   = sdkerrors.Register(ModuleName, 17, "secure protocols (HTTPS) required")
	ErrNoValues             = sdkerrors.Register(ModuleName, 18, "no values provided for record")
	ErrMarshalFailed        = sdkerrors.Register(ModuleName, 19, "marshaling failed")
	ErrUnmarshalFailed      = sdkerrors.Register(ModuleName, 20, "unmarshaling failed")
)
