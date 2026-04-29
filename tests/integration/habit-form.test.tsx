import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { Dashboard } from "@/components/shared/ProtectedRoute";
import { HABITS_KEY, SESSION_KEY } from "@/lib/localStorage";
import type { Habit } from "@/types/habit";

// Mock styled-components
vi.mock("styled-components", () => {
  return {
    default: new Proxy({}, {
      get: () => () => "div",
    }),
  };
});

// Mock Next router
const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

const session = {
  userId: "user-1",
  email: "test@example.com",
};

const existingHabit: Habit = {
  id: "habit-1",
  userId: "user-1",
  name: "Drink Water",
  description: "Original",
  frequency: "daily",
  createdAt: "2026-04-27T00:00:00.000Z",
  completions: [],
};

describe("habit form", () => {
  beforeEach(() => {
    localStorage.clear();
    push.mockClear();
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  });

  it("shows a validation error when habit name is empty", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    await user.click(screen.getByTestId("create-habit-button"));
    await user.click(screen.getByTestId("habit-save-button"));

    expect(await screen.findByText("Habit name is required")).toBeInTheDocument();
  });

  it("creates a new habit and renders it in the list", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    await user.click(screen.getByTestId("create-habit-button"));
    await user.type(screen.getByTestId("habit-name-input"), "Drink Water");
    await user.click(screen.getByTestId("habit-save-button"));

    const habits = JSON.parse(localStorage.getItem(HABITS_KEY) ?? "[]");
    expect(habits).toHaveLength(1);

    expect(await screen.findByTestId("habit-card-drink-water")).toBeInTheDocument();
  });

  it("edits an existing habit and preserves immutable fields", async () => {
    const user = userEvent.setup();

    localStorage.setItem(HABITS_KEY, JSON.stringify([existingHabit]));
    render(<Dashboard />);

    await user.click(screen.getByTestId("habit-edit-drink-water"));
    await user.clear(screen.getByTestId("habit-name-input"));
    await user.type(screen.getByTestId("habit-name-input"), "Read Books");
    await user.click(screen.getByTestId("habit-save-button"));

    const [saved] = JSON.parse(localStorage.getItem(HABITS_KEY) ?? "[]") as Habit[];

    expect(saved).toMatchObject({
      id: existingHabit.id,
      userId: existingHabit.userId,
      createdAt: existingHabit.createdAt,
      completions: [],
    });

    expect(await screen.findByTestId("habit-card-read-books")).toBeInTheDocument();
  });

  it("deletes a habit only after explicit confirmation", async () => {
    const user = userEvent.setup();

    localStorage.setItem(HABITS_KEY, JSON.stringify([existingHabit]));
    render(<Dashboard />);

    await user.click(screen.getByTestId("habit-delete-drink-water"));

    // still exists before confirmation
    expect(screen.getByTestId("habit-card-drink-water")).toBeInTheDocument();

    await user.click(screen.getByTestId("confirm-delete-button"));

    const habits = JSON.parse(localStorage.getItem(HABITS_KEY) ?? "[]");
    expect(habits).toHaveLength(0);

    expect(screen.queryByTestId("habit-card-drink-water")).not.toBeInTheDocument();
  });

  it("toggles completion and updates the streak display", async () => {
    const user = userEvent.setup();

    localStorage.setItem(HABITS_KEY, JSON.stringify([existingHabit]));
    render(<Dashboard />);

    expect(await screen.findByTestId("habit-streak-drink-water")).toHaveTextContent("0 days");

    await user.click(screen.getByTestId("habit-complete-drink-water"));

    expect(await screen.findByTestId("habit-streak-drink-water")).toHaveTextContent("1 day");
  });
});