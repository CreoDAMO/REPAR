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
  // Founder Allocation: 10% (13.1T REPAR)
  founderTotal: "13100000000000",
  founderVested: "11790000000000", // 9% vested over 4 years
  founderDiscretionary: "1310000000000", // 1% immediate access
  
  // Development Fund: 8% (10.48T REPAR)
  devTotal: "10480000000000",
  devEndowment: "7860000000000", // 6% locked for 8 years (renewable)
  devDiscretionary: "2620000000000", // 2% immediate access
  
  // Total Control: 18% (23.58T REPAR)
  totalControl: "23580000000000",
  totalImmediate: "3930000000000", // 3% immediate (1% + 2%)
  
  vestingPeriod: "4 years",
  endowmentPeriod: "8 years (renewable)"
};
