/**
 * Aequitas Protocol - Keplr Wallet Integration
 * 
 * This script allows users to add Aequitas Zone to their Keplr wallet
 * with a single click. Use this for Cosmos-based blockchain integration.
 * 
 * NOTE: MetaMask is for EVM chains only. Aequitas is a Cosmos SDK chain,
 * so it requires Keplr wallet.
 */

// Aequitas Zone Configuration for Keplr
const aequitasChainConfig = {
  chainId: "aequitas-1",
  chainName: "Aequitas Zone",
  rpc: "http://localhost:26657",  // Update with your production RPC
  rest: "http://localhost:1317",  // Update with your production REST API
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "aequitas",
    bech32PrefixAccPub: "aequitaspub",
    bech32PrefixValAddr: "aequitasvaloper",
    bech32PrefixValPub": "aequitasvaloperpub",
    bech32PrefixConsAddr: "aequitasvalcons",
    bech32PrefixConsPub: "aequitasvalconspub"
  },
  currencies: [
    {
      coinDenom: "REPAR",
      coinMinimalDenom: "urepar",
      coinDecimals: 6,
      coinGeckoId: "aequitas-repar", // Update when listed on CoinGecko
    }
  ],
  feeCurrencies: [
    {
      coinDenom: "REPAR",
      coinMinimalDenom: "urepar",
      coinDecimals: 6,
      coinGeckoId: "aequitas-repar",
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04
      }
    }
  ],
  stakeCurrency: {
    coinDenom: "REPAR",
    coinMinimalDenom: "urepar",
    coinDecimals: 6,
    coinGeckoId: "aequitas-repar"
  },
  features: ["ibc-transfer", "ibc-go"],
  // Optional: Add explorer URL when available
  // explorerUrl: "https://explorer.aequitas.zone"
};

/**
 * Add Aequitas Zone to Keplr Wallet
 * Call this function when user clicks "Add to Keplr" button
 */
async function addAequitasToKeplr() {
  if (!window.keplr) {
    alert("Please install Keplr wallet extension!");
    window.open("https://www.keplr.app/download", "_blank");
    return;
  }

  try {
    // Suggest chain to Keplr
    await window.keplr.experimentalSuggestChain(aequitasChainConfig);
    
    // Enable the chain
    await window.keplr.enable(aequitasChainConfig.chainId);
    
    console.log("Aequitas Zone successfully added to Keplr!");
    alert("Aequitas Zone has been added to your Keplr wallet!");
    
    // Get the user's address
    const offlineSigner = window.keplr.getOfflineSigner(aequitasChainConfig.chainId);
    const accounts = await offlineSigner.getAccounts();
    console.log("Your Aequitas address:", accounts[0].address);
    
    return accounts[0].address;
  } catch (error) {
    console.error("Failed to add Aequitas to Keplr:", error);
    alert("Failed to add chain to Keplr. Please try again.");
  }
}

/**
 * Check if Keplr is connected to Aequitas
 */
async function checkKeplrConnection() {
  if (!window.keplr) {
    return false;
  }

  try {
    await window.keplr.enable("aequitas-1");
    return true;
  } catch {
    return false;
  }
}

// Export for use in React/Vue/etc
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    aequitasChainConfig,
    addAequitasToKeplr,
    checkKeplrConnection
  };
}
