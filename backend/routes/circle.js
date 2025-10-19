/**
 * Circle API Routes
 * RESTful routes for Circle USDC operations
 */

import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  validate,
  validateParams,
  createWalletSchema,
  transferSchema,
  justiceBurnSchema,
  distributionSchema,
  balanceQuerySchema,
  crossChainTransferSchema,
} from '../middleware/validation.js';
import {
  checkTransactionLimit,
  checkDailyVolume,
  checkWhitelist,
  checkIdempotency,
} from '../middleware/businessRules.js';
import {
  createWallet,
  transfer,
  justiceBurn,
  distributeReparations,
  getBalance,
  crossChainTransfer,
} from '../controllers/circleController.js';

const router = express.Router();

// All routes require authentication
router.use(requireAuth);

/**
 * POST /api/circle/create-wallet
 * Create a new USDC wallet for a descendant
 */
router.post(
  '/create-wallet',
  validate(createWalletSchema),
  createWallet
);

/**
 * POST /api/circle/transfer
 * Transfer USDC between addresses
 */
router.post(
  '/transfer',
  validate(transferSchema),
  checkTransactionLimit,
  checkDailyVolume,
  checkIdempotency,
  transfer
);

/**
 * POST /api/circle/justice-burn
 * Process justice burn payment from defendant
 */
router.post(
  '/justice-burn',
  validate(justiceBurnSchema),
  checkTransactionLimit,
  checkDailyVolume,
  checkWhitelist,
  checkIdempotency,
  justiceBurn
);

/**
 * POST /api/circle/distribute-reparations
 * Distribute reparations to multiple descendants
 */
router.post(
  '/distribute-reparations',
  validate(distributionSchema),
  checkIdempotency,
  distributeReparations
);

/**
 * GET /api/circle/balance/:address
 * Query USDC balance for an address
 */
router.get(
  '/balance/:address',
  validateParams(balanceQuerySchema),
  getBalance
);

/**
 * POST /api/circle/cross-chain-transfer
 * Cross-chain USDC transfer via CCTP
 */
router.post(
  '/cross-chain-transfer',
  validate(crossChainTransferSchema),
  checkTransactionLimit,
  checkDailyVolume,
  checkIdempotency,
  crossChainTransfer
);

export default router;
