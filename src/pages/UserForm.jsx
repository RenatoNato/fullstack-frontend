import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios.js';
import { toast } from 'react-toastify';

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome]       = useState('');
  const [email, setEmail]     = useState('');
  const [senha, setSenha]     = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      api.get(`/usuarios/${id}`)
        .then(res => {
          setNome(res.data.nome);
          setEmail(res.data.email);
        })
        .catch(err => {
          console.error(err.response?.data);
          toast.error('Erro ao carregar');
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { nome, email };
    if (!id || senha.trim()) payload.senha = senha;

    const req = id
      ? api.put(`/usuarios/${id}`, payload)
      : api.post('/usuarios', payload);

    req.then(() => {
      toast.success(id ? 'Atualizado' : 'Criado');
      navigate('/users');
    })
      .catch(err => {
        console.error(err.response?.data);
        toast.error('Erro ao salvar');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>{id ? 'Editar Usuário' : 'Novo Usuário'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>
            Senha {id ? '(opcional)' : ''}
          </label>
          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            {...(!id && { required: true })}
          />
        </div>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
