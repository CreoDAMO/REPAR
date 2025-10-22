CREATE TABLE `assetEntities` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` varchar(255),
	`jurisdiction` varchar(255),
	`estimatedLiability` decimal(25,2),
	`liabilityType` varchar(255),
	`evidence` text,
	`status` enum('identified','verified','disputed','resolved') DEFAULT 'identified',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `assetEntities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `calculationHistory` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`scenarioId` varchar(64),
	`calculationType` varchar(255) NOT NULL,
	`inputs` json,
	`outputs` json,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `calculationHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cerberusSimulations` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`malfeasanceType` varchar(255) NOT NULL,
	`estimatedLiability` decimal(25,2),
	`recoveryProbability` decimal(5,4),
	`estimatedRecovery` decimal(25,2),
	`impactOnEcosystem` text,
	`enforcementStrategy` text,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cerberusSimulations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `financialModels` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`developmentCost` decimal(20,2),
	`prelaunchValuation` decimal(20,2),
	`blockchainInfrastructureValue` decimal(20,2),
	`aiProtocolValue` decimal(20,2),
	`nativeCoinEconomicsValue` decimal(20,2),
	`networkEffectsValue` decimal(20,2),
	`afterLaunchValuation` decimal(20,2),
	`operationalWarChest` decimal(20,2),
	`totalAddressableMarket` decimal(25,2),
	`seedRaise` decimal(20,2),
	`preMoneyValuation` decimal(20,2),
	`legalEnforcement` decimal(20,2),
	`securityOperations` decimal(20,2),
	`eliteCoreTeam` decimal(20,2),
	`aiInfrastructure` decimal(20,2),
	`contingencyReserve` decimal(20,2),
	`transactionFeesYear1` decimal(20,2),
	`transactionFeesYear3` decimal(20,2),
	`validatorEconomicsYear1` decimal(20,2),
	`validatorEconomicsYear3` decimal(20,2),
	`crossChainBridgesYear1` decimal(20,2),
	`crossChainBridgesYear3` decimal(20,2),
	`justiceEnforcementYear1` decimal(20,2),
	`justiceEnforcementYear3` decimal(20,2),
	`isDefault` boolean DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `financialModels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scenarios` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`modelId` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`parameters` json,
	`equityPercentage` decimal(5,4),
	`impliedValuePerDollar` decimal(20,2),
	`totalUseOfFunds` decimal(20,2),
	`totalRevenueYear1` decimal(20,2),
	`totalRevenueYear3` decimal(20,2),
	`conservativeYear1MC` decimal(20,2),
	`conservativeYear3MC` decimal(20,2),
	`conservativeReturnMultiple` decimal(10,2),
	`expectedYear1MC` decimal(20,2),
	`expectedYear3MC` decimal(20,2),
	`expectedReturnMultiple` decimal(10,2),
	`aggressiveYear1MC` decimal(20,2),
	`aggressiveYear3MC` decimal(20,2),
	`aggressiveReturnMultiple` decimal(10,2),
	`paradigmShiftYear1MC` decimal(20,2),
	`paradigmShiftYear3MC` decimal(20,2),
	`paradigmShiftReturnMultiple` decimal(10,2),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `scenarios_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sensitivityAnalysis` (
	`id` varchar(64) NOT NULL,
	`scenarioId` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`variable` varchar(255) NOT NULL,
	`baseValue` decimal(20,2),
	`results` json,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sensitivityAnalysis_id` PRIMARY KEY(`id`)
);
