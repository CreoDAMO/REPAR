/**
 * Aequitas Backend API Server
 * Secure proxy for Circle USDC payment integration
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import { csrf } from 'lusca';
import morgan from 'morgan';
import { config, validateConfig } from './config/index.js';
import circleRoutes from './routes/circle.js';
import { createSession } from './middleware/auth.js';

// Validate configuration on startup
validateConfig();

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
}));

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (config.cors.origins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️ Blocked CORS request from: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit(config.rateLimit);
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session management
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.nodeEnv === 'production',
    httpOnly: true,
    maxAge: config.session.maxAge,
    sameSite: 'lax',
  },
}));

// CSRF protection (must go after session)
app.use(csrf());

// Logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    version: '1.0.0',
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Aequitas Circle API',
    version: '1.0.0',
    description: 'Secure backend proxy for Circle USDC payment integration',
    endpoints: {
      health: 'GET /health',
      auth: 'POST /api/auth/session',
      circle: {
        createWallet: 'POST /api/circle/create-wallet',
        transfer: 'POST /api/circle/transfer',
        justiceBurn: 'POST /api/circle/justice-burn',
        distributeReparations: 'POST /api/circle/distribute-reparations',
        getBalance: 'GET /api/circle/balance/:address',
        crossChainTransfer: 'POST /api/circle/cross-chain-transfer',
      },
    },
  });
});

// Authentication endpoint
app.post('/api/auth/session', createSession);

// Circle API routes
app.use('/api/circle', circleRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    path: req.path,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = config.nodeEnv === 'production' 
    ? 'Internal server error' 
    : err.message;
  
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
});

// Start server
const server = app.listen(config.port, '0.0.0.0', () => {
  console.log('');
  console.log('🚀 Aequitas Circle API Server');
  console.log('================================');
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Port: ${config.port}`);
  console.log(`URL: http://localhost:${config.port}`);
  console.log('');
  console.log('Endpoints:');
  console.log(`  Health: http://localhost:${config.port}/health`);
  console.log(`  API Info: http://localhost:${config.port}/api`);
  console.log(`  Circle: http://localhost:${config.port}/api/circle/*`);
  console.log('');
  console.log('Security:');
  console.log(`  ✅ CORS enabled for: ${config.cors.origins.join(', ')}`);
  console.log(`  ✅ Rate limiting: ${config.rateLimit.max} requests per ${config.rateLimit.windowMs / 60000} minutes`);
  console.log(`  ✅ Helmet security headers enabled`);
  console.log(`  ✅ Session management enabled`);
  console.log('');
  console.log('Circle SDK:');
  console.log(`  ✅ API Key: ${config.circle.apiKey ? '***configured***' : '❌ NOT SET'}`);
  console.log(`  ✅ Entity Secret: ${config.circle.entitySecret ? '***configured***' : '❌ NOT SET'}`);
  console.log('');
  console.log('Ready to accept requests! 🎯');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;
