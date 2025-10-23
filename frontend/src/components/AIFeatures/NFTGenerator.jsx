import React, { useState } from 'react';
import { Sparkles, Loader, Download, RefreshCw } from 'lucide-react';
import { generateJusticeNFT } from '../../utils/nvidiaAI';

const NFTGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const result = await generateJusticeNFT(prompt, {
        steps: 50,
        cfgScale: 7.5
      });

      if (result.success) {
        setGenerated(result);
      } else {
        setError('Failed to generate NFT');
      }
    } catch (err) {
      setError(err.message || 'Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generated) return;

    const link = document.createElement('a');
    link.href = generated.image;
    link.download = `justice-nft-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-8 h-8 text-purple-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI NFT Generator</h2>
          <p className="text-gray-600">Powered by Stable Diffusion XL</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            NFT Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your justice-themed NFT... (e.g., 'scales of justice with golden glow, ancient courthouse, reparations symbol')"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows="4"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={generating || !prompt.trim()}
          className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all shadow-lg ${
            generating || !prompt.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl'
          }`}
        >
          {generating ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="w-5 h-5 animate-spin" />
              Generating NFT...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate Justice NFT
            </span>
          )}
        </button>

        {generated && (
          <div className="space-y-4 mt-6 border-t pt-6">
            <div className="relative">
              <img
                src={generated.image}
                alt={generated.prompt}
                className="w-full rounded-xl shadow-2xl"
              />
              {generated.isMock && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Demo Mode
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Model:</span>
                <span className="font-medium text-gray-900">{generated.model}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Steps:</span>
                <span className="font-medium text-gray-900">{generated.metadata.steps}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Seed:</span>
                <span className="font-medium text-gray-900">{generated.metadata.seed}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Generated:</span>
                <span className="font-medium text-gray-900">
                  {new Date(generated.timestamp).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download NFT
              </button>
              <button
                onClick={() => handleGenerate()}
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Regenerate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTGenerator;
