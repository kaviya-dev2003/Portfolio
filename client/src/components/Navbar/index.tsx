import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { FaBars, FaTimes } from "react-icons/fa";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 10%;
  height: 80px;
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
  transition: ${theme.transitions.standard};
`;

const Logo = styled(Link)`
  font-family: ${theme.fonts.headings};
  font-size: 1.8rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 80px;
    right: 0;
    width: 100%;
    background: ${theme.colors.secondary};
    padding: 2rem;
    box-shadow: ${theme.shadows.soft};
    align-items: center;
  }
`;

const NavLink = styled(Link) <{ $active: boolean }>`
  font-family: ${theme.fonts.subheadings};
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? theme.colors.accent : theme.colors.primary)};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: ${({ $active }) => ($active ? "100%" : "0")};
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: ${theme.colors.accent};
    transition: ${theme.transitions.standard};
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    color: ${theme.colors.accent};
  }
`;

const Hamburger = styled.div`
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: ${theme.colors.primary};
  z-index: 10001; /* Above the fixed nav and any mobile menu */
  padding: 0.5rem;
  line-height: 0;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Cast icons to any to resolve React 19 JSX type conflict
  const IconClose = FaTimes as any;
  const IconOpen = FaBars as any;

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <Nav>
      <Logo to="/">Kaviya</Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IconClose /> : <IconOpen />}
      </Hamburger>
      <NavLinks $isOpen={isOpen}>
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            $active={location.pathname === link.path}
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </NavLink>
        ))}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
