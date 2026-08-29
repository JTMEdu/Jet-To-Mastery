import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'var(--font-family)' }}>
        <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Verifying session...</div>
      </div>
    );
  }

  // If not authenticated, redirect to the corresponding login page based on expected role
  if (!user) {
    if (allowedRoles.includes('admin')) return <Navigate to="/admin/login" replace />;
    if (allowedRoles.includes('trainer')) return <Navigate to="/trainer/login" replace />;
    if (allowedRoles.includes('student')) return <Navigate to="/student/login" replace />;
    return <Navigate to="/login" replace />;
  }

  // If authenticated but role is not allowed, redirect to their corresponding authorized dashboard
  if (!allowedRoles.includes(user.role)) {
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'trainer') return <Navigate to="/trainer/dashboard" replace />;
    if (user.role === 'student') return <Navigate to="/student/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  // User is authorized for this route group, render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
