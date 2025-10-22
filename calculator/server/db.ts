import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  financialModels,
  scenarios,
  sensitivityAnalysis,
  cerberusSimulations,
  assetEntities,
  calculationHistory,
  FinancialModel,
  Scenario,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = "admin";
        values.role = "admin";
        updateSet.role = "admin";
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Financial Model helpers

export async function createFinancialModel(
  userId: string,
  model: Omit<FinancialModel, "id" | "userId" | "createdAt" | "updatedAt">
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const id = `fm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  await db.insert(financialModels).values({
    id,
    userId,
    ...model,
  } as any);

  return id;
}

export async function getFinancialModel(id: string, userId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(financialModels)
    .where(and(eq(financialModels.id, id), eq(financialModels.userId, userId)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserFinancialModels(userId: string) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(financialModels)
    .where(eq(financialModels.userId, userId));
}

export async function updateFinancialModel(
  id: string,
  userId: string,
  updates: Partial<FinancialModel>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(financialModels)
    .set(updates)
    .where(and(eq(financialModels.id, id), eq(financialModels.userId, userId)));
}

// Scenario helpers

export async function createScenario(
  userId: string,
  scenario: Omit<Scenario, "id" | "userId" | "createdAt" | "updatedAt">
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const id = `sc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  await db.insert(scenarios).values({
    id,
    userId,
    ...scenario,
  } as any);

  return id;
}

export async function getScenario(id: string, userId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(scenarios)
    .where(and(eq(scenarios.id, id), eq(scenarios.userId, userId)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserScenarios(userId: string) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(scenarios)
    .where(eq(scenarios.userId, userId));
}

export async function getModelScenarios(modelId: string, userId: string) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(scenarios)
    .where(and(eq(scenarios.modelId, modelId), eq(scenarios.userId, userId)));
}

export async function updateScenario(
  id: string,
  userId: string,
  updates: Partial<Scenario>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(scenarios)
    .set(updates)
    .where(and(eq(scenarios.id, id), eq(scenarios.userId, userId)));
}

export async function deleteScenario(id: string, userId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .delete(scenarios)
    .where(and(eq(scenarios.id, id), eq(scenarios.userId, userId)));
}

// Asset Entity helpers

export async function getAssetEntities(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(assetEntities).limit(limit).offset(offset);
}

export async function searchAssetEntities(query: string) {
  const db = await getDb();
  if (!db) return [];

  // Simple search implementation - can be enhanced with full-text search
  return await db
    .select()
    .from(assetEntities)
    .where(
      // This is a simplified search - in production, use full-text search
      eq(assetEntities.name, query)
    );
}

export async function getTotalAssetLiability() {
  const db = await getDb();
  if (!db) return 0;

  const result = await db
    .select({
      total: assetEntities.estimatedLiability,
    })
    .from(assetEntities);

  return result.reduce((sum, row) => {
    const value = parseFloat(row.total?.toString() || "0");
    return sum + (isNaN(value) ? 0 : value);
  }, 0);
}

// Calculation History helpers

export async function logCalculation(
  userId: string,
  calculationType: string,
  inputs: Record<string, unknown>,
  outputs: Record<string, unknown>,
  scenarioId?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const id = `ch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  await db.insert(calculationHistory).values({
    id,
    userId,
    calculationType,
    inputs,
    outputs,
    scenarioId,
  } as any);

  return id;
}

export async function getUserCalculationHistory(userId: string, limit = 50) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(calculationHistory)
    .where(eq(calculationHistory.userId, userId))
    .limit(limit);
}

