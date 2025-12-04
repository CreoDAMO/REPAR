// Keplr Integration for Aequitas Mainnet
// Add Aequitas mainnet to Keplr wallet

export async function addAequitasMainnetToKeplr() {
  if (!window.keplr) {
    alert('Please install Keplr extension');
    window.open('https://www.keplr.app/download', '_blank');
    return false;
  }

  // CRITICAL: Uses "repar" denom (NOT "urepar") with 0 decimals to match genesis
  const chainConfig = {
    chainId: 'aequitas-1',
    chainName: 'Aequitas Zone',
    rpc: 'https://rpc.aequitasprotocol.zone',
    rest: 'https://api.aequitasprotocol.zone',
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
        coinGeckoId: 'repar',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'REPAR',
        coinMinimalDenom: 'repar',
        coinDecimals: 0,
        coinGeckoId: 'repar',
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
      coinGeckoId: 'repar',
    },
    features: ['ibc-transfer', 'ibc-go', 'cosmwasm'],
  };

  try {
    await window.keplr.experimentalSuggestChain(chainConfig);
    await window.keplr.enable(chainConfig.chainId);
    console.log('✅ Aequitas Mainnet added to Keplr successfully');
    return true;
  } catch (error) {
    console.error('❌ Error adding Aequitas Mainnet to Keplr:', error);
    alert('Failed to add Aequitas Mainnet to Keplr: ' + error.message);
    return false;
  }
}

// Export for use in HTML
if (typeof window !== 'undefined') {
  window.addAequitasMainnetToKeplr = addAequitasMainnetToKeplr;
}
