import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../../styles/theme";
import { Button } from "../../components";
import { pageTransition } from "../../animations/motionVariants";
import { FaDownload, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Container = styled(motion.div)`
  padding: 8rem 10% 4rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const PreviewWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  height: 1200px;
  background: white;
  border-radius: 12px;
  box-shadow: ${theme.shadows.medium};
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 800px;
  }
`;

const PDFViewer = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const Resume: React.FC = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `${process.env.PUBLIC_URL}/resume.pdf`;
    link.download = "Kaviya_Venkatesh_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Tracking
    const count = parseInt(localStorage.getItem("resume_downloads") || "0");
    localStorage.setItem("resume_downloads", (count + 1).toString());
  };

  // Cast icons to any for React 19 compatibility
  const IconDownload = FaDownload as any;
  const IconBack = FaArrowLeft as any;

  return (
    <Container
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header>
        <Button variant="outline" size="small" onClick={() => navigate(-1)}>
          <IconBack style={{ marginRight: '8px' }} /> Back
        </Button>
        <h2 style={{ fontFamily: theme.fonts.headings }}>Resume Preview</h2>
        <Button variant="primary" size="small" onClick={handleDownload}>
          <IconDownload style={{ marginRight: '8px' }} /> Download
        </Button>
      </Header>

      <PreviewWrapper>
        <PDFViewer
          src={`${process.env.PUBLIC_URL}/resume.pdf#toolbar=0&navpanes=0&scrollbar=0`}
          title="Resume Preview"
        />
      </PreviewWrapper>
    </Container>
  );
};

export default Resume;
