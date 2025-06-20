import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaLock, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import "../../styles/AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      const showRedirectAlert = () => {
        Swal.fire({
          title: "Already Logged In",
          html: '<div style="color: #3b82f6; font-size: 3rem; margin: 1rem 0;">✓</div><p style="margin-bottom: 0;">Redirecting to admin dashboard...</p>',
          showConfirmButton: false,
          timer: 1500,
          background: "#ffffff",
          backdrop: `
            rgba(59, 130, 246, 0.1)
          `
        });
        setTimeout(() => navigate("/admin/rooms"), 1500);
      };
      showRedirectAlert();
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("adminToken", response.data.token);
      await showSuccessAlert();
      navigate("/admin/rooms");
    } catch (error) {
      showErrorAlert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccessAlert = () => {
    return Swal.fire({
      title: "Admin Access Granted!",
      html: '<div style="color: #3b82f6; font-size: 3rem; margin: 1rem 0;">✓</div><p style="margin-bottom: 0;">Redirecting to admin dashboard...</p>',
      showConfirmButton: false,
      timer: 1500,
      background: "#ffffff"
    });
  };

  const showErrorAlert = (error) => {
    return Swal.fire({
      title: "Access Denied",
      text: error.response?.data?.message || "Invalid admin credentials. Please try again.",
      icon: "error",
      background: "#ffffff",
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Try Again"
    });
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card fade-in">
        <div className="admin-login-header">
          <div className="admin-icon">
            <FaLock />
          </div>
          <h1 className="admin-login-title">Admin Portal</h1>
          <p className="admin-login-subtitle">System administration and management</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Admin Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
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
              placeholder="Enter admin password"
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
            className="submit-btn-admin"
            disabled={isLoading}
          >
            {isLoading ? (
              "Authenticating..."
            ) : (
              <>
                Sign In <FaArrowRight />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;