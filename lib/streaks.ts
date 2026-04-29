import { addDaysIso, getTodayIsoDate } from "./date";

export function calculateCurrentStreak(completions: string[], today = getTodayIsoDate()): number {
  const completedDates = new Set(completions);

  if (!completedDates.has(today)) {
    return 0;
  }

  let streak = 0;
  let cursor = today;

  while (completedDates.has(cursor)) {
    streak += 1;
    cursor = addDaysIso(cursor, -1);
  }

  return streak;
}
