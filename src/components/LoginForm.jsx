import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import PasswordInput from './PasswordInput';
import siteLogo from '../assets/logo.png';

const LoginForm = ({ 
  role, 
  heading, 
  subtitle, 
  emailLabel = 'Email Address', 
  emailPlaceholder = 'you@example.com',
  footerText = "Don't have an account?",
  footerActionText = 'Create account',
  footerActionLink = '/login',
  destination = '/dashboard' 
}) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email format regex
  const validateEmail = (val) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  // Frontend validations
  const validateForm = () => {
    const tempErrors = {};
    if (!email.trim()) {
      tempErrors.email = 'Please enter your email.';
    } else if (!validateEmail(email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      tempErrors.password = 'Please enter your password.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate SDE authentication latency
    setTimeout(() => {
      login(email, role);
      setIsSubmitting(false);
      navigate(destination, { replace: true });
    }, 1500);
  };

  const getOtherPortals = () => {
    const links = [];
    if (role !== 'user') links.push(<Link key="user" to="/login" className="portal-link">User Login</Link>);
    if (role !== 'student') links.push(<Link key="student" to="/student/login" className="portal-link">Student Login</Link>);
    if (role !== 'trainer') links.push(<Link key="trainer" to="/trainer/login" className="portal-link">Trainer Login</Link>);
    if (role !== 'admin') links.push(<Link key="admin" to="/admin/login" className="portal-link">Admin Login</Link>);
    
    // Separate by a vertical bar divider
    return (
      <div className="portal-links flex gap-2 justify-center items-center">
        {links.reduce((acc, link, i) => i === 0 ? [link] : [...acc, <span key={`div-${i}`} className="portal-divider">|</span>, link], [])}
      </div>
    );
  };

  return (
    <div className="login-card">
      {/* Top Logo */}
      <div className="login-card-header flex flex-col items-center">
        <img src={siteLogo} alt="Jet to Mastery Logo" className="login-logo-img" />
        <h2 className="login-heading">{heading}</h2>
        <p className="login-subtitle text-muted text-center">{subtitle}</p>
      </div>

      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="login-form flex flex-col">
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">{emailLabel}</label>
          <input
            type="email"
            id="email"
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            placeholder={emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
          />
          {errors.email && (
            <span id="email-error" className="error-text" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password Field */}
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          id="password"
          label="Password"
          placeholder="Enter your password"
        />

        {/* Extra actions */}
        <div className="form-actions-row flex justify-between items-center">
          {role !== 'admin' ? (
            <label className="checkbox-container flex items-center gap-1">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkbox-label text-muted">Remember me</span>
            </label>
          ) : <div />}
          
          <a href="#" className="forgot-password-link text-muted" onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>
        </div>

        {/* Submit button */}
        <button 
          type="submit" 
          className="btn btn-primary btn-submit w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Social Provider Auth */}
      {(role === 'user' || role === 'student') && (
        <div className="social-auth-section">
          <div className="divider">
            <span className="divider-text text-muted">or</span>
          </div>
          <button 
            type="button" 
            className="btn btn-secondary google-btn w-full"
            onClick={() => {
              setIsSubmitting(true);
              setTimeout(() => {
                login('google.user@jtm.edu', role);
                setIsSubmitting(false);
                navigate(destination, { replace: true });
              }, 1200);
            }}
            disabled={isSubmitting}
          >
            <svg className="google-icon" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>
      )}

      {/* Account Footer Actions */}
      <div className="login-card-footer text-center">
        <span className="text-muted">{footerText} </span>
        {footerActionLink && footerActionLink !== '#' ? (
          <Link to={footerActionLink} className="auth-footer-link">
            {footerActionText}
          </Link>
        ) : (
          <span className="auth-footer-text-action text-primary font-semibold">{footerActionText}</span>
        )}
      </div>

      {/* Switch role portals links footer */}
      <div className="role-portal-links">
        <span className="portal-label text-muted">Other Login Options</span>
        {getOtherPortals()}
      </div>
    </div>
  );
};

export default LoginForm;
