import {
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  int,
  boolean,
  json,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Financial Models table - stores base financial model configurations
 * for the Aequitas Protocol
 */
export const financialModels = mysqlTable("financialModels", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // Key Financial Metrics
  developmentCost: decimal("developmentCost", { precision: 20, scale: 2 }),
  prelaunchValuation: decimal("prelaunchValuation", { precision: 20, scale: 2 }),
  blockchainInfrastructureValue: decimal("blockchainInfrastructureValue", { precision: 20, scale: 2 }),
  aiProtocolValue: decimal("aiProtocolValue", { precision: 20, scale: 2 }),
  nativeCoinEconomicsValue: decimal("nativeCoinEconomicsValue", { precision: 20, scale: 2 }),
  networkEffectsValue: decimal("networkEffectsValue", { precision: 20, scale: 2 }),
  afterLaunchValuation: decimal("afterLaunchValuation", { precision: 20, scale: 2 }),
  operationalWarChest: decimal("operationalWarChest", { precision: 20, scale: 2 }),
  totalAddressableMarket: decimal("totalAddressableMarket", { precision: 25, scale: 2 }),
  
  // Investment Details
  seedRaise: decimal("seedRaise", { precision: 20, scale: 2 }),
  preMoneyValuation: decimal("preMoneyValuation", { precision: 20, scale: 2 }),
  
  // Use of Funds
  legalEnforcement: decimal("legalEnforcement", { precision: 20, scale: 2 }),
  securityOperations: decimal("securityOperations", { precision: 20, scale: 2 }),
  eliteCoreTeam: decimal("eliteCoreTeam", { precision: 20, scale: 2 }),
  aiInfrastructure: decimal("aiInfrastructure", { precision: 20, scale: 2 }),
  contingencyReserve: decimal("contingencyReserve", { precision: 20, scale: 2 }),
  
  // Native Coin Revenue Streams
  transactionFeesYear1: decimal("transactionFeesYear1", { precision: 20, scale: 2 }),
  transactionFeesYear3: decimal("transactionFeesYear3", { precision: 20, scale: 2 }),
  validatorEconomicsYear1: decimal("validatorEconomicsYear1", { precision: 20, scale: 2 }),
  validatorEconomicsYear3: decimal("validatorEconomicsYear3", { precision: 20, scale: 2 }),
  crossChainBridgesYear1: decimal("crossChainBridgesYear1", { precision: 20, scale: 2 }),
  crossChainBridgesYear3: decimal("crossChainBridgesYear3", { precision: 20, scale: 2 }),
  justiceEnforcementYear1: decimal("justiceEnforcementYear1", { precision: 20, scale: 2 }),
  justiceEnforcementYear3: decimal("justiceEnforcementYear3", { precision: 20, scale: 2 }),
  
  isDefault: boolean("isDefault").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type FinancialModel = typeof financialModels.$inferSelect;
export type InsertFinancialModel = typeof financialModels.$inferInsert;

/**
 * Scenarios table - stores user-created financial scenarios
 * for comparison and analysis
 */
export const scenarios = mysqlTable("scenarios", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  modelId: varchar("modelId", { length: 64 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  
  // Scenario Parameters (JSON for flexibility)
  parameters: json("parameters").$type<Record<string, number | string>>(),
  
  // Calculated Results
  equityPercentage: decimal("equityPercentage", { precision: 5, scale: 4 }),
  impliedValuePerDollar: decimal("impliedValuePerDollar", { precision: 20, scale: 2 }),
  totalUseOfFunds: decimal("totalUseOfFunds", { precision: 20, scale: 2 }),
  totalRevenueYear1: decimal("totalRevenueYear1", { precision: 20, scale: 2 }),
  totalRevenueYear3: decimal("totalRevenueYear3", { precision: 20, scale: 2 }),
  
  // Return Projections
  conservativeYear1MC: decimal("conservativeYear1MC", { precision: 20, scale: 2 }),
  conservativeYear3MC: decimal("conservativeYear3MC", { precision: 20, scale: 2 }),
  conservativeReturnMultiple: decimal("conservativeReturnMultiple", { precision: 10, scale: 2 }),
  
  expectedYear1MC: decimal("expectedYear1MC", { precision: 20, scale: 2 }),
  expectedYear3MC: decimal("expectedYear3MC", { precision: 20, scale: 2 }),
  expectedReturnMultiple: decimal("expectedReturnMultiple", { precision: 10, scale: 2 }),
  
  aggressiveYear1MC: decimal("aggressiveYear1MC", { precision: 20, scale: 2 }),
  aggressiveYear3MC: decimal("aggressiveYear3MC", { precision: 20, scale: 2 }),
  aggressiveReturnMultiple: decimal("aggressiveReturnMultiple", { precision: 10, scale: 2 }),
  
  paradigmShiftYear1MC: decimal("paradigmShiftYear1MC", { precision: 20, scale: 2 }),
  paradigmShiftYear3MC: decimal("paradigmShiftYear3MC", { precision: 20, scale: 2 }),
  paradigmShiftReturnMultiple: decimal("paradigmShiftReturnMultiple", { precision: 10, scale: 2 }),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type Scenario = typeof scenarios.$inferSelect;
export type InsertScenario = typeof scenarios.$inferInsert;

/**
 * Sensitivity Analysis table - stores sensitivity analysis results
 */
export const sensitivityAnalysis = mysqlTable("sensitivityAnalysis", {
  id: varchar("id", { length: 64 }).primaryKey(),
  scenarioId: varchar("scenarioId", { length: 64 }).notNull(),
  userId: varchar("userId", { length: 64 }).notNull(),
  
  // Variable being analyzed
  variable: varchar("variable", { length: 255 }).notNull(),
  baseValue: decimal("baseValue", { precision: 20, scale: 2 }),
  
  // Sensitivity results (JSON for flexibility)
  results: json("results").$type<Array<{ value: number; outcome: number }>>(),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type SensitivityAnalysis = typeof sensitivityAnalysis.$inferSelect;
export type InsertSensitivityAnalysis = typeof sensitivityAnalysis.$inferInsert;

/**
 * Cerberus Simulations table - stores AI auditor simulations
 */
export const cerberusSimulations = mysqlTable("cerberusSimulations", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  
  // Simulation parameters
  malfeasanceType: varchar("malfeasanceType", { length: 255 }).notNull(),
  estimatedLiability: decimal("estimatedLiability", { precision: 25, scale: 2 }),
  recoveryProbability: decimal("recoveryProbability", { precision: 5, scale: 4 }),
  
  // Results
  estimatedRecovery: decimal("estimatedRecovery", { precision: 25, scale: 2 }),
  impactOnEcosystem: text("impactOnEcosystem"),
  enforcementStrategy: text("enforcementStrategy"),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type CerberusSimulation = typeof cerberusSimulations.$inferSelect;
export type InsertCerberusSimulation = typeof cerberusSimulations.$inferInsert;

/**
 * Asset Entities table - stores the $131T asset database of liable entities
 */
export const assetEntities = mysqlTable("assetEntities", {
  id: varchar("id", { length: 64 }).primaryKey(),
  
  // Entity information
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }),
  jurisdiction: varchar("jurisdiction", { length: 255 }),
  
  // Liability information
  estimatedLiability: decimal("estimatedLiability", { precision: 25, scale: 2 }),
  liabilityType: varchar("liabilityType", { length: 255 }),
  evidence: text("evidence"),
  
  // Status
  status: mysqlEnum("status", ["identified", "verified", "disputed", "resolved"]).default("identified"),
  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type AssetEntity = typeof assetEntities.$inferSelect;
export type InsertAssetEntity = typeof assetEntities.$inferInsert;

/**
 * Calculation History table - stores historical calculations for audit trail
 */
export const calculationHistory = mysqlTable("calculationHistory", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  scenarioId: varchar("scenarioId", { length: 64 }),
  
  // Calculation details
  calculationType: varchar("calculationType", { length: 255 }).notNull(),
  inputs: json("inputs").$type<Record<string, unknown>>(),
  outputs: json("outputs").$type<Record<string, unknown>>(),
  
  createdAt: timestamp("createdAt").defaultNow(),
});

export type CalculationHistory = typeof calculationHistory.$inferSelect;
export type InsertCalculationHistory = typeof calculationHistory.$inferInsert;

