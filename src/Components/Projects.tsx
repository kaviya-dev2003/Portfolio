// Updated ProjectsComponent with mobile responsiveness

import styled from "styled-components";
import { motion } from "framer-motion";
import portfolioImg from "../Images/Portfolio.png";
import AdaptoWeb from "../Images/AdaptoWeb.png";
import Ecommerce from "../Images/Ecommerce.png";
import Quiz from "../Images/Quiz.png";
import QuizJava from "../Images/QuizJava.png";


const ProjectsSection = styled.section`
  background: var(--first-color);
  padding: 6rem 2rem;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--sixth-color);

  @media (max-width: 480px) {
    padding: 4rem 1rem;
  }
`;

const ShapeOne = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  background: var(--fourth-color);
  opacity: 0.25;
  top: 8%;
  left: 5%;
  border-radius: 50%;
  filter: blur(18px);
  z-index: 1;

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    top: 5%;
    left: 2%;
  }
`;

const ShapeTwo = styled.div`
  position: absolute;
  width: 220px;
  height: 220px;
  background: var(--fifth-color);
  opacity: 0.28;
  bottom: 15%;
  right: 8%;
  border-radius: 40px;
  transform: rotate(45deg);
  filter: blur(22px);
  z-index: 1;

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    right: 5%;
  }
`;

const ShapeThree = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  background: var(--third-color);
  opacity: 0.22;
  top: 55%;
  left: 40%;
  border-radius: 50%;
  filter: blur(20px);
  z-index: 1;

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    left: 30%;
  }
`;

const Title = styled.h1`
 font-size: 3rem;
  margin-bottom: 2rem;
  font-family: var(--primary-font);
  color: var(--sixth-color);

  @media (max-width: 480px) {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  z-index: 4;

  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const Card = styled(motion.div)`
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1.5rem;
  padding: 1.8rem;
  color: #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 480px) {
    padding: 1.2rem;
    gap: 0.8rem;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 1rem;

  @media (max-width: 480px) {
    height: 160px;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-family: var(--primary-font);
   color: var(--third-color);

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Tech = styled.p`
  font-size: 0.95rem;
  opacity: 0.9;
  font-family: var(--primary-font);
   color: var(--fifth-color);

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Desc = styled.p`
  font-size: 0.95rem;
  opacity: 0.9;
  font-family: var(--secondary-font);

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const LearnMore = styled.a`
  margin-top: auto;
  font-size: 0.95rem;
  padding: 0.6rem 1rem;
  background: #f77e0d;
  color: #fff;
  border-radius: 0.6rem;
  text-decoration: none;
  display: inline-block;
  font-family: var(--primary-font);
  transition: 0.3s;

  &:hover {
    background: #eb4604;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.5rem 0.8rem;
  }
`;

const ProjectsComponent = () => {
  const projects = [
    {
      image: portfolioImg,
      title: "Personal Portfolio Website",
      technologies: "React, Styled-components",
      description: "A modern, highly responsive portfolio showcasing my journey and skills.",
    },
    {
      image: AdaptoWeb,
      title: "E-commerce Application",
      technologies: "MERN Stack",
      description: "A complete online shopping experience with authentication and product control.",
    },
    {
      image: Ecommerce,
      title: "Selenium Automation Framework",
      technologies: "Selenium, Java",
      description: "Advanced automation framework with reusable modules and reporting.",
    },
    {
      image: Quiz,
      title: "WordPress Blog Website",
      technologies: "WordPress, SEO",
      description: "SEO-optimized WordPress blog with structured design and performance focus.",
    },
    {
      image: QuizJava,
      title: "WordPress Blog Website",
      technologies: "WordPress, SEO",
      description: "SEO-optimized WordPress blog with structured design and performance focus.",
    },
  ];

  return (
    <section id="projects">
    <ProjectsSection>
      <ShapeOne />
      <ShapeTwo />
      <ShapeThree />

      <Title>Projects</Title>

      <ProjectsGrid>
        {projects.map((project, index) => (
          <Card key={index} whileHover={{ y: -10, scale: 1.03 }} transition={{ duration: 0.3 }}>
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectTitle>{project.title}</ProjectTitle>
            <Tech>{project.technologies}</Tech>
            <Desc>{project.description}</Desc>
            <LearnMore href="#">Learn More</LearnMore>
          </Card>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
    </section>
  );
};

export default ProjectsComponent;