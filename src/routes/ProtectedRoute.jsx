import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loadingAuth } = useContext(AuthContext);

  // enquanto não sabemos, não renderiza nada (nem redirect)
  if (loadingAuth) return null;

  // depois do loading, se não estiver logado, manda pro login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // se estiver logado, renderiza o conteúdo protegido
  return children;
}
