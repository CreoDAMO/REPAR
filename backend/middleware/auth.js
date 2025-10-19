/**
 * Authentication Middleware
 * Session-based authentication for Circle API endpoints
 */

import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

/**
 * Simple session-based auth
 * In production, integrate with your actual auth system
 */
export function requireAuth(req, res, next) {
  // Check for session
  if (req.session && req.session.authenticated) {
    return next();
  }
  
  // Check for JWT token
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token',
      });
    }
  }
  
  // For development, allow requests from localhost
  if (config.nodeEnv === 'development') {
    const origin = req.headers.origin || req.headers.referer;
    if (origin?.includes('localhost') || origin?.includes('127.0.0.1')) {
      console.warn('⚠️ Development mode: bypassing authentication');
      return next();
    }
  }
  
  return res.status(401).json({
    success: false,
    error: 'Authentication required',
  });
}

/**
 * Create session (for initial auth)
 */
export function createSession(req, res) {
  // In production, validate credentials here
  req.session.authenticated = true;
  
  const token = jwt.sign(
    { authenticated: true, timestamp: Date.now() },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
  
  res.json({
    success: true,
    token,
    expiresIn: config.jwt.expiresIn,
  });
}
