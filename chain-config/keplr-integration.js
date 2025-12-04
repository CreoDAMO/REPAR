/**
 * Aequitas Protocol - Keplr Wallet Integration
 * 
 * This script allows users to add Aequitas Zone to their Keplr wallet
 * with a single click. Use this for Cosmos-based blockchain integration.
 * 
 * DENOMINATION: urepar (micro-REPAR) is the base unit, REPAR is display unit
 * 1 REPAR = 1,000,000 urepar (6 decimals)
 * 
 * ECONOMICS: 100% deflationary - burns only, no minting
 * Genesis value: $18.33/REPAR, 1:1 peg when burned
 */

const aequitasChainConfig = {
  chainId: "aequitas-1",
  chainName: "Aequitas Zone",
  rpc: "https://rpc.aequitasprotocol.zone",
  rest: "https://api.aequitasprotocol.zone",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "repar",
    bech32PrefixAccPub: "reparpub",
    bech32PrefixValAddr: "reparvaloper",
    bech32PrefixValPub: "reparvaloperpub",
    bech32PrefixConsAddr: "reparvalcons",
    bech32PrefixConsPub: "reparvalconspub"
  },
  currencies: [
    {
      coinDenom: "REPAR",
      coinMinimalDenom: "urepar",
      coinDecimals: 6,
      coinGeckoId: "repar",
    }
  ],
  feeCurrencies: [
    {
      coinDenom: "REPAR",
      coinMinimalDenom: "urepar",
      coinDecimals: 6,
      coinGeckoId: "repar",
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
    coinGeckoId: "repar"
  },
  features: ["ibc-transfer", "ibc-go", "cosmwasm"],
  explorerUrl: "https://explorer.aequitasprotocol.zone"
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
    await window.keplr.experimentalSuggestChain(aequitasChainConfig);
    await window.keplr.enable(aequitasChainConfig.chainId);
    
    console.log("Aequitas Zone successfully added to Keplr!");
    alert("Aequitas Zone has been added to your Keplr wallet!");
    
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    aequitasChainConfig,
    addAequitasToKeplr,
    checkKeplrConnection
  };
}
