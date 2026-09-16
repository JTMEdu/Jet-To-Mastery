import React, { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';
import './HeroSection.css';
import jtmLogo from '../assets/logo.png';
import studentPhoto from '../assets/logo2.png';

const allComments = [
  { id: 0, name: 'Rahul', text: 'Your platform really helped me with DSA!', likes: 24, avatar: '/student-1.png', color: '#3B82F6' },
  { id: 1, name: 'Divya', text: 'Finally found a simple way to prepare for placements.', likes: 18, avatar: '/student-2.png', color: '#10B981' },
  { id: 2, name: 'Sanjay', text: 'The coding practice is really useful 🔥', likes: 32, avatar: '/student-3.png', color: '#EC4899' },
  { id: 3, name: 'Priya', text: 'Very helpful for college students!', likes: 15, avatar: '/student-4.png', color: '#8B5CF6' },
  { id: 4, name: 'Amit', text: 'JTM helped me turn my coding practice into real interview confidence.', likes: 41, avatar: '/student-5.png', color: '#EF4444' },
  { id: 5, name: 'Komal', text: 'The structured programs made learning difficult concepts much easier.', likes: 29, avatar: '/student-6.png', color: '#F59E0B' },
  { id: 6, name: 'Rohan', text: 'I stopped just preparing for placements and started preparing with confidence.', likes: 37, avatar: '/student-7.png', color: '#06B6D4' }
];

// Carousel Slides data: 5 slides with quoted headings and detailed descriptions
const heroSlides = [
  {
    headline: [
      { text: '"Unlock Your Career Potential"', highlight: false },
      { text: ' with JTM Experts.', highlight: true }
    ],
    description: 'With mentorship from top industry professionals, JTM empowers you with career-enhancing skills and personalized guidance to achieve your goals.'
  },
  {
    headline: [
      { text: '"Master Coding"', highlight: false },
      { text: ' with Structured Learning Pathways.', highlight: true }
    ],
    description: 'Our structured curriculum, combined with project-based learning, ensures you build a strong foundation and advance your technical expertise with confidence.'
  },
  {
    headline: [
      { text: '"Crack Your Dream Job"', highlight: false },
      { text: " with JTM's Proven Approach.", highlight: true }
    ],
    description: "JTM provides expert-designed roadmaps, mock interviews, and placement assistance to help you land your dream job in top companies."
  },
  {
    headline: [
      { text: 'Learn ', highlight: true },
      { text: '"Right Skill At The Right Time"', highlight: false },
      { text: ' with JTM.', highlight: true }
    ],
    description: 'At JTM, we provide industry-relevant training that equips you with the right skills at the right time, helping you stay ahead in the competitive job market.'
  },
  {
    headline: [
      { text: '"Upskill"', highlight: false },
      { text: ' with Practical Hands-On Learning.', highlight: true }
    ],
    description: 'Our hands-on approach ensures you gain real-world experience, preparing you to tackle technical challenges and excel in your career journey.'
  }
];

// Flatten segments into a single string for typing
const getFullText = (segments) => segments.map(s => s.text).join('');

// Given a character index, find which segment and apply highlight
const renderTypedText = (segments, charCount) => {
  let remaining = charCount;
  return segments.map((segment, i) => {
    if (remaining <= 0) return null;
    const visibleChars = segment.text.slice(0, remaining);
    remaining -= segment.text.length;

    // Split by newlines to insert <br /> tags if present
    const parts = visibleChars.split('\n');
    return (
      <span key={i} className={segment.highlight ? 'text-highlight' : ''}>
        {parts.map((part, j) => (
          <React.Fragment key={j}>
            {j > 0 && <br />}
            {part}
          </React.Fragment>
        ))}
      </span>
    );
  });
};

// Generate fixed positions around the center
const fixedPositions = [
  { top: '10%', left: '-15%' },
  { top: '20%', right: '-25%' },
  { bottom: '5%', left: '-15%' },
  { bottom: '-5%', right: '-15%' }
];

const generateOffsets = () => fixedPositions;

const getSequentialComments = (startIndex) => {
  const selected = [];
  for (let i = 0; i < 4; i++) {
    selected.push(allComments[(startIndex + i) % allComments.length]);
  }
  return selected;
};

const HeroSection = () => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [startIndex, setStartIndex] = useState(0);
  const [displayedComments, setDisplayedComments] = useState(() => getSequentialComments(0));
  const [offsets, setOffsets] = useState(() => generateOffsets());
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Typewriter effect for 5 hero slides
  useEffect(() => {
    const currentSegments = heroSlides[headlineIndex].headline;
    const fullText = getFullText(currentSegments);
    const totalChars = fullText.length;

    let timeout;

    if (!isDeleting && charCount < totalChars) {
      // Typing forward
      timeout = setTimeout(() => {
        setCharCount(prev => prev + 1);
      }, 45);
    } else if (!isDeleting && charCount >= totalChars) {
      // Pause after fully typed
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 3500);
    } else if (isDeleting && charCount > 0) {
      // Erasing
      timeout = setTimeout(() => {
        setCharCount(prev => prev - 1);
      }, 25);
    } else if (isDeleting && charCount === 0) {
      // Move to next slide
      setIsDeleting(false);
      setHeadlineIndex(prev => (prev + 1) % heroSlides.length);
    }

    return () => clearTimeout(timeout);
  }, [charCount, isDeleting, headlineIndex]);

  useEffect(() => {
    // Testimonial rotation timer
    const commentTimer = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setStartIndex(prev => {
          const nextIndex = (prev + 4) % allComments.length;
          setDisplayedComments(getSequentialComments(nextIndex));
          return nextIndex;
        });
        setOffsets(generateOffsets());
        setIsTransitioning(false);
      }, 600);
    }, 5000);

    return () => clearInterval(commentTimer);
  }, []);

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.nextSibling;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <section className="premium-hero">
      <div className="premium-hero-background">
        <div className="premium-grid-overlay"></div>
        <div className="premium-glow-left"></div>
        <div className="premium-glow-right"></div>

        {/* Decorative Coding Symbols */}
        <span className="code-symbol symbol-1">{'{ }'}</span>
        <span className="code-symbol symbol-3">{'( )'}</span>
        <span className="code-symbol symbol-4">{'=>'}</span>
        <span className="code-symbol symbol-6">{'[ ]'}</span>
        <span className="code-symbol symbol-7">{'&&'}</span>
        <span className="code-symbol symbol-8">{'<>'}</span>
        <span className="code-symbol symbol-9">{'/*'}</span>
        <span className="code-symbol symbol-10">{'#!'}</span>
        <span className="code-symbol symbol-11">{'...'}</span>
        <span className="code-symbol symbol-12">{'</>'}</span>
      </div>

      <div className="premium-hero-container">

        {/* LEFT CONTENT */}
        <div className="premium-hero-content">
          <div className="premium-micro-label animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {/* THE CAREER-FIRST LEARNING PLATFORM */}
          </div>

          <div className="premium-headline-wrapper">
            <h1 className="premium-headline">
              {renderTypedText(heroSlides[headlineIndex].headline, charCount)}
              <span className="typewriter-cursor">|</span>
            </h1>
          </div>

          <div className="premium-description animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <p className="desc-body">
              {heroSlides[headlineIndex].description}
            </p>
          </div>

          <div className="premium-cta-group animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <a href="#" className="premium-btn btn-primary">Start Learning &rarr;</a>
            <a href="#" className="premium-btn btn-secondary">Explore Programs</a>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="premium-hero-visual animate-scale-in" style={{ animationDelay: '0.6s' }}>
          <div className="premium-image-wrapper">

            {/* The Atom System (Rings + Nucleus) */}
            <div className="atom-system">
              <div className="atom-rings">
                <div className="atom-ring ring-1">
                  <div className="atom-node node-1">
                    <Rocket className="rocket-icon" />
                  </div>
                </div>
                <div className="atom-ring ring-2">
                  <div className="atom-node node-2">
                    <Rocket className="rocket-icon" />
                  </div>
                </div>
                <div className="atom-ring ring-3">
                  <div className="atom-node node-3">
                    <Rocket className="rocket-icon" />
                  </div>
                </div>
              </div>

              {/* Nucleus Logo with Spinning Ring & Travelling Dot */}
              <div className="atom-nucleus-wrapper">
                <div className="nucleus-ring">
                  <div className="nucleus-node">
                    <Rocket className="rocket-icon" />
                  </div>
                </div>
                <img src={studentPhoto} alt="JTM Nucleus" className="premium-student-image atom-nucleus" />
              </div>
            </div>

            {/* SOCIAL PROOF COMMENTS */}
            {displayedComments.map((comment, idx) => {
              const currentOffset = offsets[idx] || { top: 50, left: 50 };

              return (
                <div
                  key={idx}
                  className="poster-comment"
                  style={{
                    top: currentOffset.top || 'auto',
                    bottom: currentOffset.bottom || 'auto',
                    left: currentOffset.left || 'auto',
                    right: currentOffset.right || 'auto',
                    animationDelay: `${idx * 0.15}s`
                  }}
                >
                  <div className={`poster-comment-content ${isTransitioning ? 'quote-fade-out' : 'quote-fade-in'}`}>
                    <div className="poster-comment-profile">
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
                    <div className="poster-comment-text">
                      <span className="comment-user-name">{comment.name}</span>
                      <p className="comment-body-text">"{comment.text}"</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TRUST INDICATORS */}
      <div className="premium-trust-row animate-fade-up" style={{ animationDelay: '0.7s' }}>
        <span>100K+ Learners</span>
        <span className="trust-dot">&bull;</span>
        <span>4000+ Problems</span>
        <span className="trust-dot">&bull;</span>
        <span>500+ Colleges</span>
      </div>
    </section>
  );
};

export default HeroSection;
