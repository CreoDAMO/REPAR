
import { useState } from 'react';
import { Plus, Minus, Info } from 'lucide-react';
import reparLogo from '../assets/REPAR_Coin_Logo.png';

export default function LiquidityInterface() {
  const [mode, setMode] = useState('add'); // 'add' or 'remove'
  const [tokenAAmount, setTokenAAmount] = useState('');
  const [tokenBAmount, setTokenBAmount] = useState('');
  const [removePercent, setRemovePercent] = useState(25);

  // State for selected tokens (added for the logo logic)
  const [tokenA, setTokenA] = useState('REPAR');
  const [tokenB, setTokenB] = useState('USDC');

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
                <label className="text-sm font-medium text-gray-700">REPAR Amount</label>
                <span className="text-sm text-gray-500">Balance: 1,250,000</span>
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
                  <div className="flex items-center gap-2">
                    {tokenA === 'REPAR' && <img src={reparLogo} alt="REPAR" className="w-6 h-6 rounded-full" />}
                    <select
                      value={tokenA}
                      onChange={(e) => setTokenA(e.target.value)}
                      className="bg-transparent text-xl font-semibold outline-none cursor-pointer"
                    >
                      <option>REPAR</option>
                      <option>BTC</option>
                      <option>ETH</option>
                      <option>SOL</option>
                      <option>USDC</option>
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
                <label className="text-sm font-medium text-gray-700">USDC Amount</label>
                <span className="text-sm text-gray-500">Balance: 50,000</span>
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
                  <div className="flex items-center gap-2">
                    {tokenB === 'REPAR' && <img src={reparLogo} alt="REPAR" className="w-6 h-6 rounded-full" />}
                    <select
                      value={tokenB}
                      onChange={(e) => setTokenB(e.target.value)}
                      className="bg-transparent text-xl font-semibold outline-none cursor-pointer"
                    >
                      <option>BTC</option>
                      <option>ETH</option>
                      <option>SOL</option>
                      <option>USDC</option>
                      <option>REPAR</option>
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
                <span className="font-medium">1 REPAR = 18.33 USDC</span>
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
                <span className="text-blue-700">REPAR</span>
                <span className="font-medium text-blue-900">
                  {((mockLPTokens * removePercent) / 100 / 10).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-700">USDC</span>
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
