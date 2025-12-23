export type Entry = {
  id: string;
  name: string;
  calories: number; // Kcal
  macros: {
    // g
    protein: number;
    carbs: number;
    fat: number;
  };
  timestamp: string;
  meta: {
    source: string;
    flags: string[];
  };
};
