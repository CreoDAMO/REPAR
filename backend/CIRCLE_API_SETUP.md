# Circle API Integration Setup

The Aequitas Backend API uses Circle's Programmable Wallets for fiat on/off-ramp functionality.

## Required Secrets

You need to configure the following secrets in your environment:

| Secret | Description | How to Get |
|--------|-------------|------------|
| `CIRCLE_API_KEY` | Circle API Key | Create at [Circle Developer Console](https://console.circle.com) |
| `CIRCLE_ENTITY_SECRET` | Entity Secret for transaction signing | Generated in Circle Console when creating entity |

## Setup Steps

### 1. Create Circle Account
1. Go to [Circle Developer Console](https://console.circle.com)
2. Create a developer account
3. Complete KYB (Know Your Business) verification

### 2. Create API Key
1. Navigate to Settings > API Keys
2. Create a new API Key
3. Copy the API Key value

### 3. Create Entity Secret
1. Navigate to Programmable Wallets
2. Create an Entity (or use existing)
3. Generate Entity Secret
4. Copy the Entity Secret value (shown only once!)

### 4. Configure Secrets in Replit
1. Open the Secrets tab in Replit
2. Add `CIRCLE_API_KEY` with your API key
3. Add `CIRCLE_ENTITY_SECRET` with your entity secret
4. Restart the Backend API workflow

## Environment Variables

### Required for Production
```bash
CIRCLE_API_KEY=your-api-key-here
CIRCLE_ENTITY_SECRET=your-entity-secret-here
```

### Optional but Recommended
```bash
SESSION_SECRET=your-secure-random-string
JWT_SECRET=your-jwt-secret-string
```

## Development Mode

In development mode, the backend will start without Circle credentials but with limited functionality:
- Wallet creation: Disabled
- Transfers: Disabled
- Balance queries: Mock data only

You'll see this warning in logs:
```
WARNING: Running with incomplete configuration (development mode)
```

## API Endpoints Affected

The following endpoints require Circle API credentials:

| Endpoint | Method | Function |
|----------|--------|----------|
| `/api/wallets` | POST | Create programmable wallet |
| `/api/wallets/:id/balance` | GET | Get wallet balance |
| `/api/transfers` | POST | Execute transfer |
| `/api/transactions` | GET | List transactions |

## Circle Sandbox vs Production

### Sandbox (Testing)
- Use sandbox API key for testing
- No real money transactions
- Test with Circle's testnet tokens

### Production
- Use production API key for real transactions
- Requires completed KYB
- Real USDC transactions

## Security Notes

1. **Never commit secrets** to version control
2. **Rotate secrets** if exposed
3. **Use environment variables** only (never hardcode)
4. **Monitor API usage** in Circle Console

## Troubleshooting

### Error: CIRCLE_API_KEY is required
Solution: Add CIRCLE_API_KEY to Replit Secrets

### Error: CIRCLE_ENTITY_SECRET is required
Solution: Add CIRCLE_ENTITY_SECRET to Replit Secrets

### Error: Invalid API Key
Solution: Verify API key is correct and not expired

### Error: Entity not found
Solution: Check entity secret matches the entity in Circle Console

## Alternative: Use Coinbase Onramp

If Circle integration is complex, consider using Coinbase Pay instead:
- Already integrated via `components/CoinbasePayGateway.jsx`
- Simpler setup (just needs Coinbase Commerce API key)
- User-friendly onramp experience

---

*For support, see [Circle Documentation](https://developers.circle.com/w3s/docs)*
