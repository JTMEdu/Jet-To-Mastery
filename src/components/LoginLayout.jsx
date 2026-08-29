import React from 'react';
import AuthBrandPanel from './AuthBrandPanel';
import './LoginLayout.css';

const LoginLayout = ({ children }) => {
  return (
    <div className="login-layout-page">
      <div className="login-layout-container">
        {/* Left Column: Form Card */}
        <div className="login-form-side">
          <div className="form-inner-wrapper">
            {children}
          </div>
        </div>

        {/* Right Column: Visual Dashboard summary panel */}
        <div className="login-visual-side">
          <AuthBrandPanel />
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
