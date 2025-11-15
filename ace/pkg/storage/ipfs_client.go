package storage

import (
	"bytes"
	"fmt"
	"io"

	shell "github.com/ipfs/go-ipfs-api"
)

type IPFSClient struct {
	shell    *shell.Shell
	gateway  string
}

func NewIPFSClient(apiURL, gatewayURL string) *IPFSClient {
	return &IPFSClient{
		shell:   shell.NewShell(apiURL),
		gateway: gatewayURL,
	}
}

func (c *IPFSClient) Add(data []byte) (string, error) {
	reader := bytes.NewReader(data)
	hash, err := c.shell.Add(reader)
	if err != nil {
		return "", fmt.Errorf("failed to add to IPFS: %w", err)
	}

	return hash, nil
}

func (c *IPFSClient) Get(hash string) ([]byte, error) {
	reader, err := c.shell.Cat(hash)
	if err != nil {
		return nil, fmt.Errorf("failed to get from IPFS: %w", err)
	}
	defer reader.Close()

	data, err := io.ReadAll(reader)
	if err != nil {
		return nil, fmt.Errorf("failed to read IPFS data: %w", err)
	}

	return data, nil
}

func (c *IPFSClient) Pin(hash string) error {
	return c.shell.Pin(hash)
}

func (c *IPFSClient) Unpin(hash string) error {
	return c.shell.Unpin(hash)
}

func (c *IPFSClient) GetGatewayURL(hash string) string {
	return fmt.Sprintf("%s/ipfs/%s", c.gateway, hash)
}
