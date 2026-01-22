import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../../styles/theme";
import { Button } from "../../components";
import { slideUp, staggerContainer } from "../../animations/motionVariants";

const Container = styled.div`
  padding-bottom: 8rem;
`;

const Hero = styled.section`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: 8rem 10% 4rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: ${theme.colors.white};
  margin-bottom: 1rem;
`;

const OneLiner = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.muted};
  max-width: 700px;
  margin: 0 auto 2rem;
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  background: rgba(249, 115, 22, 0.2);
  color: ${theme.colors.accent};
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid ${theme.colors.accent};
`;

const DetailContent = styled.section`
  max-width: 900px;
  margin: 4rem auto 0;
  padding: 0 10%;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${theme.colors.secondary};
  border-radius: 12px;
  margin-bottom: 4rem;
  box-shadow: ${theme.shadows.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.muted};
`;

const Section = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h3`
  font-family: ${theme.fonts.subheadings};
  font-size: 1.2rem;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  margin-bottom: 1.5rem;
  border-left: 4px solid ${theme.colors.accent};
  padding-left: 1rem;
`;

const List = styled.ul`
  list-style: none;
  li {
    margin-bottom: 1rem;
    position: relative;
    padding-left: 1.5rem;
    color: ${theme.colors.muted};
    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${theme.colors.accent};
      font-size: 1.5rem;
      line-height: 1;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 4rem;
`;

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  // Mock project data
  const projectsData: Record<string, any> = {
    "personal-portfolio": {
      title: "Portfolio 2.0",
      description: "A high-end professional portfolio built with corporate standards in mind.",
      tags: ["React", "TypeScript", "Styled-components", "Framer Motion"],
      problem: "Traditional portfolios are often too cluttered or lack a professional, multi-page structure that recruiters trust.",
      solution: "Implemented a clean, typography-focused design with separate pages for deep-diving into individual projects.",
      features: ["Dynamic Animations", "Responsive Grid Layouts", "Clean Typography System"],
    },
    "ecommerce-app": {
      title: "Enterprise E-commerce",
      description: "A scalable platform focusing on seamless user order flow and admin management.",
      tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      problem: "E-commerce sites often struggle with load times and complex checkout processes.",
      solution: "Optimized performance using SSR and integrated a streamlined payment gateway.",
      features: ["Admin Dashboard", "User Authentication", "Real-time Inventory Tracking"],
    },
    "selenium-framework": {
      title: "Automation Framework",
      description: "A robust testing suite designed for high reusability and detailed reporting.",
      tags: ["Java", "Selenium", "TestNG", "Jenkins"],
      problem: "Manual testing scales poorly and enterprise software requires reliable regression suites.",
      solution: "Developed an architecture-first framework that reduces script maintenance time by 40%.",
      features: ["Parallel Execution", "Custom HTML Reports", "Cross-browser Compatibility"],
    }
  };

  const project = projectsData[projectId || ""] || projectsData["personal-portfolio"];

  return (
    <Container>
      <Hero>
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <motion.div variants={slideUp}>
            <Title>{project.title}</Title>
            <OneLiner>{project.description}</OneLiner>
          </motion.div>
          <BadgeContainer>
            {project.tags.map((tag: string) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </BadgeContainer>
        </motion.div>
      </Hero>

      <DetailContent>
        <ImagePlaceholder>PROJECT PREVIEW</ImagePlaceholder>

        <Section>
          <SectionTitle>Problem & Solution</SectionTitle>
          <p><strong>Problem:</strong> {project.problem}</p>
          <p><strong>Solution:</strong> {project.solution}</p>
        </Section>

        <Section>
          <SectionTitle>Key Features</SectionTitle>
          <List>
            {project.features.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </List>
        </Section>

        <Actions>
          <a href="https://kaviya-dev2003.github.io/Portfolio/#/" target="_blank" rel="noopener noreferrer">
            <Button variant="primary">Live Demo</Button>
          </a>

          <a href="https://github.com/kaviya-dev2003/Portfolio" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">GitHub Code</Button>
          </a>
        </Actions>

        <div style={{ marginTop: '4rem' }}>
          <Link to="/projects" style={{ color: theme.colors.accent, fontWeight: 600 }}>← Back to Projects</Link>
        </div>
      </DetailContent>
    </Container>
  );
};

export default ProjectDetails;
