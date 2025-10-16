import { useState, useEffect } from 'react';
import { ArrowDownUp, Settings, AlertCircle, Loader } from 'lucide-react';

export default function SwapInterface() {
  const [fromToken, setFromToken] = useState('REPAR');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const tokens = [
    { symbol: 'REPAR', name: 'Aequitas REPAR', balance: '1,250,000', icon: '⚖️', isNative: true },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.5', icon: '₿', isNative: true },
    { symbol: 'ETH', name: 'Ethereum', balance: '5.2', icon: '⟠', isNative: true },
    { symbol: 'SOL', name: 'Solana', balance: '125', icon: '◎', isNative: true },
    { symbol: 'POL', name: 'Polygon', balance: '8,500', icon: '🔷', isNative: true },
    { symbol: 'AVAX', name: 'Avalanche', balance: '45', icon: '🔺', isNative: true },
    { symbol: 'ATOM', name: 'Cosmos', balance: '500', icon: '⚛️', isNative: true },
    { symbol: 'USDC', name: 'USD Coin', balance: '50,000', icon: '💵', isNative: false },
  ];

  const [prices, setPrices] = useState({
    'REPAR': 18.33,
    'BTC': 95000,
    'ETH': 3500,
    'SOL': 140,
    'POL': 0.85,
    'AVAX': 42,
    'ATOM': 9.5,
    'USDC': 1
  });

  // Fetch real-time crypto prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Using CoinGecko API (free tier) for real-time prices
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,matic-network,avalanche-2,cosmos&vs_currencies=usd'
        );
        const data = await response.json();
        
        setPrices(prev => ({
          ...prev,
          'BTC': data.bitcoin?.usd || prev.BTC,
          'ETH': data.ethereum?.usd || prev.ETH,
          'SOL': data.solana?.usd || prev.SOL,
          'POL': data['matic-network']?.usd || prev.POL,
          'AVAX': data['avalanche-2']?.usd || prev.AVAX,
          'ATOM': data.cosmos?.usd || prev.ATOM,
        }));
      } catch (error) {
        console.warn('Failed to fetch real-time prices, using cached values:', error);
      }
    };

    fetchPrices();
    // Update prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const mockPrice = prices[toToken] / prices[fromToken];

  const handleFromAmountChange = (value) => {
    setFromAmount(value);
    if (value) {
      const calculated = fromToken === 'REPAR' 
        ? (parseFloat(value) * mockPrice).toFixed(2)
        : (parseFloat(value) / mockPrice).toFixed(6);
      setToAmount(calculated);
    } else {
      setToAmount('');
    }
  };

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const priceImpact = fromAmount ? (parseFloat(fromAmount) / 1000000 * 100).toFixed(3) : '0.000';
  const fee = fromAmount ? (parseFloat(fromAmount) * 0.003).toFixed(6) : '0';

  const handleSwap = async () => {
    setIsSwapping(true);
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSwapping(false);
    alert(`Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`);
    setFromAmount('');
    setToAmount('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Swap</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <Settings className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Settings */}
      {showSettings && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slippage Tolerance
          </label>
          <div className="flex gap-2">
            {[0.1, 0.5, 1.0].map((value) => (
              <button
                key={value}
                onClick={() => setSlippage(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  slippage === value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                {value}%
              </button>
            ))}
            <input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(parseFloat(e.target.value))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Custom"
              step="0.1"
            />
          </div>
        </div>
      )}

      {/* From Token */}
      <div className="mb-2">
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">From</label>
          <span className="text-sm text-gray-500">
            Balance: {tokens.find(t => t.symbol === fromToken)?.balance}
          </span>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              placeholder="0.0"
              className="bg-transparent text-2xl font-semibold outline-none w-full"
            />
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 font-medium ml-4"
            >
              {tokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.icon} {token.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-2 relative z-10">
        <button
          onClick={handleSwapTokens}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition"
        >
          <ArrowDownUp className="h-5 w-5" />
        </button>
      </div>

      {/* To Token */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">To</label>
          <span className="text-sm text-gray-500">
            Balance: {tokens.find(t => t.symbol === toToken)?.balance}
          </span>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={toAmount}
              readOnly
              placeholder="0.0"
              className="bg-transparent text-2xl font-semibold outline-none w-full"
            />
            <select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 font-medium ml-4"
            >
              {tokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.icon} {token.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Swap Details */}
      {fromAmount && (
        <div className="bg-blue-50 rounded-lg p-4 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price</span>
            <span className="font-medium">
              1 {fromToken} = {mockPrice.toFixed(4)} {toToken}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price Impact</span>
            <span className={`font-medium ${parseFloat(priceImpact) > 1 ? 'text-red-600' : 'text-green-600'}`}>
              {priceImpact}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Trading Fee (0.3%)</span>
            <span className="font-medium">{fee} {fromToken}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Minimum Received</span>
            <span className="font-medium">
              {(parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6)} {toToken}
            </span>
          </div>
        </div>
      )}

      {/* Warning */}
      {parseFloat(priceImpact) > 1 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <p className="text-sm text-amber-800">
            Price impact is high. Consider splitting your trade into smaller amounts.
          </p>
        </div>
      )}

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        disabled={!fromAmount || parseFloat(fromAmount) <= 0 || isSwapping}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2"
      >
        {isSwapping ? (
          <>
            <Loader className="h-5 w-5 animate-spin" />
            Swapping...
          </>
        ) : (
          'Swap'
        )}
      </button>

      {/* Disclaimer */}
      <p className="text-xs text-center text-gray-500 mt-4">
        Connected to Aequitas DEX • Network: Aequitas Zone
      </p>
    </div>
  );
}
