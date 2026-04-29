"use client";

import { Button } from "@/components/ui/button";
import { getTodayIsoDate } from "@/lib/date";
import { getHabitSlug } from "@/lib/slug";
import { calculateCurrentStreak } from "@/lib/streaks";
import type { Habit } from "@/types/habit";
import styled from "styled-components";

type HabitCardProps = {
  habit: Habit;
  onToggle: (habit: Habit) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
};

const HabitCardArticle = styled.article`
  display: grid;
  gap: 1rem;
  border-radius: 0.75rem;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  padding: 1rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-0.125rem);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
`;

const HabitCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
`;

const HabitCardContent = styled.div`
  
`;

const HabitCardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 900;
  color: hsl(var(--card-foreground));
`;

const HabitCardDescription = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
`;

const HabitCardStreak = styled.p`
  border-radius: 0.5rem;
  background: hsl(var(--accent));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 900;
  color: hsl(var(--accent-foreground));
`;

const HabitCardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export function HabitCard({ habit, onToggle, onEdit, onDelete }: HabitCardProps) {
  const slug = getHabitSlug(habit.name);
  const today = getTodayIsoDate();
  const completedToday = habit.completions.includes(today);
  const streak = calculateCurrentStreak(habit.completions, today);

  return (
    <HabitCardArticle
      data-testid={`habit-card-${slug}`}
    >
      <HabitCardHeader>
        <HabitCardContent>
          <HabitCardTitle>{habit.name}</HabitCardTitle>
          {habit.description && <HabitCardDescription>{habit.description}</HabitCardDescription>}
        </HabitCardContent>
        <HabitCardStreak data-testid={`habit-streak-${slug}`}>
          {streak} day{streak === 1 ? "" : "s"}
        </HabitCardStreak>
      </HabitCardHeader>
      <HabitCardActions>
        <Button
          data-testid={`habit-complete-${slug}`}
          type="button"
          variant={completedToday ? "success" : "outline"}
          onClick={() => onToggle(habit)}
        >
          {completedToday ? "Completed" : "Complete today"}
        </Button>
        <Button data-testid={`habit-edit-${slug}`} type="button" variant="secondary" onClick={() => onEdit(habit)}>
          Edit
        </Button>
        <Button data-testid={`habit-delete-${slug}`} type="button" variant="destructive" onClick={() => onDelete(habit)}>
          Delete
        </Button>
      </HabitCardActions>
    </HabitCardArticle>
  );
}
