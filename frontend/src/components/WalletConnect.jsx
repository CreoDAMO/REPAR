
import { useState, useEffect, useCallback } from 'react';
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import { LogOut, Wallet, CheckCircle, XCircle } from 'lucide-react';

const APP_NAME = 'Aequitas Protocol';
const APP_LOGO_URL = 'https://raw.githubusercontent.com/CreoDAMO/REPAR/main/frontend/public/favicon.ico';
const CHAIN_ID = 9000;
const RPC_URL = 'http://0.0.0.0:26657';

const WalletConnect = ({ onWalletConnected }) => {
  const [sdk, setSdk] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const coinbaseWalletSDK = new CoinbaseWalletSDK({
      appName: APP_NAME,
      appLogoUrl: APP_LOGO_URL,
    });
    const provider = coinbaseWalletSDK.makeWeb3Provider({
      options: 'smartWalletOnly',
      chainId: CHAIN_ID,
      jsonRpcUrl: RPC_URL
    });
    setSdk(provider);
  }, []);

  const connectWallet = useCallback(async () => {
    if (!sdk) return;
    try {
      setError('');
      const accounts = await sdk.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      setAddress(userAddress);
      if (onWalletConnected) {
        onWalletConnected(userAddress);
      }
    } catch (err) {
      console.error("Wallet connection failed:", err);
      setError("Connection failed. Please try again.");
    }
  }, [sdk, onWalletConnected]);

  const disconnectWallet = () => {
    if (sdk?.close) {
      sdk.close();
    }
    setAddress(null);
    if (onWalletConnected) {
      onWalletConnected(null);
    }
  };

  if (address) {
    return (
      <div className="flex items-center space-x-3 bg-slate-700 p-2 rounded-lg">
        <div className="flex items-center space-x-2 bg-green-500/20 text-green-300 px-3 py-1 rounded-md">
          <Wallet size={16} />
          <span className="font-mono text-sm">
            {`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
          </span>
        </div>
        <button onClick={disconnectWallet} className="p-2 hover:bg-slate-600 rounded-md transition-colors">
          <LogOut size={18} className="text-slate-300" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      <button
        onClick={connectWallet}
        className="w-full bg-orange-600 hover:bg-orange-500 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
      >
        <Wallet size={20} />
        Connect Coinbase Wallet
      </button>
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
