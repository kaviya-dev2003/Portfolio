import styled from "styled-components";

// Custom styled components for the tags
const CustomTitle = styled.div`
//  font-size: 2rem;
//   margin-bottom: 2rem;
//   font-family: var(--primary-font);
//   color: var(--third-color);
 font-size: 2rem;
  color: var(--third-color);
  margin-bottom: 2rem;
  font-family: var(--primary-font);
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const CustomParagraph = styled.div`
  font-size: 1.2rem;
  color: var(--sixth-color);

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const VisionarySection = styled.section`
  color: var(--fifth-color);
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0%;
    right: 50%;
    width: 150px;
    height: 200px;
    background-color: var(--second-color);
    border-radius: 50%;
    z-index: -1;
    opacity: 0.3;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0%;
    left: 10%;
    width: 200px;
    height: 150px;
    border-radius: 50%;
    background-color: var(--third-color);
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    transform: translateX(-50%);
    z-index: -1;
    opacity: 0.5;
    filter: blur(70px);
  }
`;

const StyledShape = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  background: var(--fourth-color);
  opacity: 0.4;
  top: 20%;
  right: 20%;
  transform: rotate(45deg);
  border-radius: 20px;
  filter: blur(10px);

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    top: 10%;
    right: 10%;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  font-family: var(--primary-font);
  color: var(--sixth-color);
 

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subheading = styled.h2`
  font-size: 1.5rem;
  color: var(--fifth-color);
  margin-bottom: 2rem;
  font-family: var(--primary-font);
   font-weight: normal;

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0 1rem;
  }
`;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 800px;

  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const Box = styled.div`
  margin: 1.5rem;
  padding: 2.5rem;
  border-radius: 20px;
  background-color: var(--first-color);
  color: var(--sixth-color);
  text-align: center;
  box-shadow: inset 6px 2px 3px 1px var(--fourth-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: inset 0px 3px 10px 2px var(--fourth-color);
  }

  @media (max-width: 480px) {
    padding: 1.8rem;
    margin: 1rem;
  }
`;

const VisionaryComponent = () => {
  return (
    <section id="visionary">
    <VisionarySection>
      <Title>Visionary</Title>
      <Subheading>
        Launching My Career: A Fresh Perspective on Full Stack Development
      </Subheading>
      <BoxContainer>
        <Box>
          <CustomTitle>Personalization</CustomTitle>
          <CustomParagraph>
            A glimpse of my individual journey, showcasing my dedication and
            passion for web development.
          </CustomParagraph>
        </Box>
        <Box>
          <CustomTitle>Reason to Hire Me</CustomTitle>
          <CustomParagraph>
            What sets me apart is my continuous learning attitude and
            problem-solving skills.
          </CustomParagraph>
        </Box>
      </BoxContainer>
      <StyledShape />
    </VisionarySection>
    </section>
  );
};

export default VisionaryComponent;
