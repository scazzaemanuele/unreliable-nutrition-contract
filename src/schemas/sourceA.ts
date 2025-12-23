import { z } from "zod";
import { type Entry } from "../types/entry";

const SourceASchema = z.object({
  entryId: z.string(),
  timestamp: z.string(),
  foodName: z.string(),
  serving: z.object({
    amount: z.number(),
    unit: z.string(),
  }),
  macros: z.object({
    protein_g: z.number(),
    carbs_g: z.number(),
    fat_g: z.number(),
  }),
  calories_kcal: z.number(),
});

export const normalizeSourceA = (raw: unknown): Entry | null => {
  const result = SourceASchema.safeParse(raw);

  if (!result.success) {
    console.error("Source A Parsing Failed", result.error);
    return null;
  }

  const data = result.data;

  // Safely extract macros
  const protein = data.macros.protein_g ?? 0;
  const carbs = data.macros.carbs_g ?? 0;
  const fat = data.macros.fat_g ?? 0;
  const calories = data.calories_kcal ?? 0;

  return {
    id: data.entryId,
    name: data.foodName,
    calories,
    macros: { protein, carbs, fat },
    meta: {
      source: "Source A",
      flags: [],
    },
  };
};
