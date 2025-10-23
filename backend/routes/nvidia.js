/**
 * NVIDIA NIM API Proxy Routes
 * Secure proxy for NVIDIA AI services (Stable Diffusion, Llama, CLIP)
 * Keeps API key server-side for security
 */

import express from 'express';

const router = express.Router();

// NVIDIA NIM API configuration
const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1';
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;

// Rate limiting for AI requests (prevent abuse)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_HOUR = 100;

const checkRateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }
  
  const requests = requestCounts.get(ip).filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (requests.length >= MAX_REQUESTS_PER_HOUR) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      message: `Maximum ${MAX_REQUESTS_PER_HOUR} requests per hour allowed`,
      retryAfter: Math.ceil((requests[0] + RATE_LIMIT_WINDOW - now) / 1000),
    });
  }
  
  requests.push(now);
  requestCounts.set(ip, requests);
  next();
};

/**
 * POST /api/nvidia/images/generations
 * Generate images using Stable Diffusion XL
 */
router.post('/images/generations', checkRateLimit, async (req, res) => {
  if (!NVIDIA_API_KEY) {
    return res.status(503).json({
      error: 'NVIDIA API not configured',
      message: 'NVIDIA_API_KEY environment variable is not set',
    });
  }

  const { model, prompt, negative_prompt, num_inference_steps, guidance_scale, width, height, seed } = req.body;

  if (!prompt) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'prompt is required',
    });
  }

  try {
    const response = await fetch(`${NVIDIA_BASE_URL}/images/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'stabilityai/stable-diffusion-xl',
        prompt,
        negative_prompt: negative_prompt || 'low quality, blurry, distorted',
        num_inference_steps: num_inference_steps || 50,
        guidance_scale: guidance_scale || 7.5,
        width: width || 1024,
        height: height || 1024,
        seed: seed || -1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('NVIDIA API error:', errorData);
      return res.status(response.status).json({
        error: 'NVIDIA API request failed',
        message: errorData.detail || errorData.message || 'Unknown error',
        status: response.status,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('NVIDIA image generation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * POST /api/nvidia/chat/completions
 * Text generation and analysis using Llama or other chat models
 */
router.post('/chat/completions', checkRateLimit, async (req, res) => {
  if (!NVIDIA_API_KEY) {
    return res.status(503).json({
      error: 'NVIDIA API not configured',
      message: 'NVIDIA_API_KEY environment variable is not set',
    });
  }

  const { model, messages, temperature, max_tokens } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'messages array is required',
    });
  }

  try {
    const response = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || 'meta/llama-3.1-8b-instruct',
        messages,
        temperature: temperature !== undefined ? temperature : 0.2,
        max_tokens: max_tokens || 200,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('NVIDIA API error:', errorData);
      return res.status(response.status).json({
        error: 'NVIDIA API request failed',
        message: errorData.detail || errorData.message || 'Unknown error',
        status: response.status,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('NVIDIA chat completion error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * POST /api/nvidia/embeddings
 * Multimodal search using CLIP embeddings
 */
router.post('/embeddings', checkRateLimit, async (req, res) => {
  if (!NVIDIA_API_KEY) {
    return res.status(503).json({
      error: 'NVIDIA API not configured',
      message: 'NVIDIA_API_KEY environment variable is not set',
    });
  }

  const { model, query, image } = req.body;

  if (!query) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'query is required',
    });
  }

  try {
    const requestBody = {
      model: model || 'openai/clip-vit-large-patch14',
      input: query,
    };

    if (image) {
      requestBody.image = image;
    }

    const response = await fetch(`${NVIDIA_BASE_URL}/embeddings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('NVIDIA API error:', errorData);
      return res.status(response.status).json({
        error: 'NVIDIA API request failed',
        message: errorData.detail || errorData.message || 'Unknown error',
        status: response.status,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('NVIDIA embeddings error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * GET /api/nvidia/status
 * Check NVIDIA API configuration status
 */
router.get('/status', (req, res) => {
  res.json({
    configured: !!NVIDIA_API_KEY,
    endpoints: {
      imageGeneration: '/api/nvidia/images/generations',
      chatCompletions: '/api/nvidia/chat/completions',
      embeddings: '/api/nvidia/embeddings',
    },
    rateLimit: {
      maxRequestsPerHour: MAX_REQUESTS_PER_HOUR,
      windowMs: RATE_LIMIT_WINDOW,
    },
  });
});

export default router;
