//ProtectedRoute.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HabitCard } from "@/components/habits/HabitCard";
import { HabitForm } from "@/components/habits/HabitForm";
import { getTodayIsoDate } from "@/lib/date";
import { toggleHabitCompletion } from "@/lib/habits";
import { createId, getHabits, getSession, saveHabits, saveSession } from "@/lib/localStorage";
import type { Habit } from "@/types/habit";
import styled from "styled-components";

const DashboardMain = styled.main`
  min-height: 100vh;
  background: hsl(var(--background));
  padding: 1.25rem;
  color: hsl(var(--foreground));

  @media (min-width: 640px) {
    padding: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

const DashboardContainer = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
`;

const Header = styled.header`
  border-radius: 1rem;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--panel));
  padding: 1.25rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

  @media (min-width: 640px) {
    padding: 1.75rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const HeaderLeft = styled.div`
  
`;

const HeaderSubtitle = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: hsl(var(--muted-foreground));
`;

const HeaderTitle = styled.h1`
  margin-top: 0.5rem;
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 900;
  color: hsl(var(--foreground));

  @media (min-width: 640px) {
    font-size: 3rem;
  }
`;

const HeaderEmail = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EmptyState = styled.section`
  border-radius: 1rem;
  border: 2px dashed hsl(var(--border));
  background: hsl(var(--card));
  padding: 2rem;
  text-align: center;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

const EmptyStateIcon = styled.div`
  margin: 0 auto 1rem;
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  background: hsl(var(--secondary));
  font-size: 1.5rem;
`;

const EmptyStateTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 900;
  color: hsl(var(--card-foreground));
`;

const EmptyStateText = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
`;

const HabitsGrid = styled.section`
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const DeleteModal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  background: hsl(var(--overlay));
  padding: 1rem;
`;

const DeleteModalContent = styled.div`
  width: 100%;
  max-width: 20rem;
  border-radius: 1rem;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  padding: 1.25rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

const DeleteModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 900;
  color: hsl(var(--card-foreground));
`;

const DeleteModalText = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
`;

const DeleteModalButtons = styled.div`
  margin-top: 1.25rem;
  display: flex;
  gap: 0.5rem;
`;

export function Dashboard() {
  const router = useRouter();
  const [allHabits, setAllHabits] = useState<Habit[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabit, setDeletingHabit] = useState<Habit | null>(null);
  const [session, setSession] = useState(getSession());

  useEffect(() => {
    const activeSession = getSession();
    if (!activeSession) {
      void router.push("/login");
      return;
    }

    setSession(activeSession);
    setAllHabits(getHabits());
  }, [router]);

  const habits = useMemo(
    () => allHabits.filter((habit) => habit.userId === session?.userId),
    [allHabits, session?.userId],
  );

  function persistHabits(nextHabits: Habit[]) {
    setAllHabits(nextHabits);
    saveHabits(nextHabits);
  }

  function handleSaveHabit(values: { name: string; description: string }) {
    if (!session) return;

    if (editingHabit) {
      persistHabits(
        allHabits.map((habit) =>
          habit.id === editingHabit.id
           ? { ...habit, name: values.name, description: values.description }
            : habit,
        ),
      );
    } else {
      const habit: Habit = {
        id: createId("habit"),
        userId: session.userId,
        name: values.name,
        description: values.description,
        frequency: "daily",
        createdAt: new Date().toISOString(),
        completions: [],
      };
      persistHabits([...allHabits, habit]);
    }

    setIsFormOpen(false);
    setEditingHabit(null);
  }

  function handleToggle(habit: Habit) {
    const today = getTodayIsoDate();
    persistHabits(allHabits.map((candidate) => (candidate.id === habit.id ? toggleHabitCompletion(candidate, today) : candidate)));
  }

  function handleConfirmDelete() {
    if (!deletingHabit) return;
    persistHabits(allHabits.filter((habit) => habit.id !== deletingHabit.id));
    setDeletingHabit(null);
  }

  function handleLogout() {
    saveSession(null);
    void router.push("/login");
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardMain data-testid="dashboard-page">
      <DashboardContainer>
        <Header>
          <HeaderContent>
            <HeaderLeft>
              <HeaderSubtitle>Today's rhythm</HeaderSubtitle>
              <HeaderTitle>Habit Tracker</HeaderTitle>
              <HeaderEmail>Signed in as {session.email}</HeaderEmail>
            </HeaderLeft>
            <HeaderButtons>
              <Button data-testid="create-habit-button" type="button" variant="hero" onClick={() => setIsFormOpen(true)}>
                New habit
              </Button>
              <Button data-testid="auth-logout-button" type="button" variant="outline" onClick={handleLogout}>
                Log out
              </Button>
            </HeaderButtons>
          </HeaderContent>
        </Header>

        {(isFormOpen || editingHabit) && (
          <HabitForm habit={editingHabit} onCancel={() => { setIsFormOpen(false); setEditingHabit(null); }} onSave={handleSaveHabit} />
        )}

        {habits.length === 0 ? (
          <EmptyState data-testid="empty-state">
            <EmptyStateIcon>＋</EmptyStateIcon>
            <EmptyStateTitle>No habits yet</EmptyStateTitle>
            <EmptyStateText>Create your first daily habit to start a streak.</EmptyStateText>
          </EmptyState>
        ) : (
          <HabitsGrid>
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={handleToggle}
                onEdit={(selectedHabit) => { setEditingHabit(selectedHabit); setIsFormOpen(true); }}
                onDelete={setDeletingHabit}
              />
            ))}
          </HabitsGrid>
        )}
      </DashboardContainer>

      {deletingHabit && (
        <DeleteModal role="dialog" aria-modal="true" aria-labelledby="delete-title">
          <DeleteModalContent>
            <DeleteModalTitle id="delete-title">Delete habit?</DeleteModalTitle>
            <DeleteModalText>This removes {deletingHabit.name} from your list.</DeleteModalText>
            <DeleteModalButtons>
              <Button data-testid="confirm-delete-button" type="button" variant="destructive" onClick={handleConfirmDelete}>Delete</Button>
              <Button type="button" variant="outline" onClick={() => setDeletingHabit(null)}>Cancel</Button>
            </DeleteModalButtons>
          </DeleteModalContent>
        </DeleteModal>
      )}
    </DashboardMain>
  );
}
