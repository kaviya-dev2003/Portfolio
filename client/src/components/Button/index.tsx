import React from "react";
import styled, { css } from "styled-components";
import { motion, HTMLMotionProps } from "framer-motion";
import { theme } from "../../styles/theme";

interface ButtonProps {
    variant?: "primary" | "secondary" | "outline";
    size?: "small" | "medium" | "large";
}

const BaseButton = styled.button<ButtonProps>`
  border-radius: 8px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  letter-spacing: 0.5px;
  border: none;
  outline: none;
  font-family: ${theme.fonts.body};
  transition: ${theme.transitions.standard};
  
  ${({ size }) => {
        switch (size) {
            case "small": return css`padding: 8px 16px; font-size: 0.85rem;`;
            case "large": return css`padding: 16px 32px; font-size: 1.1rem;`;
            default: return css`padding: 14px 28px; font-size: 1rem;`;
        }
    }}

  ${({ variant }) => {
        switch (variant) {
            case "secondary":
                return css`
          background-color: ${theme.colors.accent};
          color: ${theme.colors.white};
        `;
            case "outline":
                return css`
          background-color: transparent;
          border: 2px solid ${theme.colors.primary};
          color: ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.secondary};
          }
        `;
            default:
                return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
        `;
        }
    }}
`;

const MotionButton = motion(BaseButton);

const Button: React.FC<ButtonProps & HTMLMotionProps<"button">> = ({ children, variant = "primary", size = "medium", ...props }) => {
    return (
        <MotionButton
            {...(props as any)}
            variant={variant}
            size={size}
            whileHover={{
                y: -2,
                boxShadow: "0 10px 20px rgba(15, 23, 42, 0.1)",
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </MotionButton>
    );
};

export default Button;
