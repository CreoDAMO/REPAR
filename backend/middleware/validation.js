/**
 * Request Validation Middleware
 * Zod schemas for validating Circle API requests
 */

import { z } from 'zod';

// Ethereum address validation
const ethereumAddress = z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address');

// Cosmos address validation
const cosmosAddress = z.string().regex(/^aequitas[a-z0-9]{39}$/, 'Invalid Cosmos address');

// USDC amount validation (positive number as string)
const usdcAmount = z.string().regex(/^\d+(\.\d{1,6})?$/, 'Invalid USDC amount').refine(
  (val) => parseFloat(val) > 0,
  'Amount must be greater than 0'
);

/**
 * Schema for wallet creation
 */
export const createWalletSchema = z.object({
  descendantId: z.string().min(1).max(100),
  refId: z.string().optional(),
});

/**
 * Schema for USDC transfer
 */
export const transferSchema = z.object({
  from: z.union([ethereumAddress, cosmosAddress]),
  to: z.union([ethereumAddress, cosmosAddress]),
  amount: usdcAmount,
  idempotencyKey: z.string().uuid().optional(),
});

/**
 * Schema for justice burn payment
 */
export const justiceBurnSchema = z.object({
  defendantId: z.string().min(1).max(100),
  amount: usdcAmount,
  fromAddress: z.union([ethereumAddress, cosmosAddress]),
  toAddress: z.union([ethereumAddress, cosmosAddress]),
  idempotencyKey: z.string().uuid().optional(),
});

/**
 * Schema for reparations distribution
 */
export const distributionSchema = z.object({
  distributions: z.array(
    z.object({
      address: z.union([ethereumAddress, cosmosAddress]),
      amount: usdcAmount,
      descendantId: z.string().optional(),
    })
  ).min(1).max(1000), // Max 1000 recipients per batch
  idempotencyKey: z.string().uuid().optional(),
});

/**
 * Schema for balance query
 */
export const balanceQuerySchema = z.object({
  address: z.union([ethereumAddress, cosmosAddress]),
});

/**
 * Schema for cross-chain transfer
 */
export const crossChainTransferSchema = z.object({
  from: ethereumAddress,
  to: ethereumAddress,
  amount: usdcAmount,
  destinationChain: z.enum(['ethereum', 'solana', 'arbitrum', 'polygon', 'base']),
  idempotencyKey: z.string().uuid().optional(),
});

/**
 * Validation middleware factory
 */
export function validate(schema) {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.body);
      req.validatedData = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
}

/**
 * Validate query parameters
 */
export function validateQuery(schema) {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.query);
      req.validatedQuery = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Invalid query parameters',
          details: error.errors,
        });
      }
      next(error);
    }
  };
}

/**
 * Validate URL parameters
 */
export function validateParams(schema) {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.params);
      req.validatedParams = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Invalid URL parameters',
          details: error.errors,
        });
      }
      next(error);
    }
  };
}
