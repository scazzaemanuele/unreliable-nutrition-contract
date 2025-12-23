import { z } from "zod";
import { type Entry } from "../types/entry";
import { audit } from "../lib/audit";

const SourceBSchema = z.object({
  id: z.string(),
  loggedAt: z.string(),
  name: z.string(),
  servingSize: z.string(),
  macros: z.object({
    protein: z.string(),
    carbs: z.string(),
    fat: z.string(),
  }),
  calories: z.string().nullable(),
  extra: z.object({
    sugar_g: z.string().optional(),
  }),
});

export const normalizeSourceB = (raw: unknown): Entry | null => {
  const result = SourceBSchema.safeParse(raw);

  if (!result.success) {
    console.error("Source B Parsing Failed", result.error);
    return null;
  }

  const data = result.data;

  // Safely extract macros
  const protein = Number(data.macros.protein);
  const carbs = Number(data.macros.carbs);
  const fat = Number(data.macros.fat);
  const calories = Number(data.calories);

  return {
    id: data.id,
    name: data.name,
    calories,
    macros: { protein, carbs, fat },
    timestamp: data.loggedAt,
    meta: {
      source: "Source B",
      flags: audit(protein, carbs, fat, calories),
    },
  };
};
