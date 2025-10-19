/**
 * Circle API Client - Frontend Proxy
 * 
 * ⚠️ SECURITY NOTICE:
 * This module calls the secure backend API instead of using Circle SDK directly.
 * Circle API keys are stored server-side and never exposed to the browser.
 * 
 * Backend API handles:
 * - Secure credential management
 * - Request validation
 * - Business rule enforcement
 * - Rate limiting
 * - Idempotency
 */

import * as backendAPI from './backendAPI.js';

/**
 * Initialize Circle client
 * Note: This now connects to the backend API instead of Circle directly
 */
export const initCircleClient = (options = {}) => {
  console.log('✅ Circle API client initialized (via secure backend proxy)');
  return {
    isBackendProxy: true,
    ...backendAPI,
  };
};

/**
 * Create multiple chain clients for cross-chain operations
 * Note: All chain operations now route through the backend API
 */
export const createMultiChainClients = () => {
  console.log('✅ Multi-chain clients initialized (via backend API)');
  return {
    ethereum: backendAPI,
    solana: backendAPI,
  };
};

/**
 * Process a justice burn payment via USDC
 * Now routes through secure backend API
 */
export const processJusticeBurnPayment = async ({
  defendantId,
  amount,
  fromAddress,
  toAddress,
}) => {
  try {
    const result = await backendAPI.processJusticeBurn({
      defendantId,
      amount: amount.toString(),
      fromAddress,
      toAddress,
      idempotencyKey: crypto.randomUUID(),
    });

    console.log('✅ Justice burn payment processed via backend:', result);
    return result;
  } catch (error) {
    console.error('❌ Payment processing failed:', error);
    throw error;
  }
};

/**
 * Create a wallet for a descendant
 * Now routes through secure backend API
 */
export const createDescendantWallet = async (descendantId) => {
  try {
    const result = await backendAPI.createDescendantWallet(
      descendantId,
      `descendant-${descendantId}`
    );

    console.log('✅ Descendant wallet created via backend:', result);
    return result.data;
  } catch (error) {
    console.error('❌ Wallet creation failed:', error);
    throw error;
  }
};

/**
 * Distribute reparations to multiple descendants
 * Now routes through secure backend API
 */
export const distributeReparations = async (distributions) => {
  try {
    const result = await backendAPI.distributeReparations(
      distributions.map(d => ({ ...d, amount: d.amount.toString() })),
      crypto.randomUUID()
    );

    console.log('✅ Reparations distributed via backend:', result);
    return result.data;
  } catch (error) {
    console.error('❌ Distribution failed:', error);
    throw error;
  }
};

/**
 * Query wallet balance
 * Now routes through secure backend API
 */
export const getWalletBalance = async (address) => {
  try {
    const result = await backendAPI.getWalletBalance(address);
    return result.data;
  } catch (error) {
    console.error('❌ Balance query failed:', error);
    throw error;
  }
};

/**
 * Cross-chain USDC transfer via CCTP
 * Now routes through secure backend API
 */
export const crossChainTransfer = async ({
  from,
  to,
  amount,
  destinationChain,
}) => {
  try {
    const chainName = typeof destinationChain === 'string' 
      ? destinationChain 
      : destinationChain.name?.toLowerCase();
    
    const result = await backendAPI.crossChainTransfer({
      from,
      to,
      amount: amount.toString(),
      destinationChain: chainName,
      idempotencyKey: crypto.randomUUID(),
    });

    console.log('✅ Cross-chain transfer initiated via backend:', result);
    return result.data;
  } catch (error) {
    console.error('❌ Cross-chain transfer failed:', error);
    throw error;
  }
};

// Export for compatibility (these are handled by the backend now)
export const ETH_SEPOLIA = { name: 'ETH_SEPOLIA' };
export const ETH_MAINNET = { name: 'ethereum' };
export const SOLANA_MAINNET = { name: 'solana' };

export default {
  initCircleClient,
  createMultiChainClients,
  processJusticeBurnPayment,
  createDescendantWallet,
  distributeReparations,
  getWalletBalance,
  crossChainTransfer,
};
