import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../../styles/theme";
import { slideUp, staggerContainer } from "../../animations/motionVariants";

const Container = styled.section`
  padding: 8rem 10%;
`;

const Header = styled(motion.div)`
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Bio = styled.div`
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2rem;
  }
`;

const SkillsSection = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: ${theme.shadows.soft};
`;

const SkillGroup = styled.div`
  margin-bottom: 2rem;
`;

const SkillTitle = styled.h4`
  font-family: ${theme.fonts.subheadings};
  font-size: 0.9rem;
  text-transform: uppercase;
  color: ${theme.colors.accent};
  margin-bottom: 1rem;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const SkillTag = styled.span`
  background: ${theme.colors.secondary};
  color: ${theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const ExperienceTimeline = styled.div`
  margin-top: 6rem;
`;

const TimelineItem = styled(motion.div)`
  border-left: 2px solid ${theme.colors.accent};
  padding-left: 2.5rem;
  padding-bottom: 3rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -7px;
    top: 0;
    width: 12px;
    height: 12px;
    background: ${theme.colors.accent};
    border-radius: 50%;
  }
`;

const TimelineYear = styled.span`
  font-family: ${theme.fonts.subheadings};
  font-size: 0.9rem;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const TimelineRole = styled.h3`
  font-size: 1.4rem;
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
`;

const TimelineCompany = styled.h4`
  font-family: ${theme.fonts.subheadings};
  font-size: 1rem;
  color: ${theme.colors.muted};
  margin-bottom: 1rem;
`;

const About: React.FC = () => {
  const skills = {
    Frontend: ["React.js", "TypeScript", "Styled-components", "Framer Motion", "Tailwind CSS"],
    Backend: ["Node.js", "Express", "MySQL", "PHP (XAMPP)", "Java"],
    Tools: ["Git", "Docker", "AWS", "Figma", "Selenium"]
  };

  const experiences = [
    {
      year: "2023 - Present",
      role: "Full Stack Developer",
      company: "Freelance / Projects",
      desc: "Developing end-to-end web applications for various clients, focusing on scalability and user experience."
    },
    {
      year: "2022 - 2023",
      role: "Junior Web Developer",
      company: "Internship",
      desc: "Contributed to frontend development of enterprise-level dashboards and API integrations."
    }
  ];

  return (
    <Container>
      <Header variants={slideUp} initial="initial" animate="animate">
        <Title>About Me</Title>
        <div style={{ width: '60px', height: '4px', background: theme.colors.accent }}></div>
      </Header>

      <ContentGrid>
        <Bio>
          <p>
            I am a dedicated Full Stack Developer with a passion for building robust and elegant digital solutions.
            With a strong foundation in both frontend and backend technologies, I bridge the gap between complex
            technical architecture and intuitive user experiences.
          </p>
          <p>
            My approach is rooted in clean code, performance optimization, and a deep understanding of user needs.
            Whether it's an enterprise automation framework or a high-converting e-commerce platform, I strive
            for excellence in every line of code I write.
          </p>
        </Bio>

        <SkillsSection>
          {Object.entries(skills).map(([category, items]) => (
            <SkillGroup key={category}>
              <SkillTitle>{category}</SkillTitle>
              <SkillTags>
                {items.map(skill => <SkillTag key={skill}>{skill}</SkillTag>)}
              </SkillTags>
            </SkillGroup>
          ))}
        </SkillsSection>
      </ContentGrid>

      <ExperienceTimeline>
        <Title style={{ fontSize: '2rem', marginBottom: '3rem' }}>Professional Experience</Title>
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          {experiences.map((exp, index) => (
            <TimelineItem key={index} variants={slideUp}>
              <TimelineYear>{exp.year}</TimelineYear>
              <TimelineRole>{exp.role}</TimelineRole>
              <TimelineCompany>{exp.company}</TimelineCompany>
              <p>{exp.desc}</p>
            </TimelineItem>
          ))}
        </motion.div>
      </ExperienceTimeline>
    </Container>
  );
};

export default About;
