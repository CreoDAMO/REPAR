# ADNS Server - Aequitas DNS Daemon

Standalone DNS daemon for sovereign alternate root resolution. This daemon implements a 9-layer fallback architecture with ML-DSA post-quantum signatures and FHE (Fully Homomorphic Encryption) support.

## Features

- **Sovereign Root Authority**: Operates as an alternate root independent of ICANN
- **Blockchain-Backed**: Queries the Aequitas x/adns module for authoritative records
- **9-Layer Fallback**: IBC → ENS → Handshake → DNSSEC → IPFS → libp2p → Tor → Mesh
- **Post-Quantum Security**: ML-DSA-87 (Dilithium) signature verification
- **FHE Protection**: CKKS-based homomorphic encryption for record privacy
- **Redis Caching**: High-performance caching layer
- **Constitutional Enforcement**: Validates against 25 axioms

## Sovereign TLDs

- `.aequitas` - Primary protocol TLD
- `.repar` - Reparations and claims domain space
- `.sovereign` - Nation infrastructure
- `.nation` - Citizen services
- `.justice` - Legal enforcement

## Usage

```bash
# Build
go build -o adns-server .

# Run with defaults
./adns-server

# Run with custom configuration
./adns-server \
  -listen :53 \
  -rpc http://localhost:26657 \
  -redis localhost:6379 \
  -fhe true \
  -mldsa true \
  -ip 135.232.208.145
```

## Configuration

| Flag | Default | Description |
|------|---------|-------------|
| `-listen` | `:53` | Listen address (UDP and TCP) |
| `-rpc` | `http://localhost:26657` | Blockchain RPC endpoint |
| `-redis` | `localhost:6379` | Redis cache address |
| `-fhe` | `true` | Enable FHE encryption |
| `-mldsa` | `true` | Enable ML-DSA signatures |
| `-ip` | `135.232.208.145` | Sovereign infrastructure IP |

## Resolution Layers

1. **Redis Cache** - In-memory caching with TTL
2. **Blockchain Authority** - Aequitas x/adns module (sovereign root)
3. **IBC** - Cross-chain resolution via Cosmos IBC
4. **ENS** - Ethereum Name Service (.eth domains)
5. **Handshake** - HNS decentralized root
6. **DNSSEC** - Traditional DNS with security extensions
7. **IPFS** - Content-addressed resolution
8. **libp2p** - Peer-to-peer resolution
9. **Tor** - Onion service resolution
10. **Mesh** - Local mesh network fallback

## Integration

### As System Resolver

```bash
# Linux: Edit /etc/resolv.conf
nameserver 127.0.0.1

# Or configure systemd-resolved
[Resolve]
DNS=127.0.0.1
```

### As Public Resolver

Deploy on anycast infrastructure with BIRD:

```conf
protocol static {
    route 135.232.208.200/32 reject;
}
```

## Dependencies

- `github.com/miekg/dns` - DNS library
- `github.com/redis/go-redis/v9` - Redis client (production)
- `github.com/cloudflare/circl/sign/dilithium` - ML-DSA (production)
- `github.com/tuneinsight/lattigo/v5` - FHE (production)

## License

Part of the Aequitas Protocol - Software-Defined Sovereign Nation
