const NVIDIA_API_KEY = import.meta.env.VITE_NVIDIA_API_KEY || null;
const NVIDIA_API_BASE = 'https://integrate.api.nvidia.com/v1';

const NVIDIA_MODELS = {
  STABLE_DIFFUSION_XL: 'stabilityai/stable-diffusion-xl',
  LLAMA_3_1_8B: 'meta/llama-3.1-8b-instruct',
  CLIP: 'openai/clip-vit-large-patch14',
  WHISPER: 'openai/whisper-large-v3',
  GEMMA_2: 'google/gemma-2-9b-it'
};

const generateJusticeNFT = async (prompt, options = {}) => {
  if (!NVIDIA_API_KEY) {
    return mockNFTGeneration(prompt, options);
  }

  try {
    const response = await fetch(`${NVIDIA_API_BASE}/images/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: NVIDIA_MODELS.STABLE_DIFFUSION_XL,
        prompt: `Justice-themed reparations art: ${prompt}`,
        negative_prompt: options.negativePrompt || 'low quality, blurry, distorted',
        num_inference_steps: options.steps || 50,
        guidance_scale: options.cfgScale || 7.5,
        width: 1024,
        height: 1024,
        seed: options.seed || -1
      })
    });

    if (!response.ok) throw new Error('NFT generation failed');
    const data = await response.json();
    
    return {
      success: true,
      image: data.data[0].b64_json,
      prompt,
      timestamp: new Date().toISOString(),
      model: 'Stable Diffusion XL',
      metadata: {
        steps: options.steps || 50,
        seed: data.data[0].seed
      }
    };
  } catch (error) {
    console.error('NVIDIA API error:', error);
    return mockNFTGeneration(prompt, options);
  }
};

const analyzeSentiment = async (text) => {
  if (!NVIDIA_API_KEY) {
    return mockSentimentAnalysis(text);
  }

  try {
    const response = await fetch(`${NVIDIA_API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: NVIDIA_MODELS.LLAMA_3_1_8B,
        messages: [
          {
            role: 'system',
            content: 'You are a financial sentiment analyzer for cryptocurrency. Analyze sentiment and provide a score from -1 (very negative) to +1 (very positive). Respond in JSON format.'
          },
          {
            role: 'user',
            content: `Analyze sentiment for REPAR token: ${text}`
          }
        ],
        temperature: 0.2,
        max_tokens: 200
      })
    });

    if (!response.ok) throw new Error('Sentiment analysis failed');
    const data = await response.json();
    
    const content = data.choices[0].message.content;
    let score = 0.0;
    if (content.toLowerCase().includes('positive')) score = 0.7;
    else if (content.toLowerCase().includes('negative')) score = -0.7;

    return {
      success: true,
      sentiment: content,
      score,
      text,
      timestamp: new Date().toISOString(),
      model: 'Llama 3.1 8B'
    };
  } catch (error) {
    console.error('NVIDIA API error:', error);
    return mockSentimentAnalysis(text);
  }
};

const multimodalSearch = async (query, imageData = null) => {
  if (!NVIDIA_API_KEY) {
    return mockMultimodalSearch(query);
  }

  try {
    return {
      success: true,
      results: [],
      query,
      timestamp: new Date().toISOString(),
      model: 'CLIP'
    };
  } catch (error) {
    console.error('NVIDIA API error:', error);
    return mockMultimodalSearch(query);
  }
};

const mockNFTGeneration = (prompt, options) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        image: `data:image/svg+xml;base64,${btoa(`
          <svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(99,102,241);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(168,85,247);stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="1024" height="1024" fill="url(#grad)"/>
            <text x="512" y="450" font-family="Arial" font-size="36" fill="white" text-anchor="middle" font-weight="bold">
              Justice NFT
            </text>
            <text x="512" y="500" font-family="Arial" font-size="24" fill="white" text-anchor="middle">
              ${prompt.substring(0, 40)}
            </text>
            <text x="512" y="580" font-family="Arial" font-size="18" fill="rgba(255,255,255,0.7)" text-anchor="middle">
              Generated with Stable Diffusion XL
            </text>
            <text x="512" y="620" font-family="Arial" font-size="14" fill="rgba(255,255,255,0.5)" text-anchor="middle">
              Powered by NVIDIA NIM
            </text>
          </svg>
        `)}`,
        prompt,
        timestamp: new Date().toISOString(),
        model: 'Stable Diffusion XL (Mock)',
        metadata: {
          steps: options.steps || 50,
          seed: Math.floor(Math.random() * 10000)
        },
        isMock: true
      });
    }, 2000);
  });
};

const mockSentimentAnalysis = (text) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const keywords = {
        positive: ['up', 'gain', 'profit', 'bull', 'moon', 'success', 'winning'],
        negative: ['down', 'loss', 'bear', 'crash', 'fail', 'dump', 'risk']
      };

      const lowerText = text.toLowerCase();
      const positiveCount = keywords.positive.filter(k => lowerText.includes(k)).length;
      const negativeCount = keywords.negative.filter(k => lowerText.includes(k)).length;

      let score = 0;
      let sentiment = 'Neutral';
      
      if (positiveCount > negativeCount) {
        score = 0.7;
        sentiment = 'Positive - Market sentiment appears bullish with growth indicators.';
      } else if (negativeCount > positiveCount) {
        score = -0.7;
        sentiment = 'Negative - Market sentiment shows bearish signals and caution.';
      } else {
        sentiment = 'Neutral - Market sentiment is balanced with mixed signals.';
      }

      resolve({
        success: true,
        sentiment,
        score,
        text,
        timestamp: new Date().toISOString(),
        model: 'Llama 3.1 8B (Mock)',
        isMock: true
      });
    }, 1000);
  });
};

const mockMultimodalSearch = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResults = [
        {
          id: 'defendant-001',
          name: 'Example Financial Institution',
          liability: '$2.5B',
          confidence: 0.92,
          evidence: 'Historical documents match query',
          category: 'Financial Institution',
          status: 'Pending'
        },
        {
          id: 'defendant-002',
          name: 'Corporate Entity XYZ',
          liability: '$1.2B',
          confidence: 0.87,
          evidence: 'Visual evidence and archival records',
          category: 'Corporation',
          status: 'Verified'
        },
        {
          id: 'defendant-003',
          name: 'University Institution',
          liability: '$750M',
          confidence: 0.81,
          evidence: 'Research documents and financial records',
          category: 'University',
          status: 'Under Review'
        }
      ];

      resolve({
        success: true,
        results: mockResults,
        query,
        totalResults: mockResults.length,
        timestamp: new Date().toISOString(),
        model: 'CLIP (Mock)',
        isMock: true
      });
    }, 1500);
  });
};

export {
  generateJusticeNFT,
  analyzeSentiment,
  multimodalSearch,
  NVIDIA_MODELS
};
