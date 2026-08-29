import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({ value, onChange, error, placeholder = 'Enter password', id = 'password', label = 'Password' }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-group">
      <div className="label-row flex justify-between">
        <label htmlFor={id} className="form-label">{label}</label>
      </div>
      <div className="password-input-wrapper" style={{ position: 'relative' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          className={`form-input ${error ? 'input-error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          required
          style={{ width: '100%', paddingRight: '44px' }}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="password-toggle-btn"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            transition: 'color var(--transition-fast)'
          }}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <span id={`${id}-error`} className="error-text" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
