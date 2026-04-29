import styled from 'styled-components';
import Link from 'next/link';

export const Main = styled.main`
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 2rem 1rem;
  background: #f8fafc;
  color: #111827;
`;

export const Section = styled.section`
  width: 100%;
  max-width: 28rem;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

export const StartText = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6b7280;
`;

export const Title = styled.h1`
  margin-top: 0.5rem;
  font-size: 2.25rem;
  font-weight: 900;
  color: #111827;
  font-family: 'Inter', system-ui, sans-serif;
`;

export const Subtitle = styled.p`
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

export const LoginPrompt = styled.p`
  margin-top: 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
`;

export const LoginLink = styled(Link)`
  font-weight: 700;
  color: #3b82f6;
  text-underline-offset: 0.25em;
  
  &:hover {
    text-decoration: underline;
  }
`;
