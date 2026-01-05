import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;600&family=Playfair+Display:wght@700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.body};
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.headings};
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${theme.colors.primary};
  }

  h2 {
    font-family: ${theme.fonts.subheadings};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: ${theme.colors.muted};
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: ${theme.transitions.standard};
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: ${theme.fonts.body};
    transition: ${theme.transitions.standard};
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.colors.secondary};
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.muted};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primary};
  }
`;
