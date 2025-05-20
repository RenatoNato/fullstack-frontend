import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function AdminRoute({ children }) {
  const { roles } = useContext(AuthContext);
  return roles.includes('ADMIN')
    ? children
    : <Navigate to="/" replace />;
}
