import React, { useEffect, useRef, useState } from 'react';
import { Award, BookOpen, GraduationCap, Users } from 'lucide-react';
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

  const focusAreas = [
    { title: 'Coding Practice', desc: 'Master data structures, algorithms, and system design challenges.' },
    { title: 'Aptitude & Reasoning', desc: 'Build speed and accuracy for competitive company filters.' },
    { title: 'Technical Skills', desc: 'Acquire real-world full stack, cloud, and AI engineering expertise.' },
    { title: 'Placement Readiness', desc: 'Get placement-ready with resume reviews and mock interviews.' },
  ];

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className={`section about-section ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="container about-grid">
        {/* Left Column: Context */}
        <div className="about-content">
          <span className="section-tag">Who We Are</span>
          <h2 className="h2 section-title">About Jet to Mastery</h2>
          <p className="about-description">
            Jet to Mastery (JTM) is a premium technology learning and placement-preparation ecosystem.
            We bridge the gap between academic learning and industry expectations, enabling students
            to transition smoothly into high-impact software engineering careers.
          </p>
          <div className="focus-list">
            {focusAreas.map((area, idx) => (
              <div key={idx} className="focus-item">
                <div className="focus-bullet"></div>
                <div className="focus-item-text">
                  <h4 className="focus-item-title">{area.title}</h4>
                  <p className="focus-item-desc text-muted">{area.desc}</p>
                </div>
              </div>
            ))}
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
    </section>
  );
};

export default AboutUs;
