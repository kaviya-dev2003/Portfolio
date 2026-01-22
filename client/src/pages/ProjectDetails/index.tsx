import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../../styles/theme";
import { Button } from "../../components";
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

const Container = styled.div`
  padding-bottom: 8rem;
`;

const Hero = styled.section`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: 8rem 10% 4rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 6rem 10% 3rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: ${theme.colors.white};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    line-height: 1.2;
  }
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

const ImageContainer = styled.div`
  width: 100%;
  border-radius: 12px;
  margin-bottom: 4rem;
  box-shadow: ${theme.shadows.medium};
  overflow: hidden;
  background: ${theme.colors.secondary};

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
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

  // Project data
  const projectsData: Record<string, any> = {
    "solestyle": {
      title: "SoleStyle 👟",
      description: "A modern and responsive shoe website built using only HTML and CSS, focusing on clean UI, structured layouts, and strong visual presentation.",
      tags: ["HTML", "CSS"],
      problem: "Basic static websites often look outdated and lack proper layout structure and visual hierarchy.",
      solution: "Designed SoleStyle using only HTML and CSS, focusing on clean UI, structured layouts, and strong visual presentation without relying on frameworks or JavaScript.",
      features: [
        "Built using pure HTML & CSS (no frameworks, no JavaScript)",
        "Clean and modern UI design",
        "Well-structured layout and sections",
        "Responsive design for all screen sizes",
        "Visually appealing product and landing sections"
      ],
      techUsed: ["HTML", "CSS"],
      github: "https://github.com/kaviya-dev2003/solestyle-shoe-website",
      image: AdaptoWebImg
    },
    "sweetcravings": {
      title: "SweetCravings 🍰",
      description: "A frontend-focused e-commerce cake website with essential shopping features for smooth user experience.",
      tags: ["HTML", "CSS", "JavaScript"],
      problem: "Many small e-commerce websites lack smooth navigation and user-friendly shopping features.",
      solution: "Developed SweetCravings with product listing, add to cart, and wishlist features for a seamless and intuitive ordering experience.",
      features: [
        "User-friendly e-commerce UI design",
        "Product listing with clean layout",
        "Add to Cart functionality",
        "Wishlist feature for favorite items",
        "Smooth user interactions and navigation"
      ],
      techUsed: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/kaviya-dev2003/sweetcravings-cake-ecommerce",
      image: EcommerceImg
    },
    "quizmaster": {
      title: "QuizMaster 🎓",
      description: "A console-based quiz application using Core Java, focusing on OOP fundamentals and interactive scoring.",
      tags: ["Core Java"],
      problem: "Beginner-level applications often fail to clearly demonstrate programming fundamentals.",
      solution: "Developed QuizMaster with multiple-choice questions and scoring based on correct answers, focusing on logic and OOP concepts.",
      features: [
        "Console-based interactive quiz system",
        "Multiple-choice question handling",
        "Final score calculation based on correct answers",
        "Clean and simple user flow",
        "No external libraries or frameworks used"
      ],
      techUsed: ["Core Java", "OOP", "Control Statements", "Loops", "Conditional Logic"],
      github: "https://github.com/kaviya-dev2003/quizmaster-java-application",
      image: QuizImg
    },
    "timebound-quiz": {
      title: "TimeBound Quiz System ⏱️",
      description: "A web-based quiz application with 60-second time limits per question using Core Java, JSP, and Servlets.",
      tags: ["Core Java", "JSP", "Servlets"],
      problem: "Traditional quiz apps lack time constraints and real-time feedback, reducing interactivity.",
      solution: "Developed a time-bound system providing instant feedback, session management, and interactive quiz flow.",
      features: [
        "Time-bound quiz with 60-second limit per question",
        "Instant feedback after each answer",
        "Session-based user handling",
        "Interactive and real-time quiz flow",
        "No external frameworks used"
      ],
      techUsed: ["Core Java", "JSP", "Servlets", "Session Management", "Apache Tomcat"],
      github: "https://github.com/kaviya-dev2003/timebound-quiz-jsp-servlet",
      image: QuizJavaImg
    },
    "event-nexus": {
      title: "Event Nexus 🎉",
      description: "Full-stack event management platform with role-based access, booking approvals, mock payments, and secure backend.",
      tags: ["React.js", "Node.js", "Express.js", "MySQL"],
      problem: "Most event platforms do not reflect real-world workflows with roles, approvals, and payments.",
      solution: "Built a full-stack system replicating real-world event management, including secure database and responsive UI.",
      features: [
        "Role-based access control (Admin / Organizer / User)",
        "Event creation, booking, and approval workflow",
        "Mock payment integration",
        "Secure backend with structured MySQL database",
        "Fully responsive UI from mobile to desktop"
      ],
      techUsed: ["React.js", "Bootstrap", "Node.js", "Express.js", "MySQL"],
      github: "https://github.com/kaviya-dev2003/event-nexus",
      image: EventImg
    },
    "convertly": {
      title: "Convertly 📩",
      description: "Full-stack lead management platform with React frontend, Express backend, MySQL database, and responsive design.",
      tags: ["React.js", "Node.js", "Express.js", "MySQL"],
      problem: "Lead collection platforms often lack responsiveness and structured frontend-backend integration.",
      solution: "Built Convertly with smooth navigation, secure form handling, role-based access, and mobile-first responsive design.",
      features: [
        "Frontend: React, Vite, React Router Dom, Bootstrap 5 & React-Bootstrap",
        "UI & Styling: Glassmorphism, soft gradients, Lucide-React icons, custom CSS",
        "Data Handling: Axios for contact form submissions",
        "Backend: Express, MySQL2, JWT, Bcryptjs, Helmet, Cors",
        "Responsive Design: Mobile-first layout with consistent Navbar & Footer"
      ],
      techUsed: ["React.js", "Bootstrap 5", "Node.js", "Express.js", "MySQL", "JWT", "Axios"],
      github: "https://github.com/kaviya-dev2003/CONVERTLY",
      image: ConvertlyImg
    },
    "waitlist-website": {
      title: "Waitlist Website 📝",
      description: "A website platform for managing waitlists efficiently, with responsive design and clean frontend.",
      tags: ["React.js", "Vite", "Bootstrap 5", "CSS"],
      problem: "Many waitlist systems lack clean UI and mobile-friendly design.",
      solution: "Built a responsive waitlist management system with modern UI components.",
      features: [
        "Responsive design for all devices",
        "Clean, minimal UI",
        "Efficient waitlist management"
      ],
      techUsed: ["React.js", "Vite", "Bootstrap 5", "CSS"],
      github: "https://github.com/kaviya-dev2003/WAITLIST-WEBSITE",
      image: WaitlestImg
    },
    "clientflow": {
      title: "CLIENTFLOW 💼",
      description: "Full-stack Laravel SaaS platform for client, project, and finance management with role-based access.",
      tags: ["Laravel", "MySQL", "Blade", "Bootstrap 5"],
      problem: "Small business management tools often lack structured SaaS architecture and robust role-based access.",
      solution: "Built CLIENTFLOW with modular frontend, comprehensive backend, and secure authentication.",
      features: [
        "Backend: Laravel, MySQL, Eloquent relationships",
        "Role-Based Access: Spatie Permissions",
        "Frontend: Blade templating, reusable layouts",
        "Core Modules: Dashboard, Projects, Finance",
        "Design System: Premium typography and color palette"
      ],
      techUsed: ["Laravel", "MySQL", "Blade", "Bootstrap 5", "Spatie Permissions"],
      github: "https://github.com/kaviya-dev2003/CLIENTFLOW",
      image: ClientFlowImg
    },
    "void-studio": {
      title: "VOID Studio Website 🎨",
      description: "4-page premium agency website with luxury minimal design, advanced CSS animations, and responsive layout.",
      tags: ["HTML", "CSS"],
      problem: "Many agency websites fail to deliver a luxury minimal aesthetic while maintaining responsiveness and subtle interactions.",
      solution: "Built VOID Studio with luxury typography, fluid layouts, and high-quality project showcase.",
      features: [
        "Design System: Dark palette with gold accents, Inter/Poppins/Outfit typography",
        "Pages: Home, About, Works, Contact",
        "Animations & Interactions: Hover reveals, micro-animations",
        "Responsive Design: Optimized for desktop, tablet, and mobile"
      ],
      techUsed: ["HTML5", "CSS3", "CSS Grid", "Flexbox"],
      github: "https://github.com/kaviya-dev2003/VOID-Studio",
      image: VoidImg
    },
    "to-my-forever": {
      title: "To My Forever 💖",
      description: "A mobile-first sequential storytelling website guiding users through a narrative with interactive design.",
      tags: ["HTML", "CSS"],
      problem: "Many storytelling websites lack sequential flow, mobile optimization, and emotional engagement.",
      solution: "Built To My Forever with sequential navigation, elegant typography, and interactive visual cues.",
      features: [
        "Sequential Navigation: Large pill-shaped buttons",
        "Story Chapters: Home → Our Story → Gallery → Forever",
        "Visual Design: Clean grids, heart overlays, touch/hover effects",
        "Interactive Highlights: Pulsating final CTA button",
        "Mobile-First Optimization: Enhanced spacing and responsive layouts"
      ],
      techUsed: ["HTML5", "CSS3", "Custom CSS"],
      github: "https://github.com/kaviya-dev2003/ToMyForever",
      image: ToForeverImg
    },
    "portfolio": {
      title: "Portfolio 💖",
      description: "A high-end professional portfolio built with corporate standards in mind.",
      tags: ["React", "TypeScript", "Styled-components", "Framer Motion"],
      problem: "Traditional portfolios are often too cluttered or lack a professional, multi-page structure that recruiters trust.",
      solution: "Implemented a clean, typography-focused design with separate pages for deep-diving into individual projects.",
      features: ["Dynamic Animations", "Responsive Grid Layouts", "Clean Typography System"],
      techUsed: ["React.js", "Vite", "Bootstrap 5", "CSS"],
      github: "https://github.com/kaviya-dev2003/Portfolio",
      image: PortfolioImg
    }
  };

  const project = projectsData[projectId || ""] || projectsData["portfolio"];

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
        <ImageContainer>
          <img src={project.image} alt={project.title} />
        </ImageContainer>

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

          {/* <a href={project.demo} target="_blank" rel="noopener noreferrer">
            <Button variant="primary">Live Demo</Button>
          </a> */}

          <a href={project.github} target="_blank" rel="noopener noreferrer">
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
