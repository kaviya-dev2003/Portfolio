import styled from "styled-components";

// 🔷 Premium Modern Education Section (Glass + Shapes)
const EducationSection = styled.section`
  background: var(--first-color);
  padding: 3rem 2rem;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  color: var(--sixth-color);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 🔷 Title
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  font-family: var(--primary-font);
  color: var(--sixth-color);

    @media (max-width: 480px) {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }
`;

// 🔷 Education Card
const EducationCard = styled.div`
  width: 100%;
  max-width: 830px;
  padding: 2.7rem 2rem 2.7rem 4rem; /* extra left padding for marker */
  border-radius: 1.9rem;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;

  /* ✨ Soft frosted base */
  background: rgba(255, 255, 255, 0.035);
  backdrop-filter: blur(14px);

  /* ✨ Layer 1 — Subtle Soft Glow */
  &::before {
    content: "";
    position: absolute;
    top: -20%;
    left: -10%;
    width: 150%;
    height: 150%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.12),
      rgba(255, 255, 255, 0.02)
    );
    opacity: 0.12;
    filter: blur(45px);
    z-index: -2;
  }

  /* ✨ Layer 2 — Static Gradient Mist */
  &::after {
    content: "";
    position: absolute;
    bottom: -15%;
    right: -5%;
    width: 130%;
    height: 130%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.07),
      rgba(255, 255, 255, 0.02)
    );
    opacity: 0.10;
    filter: blur(65px);
    border-radius: 50%;
    z-index: -3;
  }

  /* ✨ Luxury Depth Shadow */
  box-shadow:
    0 28px 65px rgba(0, 0, 0, 0.55),
    0 12px 28px rgba(0, 0, 0, 0.35),
    inset 0 0 20px rgba(255, 255, 255, 0.03);

  transition: 0.45s ease;

  &:hover {
    transform: translateY(-14px) scale(1.02);

    box-shadow:
      0 38px 85px rgba(0, 0, 0, 0.65),
      0 18px 40px rgba(0, 0, 0, 0.45),
      inset 0 0 30px rgba(255, 255, 255, 0.05);
  }
`;

const CardMarker = styled.div`
  position: absolute;
  left: -3rem;               /* small gap from card left edge */
  top: 50%;                 /* vertical center */
  transform: translateY(-50%); /* perfectly center vertically */
  width: 100px;
  height: 100px;
  background-color: var( --fourth-color);
  border-radius: 50%;
  border: 2px solid var(--first-color); /* optional */
  z-index: 5;               /* above pseudo-elements */
`;


// 🔷 Optional: Vertical Line connecting markers
const RoadmapLine = styled.div`
  position: absolute;
  left: -0.25rem;
  top: 2.5rem;
  width: 4px;
  height: calc(100% - 5rem);
  background: yellow;
  z-index: 0;
`;

// 🔷 Text inside card
const Degree = styled.h3`
  font-size: 1.5rem;
  font-family: var(--primary-font);
  margin-bottom: 0.7rem;
  color: var(--third-color);
`;

const Institution = styled.p`
  font-family: var(--secondary-font);
  font-size: 1.1rem;
  color: var(--sixth-color);
  font-weight: bold;
`;

const Duration = styled.p`
  margin-top: 0.5rem;
  font-family: var(--secondary-font);
  color: var(--sixth-color);
  font-weight: 600;
`;

// 🔷 Background Shapes
const ShapeOne = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  background: var(--fourth-color);
  opacity: 0.25;
  top: 12%;
  left: -4%;
  border-radius: 40px;
  transform: rotate(40deg);
  filter: blur(20px);
`;

const ShapeTwo = styled.div`
  position: absolute;
  width: 220px;
  height: 220px;
  background: var(--third-color);
  opacity: 0.18;
  bottom: 18%;
  right: -6%;
  border-radius: 50%;
  filter: blur(25px);
`;

const ShapeThree = styled.div`
  position: absolute;
  width: 130px;
  height: 130px;
  background: var(--fifth-color);
  opacity: 0.15;
  top: 60%;
  left: 35%;
  border-radius: 30px;
  transform: rotate(25deg);
  filter: blur(18px);
`;

const EducationComponent = () => {
  const education = [
    {
      degree: "BSc in Computer Science",
      institution: "Vaigai Arts and Science Women's College, Salem",
      duration: "2020 - 2023",
    },
    {
      degree: "High School",
      institution: "Government Higher Secondary School, Chimbiri",
      duration: "2018 - 2020",
    },
  ];

  return (
    <section id="education">
    <EducationSection>
      <ShapeOne />
      <ShapeTwo />
      <ShapeThree />

      <Title>Education</Title>

      {education.map((edu, index) => (
        <EducationCard key={index}>
          <CardMarker />   {/* Small yellow circle */}
          <Degree>{edu.degree}</Degree>
          <Institution>{edu.institution}</Institution>
          <Duration>{edu.duration}</Duration>
        </EducationCard>
      ))}

    </EducationSection>
    </section>
  );
};

export default EducationComponent;
