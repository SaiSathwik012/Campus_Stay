import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Campus Stay</h3>
                    <p>Your perfect accommodation solution for students.</p>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/sai.sathveek"><FaFacebook /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="https://www.instagram.com/saisathwiksamudram/"><FaInstagram /></a>
                        <a href="https://www.linkedin.com/in/samudram-sai-sathwik-884585230"><FaLinkedin /></a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>    
                    <ul>
                        <li><a href="/Home">Home</a></li>
                        <li><a href="/about">About Us</a></li>  
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p><i className="fas fa-map-marker-alt"></i> Sagi Rama Krishnam Raju Engineering College, Bhimavaram Town</p>
                    <p><i className="fas fa-phone"></i> +91 70133 77564</p>
                    <p><i className="fas fa-envelope"></i> saisathwik012@gmail.com</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Campus Stay. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Sitemap</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;