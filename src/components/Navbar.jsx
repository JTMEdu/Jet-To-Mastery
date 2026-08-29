import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import siteLogo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Programs', href: '#' },
    { label: 'Learning', href: '#' },
    { label: 'Master Classes', href: '#' },
    { label: 'Resources', href: '#' },
    { label: 'Coding Platform', href: '#' },
    { label: 'Colleges', href: '#' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <a href="#" className="navbar-logo">
          <img src={siteLogo} alt="Jet to Mastery Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">Jet to Mastery</span>
        </a>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navItems.map((item, index) => (
            <div key={index} className="nav-item">
              <a href={item.href} className="nav-link">{item.label}</a>
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          <button className="icon-btn" aria-label="Search">
            {/* <Search size={20} /> */}
          </button>
          <Link to="/login" className="login-link">Login</Link>
          <a href="#" className="btn btn-primary btn-sm">Get Started</a>
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass">
          <div className="mobile-nav-links">
            {navItems.map((item, index) => (
              <a key={index} href={item.href} className="mobile-nav-link">
                {item.label}
              </a>
            ))}
            <div className="mobile-actions">
              <a href="#" className="btn btn-secondary w-full">Login</a>
              <a href="#" className="btn btn-primary w-full">Get Started</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
