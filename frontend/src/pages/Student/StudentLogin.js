import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUserGraduate, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import "../../styles/StudentLogin.css";

const login_url = process.env.REACT_APP_API_URL


const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromAuthPage) {
      handleAutoLogout();
      return;
    }

    const token = localStorage.getItem("studentToken");
    if (token) {
      showRedirectAlert();
    }
  }, [navigate, location]);

  const handleAutoLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentData");
    Swal.fire({
      title: "Session Expired",
      text: "Please login again to continue",
      icon: "info",
      background: "#ffffff",
      confirmButtonColor: "#10b981",
    });
  };

  const showRedirectAlert = () => {
    Swal.fire({
      title: "Already Logged In",
      html: '<div style="color: #10b981; font-size: 3rem; margin: 1rem 0;">✓</div><p style="margin-bottom: 0;">Redirecting to your dashboard...</p>',
      showConfirmButton: false,
      timer: 1500,
      background: "#ffffff",
      backdrop: "rgba(16, 185, 129, 0.1)"
    });
    setTimeout(() => navigate("/rooms", { state: { fromAuthPage: false } }), 1500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${login_url}/api/student/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Save token & student data
      localStorage.setItem("studentToken", response.data.token);
      localStorage.setItem("studentData", JSON.stringify(response.data.student));

      await showSuccessAlert();
      navigate("/room", { state: { fromAuthPage: false } });
    } catch (error) {
      showErrorAlert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccessAlert = () => {
    return Swal.fire({
      title: "Welcome Back!",
      html: '<div style="color: #10b981; font-size: 3rem; margin: 1rem 0;">✓</div><p style="margin-bottom: 0;">Redirecting to your dashboard...</p>',
      showConfirmButton: false,
      timer: 1500,
      background: "#ffffff"
    });
  };

  const showErrorAlert = (error) => {
    const errorMessage =
      error.response?.data?.message ||
      (error.response?.data?.fields
        ? Object.values(error.response.data.fields).filter(Boolean).join(" ")
        : "Invalid credentials. Please try again.");

    return Swal.fire({
      title: "Login Failed",
      text: errorMessage,
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
          <h1 className="login-title">Student Login</h1>
          <p className="login-subtitle">Access your campus housing dashboard</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">University Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@university.edu"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : <>Sign In <FaArrowRight /></>}
          </button>
        </form>

        <div className="register-link">
          New student?{" "}
          <span onClick={() => navigate("/student/register", { state: { fromAuthPage: true } })}>
            Create an account
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;