import { normalizeSourceA } from "../schemas/sourceA";
import { normalizeSourceB } from "../schemas/sourceB";
import { normalizeSourceC } from "../schemas/sourceC";
import { normalizeSourceD } from "../schemas/sourceD";
import type { Entry } from "../types/entry";

export const normalizers: Record<string, (data: unknown) => Entry | null> = {
  a: normalizeSourceA,
  b: normalizeSourceB,
  c: normalizeSourceC,
  d: normalizeSourceD,
};
