import React, { useEffect, useState, useRef } from 'react';
import './Odometer.css';

const Odometer = ({ value }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Play once
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Split string into array of chars. e.g. "100k+" -> ['1', '0', '0', 'k', '+']
  const chars = String(value).split('');

  return (
    <span ref={containerRef} className="odometer-container" aria-label={value}>
      {chars.map((char, index) => {
        // Only animate strictly numeric digits
        const isDigit = /^[0-9]$/.test(char);

        if (isDigit) {
          return (
            <DigitStrip
              key={index}
              digit={char}
              index={index}
              isVisible={isVisible}
            />
          );
        }

        // Static characters like 'k', '+', ','
        return (
          <span key={index} className="odometer-static-char" aria-hidden="true">
            {char}
          </span>
        );
      })}
    </span>
  );
};

const DigitStrip = ({ digit, index, isVisible }) => {
  const [strip, setStrip] = useState([digit]);
  const [startAnimation, setStartAnimation] = useState(false);
  
  useEffect(() => {
    const targetDigit = parseInt(digit, 10);
    const generatedStrip = [];
    
    // Total items determines how long the mechanical wheel spins.
    // Staggered by index so left-to-right digits finish landing slightly apart.
    const totalItems = 30 + (index * 10);
    let current = targetDigit;
    
    generatedStrip.unshift(current);
    
    // Build the strip backwards. 
    // If target is 0, array goes [0, 9, 8, 7... 0]
    for (let i = 1; i < totalItems; i++) {
      current = (current + 1) % 10;
      generatedStrip.unshift(current);
    }
    
    setStrip(generatedStrip);
  }, [digit, index]);

  useEffect(() => {
    if (isVisible) {
      // Double requestAnimationFrame ensures the DOM has painted the initial strip
      // before we apply the CSS transition, preventing jumps.
      let f1, f2;
      f1 = requestAnimationFrame(() => {
        f2 = requestAnimationFrame(() => {
          setStartAnimation(true);
        });
      });
      return () => {
        cancelAnimationFrame(f1);
        cancelAnimationFrame(f2);
      };
    }
  }, [isVisible]);

  // Duration ~3 seconds, slightly extended for each successive digit
  const baseDuration = 500;
  const duration = baseDuration + (index * 1000);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Transform moves the strip upwards natively using GPU acceleration.
  // Using calc(-100% + 100% / length) ensures we translate up by exactly (length - 1) items,
  // landing perfectly on the final digit without hardcoding the em height in JS.
  const transform = startAnimation && !prefersReducedMotion
    ? `translateY(calc(-100% + 100% / ${strip.length}))`
    : 'translateY(0%)';

  return (
    <span className="digit-viewport">
      <span
        className="digit-strip"
        style={{
          transform,
          transition: startAnimation && !prefersReducedMotion
            ? `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`
            : 'none'
        }}
        aria-hidden="true"
      >
        {strip.map((num, i) => (
          <span key={i} className="digit-item">{num}</span>
        ))}
      </span>
    </span>
  );
};

export default Odometer;
