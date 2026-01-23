import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../../styles/theme";
import { Button } from "../../components";
import { slideUp } from "../../animations/motionVariants";

const Container = styled.section`
  padding: 5rem 10%;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 4rem 10% 8rem;
  }
`;

const Header = styled(motion.div)`
  margin-bottom: 4rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ContactForm = styled(motion.form)`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: ${theme.shadows.medium};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: ${theme.fonts.subheadings};
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${theme.colors.primary};
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  background: ${theme.colors.secondary};
  transition: ${theme.transitions.standard};

  &::placeholder {
    font-size: 0.85rem;   /* 👈 placeholder மட்டும் small */
    color: #94A3B8;       /* optional: soft color */
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background: white;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  background: ${theme.colors.secondary};
  min-height: 150px;
  resize: vertical;
  transition: ${theme.transitions.standard};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background: white;
  }
`;

const InfoSection = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  text-align: center;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoBox = styled.div`
  h4 {
    font-family: ${theme.fonts.subheadings};
    font-size: 0.9rem;
    text-transform: uppercase;
    color: ${theme.colors.accent};
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1rem;
    color: ${theme.colors.primary};
    font-weight: 400;
  }
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    socialMedia: "",
    message: ""
  });
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", socialMedia: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <Container>
      <Header variants={slideUp} initial="initial" animate="animate">
        <Title>Get In Touch <span style={{ fontSize: '10px', opacity: 0.3 }}>v2.0-FINAL</span></Title>
        <p>Interested in collaborating or have a question? Leave a message below.</p>
      </Header>

      <ContactForm
        variants={slideUp}
        initial="initial"
        animate="animate"
        onSubmit={handleSubmit}
      >
        <FormGroup>
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Kaviya Venkatesh"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            placeholder="kaviya@gmail.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="socialMedia">Social Media (Optional)</Label>
          <Input
            type="text"
            id="socialMedia"
            placeholder="LinkedIn / Twitter URL"
            value={formData.socialMedia}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Your Message</Label>
          <TextArea
            id="message"
            placeholder="Tell me about your project..."
            required
            value={formData.message}
            onChange={handleChange}
          />
        </FormGroup>

        <Button
          variant="primary"
          type="submit"
          style={{ width: '100%' }}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>

        {status === "success" && <p style={{ color: 'green', textAlign: 'center' }}>Message sent successfully!</p>}
        {status === "error" && <p style={{ color: 'red', textAlign: 'center' }}>Failed to send message. Please try again.</p>}
      </ContactForm>

      <InfoSection>
        <InfoBox>
          <h4>Email</h4>
          <p>kaviyavenkatesh2003@gmail.com</p>
        </InfoBox>
        <InfoBox>
          <h4>LinkedIn</h4>
          <p>kaviya Venkatesh</p>
        </InfoBox>
      </InfoSection>
    </Container>
  );
};

export default Contact;
