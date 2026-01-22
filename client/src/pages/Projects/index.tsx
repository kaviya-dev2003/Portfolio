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
import QuizJavaImg from "../../assets/images/QuizJava.png";
import ConvertlyImg from "../../assets/images/Convertly.png";
import EventImg from "../../assets/images/EventNexus.png";
import ToForeverImg from "../../assets/images/ToMyForever.png";
import VoidImg from "../../assets/images/Void.png";
import WaitlestImg from "../../assets/images/WaitlistWebsites.png";
import ClientFlowImg from "../../assets/images/ClientFlow.png";





const Container = styled.section`
  padding: 5rem 10%;
  
  @media (max-width: 768px) {
    padding: 4rem 10% 8rem;
  }
`;

const Header = styled(motion.div)`
  margin-bottom: 5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
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
      id: "event-nexus",
      title: "Event Nexus 🎉",
      tech: "React.js, Node.js, Express.js, MySQL",
      image: EventImg
    },
    {
      id: "convertly",
      title: "Convertly 📩",
      tech: "React.js, Node.js, Express.js, MySQL",
      image: ConvertlyImg
    },
    {
      id: "waitlist-website",
      title: "Waitlist Website 📝",
      tech: "React.js, Vite, Bootstrap 5, CSS",
      image: WaitlestImg
    },
    {
      id: "void-studio",
      title: "VOID Studio Website 🎨",
      tech: "HTML, CSS",
      image: VoidImg
    },
    {
      id: "to-my-forever",
      title: "To My Forever 💖",
      tech: "HTML, CSS",
      image: ToForeverImg
    },
    {
      id: "clientflow",
      title: "CLIENTFLOW 💼",
      tech: "Laravel, MySQL, Blade, Bootstrap 5, CSS",
      image: ClientFlowImg
    },
    {
      id: "solestyle",
      title: "SoleStyle 👟",
      tech: "HTML, CSS",
      image: AdaptoWebImg
    },
    {
      id: "sweetcravings",
      title: "SweetCravings 🍰",
      tech: "HTML, CSS, JavaScript",
      image: EcommerceImg
    },
    {
      id: "quizmaster",
      title: "QuizMaster 🎓",
      tech: "Core Java",
      image: QuizImg
    },
    {
      id: "timebound-quiz",
      title: "TimeBound Quiz System ⏱️",
      tech: "Core Java, JSP, Servlets",
      image: QuizJavaImg
    },
    {
      id: "portfolio",
      title: "Portfolio 💖",
      tech: "React.js, Express.js, Vite, Bootstrap 5, CSS",
      image: PortfolioImg
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
            <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: theme.colors.secondary }}>
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.5s ease' }}
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
