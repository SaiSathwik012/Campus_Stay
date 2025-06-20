import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiArrowRight } from "react-icons/fi";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;



const ContactContainer = styled.div`
  padding: 4rem 2rem;
  background: #f9fafb;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
`;

const Card = styled(motion.div)`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 1000px;
  overflow: hidden;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.div`
  padding: 3rem;
  position: relative;
`;

const FormHeader = styled.div`
  margin-bottom: 2.5rem;
`;

const FormTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.8rem;
  line-height: 1.2;
`;

const FormSubtitle = styled.p`
  color: #6b7280;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const InputGroup = styled.div`
  margin-bottom: 1.8rem;
  position: relative;
`;

const FloatingLabel = styled.label`
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: #9ca3af;
  font-size: 1rem;
  transition: all 0.3s ease;
  pointer-events: none;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1.5rem 1rem 0.8rem 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #111827;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    
    + ${FloatingLabel} {
      top: 0.5rem;
      font-size: 0.8rem;
      color: #4f46e5;
    }
  }

  &:not(:placeholder-shown) + ${FloatingLabel} {
    top: 0.5rem;
    font-size: 0.8rem;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1.5rem 1rem 0.8rem 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #111827;
  font-size: 1rem;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    
    + ${FloatingLabel} {
      top: 0.5rem;
      font-size: 0.8rem;
      color: #4f46e5;
    }
  }

  &:not(:placeholder-shown) + ${FloatingLabel} {
    top: 0.5rem;
    font-size: 0.8rem;
  }
`;

const SubmitButton = styled(motion.button)`
  background: #4f46e5;
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.1);

  &:hover {
    background: #4338ca;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(79, 70, 229, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
    transform: none;
  }
`;

const FloatingPlane = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  color: #a5b4fc;
  animation: ${float} 4s ease-in-out infinite;
`;

const ContactInfo = styled.div`
  padding: 3rem;
  background: #f3f4f6;
  height: 100%;
`;

const InfoTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  color: #4f46e5;
  font-size: 1.2rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.3rem;
`;

const InfoText = styled.p`
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
`;

const InfoLink = styled.a`
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: #ecfdf5;
  color: #065f46;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  border: 1px solid #a7f3d0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorMessage = styled(motion.div)`
  background: #fee2e2;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  border: 1px solid #fca5a5;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsSubmitted(false);
        setError(null);
      }, 5000);
    }
  };

  return (
    <ContactContainer>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ContactGrid>
          <ContactForm>
            <FormHeader>
              <FormTitle>Get in Touch</FormTitle>
              <FormSubtitle>
                Have a question or want to work together? Fill out the form below and we'll get back to you soon.
              </FormSubtitle>
            </FormHeader>

            <form onSubmit={handleSubmit}>
              <InputGroup>
                <StyledInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FloatingLabel htmlFor="name">Your Name</FloatingLabel>
              </InputGroup>

              <InputGroup>
                <StyledInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FloatingLabel htmlFor="email">Email Address</FloatingLabel>
              </InputGroup>

              <InputGroup>
                <StyledInput
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder=" "
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <FloatingLabel htmlFor="subject">Subject</FloatingLabel>
              </InputGroup>

              <InputGroup>
                <StyledTextarea
                  id="message"
                  name="message"
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <FloatingLabel htmlFor="message">Your Message</FloatingLabel>
              </InputGroup>

              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  "Sending..."
                ) : (
                  <>
                    <FiSend /> Send Message <FiArrowRight />
                  </>
                )}
              </SubmitButton>

              <AnimatePresence>
                {isSubmitted && (
                  <SuccessMessage
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    ✓ Message sent successfully!
                  </SuccessMessage>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <ErrorMessage
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    ✗ {error}
                  </ErrorMessage>
                )}
              </AnimatePresence>
            </form>

            <FloatingPlane>
              <FaPaperPlane size={32} />
            </FloatingPlane>
          </ContactForm>

          <ContactInfo>
            <InfoTitle>Contact Information</InfoTitle>

            <InfoItem
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <InfoIcon><FaPhone /></InfoIcon>
              <InfoContent>
                <InfoLabel>Phone</InfoLabel>
                <InfoText>Available Mon-Fri, 9AM-5PM</InfoText>
                <InfoLink href="tel:+917013377564">+91 7013377564</InfoLink>
              </InfoContent>
            </InfoItem>

            <InfoItem
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <InfoIcon><FaEnvelope /></InfoIcon>
              <InfoContent>
                <InfoLabel>Email</InfoLabel>
                <InfoText>We respond within 24 hours</InfoText>
                <InfoLink href="mailto:saisathwik012@gmail.com">saisathwik012@gmail.com</InfoLink>
              </InfoContent>
            </InfoItem>

            <InfoItem
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <InfoIcon><FaMapMarkerAlt /></InfoIcon>
              <InfoContent>
                <InfoLabel>College</InfoLabel>
                <InfoText>SRKR Engineering College</InfoText>
                <InfoText>Bhimavaram, Chinaamiram<p>Pin Code 534204</p></InfoText>
              </InfoContent>
            </InfoItem>
          </ContactInfo>
        </ContactGrid>
      </Card>
    </ContactContainer>
  );
};

export default Contact;