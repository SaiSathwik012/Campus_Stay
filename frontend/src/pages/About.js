import React from "react";
import styled from "styled-components";
import { FaUniversity, FaHome, FaHandshake, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  color: #1a202c;
  font-family: 'Inter', sans-serif;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.2rem;
  font-weight: 800;
  background: linear-gradient(90deg, #3a0ca3, #4361ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #4a5568;
  max-width: 850px;
  margin: 0 auto 2.5rem;
  line-height: 1.8;
`;

const Highlight = styled.span`
  color: #3a0ca3;
  font-weight: 700;
`;

const MissionSection = styled(motion.section)`
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 20px;
  padding: 3.5rem 3rem;
  margin: 3rem 0;
  box-shadow: 0 15px 25px -5px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 70px;
    height: 4px;
    background: linear-gradient(90deg, #3a0ca3, #4361ee);
    border-radius: 2px;
  }
`;

const MissionStatement = styled.p`
  font-size: 1.15rem;
  line-height: 1.9;
  color: #2d3748;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2.2rem 1.8rem;
  box-shadow: 0 6px 12px -4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 12px 20px -3px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 75px;
  height: 75px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3a0ca3, #4361ee);
  color: white;
  border-radius: 50%;
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a202c;
`;

const FeatureDescription = styled.p`
  color: #4a5568;
  font-size: 1.05rem;
  line-height: 1.7;
`;

const HowItWorksSection = styled.section`
  margin: 4rem 0;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

const Step = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  padding: 1.8rem;
  background: white;
  border-radius: 14px;
  box-shadow: 0 6px 10px -2px rgba(0, 0, 0, 0.08);
  border-left: 5px solid #4361ee;
`;

const StepNumber = styled.div`
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #3a0ca3, #4361ee);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #1a202c;
`;

const StepDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
  font-size: 1.05rem;
`;

function About() {
  return (
    <AboutContainer>
      <HeroSection>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About <Highlight>CampusStay</Highlight>
        </Title>
        <Subtitle>
          Your trusted platform connecting students to safe, verified, and nearby housing for a smoother college life.
        </Subtitle>
      </HeroSection>

      <MissionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle>Our Mission</SectionTitle>
        <MissionStatement>
          At <strong>CampusStay</strong>, we’re revolutionizing student housing by streamlining the search for trusted accommodations. Our verified listings, real-time communication, and secure bookings ensure every student finds their ideal living space quickly and confidently.
        </MissionStatement>
      </MissionSection>

      <FeaturesGrid>
        <FeatureCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <FeatureIcon><FaUniversity /></FeatureIcon>
          <FeatureTitle>Campus Proximity</FeatureTitle>
          <FeatureDescription>
            All properties are located within walking distance or a short commute from major universities and colleges.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <FeatureIcon><FaHome /></FeatureIcon>
          <FeatureTitle>Verified Listings</FeatureTitle>
          <FeatureDescription>
            Each property is thoroughly verified for accuracy, safety, and amenities before it's published.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <FeatureIcon><FaHandshake /></FeatureIcon>
          <FeatureTitle>Direct Communication</FeatureTitle>
          <FeatureDescription>
            Contact landlords directly through our secure platform for faster decision-making and clarity.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <FeatureIcon><FaShieldAlt /></FeatureIcon>
          <FeatureTitle>Secure Payments</FeatureTitle>
          <FeatureDescription>
            Hassle-free, protected transactions with escrow systems to safeguard your deposits and payments.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>

      <HowItWorksSection>
        <SectionTitle>How It Works</SectionTitle>
        <StepsContainer>
          <Step whileHover={{ scale: 1.01 }}>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Create Your Profile</StepTitle>
              <StepDescription>
                Register quickly with your basic details to begin searching or listing properties.
              </StepDescription>
            </StepContent>
          </Step>

          <Step whileHover={{ scale: 1.01 }}>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>Browse or List</StepTitle>
              <StepDescription>
                Students explore using filters, while landlords post detailed property profiles.
              </StepDescription>
            </StepContent>
          </Step>

          <Step whileHover={{ scale: 1.01 }}>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>Connect & Chat</StepTitle>
              <StepDescription>
                Direct communication between students and landlords helps resolve queries instantly.
              </StepDescription>
            </StepContent>
          </Step>

          <Step whileHover={{ scale: 1.01 }}>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>Book with Confidence</StepTitle>
              <StepDescription>
                Securely finalize agreements with protected payment channels and digital records.
              </StepDescription>
            </StepContent>
          </Step>
        </StepsContainer>
      </HowItWorksSection>
    </AboutContainer>
  );
}

export default About;
