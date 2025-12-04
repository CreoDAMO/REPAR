// Keplr Integration for Aequitas Testnet
// Add Aequitas testnet to Keplr wallet

export async function addAequitasTestnetToKeplr() {
  if (!window.keplr) {
    alert('Please install Keplr extension');
    window.open('https://www.keplr.app/download', '_blank');
    return false;
  }

  // CRITICAL: Uses "repar" denom (NOT "urepar") with 0 decimals to match genesis
  const chainConfig = {
    chainId: 'aequitas-testnet-1',
    chainName: 'Aequitas Testnet',
    rpc: 'https://rpc-testnet.aequitasprotocol.zone',
    rest: 'https://api-testnet.aequitasprotocol.zone',
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
        coinMinimalDenom: 'repar',
        coinDecimals: 0,
        coinGeckoId: 'repar-testnet',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'REPAR',
        coinMinimalDenom: 'repar',
        coinDecimals: 0,
        coinGeckoId: 'repar-testnet',
        gasPriceStep: {
          low: 1,
          average: 10,
          high: 100,
        },
      },
    ],
    stakeCurrency: {
      coinDenom: 'REPAR',
      coinMinimalDenom: 'repar',
      coinDecimals: 0,
      coinGeckoId: 'repar-testnet',
    },
    features: ['ibc-transfer', 'ibc-go', 'cosmwasm'],
  };

  try {
    await window.keplr.experimentalSuggestChain(chainConfig);
    await window.keplr.enable(chainConfig.chainId);
    console.log('✅ Aequitas Testnet added to Keplr successfully');
    return true;
  } catch (error) {
    console.error('❌ Error adding Aequitas Testnet to Keplr:', error);
    alert('Failed to add Aequitas Testnet to Keplr: ' + error.message);
    return false;
  }
}

// Export for use in HTML
if (typeof window !== 'undefined') {
  window.addAequitasTestnetToKeplr = addAequitasTestnetToKeplr;
}
