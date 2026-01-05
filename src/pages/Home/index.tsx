import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Button } from "../../components";
import { theme } from "../../styles/theme";
import { slideUp, staggerContainer } from "../../animations/motionVariants";

const HeroSection = styled.section`
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 2rem;
  }
`;

const HeroContent = styled(motion.div)`
  flex: 1;
  max-width: 600px;
`;

const Name = styled(motion.h1)`
  font-size: 4.5rem;
  margin-bottom: 0.5rem;
  color: ${theme.colors.primary};
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Role = styled(motion.h2)`
  font-size: 1.5rem;
  color: ${theme.colors.accent};
  margin-bottom: 1.5rem;
  font-family: ${theme.fonts.subheadings};
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: ${theme.colors.muted};
  margin-bottom: 2.5rem;
  max-width: 500px;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const HeroImageWrapper = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  
  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const AbstractShape = styled.div`
  width: 400px;
  height: 400px;
  background: ${theme.colors.primary};
  opacity: 0.05;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    border: 1px solid ${theme.colors.primary};
    border-radius: inherit;
    opacity: 0.2;
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const Home: React.FC = () => {
  return (
    <HeroSection>
      <HeroContent
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <Name variants={slideUp}>Kaviya Venkatesh</Name>
        <Role variants={slideUp}>Full Stack Developer</Role>
        <Description variants={slideUp}>
          Crafting scalable, elegant, and user-centric web solutions with a focus on performance and modern design principles.
        </Description>
        <ButtonGroup variants={slideUp}>
          <Button variant="primary" onClick={() => window.location.href = '#/projects'}>View Projects</Button>
          <Button variant="outline">Download Resume</Button>
        </ButtonGroup>
      </HeroContent>
      <HeroImageWrapper
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <AbstractShape />
      </HeroImageWrapper>
    </HeroSection>
  );
};

export default Home;
