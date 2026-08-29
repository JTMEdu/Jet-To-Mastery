import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import Odometer from './Odometer';
import heroCenterImage from '../assets/logo.png';

// Pool of 12 realistic social-proof comments
const allComments = [
  { id: 0, name: 'Rahul', text: 'Your platform really helped me with DSA!', likes: 24, avatar: '/student-1.png', color: '#3B82F6' },
  { id: 1, name: 'Divya', text: 'Finally found a simple way to prepare for placements.', likes: 18, avatar: '/student-2.png', color: '#10B981' },
  { id: 2, name: 'Sanjay', text: 'The coding practice is really useful 🔥', likes: 32, avatar: '/student-3.png', color: '#EC4899' },
  { id: 3, name: 'Priya', text: 'Very helpful for college students!', likes: 15, avatar: '/student-4.png', color: '#8B5CF6' },
  { id: 4, name: 'Amit', text: 'Clear concepts, awesome mentorship! 🚀', likes: 41, avatar: '/student-5.png', color: '#EF4444' },
  { id: 5, name: 'Komal', text: 'Aptitude section saved my screening rounds.', likes: 29, avatar: '/student-6.png', color: '#F59E0B' },
  { id: 6, name: 'Rohan', text: 'Direct referrals to partner companies work!', likes: 37, avatar: '/student-7.png', color: '#06B6D4' },
  { id: 7, name: 'Ananya', text: 'Best system design lectures out there.', likes: 22, avatar: '/student-8.png', color: '#10B981' },
  { id: 8, name: 'Vikram', text: 'Mastered Java Full Stack in 6 months.', likes: 45, avatar: '/student-9.png', color: '#3B82F6' },
  { id: 9, name: 'Shreya', text: 'Got offers from 2 product companies!', likes: 50, avatar: '/student-10.png', color: '#EC4899' },
  { id: 10, name: 'Aditya', text: 'Mock interviews are super realistic.', likes: 27, avatar: '/student-11.png', color: '#F97316' },
  { id: 11, name: 'Sneha', text: 'Interactive IDE makes practice so fun 💻', likes: 33, avatar: '/student-12.png', color: '#8B5CF6' }
];

// Helper to get random numbers within a range
const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper to generate a new set of random offsets to vary positions in each set
const generateOffsets = () => {
  return [
    { x: getRandomInRange(-15, 15), y: getRandomInRange(-10, 10) }, // Top
    { x: getRandomInRange(-25, 10), y: getRandomInRange(-20, 15) }, // TL
    { x: getRandomInRange(-10, 25), y: getRandomInRange(-20, 15) }, // TR
    { x: getRandomInRange(-25, 10), y: getRandomInRange(-15, 25) }, // BL
    { x: getRandomInRange(-10, 25), y: getRandomInRange(-15, 25) }  // BR
  ];
};

// Swap function that ensures no immediate repeat of names in consecutive sets
const getNextSetOfComments = (currentSet) => {
  const currentNames = currentSet.map(c => c.name);
  const available = allComments.filter(c => !currentNames.includes(c.name));
  
  const selected = [];
  const pool = [...available];
  
  while (selected.length < 5 && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(idx, 1)[0]);
  }
  
  return selected;
};

// Define static exit directions (moving outwards from center)
const exitDirections = [
  { x: 0, y: -25 },   // Top (up)
  { x: -20, y: -15 }, // TL (up-left)
  { x: 20, y: -15 },  // TR (up-right)
  { x: -20, y: 15 },  // BL (down-left)
  { x: 20, y: 15 }    // BR (down-right)
];

// Position configurations matching quadrants/positions around central logo
const quadrants = ['pos-top', 'pos-tl', 'pos-tr', 'pos-bl', 'pos-br'];

const Typewriter = ({ words, loop = true, typingSpeed = 150, deletingSpeed = 100, delay = 1500 }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
      } else {
        setText(fullText.substring(0, text.length + 1));
      }

      if (!isDeleting && text === fullText) {
        if (!loop && loopNum === words.length - 1) return;
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, delay, loop]);

  return (
    <span className="typewriter-text">
      {text}
      <span className="cursor" style={{ borderRight: '2px solid currentColor', animation: 'blink 1s step-end infinite', paddingRight: '2px' }}>&nbsp;</span>
    </span>
  );
};

const HeroSection = () => {
  const [displayedComments, setDisplayedComments] = useState(() => allComments.slice(0, 5));
  const [offsets, setOffsets] = useState(() => generateOffsets());
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    const timer = setInterval(() => {
      // Step 1: Start exit transition (fade out and drift outwards)
      setFadeClass('fade-out');
      
      // Step 2: Swap content and trigger entrance after exit duration (e.g. 450ms)
      setTimeout(() => {
        setDisplayedComments(prev => getNextSetOfComments(prev));
        setOffsets(generateOffsets());
        setFadeClass('fade-in');
      }, 450);
    }, 6000); // 5s visible + 1s transition (450ms fade-out + 450ms fade-in)
    
    return () => clearInterval(timer);
  }, []);

  // Handle fallback if profile photo fails to load
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.nextSibling;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <section className="hero">
      {/* <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div> */}

      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="h1 hero-title">
            Learn Smart. Build Fast<br />
            <span className="text-gradient">
              <Typewriter words={['Code Better.', 'Think Bigger.', 'Scale Faster.']} />
            </span> <br />
            Get Hired.
          </h1>
          <p className="hero-subtitle text-muted">
            Jet to Mastery is an all-in-one technology learning ecosystem. From structured courses to an interactive coding platform, master classes, and placement preparation.
          </p>

          <div className="hero-actions">
            <a href="#" className="btn btn-primary">Start Learning</a>
            <a href="#" className="btn btn-secondary">Explore Programs</a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <h3 className="stat-number"><Odometer value="100k+" /></h3>
              <p className="stat-label">Learners</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number"><Odometer value="4000+" /></h3>
              <p className="stat-label">Coding Problems</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number"><Odometer value="500+" /></h3>
              <p className="stat-label">Partner Colleges</p>
            </div>
          </div>
        </div>

        {/* Visual area with ONE central logo and dynamic comments */}
        <div className="hero-visual">
          <div className="visual-wrapper">
            
            {/* CENTRAL LOGO Badge */}
            <div className="central-logo-badge">
              <div className="logo-glow"></div>
              <div className="atom-ring ring-1">
                <div className="orbit-node node-red"></div>
              </div>
              <div className="atom-ring ring-2">
                <div className="orbit-node node-blue"></div>
              </div>
              <div className="atom-ring ring-3">
                <div className="orbit-node node-green"></div>
              </div>
              <div className="logo-circle">
                <img 
                  src={heroCenterImage} 
                  alt="JTM platform" 
                  className="central-hero-image"
                />
              </div>
            </div>

            {/* FLOATING COMMENTS */}
            {displayedComments.map((comment, idx) => {
              const currentOffset = offsets[idx] || { x: 0, y: 0 };
              const exitDir = exitDirections[idx] || { x: 0, y: 0 };

              // Transition transform styling: slide outward on fade-out, return on fade-in
              const transformStyle = fadeClass === 'fade-out'
                ? `translate(${currentOffset.x + exitDir.x}px, ${currentOffset.y + exitDir.y}px)`
                : `translate(${currentOffset.x}px, ${currentOffset.y}px)`;

              return (
                <div 
                  key={comment.id}
                  className={`comment-wrapper ${quadrants[idx]} ${fadeClass}`}
                  style={{
                    transform: transformStyle,
                    opacity: fadeClass === 'fade-out' ? 0 : 1
                  }}
                >
                  {/* Bobbing card container */}
                  <div 
                    className="comment-bubble-card"
                    style={{
                      animationDelay: `${idx * 0.4}s`,
                      animationDuration: `${3.5 + idx * 0.6}s`
                    }}
                  >
                    <div className="comment-profile">
                      {/* Tries to load actual student photos, fallback to SVG initials */}
                      <img 
                        src={comment.avatar} 
                        alt={comment.name}
                        onError={handleImageError} 
                        className="comment-avatar-img"
                      />
                      <div 
                        className="comment-avatar-fallback"
                        style={{ backgroundColor: comment.color }}
                      >
                        {comment.name[0]}
                      </div>
                    </div>
                    
                    <div className="comment-text-content">
                      <h4 className="comment-user-name">{comment.name}</h4>
                      <p className="comment-body-text">"{comment.text}"</p>
                      <div className="comment-reaction">
                        <span className="reaction-thumbs">👍</span>
                        <span className="reaction-count text-muted">{comment.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
