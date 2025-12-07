import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  createFinancialModel,
  getFinancialModel,
  getUserFinancialModels,
  updateFinancialModel,
  createScenario,
  getScenario,
  getUserScenarios,
  getModelScenarios,
  updateScenario,
  deleteScenario,
  getAssetEntities,
  searchAssetEntities,
  getTotalAssetLiability,
  logCalculation,
  getUserCalculationHistory,
} from "./db";
import {
  performCompleteAnalysis,
  performSensitivityAnalysis,
  compareScenarios,
  calculateCerberusImpact,
  calculateAssetImpactOnValuation,
  DEFAULT_FINANCIAL_MODEL,
  FinancialInputs,
} from "./calculations";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Financial Model procedures
  financialModel: router({
    // Get default model
    getDefault: publicProcedure.query(async () => {
      const analysis = performCompleteAnalysis(DEFAULT_FINANCIAL_MODEL);
      return {
        inputs: DEFAULT_FINANCIAL_MODEL,
        outputs: analysis,
      };
    }),

    // Create a new financial model
    create: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          parameters: z.any().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const modelId = await createFinancialModel(ctx.user.id, {
          name: input.name,
          description: input.description,
          ...DEFAULT_FINANCIAL_MODEL,
        } as any);

        return { id: modelId };
      }),

    // Get user's financial models
    list: protectedProcedure.query(async ({ ctx }) => {
      return await getUserFinancialModels(ctx.user.id);
    }),

    // Get a specific financial model
    get: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ ctx, input }) => {
        const model = await getFinancialModel(input.id, ctx.user.id);
        if (!model) throw new Error("Model not found");
        return model;
      }),

    // Update a financial model
    update: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          updates: z.any().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await updateFinancialModel(input.id, ctx.user.id, input.updates as any);
        return { success: true };
      }),
  }),

  // Calculation procedures
  calculation: router({
    // Perform complete financial analysis
    analyze: publicProcedure
      .input(z.any())
      .query(async ({ input }) => {
        const analysis = performCompleteAnalysis(input as FinancialInputs);
        return analysis;
      }) as any,

    // Perform sensitivity analysis
    sensitivity: publicProcedure
      .input(
        z.object({
          inputs: z.any(),
          variable: z.string(),
          variations: z.array(z.number()).optional(),
        })
      )
      .query(async ({ input }) => {
        const variations = input.variations || [0.5, 0.75, 1, 1.25, 1.5];
        const results = performSensitivityAnalysis(
          input.inputs as FinancialInputs,
          input.variable as keyof FinancialInputs,
          variations
        );
        return results;
      }) as any,

    // Compare multiple scenarios
    compareScenarios: publicProcedure
      .input(
        z.object({
          baseInputs: z.any(),
          scenarios: z.array(
            z.object({
              name: z.string(),
              modifications: z.any(),
            })
          ),
        })
      )
      .query(async ({ input }) => {
        const results = compareScenarios(
          input.baseInputs as FinancialInputs,
          input.scenarios
        );
        return results;
      }) as any,
  }),

  // Scenario procedures
  scenario: router({
    // Create a new scenario
    create: protectedProcedure
      .input(
        z.object({
          modelId: z.string(),
          name: z.string(),
          description: z.string().optional(),
          parameters: z.any().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const scenarioId = await createScenario(ctx.user.id, {
          modelId: input.modelId,
          name: input.name,
          description: input.description,
          parameters: input.parameters || {},
        } as any);

        return { id: scenarioId };
      }),

    // Get user's scenarios
    list: protectedProcedure
      .input(z.object({ modelId: z.string().optional() }))
      .query(async ({ ctx, input }) => {
        if (input.modelId) {
          return await getModelScenarios(input.modelId, ctx.user.id);
        }
        return await getUserScenarios(ctx.user.id);
      }),

    // Get a specific scenario
    get: protectedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ ctx, input }) => {
        const scenario = await getScenario(input.id, ctx.user.id);
        if (!scenario) throw new Error("Scenario not found");
        return scenario;
      }),

    // Update a scenario
    update: protectedProcedure
      .input(
        z.object({
          id: z.string(),
          updates: z.object({
            name: z.string().optional(),
            description: z.string().optional(),
            parameters: z.any().optional(),
          }),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await updateScenario(input.id, ctx.user.id, input.updates as any);
        return { success: true };
      }),

    // Delete a scenario
    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await deleteScenario(input.id, ctx.user.id);
        return { success: true };
      }),
  }),

  // Asset procedures
  asset: router({
    // Get asset entities with pagination
    list: publicProcedure
      .input(
        z.object({
          limit: z.number().default(100),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        return await getAssetEntities(input.limit, input.offset);
      }) as any,

    // Search for asset entities
    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        return await searchAssetEntities(input.query);
      }),

    // Get total asset liability
    getTotalLiability: publicProcedure.query(async () => {
      const total = await getTotalAssetLiability();
      return { total };
    }),
  }),

  // Cerberus Engine procedures
  cerberus: router({
    // Calculate Cerberus impact
    calculateImpact: publicProcedure
      .input(
        z.object({
          estimatedLiability: z.number(),
          recoveryProbability: z.number().default(0.85),
          enforcementCost: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        return calculateCerberusImpact(
          input.estimatedLiability,
          input.recoveryProbability,
          input.enforcementCost
        );
      }),

    // Calculate asset impact on valuation
    calculateAssetImpact: publicProcedure
      .input(
        z.object({
          currentValuation: z.number(),
          recoveredAssets: z.number(),
          multiplierEffect: z.number().default(1.5),
        })
      )
      .query(async ({ input }) => {
        return calculateAssetImpactOnValuation(
          input.currentValuation,
          input.recoveredAssets,
          input.multiplierEffect
        );
      }),
  }),

  // Calculation history procedures
  history: router({
    // Get user's calculation history
    list: protectedProcedure
      .input(z.object({ limit: z.number().default(50) }))
      .query(async ({ ctx, input }) => {
        return await getUserCalculationHistory(ctx.user.id, input.limit);
      }),

    // Log a calculation
    log: protectedProcedure
      .input(
        z.object({
          calculationType: z.string(),
          inputs: z.any(),
          outputs: z.any(),
          scenarioId: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const historyId = await logCalculation(
          ctx.user.id,
          input.calculationType,
          input.inputs,
          input.outputs,
          input.scenarioId
        );
        return { id: historyId };
      }),
  }),
});

export type AppRouter = typeof appRouter;

