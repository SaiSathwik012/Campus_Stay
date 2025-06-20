import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaHome, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import "../../styles/OwnerLogin.css";

const owner_url = process.env.REACT_APP_API_URL

const OwnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("ownerToken");
    if (token) {
      showRedirectAlert();
    }
  }, [navigate]);

  const showRedirectAlert = () => {
    Swal.fire({
      title: "Already Logged In",
      html: '<div style="color: #10b981; font-size: 3rem; margin: 1rem 0;">✓</div><p style="margin-bottom: 0;">Redirecting to room management...</p>',
      showConfirmButton: false,
      timer: 1500,
      background: "#ffffff",
      backdrop: `
        rgba(16, 185, 129, 0.1)
      `
    });
    setTimeout(() => navigate("/owner/dashboard"), 1500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${owner_url}/api/owner/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("ownerToken", response.data.token);
      await showSuccessAlert();
      navigate("/owner/dashboard");
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
    return Swal.fire({
      title: "Login Failed",
      text: error.response?.data?.message || "Invalid credentials. Please try again.",
      icon: "error",
      background: "#ffffff",
      confirmButtonColor: "#10b981",
      confirmButtonText: "Try Again"
    });
  };

  return (
    <div className="owner-login-container">
      <div className="owner-login-card fade-in">
        <div className="owner-login-header">
          <div className="owner-icon">
            <FaHome />
          </div>
          <h1 className="owner-login-title">Owner Login</h1>
          <p className="owner-login-subtitle">Manage your properties and listings</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
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

          <button
            type="submit"
            className="submit-btn1"
            disabled={isLoading}
          >
            {isLoading ? (
              "Logging in..."
            ) : (
              <>
                Sign In <FaArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="register-link">
          New owner?{" "}
          <span onClick={() => navigate("/owner/register")}>
            Create an account
          </span>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;