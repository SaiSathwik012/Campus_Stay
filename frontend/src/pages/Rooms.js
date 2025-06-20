import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiMapPin, FiWifi, FiHome, FiUsers, FiCalendar, FiStar } from 'react-icons/fi';
import { IoBedOutline, IoCarSportOutline, IoMedicalOutline } from 'react-icons/io5';

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 0.8rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SearchFilterContainer = styled(motion.div)`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
  margin-bottom: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem 1rem 3rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  background-color: #f9fafb;
  
  &:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    background-color: #ffffff;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 1.2rem;
`;

const FilterButton = styled.button`
  padding: 0 1.8rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const FiltersDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  width: 320px;
  z-index: 100;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const FiltersTitle = styled.h3`
  font-size: 1.2rem;
  color: #111827;
  margin: 0;
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  color: #8b5cf6;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  
  &:hover {
    background-color: #f5f3ff;
  }
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

const FilterGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.6rem;
    font-size: 0.9rem;
    color: #374151;
    font-weight: 500;
  }

  input, select {
    width: 100%;
    padding: 0.7rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 0.9rem;
    background-color: #f9fafb;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #8b5cf6;
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
      background-color: #ffffff;
    }
  }
`;

const ApplyFiltersButton = styled.button`
  padding: 0.9rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1.5rem;
  width: 100%;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RoomCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.div`
  height: 240px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  ${RoomCard}:hover & img {
    transform: scale(1.05);
  }
`;

const CardBadge = styled.span`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: ${props => props.available ? 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' : 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)'};
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardContent = styled.div`
  padding: 1.8rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #111827;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.3;
`;

const CardPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #7c3aed;
  display: flex;
  align-items: center;
  
  span {
    font-size: 1rem;
    font-weight: 400;
    color: #6b7280;
    margin-left: 0.3rem;
  }
`;

const CardDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #4b5563;
  background-color: #f9fafb;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  
  svg {
    margin-right: 0.5rem;
    color: #7c3aed;
    font-size: 1rem;
  }
`;

const CardDescription = styled.p`
  color: #4b5563;
  font-size: 0.95rem;
  margin-bottom: 1.8rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
`;

const OwnerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const OwnerAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.8rem;
  font-weight: 600;
  font-size: 0.9rem;
`;

const OwnerName = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: #111827;
`;

const ViewButton = styled(Link)`
  padding: 0.7rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(139, 92, 246, 0.1);
  border-radius: 50%;
  border-top-color: #8b5cf6;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #6b7280;
  background-color: #f9fafb;
  border-radius: 16px;
  margin: 2rem 0;
  
  h3 {
    font-size: 1.5rem;
    color: #111827;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
  
  button {
    padding: 0.8rem 1.8rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }
  }
`;

const RatingBadge = styled.div`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  svg {
    color: #f59e0b;
  }
`;

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [studentName, setStudentName] = useState('');

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    roomType: '',
    duration: '',
    roomCapacity: '',
    distanceToCollege: '',
    bedrooms: '',
    kitchen: '',
    wifi: '',
    parking: '',
    medicalNearby: '',
    drinkingWater: '',
    restaurantsNearby: '',
    minPrice: '',
    maxPrice: ''
  });

  const applyFilters = useCallback(() => {
    let results = [...rooms];

    // Apply search term filter
    if (searchTerm) {
      results = results.filter(room =>
        room.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (room.facilities && room.facilities.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (room.ownerName && room.ownerName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply other filters
    if (filters.roomType) {
      results = results.filter(room => room.roomType === filters.roomType);
    }

    if (filters.duration) {
      results = results.filter(room => room.duration >= parseInt(filters.duration));
    }

    if (filters.roomCapacity) {
      results = results.filter(room => room.roomCapacity.includes(filters.roomCapacity));
    }

    if (filters.distanceToCollege) {
      results = results.filter(room => room.distanceToCollege <= parseFloat(filters.distanceToCollege));
    }

    if (filters.bedrooms) {
      results = results.filter(room => room.bedrooms >= parseInt(filters.bedrooms));
    }

    if (filters.kitchen) {
      results = results.filter(room => room.kitchen === filters.kitchen);
    }

    if (filters.wifi) {
      results = results.filter(room => room.wifi === filters.wifi);
    }

    if (filters.parking) {
      results = results.filter(room => room.parking === filters.parking);
    }

    if (filters.medicalNearby) {
      results = results.filter(room => room.medicalNearby === filters.medicalNearby);
    }

    if (filters.drinkingWater) {
      results = results.filter(room => room.drinkingWater === filters.drinkingWater);
    }

    if (filters.restaurantsNearby) {
      results = results.filter(room => room.restaurantsNearby === filters.restaurantsNearby);
    }

    if (filters.minPrice) {
      results = results.filter(room => room.rent >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      results = results.filter(room => room.rent <= parseInt(filters.maxPrice));
    }

    setFilteredRooms(results);
  }, [rooms, searchTerm, filters]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms');
        setRooms(response.data);
        setFilteredRooms(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Failed to load rooms. Please try again later.');
        setLoading(false);
      }
    };

    // Get student name from localStorage
    const studentData = localStorage.getItem('studentData');
    if (studentData) {
      const parsedData = JSON.parse(studentData);
      setStudentName(parsedData.name || 'Student');
    }

    fetchRooms();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      roomType: '',
      duration: '',
      roomCapacity: '',
      distanceToCollege: '',
      bedrooms: '',
      kitchen: '',
      wifi: '',
      parking: '',
      medicalNearby: '',
      drinkingWater: '',
      restaurantsNearby: '',
      minPrice: '',
      maxPrice: ''
    });
    setSearchTerm('');
    setShowFilters(false);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getRandomRating = () => {
    return (Math.random() * 1 + 4).toFixed(1);
  };

  return (
    <Container>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontSize: '1.8rem',
            fontWeight: 600,
            color: '#7c3aed',
            marginBottom: '1rem',
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(124, 58, 237, 0.2)'
          }}
        >
          Hello, {studentName}!
        </motion.div>
        <Title>Discover Your Ideal Student Accommodation</Title>
        <Subtitle>Browse premium rooms, apartments, and shared spaces near your college with all the amenities you need for comfortable student living.</Subtitle>
      </Header>

      <SearchFilterContainer
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SearchBar>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search by room type, facilities or owner..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FilterButton onClick={() => setShowFilters(!showFilters)}>
            <FiFilter /> Filters
          </FilterButton>

          <AnimatePresence>
            {showFilters && (
              <FiltersDropdown
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FiltersHeader>
                  <FiltersTitle>Filter Rooms</FiltersTitle>
                  <ResetButton onClick={resetFilters}>Reset All</ResetButton>
                </FiltersHeader>

                <FiltersContainer>
                  <FilterGroup>
                    <label>Room Type</label>
                    <select name="roomType" value={filters.roomType} onChange={handleFilterChange}>
                      <option value="">All Types</option>
                      <option value="Single Room">Single Room</option>
                      <option value="Shared Room">Shared Room</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Studio">Studio</option>
                    </select>
                  </FilterGroup>

                  <FilterGroup>
                    <label>Minimum Duration (Months)</label>
                    <input
                      type="number"
                      name="duration"
                      placeholder="e.g. 6"
                      value={filters.duration}
                      onChange={handleFilterChange}
                    />
                  </FilterGroup>

                  <FilterGroup>
                    <label>Room Capacity</label>
                    <select name="roomCapacity" value={filters.roomCapacity} onChange={handleFilterChange}>
                      <option value="">Any</option>
                      <option value="1 person">1 Person</option>
                      <option value="2 people">2 People</option>
                      <option value="3 people">3 People</option>
                      <option value="4+ people">4+ People</option>
                    </select>
                  </FilterGroup>

                  <FilterGroup>
                    <label>Max Distance to College (km)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="distanceToCollege"
                      placeholder="e.g. 3.0"
                      value={filters.distanceToCollege}
                      onChange={handleFilterChange}
                    />
                  </FilterGroup>

                  <FilterGroup>
                    <label>Minimum Bedrooms</label>
                    <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange}>
                      <option value="">Any</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </FilterGroup>

                  <FilterGroup>
                    <label>Kitchen Facility</label>
                    <select name="kitchen" value={filters.kitchen} onChange={handleFilterChange}>
                      <option value="">Any</option>
                      <option value="Private">Private</option>
                      <option value="Shared">Shared</option>
                      <option value="None">None</option>
                    </select>
                  </FilterGroup>

                  <FilterGroup>
                    <label>WiFi Available</label>
                    <select name="wifi" value={filters.wifi} onChange={handleFilterChange}>
                      <option value="">Any</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </FilterGroup>

                  <FilterGroup>
                    <label>Parking Available</label>
                    <select name="parking" value={filters.parking} onChange={handleFilterChange}>
                      <option value="">Any</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </FilterGroup>

                  <FilterGroup>
                    <label>Price Range (₹)</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="number"
                        name="minPrice"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        style={{ flex: 1 }}
                      />
                      <input
                        type="number"
                        name="maxPrice"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        style={{ flex: 1 }}
                      />
                    </div>
                  </FilterGroup>
                </FiltersContainer>

                <ApplyFiltersButton onClick={() => setShowFilters(false)}>
                  Apply Filters
                </ApplyFiltersButton>
              </FiltersDropdown>
            )}
          </AnimatePresence>
        </SearchBar>
      </SearchFilterContainer>

      {loading ? (
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      ) : error ? (
        <EmptyState>{error}</EmptyState>
      ) : filteredRooms.length === 0 ? (
        <EmptyState>
          <h3>No rooms match your search criteria</h3>
          <p>We couldn't find any accommodations that match your filters. Try adjusting your search parameters or resetting all filters to see more options.</p>
          <button onClick={resetFilters}>Reset All Filters</button>
        </EmptyState>
      ) : (
        <RoomsGrid>
          <AnimatePresence>
            {filteredRooms.map((room) => (
              <RoomCard
                key={room._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <CardImage>
                  {room.roomPictures && room.roomPictures.length > 0 ? (
                    <img
                      src={`http://localhost:5000${room.roomPictures[0]}`}
                      alt={room.roomType}
                    />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Placeholder"
                    />
                  )}
                  <CardBadge available={room.availabilityStatus === 'Available'}>
                    {room.availabilityStatus}
                  </CardBadge>
                  <RatingBadge>
                    <FiStar /> {getRandomRating()}
                  </RatingBadge>
                </CardImage>

                <CardContent>
                  <CardHeader>
                    <CardTitle>{room.roomType}</CardTitle>
                    <CardPrice>
                      ₹{room.rent.toLocaleString()}
                      <span>/month</span>
                    </CardPrice>
                  </CardHeader>

                  <CardDetails>
                    <DetailItem>
                      <IoBedOutline /> {room.bedrooms} {room.bedrooms > 1 ? 'Beds' : 'Bed'}
                    </DetailItem>
                    <DetailItem>
                      <FiUsers /> {room.roomCapacity}
                    </DetailItem>
                    <DetailItem>
                      <FiMapPin /> {room.distanceToCollege} km
                    </DetailItem>
                    {room.wifi === 'Yes' && (
                      <DetailItem>
                        <FiWifi /> WiFi
                      </DetailItem>
                    )}
                    {room.parking === 'Yes' && (
                      <DetailItem>
                        <IoCarSportOutline /> Parking
                      </DetailItem>
                    )}
                    {room.medicalNearby === 'Yes' && (
                      <DetailItem>
                        <IoMedicalOutline /> Medical
                      </DetailItem>
                    )}
                    <DetailItem>
                      <FiCalendar /> {formatDate(room.availableFrom)}
                    </DetailItem>
                  </CardDetails>

                  <CardDescription>
                    {room.facilities || "This comfortable accommodation offers all the necessary amenities for student living."}
                  </CardDescription>

                  <CardFooter>
                    <OwnerInfo>
                      <OwnerAvatar>
                        {getInitials(room.ownerName)}
                      </OwnerAvatar>
                      <OwnerName>{room.ownerName}</OwnerName>
                    </OwnerInfo>
                    <ViewButton to={`/owner/rooms/${room._id}`}>
                      <FiHome /> View
                    </ViewButton>
                  </CardFooter>
                </CardContent>
              </RoomCard>
            ))}
          </AnimatePresence>
        </RoomsGrid>
      )}
    </Container>
  );
}

export default Rooms;