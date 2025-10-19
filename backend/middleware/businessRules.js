/**
 * Business Rules Middleware
 * Enforce business logic constraints on Circle operations
 */

import { config } from '../config/index.js';

/**
 * In-memory store for tracking daily volumes (use Redis in production)
 */
const dailyVolumes = new Map();

/**
 * Check if amount exceeds max transaction limit
 */
export function checkTransactionLimit(req, res, next) {
  const amount = parseFloat(req.validatedData.amount);
  const maxAmount = parseFloat(config.limits.maxTransferAmount);
  
  if (amount > maxAmount) {
    return res.status(400).json({
      success: false,
      error: 'Transaction amount exceeds maximum limit',
      details: {
        requested: amount,
        maximum: maxAmount,
      },
    });
  }
  
  next();
}

/**
 * Check daily volume limits
 */
export function checkDailyVolume(req, res, next) {
  const amount = parseFloat(req.validatedData.amount);
  const today = new Date().toISOString().split('T')[0];
  const key = `${today}:${req.ip}`;
  
  const currentVolume = dailyVolumes.get(key) || 0;
  const newVolume = currentVolume + amount;
  const maxDailyVolume = parseFloat(config.limits.maxDailyVolume);
  
  if (newVolume > maxDailyVolume) {
    return res.status(429).json({
      success: false,
      error: 'Daily volume limit exceeded',
      details: {
        current: currentVolume,
        requested: amount,
        maximum: maxDailyVolume,
      },
    });
  }
  
  // Update volume (would use Redis INCR in production)
  dailyVolumes.set(key, newVolume);
  
  // Clean up old entries (simple TTL)
  setTimeout(() => {
    dailyVolumes.delete(key);
  }, 24 * 60 * 60 * 1000);
  
  next();
}

/**
 * Validate recipient address is whitelisted for certain operations
 */
export function checkWhitelist(req, res, next) {
  const { toAddress } = req.validatedData;
  
  // Allow all addresses in development
  if (config.nodeEnv === 'development') {
    return next();
  }
  
  const allowedAddresses = [
    ...config.whitelist.treasuryAddresses,
    ...config.whitelist.validatorAddresses,
  ];
  
  // For justice burns, recipient must be treasury
  if (req.path.includes('justice-burn')) {
    if (!config.whitelist.treasuryAddresses.includes(toAddress)) {
      return res.status(403).json({
        success: false,
        error: 'Recipient address not authorized for justice burn payments',
      });
    }
  }
  
  next();
}

/**
 * Idempotency check (prevent duplicate transactions)
 */
const processedTransactions = new Map();

export function checkIdempotency(req, res, next) {
  const { idempotencyKey } = req.validatedData;
  
  if (!idempotencyKey) {
    return next();
  }
  
  const existing = processedTransactions.get(idempotencyKey);
  
  if (existing) {
    // Return cached result
    return res.status(200).json(existing);
  }
  
  // Store response interceptor
  req.idempotencyKey = idempotencyKey;
  
  next();
}

/**
 * Store successful transaction response for idempotency
 */
export function storeIdempotentResponse(idempotencyKey, response) {
  if (idempotencyKey) {
    processedTransactions.set(idempotencyKey, response);
    
    // Clean up after 24 hours
    setTimeout(() => {
      processedTransactions.delete(idempotencyKey);
    }, 24 * 60 * 60 * 1000);
  }
}
