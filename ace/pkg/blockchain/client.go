package blockchain

import (
	"context"
	"encoding/hex"
	"fmt"

	"github.com/cometbft/cometbft/rpc/client/http"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	authsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"
	authtx "github.com/cosmos/cosmos-sdk/x/auth/tx"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type CosmosClient struct {
	rpcEndpoint    string
	grpcEndpoint   string
	rpcClient      *http.HTTP
	grpcConn       *grpc.ClientConn
	chainID        string
	privKey        *secp256k1.PrivKey
	txConfig       client.TxConfig
	encodingConfig EncodingConfig
	clientCtx      client.Context
	logger         *zap.Logger
}

type EncodingConfig struct {
	InterfaceRegistry types.InterfaceRegistry
	Codec             codec.Codec
	TxConfig          client.TxConfig
	Amino             *codec.LegacyAmino
}

func MakeEncodingConfig() EncodingConfig {
	interfaceRegistry := types.NewInterfaceRegistry()
	codec := codec.NewProtoCodec(interfaceRegistry)
	txConfig := authtx.NewTxConfig(codec, authtx.DefaultSignModes)

	return EncodingConfig{
		InterfaceRegistry: interfaceRegistry,
		Codec:             codec,
		TxConfig:          txConfig,
		Amino:             codec.NewLegacyAmino(),
	}
}

func NewCosmosClient(rpcEndpoint, grpcEndpoint, chainID string, logger *zap.Logger) (*CosmosClient, error) {
	rpc, err := http.New(rpcEndpoint, "/websocket")
	if err != nil {
		return nil, fmt.Errorf("failed to create RPC client: %w", err)
	}

	grpcConn, err := grpc.Dial(
		grpcEndpoint,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create gRPC connection: %w", err)
	}

	encodingConfig := MakeEncodingConfig()

	if logger == nil {
		logger, _ = zap.NewProduction()
	}

	clientCtx := client.Context{}.
		WithClient(rpc).
		WithGRPCClient(grpcConn).
		WithChainID(chainID).
		WithCodec(encodingConfig.Codec).
		WithInterfaceRegistry(encodingConfig.InterfaceRegistry).
		WithTxConfig(encodingConfig.TxConfig).
		WithBroadcastMode("sync")

	return &CosmosClient{
		rpcEndpoint:    rpcEndpoint,
		grpcEndpoint:   grpcEndpoint,
		rpcClient:      rpc,
		grpcConn:       grpcConn,
		chainID:        chainID,
		txConfig:       encodingConfig.TxConfig,
		encodingConfig: encodingConfig,
		clientCtx:      clientCtx,
		logger:         logger,
	}, nil
}

func (c *CosmosClient) Close() error {
	if c.grpcConn != nil {
		return c.grpcConn.Close()
	}
	return nil
}

func (c *CosmosClient) SetPrivateKey(privKey *secp256k1.PrivKey) {
	c.privKey = privKey
	c.clientCtx = c.clientCtx.WithFromAddress(sdk.AccAddress(privKey.PubKey().Address()))
}

func (c *CosmosClient) GetAddress() string {
	if c.privKey == nil {
		return ""
	}
	return sdk.AccAddress(c.privKey.PubKey().Address()).String()
}

func (c *CosmosClient) QueryAccount(address string) (uint64, uint64, error) {
	addr, err := sdk.AccAddressFromBech32(address)
	if err != nil {
		return 0, 0, fmt.Errorf("invalid address: %w", err)
	}

	accountRetriever := authtx.NewAccountRetriever(c.clientCtx)
	account, err := accountRetriever.GetAccount(c.clientCtx, addr)
	if err != nil {
		return 0, 0, fmt.Errorf("failed to query account: %w", err)
	}

	return account.GetAccountNumber(), account.GetSequence(), nil
}

func (c *CosmosClient) VerifyIdentity(did string) (bool, error) {
	_, _, err := c.QueryAccount(did)
	if err != nil {
		c.logger.Debug("Identity verification failed", zap.String("did", did), zap.Error(err))
		return false, nil
	}

	c.logger.Info("Identity verified successfully", zap.String("did", did))
	return true, nil
}

func (c *CosmosClient) SubmitTransaction(msgs []sdk.Msg, memo string, gasLimit uint64, feeAmount sdk.Coins) (string, error) {
	if c.privKey == nil {
		return "", fmt.Errorf("private key not set")
	}

	accountNum, sequence, err := c.QueryAccount(c.GetAddress())
	if err != nil {
		return "", fmt.Errorf("failed to get account: %w", err)
	}

	txf := tx.Factory{}.
		WithChainID(c.chainID).
		WithKeybase(nil).
		WithGas(gasLimit).
		WithFees(feeAmount.String()).
		WithMemo(memo).
		WithAccountNumber(accountNum).
		WithSequence(sequence).
		WithTxConfig(c.txConfig).
		WithSignMode(signing.SignMode_SIGN_MODE_DIRECT)

	txBuilder := c.txConfig.NewTxBuilder()
	if err := txBuilder.SetMsgs(msgs...); err != nil {
		return "", fmt.Errorf("failed to set messages: %w", err)
	}

	txBuilder.SetMemo(memo)
	txBuilder.SetGasLimit(gasLimit)
	txBuilder.SetFeeAmount(feeAmount)

	sigV2 := signing.SignatureV2{
		PubKey: c.privKey.PubKey(),
		Data: &signing.SingleSignatureData{
			SignMode:  signing.SignMode_SIGN_MODE_DIRECT,
			Signature: nil,
		},
		Sequence: sequence,
	}

	if err := txBuilder.SetSignatures(sigV2); err != nil {
		return "", fmt.Errorf("failed to set signatures: %w", err)
	}

	signerData := authsigning.SignerData{
		ChainID:       c.chainID,
		AccountNumber: accountNum,
		Sequence:      sequence,
	}

	sigV2, err = tx.SignWithPrivKey(
		context.Background(),
		signing.SignMode_SIGN_MODE_DIRECT,
		signerData,
		txBuilder,
		c.privKey,
		c.txConfig,
		sequence,
	)
	if err != nil {
		return "", fmt.Errorf("failed to sign transaction: %w", err)
	}

	if err := txBuilder.SetSignatures(sigV2); err != nil {
		return "", fmt.Errorf("failed to set signed signature: %w", err)
	}

	txBytes, err := c.txConfig.TxEncoder()(txBuilder.GetTx())
	if err != nil {
		return "", fmt.Errorf("failed to encode transaction: %w", err)
	}

	result, err := c.rpcClient.BroadcastTxSync(context.Background(), txBytes)
	if err != nil {
		return "", fmt.Errorf("failed to broadcast transaction: %w", err)
	}

	if result.Code != 0 {
		return "", fmt.Errorf("transaction failed with code %d: %s", result.Code, result.Log)
	}

	txHash := hex.EncodeToString(result.Hash)
	c.logger.Info("Transaction submitted successfully",
		zap.String("hash", txHash),
		zap.Uint64("gas", gasLimit),
		zap.String("fees", feeAmount.String()),
	)

	return txHash, nil
}

func (c *CosmosClient) SubmitTransactionSimple(msgs []sdk.Msg) (string, error) {
	defaultGas := uint64(200000)
	defaultFees := sdk.NewCoins(sdk.NewInt64Coin("repar", 1000))

	return c.SubmitTransaction(msgs, "ACE: Automated transaction", defaultGas, defaultFees)
}

func (c *CosmosClient) RecordAllocation(userDID string, nodeID string, workloadType string) (string, error) {
	msg := &MsgRecordAllocation{
		UserDID:      userDID,
		NodeID:       nodeID,
		WorkloadType: workloadType,
		Timestamp:    sdk.NewInt(sdk.Now().Unix()),
	}

	txHash, err := c.SubmitTransactionSimple([]sdk.Msg{msg})
	if err != nil {
		c.logger.Error("Failed to record allocation on-chain",
			zap.String("user", userDID),
			zap.String("node", nodeID),
			zap.Error(err),
		)
		return "", err
	}

	c.logger.Info("Allocation recorded on-chain",
		zap.String("user", userDID),
		zap.String("node", nodeID),
		zap.String("tx_hash", txHash),
	)

	return txHash, nil
}

func (c *CosmosClient) StoreEvidenceMetadata(hash string, ipfsHash string, metadata map[string]string) (string, error) {
	msg := &MsgStoreEvidence{
		Submitter: c.GetAddress(),
		Hash:      hash,
		IpfsHash:  ipfsHash,
		Metadata:  metadata,
	}

	txHash, err := c.SubmitTransactionSimple([]sdk.Msg{msg})
	if err != nil {
		c.logger.Error("Failed to store evidence metadata on-chain",
			zap.String("hash", hash),
			zap.Error(err),
		)
		return "", err
	}

	c.logger.Info("Evidence metadata stored on-chain",
		zap.String("evidence_hash", hash),
		zap.String("ipfs_hash", ipfsHash),
		zap.String("tx_hash", txHash),
	)

	return txHash, nil
}

func (c *CosmosClient) SubscribeToEvents(query string, handler func(interface{})) error {
	ctx := context.Background()

	eventCh, err := c.rpcClient.Subscribe(ctx, "ace-subscriber", query)
	if err != nil {
		return fmt.Errorf("failed to subscribe to events: %w", err)
	}

	go func() {
		for event := range eventCh {
			handler(event)
		}
	}()

	c.logger.Info("Subscribed to blockchain events", zap.String("query", query))
	return nil
}

func (c *CosmosClient) GetLatestBlock() (int64, error) {
	status, err := c.rpcClient.Status(context.Background())
	if err != nil {
		return 0, fmt.Errorf("failed to get status: %w", err)
	}

	return status.SyncInfo.LatestBlockHeight, nil
}

func (c *CosmosClient) GetChainID() string {
	return c.chainID
}

type MsgRecordAllocation struct {
	UserDID      string  `json:"user_did"`
	NodeID       string  `json:"node_id"`
	WorkloadType string  `json:"workload_type"`
	Timestamp    sdk.Int `json:"timestamp"`
}

func (msg *MsgRecordAllocation) Route() string { return "infrastructure" }
func (msg *MsgRecordAllocation) Type() string  { return "record_allocation" }
func (msg *MsgRecordAllocation) ValidateBasic() error {
	if msg.UserDID == "" || msg.NodeID == "" {
		return fmt.Errorf("user_did and node_id cannot be empty")
	}
	return nil
}
func (msg *MsgRecordAllocation) GetSignBytes() []byte {
	bz, _ := sdk.SortJSON([]byte(fmt.Sprintf(`{"user_did":"%s","node_id":"%s","workload_type":"%s"}`,
		msg.UserDID, msg.NodeID, msg.WorkloadType)))
	return bz
}
func (msg *MsgRecordAllocation) GetSigners() []sdk.AccAddress { return []sdk.AccAddress{} }

type MsgStoreEvidence struct {
	Submitter string            `json:"submitter"`
	Hash      string            `json:"hash"`
	IpfsHash  string            `json:"ipfs_hash"`
	Metadata  map[string]string `json:"metadata"`
}

func (msg *MsgStoreEvidence) Route() string { return "claims" }
func (msg *MsgStoreEvidence) Type() string  { return "store_evidence" }
func (msg *MsgStoreEvidence) ValidateBasic() error {
	if msg.Submitter == "" || msg.Hash == "" || msg.IpfsHash == "" {
		return fmt.Errorf("submitter, hash, and ipfs_hash cannot be empty")
	}
	return nil
}
func (msg *MsgStoreEvidence) GetSignBytes() []byte {
	bz, _ := sdk.SortJSON([]byte(fmt.Sprintf(`{"submitter":"%s","hash":"%s","ipfs_hash":"%s"}`,
		msg.Submitter, msg.Hash, msg.IpfsHash)))
	return bz
}
func (msg *MsgStoreEvidence) GetSigners() []sdk.AccAddress {
	addr, _ := sdk.AccAddressFromBech32(msg.Submitter)
	return []sdk.AccAddress{addr}
}
