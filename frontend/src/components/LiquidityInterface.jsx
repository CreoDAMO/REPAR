
import { useState } from 'react';
import { Plus, Minus, Info } from 'lucide-react';
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

const CryptoIcon = ({ symbol, className = "w-6 h-6" }) => {
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

  // Handle REPAR with local logo
  if (symbol === 'REPAR') {
    return <img src={reparLogo} alt={symbol} className={className + " rounded-full object-cover"} onError={(e) => {
      e.target.style.display = 'none';
      e.target.nextSibling?.classList.remove('hidden');
    }} />;
  }

  // Handle coins with fallback letters (USDC, XRP)
  if (symbol === 'USDC' || symbol === 'XRP') {
    return (
      <div className={className + " bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs"}>
        {symbol.charAt(0)}
      </div>
    );
  }

  // Handle cryptocons library icons
  const Icon = iconMap[symbol];
  if (Icon) {
    try {
      return <Icon className={className} />;
    } catch (error) {
      console.warn(`Failed to render icon for ${symbol}:`, error);
      return (
        <div className={className + " bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs"}>
          {symbol.charAt(0)}
        </div>
      );
    }
  }

  // Default fallback
  return (
    <div className={className + " bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-xs"}>
      {symbol.charAt(0)}
    </div>
  );
};

export default function LiquidityInterface() {
  const [mode, setMode] = useState('add'); // 'add' or 'remove'
  const [tokenAAmount, setTokenAAmount] = useState('');
  const [tokenBAmount, setTokenBAmount] = useState('');
  const [removePercent, setRemovePercent] = useState(25);

  // State for selected tokens
  const [tokenA, setTokenA] = useState('REPAR');
  const [tokenB, setTokenB] = useState('USDC');

  const tokens = [
    { symbol: 'REPAR', name: 'Aequitas REPAR', balance: '1,250,000' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.5' },
    { symbol: 'ETH', name: 'Ethereum', balance: '5.2' },
    { symbol: 'BNB', name: 'Binance Coin', balance: '12.5' },
    { symbol: 'SOL', name: 'Solana', balance: '125' },
    { symbol: 'ADA', name: 'Cardano', balance: '5,000' },
    { symbol: 'AVAX', name: 'Avalanche', balance: '45' },
    { symbol: 'DOT', name: 'Polkadot', balance: '350' },
    { symbol: 'POL', name: 'Polygon', balance: '8,500' },
    { symbol: 'ATOM', name: 'Cosmos', balance: '500' },
    { symbol: 'XRP', name: 'Ripple', balance: '10,000' },
    { symbol: 'DOGE', name: 'Dogecoin', balance: '50,000' },
    { symbol: 'TRX', name: 'Tron', balance: '25,000' },
    { symbol: 'LINK', name: 'Chainlink', balance: '250' },
    { symbol: 'USDC', name: 'USD Coin', balance: '50,000' },
  ];

  const mockPoolShare = 2.5; // User owns 2.5% of the pool
  const mockLPTokens = 125000;

  const handleTokenAChange = (value) => {
    setTokenAAmount(value);
    // Auto-calculate tokenB based on pool ratio (1 REPAR = 18.33 USDC)
    if (value) {
      setTokenBAmount((parseFloat(value) * 18.33).toFixed(2));
    } else {
      setTokenBAmount('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('add')}
          className={`flex-1 py-3 rounded-xl font-semibold transition ${
            mode === 'add'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Plus className="inline h-5 w-5 mr-2" />
          Add Liquidity
        </button>
        <button
          onClick={() => setMode('remove')}
          className={`flex-1 py-3 rounded-xl font-semibold transition ${
            mode === 'remove'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Minus className="inline h-5 w-5 mr-2" />
          Remove Liquidity
        </button>
      </div>

      {mode === 'add' ? (
        <>
          {/* Add Liquidity Form */}
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Token A</label>
                <span className="text-sm text-gray-500">
                  Balance: {tokens.find(t => t.symbol === tokenA)?.balance || '0'}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    value={tokenAAmount}
                    onChange={(e) => handleTokenAChange(e.target.value)}
                    placeholder="0.0"
                    className="bg-transparent text-2xl font-semibold outline-none w-full"
                  />
                  <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 ml-4">
                    <CryptoIcon symbol={tokenA} />
                    <select
                      value={tokenA}
                      onChange={(e) => setTokenA(e.target.value)}
                      className="bg-transparent font-medium outline-none cursor-pointer"
                    >
                      {tokens.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-gray-200 rounded-full p-2">
                <Plus className="h-5 w-5 text-gray-600" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Token B</label>
                <span className="text-sm text-gray-500">
                  Balance: {tokens.find(t => t.symbol === tokenB)?.balance || '0'}
                </span>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    value={tokenBAmount}
                    onChange={(e) => setTokenBAmount(e.target.value)}
                    placeholder="0.0"
                    className="bg-transparent text-2xl font-semibold outline-none w-full"
                  />
                  <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 ml-4">
                    <CryptoIcon symbol={tokenB} />
                    <select
                      value={tokenB}
                      onChange={(e) => setTokenB(e.target.value)}
                      className="bg-transparent font-medium outline-none cursor-pointer"
                    >
                      {tokens.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pool Info */}
          {tokenAAmount && (
            <div className="bg-blue-50 rounded-lg p-4 mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Pool Share</span>
                <span className="font-medium">
                  {((parseFloat(tokenAAmount) / 10000000) * 100).toFixed(4)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">LP Tokens to Receive</span>
                <span className="font-medium">
                  {(parseFloat(tokenAAmount) * 10).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Exchange Rate</span>
                <span className="font-medium">1 {tokenA} = 18.33 {tokenB}</span>
              </div>
            </div>
          )}

          <button
            disabled={!tokenAAmount || !tokenBAmount}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition"
          >
            Add Liquidity
          </button>
        </>
      ) : (
        <>
          {/* Remove Liquidity Form */}
          <div className="mb-6">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Amount to Remove</span>
                <span className="text-sm text-indigo-600 font-medium">{removePercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={removePercent}
                onChange={(e) => setRemovePercent(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-indigo-200 to-indigo-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2">
                {[25, 50, 75, 100].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => setRemovePercent(percent)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      removePercent === percent
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {percent}%
                  </button>
                ))}
              </div>
            </div>

            {/* Position Info */}
            <div className="bg-purple-50 rounded-lg p-4 mb-4 space-y-3">
              <h4 className="font-semibold text-purple-900 mb-2">Your Position</h4>
              <div className="flex justify-between text-sm">
                <span className="text-purple-700">Pool Share</span>
                <span className="font-medium text-purple-900">{mockPoolShare}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-700">LP Tokens</span>
                <span className="font-medium text-purple-900">{mockLPTokens.toLocaleString()}</span>
              </div>
            </div>

            {/* Withdrawal Preview */}
            <div className="bg-blue-50 rounded-lg p-4 mb-4 space-y-2">
              <h4 className="font-semibold text-blue-900 mb-2">You Will Receive</h4>
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">{tokenA}</span>
                <span className="font-medium text-blue-900">
                  {((mockLPTokens * removePercent) / 100 / 10).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">{tokenB}</span>
                <span className="font-medium text-blue-900">
                  {((mockLPTokens * removePercent) / 100 / 10 * 18.33).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl transition">
            Remove Liquidity
          </button>
        </>
      )}

      {/* Info Box */}
      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
        <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-800">
          {mode === 'add'
            ? 'Adding liquidity will earn you 0.3% of all trades in this pool proportional to your share.'
            : 'Removing liquidity will forfeit your share of the trading fees. You can add liquidity back anytime.'}
        </p>
      </div>
    </div>
  );
}
