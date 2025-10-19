import CryptoIcon from '../components/CryptoIcon';

export default function IconTest() {
  const coins = [
    'REPAR', 'BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'AVAX', 
    'DOT', 'POL', 'ATOM', 'XRP', 'DOGE', 'TRX', 'LINK', 'USDC'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6">Crypto Icon Test</h1>
        <p className="text-gray-600 mb-8">
          Testing all cryptocurrency icons to ensure they render correctly without black screens.
        </p>
        
        <div className="grid grid-cols-5 gap-6">
          {coins.map((symbol) => (
            <div key={symbol} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <CryptoIcon symbol={symbol} className="w-16 h-16 mb-3" />
              <span className="font-medium text-sm">{symbol}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">
            ✓ If you can see all icons above without any black screens or errors, the fix is working!
          </p>
        </div>
      </div>
    </div>
  );
}
