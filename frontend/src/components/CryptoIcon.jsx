import { useState } from 'react';
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
  const [imageError, setImageError] = useState(false);

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
    if (imageError) {
      return (
        <div className={`${className} bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xs`}>
          R
        </div>
      );
    }
    return (
      <img 
        src={reparLogo} 
        alt={symbol} 
        className={`${className} rounded-full object-cover`}
        onError={() => setImageError(true)}
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
  if (Icon && typeof Icon === 'function') {
    try {
      return <Icon className={className} />;
    } catch (error) {
      console.warn(`Failed to render cryptocons icon for ${symbol}:`, error);
      // Fallback to letter
      return (
        <div className={`${className} bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs`}>
          {symbol ? symbol.charAt(0) : '?'}
        </div>
      );
    }
  }

  // Fallback for any unknown symbols
  return (
    <div className={`${className} bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-xs`}>
      {symbol ? symbol.charAt(0) : '?'}
    </div>
  );
};

export default CryptoIcon;
