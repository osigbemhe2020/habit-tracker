import { LoginForm } from "@/components/auth/LoginForm";
import { Main, Section, WelcomeText, Title, Subtitle, SignupPrompt, SignupLink } from "./LoginPage.styles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in — Habit Tracker",
  description: "Log in to your local Habit Tracker account.",
  openGraph: {
    title: "Log in — Habit Tracker",
    description: "Access your daily habits and streaks.",
  },
};

export default function LoginPage() {
  return (
    <Main>
      <Section>
        <WelcomeText>Welcome back</WelcomeText>
        <Title>Log in</Title>
        <Subtitle>Continue building your streaks.</Subtitle>
        <LoginForm />
        <SignupPrompt>
          New here? <SignupLink href="/signup">Create an account</SignupLink>
        </SignupPrompt>
      </Section>
    </Main>
  );
}
