
import { useState, useEffect } from 'react';
import { ArrowDownUp, Settings, AlertCircle, Loader } from 'lucide-react';
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
  // Define icon mapping
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

  // REPAR - use image
  if (symbol === 'REPAR') {
    return (
      <img 
        src={reparLogo} 
        alt={symbol} 
        className={`${className} rounded-full object-cover`}
      />
    );
  }

  // USDC and XRP - use letter fallback
  if (symbol === 'USDC' || symbol === 'XRP') {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs`}>
        {symbol.charAt(0)}
      </div>
    );
  }

  // Try to get icon from cryptocons library
  const Icon = iconMap[symbol];
  if (Icon) {
    return <Icon className={className} />;
  }

  // Fallback for any unknown symbols
  return (
    <div className={`${className} bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-xs`}>
      {symbol ? symbol.charAt(0) : '?'}
    </div>
  );
};

export default function SwapInterface() {
  const [fromCoin, setFromCoin] = useState('REPAR');
  const [toCoin, setToCoin] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const coins = [
    { symbol: 'REPAR', name: 'Aequitas REPAR', balance: '1,250,000', isNative: true },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.5', isNative: true },
    { symbol: 'ETH', name: 'Ethereum', balance: '5.2', isNative: true },
    { symbol: 'BNB', name: 'Binance Coin', balance: '12.5', isNative: true },
    { symbol: 'SOL', name: 'Solana', balance: '125', isNative: true },
    { symbol: 'ADA', name: 'Cardano', balance: '5,000', isNative: true },
    { symbol: 'AVAX', name: 'Avalanche', balance: '45', isNative: true },
    { symbol: 'DOT', name: 'Polkadot', balance: '350', isNative: true },
    { symbol: 'POL', name: 'Polygon', balance: '8,500', isNative: true },
    { symbol: 'ATOM', name: 'Cosmos', balance: '500', isNative: true },
    { symbol: 'XRP', name: 'Ripple', balance: '10,000', isNative: true },
    { symbol: 'DOGE', name: 'Dogecoin', balance: '50,000', isNative: true },
    { symbol: 'TRX', name: 'Tron', balance: '25,000', isNative: true },
    { symbol: 'LINK', name: 'Chainlink', balance: '250', isNative: false },
    { symbol: 'USDC', name: 'USD Coin', balance: '50,000', isNative: false },
  ];

  const [prices, setPrices] = useState({
    'REPAR': 18.33,
    'BTC': 95000,
    'ETH': 3500,
    'BNB': 620,
    'SOL': 140,
    'ADA': 0.58,
    'AVAX': 42,
    'DOT': 7.2,
    'POL': 0.85,
    'ATOM': 9.5,
    'XRP': 0.65,
    'DOGE': 0.12,
    'TRX': 0.18,
    'LINK': 16.5,
    'USDC': 1
  });

  // Fetch real-time crypto prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,cardano,avalanche-2,polkadot,matic-network,cosmos,ripple,dogecoin,tron,chainlink&vs_currencies=usd'
        );
        const data = await response.json();

        setPrices(prev => ({
          ...prev,
          'BTC': data.bitcoin?.usd || prev.BTC,
          'ETH': data.ethereum?.usd || prev.ETH,
          'BNB': data.binancecoin?.usd || prev.BNB,
          'SOL': data.solana?.usd || prev.SOL,
          'ADA': data.cardano?.usd || prev.ADA,
          'AVAX': data['avalanche-2']?.usd || prev.AVAX,
          'DOT': data.polkadot?.usd || prev.DOT,
          'POL': data['matic-network']?.usd || prev.POL,
          'ATOM': data.cosmos?.usd || prev.ATOM,
          'XRP': data.ripple?.usd || prev.XRP,
          'DOGE': data.dogecoin?.usd || prev.DOGE,
          'TRX': data.tron?.usd || prev.TRX,
          'LINK': data.chainlink?.usd || prev.LINK,
        }));
      } catch (error) {
        console.warn('Failed to fetch real-time prices, using cached values:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const mockPrice = prices[fromCoin] / prices[toCoin];

  const handleFromAmountChange = (value) => {
    setFromAmount(value);
    if (value) {
      const calculated = (parseFloat(value) * mockPrice).toFixed(6);
      setToAmount(calculated);
    } else {
      setToAmount('');
    }
  };

  const handleSwapCoins = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const priceImpact = fromAmount ? (parseFloat(fromAmount) / 1000000 * 100).toFixed(3) : '0.000';
  const fee = fromAmount ? (parseFloat(fromAmount) * 0.003).toFixed(6) : '0';

  const handleSwap = async () => {
    setIsSwapping(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSwapping(false);
    alert(`Swapped ${fromAmount} ${fromCoin} for ${toAmount} ${toCoin}`);
    setFromAmount('');
    setToAmount('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 max-w-md mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Swap</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <Settings className="h-5 w-5 text-gray-600" />
        </button>
      </div>

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

      <div className="mb-2">
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">From</label>
          <span className="text-sm text-gray-500">
            Balance: {coins.find(c => c.symbol === fromCoin)?.balance}
          </span>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <input
              type="number"
              inputMode="decimal"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              placeholder="0.0"
              className="bg-transparent text-gray-900 text-xl sm:text-2xl font-semibold outline-none w-full"
            />
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-2 sm:px-3 py-2 ml-2 sm:ml-4">
              <CryptoIcon symbol={fromCoin} />
              <select
                value={fromCoin}
                onChange={(e) => setFromCoin(e.target.value)}
                className="bg-white font-medium outline-none cursor-pointer text-sm sm:text-base text-gray-900"
              >
                {coins.map((coin) => (
                  <option key={coin.symbol} value={coin.symbol}>
                    {coin.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center -my-2 relative z-10">
        <button
          onClick={handleSwapCoins}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition"
        >
          <ArrowDownUp className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">To</label>
          <span className="text-sm text-gray-500">
            Balance: {coins.find(c => c.symbol === toCoin)?.balance}
          </span>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={toAmount}
              readOnly
              placeholder="0.0"
              className="bg-transparent text-gray-900 text-2xl font-semibold outline-none w-full"
            />
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 ml-4">
              <CryptoIcon symbol={toCoin} />
              <select
                value={toCoin}
                onChange={(e) => setToCoin(e.target.value)}
                className="bg-white font-medium outline-none cursor-pointer text-gray-900"
              >
                {coins.map((coin) => (
                  <option key={coin.symbol} value={coin.symbol}>
                    {coin.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {fromAmount && (
        <div className="bg-blue-50 rounded-lg p-4 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price</span>
            <span className="font-medium">
              1 {fromCoin} = {mockPrice.toFixed(2)} {toCoin}
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
            <span className="font-medium">{fee} {fromCoin}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Minimum Received</span>
            <span className="font-medium">
              {(parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6)} {toCoin}
            </span>
          </div>
        </div>
      )}

      {parseFloat(priceImpact) > 1 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <p className="text-sm text-amber-800">
            Price impact is high. Consider splitting your trade into smaller amounts.
          </p>
        </div>
      )}

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

      <p className="text-xs text-center text-gray-500 mt-4">
        Connected to Aequitas DEX • Network: Aequitas Zone • $REPAR is the native coin
      </p>
    </div>
  );
}
