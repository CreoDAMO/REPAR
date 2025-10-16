import React, { useEffect, useState } from 'react';
import { initOnRamp } from '@coinbase/cbpay-js';
import { DollarSign, CreditCard, Wallet, Check } from 'lucide-react';

const Onramper = () => {
  const [onrampInstance, setOnrampInstance] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState('REPAR');
  const [amount, setAmount] = useState('100');

  useEffect(() => {
    initOnRamp(
      {
        appId: import.meta.env.VITE_COINBASE_APP_ID || 'aequitas-protocol',
        widgetParameters: {
          addresses: { 
            'cosmos1': ['cosmos'],
          },
          assets: ['ATOM', 'USDC', 'ETH'],
          defaultAsset: 'ATOM',
          defaultNetwork: 'cosmos',
          defaultPaymentMethod: 'CARD',
          presetFiatAmount: parseInt(amount) || 100,
          fiatCurrency: 'USD',
        },
        onSuccess: (event) => { 
          console.log('Onramp success:', event);
        },
        onExit: (event) => { 
          console.log('Onramp exit:', event); 
        },
        onEvent: (event) => { 
          console.log('Onramp event:', event); 
        },
        experienceLoggedIn: 'popup',
        experienceLoggedOut: 'popup',
        closeOnExit: true,
        closeOnSuccess: true,
      },
      (error, instance) => {
        if (error) {
          console.error('Onramp initialization error:', error);
          return;
        }
        setOnrampInstance(instance);
        setIsReady(true);
      }
    );

    return () => {
      onrampInstance?.destroy();
    };
  }, [amount]);

  const handleBuyClick = () => {
    if (onrampInstance && isReady) {
      onrampInstance.open();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
            Buy $REPAR with Fiat
          </h1>
          <p className="text-xl text-gray-300">
            Purchase $REPAR directly using credit card, debit card, bank transfer, or PayPal
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Powered by Coinbase OnRamp • 110M+ Users • 100+ Tokens • 60+ Fiat Currencies
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <DollarSign className="mr-3" />
              How It Works
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold mb-1">Connect Your Wallet</h3>
                  <p className="text-gray-300 text-sm">Connect your Keplr or Coinbase Wallet to receive $REPAR</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold mb-1">Choose Payment Method</h3>
                  <p className="text-gray-300 text-sm">Select from credit card, bank transfer, Apple Pay, Google Pay, or PayPal</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold mb-1">Buy ATOM on Coinbase</h3>
                  <p className="text-gray-300 text-sm">Purchase ATOM using fiat currency through Coinbase</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold mb-1">Auto-Swap to $REPAR</h3>
                  <p className="text-gray-300 text-sm">ATOM is transferred via IBC to Aequitas Zone and auto-swapped to $REPAR</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-bold mb-1">Receive $REPAR</h3>
                  <p className="text-gray-300 text-sm">$REPAR appears in your wallet, ready for staking or governance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <CreditCard className="mr-3" />
              Purchase $REPAR
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Amount (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 focus:border-yellow-500 focus:outline-none transition-colors"
                  placeholder="Enter amount"
                  min="10"
                  max="10000"
                />
                <p className="text-sm text-gray-400 mt-1">Minimum: $10 • Maximum: $10,000</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">You'll Receive (Estimated)</label>
                <div className="px-4 py-3 rounded-lg bg-black/30 border border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{((parseInt(amount) || 0) / 18.33).toFixed(2)} REPAR</span>
                    <span className="text-sm text-gray-400">@ $18.33/REPAR</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Route</label>
                <div className="text-sm text-gray-300 bg-black/20 p-3 rounded-lg">
                  USD → ATOM (Coinbase) → IBC Transfer → $REPAR (Aequitas DEX)
                </div>
              </div>
            </div>

            <button
              onClick={handleBuyClick}
              disabled={!isReady || !amount || parseInt(amount) < 10}
              className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 text-white font-bold py-4 px-6 rounded-lg hover:from-yellow-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
            >
              {!isReady ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                  Initializing Coinbase OnRamp...
                </>
              ) : (
                <>
                  <Wallet className="mr-2" />
                  Buy $REPAR with Coinbase
                </>
              )}
            </button>

            <div className="mt-4 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> Currently, you'll purchase ATOM on Coinbase, which will then be transferred to Aequitas Zone 
                via IBC and automatically swapped to $REPAR on our DEX. Native $REPAR fiat onramp coming soon!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold mb-6">Payment Methods Supported</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Credit Card',
              'Debit Card',
              'Bank Transfer',
              'Apple Pay',
              'Google Pay',
              'PayPal',
              'ACH Transfer',
              'SEPA Transfer'
            ].map((method) => (
              <div key={method} className="flex items-center p-3 bg-black/20 rounded-lg">
                <Check className="text-green-400 mr-2 flex-shrink-0" size={20} />
                <span className="text-sm">{method}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Powered by Coinbase OnRamp • Secure • Compliant • Global</p>
          <p className="mt-2">Available in all Coinbase-supported regions worldwide</p>
        </div>
      </div>
    </div>
  );
};

export default Onramper;
