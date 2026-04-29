"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StyledButton } from "@/components/ui/StyledButton";
import { createId, getUsers, saveSession, saveUsers } from "@/lib/localStorage";
import type { User } from "@/types/auth";
import { FormContainer, FormGroup, Label, Input, ErrorMessage } from "./LoginForm.styles";

export function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const users = getUsers();
    const normalizedEmail = email.trim();

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (users.some((user) => user.email === normalizedEmail)) {
      setError("User already exists");
      return;
    }

    const user: User = {
      id: createId("user"),
      email: normalizedEmail,
      password,
      name: normalizedEmail.split("@")[0], // Use email prefix as default name
      createdAt: new Date().toISOString(),
    };

    saveUsers([...users, user]);
    saveSession({ userId: user.id, email: user.email, name: user.name });
    router.push("/dashboard");
  }

  return (
    <FormContainer onSubmit={handleSubmit} aria-label="Signup form">
      <FormGroup>
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          data-testid="auth-signup-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          data-testid="auth-signup-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
        <Input
          id="signup-confirm-password"
          data-testid="auth-signup-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm your password"
          required
        />
      </FormGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <StyledButton 
        data-testid="auth-signup-submit" 
        type="submit" 
        variant="hero" 
        size="xl"
      >
        Create account
      </StyledButton>
    </FormContainer>
  );
}
