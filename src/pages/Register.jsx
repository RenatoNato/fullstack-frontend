import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios.js';

export default function Register() {
  const [nome, setNome]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', {
        nome,
        email,
        senha: password
      });
      toast.success('Conta criada! Faça login.');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data);
      toast.error(err.response?.data?.message || 'Erro no registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Registrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      <p className="mt-3 text-center">
        Já tem conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
}
