import styled from "styled-components";
import { useState } from "react";

// 🔷 Modern Contact Section (Dark + Unique Shapes)

const ContactSection = styled.section`
  background: var(--first-color);
  color: var(--sixth-color);
  padding: 3rem 2rem;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

const ContactCard = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  border-radius: 1.5rem;

  /* Glassmorphism */
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);

  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
  transition: 0.35s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: var(--sixth-color);
  font-size: 1rem;
  font-family: var(--secondary-font);
  transition: 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--fourth-color);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Textarea = styled.textarea`
  padding: 1rem;
  border-radius: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: var(--sixth-color);
  font-size: 1rem;
  font-family: var(--secondary-font);
  resize: none;
  transition: 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--fourth-color);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Button = styled.button`
  padding: 1rem;
  border-radius: 0.8rem;
  border: none;
  background: var(--fourth-color);
  color: var(--sixth-color);
  font-size: 1.2rem;
  font-family: var(--primary-font);
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: var(--third-color);
  }
`;

// 🔷 Completely NEW Abstract Background Shapes
const ShapeOne = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  background: var(--fifth-color);
  opacity: 0.25;
  top: 5%;
  right: 20%;
  border-radius: 50% 20% 50% 80%;
  transform: rotate(45deg);
  filter: blur(20px);
  
`;

const ShapeTwo = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background: var(--third-color);
  opacity: 0.2;
  bottom: 10%;
  left: 10%;
  border-radius: 30% 20% 20% 40%;
  transform: rotate(-25deg);
  filter: blur(18px);

  }
`;

const ShapeThree = styled.div`
  position: absolute;
  width: 120px;
  height: 220px;
  background: var(--fourth-color);
  opacity: 0.2;
  top: 40%;
  left: 85%;
  border-radius: 10% 10% 10% 10%;
  transform: rotate(60deg);
  filter: blur(22px);
`;

// const ContactComponent = () => {
//   return (
//     <section id="contact">
//     <ContactSection>
//       <ShapeOne />
//       <ShapeTwo />
//       <ShapeThree />

//       <Title>Contact Me</Title>

//       <ContactCard>
//         <Form>
//           <Input type="text" placeholder="Your Name" required />
//           <Input type="email" placeholder="Your Email" required />
//           <Textarea rows={5} placeholder="Your Message" required />
//           <Button type="submit">Send Message</Button>
//         </Form>
//       </ContactCard>
//     </ContactSection>
//     </section>
//   );
// };

// export default ContactComponent;



const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    socialMedia: "",
    message: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/form/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <section id="contact">
      <ContactSection>
        <ShapeOne />
        <ShapeTwo />
        <ShapeThree />

        <Title>Contact Me</Title>

        <ContactCard>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              onChange={handleChange}
            />
            <Input
              type="text"
              name="socialMedia"
              placeholder="Your Social Media (Optional)"
              onChange={handleChange}
            />
            <Textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              required
              onChange={handleChange}
            />
            <Button type="submit">Send Message</Button>
          </Form>
        </ContactCard>
      </ContactSection>
    </section>
  );
};

export default ContactComponent;
