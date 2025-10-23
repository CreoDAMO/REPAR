import React, { useState } from 'react';
import { Brain, Cpu, TrendingUp, Search, Sparkles } from 'lucide-react';
import NFTGenerator from '../components/AIFeatures/NFTGenerator';
import TradingSignals from '../components/AIFeatures/TradingSignals';
import MultimodalSearch from '../components/AIFeatures/MultimodalSearch';

const AIAnalyticsEnhanced = () => {
  const [activeTab, setActiveTab] = useState('multimodal');

  const tabs = [
    { id: 'multimodal', label: 'Liability Search', icon: Search, component: MultimodalSearch },
    { id: 'trading', label: 'Trading Signals', icon: TrendingUp, component: TradingSignals },
    { id: 'nft', label: 'NFT Generator', icon: Sparkles, component: NFTGenerator }
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-purple-400" />
            <div>
              <h1 className="text-4xl font-bold text-white">
                NVIDIA AI Analytics
              </h1>
              <p className="text-gray-300 text-lg">
                Powered by NVIDIA NIM • Stable Diffusion XL • Llama 3.1 • CLIP
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white">
              <Sparkles className="w-8 h-8 mb-2" />
              <h3 className="text-2xl font-bold mb-1">$0.002</h3>
              <p className="text-purple-100">Per NFT Generation</p>
              <p className="text-sm text-purple-200 mt-2">Stable Diffusion XL</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
              <TrendingUp className="w-8 h-8 mb-2" />
              <h3 className="text-2xl font-bold mb-1">$0.005</h3>
              <p className="text-blue-100">Per 1K Tokens</p>
              <p className="text-sm text-blue-200 mt-2">Llama 3.1 8B Instruct</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
              <Search className="w-8 h-8 mb-2" />
              <h3 className="text-2xl font-bold mb-1">$0.001</h3>
              <p className="text-indigo-100">Per Search Query</p>
              <p className="text-sm text-indigo-200 mt-2">CLIP Multimodal</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 mb-6">
          <div className="flex gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-900 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          {ActiveComponent && <ActiveComponent />}
        </div>

        <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-start gap-4">
            <Cpu className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">About NVIDIA NIM Integration</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                The Aequitas Protocol leverages NVIDIA's AI models through their NIM (NVIDIA Inference Microservices) platform 
                for production-grade AI capabilities. These models are optimized for NVIDIA GPUs (A100/H100) and provide 
                2-10x faster inference with TensorRT optimization.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">NFT Generation</h4>
                  <p className="text-sm text-gray-300">
                    Create unique justice-themed NFT artwork using Stable Diffusion XL's text-to-image capabilities.
                  </p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">Market Analysis</h4>
                  <p className="text-sm text-gray-300">
                    Analyze sentiment and generate trading signals using Llama 3.1 8B's natural language understanding.
                  </p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">Evidence Search</h4>
                  <p className="text-sm text-gray-300">
                    Perform multimodal searches across $131T liability database using CLIP's image-text alignment.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-200">
                  <strong>Demo Mode:</strong> Currently running with mock data. Configure <code className="bg-black/40 px-2 py-1 rounded">NVIDIA_API_KEY</code> 
                  {' '}in environment variables to enable real AI inference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyticsEnhanced;
