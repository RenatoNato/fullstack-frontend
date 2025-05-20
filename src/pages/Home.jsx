// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Bem-vindo!</h2>
      <div className="d-grid gap-3">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/users')}
        >
          Gerenciar Usuários
        </button>
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => navigate('/addresses')}
        >
          Gerenciar Endereços
        </button>
      </div>
    </div>
  );
}
