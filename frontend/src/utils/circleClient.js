/**
 * DEPRECATED: This file is no longer used.
 * All Circle SDK operations now go through the secure backend API.
 * See: frontend/src/utils/backendAPI.js and backendIntegration.js
 * 
 * This file is kept for reference only and should not be imported.
 */

// All Circle operations have been moved to the backend server
// for security reasons (to avoid exposing API keys in the frontend).
// 
// Use backendAPI.js instead:
// import { circleAPI } from './backendAPI';
// 
// Example:
// const wallet = await circleAPI.createWallet(address);