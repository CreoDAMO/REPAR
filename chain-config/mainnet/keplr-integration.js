// Keplr Integration for Aequitas Mainnet
// Add Aequitas mainnet to Keplr wallet

export async function addAequitasMainnetToKeplr() {
  if (!window.keplr) {
    alert('Please install Keplr extension');
    window.open('https://www.keplr.app/download', '_blank');
    return false;
  }

  const chainConfig = {
    chainId: 'aequitas-1',
    chainName: 'Aequitas Zone',
    rpc: 'http://localhost:26657',
    rest: 'http://localhost:1317',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'aequitas',
      bech32PrefixAccPub: 'aequitaspub',
      bech32PrefixValAddr: 'aequitasvaloper',
      bech32PrefixValPub: 'aequitasvaloperpub',
      bech32PrefixConsAddr: 'aequitasvalcons',
      bech32PrefixConsPub: 'aequitasvalconspub',
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
    features: ['ibc-transfer', 'ibc-go'],
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
