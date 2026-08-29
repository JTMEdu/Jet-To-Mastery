import React from 'react';
import { Layers, Rocket, Code2, ShieldCheck, Users, TrendingUp } from 'lucide-react';
import './WhyJTM.css';

const WhyJTM = () => {
  const reasons = [
    {
      title: 'Structured Programs',
      description: 'Industry-vetted curriculum designed to take you from beginner to advanced with clear milestones.',
      icon: <Layers />
    },
    {
      title: 'Real World Projects',
      description: 'Build portfolio-ready applications that solve actual business problems.',
      icon: <Rocket />
    },
    {
      title: 'Coding Practice',
      description: 'Thousands of algorithmic and system design challenges to master problem-solving.',
      icon: <Code2 />
    },
    {
      title: 'Mock Assessments',
      description: 'Simulated interview environments to build confidence and identify weak areas.',
      icon: <ShieldCheck />
    },
    {
      title: 'Expert Mentors',
      description: '1-on-1 guidance from engineers at top tech companies.',
      icon: <Users />
    },
    {
      title: 'Placement Preparation',
      description: 'Resume reviews, mock interviews, and direct referrals to hiring partners.',
      icon: <TrendingUp />
    }
  ];

  return (
    <section className="section why-section section-gray">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="h2 section-title">Everything You Need To Become Industry Ready</h2>
          <p className="section-subtitle text-muted">
            We provide a complete ecosystem to ensure you don't just learn, but actually get hired.
          </p>
        </div>

        <div className="why-grid">
          {reasons.map((reason, index) => (
            <div className="why-card card" key={index}>
              <div className="why-icon-wrapper">
                {reason.icon}
              </div>
              <h3 className="h3 why-card-title">{reason.title}</h3>
              <p className="why-card-text text-muted">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJTM;
