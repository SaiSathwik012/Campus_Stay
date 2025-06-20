import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUserGraduate, FaEye, FaEyeSlash, FaArrowRight, FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import "../../styles/StudentRegister.css";

const register_url = process.env.REACT_APP_API_URL

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10-15 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${register_url}/api/student/register`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          validateStatus: (status) => status < 500 // To handle 4xx errors normally
        }
      );    

      if (response.data.success) {
        await showSuccessAlert();
        navigate("/student/login");
      } else {
        // Handle backend validation errors
        const backendErrors = response.data.fields || {};
        setErrors(backendErrors);

        const errorMessages = Object.values(backendErrors).filter(Boolean).join(' ');
        showErrorAlert(errorMessages || response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error('Registration error:', error);

      let errorMessage = "Registration failed. Please try again.";

      if (error.response) {
       
        if (error.response.data?.fields) {
          setErrors(error.response.data.fields);
          const fieldErrors = Object.values(error.response.data.fields).filter(Boolean);
          if (fieldErrors.length > 0) {
            errorMessage = fieldErrors.join(' ');
          }
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }

      showErrorAlert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccessAlert = () => {
    return Swal.fire({
      title: "Registration Successful!",
      html: '<div style="color: #10b981; font-size: 3rem; margin: 1rem 0;">✓</div><p style="margin-bottom: 0;">Redirecting to login page...</p>',
      showConfirmButton: false,
      timer: 1500,
      background: "#ffffff"
    });
  };

  const showErrorAlert = (message) => {
    return Swal.fire({
      title: "Registration Failed",
      text: message,
      icon: "error",
      background: "#ffffff",
      confirmButtonColor: "#10b981",
      confirmButtonText: "Try Again"
    });
  };

  return (
    <div className="login-container">
      <div className="login-card fade-in">
        <div className="login-header">
          <div className="user-icon">
            <FaUserGraduate />
          </div>
          <h1 className="login-title">Student Registration</h1>
          <p className="login-subtitle">Create your campus housing account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-with-icon">
              {!formData.name && <FaUser className="input-icon" />}
              <input
                type="text"
                name="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={!formData.name ? "    Name" : ""}
              />
            </div>
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">University Email</label>
            <div className="input-with-icon">
              {!formData.email && <FaEnvelope className="input-icon" />}
              <input
                type="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={!formData.email ? "    Mail" : ""}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div className="input-with-icon">
              {!formData.phone && <FaPhone className="input-icon" />}
              <input
                type="tel"
                name="phone"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder={!formData.phone ? "    Phone Number" : ""}
              />
            </div>
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              {!formData.password && <FaLock className="input-icon" />}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder={!formData.password ? "    Create a password" : ""}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="input-with-icon">
              {!formData.confirmPassword && <FaLock className="input-icon" />}
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder={!formData.confirmPassword ? "    Confirm your password" : ""}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              "Creating account..."
            ) : (
              <>
                Register <FaArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="register-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/student/login")}>
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;