"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers, saveSession } from "@/lib/localStorage";
import { StyledButton } from "@/components/ui/StyledButton";
import { FormContainer, FormGroup, Label, Input, ErrorMessage } from "./LoginForm.styles";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = getUsers().find(
      (candidate) => candidate.email === email.trim() && candidate.password === password,
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    saveSession({ userId: user.id, email: user.email, name: user.name });
    router.push("/dashboard");
  }

  return (
    <FormContainer onSubmit={handleSubmit} aria-label="Login form">
      <FormGroup>
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          data-testid="auth-login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          data-testid="auth-login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
        />
      </FormGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <StyledButton 
        data-testid="auth-login-submit" 
        type="submit" 
        variant="hero" 
        size="xl"
      >
        Log in
      </StyledButton>
    </FormContainer>
  );
}
