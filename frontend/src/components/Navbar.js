import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { FaBars, FaTimes, FaSignOutAlt, FaMoon, FaSun, FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const studentToken = localStorage.getItem('studentToken');
    const ownerToken = localStorage.getItem('ownerToken');
    const adminToken = localStorage.getItem('adminToken');

    setIsStudentLoggedIn(!!studentToken);
    setIsOwnerLoggedIn(!!ownerToken);
    setIsAdminLoggedIn(!!adminToken);

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    }

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleLogout = (type) => {
    localStorage.removeItem(`${type}Token`);
    localStorage.removeItem(`${type}Data`);
    if (type === 'student') setIsStudentLoggedIn(false);
    if (type === 'owner') setIsOwnerLoggedIn(false);
    if (type === 'admin') setIsAdminLoggedIn(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark' : ''}`}>
      <div className="brand-logo" onClick={() => navigate('/')}>
        <img src={logoImg} alt="Logo" className="logo" />
        <h1>Campus Stay</h1>
      </div>

      <button className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`nav-container ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li>
            <a href="/" onClick={() => setIsMenuOpen(false)}>
              <FaHome className="nav-icon" /> Home
            </a>
          </li>
          <li>
            <a href="/about" onClick={() => setIsMenuOpen(false)}>
              <FaInfoCircle className="nav-icon" /> About
            </a>
          </li>
          <li>
            <a href="/contact" onClick={() => setIsMenuOpen(false)}>
              <FaEnvelope className="nav-icon" /> Contact
            </a>
          </li>

          {(isStudentLoggedIn || isOwnerLoggedIn || isAdminLoggedIn) && (
            <>
              <li>
                <button className="dark-toggle-btn" onClick={toggleDarkMode} aria-label="Toggle dark mode">
                  {isDarkMode ? <FaSun /> : <FaMoon />}
                </button>
              </li>
              <li>
                <button
                  className="logout-btn"
                  onClick={() => handleLogout(
                    isStudentLoggedIn ? 'student' :
                      isOwnerLoggedIn ? 'owner' : 'admin'
                  )}
                >
                  <FaSignOutAlt className="nav-icon" /> Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;