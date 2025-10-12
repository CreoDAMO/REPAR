
import { useState, useEffect } from 'react';
import { Wallet, Info, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const WalletConnect = ({ onWalletConnected }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [walletType, setWalletType] = useState('');
  const [coinbaseWallet, setCoinbaseWallet] = useState(null);

  useEffect(() => {
    // Initialize Coinbase Wallet SDK
    const coinbaseWalletSDK = new CoinbaseWalletSDK({
      appName: 'Aequitas Protocol',
      appLogoUrl: 'https://example.com/logo.png', // Add your logo URL
      darkMode: true
    });

    const ethereum = coinbaseWalletSDK.makeWeb3Provider(
      import.meta.env.VITE_COSMOS_RPC_URL || 'http://0.0.0.0:26657',
      1 // Chain ID - update as needed
    );

    setCoinbaseWallet(ethereum);
  }, []);

  const connectCoinbase = async () => {
    if (!coinbaseWallet) {
      setShowInfo(true);
      return;
    }

    setConnecting(true);
    try {
      const accounts = await coinbaseWallet.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const evmAddress = accounts[0];
      setAddress(evmAddress);
      setWalletType('coinbase');
      setConnected(true);
      
      if (onWalletConnected) {
        onWalletConnected({
          address: evmAddress,
          wallet: 'coinbase',
        });
      }
    } catch (error) {
      console.error('Coinbase Wallet connection failed:', error);
      setShowInfo(true);
    } finally {
      setConnecting(false);
    }
  };

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      setShowInfo(true);
      return;
    }

    setConnecting(true);
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const evmAddress = accounts[0];
      setAddress(evmAddress);
      setWalletType('metamask');
      setConnected(true);
      
      if (onWalletConnected) {
        onWalletConnected({
          address: evmAddress,
          wallet: 'metamask',
        });
      }
    } catch (error) {
      console.error('MetaMask connection failed:', error);
      setShowInfo(true);
    } finally {
      setConnecting(false);
    }
  };

  const connectKeplr = async () => {
    if (!window.keplr) {
      setShowInfo(true);
      return;
    }

    setConnecting(true);
    try {
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

      await window.keplr.enable('aequitas-1');
      const offlineSigner = window.keplr.getOfflineSigner('aequitas-1');
      const accounts = await offlineSigner.getAccounts();

      setAddress(accounts[0].address);
      setWalletType('keplr');
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
    setWalletType('');
  };

  if (connected) {
    return (
      <div className="flex items-center gap-2">
        <div className="bg-green-900/30 border border-green-500/50 rounded-md px-3 py-2 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <span className="text-xs text-green-400 uppercase">{walletType}</span>
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
    <div className="relative flex gap-2">
      <button
        onClick={connectCoinbase}
        disabled={connecting}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold flex items-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wallet className="h-4 w-4" />
        <span>{connecting ? 'Connecting...' : 'Coinbase'}</span>
      </button>

      <button
        onClick={connectMetaMask}
        disabled={connecting}
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-semibold flex items-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wallet className="h-4 w-4" />
        <span>{connecting ? 'Connecting...' : 'MetaMask'}</span>
      </button>
      
      <button
        onClick={connectKeplr}
        disabled={connecting}
        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-semibold flex items-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wallet className="h-4 w-4" />
        <span>{connecting ? 'Connecting...' : 'Keplr'}</span>
      </button>
      
      {showInfo && (
        <div className="absolute right-0 top-full mt-2 bg-slate-800 border border-amber-500/50 rounded-lg p-4 shadow-xl z-50 w-96">
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-2">Multi-Wallet Setup</h4>
              <p className="text-sm text-slate-300 mb-3">
                Choose your preferred wallet for Aequitas Protocol access.
              </p>
              <div className="text-sm text-slate-400 space-y-3 mb-3">
                <div>
                  <p><strong className="text-blue-400">Coinbase Wallet:</strong></p>
                  <p className="ml-2">Best for US users, fiat on-ramp, institutional custody</p>
                </div>
                <div>
                  <p><strong className="text-orange-400">MetaMask:</strong></p>
                  <p className="ml-2">Popular EVM wallet, wide browser support</p>
                </div>
                <div>
                  <p><strong className="text-amber-400">Keplr (Recommended):</strong></p>
                  <p className="ml-2">Native Cosmos wallet, full protocol features</p>
                </div>
              </div>
              <div className="text-xs text-slate-500 border-t border-slate-700 pt-2">
                <p><strong className="text-slate-400">Note:</strong> EVM wallets require Ethermint module for full functionality.</p>
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
