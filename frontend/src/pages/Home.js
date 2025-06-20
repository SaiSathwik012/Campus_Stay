import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

// Styled Components (unchanged)
const HomeContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  position: relative;
`;

const DecorativeElement = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(52,152,219,0.1) 0%, rgba(52,152,219,0) 70%);
  top: -300px;
  right: -200px;
  z-index: 0;
`;

const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000') center/cover;
    opacity: 0.15;
    z-index: -1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  background: white;
  position: relative;
`;

const AppName = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: white;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: white;
    border-radius: 2px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  position: relative;
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 80%;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 3rem 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;
  font-size: 1.2rem;
  position: relative;
  padding-left: 3rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4361ee;
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
  }
  
  &:nth-child(1)::before {
    content: '\\f00c';
  }
  &:nth-child(2)::before {
    content: '\\f3c5';
  }
  &:nth-child(3)::before {
    content: '\\f023';
  }
  &:nth-child(4)::before {
    content: '\\f075';
  }
`;

const WelcomeContainer = styled.div`
  max-width: 500px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WelcomeTitle = styled.h2`
  font-size: 2.8rem;
  color: #2b2d42;
  margin-bottom: 1.5rem;
  font-weight: 700;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #4361ee, #3a0ca3);
    border-radius: 2px;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 3rem;
  line-height: 1.7;
  max-width: 80%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AuthButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 2.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  max-width: 240px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const StudentButton = styled(AuthButton)`
  background: #4361ee;
  color: white;
`;

const OwnerButton = styled(AuthButton)`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
`;

const AdminButton = styled(AuthButton)`
  background: #3a0ca3;
  color: white;
`;

const ButtonIcon = styled.span`
  margin-right: 1rem;
  font-size: 1.3rem;
`;

const VerificationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.98);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VerificationBox = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 90%;
  transform: scale(0.95);
  animation: scaleIn 0.3s ease-out forwards;
  
  @keyframes scaleIn {
    to {
      transform: scale(1);
    }
  }
`;

const VerificationTitle = styled.h2`
  color: #3a0ca3;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 700;
`;

const VerificationText = styled.p`
  color: #6c757d;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const VerificationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const VerificationButton = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  
  &:first-child {
    background: #4361ee;
    color: white;
    
    &:hover {
      background: #3a56d4;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
    }
  }

  &:last-child {
    background: #f8f9fa;
    color: #495057;
    border: 1px solid #dee2e6;
    
    &:hover {
      background: #e9ecef;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3a0ca3;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 2rem;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Main Component with updated verification logic
const Home = () => {
  const [verificationStatus, setVerificationStatus] = useState('loading'); // 'loading', 'verified', 'unverified'
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    // Simulate async verification check with slight delay
    const timer = setTimeout(() => {
      try {
        const isVerified = localStorage.getItem('srkrVerified') === 'true';
        setVerificationStatus(isVerified ? 'verified' : 'unverified');
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        setVerificationStatus('unverified');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleVerification = (isSRKRStudent) => {
    if (isSRKRStudent) {
      Swal.fire({
        title: 'SRKR Verification',
        html: `
          <div style="text-align: center;">
            <svg width="100" height="100" viewBox="0 0 24 24" style="color: #3a0ca3;">
              <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4l8-8l-1.41-1.42z"/>
            </svg>
            <h3 style="color: #3a0ca3; margin: 1rem 0;">Verification Successful!</h3>
            <p style="color: #6c757d;">Welcome to CampusStay, SRKRian! Enjoy your housing search experience.</p>
          </div>
        `,
        showConfirmButton: false,
        timer: 2000,
        background: '#ffffff',
        backdrop: `
          rgba(58,12,163,0.2)
          url("/images/college-icon.gif")
          center top
          no-repeat
        `,
        width: '500px',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(58,12,163,0.2)'
      }).then(() => {
        localStorage.setItem('srkrVerified', 'true');
        setVerificationStatus('verified');
      });
    } else {
      setShowRedirectMessage(true);
      Swal.fire({
        title: 'Access Restricted',
        html: `
          <div style="text-align: center;">
            <svg width="100" height="100" viewBox="0 0 24 24" style="color: #e63946;">
              <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41L9.11 16.3c-.39.39-1.02.39-1.41 0c-.39-.39-.39-1.02 0-1.41L10.59 12L7.7 9.11c-.39-.39-.39-1.02 0-1.41c.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0c.39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"/>
            </svg>
            <h3 style="color: #e63946; margin: 1rem 0;">Sorry!</h3>
            <p style="color: #6c757d;">This platform is exclusively for SRKR College students.</p>
            <p style="color: #6c757d;">You'll be redirected to the SRKR official website.</p>
          </div>
        `,
        confirmButtonColor: '#3a0ca3',
        confirmButtonText: 'Okay',
        allowOutsideClick: false,
        allowEscapeKey: false,
        background: '#ffffff',
        width: '500px',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(230,57,70,0.2)'
      }).then(() => {
        window.location.href = 'https://www.srkrec.edu.in/';
      });
    }
  };

  // Loading state
  if (verificationStatus === 'loading') {
    return (
      <HomeContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <VerificationBox>
          <LoadingSpinner />
          <VerificationTitle>Checking Verification</VerificationTitle>
          <VerificationText>
            Please wait while we check your verification status...
          </VerificationText>
        </VerificationBox>
      </HomeContainer>
    );
  }

  // Verification required
  if (verificationStatus === 'unverified' && !showRedirectMessage) {
    return (
      <VerificationOverlay>
        <VerificationBox>
          <svg width="80" height="80" viewBox="0 0 24 24" style={{ color: '#3a0ca3', marginBottom: '1.5rem' }}>
            <path fill="currentColor" d="M12 3a9 9 0 0 1 9 9a9 9 0 0 1-9 9a9 9 0 0 1-9-9a9 9 0 0 1 9-9m0 2a7 7 0 0 0-7 7a7 7 0 0 0 7 7a7 7 0 0 0 7-7a7 7 0 0 0-7-7m1 3h-2v6h2V8m0 8h-2v2h2v-2z" />
          </svg>
          <VerificationTitle>College Verification</VerificationTitle>
          <VerificationText>
            To ensure the best experience for our SRKR community, please verify your student status.
          </VerificationText>
          <div style={{
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '12px',
            margin: '2rem 0',
            borderLeft: '4px solid #3a0ca3'
          }}>
            <p style={{ margin: 0, color: '#495057', fontWeight: 500 }}>
              Are you currently a student at SRKR Engineering College?
            </p>
          </div>
          <VerificationButtons>
            <VerificationButton onClick={() => handleVerification(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                <path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7z" />
              </svg>
              Yes, I'm an SRKRian
            </VerificationButton>
            <VerificationButton onClick={() => handleVerification(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z" />
              </svg>
              No, I'm not
            </VerificationButton>
          </VerificationButtons>
        </VerificationBox>
      </VerificationOverlay>
    );
  }

  // Main content (verified)
  return (
    <HomeContainer>
      <DecorativeElement />

      <LeftPanel>
        <AppName>CampusStay</AppName>
        <HeroTitle>Your Perfect Student Housing Solution</HeroTitle>
        <HeroSubtitle>
          Discover premium accommodations tailored for SRKR College students with verified listings and hassle-free booking.
        </HeroSubtitle>

        <FeatureList>
          <FeatureItem>Verified property listings with photos</FeatureItem>
          <FeatureItem>Prime locations within campus proximity</FeatureItem>
          <FeatureItem>Secure payment and booking system</FeatureItem>
          <FeatureItem>Direct communication with property owners</FeatureItem>
        </FeatureList>
      </LeftPanel>

      <RightPanel>
        <WelcomeContainer>
          <WelcomeTitle>Welcome SRKRian</WelcomeTitle>
          <WelcomeSubtitle>
            Access your account to manage properties, find housing, or administer the platform.
          </WelcomeSubtitle>

          <ButtonGroup>
            <StudentButton to="/student/login">
              <ButtonIcon><i className="fas fa-user-graduate"></i></ButtonIcon>
              Student Portal
            </StudentButton>
            <OwnerButton to="/owner/login">
              <ButtonIcon><i className="fas fa-home"></i></ButtonIcon>
              Owner Portal
            </OwnerButton>
            <AdminButton to="/admin/login">
              <ButtonIcon><i className="fas fa-user-shield"></i></ButtonIcon>
              Admin Portal
            </AdminButton>
          </ButtonGroup>
        </WelcomeContainer>
      </RightPanel>
    </HomeContainer>
  );
};

export default Home;