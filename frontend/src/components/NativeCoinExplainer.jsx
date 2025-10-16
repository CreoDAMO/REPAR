
import React from 'react';
import { Coins, Shield, Zap } from 'lucide-react';

export default function NativeCoinExplainer() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
        <Coins className="mr-2" />
        $REPAR: Native Coin, Not a Token
      </h2>
      
      <div className="grid md:grid-cols-3 gap-4 text-white">
        <div className="bg-white/10 rounded-lg p-4">
          <Shield className="text-green-400 mb-2" size={32} />
          <h3 className="font-bold mb-2">Sovereign Blockchain</h3>
          <p className="text-sm text-gray-300">
            $REPAR is the native coin of Aequitas Zone (Layer-1), just like BTC is Bitcoin, ETH is Ethereum, or ATOM is Cosmos Hub
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <Zap className="text-yellow-400 mb-2" size={32} />
          <h3 className="font-bold mb-2">Lightning Network</h3>
          <p className="text-sm text-gray-300">
            Instant, low-fee transfers via Lightning Network integration through Coinbase SDK for native coin swaps
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <Coins className="text-blue-400 mb-2" size={32} />
          <h3 className="font-bold mb-2">Native DEX Trading</h3>
          <p className="text-sm text-gray-300">
            Trade $REPAR directly with BTC, ETH, SOL, POL and other major native coins - no wrapped tokens needed
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-amber-500/20 rounded-lg border border-amber-500/50">
        <p className="text-sm text-amber-200">
          <strong>Key Difference:</strong> Tokens exist ON a blockchain (like ERC-20 on Ethereum). 
          Native coins ARE the blockchain itself. $REPAR powers every transaction on Aequitas Zone.
        </p>
      </div>
    </div>
  );
}
