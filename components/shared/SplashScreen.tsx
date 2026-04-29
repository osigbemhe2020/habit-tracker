import styled from "styled-components";

const SplashMain = styled.main`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: hsl(var(--background));
  padding: 0 1.5rem;
`;

const SplashSection = styled.section`
  position: relative;
  text-align: center;
`;

const GlowBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: -10;
  transform: scale(1.5);
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  filter: blur(3rem);
`;

const IconContainer = styled.div`
  margin: 0 auto 1.5rem;
  display: grid;
  place-items: center;
  height: 5rem;
  width: 5rem;
  border-radius: 1rem;
  background: hsl(var(--primary));
  font-size: 2.5rem;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: normal;
  color: hsl(var(--foreground));

  @media (min-width: 640px) {
    font-size: 3.75rem;
  }
`;

const Subtitle = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
`;

export function SplashScreen() {
  return (
    <SplashMain data-testid="splash-screen">
      <SplashSection>
        <GlowBackground />
        <IconContainer>✓</IconContainer>
        <Title>Habit Tracker</Title>
        <Subtitle>Loading your daily rhythm</Subtitle>
      </SplashSection>
    </SplashMain>
  );
}
