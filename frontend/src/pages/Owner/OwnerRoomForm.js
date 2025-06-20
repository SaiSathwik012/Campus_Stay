import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes, css } from 'styled-components';


const owner_url = process.env.REACT_APP_API_URL
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(67, 97, 238, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(67, 97, 238, 0); }
  100% { box-shadow: 0 0 0 0 rgba(67, 97, 238, 0); }
`;

const FormContainer = styled(motion.div)`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, #4361ee, #4895ef, #4cc9f0);
  }
`;

const FormTitle = styled.h1`
  color: #4361ee;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #4361ee, #4895ef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #4361ee, #4895ef);
    border-radius: 3px;
  }
`;

const FormSubtitle = styled.p`
  color: #6c757d;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  font-weight: 400;
`;

const FormSection = styled(motion.div)`
  padding: 1.8rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const SectionTitle = styled.h2`
  color: #4361ee;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 24px;
    background: linear-gradient(to bottom, #4361ee, #4895ef);
    margin-right: 12px;
    border-radius: 4px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;
  
  label {
    font-weight: 500;
    color: #495057;
    font-size: 0.95rem;
    margin-left: 4px;
  }
  
  input, select, textarea {
    padding: 0.9rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    width: 100%;
    background: #f8f9fa;
    
    &:focus {
      border-color: #4361ee;
      outline: none;
      box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
      background: white;
    }
    
    &::placeholder {
      color: #adb5bd;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const FileInputContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 100%;
`;

const FileInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const FileInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border: 2px dashed #ced4da;
  border-radius: 8px;
  background: #f8f9fa;
  color: #6c757d;
  font-size: 0.95rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4361ee;
    background: rgba(67, 97, 238, 0.05);
  }
  
  svg {
    margin-bottom: 8px;
    color: #4361ee;
    font-size: 1.5rem;
  }
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 0.85rem;
  color: #4361ee;
  font-weight: 500;
  
  svg {
    color: #20c997;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #4361ee, #4895ef);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin: 0 auto;
  box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(67, 97, 238, 0.4);
    background: linear-gradient(135deg, #3f37c9, #4361ee);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:disabled {
    background: #adb5bd;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
  }
  
  &:hover::after {
    animation: shine 1.5s infinite;
  }
  
  @keyframes shine {
    100% {
      transform: translateX(100%);
    }
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled(motion.div)`
  padding: 1rem;
  background-color: #ffecec;
  color: #dc3545;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #dc3545;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  svg {
    flex-shrink: 0;
  }
`;

const SuccessMessage = styled(motion.div)`
  padding: 1rem;
  background-color: #e6f7ee;
  color: #20c997;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #20c997;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  svg {
    flex-shrink: 0;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    appearance: none;
    border: 2px solid #ced4da;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    
    &:checked {
      background-color: #4361ee;
      border-color: #4361ee;
      
      &::after {
        content: '✓';
        position: absolute;
        color: white;
        font-size: 12px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    
    &:hover {
      border-color: #4361ee;
    }
  }
  
  label {
    font-weight: normal;
    color: #495057;
    cursor: pointer;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const UploadIcon = () => <span>📁</span>;
const SuccessIcon = () => <span>✅</span>;
const ErrorIcon = () => <span>❌</span>;

function OwnerRoomForm() {
    const [form, setForm] = useState({
        ownerName: '',
        fullAddress: '',
        forWhom: '',
        availabilityStatus: '',
        availableFrom: '',
        roomType: '',
        duration: '',
        roomCapacity: '',
        distanceToCollege: '',
        bedrooms: '',
        kitchen: '',
        facilities: '',
        rent: '',
        contactNumber: '',
        wifi: '',
        parking: '',
        medicalNearby: '',
        drinkingWater: '',
        restaurantsNearby: '',
        agreement: false
    });
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFormVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = e => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);

        if (selectedFiles.length > 0) {
            setSuccess(`${selectedFiles.length} file(s) selected`);
            setTimeout(() => setSuccess(''), 2000);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        if (!form.agreement) {
            setError('Please confirm that all details are correct');
            setIsSubmitting(false);
            return;
        }

        const data = new FormData();


        Object.keys(form).forEach(key => {
            if (key === 'agreement') {
                data.append(key, form[key].toString());
            } else {
                data.append(key, form[key]);
            }
        });


        files.forEach(file => {
            data.append('roomPictures', file);
        });

        try {
            await axios.post(`${owner_url}/api/rooms`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccess('Room listed successfully!');


            setForm({
                ownerName: '',
                fullAddress: '',
                forWhom: '',
                availabilityStatus: '',
                availableFrom: '',
                roomType: '',
                duration: '',
                roomCapacity: '',
                distanceToCollege: '',
                bedrooms: '',
                kitchen: '',
                facilities: '',
                rent: '',
                contactNumber: '',
                wifi: '',
                parking: '',
                medicalNearby: '',
                drinkingWater: '',
                restaurantsNearby: '',
                agreement: false
            });
            setFiles([]);


            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error('Submission error:', err.response?.data);
            setError(err.response?.data?.error || 'Submission failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <FormTitle>List Your Room for Rent</FormTitle>
            <FormSubtitle>Fill out the form below to list your property</FormSubtitle>

            <AnimatePresence>
                {error && (
                    <ErrorMessage
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <ErrorIcon /> {error}
                    </ErrorMessage>
                )}

                {success && (
                    <SuccessMessage
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <SuccessIcon /> {success}
                    </SuccessMessage>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
                <FormSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <SectionTitle>Basic Information</SectionTitle>
                    <GridContainer>
                        <FormGroup>
                            <label htmlFor="ownerName">Owner's Name*</label>
                            <input
                                id="ownerName"
                                name="ownerName"
                                type="text"
                                required
                                placeholder="Your full name"
                                onChange={handleChange}
                                value={form.ownerName}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="roomPictures">Room Pictures*</label>
                            <FileInputContainer>
                                <FileInput
                                    type="file"
                                    id="roomPictures"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                />
                                <FileInputLabel htmlFor="roomPictures">
                                    <UploadIcon />
                                    {files.length > 0 ? 'Add more files' : 'Click to upload'}
                                </FileInputLabel>
                            </FileInputContainer>
                            {files.length > 0 && (
                                <FilePreview>
                                    <SuccessIcon /> {files.length} file(s) selected
                                </FilePreview>
                            )}
                        </FormGroup>

                        <FormGroup style={{ gridColumn: '1 / -1' }}>
                            <label htmlFor="fullAddress">Full Address*</label>
                            <textarea
                                id="fullAddress"
                                name="fullAddress"
                                required
                                placeholder="Complete address with city and PIN code"
                                onChange={handleChange}
                                value={form.fullAddress}
                                rows="3"
                            />
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="forWhom">Suitable For*</label>
                            <select
                                id="forWhom"
                                name="forWhom"
                                required
                                onChange={handleChange}
                                value={form.forWhom}
                            >
                                <option value="">Select option</option>
                                <option value="Boys">Boys</option>
                                <option value="Girls">Girls</option>
                                <option value="Both">Both</option>
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="availabilityStatus">Availability*</label>
                            <select
                                id="availabilityStatus"
                                name="availabilityStatus"
                                required
                                onChange={handleChange}
                                value={form.availabilityStatus}
                            >
                                <option value="">Select status</option>
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="availableFrom">Available From*</label>
                            <input
                                type="date"
                                id="availableFrom"
                                name="availableFrom"
                                required
                                onChange={handleChange}
                                value={form.availableFrom}
                            />
                        </FormGroup>
                    </GridContainer>
                </FormSection>

                <FormSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <SectionTitle>Room Details</SectionTitle>
                    <GridContainer>
                        <FormGroup>
                            <label htmlFor="roomType">Room Type*</label>
                            <select
                                id="roomType"
                                name="roomType"
                                required
                                onChange={handleChange}
                                value={form.roomType}
                            >
                                <option value="">Select type</option>
                                <option value="Single Room">Single Room</option>
                                <option value="Shared Room">Shared Room</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Hostel">Hostel</option>
                                <option value="PG">PG</option>
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="duration">Duration (Months)*</label>
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                required
                                placeholder="e.g. 12"
                                onChange={handleChange}
                                value={form.duration}
                                min="1"
                            />
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="roomCapacity">Room Capacity*</label>
                            <input
                                type="text"
                                id="roomCapacity"
                                name="roomCapacity"
                                required
                                placeholder="e.g. 2 people"
                                onChange={handleChange}
                                value={form.roomCapacity}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="distanceToCollege">Distance to College (km)*</label>
                            <input
                                type="number"
                                id="distanceToCollege"
                                name="distanceToCollege"
                                required
                                placeholder="e.g. 2.5"
                                onChange={handleChange}
                                value={form.distanceToCollege}
                                step="0.1"
                            />
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="bedrooms">No. of Bedrooms*</label>
                            <input
                                type="number"
                                id="bedrooms"
                                name="bedrooms"
                                required
                                placeholder="e.g. 2"
                                onChange={handleChange}
                                value={form.bedrooms}
                                min="1"
                            />
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="kitchen">Kitchen Facility*</label>
                            <select
                                id="kitchen"
                                name="kitchen"
                                required
                                onChange={handleChange}
                                value={form.kitchen}
                            >
                                <option value="">Select option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Shared">Shared</option>
                            </select>
                        </FormGroup>

                        <FormGroup style={{ gridColumn: '1 / -1' }}>
                            <label htmlFor="facilities">Basic Facilities*</label>
                            <textarea
                                id="facilities"
                                name="facilities"
                                required
                                placeholder="List all facilities (e.g. Bed, Wardrobe, Study Table)"
                                onChange={handleChange}
                                value={form.facilities}
                                rows="3"
                            />
                        </FormGroup>
                    </GridContainer>
                </FormSection>

                <FormSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <SectionTitle>Pricing & Contact</SectionTitle>
                    <GridContainer>
                        <FormGroup>
                            <label htmlFor="rent">Monthly Rent (₹)*</label>
                            <input
                                type="number"
                                id="rent"
                                name="rent"
                                required
                                placeholder="e.g. 8000"
                                onChange={handleChange}
                                value={form.rent}
                                min="0"
                            />
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="contactNumber">Contact Number*</label>
                            <input
                                type="tel"
                                id="contactNumber"
                                name="contactNumber"
                                required
                                placeholder="10-digit mobile number"
                                pattern="[0-9]{10}"
                                maxLength="10"
                                onChange={handleChange}
                                value={form.contactNumber}
                            />
                        </FormGroup>
                    </GridContainer>
                </FormSection>

                <FormSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <SectionTitle>Amenities</SectionTitle>
                    <AmenitiesGrid>
                        <FormGroup>
                            <label htmlFor="wifi">WiFi Available*</label>
                            <select
                                id="wifi"
                                name="wifi"
                                required
                                onChange={handleChange}
                                value={form.wifi}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="parking">Parking Available*</label>
                            <select
                                id="parking"
                                name="parking"
                                required
                                onChange={handleChange}
                                value={form.parking}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="medicalNearby">Medical Nearby*</label>
                            <select
                                id="medicalNearby"
                                name="medicalNearby"
                                required
                                onChange={handleChange}
                                value={form.medicalNearby}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="drinkingWater">Drinking Water*</label>
                            <select
                                id="drinkingWater"
                                name="drinkingWater"
                                required
                                onChange={handleChange}
                                value={form.drinkingWater}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <label htmlFor="restaurantsNearby">Restaurants Nearby*</label>
                            <select
                                id="restaurantsNearby"
                                name="restaurantsNearby"
                                required
                                onChange={handleChange}
                                value={form.restaurantsNearby}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </FormGroup>
                    </AmenitiesGrid>
                </FormSection>

                <FormSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <CheckboxContainer>
                        <input
                            type="checkbox"
                            id="agreement"
                            name="agreement"
                            required
                            onChange={handleChange}
                            checked={form.agreement}
                        />
                        <label htmlFor="agreement">
                            I confirm that all the above details are correct and accurate*
                        </label>
                    </CheckboxContainer>
                </FormSection>

                <motion.div
                    style={{ marginTop: '2rem' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <SubmitButton
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isSubmitting ? (
                            <>
                                <Spinner /> Submitting...
                            </>
                        ) : (
                            'Submit Listing'
                        )}
                    </SubmitButton>
                </motion.div>
            </form>
        </FormContainer>
    );
}

export default OwnerRoomForm;