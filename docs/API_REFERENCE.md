
# Aequitas Protocol - API Reference

## Overview

This document provides a complete reference for all REST API endpoints, WebSocket events, and error codes used in the Aequitas Protocol.

**Base URL (Development):** `http://localhost:3002`  
**Base URL (Production):** `https://api.aequitasprotocol.zone`

---

## Authentication

Most endpoints require a valid session token. Include it in the request headers:

```
Authorization: Bearer <session_token>
```

---

## Circle Payment API

### POST /api/circle/wallets/create

Create a new USDC wallet for a user.

**Request Body:**
```json
{
  "userId": "string",
  "blockchain": "ETH" | "AVAX" | "MATIC"
}
```

**Response:**
```json
{
  "walletId": "string",
  "address": "string",
  "blockchain": "string",
  "createDate": "2025-01-01T00:00:00Z"
}
```

**Error Codes:**
- `400` - Invalid request parameters
- `401` - Unauthorized
- `500` - Circle API error

---

### POST /api/circle/transfer

Initiate a USDC transfer (Justice Burn or Reparations Distribution).

**Request Body:**
```json
{
  "source": {
    "type": "blockchain",
    "address": "string"
  },
  "destination": {
    "type": "blockchain", 
    "address": "string"
  },
  "amount": {
    "amount": "string",
    "currency": "USD"
  }
}
```

**Response:**
```json
{
  "id": "string",
  "status": "pending" | "complete" | "failed",
  "amount": {
    "amount": "string",
    "currency": "USD"
  },
  "transactionHash": "string"
}
```

---

### GET /api/circle/transfers/:id

Get transfer status by ID.

**Response:**
```json
{
  "id": "string",
  "status": "pending" | "complete" | "failed",
  "source": { "address": "string" },
  "destination": { "address": "string" },
  "amount": { "amount": "string", "currency": "USD" },
  "transactionHash": "string",
  "createDate": "2025-01-01T00:00:00Z"
}
```

---

## Blockchain Query API

### GET /api/blockchain/validators

List all active validators.

**Query Parameters:**
- `status` (optional): `ACTIVE` | `INACTIVE` | `JAILED`
- `limit` (optional): Number of results (default: 100)

**Response:**
```json
{
  "validators": [
    {
      "operatorAddress": "string",
      "consensusPubkey": "string",
      "jailed": false,
      "status": "ACTIVE",
      "tokens": "string",
      "commission": "0.10"
    }
  ]
}
```

---

### GET /api/blockchain/account/:address

Get account balance and information.

**Response:**
```json
{
  "address": "string",
  "balances": [
    {
      "denom": "repar",
      "amount": "1000000000"
    }
  ],
  "accountNumber": "123",
  "sequence": "45"
}
```

---

## Defendant Database API

### GET /api/defendants

List all registered defendants.

**Query Parameters:**
- `category` (optional): Filter by defendant type
- `status` (optional): `PENDING` | `ACTIVE` | `SETTLED`
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 50)

**Response:**
```json
{
  "defendants": [
    {
      "id": "string",
      "name": "string",
      "category": "NATION" | "CORPORATION" | "UNIVERSITY",
      "estimatedLiability": "string",
      "status": "ACTIVE",
      "evidenceCount": 42
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 200
  }
}
```

---

### GET /api/defendants/:id

Get detailed defendant information.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "estimatedLiability": "string",
  "evidence": [
    {
      "ipfsHash": "string",
      "title": "string",
      "uploadDate": "2025-01-01T00:00:00Z"
    }
  ],
  "payments": [
    {
      "amount": "string",
      "date": "2025-01-01T00:00:00Z",
      "transactionHash": "string"
    }
  ]
}
```

---

## NVIDIA AI API

### POST /api/ai/analyze

Run AI analysis on text or images.

**Request Body:**
```json
{
  "type": "sentiment" | "risk_scoring" | "evidence_analysis",
  "content": "string",
  "imageUrl": "string (optional)"
}
```

**Response:**
```json
{
  "analysis": {
    "score": 0.85,
    "sentiment": "string",
    "confidence": 0.92,
    "details": {}
  }
}
```

**Rate Limit:** 100 requests per day per API key

---

### POST /api/ai/generate-nft

Generate NFT artwork using Stable Diffusion XL.

**Request Body:**
```json
{
  "prompt": "string",
  "negativePrompt": "string (optional)",
  "steps": 30
}
```

**Response:**
```json
{
  "imageUrl": "string",
  "ipfsHash": "string",
  "metadata": {
    "prompt": "string",
    "model": "stable-diffusion-xl",
    "generatedAt": "2025-01-01T00:00:00Z"
  }
}
```

---

## Health & Status

### GET /health

Check API health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T00:00:00Z",
  "services": {
    "database": "up",
    "blockchain": "up",
    "circle": "up",
    "nvidia": "up"
  }
}
```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource does not exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |
| 502 | Bad Gateway | Upstream service unavailable |
| 503 | Service Unavailable | Temporary service outage |

---

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/ai/*` | 100 requests | 24 hours |
| `/api/circle/*` | 1000 requests | 1 hour |
| `/api/defendants` | 500 requests | 1 hour |
| `/api/blockchain/*` | Unlimited | - |

---

## WebSocket Events

**Connection URL:** `ws://localhost:3002/ws`

### Event: `block_created`
Emitted when a new block is created.

```json
{
  "event": "block_created",
  "data": {
    "height": 12345,
    "hash": "string",
    "timestamp": "2025-01-01T00:00:00Z",
    "txCount": 10
  }
}
```

### Event: `transaction_confirmed`
Emitted when a transaction is confirmed.

```json
{
  "event": "transaction_confirmed",
  "data": {
    "hash": "string",
    "height": 12345,
    "success": true
  }
}
```

---

## Postman Collection

A complete Postman collection is available at: `docs/postman/Aequitas_API.postman_collection.json`

Import this collection to test all endpoints with example requests.
