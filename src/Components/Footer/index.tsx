import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const FooterContainer = styled.footer`
  padding: 4rem 10%;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Copyright = styled.p`
  color: ${theme.colors.muted};
  font-size: 0.9rem;
  margin-bottom: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const SocialLink = styled.a`
  color: ${theme.colors.white};
  font-size: 1.2rem;
  &:hover {
    color: ${theme.colors.accent};
  }
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: theme.colors.white, marginBottom: '0.5rem' }}>Kaviya</h3>
                <p style={{ color: theme.colors.muted }}>Crafting scalable, elegant, and user-centric web solutions.</p>
            </div>
            <SocialLinks>
                <SocialLink href="https://github.com/kaviya-dev2003" target="_blank">GitHub</SocialLink>
                <SocialLink href="https://linkedin.com/in/kaviya-venkatesh" target="_blank">LinkedIn</SocialLink>
            </SocialLinks>
            <Copyright>© {new Date().getFullYear()} Kavya Venkatesh. All rights reserved.</Copyright>
        </FooterContainer>
    );
};

export default Footer;
