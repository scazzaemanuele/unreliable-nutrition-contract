import { normalizeSourceA } from "../schemas/sourceA";
import type { Entry } from "../types/entry";

const normalizeMock = () => null;

export const normalizers: Record<string, (data: unknown) => Entry | null> = {
  a: normalizeSourceA,
  b: normalizeMock,
  c: normalizeMock,
  d: normalizeMock,
};
