/**
 * Circle API Controllers
 * Handle Circle SDK operations securely on the backend
 */

import { initCircleClient, sanitizeTransactionData, ETH, SOL } from '../utils/circleClient.js';
import { storeIdempotentResponse } from '../middleware/businessRules.js';

/**
 * Create a wallet for a descendant
 * POST /api/circle/create-wallet
 */
export async function createWallet(req, res) {
  try {
    const { descendantId, refId } = req.validatedData;
    const client = initCircleClient();
    
    const account = await client.createAccount({
      refId: refId || `descendant-${descendantId}`,
    });
    
    console.log('✅ Wallet created:', sanitizeTransactionData({
      descendantId,
      address: account.address,
    }));
    
    const response = {
      success: true,
      data: {
        descendantId,
        address: account.address,
        refId: account.refId,
      },
    };
    
    res.json(response);
  } catch (error) {
    console.error('❌ Wallet creation failed:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to create wallet',
      message: error.message,
    });
  }
}

/**
 * Transfer USDC between addresses
 * POST /api/circle/transfer
 */
export async function transfer(req, res) {
  try {
    const { from, to, amount, idempotencyKey } = req.validatedData;
    const client = initCircleClient();
    
    const transferResult = await client.transfer({
      from,
      to,
      amount,
    });
    
    console.log('✅ Transfer completed:', sanitizeTransactionData({
      from,
      to,
      amount,
      txHash: transferResult.txHash,
    }));
    
    const response = {
      success: true,
      data: {
        transaction: transferResult,
        from,
        to,
        amount,
      },
    };
    
    storeIdempotentResponse(idempotencyKey, response);
    res.json(response);
  } catch (error) {
    console.error('❌ Transfer failed:', error.message);
    res.status(500).json({
      success: false,
      error: 'Transfer failed',
      message: error.message,
    });
  }
}

/**
 * Process justice burn payment
 * POST /api/circle/justice-burn
 */
export async function justiceBurn(req, res) {
  try {
    const { defendantId, amount, fromAddress, toAddress, idempotencyKey } = req.validatedData;
    const client = initCircleClient();
    
    // Transfer USDC to treasury
    const transferResult = await client.transfer({
      from: fromAddress,
      to: toAddress,
      amount,
    });
    
    console.log('✅ Justice burn payment received:', sanitizeTransactionData({
      defendantId,
      amount,
      txHash: transferResult.txHash,
    }));
    
    const response = {
      success: true,
      data: {
        defendantId,
        transaction: transferResult,
        burnAmount: amount, // 1 USD = 1 REPAR burned
        status: 'completed',
      },
    };
    
    storeIdempotentResponse(idempotencyKey, response);
    res.json(response);
  } catch (error) {
    console.error('❌ Justice burn failed:', error.message);
    res.status(500).json({
      success: false,
      error: 'Justice burn payment failed',
      message: error.message,
    });
  }
}

/**
 * Distribute reparations to multiple descendants
 * POST /api/circle/distribute-reparations
 */
export async function distributeReparations(req, res) {
  try {
    const { distributions, idempotencyKey } = req.validatedData;
    const client = initCircleClient();
    
    const transfers = await Promise.all(
      distributions.map(({ address, amount, descendantId }) =>
        client.transfer({
          to: address,
          amount,
        }).then(result => ({
          ...result,
          descendantId,
          address,
          amount,
        }))
      )
    );
    
    const totalAmount = distributions.reduce((sum, d) => sum + parseFloat(d.amount), 0);
    
    console.log('✅ Reparations distributed:', sanitizeTransactionData({
      count: distributions.length,
      totalAmount,
    }));
    
    const response = {
      success: true,
      data: {
        transfers,
        count: transfers.length,
        totalAmount,
      },
    };
    
    storeIdempotentResponse(idempotencyKey, response);
    res.json(response);
  } catch (error) {
    console.error('❌ Distribution failed:', error.message);
    res.status(500).json({
      success: false,
      error: 'Reparations distribution failed',
      message: error.message,
    });
  }
}

/**
 * Get wallet balance
 * GET /api/circle/balance/:address
 */
export async function getBalance(req, res) {
  try {
    const { address } = req.params;
    const client = initCircleClient();
    
    const account = await client.getAccounts({ address });
    
    res.json({
      success: true,
      data: {
        address,
        balance: account?.balance || '0',
        currency: 'USDC',
      },
    });
  } catch (error) {
    console.error('❌ Balance query failed:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to query balance',
      message: error.message,
    });
  }
}

/**
 * Cross-chain USDC transfer via CCTP
 * POST /api/circle/cross-chain-transfer
 */
export async function crossChainTransfer(req, res) {
  try {
    const { from, to, amount, destinationChain, idempotencyKey } = req.validatedData;
    const client = initCircleClient();
    
    // Map chain name to chain constant
    const chainMap = {
      ethereum: ETH,
      solana: SOL,
    };
    
    const destinationChainConfig = chainMap[destinationChain];
    
    if (!destinationChainConfig) {
      return res.status(400).json({
        success: false,
        error: `Unsupported destination chain: ${destinationChain}`,
      });
    }
    
    const transferResult = await client.crossChainTransfer({
      from,
      to,
      amount,
      destinationChain: destinationChainConfig,
    });
    
    console.log('✅ Cross-chain transfer initiated:', sanitizeTransactionData({
      from,
      to,
      amount,
      destinationChain,
    }));
    
    const response = {
      success: true,
      data: {
        transfer: transferResult,
        from,
        to,
        amount,
        destinationChain,
      },
    };
    
    storeIdempotentResponse(idempotencyKey, response);
    res.json(response);
  } catch (error) {
    console.error('❌ Cross-chain transfer failed:', error.message);
    res.status(500).json({
      success: false,
      error: 'Cross-chain transfer failed',
      message: error.message,
    });
  }
}
