import { useState } from "react";
import styled from "styled-components";

// Dynamically require icons
const FaBars = require("react-icons/fa").FaBars;
const FaTimes = require("react-icons/fa").FaTimes;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between; /* Ensures left and right alignment */
  align-items: center;
  padding: 1rem 3rem;
  background: linear-gradient(
    145deg,
    rgba(153, 165, 125, 0.2),
    rgba(40, 39, 35, 0.2)
  );
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--fourth-color);
`;

const NavMenu = styled.div<{ menuOpen: boolean }>`
  display: flex;
  gap: 3rem;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background: rgba(40, 39, 35, 0.9);
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    display: ${({ menuOpen }) => (menuOpen ? "flex" : "none")};
  }
`;

const NavItem = styled.a`
  color: var(--fourth-color);
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-family: "Arial", sans-serif;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: var(--sixth-color);
    transform: scale(1.1);
  }
`;

const Hamburger = styled.div`
  display: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;

  @media screen and (max-width: 820px) {
    display: block;
  }
`;

const NavbarComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Navbar>
      <Logo>Kaviya</Logo> {/* Left-aligned logo */}
      <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
        <NavMenu menuOpen={menuOpen}>
          <NavItem href="#about">About</NavItem>
          <NavItem href="#skills">Skills</NavItem>
          {/* <NavItem href="#visionary">Visionary</NavItem> */}
          <NavItem href="#experience">Experience</NavItem>
          <NavItem href="#projects">Projects</NavItem>
          {/* <NavItem href="#education">Education</NavItem> */}
        <NavItem href="#education">Contact</NavItem>

        </NavMenu>
    </Navbar>
  );
};



export default NavbarComponent;
