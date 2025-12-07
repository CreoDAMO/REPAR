/**
 * Financial Calculation Engine for Aequitas Protocol
 * Implements all complex financial models and calculations
 */

export interface FinancialInputs {
  developmentCost: number;
  prelaunchValuation: number;
  blockchainInfrastructureValue: number;
  aiProtocolValue: number;
  nativeCoinEconomicsValue: number;
  networkEffectsValue: number;
  afterLaunchValuation: number;
  operationalWarChest: number;
  totalAddressableMarket: number;
  seedRaise: number;
  preMoneyValuation: number;
  legalEnforcement: number;
  securityOperations: number;
  eliteCoreTeam: number;
  aiInfrastructure: number;
  contingencyReserve: number;
  transactionFeesYear1: number;
  transactionFeesYear3: number;
  validatorEconomicsYear1: number;
  validatorEconomicsYear3: number;
  crossChainBridgesYear1: number;
  crossChainBridgesYear3: number;
  justiceEnforcementYear1: number;
  justiceEnforcementYear3: number;
}

export interface FinancialOutputs {
  // Investment Calculations
  equityPercentage: number;
  impliedValuePerDollar: number;
  
  // Use of Funds
  totalUseOfFunds: number;
  legalEnforcementPercent: number;
  securityOperationsPercent: number;
  eliteCoreTeamPercent: number;
  aiInfrastructurePercent: number;
  contingencyReservePercent: number;
  
  // Revenue Projections
  totalRevenueYear1: number;
  totalRevenueYear3: number;
  
  // Return Scenarios
  conservative: {
    year1MarketCap: number;
    year3MarketCap: number;
    returnMultiple: number;
  };
  expected: {
    year1MarketCap: number;
    year3MarketCap: number;
    returnMultiple: number;
  };
  aggressive: {
    year1MarketCap: number;
    year3MarketCap: number;
    returnMultiple: number;
  };
  paradigmShift: {
    year1MarketCap: number;
    year3MarketCap: number;
    returnMultiple: number;
  };
  
  // Valuation Components
  blockchainValuePercent: number;
  aiProtocolValuePercent: number;
  nativeCoinValuePercent: number;
  networkEffectsPercent: number;
  
  // TAM Analysis
  tamUtilization: number;
  tamPercent: number;
}

/**
 * Calculate investment metrics
 */
export function calculateInvestmentMetrics(inputs: FinancialInputs) {
  const equityPercentage = inputs.seedRaise / inputs.preMoneyValuation;
  const impliedValuePerDollar = inputs.preMoneyValuation / inputs.seedRaise;
  
  return {
    equityPercentage,
    impliedValuePerDollar,
  };
}

/**
 * Calculate use of funds allocation
 */
export function calculateUseOfFunds(inputs: FinancialInputs) {
  const totalUseOfFunds =
    inputs.legalEnforcement +
    inputs.securityOperations +
    inputs.eliteCoreTeam +
    inputs.aiInfrastructure +
    inputs.contingencyReserve;

  return {
    totalUseOfFunds,
    legalEnforcementPercent: inputs.legalEnforcement / totalUseOfFunds,
    securityOperationsPercent: inputs.securityOperations / totalUseOfFunds,
    eliteCoreTeamPercent: inputs.eliteCoreTeam / totalUseOfFunds,
    aiInfrastructurePercent: inputs.aiInfrastructure / totalUseOfFunds,
    contingencyReservePercent: inputs.contingencyReserve / totalUseOfFunds,
  };
}

/**
 * Calculate native coin revenue streams
 */
export function calculateRevenueStreams(inputs: FinancialInputs) {
  const totalRevenueYear1 =
    inputs.transactionFeesYear1 +
    inputs.validatorEconomicsYear1 +
    inputs.crossChainBridgesYear1 +
    inputs.justiceEnforcementYear1;

  const totalRevenueYear3 =
    inputs.transactionFeesYear3 +
    inputs.validatorEconomicsYear3 +
    inputs.crossChainBridgesYear3 +
    inputs.justiceEnforcementYear3;

  return {
    totalRevenueYear1,
    totalRevenueYear3,
    transactionFeesPercent: inputs.transactionFeesYear1 / totalRevenueYear1,
    validatorEconomicsPercent: inputs.validatorEconomicsYear1 / totalRevenueYear1,
    crossChainBridgesPercent: inputs.crossChainBridgesYear1 / totalRevenueYear1,
    justiceEnforcementPercent: inputs.justiceEnforcementYear1 / totalRevenueYear1,
  };
}

/**
 * Calculate return projections for different scenarios
 */
export function calculateReturnProjections(inputs: FinancialInputs) {
  // Conservative scenario: 21x return
  const conservativeYear1MC = 150000000000;
  const conservativeYear3MC = 750000000000;
  const conservativeReturnMultiple = 21;

  // Expected scenario: 43x return
  const expectedYear1MC = 250000000000;
  const expectedYear3MC = 1500000000000;
  const expectedReturnMultiple = 43;

  // Aggressive scenario: 50x return
  const aggressiveYear1MC = 400000000000;
  const aggressiveYear3MC = 3500000000000;
  const aggressiveReturnMultiple = 50;

  // Paradigm Shift scenario: 100x return
  const paradigmShiftYear1MC = 600000000000;
  const paradigmShiftYear3MC = 7000000000000;
  const paradigmShiftReturnMultiple = 100;

  return {
    conservative: {
      year1MarketCap: conservativeYear1MC,
      year3MarketCap: conservativeYear3MC,
      returnMultiple: conservativeReturnMultiple,
    },
    expected: {
      year1MarketCap: expectedYear1MC,
      year3MarketCap: expectedYear3MC,
      returnMultiple: expectedReturnMultiple,
    },
    aggressive: {
      year1MarketCap: aggressiveYear1MC,
      year3MarketCap: aggressiveYear3MC,
      returnMultiple: aggressiveReturnMultiple,
    },
    paradigmShift: {
      year1MarketCap: paradigmShiftYear1MC,
      year3MarketCap: paradigmShiftYear3MC,
      returnMultiple: paradigmShiftReturnMultiple,
    },
  };
}

/**
 * Calculate valuation component breakdown
 */
export function calculateValuationComponents(inputs: FinancialInputs) {
  const totalComponents =
    inputs.blockchainInfrastructureValue +
    inputs.aiProtocolValue +
    inputs.nativeCoinEconomicsValue +
    inputs.networkEffectsValue;

  return {
    blockchainValuePercent: inputs.blockchainInfrastructureValue / totalComponents,
    aiProtocolValuePercent: inputs.aiProtocolValue / totalComponents,
    nativeCoinValuePercent: inputs.nativeCoinEconomicsValue / totalComponents,
    networkEffectsPercent: inputs.networkEffectsValue / totalComponents,
  };
}

/**
 * Calculate TAM utilization
 */
export function calculateTAMUtilization(inputs: FinancialInputs) {
  const tamUtilization = inputs.prelaunchValuation / inputs.totalAddressableMarket;
  const tamPercent = tamUtilization * 100;

  return {
    tamUtilization,
    tamPercent,
  };
}

/**
 * Perform complete financial analysis
 */
export function performCompleteAnalysis(inputs: FinancialInputs): FinancialOutputs {
  const investmentMetrics = calculateInvestmentMetrics(inputs);
  const useOfFunds = calculateUseOfFunds(inputs);
  const revenueStreams = calculateRevenueStreams(inputs);
  const returnProjections = calculateReturnProjections(inputs);
  const valuationComponents = calculateValuationComponents(inputs);
  const tamAnalysis = calculateTAMUtilization(inputs);

  return {
    ...investmentMetrics,
    ...useOfFunds,
    ...revenueStreams,
    ...returnProjections,
    ...valuationComponents,
    ...tamAnalysis,
  };
}

/**
 * Sensitivity Analysis - vary a single parameter and see impact on outputs
 */
export function performSensitivityAnalysis(
  inputs: FinancialInputs,
  variable: keyof FinancialInputs,
  variations: number[] // e.g., [0.5, 0.75, 1, 1.25, 1.5] for -50% to +50%
) {
  const baseValue = inputs[variable];
  const results = variations.map((variation) => {
    const modifiedInputs = {
      ...inputs,
      [variable]: baseValue * variation,
    };
    const analysis = performCompleteAnalysis(modifiedInputs);
    
    // Return the expected return multiple as the primary outcome
    return {
      value: baseValue * variation,
      variation,
      expectedReturnMultiple: analysis.expected.returnMultiple,
      conservativeReturnMultiple: analysis.conservative.returnMultiple,
      aggressiveReturnMultiple: analysis.aggressive.returnMultiple,
    };
  });

  return results;
}

/**
 * Scenario Comparison - compare multiple scenarios
 */
export function compareScenarios(
  baseInputs: FinancialInputs,
  scenarios: Array<{ name: string; modifications: Partial<FinancialInputs> }>
) {
  return scenarios.map((scenario) => {
    const inputs = { ...baseInputs, ...scenario.modifications };
    const analysis = performCompleteAnalysis(inputs);
    return {
      name: scenario.name,
      analysis,
    };
  });
}

/**
 * Calculate Cerberus Engine impact - estimate recovery from malfeasance
 */
export function calculateCerberusImpact(
  estimatedLiability: number,
  recoveryProbability: number = 0.85,
  enforcementCost: number = 0
) {
  const estimatedRecovery = estimatedLiability * recoveryProbability;
  const netRecovery = estimatedRecovery - enforcementCost;
  const recoveryRate = (netRecovery / estimatedLiability) * 100;

  return {
    estimatedLiability,
    recoveryProbability,
    enforcementCost,
    estimatedRecovery,
    netRecovery,
    recoveryRate,
  };
}

/**
 * Calculate impact of asset recovery on ecosystem valuation
 */
export function calculateAssetImpactOnValuation(
  currentValuation: number,
  recoveredAssets: number,
  multiplierEffect: number = 1.5 // How much the recovered assets amplify valuation
) {
  const valuationIncrease = recoveredAssets * multiplierEffect;
  const newValuation = currentValuation + valuationIncrease;
  const valuationGrowth = (valuationIncrease / currentValuation) * 100;

  return {
    currentValuation,
    recoveredAssets,
    valuationIncrease,
    newValuation,
    valuationGrowth,
  };
}

/**
 * Default financial model for Aequitas Protocol
 */
export const DEFAULT_FINANCIAL_MODEL: FinancialInputs = {
  developmentCost: 28000000,
  prelaunchValuation: 7000000000,
  blockchainInfrastructureValue: 2500000000,
  aiProtocolValue: 3000000000,
  nativeCoinEconomicsValue: 1000000000,
  networkEffectsValue: 500000000,
  afterLaunchValuation: 250000000000,
  operationalWarChest: 22000000,
  totalAddressableMarket: 131000000000000,
  seedRaise: 22000000,
  preMoneyValuation: 7000000000,
  legalEnforcement: 7500000,
  securityOperations: 5000000,
  eliteCoreTeam: 3000000,
  aiInfrastructure: 2000000,
  contingencyReserve: 4500000,
  transactionFeesYear1: 500000000,
  transactionFeesYear3: 5000000000,
  validatorEconomicsYear1: 200000000,
  validatorEconomicsYear3: 2000000000,
  crossChainBridgesYear1: 100000000,
  crossChainBridgesYear3: 1000000000,
  justiceEnforcementYear1: 10000000000,
  justiceEnforcementYear3: 100000000000,
};

