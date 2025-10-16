
// Real-time cryptocurrency price feeds
const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price';
const COINMARKETCAP_API = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';

// Map of token symbols to CoinGecko IDs
const COINGECKO_IDS = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'SOL': 'solana',
  'POL': 'matic-network',
  'AVAX': 'avalanche-2',
  'ATOM': 'cosmos',
};

// Fixed prices for Aequitas native coin and stablecoins
const FIXED_PRICES = {
  'REPAR': 18.33, // Aequitas native coin
  'USDC': 1.00,
  'USDT': 1.00,
  'DAI': 1.00,
};

export const fetchCryptoPrices = async () => {
  try {
    const ids = Object.values(COINGECKO_IDS).join(',');
    const response = await fetch(
      `${COINGECKO_API}?ids=${ids}&vs_currencies=usd`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch prices');
    }
    
    const data = await response.json();
    
    const prices = { ...FIXED_PRICES };
    
    // Map CoinGecko data to our token symbols
    Object.entries(COINGECKO_IDS).forEach(([symbol, id]) => {
      if (data[id]?.usd) {
        prices[symbol] = data[id].usd;
      }
    });
    
    return prices;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    // Return default prices on error
    return {
      ...FIXED_PRICES,
      'BTC': 95000,
      'ETH': 3500,
      'SOL': 140,
      'POL': 0.85,
      'AVAX': 42,
      'ATOM': 9.5,
    };
  }
};

export const useCryptoPrices = () => {
  const [prices, setPrices] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const updatePrices = async () => {
      try {
        setIsLoading(true);
        const newPrices = await fetchCryptoPrices();
        setPrices(newPrices);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    updatePrices();
    
    // Update prices every 30 seconds
    const interval = setInterval(updatePrices, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { prices, isLoading, error };
};

export default {
  fetchCryptoPrices,
  useCryptoPrices,
  FIXED_PRICES,
};
