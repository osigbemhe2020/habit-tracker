"use client";

import styled from "styled-components";

interface ButtonProps {
  variant?: "hero" | "default" | "outline" | "secondary" | "destructive" | "success";
  size?: "xl" | "default";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  "data-testid"?: string;
}

const StyledButton = styled.button<ButtonProps>`
  padding: ${({ size }) => (size === "xl" ? "1rem 2rem" : "0.75rem 1.5rem")};
  font-size: ${({ size }) => (size === "xl" ? "1.125rem" : "1rem")};
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ variant = "default" }) => {
    switch (variant) {
      case "hero":
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          &:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
          }
        `;
      case "outline":
        return `
          background: transparent;
          border: 1px solid #d1d5db;
          color: #374151;
          &:hover {
            background: #f3f4f6;
            color: #111827;
          }
        `;
      case "secondary":
        return `
          background: #6b7280;
          color: white;
          &:hover {
            background: #4b5563;
          }
        `;
      case "destructive":
        return `
          background: #ef4444;
          color: white;
          &:hover {
            background: #dc2626;
          }
        `;
      case "success":
        return `
          background: #22c55e;
          color: white;
          &:hover {
            background: #16a34a;
          }
        `;
      default:
        return `
          background: #3b82f6;
          color: white;
          &:hover {
            background: #2563eb;
          }
        `;
    }
  }}
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px hsl(var(--ring) / 0.5);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export function Button({ variant, size, type = "button", onClick, children, disabled, "data-testid": dataTestId }: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
    >
      {children}
    </StyledButton>
  );
}
