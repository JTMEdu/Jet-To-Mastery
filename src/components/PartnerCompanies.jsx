import React from 'react';
import { Cloud, Cpu, Shield, TrendingUp, Activity, BookOpen, ExternalLink } from 'lucide-react';
import './PartnerCompanies.css';

// SVG Logos for companies using stylized Lucide wrappers
const CompanyLogo = ({ icon: Icon, color }) => {
  return (
    <div className="company-logo-wrapper" style={{ '--logo-color': color }}>
      <div className="logo-icon-bg">
        <Icon size={24} className="logo-icon" />
      </div>
    </div>
  );
};

const PartnerCompanies = () => {
  const companies = [
    {
      name: 'CloudSync',
      industry: 'Technology',
      tags: 'Hiring • Placement • Cloud SDE',
      desc: 'Next-gen cloud architecture and virtualization solutions provider hiring SDE-1 developers.',
      icon: Cloud,
      color: '#3B82F6',
      placementInfo: '28 Placement Offers'
    },
    {
      name: 'NovaTech AI',
      industry: 'Artificial Intelligence',
      tags: 'Hiring • Internship • ML Engineer',
      desc: 'Building intelligent workflows and LLM applications for enterprise software clients.',
      icon: Cpu,
      color: '#10B981',
      placementInfo: '15 Placement Offers'
    },
    {
      name: 'CyberGuard',
      industry: 'Cybersecurity',
      tags: 'Hiring • Placement • SecOps',
      desc: 'Leading cybersecurity consultancy providing automated threat detection and systems hardening.',
      icon: Shield,
      color: '#EF4444',
      placementInfo: '12 Placement Offers'
    },
    {
      name: 'ApexFinance',
      industry: 'FinTech',
      tags: 'Placement • Quantitative Analyst',
      desc: 'High-frequency transaction processors and algorithmic quantitative trading architectures.',
      icon: TrendingUp,
      color: '#F59E0B',
      placementInfo: '20 Placement Offers'
    },
    {
      name: 'DataPulse',
      industry: 'Analytics',
      tags: 'Hiring • Internship • Big Data',
      desc: 'Real-time data synchronization pipelines, ETL automation, and analytics dashboards.',
      icon: Activity,
      color: '#8B5CF6',
      placementInfo: '32 Placement Offers'
    },
    {
      name: 'EduCore Solutions',
      industry: 'EdTech',
      tags: 'Hiring • Placement • Frontend',
      desc: 'Global SaaS educational LMS platforms and classroom integration frameworks.',
      icon: BookOpen,
      color: '#EC4899',
      placementInfo: '18 Placement Offers'
    }
  ];

  return (
    <section id="partners" className="section partners-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">Hiring Ecosystem</span>
          <h2 className="h2 section-title">Our Partner Companies</h2>
          <p className="section-subtitle text-muted">
            Connecting students with opportunities from companies looking for skilled talent.
          </p>
        </div>

        {/* Marquee Outer Container */}
        <div className="marquee-container">
          <div className="marquee-track">
            {/* Render the lists twice to make a seamless infinite marquee */}
            <div className="marquee-content">
              {companies.map((company, index) => (
                <div className="company-card card" key={`c1-${index}`}>
                  <div className="company-card-header">
                    <CompanyLogo icon={company.icon} color={company.color} />
                    <div className="company-meta">
                      <h3 className="company-name">{company.name}</h3>
                      <span className="company-industry text-muted">{company.industry}</span>
                    </div>
                  </div>
                  
                  <div className="company-body">
                    <p className="company-desc text-muted">{company.desc}</p>
                    <div className="company-tags">{company.tags}</div>
                  </div>
                  
                  <div className="company-footer">
                    <span className="placement-stat">{company.placementInfo}</span>
                    <a href="#" className="hiring-link" aria-label={`View careers at ${company.name}`}>
                      Careers <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="marquee-content" aria-hidden="true">
              {companies.map((company, index) => (
                <div className="company-card card" key={`c2-${index}`}>
                  <div className="company-card-header">
                    <CompanyLogo icon={company.icon} color={company.color} />
                    <div className="company-meta">
                      <h3 className="company-name">{company.name}</h3>
                      <span className="company-industry text-muted">{company.industry}</span>
                    </div>
                  </div>
                  
                  <div className="company-body">
                    <p className="company-desc text-muted">{company.desc}</p>
                    <div className="company-tags">{company.tags}</div>
                  </div>
                  
                  <div className="company-footer">
                    <span className="placement-stat">{company.placementInfo}</span>
                    <a href="#" className="hiring-link" aria-label={`View careers at ${company.name}`}>
                      Careers <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCompanies;
