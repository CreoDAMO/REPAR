/**
 * Backend Configuration
 * Centralized configuration for the Aequitas Circle API proxy
 */

export const config = {
  // Server
  port: process.env.PORT || 3002,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Circle API
  circle: {
    apiKey: process.env.CIRCLE_API_KEY,
    entitySecret: process.env.CIRCLE_ENTITY_SECRET,
  },
  
  // Security
  session: {
    secret: process.env.SESSION_SECRET || 'aequitas-session-secret-change-in-production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || process.env.SESSION_SECRET || 'aequitas-jwt-secret-change-in-production',
    expiresIn: '24h',
  },
  
  // CORS - Frontend origins
  cors: {
    origins: [
      'http://localhost:5000',
      'http://127.0.0.1:5000',
      process.env.FRONTEND_URL,
      process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : null,
    ].filter(Boolean),
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  },
  
  // Business rules
  limits: {
    maxTransferAmount: '1000000', // $1M max per transaction
    maxDailyVolume: '10000000', // $10M max per day
  },
  
  // Allowed addresses (treasury, validators, etc.)
  whitelist: {
    treasuryAddresses: [
      process.env.TREASURY_ADDRESS || '0x0000000000000000000000000000000000000000',
    ],
    validatorAddresses: [
      process.env.VALIDATOR_ADDRESS || 'aequitas1m230vduqyd4p07lwnqd78a6r5uyuvs74tu5eun',
    ],
  },
};

// Validate critical configuration
export function validateConfig() {
  const errors = [];
  
  if (!config.circle.apiKey) {
    errors.push('CIRCLE_API_KEY is required');
  }
  
  if (!config.circle.entitySecret) {
    errors.push('CIRCLE_ENTITY_SECRET is required');
  }
  
  if (config.nodeEnv === 'production' && config.session.secret.includes('change-in-production')) {
    errors.push('SESSION_SECRET must be set in production');
  }
  
  if (errors.length > 0) {
    console.error('❌ Configuration errors:');
    errors.forEach(err => console.error(`  - ${err}`));
    
    if (config.nodeEnv === 'production') {
      throw new Error('Invalid production configuration');
    } else {
      console.warn('⚠️ Running with incomplete configuration (development mode)');
    }
  }
  
  return errors.length === 0;
}
