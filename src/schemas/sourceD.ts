import { z } from "zod";
import { type Entry } from "../types/entry";

const SourceDSchema = z.object({
  id: z.string(),
  time: z.string(),
  food: z.string(),
  serving: {
    amount: z.number(),
    unit: z.string(),
  },
  macros: z.object({
    protein_g: z.number(),
    carbs_g: z.number(),
    fat_g: z.number(),
  }),
  calories_kcal: z.number(),
  macros_basis: z.string(),
});

export const normalizeSourceD = (raw: unknown): Entry | null => {
  const result = SourceDSchema.safeParse(raw);

  if (!result.success) {
    console.error("Source D Parsing Failed", result.error);
    return null;
  }

  const data = result.data;

  // TODO: Need to check duplicated keys
  const protein = data.macros.protein_g;
  const carbs = data.macros.carbs_g;
  const fat = data.macros.fat_g;
  const calories = data.calories_kcal;

  return {
    id: data.id,
    name: data.food,
    calories,
    macros: { protein, carbs, fat },
    meta: {
      source: "Source D",
      flags: [],
    },
  };
};
