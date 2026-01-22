import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../styles/theme";
import { FaCheckCircle } from "react-icons/fa";

const ToastContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: white;
  border-left: 4px solid ${theme.colors.accent};
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: ${theme.shadows.medium};
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 2000;
`;

const IconWrapper = styled.div`
  color: ${theme.colors.accent};
  font-size: 1.2rem;
  display: flex;
`;

const Message = styled.span`
  color: ${theme.colors.primary};
  font-weight: 600;
  font-size: 0.95rem;
`;

interface ToastProps {
    isVisible: boolean;
    message: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ isVisible, message, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    // Cast icon to any for React 19 compatibility
    const IconCheck = FaCheckCircle as any;

    return (
        <AnimatePresence>
            {isVisible && (
                <ToastContainer
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                >
                    <IconWrapper>
                        <IconCheck />
                    </IconWrapper>
                    <Message>{message}</Message>
                </ToastContainer>
            )}
        </AnimatePresence>
    );
};

export default Toast;
