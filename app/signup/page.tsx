import { SignupForm } from "@/components/auth/SignupForm";
import { Main, Section, StartText, Title, Subtitle, LoginPrompt, LoginLink } from "./SignUpPage.styles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up — Habit Tracker",
  description: "Create a local Habit Tracker account.",
  openGraph: {
    title: "Sign up — Habit Tracker",
    description: "Start tracking daily habits and streaks locally.",
  },
};

export default function SignupPage() {
  return (
    <Main>
      <Section>
        <StartText>Start today</StartText>
        <Title>Sign up</Title>
        <Subtitle>Create a local account for this device.</Subtitle>
        <SignupForm />
        <LoginPrompt>
          Already registered? <LoginLink href="/Login">Log in</LoginLink>
        </LoginPrompt>
      </Section>
    </Main>
  );
}
