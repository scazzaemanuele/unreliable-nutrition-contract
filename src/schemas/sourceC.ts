import { z } from "zod";
import { type Entry } from "../types/entry";

const SourceCSchema = z.object({
  source: z.string(),
  item: z.object({
    label: z.string(),
    brand: z.string(),
  }),
  logged_at: z.string(),
  serving_grams: z.number(),
  nutrients: z.array(
    z.object({
      key: z.string(),
      value: z.number(),
      unit: z.string(),
    })
  ),
});

export const normalizeSourceC = (raw: unknown): Entry | null => {
  const result = SourceCSchema.safeParse(raw);

  if (!result.success) {
    console.error("Source C Parsing Failed", result.error);
    return null;
  }

  const data = result.data;

  // TODO: Need to check duplicated keys
  const protein = Number(
    data.nutrients.find((n) => n.key === "protein")?.value
  );
  const carbs = Number(
    data.nutrients.find((n) => n.key === "carbohydrate")?.value
  );
  const fat = Number(data.nutrients.find((n) => n.key === "fat")?.value);
  const calories = Number(
    data.nutrients.find((n) => n.key === "energy")?.value
  );

  return {
    id: data.item.label,
    name: data.item.label,
    calories,
    macros: { protein, carbs, fat },
    meta: {
      source: "Source C",
      flags: [],
    },
  };
};
