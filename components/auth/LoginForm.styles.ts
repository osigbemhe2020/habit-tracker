import styled from 'styled-components';

export const FormContainer = styled.form`
  display: grid;
  gap: 1.25rem;
`;

export const FormGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 700;
  color: #111827;
`;

export const Input = styled.input`
  height: 3rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 0 1rem;
  font-size: 1rem;
  color: #111827;
  outline: none;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const ErrorMessage = styled.p`
  border-radius: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #dc2626;
`;
