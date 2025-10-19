/**
 * Backend API Client
 * Secure API client for calling the Aequitas backend server
 */

// Backend API URL
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3002';

/**
 * Make an authenticated API request to the backend
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  const token = sessionStorage.getItem('backend_auth_token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Add CSRF token for non-GET requests
  if (options.method !== 'GET') {
    const csrfToken = await getCsrfToken(); // Assuming getCsrfToken is available
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: options.method !== 'GET' ? 'include' : undefined, // Include credentials for non-GET requests
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `API request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Create authentication session
 */
export async function createBackendSession() {
  try {
    const result = await apiRequest('/api/auth/session', {
      method: 'POST',
    });

    if (result.token) {
      sessionStorage.setItem('backend_auth_token', result.token);
    }

    return result;
  } catch (error) {
    console.warn('⚠️ Backend auth failed:', error.message);
    return null;
  }
}

/**
 * Circle API Methods
 */

/**
 * Create a wallet for a descendant
 */
export async function createDescendantWallet(descendantId, refId) {
  return apiRequest('/api/circle/create-wallet', {
    method: 'POST',
    body: JSON.stringify({ descendantId, refId }),
  });
}

/**
 * Transfer USDC between addresses
 */
export async function transferUSDC({ from, to, amount, idempotencyKey }) {
  return apiRequest('/api/circle/transfer', {
    method: 'POST',
    body: JSON.stringify({ from, to, amount, idempotencyKey }),
  });
}

/**
 * Process justice burn payment
 */
export async function processJusticeBurn({ defendantId, amount, fromAddress, toAddress, idempotencyKey }) {
  return apiRequest('/api/circle/justice-burn', {
    method: 'POST',
    body: JSON.stringify({ defendantId, amount, fromAddress, toAddress, idempotencyKey }),
  });
}

/**
 * Distribute reparations to multiple descendants
 */
export async function distributeReparations(distributions, idempotencyKey) {
  return apiRequest('/api/circle/distribute-reparations', {
    method: 'POST',
    body: JSON.stringify({ distributions, idempotencyKey }),
  });
}

/**
 * Get wallet balance
 */
export async function getWalletBalance(address) {
  return apiRequest(`/api/circle/balance/${address}`, {
    method: 'GET',
  });
}

/**
 * Cross-chain USDC transfer via CCTP
 */
export async function crossChainTransfer({ from, to, amount, destinationChain, idempotencyKey }) {
  return apiRequest('/api/circle/cross-chain-transfer', {
    method: 'POST',
    body: JSON.stringify({ from, to, amount, destinationChain, idempotencyKey }),
  });
}

/**
 * Health check
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  } catch (error) {
    console.error('Backend health check failed:', error);
    return { status: 'offline' };
  }
}

// Initialize session on module load
createBackendSession();

export default {
  createDescendantWallet,
  transferUSDC,
  processJusticeBurn,
  distributeReparations,
  getWalletBalance,
  crossChainTransfer,
  checkBackendHealth,
};