import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load session from localStorage on initialization
  useEffect(() => {
    const savedSession = localStorage.getItem('jtm_session');
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch {
        localStorage.removeItem('jtm_session');
      }
    }
    setLoading(false);
  }, []);

  // Login handler
  const login = (email, role) => {
    const sessionData = { email, role };
    setUser(sessionData);
    localStorage.setItem('jtm_session', JSON.stringify(sessionData));
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    localStorage.removeItem('jtm_session');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
