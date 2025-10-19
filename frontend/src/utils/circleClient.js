/**
 * Circle USDCKit Client Configuration
 * 
 * This module provides the Circle SDK client for USDC payment processing
 * in the Aequitas Protocol.
 * 
 * Required Environment Variables:
 * - VITE_CIRCLE_API_KEY: Your Circle API key from https://console.circle.com
 * - VITE_CIRCLE_ENTITY_SECRET: Your 32-byte entity secret
 */

import { createCircleClient } from '@circle-fin/usdckit';
import { ETH_SEPOLIA, ETH_MAINNET, SOLANA_MAINNET } from '@circle-fin/usdckit/chains';

// Determine environment
const isDevelopment = import.meta.env.MODE === 'development';

/**
 * Initialize Circle client
 * Defaults to testnet in development, mainnet in production
 */
export const initCircleClient = (options = {}) => {
  const apiKey = import.meta.env.VITE_CIRCLE_API_KEY;
  const entitySecret = import.meta.env.VITE_CIRCLE_ENTITY_SECRET;

  if (!apiKey || !entitySecret) {
    console.warn('⚠️ Circle SDK: API key or entity secret not configured');
    console.warn('Add VITE_CIRCLE_API_KEY and VITE_CIRCLE_ENTITY_SECRET to Replit Secrets');
    return null;
  }

  const defaultChain = isDevelopment ? ETH_SEPOLIA : ETH_MAINNET;

  try {
    const client = createCircleClient({
      apiKey,
      entitySecret,
      chain: options.chain || defaultChain,
    });

    console.log('✅ Circle SDK initialized:', {
      chain: options.chain?.name || defaultChain.name,
      environment: isDevelopment ? 'testnet' : 'mainnet',
    });

    return client;
  } catch (error) {
    console.error('❌ Failed to initialize Circle SDK:', error);
    return null;
  }
};

/**
 * Create multiple chain clients for cross-chain operations
 */
export const createMultiChainClients = () => {
  const apiKey = import.meta.env.VITE_CIRCLE_API_KEY;
  const entitySecret = import.meta.env.VITE_CIRCLE_ENTITY_SECRET;

  if (!apiKey || !entitySecret) {
    console.warn('⚠️ Circle SDK: Cannot create multi-chain clients without credentials');
    return {};
  }

  try {
    return {
      ethereum: createCircleClient({
        apiKey,
        entitySecret,
        chain: isDevelopment ? ETH_SEPOLIA : ETH_MAINNET,
      }),
      solana: createCircleClient({
        apiKey,
        entitySecret,
        chain: SOLANA_MAINNET,
      }),
    };
  } catch (error) {
    console.error('❌ Failed to create multi-chain clients:', error);
    return {};
  }
};

/**
 * Process a justice burn payment via USDC
 * 
 * @param {Object} params - Payment parameters
 * @param {string} params.defendantId - Defendant making the payment
 * @param {string} params.amount - Amount in USD (will burn equivalent REPAR)
 * @param {string} params.fromAddress - USDC sender address
 * @param {string} params.toAddress - Aequitas treasury address
 * @returns {Promise<Object>} Payment result
 */
export const processJusticeBurnPayment = async ({
  defendantId,
  amount,
  fromAddress,
  toAddress,
}) => {
  const client = initCircleClient();
  
  if (!client) {
    throw new Error('Circle client not initialized');
  }

  try {
    // Transfer USDC to Aequitas treasury
    const transfer = await client.transfer({
      from: fromAddress,
      to: toAddress,
      amount: amount.toString(),
    });

    console.log('✅ USDC payment received:', {
      defendantId,
      amount,
      txHash: transfer.txHash,
    });

    // In production, this would trigger the Justice Burn mechanism
    // on the Aequitas blockchain via the x/justice module
    
    return {
      success: true,
      transaction: transfer,
      burnAmount: amount, // 1 USD = 1 REPAR burned
    };
  } catch (error) {
    console.error('❌ Payment processing failed:', error);
    throw error;
  }
};

/**
 * Create a wallet for a descendant
 * 
 * @param {string} descendantId - Unique identifier for the descendant
 * @returns {Promise<Object>} Wallet details
 */
export const createDescendantWallet = async (descendantId) => {
  const client = initCircleClient();
  
  if (!client) {
    throw new Error('Circle client not initialized');
  }

  try {
    const account = await client.createAccount({
      refId: `descendant-${descendantId}`,
    });

    console.log('✅ Descendant wallet created:', {
      descendantId,
      address: account.address,
    });

    return account;
  } catch (error) {
    console.error('❌ Wallet creation failed:', error);
    throw error;
  }
};

/**
 * Distribute reparations to multiple descendants
 * 
 * @param {Array<Object>} distributions - Array of { address, amount } objects
 * @returns {Promise<Object>} Distribution result
 */
export const distributeReparations = async (distributions) => {
  const client = initCircleClient();
  
  if (!client) {
    throw new Error('Circle client not initialized');
  }

  try {
    const transfers = await Promise.all(
      distributions.map(({ address, amount }) =>
        client.transfer({
          to: address,
          amount: amount.toString(),
        })
      )
    );

    console.log('✅ Reparations distributed:', {
      count: distributions.length,
      totalAmount: distributions.reduce((sum, d) => sum + parseFloat(d.amount), 0),
    });

    return {
      success: true,
      transfers,
      count: transfers.length,
    };
  } catch (error) {
    console.error('❌ Distribution failed:', error);
    throw error;
  }
};

/**
 * Query wallet balance
 * 
 * @param {string} address - Wallet address
 * @returns {Promise<Object>} Balance information
 */
export const getWalletBalance = async (address) => {
  const client = initCircleClient();
  
  if (!client) {
    throw new Error('Circle client not initialized');
  }

  try {
    const account = await client.getAccounts({ address });
    
    return {
      address,
      balance: account?.balance || '0',
      currency: 'USDC',
    };
  } catch (error) {
    console.error('❌ Balance query failed:', error);
    throw error;
  }
};

/**
 * Cross-chain USDC transfer via CCTP
 * 
 * @param {Object} params - Transfer parameters
 * @param {string} params.from - Source address
 * @param {string} params.to - Destination address
 * @param {string} params.amount - Amount in USDC
 * @param {Object} params.destinationChain - Target chain object
 * @returns {Promise<Object>} Transfer result
 */
export const crossChainTransfer = async ({
  from,
  to,
  amount,
  destinationChain,
}) => {
  const client = initCircleClient();
  
  if (!client) {
    throw new Error('Circle client not initialized');
  }

  try {
    const transfer = await client.crossChainTransfer({
      from,
      to,
      amount: amount.toString(),
      destinationChain,
    });

    console.log('✅ Cross-chain transfer initiated:', {
      from,
      to,
      amount,
      destinationChain: destinationChain.name,
    });

    return transfer;
  } catch (error) {
    console.error('❌ Cross-chain transfer failed:', error);
    throw error;
  }
};

// Export chain constants for convenience
export { ETH_SEPOLIA, ETH_MAINNET, SOLANA_MAINNET };

export default {
  initCircleClient,
  createMultiChainClients,
  processJusticeBurnPayment,
  createDescendantWallet,
  distributeReparations,
  getWalletBalance,
  crossChainTransfer,
};
