
import { useState, useEffect } from 'react';
import { Wallet, CheckCircle, XCircle } from 'lucide-react';

const WalletConnect = ({ onWalletConnected }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  // Coinbase Wallet SDK initialization (mocked for now, will add SDK)
  const connectCoinbaseWallet = async () => {
    try {
      setError('');
      
      // TODO: Replace with actual Coinbase SDK
      // For now, simulate connection
      const mockAddress = 'cosmos1' + Math.random().toString(36).substring(2, 15);
      
      setAddress(mockAddress);
      setIsConnected(true);
      
      if (onWalletConnected) {
        onWalletConnected(mockAddress);
      }
    } catch (err) {
      setError('Failed to connect wallet: ' + err.message);
    }
  };

  const disconnectWallet = () => {
    setAddress('');
    setIsConnected(false);
    if (onWalletConnected) {
      onWalletConnected(null);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      {!isConnected ? (
        <button
          onClick={connectCoinbaseWallet}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Wallet size={20} />
          Connect Coinbase Wallet
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              <span className="text-sm font-medium">Connected</span>
            </div>
            <button
              onClick={disconnectWallet}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Disconnect
            </button>
          </div>
          <div className="bg-slate-900 rounded p-2">
            <p className="text-xs text-slate-400 mb-1">Address</p>
            <p className="text-sm font-mono truncate">{address}</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
          <XCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
