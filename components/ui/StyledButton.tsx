import styled from 'styled-components';

interface StyledButtonProps {
  variant?: 'hero' | 'default';
  size?: 'xl' | 'default';
}

export const StyledButton = styled.button<StyledButtonProps>`
  padding: ${({ size }) => (size === 'xl' ? '1rem 2rem' : '0.75rem 1.5rem')};
  font-size: ${({ size }) => (size === 'xl' ? '1.125rem' : '1rem')};
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ variant }) => 
    variant === 'hero' 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : '#3b82f6'
  };
  color: white;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background: ${({ variant }) => 
      variant === 'hero' 
        ? 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)' 
        : '#2563eb'
    };
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
