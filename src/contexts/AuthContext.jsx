import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios.js';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // Ao montar, verifica token e atualiza estado
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
    // terminou o loading inicial
    setLoadingAuth(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common.Authorization;
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loadingAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
