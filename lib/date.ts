export function getTodayIsoDate(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function addDaysIso(date: string, amount: number): string {
  const next = new Date(`${date}T00:00:00.000Z`);
  next.setUTCDate(next.getUTCDate() + amount);
  return next.toISOString().slice(0, 10);
}
