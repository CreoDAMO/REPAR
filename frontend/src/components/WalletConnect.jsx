import { useState } from 'react';
import { Wallet, Info, AlertCircle } from 'lucide-react';

// Coinbase Wallet requires Ethereum-compatible JSON-RPC endpoint
// Aequitas Protocol is a native Cosmos SDK blockchain (not EVM-compatible)
// Wallet integration requires either:
// 1. Keplr Wallet (Cosmos native) - RECOMMENDED
// 2. Ethermint module + EVM compatibility layer for Coinbase support

const WalletConnect = ({ onWalletConnected }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleWalletClick = () => {
    setShowInfo(true);
  };

  return (
    <div className="relative">
      <button
        onClick={handleWalletClick}
        className="bg-slate-700 text-slate-400 px-4 py-2 rounded-md font-semibold flex items-center space-x-2 cursor-help border-2 border-slate-600 transition-all hover:border-amber-500/50"
      >
        <Wallet className="h-4 w-4" />
        <span>Wallet (Coming Soon)</span>
        <Info className="h-4 w-4" />
      </button>
      
      {showInfo && (
        <div className="absolute right-0 top-full mt-2 bg-slate-800 border border-amber-500/50 rounded-lg p-4 shadow-xl z-50 w-80">
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-1">Wallet Integration Status</h4>
              <p className="text-sm text-slate-300 mb-2">
                Aequitas Protocol is a <span className="text-amber-400">native Cosmos SDK blockchain</span>, not EVM-compatible.
              </p>
              <div className="text-xs text-slate-400 space-y-1">
                <p><strong className="text-white">Coming Soon:</strong></p>
                <p>• Keplr Wallet (Cosmos native)</p>
                <p>• Ethermint integration for EVM wallets</p>
                <p>• Coinbase Wallet support</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowInfo(false)}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white text-sm py-2 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
