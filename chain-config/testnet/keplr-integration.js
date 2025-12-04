/**
 * Keplr Integration for Aequitas Testnet
 * 
 * DENOMINATION: urepar (micro-REPAR) is the base unit, REPAR is display unit
 * 1 REPAR = 1,000,000 urepar (6 decimals)
 * 
 * ECONOMICS: 100% deflationary - burns only, no minting
 * Genesis value: $18.33/REPAR, 1:1 peg when burned
 */

export async function addAequitasTestnetToKeplr() {
  if (!window.keplr) {
    alert('Please install Keplr extension');
    window.open('https://www.keplr.app/download', '_blank');
    return false;
  }

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
        coinMinimalDenom: 'urepar',
        coinDecimals: 6,
        coinGeckoId: 'repar-testnet',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'REPAR',
        coinMinimalDenom: 'urepar',
        coinDecimals: 6,
        coinGeckoId: 'repar-testnet',
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
      coinGeckoId: 'repar-testnet',
    },
    features: ['ibc-transfer', 'ibc-go', 'cosmwasm'],
  };

  try {
    await window.keplr.experimentalSuggestChain(chainConfig);
    await window.keplr.enable(chainConfig.chainId);
    console.log('Aequitas Testnet added to Keplr successfully');
    return true;
  } catch (error) {
    console.error('Error adding Aequitas Testnet to Keplr:', error);
    alert('Failed to add Aequitas Testnet to Keplr: ' + error.message);
    return false;
  }
}

if (typeof window !== 'undefined') {
  window.addAequitasTestnetToKeplr = addAequitasTestnetToKeplr;
}
