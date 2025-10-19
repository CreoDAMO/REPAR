import { useState } from 'react';
import { ArrowLeftRight, Globe, Wallet, TrendingUp, Lock, Zap, CheckCircle, BarChart3 } from 'lucide-react';
import SwapInterface from '../components/SwapInterface';
import LiquidityInterface from '../components/LiquidityInterface';
import {
  Bitcoin,
  Ethereum,
  Solana,
  Polygon,
  Avalanche,
  Cosmos,
  Binance,
  Cardano,
  Polkadot,
  Dogecoin,
  Tron,
  Chainlink
} from 'cryptocons';
import reparLogo from '../assets/REPAR_Coin_Logo.png';

const CryptoIcon = ({ symbol, className = "w-10 h-10" }) => {
  const iconMap = {
    'BTC': Bitcoin,
    'ETH': Ethereum,
    'SOL': Solana,
    'POL': Polygon,
    'AVAX': Avalanche,
    'ATOM': Cosmos,
    'BNB': Binance,
    'ADA': Cardano,
    'DOT': Polkadot,
    'DOGE': Dogecoin,
    'TRX': Tron,
    'LINK': Chainlink
  };

  if (symbol === 'REPAR') {
    return <img src={reparLogo} alt={symbol} className={className + " rounded-full object-cover"} />;
  }

  if (symbol === 'USDC' || symbol === 'XRP') {
    return (
      <div className={className + " bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold"}>
        {symbol.charAt(0)}
      </div>
    );
  }

  const Icon = iconMap[symbol];
  if (Icon) {
    try {
      return <Icon className={className} />;
    } catch (error) {
      return (
        <div className={className + " bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold"}>
          {symbol.charAt(0)}
        </div>
      );
    }
  }

  return (
    <div className={className + " bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold"}>
      {symbol.charAt(0)}
    </div>
  );
};

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

      <div className="container mx-auto px-4 py-8">

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('swap')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'swap'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <ArrowLeftRight className="inline h-5 w-5 mr-2" />
            Swap
          </button>
          <button
            onClick={() => setActiveTab('liquidity')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'liquidity'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <TrendingUp className="inline h-5 w-5 mr-2" />
            Liquidity
          </button>
          <button
            onClick={() => setActiveTab('pools')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'pools'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <BarChart3 className="inline h-5 w-5 mr-2" />
            Pools
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'about'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            About
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'swap' && (
          <div className="max-w-2xl mx-auto">
            <SwapInterface />
          </div>
        )}

        {activeTab === 'liquidity' && (
          <div className="max-w-2xl mx-auto">
            <LiquidityInterface />
          </div>
        )}

        {activeTab === 'pools' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold mb-6">Liquidity Pools</h3>

              <div className="space-y-4">
                {[
                  { pair: 'REPAR/USDC', tvl: '$145.8M', volume24h: '$12.3M', apr: '22.5%', myShare: '0%', coin2: 'USDC' },
                  { pair: 'REPAR/BTC', tvl: '$125.5M', volume24h: '$8.5M', apr: '18.2%', myShare: '0%', coin2: 'BTC' },
                  { pair: 'REPAR/ETH', tvl: '$89.3M', volume24h: '$5.2M', apr: '15.2%', myShare: '0%', coin2: 'ETH' },
                  { pair: 'REPAR/BNB', tvl: '$72.1M', volume24h: '$4.8M', apr: '16.7%', myShare: '0%', coin2: 'BNB' },
                  { pair: 'REPAR/SOL', tvl: '$52.8M', volume24h: '$3.1M', apr: '14.5%', myShare: '0%', coin2: 'SOL' },
                  { pair: 'REPAR/ADA', tvl: '$48.3M', volume24h: '$2.5M', apr: '13.2%', myShare: '0%', coin2: 'ADA' },
                  { pair: 'REPAR/POL', tvl: '$45.2M', volume24h: '$2.1M', apr: '12.5%', myShare: '2.5%', coin2: 'POL' },
                  { pair: 'REPAR/AVAX', tvl: '$38.6M', volume24h: '$1.8M', apr: '13.8%', myShare: '0%', coin2: 'AVAX' },
                  { pair: 'REPAR/DOT', tvl: '$35.7M', volume24h: '$1.6M', apr: '12.8%', myShare: '0%', coin2: 'DOT' },
                  { pair: 'REPAR/ATOM', tvl: '$28.4M', volume24h: '$1.2M', apr: '11.3%', myShare: '0%', coin2: 'ATOM' },
                  { pair: 'REPAR/XRP', tvl: '$24.9M', volume24h: '$1.0M', apr: '10.8%', myShare: '0%', coin2: 'XRP' },
                  { pair: 'REPAR/DOGE', tvl: '$18.5M', volume24h: '$0.8M', apr: '9.5%', myShare: '0%', coin2: 'DOGE' },
                  { pair: 'REPAR/TRX', tvl: '$15.2M', volume24h: '$0.6M', apr: '8.9%', myShare: '0%', coin2: 'TRX' },
                  { pair: 'REPAR/LINK', tvl: '$12.7M', volume24h: '$0.5M', apr: '8.2%', myShare: '0%', coin2: 'LINK' },
                ].map((pool, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center -space-x-2">
                          <CryptoIcon symbol="REPAR" className="w-10 h-10 border-2 border-white" />
                          <CryptoIcon symbol={pool.coin2} className="w-10 h-10 border-2 border-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{pool.pair}</h4>
                          <p className="text-sm text-gray-500">0.3% fee • Native Coin Swap</p>
                        </div>
                      </div>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition">
                        Add Liquidity
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">TVL</p>
                        <p className="font-semibold">{pool.tvl}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">24h Volume</p>
                        <p className="font-semibold">{pool.volume24h}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">APR</p>
                        <p className="font-semibold text-green-600">{pool.apr}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">My Share</p>
                        <p className="font-semibold">{pool.myShare}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div>

        {/* Overview */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">The Three-Part Financial Stack</h2>

          <p className="text-gray-700 mb-6">
            The Aequitas Zone provides a complete financial infrastructure that ensures $REPAR is not just a theoretical 
            store of value, but a deeply liquid, globally accessible, and highly useful currency. This three-part system 
            provides the tools for descendants to not only receive their reparations but to build a new, independent 
            economy with them.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border-2 border-purple-200">
              <div className="flex items-center space-x-2 mb-3">
                <ArrowLeftRight className="h-8 w-8 text-purple-600" />
                <h3 className="text-xl font-bold text-purple-900">1. Aequitas DEX</h3>
              </div>
              <p className="text-sm text-purple-800">
                Native on-chain trading with REPAR/USDC pairs for sovereign, censorship-resistant price discovery
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
                <Globe className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-bold text-blue-900">2. Interchain Bridge</h3>
              </div>
              <p className="text-sm text-blue-800">
                IBC connectivity to Cosmos, Osmosis, and cross-chain bridges for massive liquidity access
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <Wallet className="h-8 w-8 text-green-600" />
                <h3 className="text-xl font-bold text-green-900">3. Aequitas SuperPay</h3>
              </div>
              <p className="text-sm text-green-800">
                Coinbase integration + custom payment app for seamless fiat onramp and peer-to-peer transfers
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Aequitas DEX */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <ArrowLeftRight className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold">Section 1: Aequitas DEX (Native Trading Pair)</h2>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              The Aequitas DEX is a native, on-chain decentralized exchange built directly into the Aequitas Zone blockchain. 
              It provides sovereign trading capabilities without relying on external platforms.
            </p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded mb-6">
            <h3 className="text-xl font-bold text-purple-900 mb-3">Architecture</h3>
            <ul className="space-y-2 text-purple-800">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>Cosmos SDK AMM Module:</strong> Uses the proven x/liquidity module for automated market making</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>Primary Pair:</strong> REPAR/USDC trading pair for stable price discovery</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>Liquidity Pools:</strong> Community-owned pools where liquidity providers earn trading fees</span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Implementation Steps</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-1">1. Enable x/liquidity Module</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Configure the Cosmos SDK x/liquidity module in <code className="bg-gray-100 px-2 py-1 rounded">app/app.go</code>
                </p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• Import and register liquidity keeper</li>
                  <li>• Set module parameters (swap fee: 0.3%, batch size, tick precision)</li>
                  <li>• Enable governance control for pool parameters</li>
                </ul>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-1">2. Define REPAR/USDC Pool Parameters</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Create the initial liquidity pool with optimal parameters
                </p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• Pool type: Constant product (x*y=k)</li>
                  <li>• Initial price: $18.33 per REPAR (matches market cap calculation)</li>
                  <li>• Min deposit: 1000 USDC equivalent</li>
                  <li>• Swap fee: 0.3% (industry standard)</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-600 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-1">3. LP Onboarding & Liquidity Provisioning</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Create clear pathways for community liquidity provision
                </p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• Develop LP onboarding UI in wallet interface</li>
                  <li>• Show APY calculator based on trading volume</li>
                  <li>• Explain impermanent loss risks and mitigation</li>
                  <li>• Enable single-sided liquidity deposits</li>
                  <li>• Implement LP share minting and staking</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-1">4. Trading Interface & Frontend Integration</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Build user-friendly trading experience
                </p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• Swap interface with price impact preview</li>
                  <li>• Slippage tolerance settings</li>
                  <li>• Transaction history and analytics</li>
                  <li>• Price charts and volume tracking</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-1">5. Rollout Milestones</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Phased launch for safety and adoption
                </p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• <strong>Phase 1:</strong> Testnet deployment with simulated trading</li>
                  <li>• <strong>Phase 2:</strong> Mainnet launch with limited pool size</li>
                  <li>• <strong>Phase 3:</strong> Full public access and liquidity mining incentives</li>
                  <li>• <strong>Phase 4:</strong> Additional trading pairs (REPAR/ATOM, REPAR/ETH)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h4 className="font-bold text-indigo-900 mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-indigo-600" />
                Key Features
              </h4>
              <ul className="space-y-2 text-sm text-indigo-800">
                <li>• Constant product market maker (x*y=k)</li>
                <li>• 0.3% trading fees recycled to liquidity providers</li>
                <li>• No central order book - fully decentralized</li>
                <li>• Instant settlement on-chain</li>
                <li>• Censorship-resistant trading</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-bold text-green-900 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Strategic Purpose
              </h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• <strong>Sovereignty:</strong> No dependence on external exchanges</li>
                <li>• <strong>Price Discovery:</strong> Establishes real market value</li>
                <li>• <strong>Community-Owned:</strong> Fees benefit liquidity providers</li>
                <li>• <strong>Always Available:</strong> 24/7 trading access</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 rounded-lg">
            <p className="text-lg font-semibold">
              <Lock className="inline h-6 w-6 mr-2" />
              The Aequitas DEX ensures that no external entity can prevent trading or censor transactions. 
              It's the foundation of financial sovereignty for the descendant community.
            </p>
          </div>
        </div>

        {/* Section 2: Interchain Expansion */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Section 2: Interchain Expansion (The Bridge to the Cosmos)</h2>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              This phase connects the Aequitas Zone to the "Internet of Blockchains" using the Inter-Blockchain Communication 
              (IBC) protocol, making $REPAR a cross-chain asset with access to billions in liquidity.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
            <h3 className="text-xl font-bold text-blue-900 mb-3">Architecture</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>IBC Protocol:</strong> The standard for interoperability in the Cosmos ecosystem</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Channels & Relayers:</strong> Establish IBC channels to key Cosmos chains with automated message passing</span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Implementation Steps</h3>

            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-1">1. Configure IBC Modules</h4>
                <p className="text-sm text-gray-700">
                  Ensure the <code className="bg-gray-100 px-2 py-1 rounded">x/ibc</code> and <code className="bg-gray-100 px-2 py-1 rounded">x/transfer</code> modules 
                  are correctly configured in the application
                </p>
              </div>

              <div className="border-l-4 border-cyan-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-2">2. Establish IBC Channels To:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">→</span>
                    <span><strong>The Cosmos Hub:</strong> Trade $REPAR against $ATOM (largest Cosmos chain)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">→</span>
                    <span><strong>Osmosis:</strong> List on the largest DEX in Cosmos with deep liquidity pools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">→</span>
                    <span><strong>Axelar/Gravity Bridge:</strong> Bridge to Ethereum (create wrapped $REPAR or wREPAR)</span>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-1">3. Frontend Update</h4>
                <p className="text-sm text-gray-700">
                  Wallet interface supports IBC transfers, allowing users to send $REPAR from Aequitas Zone to other chains
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cyan-50 p-6 rounded-lg">
              <h4 className="font-bold text-cyan-900 mb-2 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-cyan-600" />
                Massive Liquidity
              </h4>
              <p className="text-sm text-cyan-800">
                Access to billions of dollars of liquidity on platforms like Osmosis
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Increased Utility
              </h4>
              <p className="text-sm text-blue-800">
                $REPAR can be used as collateral or in DeFi applications across the entire Cosmos ecosystem
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h4 className="font-bold text-indigo-900 mb-2 flex items-center">
                <Lock className="h-5 w-5 mr-2 text-indigo-600" />
                Decentralized Listing
              </h4>
              <p className="text-sm text-indigo-800">
                A listing on a DEX like Osmosis cannot be censored or taken down by any single entity
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Onramper & Aequitas SuperPay */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Wallet className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold">Section 3: The Onramper & Aequitas SuperPay</h2>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              This is the most critical component for real-world impact, providing the bridge between $REPAR and 
              traditional fiat currencies (USD, EUR, etc.). It makes reparations accessible to everyone, regardless 
              of crypto experience.
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mb-6">
            <h3 className="text-xl font-bold text-green-900 mb-3">Architecture</h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Onramper (Fiat Gateway):</strong> Coinbase Pay SDK integration for buying/selling $REPAR with credit cards or bank accounts</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Aequitas SuperPay:</strong> Custom payment application designed for the descendant community</span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Implementation Roadmap</h3>

            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-1">Step 1: Coinbase Pay SDK Integration</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Integrate Coinbase Pay SDK into the wallet interface
                </p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• <strong>Frontend:</strong> Add Coinbase Pay SDK to the wallet application</li>
                  <li>• <strong>UI Components:</strong> Create "Buy with Coinbase" and "Sell to Coinbase" buttons</li>
                  <li>• <strong>Payment Flow:</strong> Implement credit card and bank account purchase flows</li>
                  <li>• <strong>KYC Integration:</strong> Connect to Coinbase KYC/AML for compliance</li>
                </ul>
              </div>

              <div className="border-l-4 border-cyan-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-1">Step 2: Secure Backend Architecture</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Build secure service to handle Coinbase API interactions
                </p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• <strong>API Gateway:</strong> Create secure endpoint for Coinbase Commerce API</li>
                  <li>• <strong>Webhook Handler:</strong> Process payment confirmations and failures</li>
                  <li>• <strong>Rate Limiting:</strong> Implement transaction velocity checks</li>
                  <li>• <strong>Custody Flow:</strong> Define how purchased REPAR is delivered to user wallets</li>
                  <li>• <strong>Security:</strong> Encrypt API keys, implement request signing, audit logging</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-1">Step 3: Aequitas SuperPay Core Development</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Build the custom payment application
                </p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• <strong>User System:</strong> Create simple profile system with @username handles</li>
                  <li>• <strong>P2P Transfers:</strong> Implement instant REPAR transfers between users</li>
                  <li>• <strong>QR Code System:</strong> Generate and scan QR codes for in-person payments</li>
                  <li>• <strong>Transaction History:</strong> Real-time feed of all payments sent/received</li>
                  <li>• <strong>Contact List:</strong> Save frequent recipients for quick transfers</li>
                </ul>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-1">Step 4: Mobile & Web Application</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Deploy SuperPay as standalone mobile app and web interface
                </p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• <strong>Mobile App:</strong> React Native for iOS and Android</li>
                  <li>• <strong>Web App:</strong> Progressive Web App (PWA) for desktop access</li>
                  <li>• <strong>Wallet Integration:</strong> Direct interaction with Aequitas Zone blockchain</li>
                  <li>• <strong>Onramper Link:</strong> Seamless integration to load/unload fiat via Coinbase</li>
                </ul>
              </div>

              <div className="border-l-4 border-teal-500 pl-4 py-2">
                <h4 className="font-bold text-gray-900 mb-1">Step 5: Deployment & Rollout Phases</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Staged launch for safety and user education
                </p>
                <ul className="space-y-1 text-sm text-gray-600 ml-4">
                  <li>• <strong>Phase 1:</strong> Coinbase integration testnet with mock transactions</li>
                  <li>• <strong>Phase 2:</strong> SuperPay beta launch to 1000 early adopters</li>
                  <li>• <strong>Phase 3:</strong> Public release with full fiat onramp/offramp</li>
                  <li>• <strong>Phase 4:</strong> Merchant payment tools and business accounts</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border-2 border-blue-200 rounded-lg p-6">
                <h4 className="font-bold text-blue-900 mb-3">Coinbase Pay Features</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                    <span>"Buy with Coinbase" button in wallet</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                    <span>"Sell to Coinbase" for instant cash-out</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                    <span>Secure backend for API handling</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                    <span>Credit card & bank account support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600 mt-0.5" />
                    <span>Automatic KYC/AML compliance via Coinbase</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-900 mb-3">Aequitas SuperPay Features</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <span>Simple user profiles (@username)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <span>Instant, near-zero fee $REPAR transfers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <span>QR code payments for in-person transactions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <span>Direct Onramper integration for fiat</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <span>Transaction history & payment requests</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
              <p className="text-sm text-amber-900">
                <strong>💡 Concept:</strong> Think Cash App or Venmo, but for the Aequitas economy. A lightweight mobile 
                and web application focused on peer-to-peer $REPAR payments that operates outside the control of the 
                traditional banking system that many of the defendants (like Barclays) represent.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-bold text-green-900 mb-2">Frictionless Access</h4>
              <p className="text-sm text-green-800">
                Coinbase integration removes the biggest barrier for non-crypto users, allowing easy entry and exit
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg">
              <h4 className="font-bold text-emerald-900 mb-2">Real-World Utility</h4>
              <p className="text-sm text-emerald-800">
                Descendants can use $REPAR for everyday payments, supporting community businesses and building a circular economy
              </p>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg">
              <h4 className="font-bold text-teal-900 mb-2">Financial Sovereignty</h4>
              <p className="text-sm text-teal-800">
                Complete end-to-end system from reparations distribution to everyday spending, outside traditional banking control
              </p>
            </div>
          </div>
        </div>

        {/* Final Summary */}
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-3xl font-bold mb-6">Implementation Complete</h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <ArrowLeftRight className="h-6 w-6 text-purple-300 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-purple-200">The Aequitas DEX</h3>
                <p className="text-purple-100">Provides a sovereign, on-chain market for price discovery</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Globe className="h-6 w-6 text-blue-300 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-blue-200">The Interchain Expansion</h3>
                <p className="text-blue-100">Connects to the global crypto economy via IBC and bridges</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Wallet className="h-6 w-6 text-green-300 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-green-200">The Onramper and SuperPay</h3>
                <p className="text-green-100">Connects to the real-world fiat economy and enables everyday use</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white/10 rounded-lg p-6">
            <p className="text-lg font-semibold text-white">
              This three-part system ensures that $REPAR is not just a theoretical store of value, but a deeply liquid, 
              globally accessible, and highly useful currency. It provides the tools for descendants to not only receive 
              their reparations but to build a new, independent economy with them.
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-2xl font-bold text-yellow-300">
              The financial infrastructure is designed. The system is ready for implementation and launch.
            </p>
          </div>
        </div>
        </div>
        )}

      </div>
    </div>
  );
}