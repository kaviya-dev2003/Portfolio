import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Navbar, Footer } from "../components";
import { pageTransition } from "../animations/motionVariants";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled(motion.main)`
  flex: 1;
  padding-top: 80px; /* Space for fixed navbar */
`;

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <LayoutWrapper>
                <Navbar />
                <AnimatePresence mode="wait">
                    <MainContent
                        variants={pageTransition}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={window.location.pathname}
                    >
                        {children}
                    </MainContent>
                </AnimatePresence>
                <Footer />
            </LayoutWrapper>
        </ThemeProvider>
    );
};

export default MainLayout;
