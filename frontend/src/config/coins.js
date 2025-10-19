
// Centralized coin configuration for Aequitas Protocol
import btcLogo from '../assets/btc-logo.jpg';
import ethLogo from '../assets/eth-logo.jpg';
import solLogo from '../assets/sol-logo.jpg';
import avaxLogo from '../assets/avax-logo.jpg';
import atomLogo from '../assets/atom-logo.jpg';
import polLogo from '../assets/pol-logo.jpg';
import usdcLogo from '../assets/usdc-logo.jpg';
import reparLogo from '../assets/REPAR_Coin_Logo.png';

// All 15 coins in the Aequitas ecosystem
export const COINS = [
  {
    id: 'REPAR',
    name: 'REPAR',
    symbol: 'REPAR',
    logo: reparLogo,
    isNative: true,
    decimals: 6,
    description: 'Native coin of Aequitas Protocol Blockchain'
  },
  {
    id: 'BTC',
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: btcLogo,
    decimals: 8,
    description: 'Bitcoin'
  },
  {
    id: 'ETH',
    name: 'Ethereum',
    symbol: 'ETH',
    logo: ethLogo,
    decimals: 18,
    description: 'Ethereum'
  },
  {
    id: 'SOL',
    name: 'Solana',
    symbol: 'SOL',
    logo: solLogo,
    decimals: 9,
    description: 'Solana'
  },
  {
    id: 'AVAX',
    name: 'Avalanche',
    symbol: 'AVAX',
    logo: avaxLogo,
    decimals: 18,
    description: 'Avalanche'
  },
  {
    id: 'ATOM',
    name: 'Cosmos',
    symbol: 'ATOM',
    logo: atomLogo,
    decimals: 6,
    description: 'Cosmos Hub'
  },
  {
    id: 'POL',
    name: 'Polygon',
    symbol: 'POL',
    logo: polLogo,
    decimals: 18,
    description: 'Polygon'
  },
  {
    id: 'USDC',
    name: 'USD Coin',
    symbol: 'USDC',
    logo: usdcLogo,
    decimals: 6,
    description: 'USD Coin'
  },
  {
    id: 'BNB',
    name: 'BNB',
    symbol: 'BNB',
    logo: btcLogo, // Replace with actual BNB logo
    decimals: 18,
    description: 'BNB Chain'
  },
  {
    id: 'ADA',
    name: 'Cardano',
    symbol: 'ADA',
    logo: atomLogo, // Replace with actual ADA logo
    decimals: 6,
    description: 'Cardano'
  },
  {
    id: 'DOT',
    name: 'Polkadot',
    symbol: 'DOT',
    logo: polLogo, // Replace with actual DOT logo
    decimals: 10,
    description: 'Polkadot'
  },
  {
    id: 'MATIC',
    name: 'Polygon',
    symbol: 'MATIC',
    logo: polLogo,
    decimals: 18,
    description: 'Polygon (Legacy)'
  },
  {
    id: 'LINK',
    name: 'Chainlink',
    symbol: 'LINK',
    logo: ethLogo, // Replace with actual LINK logo
    decimals: 18,
    description: 'Chainlink'
  },
  {
    id: 'UNI',
    name: 'Uniswap',
    symbol: 'UNI',
    logo: ethLogo, // Replace with actual UNI logo
    decimals: 18,
    description: 'Uniswap'
  },
  {
    id: 'USDT',
    name: 'Tether',
    symbol: 'USDT',
    logo: usdcLogo, // Replace with actual USDT logo
    decimals: 6,
    description: 'Tether USD'
  }
];

// Get coin by symbol
export const getCoinBySymbol = (symbol) => {
  return COINS.find(coin => coin.symbol === symbol);
};

// Get all trading pairs with REPAR
export const getREPARPairs = () => {
  return COINS.filter(coin => !coin.isNative);
};

// Get coin logo safely
export const getCoinLogo = (symbol) => {
  const coin = getCoinBySymbol(symbol);
  return coin?.logo || reparLogo;
};

export default COINS;
