import styled from "styled-components";

const SkillsSection = styled.section`
  background-color: var(--first-color);
  color: var(--fifth-color);
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    width: 150px;
    height: 100px;
    background: var(--fourth-color);
    opacity: 0.3;
    top: 40%;
    left:  15%;
    clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
    filter: blur(60px);
  }

  &::after {
    content: "";
    position: absolute;
    width: 200px;
    height: 200px;
    background: var(--fifth-color);
    opacity: 0.3;
    bottom: 10%;
    right: 5%;
    border-radius: 50%;
    filter: blur(10px);
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

const Title2 = styled.h2`
  font-size: 1.4rem;
  color: var(--third-color);
  margin-bottom: 2rem;
  font-family: var(--primary-font);
  // text-transform: uppercase;
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
`;

const StackBox = styled.div`
  padding: 2rem;
  border-radius: 20px;
  color: var(--fourth-color);
  text-align: center;
  box-shadow: 50px 50px 30px rgba(54, 54, 54, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 15px 15px 25px rgba(0, 0, 0, 0.4);
  }
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const SkillItem = styled.li`
  padding: 0.5rem 1rem;
  background-color: var(--second-color);
  color: var(--sixth-color);
  border-radius: 12px;
  margin: 0.3rem;
`;

const SkillsComponent = () => {
  return (
    <section id="skills">
    <SkillsSection>
      <Title>My Skills</Title>
      <SkillsContainer>
        <StackBox>
          <Title2>MERN Stack</Title2>
          <SkillList>
            <SkillItem>HTML</SkillItem>
            <SkillItem>CSS</SkillItem>
            <SkillItem>JavaScript</SkillItem>
            <SkillItem>React</SkillItem>
            <SkillItem>Node.js</SkillItem>
            <SkillItem>MongoDB</SkillItem>
          </SkillList>
        </StackBox>

        <StackBox>
          <Title2>Java Stack</Title2>
          <SkillList>
            <SkillItem>HTML</SkillItem>
            <SkillItem>CSS</SkillItem>
            <SkillItem>JavaScript</SkillItem>
            <SkillItem>Java</SkillItem>
            <SkillItem>Spring</SkillItem>
            <SkillItem>Hibernate</SkillItem>
            <SkillItem>MySQL</SkillItem>
          </SkillList>
        </StackBox>

        <StackBox>
          <Title2>Automation Testing</Title2>
          <SkillList>
            <SkillItem>Selenium</SkillItem>
            <SkillItem>JUnit</SkillItem>
            <SkillItem>TestNG</SkillItem>
            <SkillItem>Cucumber</SkillItem>
          </SkillList>
        </StackBox>

        <StackBox>
          <Title2>WordPress Development</Title2>
          <SkillList>
            <SkillItem>WordPress</SkillItem>
            <SkillItem>Elementor</SkillItem>
            <SkillItem>WooCommerce</SkillItem>
            <SkillItem>SEO Optimization</SkillItem>
          </SkillList>
        </StackBox>
      </SkillsContainer>
    </SkillsSection>
    </section>
  );
};

export default SkillsComponent;
