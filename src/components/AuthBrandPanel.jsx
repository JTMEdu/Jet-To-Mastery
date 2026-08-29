import React from 'react';
import { Award, Code, CheckCircle } from 'lucide-react';
import siteLogo from '../assets/logo.png';

const AuthBrandPanel = () => {
  const features = [
    { icon: <Code size={18} />, title: 'DSA & Coding Practice', desc: 'Practice real coding problems.' },
    { icon: <CheckCircle size={18} />, title: 'Placement Preparation', desc: 'Prepare for technical and screening rounds.' },
    { icon: <Award size={18} />, title: 'Industry Opportunities', desc: 'Connect with hiring partners.' }
  ];

  return (
    <div className="auth-brand-panel">
      <div className="brand-overlay"></div>
      <div className="brand-panel-content">
        <div className="brand-header flex items-center gap-2">
          <img src={siteLogo} alt="Jet to Mastery Logo" className="brand-logo-img" />
          <h3 className="brand-logo-text">Jet to Mastery</h3>
        </div>
        
        <div className="brand-core-message">
          <h2 className="brand-title">Accelerate Your Technical Career</h2>
          <p className="brand-subtitle">
            Build real software skills, prepare for placements, and connect with industry opportunities.
          </p>
        </div>

        <div className="brand-features-list">
          {features.map((feat, idx) => (
            <div key={idx} className="brand-feature-item">
              <div className="brand-feature-icon">
                {feat.icon}
              </div>
              <div className="brand-feature-text">
                <h4 className="brand-feature-title">{feat.title}</h4>
                <p className="brand-feature-desc">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="brand-footer-stats">
          <div className="brand-stat-item">
            <span className="brand-stat-number">100k+</span>
            <span className="brand-stat-label">Learners</span>
          </div>
          <div className="brand-stat-item">
            <span className="brand-stat-number">4000+</span>
            <span className="brand-stat-label">Problems</span>
          </div>
          <div className="brand-stat-item">
            <span className="brand-stat-number">500+</span>
            <span className="brand-stat-label">Colleges</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBrandPanel;
