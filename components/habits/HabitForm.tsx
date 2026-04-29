"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { validateHabitName } from "@/lib/validators";
import type { Habit } from "@/types/habit";
import styled from "styled-components";

type HabitFormProps = {
  habit?: Habit | null;
  onCancel: () => void;
  onSave: (values: { name: string; description: string }) => void;
};

const HabitFormWrapper = styled.form`
  display: grid;
  gap: 1rem;
  border-radius: 0.75rem;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--card));
  padding: 1rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

const FormField = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 700;
  color: hsl(var(--foreground));
`;

const FormInput = styled.input`
  height: 2.75rem;
  border-radius: 0.5rem;
  border: 1px solid hsl(var(--input));
  background: hsl(var(--background));
  padding: 0 0.75rem;
  color: hsl(var(--foreground));
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: hsl(var(--ring));
    box-shadow: 0 0 0 3px hsl(var(--ring) / 0.2);
  }
`;

const FormTextarea = styled.textarea`
  min-height: 6rem;
  border-radius: 0.5rem;
  border: 1px solid hsl(var(--input));
  background: hsl(var(--background));
  padding: 0.75rem;
  color: hsl(var(--foreground));
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: hsl(var(--ring));
    box-shadow: 0 0 0 3px hsl(var(--ring) / 0.2);
  }
`;

const FormSelect = styled.select`
  height: 2.75rem;
  border-radius: 0.5rem;
  border: 1px solid hsl(var(--input));
  background: hsl(var(--background));
  padding: 0 0.75rem;
  color: hsl(var(--foreground));
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: hsl(var(--ring));
    box-shadow: 0 0 0 3px hsl(var(--ring) / 0.2);
  }
`;

const FormError = styled.p`
  border-radius: 0.5rem;
  background: hsl(var(--destructive) / 0.1);
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(var(--destructive));
`;

const FormActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export function HabitForm({ habit, onCancel, onSave }: HabitFormProps) {
  const [name, setName] = useState(habit?.name ?? "");
  const [description, setDescription] = useState(habit?.description ?? "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(habit?.name ?? "");
    setDescription(habit?.description ?? "");
    setError(null);
  }, [habit]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateHabitName(name);

    if (!result.valid) {
      setError(result.error);
      return;
    }

    onSave({ name: result.value, description: description.trim() });
  }

  return (
    <HabitFormWrapper data-testid="habit-form" onSubmit={handleSubmit}>
      <FormField>
        <FormLabel htmlFor="habit-name">Habit name</FormLabel>
        <FormInput
          id="habit-name"
          data-testid="habit-name-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </FormField>
      <FormField>
        <FormLabel htmlFor="habit-description">Description</FormLabel>
        <FormTextarea
          id="habit-description"
          data-testid="habit-description-input"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FormField>
      <FormField>
        <FormLabel htmlFor="habit-frequency">Frequency</FormLabel>
        <FormSelect
          id="habit-frequency"
          data-testid="habit-frequency-select"
          value="daily"
          disabled
          aria-label="Frequency"
        >
          <option value="daily">Daily</option>
        </FormSelect>
      </FormField>
      {error && <FormError>{error}</FormError>}
      <FormActions>
        <Button data-testid="habit-save-button" type="submit" variant="hero">Save</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </FormActions>
    </HabitFormWrapper>
  );
}
