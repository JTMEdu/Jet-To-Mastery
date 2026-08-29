import React from 'react';
import './FinalCTA.css';

const FinalCTA = () => {
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-box">
          <div className="cta-content">
            <h2 className="h2 text-white cta-title">Ready To Master Technology?</h2>
            <p className="text-white cta-subtitle">
              Join thousands of learners and start building your tech career today with Jet to Mastery.
            </p>
            <div className="cta-actions">
              <a href="#" className="btn btn-white">Start Learning</a>
              <a href="#" className="btn btn-outline-white">Book Demo</a>
            </div>
          </div>
          <div className="cta-bg-elements">
            <div className="cta-circle circle-1"></div>
            <div className="cta-circle circle-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
