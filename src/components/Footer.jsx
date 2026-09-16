import React from 'react';
import { MessageCircle, Briefcase, Code, Video } from 'lucide-react';
import './Footer.css';
import siteLogo from '../assets/logo2.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <h2 className="footer-logo">
              <img src={siteLogo} alt="Jet to Mastery Logo" className="footer-logo-img" />
              <span className="footer-logo-text">Jet to Mastery</span>
            </h2>
            <p className="footer-desc text-muted">
              The premium ecosystem for technology learning and career growth. Master skills, crack interviews, and get hired.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><MessageCircle size={20} /></a>
              <a href="#" className="social-link"><Briefcase size={20} /></a>
              <a href="#" className="social-link"><Code size={20} /></a>
              <a href="#" className="social-link"><Video size={20} /></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Programs</h4>
            <ul className="footer-links">
              <li><a href="#">Java Full Stack</a></li>
              <li><a href="#">MERN Stack</a></li>
              <li><a href="#">Data Science & ML</a></li>
              <li><a href="#">Cloud & DevOps</a></li>
              <li><a href="#">System Design</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Blog</a></li>
              <li><a href="#">Tutorials</a></li>
              <li><a href="#">Career Guides</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Success Stories</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Coding Platform</h4>
            <ul className="footer-links">
              <li><a href="#">Problems</a></li>
              <li><a href="#">Company wise</a></li>
              <li><a href="#">Contests</a></li>
              <li><a href="#">Leaderboard</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">For Colleges</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright text-muted">
            &copy; {new Date().getFullYear()} Jet to Mastery. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
