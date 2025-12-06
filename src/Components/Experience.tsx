import styled from "styled-components";

// 🔷 Experience Section
const ExperienceSection = styled.section`
  background-color: var(--first-color);
  color: var(--sixth-color);
  font-family: var(--primary-font);
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;


  @media (max-width: 480px) {
    padding: 1rem 1rem;
  }
`;

// 🔷 Title Box
const TitleBox = styled.div`
  font-size: 3rem;
  margin-bottom: 2rem;
  font-family: var(--primary-font);
  color: var(--sixth-color);
  text-align: center;
   font-weight: bold;
 


  @media (max-width: 480px) {
    font-size: 2rem;
    padding: 0.5rem 1rem;
  }
`;

// 🔷 Description
const Description = styled.p`
  // font-size: 1.5rem;
  // font-family: var(--secondary-font);
  // color: var(--fifth-color);
  // text-align: center;
  // margin-bottom: 3rem;

  font-size: 1.5rem;
  color: var(--fifth-color);
  margin-bottom: 2rem;
  font-family: var(--primary-font); 
   text-align: center;
      // font-weight: bold;
  

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

// 🔷 Cards Container
const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 3rem;

  &::before {
    content: "";
    position: absolute;
    left: 25rem;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: var(--fourth-color);
    border-radius: 2px;
    z-index: 0;

    @media (max-width: 480px) {
      display: none;
    }
  }
`;

// 🔷 Diamond marker
const DiamondMarker = styled.div`
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 30px;
  height: 30px;
  background-color: var(--fourth-color);
  border: 2px solid var(--first-color);
  z-index: 2;

  @media (max-width: 480px) {
    display: none;
  }
`;

// 🔷 Experience Card
const ExperienceCard = styled.div`
  width: 36rem;
  max-width: 90%;
  padding: 2rem;
  border-radius: 1rem;
  background: linear-gradient(130deg, var(--first-color), var(--second-color));
  color: var(--fourth-color);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  perspective: 1000px;

  display: flex;
  flex-direction: column;
  // gap: 1.2rem;
  text-align: left;

  position: relative;

  @media (max-width: 480px) {
    padding: 1.5rem;
    gap: 0.8rem;
    width: 95%;
    text-align: center;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 1.8rem;
    font-weight: 700;

    @media (max-width: 480px) {
      font-size: 1.4rem;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #ffffff;

    @media (max-width: 480px) {
      font-size: 0.95rem;
    }
  }
`;

const Company = styled.h3`
  font-family: var(--primary-font);
  color: var(--third-color);
`;

const Role = styled.p`
  font-family: var(--secondary-font);
 color: var(--third-color);
   margin-top: 0.5rem;
   font-weight: bold;
`;

const Duration = styled.p`
  font-family: var(--secondary-font);
  color: var(--third-color);

  
`;

// 🔷 Background Shapes
const ShapeOne = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  background: var(--fourth-color);
  opacity: 0.2;
  top: 10%;
  left: 5%;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    top: 5%;
    left: 2%;
  }
`;

const ShapeTwo = styled.div`
  position: absolute;
  width: 220px;
  height: 220px;
  background: var(--third-color);
  opacity: 0.15;
  bottom: 15%;
  right: 10%;
  border-radius: 40%;
  filter: blur(100px);
  z-index: 0;

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    right: 5%;
    bottom: 10%;
  }
`;

const ShapeThree = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  background: var(--fifth-color);
  opacity: 0.1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30%;
  filter: blur(90px);
  z-index: 0;

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const ExperienceComponent = () => {
  return (
    <section id="experience">
    <ExperienceSection>
      <ShapeOne />
      <ShapeTwo />
      <ShapeThree />

      <TitleBox>Experience</TitleBox>
      <Description>My journey in the tech world</Description>

      <CardsContainer>
        <ExperienceCard>
          <DiamondMarker />
          <Company>ES EthicSecur SofTec Pvt. Ltd.</Company>
          <Role>MERN Stack Developer</Role>
          <Duration>Jan 2024 - Present</Duration>
        </ExperienceCard>

        <ExperienceCard>
          <DiamondMarker />
          <Company>ERP Hub Solutions</Company>
          <Role>SAP ABAP Trainee</Role>
          <Duration>Apr 2023 - Jul 2023</Duration>
        </ExperienceCard>
      </CardsContainer>
    </ExperienceSection>
    </section>
  );
};

export default ExperienceComponent;
