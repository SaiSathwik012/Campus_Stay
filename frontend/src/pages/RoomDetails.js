import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Poppins', sans-serif;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const DetailsCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  min-height: 600px; /* Ensure minimum card height */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; /* Take full height of parent */
`;

const MainImage = styled(motion.div)`
  flex: 1; /* Take remaining space */
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: 300px; /* Minimum height */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.03);
  }
`;

const Thumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  margin-top: 1rem;
  height: 100px; /* Fixed height for thumbnails */
`;

const Thumbnail = styled(motion.div)`
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.active ? '#4361ee' : 'transparent'};
  opacity: ${props => props.active ? 1 : 0.8};
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  position: relative;
  padding-bottom: 0.5rem;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #4361ee 0%, #3a0ca3 100%);
  }
`;

const Badge = styled.span`
  padding: 0.3rem 0.8rem;
  background: ${props => props.available ? '#20c997' : '#dc3545'};
  color: white;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: 0.8rem;
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  animation: ${float} 4s ease-in-out infinite;
`;

const Address = styled.p`
  color: #4a4a4a;
  font-size: 1rem;
  padding: 0.8rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #4361ee;
  margin: 0 0 1.5rem 0;
`;

const Section = styled.div`
  margin: 1.5rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  color: #1a1a2e;
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.5rem;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #4361ee 0%, #3a0ca3 100%);
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const Icon = styled.div`
  width: 36px;
  height: 36px;
  background: rgba(67, 97, 238, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.8rem;
  color: #4361ee;
`;

const DetailText = styled.div`
  flex: 1;
`;

const Label = styled.div`
  font-size: 0.8rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #343a40;
`;

const Description = styled.p`
  color: #4a4a4a;
  line-height: 1.6;
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const ContactCard = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: auto; /* Push to bottom */
  border-left: 3px solid #4361ee;
`;

const ContactTitle = styled.h3`
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 1rem;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-weight: 600;
`;

const ContactName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
`;

const ContactPhone = styled.a`
  display: flex;
  align-items: center;
  color: #4361ee;
  text-decoration: none;
  font-weight: 500;
  margin-top: 0.3rem;

  svg {
    margin-right: 0.5rem;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(67, 97, 238, 0.1);
  border-radius: 50%;
  border-top-color: #4361ee;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Error = styled.div`
  padding: 1.5rem;
  background: #dc3545;
  color: white;
  border-radius: 8px;
  text-align: center;
  margin: 1rem 0;
`;

// Simplified Icons
const BackIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>;
const BedIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4361ee"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
const UserIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4361ee"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const CalendarIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4361ee"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const LocationIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4361ee"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
const KitchenIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4361ee"><path d="M3 11h18M5 11l1-7h12l1 7M9 11v7m6-7v7" /></svg>;
const WifiIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4361ee"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>;
const ParkingIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4361ee"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></svg>;
const WaterIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4361ee"><path d="M18 6h-6a3 3 0 0 0-3 3v14l5-3 5 3V9a3 3 0 0 0-3-3z" /><path d="M12 3a3 3 0 0 0-3 3v12l3-2 3 2V6a3 3 0 0 0-3-3z" /></svg>;
const MedicalIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4361ee"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>;
const RestaurantIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4361ee"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>;
const DurationIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4361ee"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const PhoneIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        setRoom(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load room details');
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const getInitials = (name) => {
    return name ? name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2) : '?';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return (
    <Container>
      <Loading><Spinner /></Loading>
    </Container>
  );

  if (error) return (
    <Container>
      <BackButton to="/room"><BackIcon /> Back to Rooms</BackButton>
      <Error>{error}</Error>
    </Container>
  );

  if (!room) return (
    <Container>
      <BackButton to="/room"><BackIcon /> Back to Rooms</BackButton>
      <Error>Room not found</Error>
    </Container>
  );

  return (
    <Container>
      <BackButton to="/room"><BackIcon /> Back to Rooms</BackButton>

      <DetailsCard initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Gallery>
          {room.roomPictures?.length > 0 && (
            <>
              <MainImage>
                <img
                  src={`http://localhost:5000${room.roomPictures[mainImageIndex]}`}
                  alt="Room"
                />
              </MainImage>

              {room.roomPictures.length > 1 && (
                <Thumbnails>
                  {room.roomPictures.map((pic, index) => (
                    <Thumbnail
                      key={index}
                      onClick={() => setMainImageIndex(index)}
                      active={index === mainImageIndex}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img src={`http://localhost:5000${pic}`} alt={`Thumbnail ${index}`} />
                    </Thumbnail>
                  ))}
                </Thumbnails>
              )}
            </>
          )}
        </Gallery>

        <Content>
          <Header>
            <Title>
              {room.roomType}
              <Badge available={room.availabilityStatus === 'Available'}>
                {room.availabilityStatus}
              </Badge>
            </Title>
            <Price>₹{room.rent.toLocaleString()}/month</Price>
          </Header>

          <Address>{room.fullAddress}</Address>

          <Section>
            <SectionTitle>Room Details</SectionTitle>
            <DetailsGrid>
              <DetailItem>
                <Icon><BedIcon /></Icon>
                <DetailText>
                  <Label>Bedrooms</Label>
                  <Value>{room.bedrooms}</Value>
                </DetailText>
              </DetailItem>

              <DetailItem>
                <Icon><UserIcon /></Icon>
                <DetailText>
                  <Label>Capacity</Label>
                  <Value>{room.roomCapacity}</Value>
                </DetailText>
              </DetailItem>

              <DetailItem>
                <Icon><KitchenIcon /></Icon>
                <DetailText>
                  <Label>Kitchen</Label>
                  <Value>{room.kitchen}</Value>
                </DetailText>
              </DetailItem>

              <DetailItem>
                <Icon><DurationIcon /></Icon>
                <DetailText>
                  <Label>Duration</Label>
                  <Value>{room.duration} months</Value>
                </DetailText>
              </DetailItem>

              <DetailItem>
                <Icon><LocationIcon /></Icon>
                <DetailText>
                  <Label>Distance to College</Label>
                  <Value>{room.distanceToCollege} km</Value>
                </DetailText>
              </DetailItem>

              <DetailItem>
                <Icon><CalendarIcon /></Icon>
                <DetailText>
                  <Label>Available From</Label>
                  <Value>{formatDate(room.availableFrom)}</Value>
                </DetailText>
              </DetailItem>

              <DetailItem>
                <Icon><WifiIcon /></Icon>
                <DetailText>
                  <Label>WiFi</Label>
                  <Value>{room.wifi}</Value>
                </DetailText>
              </DetailItem>

              <DetailItem>
                <Icon><ParkingIcon /></Icon>
                <DetailText>
                  <Label>Parking</Label>
                  <Value>{room.parking}</Value>
                </DetailText>
              </DetailItem>

              <DetailItem>
                <Icon><WaterIcon /></Icon>
                <DetailText>
                  <Label>Water</Label>
                  <Value>{room.drinkingWater}</Value>
                </DetailText>
              </DetailItem>

              <DetailItem>
                <Icon><MedicalIcon /></Icon>
                <DetailText>
                  <Label>Medical</Label>
                  <Value>{room.medicalNearby}</Value>
                </DetailText>
              </DetailItem>
            </DetailsGrid>
          </Section>

          <Section>
            <SectionTitle>Facilities</SectionTitle>
            <Description>{room.facilities}</Description>
          </Section>

          <Section>
            <SectionTitle>Suitable For</SectionTitle>
            <Description>{room.forWhom}</Description>
          </Section>

          <ContactCard>
            <ContactTitle>Contact Information</ContactTitle>
            <ContactInfo>
              <Avatar>{getInitials(room.ownerName)}</Avatar>
              <div>
                <ContactName>{room.ownerName}</ContactName>
                <ContactPhone href={`tel:${room.contactNumber}`}>
                  <PhoneIcon /> {room.contactNumber}
                </ContactPhone>
              </div>
            </ContactInfo>
          </ContactCard>
        </Content>
      </DetailsCard>
    </Container>
  );
}

export default RoomDetails;