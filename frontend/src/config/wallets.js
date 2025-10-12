export const FOUNDER_WALLETS = {
  layer1: {
    name: "Layer 1 - EVM Compatible",
    description: "Coinbase & MetaMask",
    address: "0x67BF9f428d92704C3Db3a08dC05Bc941A8647866",
    type: "ethereum",
    networks: ["Ethereum", "Polygon", "BSC"],
    status: "active"
  },
  layer2: {
    name: "Layer 2 - Cosmos Native",
    description: "Keplr & Leap Wallet",
    address: "cosmos1m230vduqyd4p07lwnqd78a6r5uyuvs74gj7xul",
    type: "cosmos",
    networks: ["Cosmos Hub", "Aequitas Zone"],
    status: "active"
  },
  layer3: {
    name: "Layer 3 - Multi-Signature",
    description: "Enhanced Security",
    address: "Pending Setup",
    type: "multisig",
    networks: ["Cosmos", "Ethereum"],
    status: "pending",
    signers: "3-of-5 configuration"
  },
  layer4: {
    name: "Layer 4 - Hardware Wallet",
    description: "Cold Storage",
    address: "Coming Soon",
    type: "hardware",
    networks: ["All Networks"],
    status: "planned",
    devices: ["Ledger Nano X", "Trezor Model T"]
  }
};

export const FOUNDER_ALLOCATION = {
  total: "13100000000000",
  immediate: "1310000000000",
  vested: "11790000000000",
  vestingPeriod: "5 years",
  cliff: "1 year"
};
