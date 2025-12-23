import { warnings } from "./flags";

export const audit = (
  protein: number,
  carbs: number,
  fat: number,
  statedCalories: number
): string[] => {
  const flags: string[] = [];

  // sanity checks (negative numbers)
  if (protein < 0 || carbs < 0 || fat < 0 || statedCalories < 0) {
    flags.push(warnings.IMPLAUSIBLE_VALUES);
    return flags; // Hard to do math on negatives
  }

  // calories math
  // 4 kcal/g for protein/carbs, 9 kcal/g for fat
  const expectedCalories = protein * 4 + carbs * 4 + fat * 9;

  // calculate variance. If stated calories are 0, avoid divide by zero.
  if (statedCalories > 0) {
    const variance =
      Math.abs(expectedCalories - statedCalories) / statedCalories;

    // If variance is > threshold, we flag it.
    if (variance > 0.2) {
      flags.push(warnings.CALORIE_MISMATCH);
    }
  } else if (expectedCalories > 10) {
    // stated 0 but has macros? suspicious.
    flags.push(warnings.CALORIE_MISMATCH);
  }

  return flags;
};
