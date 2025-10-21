/**
 * Aequitas Backend API Server
 * Secure proxy for Circle payment integration
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { config, validateConfig } from './config/index.js';
import circleRoutes from './routes/circle.js';
import auditorRoutes from './routes/auditor.js';
import { createSession } from './middleware/auth.js';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

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

// Cookie parser (required for CSRF)
app.use(cookieParser());

// CSRF protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// CSRF token endpoint
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

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
    description: 'Secure backend proxy for Circle payment integration',
    endpoints: {
      health: 'GET /health',
      auth: 'POST /api/auth/session',
      csrfToken: 'GET /api/csrf-token',
      circle: {
        createWallet: 'POST /api/circle/create-wallet',
        transfer: 'POST /api/circle/transfer',
        justiceBurn: 'POST /api/circle/justice-burn',
        distributeReparations: 'POST /api/circle/distribute-reparations',
        getBalance: 'GET /api/circle/balance/:address',
        crossChainTransfer: 'POST /api/circle/cross-chain-transfer',
      },
      auditor: {
        analyze: 'POST /api/auditor/analyze',
        consensus: 'POST /api/auditor/consensus',
      },
      agentkit: {
        deployAgent: 'POST /api/agentkit/deploy-agent',
        agentStatus: 'GET /api/agentkit/agent-status/:agentId',
        agentAction: 'POST /api/agentkit/agent-action',
      },
    },
  });
});

// Authentication endpoint
app.post('/api/auth/session', createSession);

// Circle API routes
app.use('/api/circle', circleRoutes);

// Auditor API routes
app.use('/api/auditor', auditorRoutes);

// AgentKit API routes
app.use('/api/agentkit', require('./routes/agentkit'));

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

  // Handle CSRF errors specifically
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      success: false,
      error: 'Invalid CSRF token',
    });
  }

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
  console.log(`  CSRF Token: http://localhost:${config.port}/api/csrf-token`);
  console.log(`  Circle: http://localhost:${config.port}/api/circle/*`);
  console.log(`  Auditor: http://localhost:${config.port}/api/auditor/*`);
  console.log(`  AgentKit: http://localhost:${config.port}/api/agentkit/*`);
  console.log('');
  console.log('Security:');
  console.log(`  ✅ CORS enabled for: ${config.cors.origins.join(', ')}`);
  console.log(`  ✅ Rate limiting: ${config.rateLimit.max} requests per ${config.rateLimit.windowMs / 60000} minutes`);
  console.log(`  ✅ Helmet security headers enabled`);
  console.log(`  ✅ Session management enabled`);
  console.log(`  ✅ CSRF protection enabled`);
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