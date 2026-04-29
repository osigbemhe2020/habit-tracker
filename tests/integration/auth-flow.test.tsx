import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { SESSION_KEY, USERS_KEY } from "@/lib/localStorage";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

describe("auth flow", () => {
  beforeEach(() => {
    localStorage.clear();
    push.mockClear();
  });

  it("submits the signup form and creates a session", async () => {
    render(<SignupForm />);
    await userEvent.type(screen.getByTestId("auth-signup-email"), "new@example.com");
    await userEvent.type(screen.getByTestId("auth-signup-password"), "password");
    await userEvent.type(screen.getByTestId("auth-signup-confirm-password"), "password");
    await userEvent.click(screen.getByTestId("auth-signup-submit"));
    expect(JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]")).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null")).toMatchObject({ email: "new@example.com" });
    expect(push).toHaveBeenCalledWith("/dashboard");
  });

  it("shows an error for duplicate signup email", async () => {
    localStorage.setItem(USERS_KEY, JSON.stringify([{ id: "u1", email: "dup@example.com", password: "x", createdAt: "now" }]));
    render(<SignupForm />);
    await userEvent.type(screen.getByTestId("auth-signup-email"), "dup@example.com");
    await userEvent.type(screen.getByTestId("auth-signup-password"), "password");
    await userEvent.type(screen.getByTestId("auth-signup-confirm-password"), "password");
    await userEvent.click(screen.getByTestId("auth-signup-submit"));
    expect(screen.getByText("User already exists")).toBeInTheDocument();
  });

  it("submits the login form and stores the active session", async () => {
    localStorage.setItem(USERS_KEY, JSON.stringify([{ id: "u1", email: "ok@example.com", password: "secret", createdAt: "now" }]));
    render(<LoginForm />);
    await userEvent.type(screen.getByTestId("auth-login-email"), "ok@example.com");
    await userEvent.type(screen.getByTestId("auth-login-password"), "secret");
    await userEvent.click(screen.getByTestId("auth-login-submit"));
    expect(JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null")).toEqual({ userId: "u1", email: "ok@example.com" });
    expect(push).toHaveBeenCalledWith("/dashboard");
  });

  it("shows an error for invalid login credentials", async () => {
    render(<LoginForm />);
    await userEvent.type(screen.getByTestId("auth-login-email"), "bad@example.com");
    await userEvent.type(screen.getByTestId("auth-login-password"), "wrong");
    await userEvent.click(screen.getByTestId("auth-login-submit"));
    expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
  });
});
