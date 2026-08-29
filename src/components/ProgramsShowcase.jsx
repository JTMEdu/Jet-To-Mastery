import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import programsData from '../data/programs.json';
import './ProgramsShowcase.css';

const ProgramsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef(null);

  const programs = programsData;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % programs.length);
  }, [programs.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + programs.length) % programs.length);
  }, [programs.length]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isHovered || isFocused) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % programs.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, isFocused, programs.length]);

  return (
    <section className="section showcase-section section-gray">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="h2 section-title">Build Skills That Get You Hired</h2>
          <p className="section-subtitle text-muted">
            Learn the skills, practice the problems, and prepare for the opportunities that matter.
          </p>
        </div>

        <div 
          className="banner-carousel-container dark-premium"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-roledescription="carousel"
        >
          {/* Controls */}
          <button className="banner-nav-btn prev-btn" onClick={handlePrev} aria-label="Previous Program">
            <ChevronLeft size={24} />
          </button>
          <button className="banner-nav-btn next-btn" onClick={handleNext} aria-label="Next Program">
            <ChevronRight size={24} />
          </button>

          {/* Banner Track */}
          <div className="banner-track">
            {programs.map((program, index) => {
              const isActive = index === activeIndex;

              return (
                <div 
                  key={program.id}
                  className={`banner-slide ${isActive ? 'active' : ''}`}
                  aria-hidden={!isActive}
                  style={{ backgroundImage: `url(${program.image})` }}
                >
                  {/* Overlay gradient is handled in CSS over the background image */}
                  <div className="banner-content-left">
                    <span className="banner-badge">{program.category}</span>
                    <h3 className="banner-headline">{program.title}</h3>
                    <blockquote className="banner-quote">
                      "{program.quote}"
                    </blockquote>
                    <p className="banner-desc">
                      {program.description}
                    </p>
                    <a href={program.link} className="btn btn-primary banner-cta">
                      {program.cta} <ArrowRight size={18} style={{ marginLeft: '8px' }}/>
                    </a>
                  </div>
                  {/* Empty right area to let the background image show through */}
                  <div className="banner-visual-right"></div>
                </div>
              );
            })}
          </div>

          {/* Indicators */}
          <div className="banner-indicators">
            {programs.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsShowcase;
