import type { Session, User } from "@/types/auth";
import type { Habit } from "@/types/habit";

export const USERS_KEY = "habit-tracker-users";
export const SESSION_KEY = "habit-tracker-session";
export const HABITS_KEY = "habit-tracker-habits";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (canUseStorage()) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getUsers(): User[] {
  return readJson<User[]>(USERS_KEY, []);
}

export function saveUsers(users: User[]) {
  writeJson(USERS_KEY, users);
}

export function getSession(): Session | null {
  return readJson<Session | null>(SESSION_KEY, null);
}

export function saveSession(session: Session | null) {
  writeJson(SESSION_KEY, session);
}

export function getHabits(): Habit[] {
  return readJson<Habit[]>(HABITS_KEY, []);
}

export function saveHabits(habits: Habit[]) {
  writeJson(HABITS_KEY, habits);
}

export function createId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
