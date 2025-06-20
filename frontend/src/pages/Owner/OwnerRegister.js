import React, { useState } from 'react';
import { FaHome, FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../styles/OwnerRegister.css';


const owner_url = process.env.REACT_APP_API_URL

const OwnerRegister = () => {
  const navigate = useNavigate();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const photoUpload = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }
    if (!isChecked) {
      setMessage("Please confirm you are a property owner.");
      return;
    }

    const { name, email, mobile, password } = formData;
    const ownerData = {
      name,
      email,
      mobile,
      password,
      avatar: imagePreviewUrl
    };

    try {
      setLoading(true);
      const res = await fetch(`${process.env.API_URL}/api/owner/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ownerData)
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setMessage(data.message || 'Registration failed');
      } else {
        setMessage('Registration successful! Redirecting to login...');
        setFormData({
          name: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: ''
        });
        setImagePreviewUrl('');
        setIsChecked(false);


        setTimeout(() => {
          navigate('/owner/login');
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="owner-register-container">
      <div className="register-card">
        <div className="register-header">
          <FaHome className="register-icon" />
          <h1 className="register-title">Create Owner Account</h1>
          <p className="register-subtitle">Join our platform to manage your properties</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="avatar-upload">
            <div className="avatar-preview">
              <img
                src={imagePreviewUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                alt="Profile Preview"
              />
            </div>
            <div className="avatar-edit">
              <input
                type="file"
                id="avatarUpload"
                accept="image/*"
                onChange={photoUpload}
              />
              <label htmlFor="avatarUpload">
                <FaCamera />
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              className="form-input"
              placeholder="Phone Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="ownerCheck"
              className="checkbox-input"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              required
            />
            <label htmlFor="ownerCheck" className="checkbox-label">
              I confirm that I am a property owner
            </label>
          </div>

          <button
            type="submit"
            className="submit-btn2"
            disabled={!isChecked || loading}
          >
            {loading ? 'Registering...' : 'Register Now'}
          </button>

          {message && <p className="form-message">{message}</p>}

          <p className="login-link">
            Already have an account? <a href="/owner/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OwnerRegister;