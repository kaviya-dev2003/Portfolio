import styled from "styled-components";
import Kaviya from "../Images/Untitled.png";

const HeroSection = styled.section`
  background-color: var(--first-color);
  color: var(--fifth-color);
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  flex-direction: column;
  position: relative;
  overflow: hidden; /* Prevents shapes from going out of bounds */

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    padding: 0rem 2rem;
  }

  /* Background Shapes */
  &::before {
    content: "";
    position: absolute;
    width: 150px;
    height: 150px;
    background: var(--fourth-color);
    opacity: 0.3;
    top: 10%;
    left: 5%;
    border-radius: 50%;
    filter: blur(10px);
  }

  &::after {
    content: "";
    position: absolute;
    width: 200px;
    height: 200px;
    background: var(--fifth-color);
    opacity: 0.3;
    bottom: 20%;
    right: 40%;
    border-radius: 50%;
    filter: blur(10px);
  }
`;

const Content = styled.div`
  max-width: 90%;
  text-align: center;

  @media (min-width: 768px) {
    max-width: 50%;
    text-align: left;
  }
`;

const ImageWrapper = styled.div`
  max-width: 60%;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 80%;
    height: auto;
    object-fit: cover;
    border-radius: 50%;

    mask-image: radial-gradient(
      circle,
      rgba(0, 0, 0, 1) 20%,
      rgba(0, 0, 0, 0) 100%
    );

    filter: blur(0px); /* Optional slight blur */
  }

  @media (min-width: 768px) {
    max-width: 40%;
    margin-top: 0;
  }
`;


const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: var(--primary-font);
  color: var(--sixth-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (min-width: 768px) {
    font-size: 4rem;
    justify-content: flex-start;
  }
`;

const StyledSpan = styled.h1`
  font-size: 3rem;
  color: var(--third-color);
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-family: var(--primary-font);
  color: var(--sixth-color);

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Highlight = styled.span`
  background-color: var(--fifth-color);
  padding: 0.5rem 0.8rem;
  font-style: italic;
  font-weight: bold;
  font-family: var(--primary-font);
  color: var(--second-color);
  display: inline-block;
  margin-top: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  font-family: var(--secondary-font);
  line-height: 1.6;
  color: var(--sixth-color);
  margin: 1.5rem 0;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin: 2rem 0rem;
  }
`;

const StyledShape = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  background: var(--fourth-color);
  opacity: 0.4;
  top: 80%;
  right: 0%;
  transform: rotate(45deg);
  border-radius: 20px;
  filter: blur(10px);
`;

const Banner = () => {
  return (
    <section id="about">
    <HeroSection>
      <StyledShape />
      <Content>
        <Subtitle>Hello !!!</Subtitle>
        <Title>
          I'm <StyledSpan>Kaviya</StyledSpan>
        </Title>
        <Highlight>FULL STACK DEVELOPER</Highlight>
        <Paragraph>
          Passionate about creating dynamic web experiences with a knack for
          both frontend and backend development. Continuously learning and
          evolving in the tech space.
        </Paragraph>
      </Content>
      <ImageWrapper>
        <img src={Kaviya} alt="Kaviya" />
      </ImageWrapper>
    </HeroSection>
    </section>
  );
};

export default Banner;
