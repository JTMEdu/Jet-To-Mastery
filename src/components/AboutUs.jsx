import React, { useEffect, useRef, useState } from 'react';
import { Award, BookOpen, Eye, GraduationCap, Target, Users } from 'lucide-react';
import Odometer from './Odometer';
import logo from '../assets/logo.png';
import './AboutUs.css';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animate once on scroll
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className={`section about-section ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="container">
        {/* Main Grid: About Us Context & Stats */}
        <div className="about-grid">
          {/* Left Column: Context & Paragraphs */}
          <div className="about-content">
            <span className="section-tag">Who We Are</span>
            <h2 className="h2 section-title">About Jet to Mastery</h2>
            
            <div className="about-paragraphs">
              <p className="about-description">
                At JTM, we are driven by a passion to prevent others from encountering the same career setbacks and challenges we once faced. Our journey began with a vision to empower individuals with the right skills at the right moment.
              </p>
              <p className="about-description">
                We believe that success isn't just about securing a job; it's about building a meaningful and fulfilling career. That's why we focus on providing not only technical expertise but also the soft skills and industry-relevant knowledge.
              </p>
              <p className="about-description">
                As a forward-thinking startup, JTM is committed to delivering innovative and tailored training solutions. Our programs are designed to bridge the gap between education and employment.
              </p>
              <p className="about-description">
                We go beyond the traditional training approach by offering personalized mentorship and hands-on learning experiences that build real-world skills.
              </p>
            </div>
          </div>

          {/* Right Column: Visual highlights and stats */}
          <div className="about-stats-container">
            <div className="stats-glass-card glass-card">
              <div className="about-brand">
                <img
                  src={logo}
                  alt="Jet to Mastery"
                  className="about-brand-logo"
                />
                <div className="about-brand-name">
                  Jet to Mastery
                </div>
              </div>

              <div className="about-stats-grid">
                <div className="about-stat-card card">
                  <div className="about-stat-icon text-blue">
                    <Users size={24} />
                  </div>
                  <div className="about-stat-info">
                    <h4 className="about-stat-number">
                      <Odometer value="100k+" />
                    </h4>
                    <p className="about-stat-label text-muted">Learners Worldwide</p>
                  </div>
                </div>

                <div className="about-stat-card card">
                  <div className="about-stat-icon text-green">
                    <BookOpen size={24} />
                  </div>
                  <div className="about-stat-info">
                    <h4 className="about-stat-number">
                      <Odometer value="4000+" />
                    </h4>
                    <p className="about-stat-label text-muted">Practice Problems</p>
                  </div>
                </div>

                <div className="about-stat-card card">
                  <div className="about-stat-icon text-gold">
                    <GraduationCap size={24} />
                  </div>
                  <div className="about-stat-info">
                    <h4 className="about-stat-number">
                      <Odometer value="500+" />
                    </h4>
                    <p className="about-stat-label text-muted">Partner Colleges</p>
                  </div>
                </div>
              </div>

              <div className="highlights-row">
                <div className="highlight-pill card">
                  <Award size={18} className="text-orange" />
                  <span>Industry-oriented Training</span>
                </div>
                <div className="highlight-pill card">
                  <Award size={18} className="text-purple" />
                  <span>Placement-focused Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards Row */}
        <div className="vision-mission-row">
          <div className="vm-card card">
            <div className="vm-card-header">
              <div className="about-stat-icon text-blue">
                <Eye size={24} />
              </div>
              <h3 className="vm-card-title">Our Vision</h3>
            </div>
            <p className="vm-card-desc">
              At JTM, our vision is to be the leading institute that bridges the gap between education and employment. We empower students with industry-relevant skills and practical experience, preparing them to succeed in the competitive job market.
            </p>
          </div>

          <div className="vm-card card">
            <div className="vm-card-header">
              <div className="about-stat-icon text-purple">
                <Target size={24} />
              </div>
              <h3 className="vm-card-title">Our Mission</h3>
            </div>
            <p className="vm-card-desc">
              At JTM, our mission is to equip students with industry-aligned skills and mentorship that unlock their full potential. Through tailored guidance and strong placement support, we ensure they are prepared to thrive in their careers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
