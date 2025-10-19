import { useState } from 'react';
import { ArrowLeftRight, Globe, Wallet, TrendingUp, Lock, Zap, CheckCircle, BarChart3 } from 'lucide-react';
import SwapInterface from '../components/SwapInterface';
import LiquidityInterface from '../components/LiquidityInterface';
import reparLogo from '../assets/REPAR_Coin_Logo.png';
import btcLogo from '../assets/btc-logo.jpg';
import ethLogo from '../assets/eth-logo.jpg';
import solLogo from '../assets/sol-logo.jpg';
import polLogo from '../assets/pol-logo.jpg';
import avaxLogo from '../assets/avax-logo.jpg';
import atomLogo from '../assets/atom-logo.jpg';

export default function AequitasDEX() {
  const [activeTab, setActiveTab] = useState('swap');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Aequitas DEX - Native Coin Exchange
          </h1>
          <p className="text-xl text-gray-300">
            Trade $REPAR with BTC, ETH, SOL, POL, AVAX, ATOM via ⚡ Lightning Network
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Sovereign Layer-1 DEX • No Wrapped Tokens • Direct Native Coin Swaps • Lightning Network Enabled
          </p>
</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
            <button
              onClick={() => setActiveTab('swap')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'swap'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <ArrowLeftRight className="inline-block mr-2 h-5 w-5" />
              Swap
            </button>
            <button
              onClick={() => setActiveTab('liquidity')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'liquidity'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <BarChart3 className="inline-block mr-2 h-5 w-5" />
              Liquidity
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'swap' ? <SwapInterface /> : <LiquidityInterface />}
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Instant swaps powered by Lightning Network technology
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure & Decentralized</h3>
            <p className="text-gray-600">
              Non-custodial swaps with no intermediaries
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Multi-Chain</h3>
            <p className="text-gray-600">
              Trade native coins across different blockchains
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}