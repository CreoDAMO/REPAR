/**
 * ADNS (Aequitas DNS System) Routes
 * Sovereign DNS API Endpoints
 */

import express from 'express';
import {
  resolve,
  registerDomain,
  updateRecord,
  transferDomain,
  freezeDomain,
  listDomains,
  getDomainNFT,
  getStatus,
  getCacheStats,
  clearCache,
  getFHEStatus,
  encryptData
} from '../controllers/adnsController.js';

const router = express.Router();

router.get('/status', getStatus);

router.get('/resolve', resolve);

router.post('/register', registerDomain);

router.get('/domains', listDomains);

router.put('/domain/:domain', updateRecord);

router.post('/domain/:domain/transfer', transferDomain);

router.post('/domain/:domain/freeze', freezeDomain);

router.get('/domain/:domain/nft', getDomainNFT);

router.get('/cache/stats', getCacheStats);

router.post('/cache/clear', clearCache);

router.get('/fhe/status', getFHEStatus);

router.post('/fhe/encrypt', encryptData);

export default router;
