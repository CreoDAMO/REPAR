/**
 * Circle Client Wrapper
 * Server-side Circle SDK client with secure credential management
 */

import { createCircleClient } from '@circle-fin/usdckit';
import { ETH_SEPOLIA, ETH, SOL } from '@circle-fin/usdckit/chains';
import { config } from '../config/index.js';

const isDevelopment = config.nodeEnv === 'development';

/**
 * Initialize Circle client with server-side credentials
 */
export function initCircleClient(chainOption = null) {
  const { apiKey, entitySecret } = config.circle;
  
  if (!apiKey || !entitySecret) {
    throw new Error('Circle API credentials not configured');
  }
  
  const defaultChain = isDevelopment ? ETH_SEPOLIA : ETH;
  const chain = chainOption || defaultChain;
  
  try {
    const client = createCircleClient({
      apiKey,
      entitySecret,
      chain,
    });
    
    console.log('✅ Circle client initialized:', {
      chain: chain.name,
      environment: isDevelopment ? 'testnet' : 'mainnet',
    });
    
    return client;
  } catch (error) {
    console.error('❌ Failed to initialize Circle client:', error.message);
    throw error;
  }
}

/**
 * Get multi-chain clients
 */
export function getMultiChainClients() {
  const { apiKey, entitySecret } = config.circle;
  
  return {
    ethereum: createCircleClient({
      apiKey,
      entitySecret,
      chain: isDevelopment ? ETH_SEPOLIA : ETH,
    }),
    solana: createCircleClient({
      apiKey,
      entitySecret,
      chain: SOL,
    }),
  };
}

/**
 * Sanitize transaction data for logging (remove sensitive info)
 */
export function sanitizeTransactionData(data) {
  const sanitized = { ...data };
  
  // Remove or mask sensitive fields
  if (sanitized.apiKey) delete sanitized.apiKey;
  if (sanitized.entitySecret) delete sanitized.entitySecret;
  if (sanitized.privateKey) delete sanitized.privateKey;
  
  return sanitized;
}

export { ETH_SEPOLIA, ETH, SOL };
