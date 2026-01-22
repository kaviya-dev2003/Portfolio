import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Button, Toast } from "../../components";
import { theme } from "../../styles/theme";
import { slideUp, staggerContainer } from "../../animations/motionVariants";
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/images/profile.png";

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
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const PrimaryActions = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ViewResumeLink = styled(motion.button)`
  background: none;
  border: none;
  color: ${theme.colors.muted};
  font-family: ${theme.fonts.subheadings};
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  margin-top: 0.5rem;
  transition: ${theme.transitions.standard};

  &:hover {
    color: ${theme.colors.accent};
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
  // background: ${theme.colors.primary};
  background:transprant;
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

const ProfileImage = styled(motion.img)`
  width: 450px;
  height: 450px;
  object-fit: cover;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  box-shadow: ${theme.shadows.soft};
  position: absolute;
  top: 0%;
  left: 10%;
  transform: translate(-50%, -50%);
  z-index: 2;
  
  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleDownloadResume = () => {
    // Direct download logic
    const link = document.createElement("a");
    link.href = `${process.env.PUBLIC_URL}/resume.pdf`;
    link.download = "Kaviya_Venkatesh_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Tracking (localStorage)
    const count = parseInt(localStorage.getItem("resume_downloads") || "0");
    localStorage.setItem("resume_downloads", (count + 1).toString());

    // Feedback
    setShowToast(true);
  };

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
          <PrimaryActions>
            <Button variant="primary" onClick={() => navigate('/projects')}>View Projects</Button>
            <Button variant="outline" onClick={handleDownloadResume}>Download Resume</Button>
          </PrimaryActions>
          <ViewResumeLink onClick={() => navigate('/resume')}>
            Or view resume in browser
          </ViewResumeLink>
        </ButtonGroup>
      </HeroContent>
      <HeroImageWrapper
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div style={{ position: 'relative' }}>
          <AbstractShape />
          <ProfileImage
            src={profileImg}
            alt="Kaviya Venkatesh"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
      </HeroImageWrapper>

      <Toast
        isVisible={showToast}
        message="Resume downloaded successfully!"
        onClose={() => setShowToast(false)}
      />
    </HeroSection>
  );
};

export default Home;
