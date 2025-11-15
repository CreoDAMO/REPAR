package blockchain

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/cometbft/cometbft/rpc/client/http"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/crypto/keys/secp256k1"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	authsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"
)

type CosmosClient struct {
	rpcEndpoint string
	rpcClient   *http.HTTP
	chainID     string
	privKey     *secp256k1.PrivKey
}

func NewCosmosClient(rpcEndpoint, chainID string) (*CosmosClient, error) {
	rpc, err := http.New(rpcEndpoint, "/websocket")
	if err != nil {
		return nil, fmt.Errorf("failed to create RPC client: %w", err)
	}

	return &CosmosClient{
		rpcEndpoint: rpcEndpoint,
		rpcClient:   rpc,
		chainID:     chainID,
	}, nil
}

func (c *CosmosClient) SetPrivateKey(privKey *secp256k1.PrivKey) {
	c.privKey = privKey
}

func (c *CosmosClient) GetAddress() string {
	if c.privKey == nil {
		return ""
	}
	return sdk.AccAddress(c.privKey.PubKey().Address()).String()
}

func (c *CosmosClient) QueryAccount(address string) (map[string]interface{}, error) {
	result, err := c.rpcClient.ABCIQuery(context.Background(), "/cosmos.auth.v1beta1.Query/Account", []byte(address))
	if err != nil {
		return nil, fmt.Errorf("failed to query account: %w", err)
	}

	var account map[string]interface{}
	if err := json.Unmarshal(result.Response.Value, &account); err != nil {
		return nil, fmt.Errorf("failed to unmarshal account: %w", err)
	}

	return account, nil
}

func (c *CosmosClient) VerifyIdentity(did string) (bool, error) {
	address, err := sdk.AccAddressFromBech32(did)
	if err != nil {
		return false, fmt.Errorf("invalid DID format: %w", err)
	}

	_, err = c.QueryAccount(address.String())
	if err != nil {
		return false, nil
	}

	return true, nil
}

func (c *CosmosClient) SubmitTransaction(msgs []sdk.Msg) (string, error) {
	if c.privKey == nil {
		return "", fmt.Errorf("private key not set")
	}

	account, err := c.QueryAccount(c.GetAddress())
	if err != nil {
		return "", fmt.Errorf("failed to get account: %w", err)
	}

	accountNumber, ok := account["account_number"].(uint64)
	if !ok {
		accountNumber = 0
	}

	sequence, ok := account["sequence"].(uint64)
	if !ok {
		sequence = 0
	}

	txBuilder := c.createTxBuilder(msgs, accountNumber, sequence)

	txBytes, err := c.encodeTx(txBuilder)
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

	log.Printf("✅ Transaction submitted: hash=%s\n", result.Hash.String())
	return result.Hash.String(), nil
}

func (c *CosmosClient) createTxBuilder(msgs []sdk.Msg, accountNumber, sequence uint64) client.TxBuilder {
	return nil
}

func (c *CosmosClient) encodeTx(txBuilder client.TxBuilder) ([]byte, error) {
	return nil, fmt.Errorf("not implemented")
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

	log.Printf("📡 Subscribed to blockchain events: query=%s\n", query)
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

type SignMode int32

const (
	SignMode_SIGN_MODE_DIRECT SignMode = 1
)

func NewSignatureV2(pubKey []byte, data SignatureData, sequence uint64) signing.SignatureV2 {
	return signing.SignatureV2{}
}

type SignatureData interface {
	isSignatureData()
}

type SingleSignatureData struct {
	SignMode  SignMode
	Signature []byte
}

func (m *SingleSignatureData) isSignatureData() {}

func NewTxConfig() client.TxConfig {
	return nil
}

func NewFactory() tx.Factory {
	return tx.Factory{}
}

func Sign(txf tx.Factory, name string, txBuilder client.TxBuilder, overwriteSig bool) error {
	return nil
}

func BroadcastTx(clientCtx client.Context, txf tx.Factory, msgs ...sdk.Msg) (*sdk.TxResponse, error) {
	return nil, nil
}

func NewContext() client.Context {
	return client.Context{}
}

func GetTxCmd() interface{} {
	return nil
}

func GetQueryCmd() interface{} {
	return nil
}

func NewSingleSignatureData(signMode SignMode, signature []byte) authsigning.SignatureData {
	return &authsigning.SingleSignatureData{
		SignMode:  signing.SignMode(signMode),
		Signature: signature,
	}
}
