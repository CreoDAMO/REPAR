
import { useState } from 'react';
import { Wallet, Info, AlertCircle, CheckCircle } from 'lucide-react';

const WalletConnect = ({ onWalletConnected }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');

  const connectKeplr = async () => {
    if (!window.keplr) {
      setShowInfo(true);
      return;
    }

    setConnecting(true);
    try {
      // Suggest Aequitas chain to Keplr
      await window.keplr.experimentalSuggestChain({
        chainId: 'aequitas-1',
        chainName: 'Aequitas Protocol',
        rpc: import.meta.env.VITE_COSMOS_RPC_URL || 'http://0.0.0.0:26657',
        rest: import.meta.env.VITE_COSMOS_API_URL || 'http://0.0.0.0:1317',
        bip44: {
          coinType: 118,
        },
        bech32Config: {
          bech32PrefixAccAddr: 'repar',
          bech32PrefixAccPub: 'reparpub',
          bech32PrefixValAddr: 'reparvaloper',
          bech32PrefixValPub: 'reparvaloperpub',
          bech32PrefixConsAddr: 'reparvalcons',
          bech32PrefixConsPub: 'reparvalconspub',
        },
        currencies: [
          {
            coinDenom: 'REPAR',
            coinMinimalDenom: 'urepar',
            coinDecimals: 6,
            coinGeckoId: 'aequitas-repar',
          },
        ],
        feeCurrencies: [
          {
            coinDenom: 'REPAR',
            coinMinimalDenom: 'urepar',
            coinDecimals: 6,
            coinGeckoId: 'aequitas-repar',
            gasPriceStep: {
              low: 0.01,
              average: 0.025,
              high: 0.04,
            },
          },
        ],
        stakeCurrency: {
          coinDenom: 'REPAR',
          coinMinimalDenom: 'urepar',
          coinDecimals: 6,
          coinGeckoId: 'aequitas-repar',
        },
      });

      // Enable the chain
      await window.keplr.enable('aequitas-1');

      // Get the offline signer
      const offlineSigner = window.keplr.getOfflineSigner('aequitas-1');
      const accounts = await offlineSigner.getAccounts();

      setAddress(accounts[0].address);
      setConnected(true);
      
      if (onWalletConnected) {
        onWalletConnected({
          address: accounts[0].address,
          wallet: 'keplr',
        });
      }
    } catch (error) {
      console.error('Keplr connection failed:', error);
      setShowInfo(true);
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setAddress('');
  };

  if (connected) {
    return (
      <div className="flex items-center gap-2">
        <div className="bg-green-900/30 border border-green-500/50 rounded-md px-3 py-2 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <span className="text-sm text-green-300 font-mono">
            {address.slice(0, 10)}...{address.slice(-8)}
          </span>
        </div>
        <button
          onClick={disconnectWallet}
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={connectKeplr}
        disabled={connecting}
        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-semibold flex items-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wallet className="h-4 w-4" />
        <span>{connecting ? 'Connecting...' : 'Connect Keplr'}</span>
      </button>
      
      {showInfo && (
        <div className="absolute right-0 top-full mt-2 bg-slate-800 border border-amber-500/50 rounded-lg p-4 shadow-xl z-50 w-96">
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-2">Keplr Wallet Required</h4>
              <p className="text-sm text-slate-300 mb-3">
                Aequitas Protocol is a <span className="text-amber-400">native Cosmos SDK blockchain</span>.
              </p>
              <div className="text-sm text-slate-400 space-y-2 mb-3">
                <p><strong className="text-white">To connect:</strong></p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Install <a href="https://www.keplr.app/download" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">Keplr Wallet</a></li>
                  <li>Create or import your wallet</li>
                  <li>Click "Connect Keplr" above</li>
                  <li>Approve the Aequitas chain connection</li>
                </ol>
              </div>
              <div className="text-xs text-slate-500 border-t border-slate-700 pt-2">
                <p><strong className="text-slate-400">Coming Soon:</strong></p>
                <p>• Ethermint integration for EVM wallets</p>
                <p>• Coinbase Wallet & MetaMask support</p>
                <p>• Multi-signature treasury wallets</p>
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
