import React from 'react';
import { BookOpen, Code, FileText, MonitorPlay, FolderOpen, Award, Map, Trophy, GraduationCap, Video } from 'lucide-react';
import './FeatureShortcuts.css';

const FeatureShortcuts = () => {
  const features = [
    { name: 'Programs', icon: <BookOpen /> },
    { name: 'Courses', icon: <FolderOpen /> },
    { name: 'Coding', icon: <Code /> },
    { name: 'Assessments', icon: <FileText /> },
    { name: 'Master Classes', icon: <MonitorPlay /> },
    { name: 'Resources', icon: <Video /> },
    { name: 'Contests', icon: <Trophy /> },
    { name: 'Colleges', icon: <GraduationCap /> },
    { name: 'Certificates', icon: <Award /> },
    { name: 'Career Roadmaps', icon: <Map /> }
  ];

  return (
    <section className="section shortcuts-section">
      <div className="container">
        <div className="shortcuts-card glass-card">
          <div className="shortcuts-grid">
            {features.map((feature, index) => (
              <a href="#" key={index} className="shortcut-item">
                <div className="shortcut-icon-wrapper">
                  {feature.icon}
                </div>
                <span className="shortcut-name">{feature.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShortcuts;
