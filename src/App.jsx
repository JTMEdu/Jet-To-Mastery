import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Homepage Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureShortcuts from './components/FeatureShortcuts';
import WhyJTM from './components/WhyJTM';
import ProgramsShowcase from './components/ProgramsShowcase';
import CodingPlatform from './components/CodingPlatform';
import AboutUs from './components/AboutUs';
import Mentors from './components/Mentors';
import PartnerCompanies from './components/PartnerCompanies';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

// Auth & Dashboard Components
import LoginLayout from './components/LoginLayout';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

// Unified Homepage layout component
const Home = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureShortcuts />
        <WhyJTM />
        <ProgramsShowcase />
        <CodingPlatform />
        <AboutUs />
        <Mentors />
        <PartnerCompanies />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Authentication Routes */}
          <Route 
            path="/login" 
            element={
              <LoginLayout>
                <LoginForm
                  role="user"
                  heading="Sign In"
                  subtitle="Access your JTM student and coding accounts."
                  emailLabel="Email Address"
                  emailPlaceholder="you@example.com"
                  footerText="Don't have an account?"
                  footerActionText="Create account"
                  footerActionLink="#"
                  destination="/dashboard"
                />
              </LoginLayout>
            } 
          />
          
          <Route 
            path="/student/login" 
            element={
              <LoginLayout>
                <LoginForm
                  role="student"
                  heading="Student Login"
                  subtitle="Access your courses, coding practice, assessments and placement preparation."
                  emailLabel="Student Email / College Email"
                  emailPlaceholder="student@college.edu"
                  footerText="New student?"
                  footerActionText="Create account"
                  footerActionLink="#"
                  destination="/student/dashboard"
                />
              </LoginLayout>
            } 
          />

          <Route 
            path="/trainer/login" 
            element={
              <LoginLayout>
                <LoginForm
                  role="trainer"
                  heading="Trainer Login"
                  subtitle="Manage your classes, students, assessments and training content."
                  emailLabel="Trainer Email"
                  emailPlaceholder="trainer@jtm.edu"
                  footerText="Don't have a trainer account?"
                  footerActionText="Contact Admin"
                  footerActionLink=""
                  destination="/trainer/dashboard"
                />
              </LoginLayout>
            } 
          />

          <Route 
            path="/admin/login" 
            element={
              <LoginLayout>
                <LoginForm
                  role="admin"
                  heading="Admin Login"
                  subtitle="Secure access to the JTM administration portal portal."
                  emailLabel="Admin Email"
                  emailPlaceholder="admin@jtm.edu"
                  footerText="Protected Access Only."
                  footerActionText="Contact Security Node"
                  footerActionLink=""
                  destination="/admin/dashboard"
                />
              </LoginLayout>
            } 
          />

          {/* Secure Protected Dashboard Portals */}
          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['trainer']} />}>
            <Route path="/trainer/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
