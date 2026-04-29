import { describe, expect, it } from "vitest";
import { toggleHabitCompletion } from "@/lib/habits";
import type { Habit } from "@/types/habit";

const baseHabit: Habit = {
  id: "habit-1",
  userId: "user-1",
  name: "Drink Water",
  description: "",
  frequency: "daily",
  createdAt: "2026-04-27T00:00:00.000Z",
  completions: [],
};

describe("toggleHabitCompletion", () => {
  it("adds a completion date when the date is not present", () => {
    expect(toggleHabitCompletion(baseHabit, "2026-04-27").completions).toContain("2026-04-27");
  });

  it("removes a completion date when the date already exists", () => {
    expect(toggleHabitCompletion({ ...baseHabit, completions: ["2026-04-27"] }, "2026-04-27").completions).toEqual([]);
  });

  it("does not mutate the original habit object", () => {
    const habit = { ...baseHabit, completions: [] };
    toggleHabitCompletion(habit, "2026-04-27");
    expect(habit.completions).toEqual([]);
  });

  it("does not return duplicate completion dates", () => {
    expect(toggleHabitCompletion({ ...baseHabit, completions: ["2026-04-26", "2026-04-26"] }, "2026-04-27").completions).toEqual(["2026-04-26", "2026-04-27"]);
  });
});
