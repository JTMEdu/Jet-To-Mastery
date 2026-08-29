import React from 'react';
import { useAuth } from './AuthContext';
import { Code, BookOpen, Users, LogOut, CheckCircle, BarChart2, Shield, Play } from 'lucide-react';
import './Dashboard.css';
import siteLogo from '../assets/logo.png';

const Dashboard = () => {
  const { user, logout } = useAuth();

  // Helper to format role names
  const capitalizeRole = (role) => {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  // 1. REGULAR USER DASHBOARD CONTENT
  const renderUserDashboard = () => (
    <div className="dashboard-content-grid">
      <div className="dashboard-card card welcome-banner">
        <h2 className="banner-title">Welcome to JTM, {user.email}!</h2>
        <p className="banner-desc">
          Ready to kickstart your SDE tech career? Access courses, algorthmic coding practice, and resume assessments.
        </p>
        <a href="#/courses" className="btn btn-white btn-sm flex items-center gap-1">
          Explore Courses <Play size={14} fill="currentColor" />
        </a>
      </div>

      <div className="dashboard-card card">
        <div className="card-header flex items-center gap-2">
          <div className="card-icon-bg bg-blue"><Code size={20} /></div>
          <h3 className="h3 card-title">Coding Practice</h3>
        </div>
        <p className="card-body-text text-muted">
          Master data structures, algorithms, and system design challenges on our SDE-standard IDE.
        </p>
        <a href="#" className="dashboard-action-link">Solve Problems &rarr;</a>
      </div>

      <div className="dashboard-card card">
        <div className="card-header flex items-center gap-2">
          <div className="card-icon-bg bg-green"><CheckCircle size={20} /></div>
          <h3 className="h3 card-title">Placement Prep</h3>
        </div>
        <p className="card-body-text text-muted">
          Get direct opportunities with our 500+ hiring partner companies. Upload resume to start.
        </p>
        <a href="#" className="dashboard-action-link">Verify Profile &rarr;</a>
      </div>
    </div>
  );

  // 2. STUDENT PORTAL DASHBOARD CONTENT
  const renderStudentDashboard = () => (
    <div className="dashboard-content-grid">
      <div className="dashboard-card card welcome-banner student-theme">
        <h2 className="banner-title">Student Portal — Welcome, SDE Learner!</h2>
        <p className="banner-desc">
          Email: {user.email} | Status: Active Placement Student
        </p>
        <div className="progress-bar-container">
          <div className="progress-label flex justify-between text-white text-sm">
            <span>Overall Placement Readiness</span>
            <span>75% Complete</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      <div className="dashboard-card card">
        <div className="card-header flex items-center gap-2">
          <div className="card-icon-bg bg-purple"><BookOpen size={20} /></div>
          <h3 className="h3 card-title">My Courses</h3>
        </div>
        <ul className="dashboard-list">
          <li className="flex justify-between items-center">
            <span>Core Java & DSA</span>
            <span className="badge badge-prog">In Progress</span>
          </li>
          <li className="flex justify-between items-center">
            <span>System Design (LMS-104)</span>
            <span className="badge badge-prog">In Progress</span>
          </li>
          <li className="flex justify-between items-center">
            <span>SQL Database Internals</span>
            <span className="badge badge-comp">Completed</span>
          </li>
        </ul>
      </div>

      <div className="dashboard-card card">
        <div className="card-header flex items-center gap-2">
          <div className="card-icon-bg bg-blue"><Code size={20} /></div>
          <h3 className="h3 card-title">Algorithmic Practice</h3>
        </div>
        <div className="practice-stats flex justify-between">
          <div className="stat-num-box">
            <span className="num text-blue">142</span>
            <span className="lbl text-muted">Solved</span>
          </div>
          <div className="stat-num-box">
            <span className="num text-orange">25</span>
            <span className="lbl text-muted">Remaining</span>
          </div>
          <div className="stat-num-box">
            <span className="num text-green">95%</span>
            <span className="lbl text-muted">Accuracy</span>
          </div>
        </div>
        <a href="#" className="btn btn-primary btn-sm w-full text-center" style={{ marginTop: '16px' }}>
          Resume Coding IDE
        </a>
      </div>
    </div>
  );

  // 3. TRAINER PORTAL DASHBOARD CONTENT
  const renderTrainerDashboard = () => (
    <div className="dashboard-content-grid">
      <div className="dashboard-card card welcome-banner trainer-theme">
        <h2 className="banner-title">Trainer Control Dashboard</h2>
        <p className="banner-desc">
          Logged in as: {user.email}
        </p>
        <div className="flex gap-4 metrics-banner-row">
          <div>
            <strong>Active Batches:</strong> 3 Batches
          </div>
          <div>
            <strong>Assigned Students:</strong> 150+ SDEs
          </div>
        </div>
      </div>

      <div className="dashboard-card card">
        <div className="card-header flex items-center gap-2">
          <div className="card-icon-bg bg-green"><Users size={20} /></div>
          <h3 className="h3 card-title">My Batches & Classes</h3>
        </div>
        <ul className="dashboard-list">
          <li className="flex justify-between items-center">
            <span>Java Full Stack - Batch A</span>
            <span className="time-lbl">Today, 2:00 PM</span>
          </li>
          <li className="flex justify-between items-center">
            <span>System Design Intermediate</span>
            <span className="time-lbl">Tomorrow, 10:00 AM</span>
          </li>
          <li className="flex justify-between items-center">
            <span>MERN Stack Batch B</span>
            <span className="time-lbl">Wednesday, 4:00 PM</span>
          </li>
        </ul>
      </div>

      <div className="dashboard-card card">
        <div className="card-header flex items-center gap-2">
          <div className="card-icon-bg bg-gold"><BarChart2 size={20} /></div>
          <h3 className="h3 card-title">Batch Analytics</h3>
        </div>
        <p className="card-body-text text-muted">
          Track course compliance, assessment averages, and placement screening readiness across assigned batches.
        </p>
        <button className="btn btn-secondary btn-sm w-full">View Batch Performance</button>
      </div>
    </div>
  );

  // 4. ADMIN CONTROL PORTAL CONTENT
  const renderAdminDashboard = () => (
    <div className="dashboard-content-grid">
      <div className="dashboard-card card welcome-banner admin-theme">
        <h2 className="banner-title">JTM Secure Admin Portal</h2>
        <p className="banner-desc">
          Administrator Session: {user.email}
        </p>
        <span className="admin-badge flex items-center gap-1">
          <Shield size={14} /> System Secure Node Active
        </span>
      </div>

      <div className="dashboard-card card">
        <div className="card-header flex items-center gap-2">
          <div className="card-icon-bg bg-blue"><BarChart2 size={20} /></div>
          <h3 className="h3 card-title">Administrative Stats</h3>
        </div>
        <ul className="dashboard-list admin-stats-list">
          <li className="flex justify-between">
            <span className="text-muted">Total Active Placements</span>
            <strong>4,821 Students</strong>
          </li>
          <li className="flex justify-between">
            <span className="text-muted">Registered Campuses</span>
            <strong>514 Colleges</strong>
          </li>
          <li className="flex justify-between">
            <span className="text-muted">Active SDE Trainers</span>
            <strong>78 Faculty</strong>
          </li>
        </ul>
      </div>

      <div className="dashboard-card card">
        <div className="card-header flex items-center gap-2">
          <div className="card-icon-bg bg-red"><Shield size={20} /></div>
          <h3 className="h3 card-title">Portal Control Controls</h3>
        </div>
        <div className="flex flex-col gap-2" style={{ marginTop: '12px' }}>
          <button className="btn btn-secondary btn-sm text-left">Manage Registered Colleges</button>
          <button className="btn btn-secondary btn-sm text-left">System Audit & Access Logs</button>
        </div>
      </div>
    </div>
  );

  // Selector for role dashboards
  const renderRoleDashboard = () => {
    switch (user?.role) {
      case 'student':
        return renderStudentDashboard();
      case 'trainer':
        return renderTrainerDashboard();
      case 'admin':
        return renderAdminDashboard();
      default:
        return renderUserDashboard();
    }
  };

  return (
    <div className="dashboard-page-wrapper">
      {/* Top Banner Navigation */}
      <header className="dashboard-header card">
        <div className="container header-inner flex justify-between items-center">
          <div className="header-brand flex items-center gap-2">
            <img src={siteLogo} alt="Jet to Mastery Logo" className="dash-logo" />
            <h1 className="h3 logo-text">Jet to Mastery</h1>
          </div>

          <div className="header-user-info flex items-center gap-4">
            <div className="user-badge-display flex flex-col text-right">
              <span className="email-lbl text-muted">{user?.email}</span>
              <span className="role-lbl">{capitalizeRole(user?.role)} Portal</span>
            </div>

            <button 
              onClick={logout} 
              className="logout-btn flex items-center gap-1"
              aria-label="Sign out session"
            >
              <LogOut size={18} />
              <span className="logout-txt">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main dashboard body */}
      <main className="dashboard-main-content">
        <div className="container">
          {renderRoleDashboard()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
