import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Link2 } from 'lucide-react';
import trainersData from '../data/trainers.json';
import './Mentors.css';

// Load images dynamically from assets
const imagesGlob = import.meta.glob('../assets/trainers/*.{jpg,jpeg,png,svg}', { eager: true, import: 'default' });

// Fallback avatar for missing images
const MentorAvatar = ({ index, name }) => {
  const gradients = [
    { start: '#3B82F6', end: '#1D4ED8' },
    { start: '#10B981', end: '#047857' },
    { start: '#8B5CF6', end: '#6D28D9' },
    { start: '#F97316', end: '#C2410C' },
    { start: '#EC4899', end: '#BE185D' },
  ];
  
  const grad = gradients[index % gradients.length];
  const initials = (name || 'T N').split(' ').map(n => n[0]).join('');

  return (
    <div className="mentor-avatar-wrapper">
      <svg viewBox="0 0 100 100" className="mentor-svg">
        <defs>
          <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={grad.start} />
            <stop offset="100%" stopColor={grad.end} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill={`url(#grad-${index})`} />
        <path d="M30 85 C30 70, 40 62, 50 62 C60 62, 70 70, 70 85" fill="#FFFFFF" opacity="0.85" />
        <circle cx="50" cy="40" r="16" fill="#FFFFFF" />
        <path d="M38 38 H62" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <circle cx="43" cy="39" r="5" fill="none" stroke="#1E3A8A" strokeWidth="2.5" opacity="0.6" />
        <circle cx="57" cy="39" r="5" fill="none" stroke="#1E3A8A" strokeWidth="2.5" opacity="0.6" />
        <text x="50" y="93" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif" opacity="0.9">
          {initials}
        </text>
      </svg>
      <span className="avatar-tag">Expert</span>
    </div>
  );
};

const TrainerCard = ({ trainer, index }) => {
  const [imageError, setImageError] = useState(false);
  
  // Resolve image path using glob imports
  const imageKey = `../assets/trainers/${trainer.image}`;
  const imageSrc = imagesGlob[imageKey];

  return (
    <div className="mentor-card card">
      {/* Profile photo */}
      {(imageSrc && !imageError) ? (
        <div className="mentor-avatar-wrapper">
          <img 
            src={imageSrc} 
            alt={trainer.name} 
            className="mentor-image" 
            onError={() => setImageError(true)}
          />
          <span className="avatar-tag">Expert</span>
        </div>
      ) : (
        <MentorAvatar index={index} name={trainer.name} />
      )}
      
      <div className="mentor-info">
        {/* Name */}
        <h3 className="h3 mentor-name">{trainer.name}</h3>
        
        {/* Role */}
        <div className="mentor-role">{trainer.role}</div>
        
        {/* Experience */}
        {trainer.experience && (
          <div className="mentor-experience" style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.5rem', fontWeight: 500 }}>
            {trainer.experience}
          </div>
        )}
        
        {/* Expertise */}
        {trainer.expertise && trainer.expertise.length > 0 && (
          <div className="mentor-expertise" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginBottom: '0.75rem' }}>
            {trainer.expertise.map((skill) => (
              <span key={skill} style={{ background: 'var(--primary-light)', color: 'var(--primary-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                {skill}
              </span>
            ))}
          </div>
        )}
        
        {/* Bio */}
        {trainer.bio && (
          <p className="mentor-desc text-muted">{trainer.bio}</p>
        )}
      </div>
      
      {/* Social links */}
      {(trainer.linkedin || trainer.github) && (
        <div className="mentor-footer" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {trainer.linkedin && (
            <a href={trainer.linkedin} className="linkedin-link" aria-label="LinkedIn Profile" target="_blank" rel="noopener noreferrer">
              <Link2 size={16} />
              <span>LinkedIn</span>
            </a>
          )}
          {trainer.github && (
            <a href={trainer.github} className="github-link" aria-label="GitHub Profile" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#333', textDecoration: 'none', fontWeight: 500, fontSize: '0.85rem' }}>
              <span>GitHub</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const Mentors = () => {
  const mentors = trainersData;

  return (
    <section id="mentors" className="section mentors-section section-gray">
      <div className="container">
        <div className="mentors-header">
          <div className="mentors-header-text">
            <span className="section-tag">Our Faculty</span>
            <h2 className="h2">Meet Our Mentors</h2>
            <p className="text-muted section-subtitle">
              Learn from experienced trainers who help you build the skills companies actually look for.
            </p>
          </div>
        </div>

        {/* Marquee Outer Container */}
        <div className="mentor-marquee-container">
          <div className="mentor-marquee-track">
            {/* Render the lists twice to make a seamless infinite marquee */}
            <div className="mentor-marquee-content">
              {mentors.map((trainer, index) => (
                <div className="mentor-marquee-slide" key={`m1-${trainer.id}-${index}`}>
                  <TrainerCard trainer={trainer} index={index} />
                </div>
              ))}
            </div>

            <div className="mentor-marquee-content" aria-hidden="true">
              {mentors.map((trainer, index) => (
                <div className="mentor-marquee-slide" key={`m2-${trainer.id}-${index}`}>
                  <TrainerCard trainer={trainer} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentors;
