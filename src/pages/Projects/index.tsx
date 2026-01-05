import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { theme } from "../../styles/theme";
import { slideUp, staggerContainer } from "../../animations/motionVariants";
import PortfolioImg from "../../assets/images/Portfolio.png";
import EcommerceImg from "../../assets/images/Ecommerce.png";
import AdaptoWebImg from "../../assets/images/AdaptoWeb.png";
import QuizImg from "../../assets/images/Quiz.png";

const Container = styled.section`
  padding: 8rem 10%;
`;

const Header = styled(motion.div)`
  margin-bottom: 5rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  
  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${theme.shadows.soft};
  transition: ${theme.transitions.standard};
  
  &:hover {
    box-shadow: ${theme.shadows.medium};
    transform: translateY(-5px);
  }
`;

const ImagePlaceholder = styled(motion.div)`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.muted};
  font-family: ${theme.fonts.subheadings};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ProjectTech = styled.p`
  font-family: ${theme.fonts.subheadings};
  font-size: 0.85rem;
  color: ${theme.colors.muted};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
`;

const ViewLink = styled(Link)`
  font-family: ${theme.fonts.subheadings};
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.colors.accent};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::after {
    content: '→';
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: translateX(5px);
  }
`;

const Projects: React.FC = () => {
  const projectList = [
    {
      id: "personal-portfolio",
      title: "Premium Portfolio Website",
      tech: "React, TypeScript, Framer Motion",
      image: PortfolioImg
    },
    {
      id: "ecommerce-app",
      title: "Enterprise E-commerce Platform",
      tech: "Next.js, Node.js, Stripe, MongoDB",
      image: EcommerceImg
    },
    {
      id: "selenium-framework",
      title: "Automation Testing Framework",
      tech: "Java, Selenium, TestNG, Jenkins",
      image: AdaptoWebImg
    },
    {
      id: "wordpress-blog",
      title: "Modern Content Engine",
      tech: "WordPress, PHP, SEO Optimization",
      image: QuizImg
    }
  ];

  return (
    <Container>
      <Header variants={slideUp} initial="initial" animate="animate">
        <Title>Featured Projects</Title>
        <p>A selection of my recent work in development and architecture.</p>
      </Header>

      <ProjectGrid
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {projectList.map((project) => (
          <ProjectCard key={project.id} variants={slideUp}>
            <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <CardContent>
              <ProjectTech>{project.tech}</ProjectTech>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ViewLink to={`/projects/${project.id}`}>View Case Study</ViewLink>
            </CardContent>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </Container>
  );
};

export default Projects;
