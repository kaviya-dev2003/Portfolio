import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../../styles/theme";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: 6rem 10% 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const BrandColumn = styled.div`
  max-width: 350px;
`;

const FooterLogo = styled(Link)`
  font-family: ${theme.fonts.headings};
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.white};
  margin-bottom: 1.5rem;
  display: block;
`;

const Description = styled.p`
  color: ${theme.colors.muted};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const NavColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ColumnTitle = styled.h4`
  font-family: ${theme.fonts.subheadings};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${theme.colors.accent};
  margin-bottom: 1.5rem;
`;

const FooterLink = styled(Link)`
  color: ${theme.colors.muted};
  transition: ${theme.transitions.standard};
  font-size: 0.95rem;

  &:hover {
    color: ${theme.colors.accent};
    transform: translateX(5px);
  }
`;

const SocialColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialIconLink = styled.a`
  color: ${theme.colors.white};
  font-size: 1.5rem;
  transition: ${theme.transitions.standard};

  &:hover {
    color: ${theme.colors.accent};
    transform: translateY(-3px);
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Copyright = styled.p`
  color: ${theme.colors.muted};
  font-size: 0.85rem;
`;

const BackToTop = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${theme.colors.white};
  padding: 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transitions.standard};

  &:hover {
    background: ${theme.colors.accent};
    border-color: ${theme.colors.accent};
  }
`;

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cast icons to any for React 19 compatibility
  const IconGithub = FaGithub as any;
  const IconLinkedin = FaLinkedin as any;
  const IconTwitter = FaEnvelope as any;
  const IconArrowUp = FaArrowUp as any;

  return (
    <FooterContainer>
      <FooterGrid>
        <BrandColumn>
          <FooterLogo to="/">Kaviya</FooterLogo>
          <Description>
            A dedicated Full Stack Developer crafting scalable, elegant, and user-centric web solutions with a focus on performance and modern design principles.
          </Description>
        </BrandColumn>

        <NavColumn>
          <ColumnTitle>Navigation</ColumnTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/projects">Projects</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </NavColumn>

        <SocialColumn>
          <ColumnTitle>Connect</ColumnTitle>
          <SocialIcons>
            <SocialIconLink href="https://github.com/kaviya-dev2003" target="_blank" aria-label="GitHub">
              <IconGithub />
            </SocialIconLink>
            <SocialIconLink href="https://www.linkedin.com/in/kaviya2003/" target="_blank" aria-label="LinkedIn">
              <IconLinkedin />
            </SocialIconLink>
            <SocialIconLink href="mailto:kaviyavenkatesh2003@gmail.com" target="_blank" aria-label="Email">
              <IconTwitter />
            </SocialIconLink>
          </SocialIcons>
          {/* <p style={{ color: theme.colors.muted, fontSize: '0.9rem', marginTop: '1rem' }}>
            kaviyavenkatesh2003@gmail.com
          </p> */}
        </SocialColumn>
      </FooterGrid>

      <BottomBar>
        <Copyright>© {new Date().getFullYear()} Kaviya Venkatesh. All rights reserved.</Copyright>
        <BackToTop onClick={scrollToTop} aria-label="Back to Top">
          <IconArrowUp />
        </BackToTop>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
