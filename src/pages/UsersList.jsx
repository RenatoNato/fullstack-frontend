// src/pages/UsersList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination.jsx';

export default function UsersList() {
  const navigate = useNavigate();

  // Estados de paginação e ordenação
  const [users, setUsers]         = useState([]);
  const [page, setPage]           = useState(0);
  const [size, setSize]           = useState(10);
  const [sortField, setSortField] = useState('nome');
  const [sortDir, setSortDir]     = useState('asc');
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]     = useState(true);

  // Função para trocar ordenação ao clicar no header
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(0);
  };

  useEffect(() => {
    setLoading(true);
    api.get(`/usuarios?page=${page}&size=${size}&sort=${sortField},${sortDir}`)
      .then(res => {
        const data = res.data;
        setUsers(data.content || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(err => {
        console.error(err.response?.data);
        toast.error('Erro ao carregar usuários');
      })
      .finally(() => setLoading(false));
  }, [page, size, sortField, sortDir]);

  if (loading) {
    return <div className="container mt-5">Carregando...</div>;
  }

  const headerClass = (field) => 
    sortField === field 
      ? (sortDir === 'asc' ? 'sorting-asc' : 'sorting-desc') 
      : 'sorting';

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Usuários</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate('/users/new')}
      >
        Novo Usuário
      </button>

      <table className="table table-hover">
        <thead>
          <tr>
            <th 
              className={headerClass('nome')} 
              onClick={() => handleSort('nome')}
              style={{ cursor: 'pointer' }}
            >
              Nome
            </th>
            <th 
              className={headerClass('email')} 
              onClick={() => handleSort('email')}
              style={{ cursor: 'pointer' }}
            >
              Email
            </th>
            <th 
              className={headerClass('createdAt')} 
              onClick={() => handleSort('createdAt')}
              style={{ cursor: 'pointer' }}
            >
              Data Criação
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>
                {new Date(u.createdAt ?? u.dataCriacao).toLocaleString()}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => navigate(`/users/${u.id}/edit`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (!window.confirm('Excluir?')) return;
                    api.delete(`/usuarios/${u.id}`)
                      .then(() => {
                        setUsers(prev => prev.filter(x => x.id !== u.id));
                        toast.success('Excluído');
                      })
                      .catch(err => {
                        console.error(err.response?.data);
                        toast.error('Erro ao excluir');
                      });
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination 
        page={page} 
        size={size} 
        totalPages={totalPages}
        onPageChange={setPage}
        onSizeChange={newSize => { setSize(newSize); setPage(0); }}
      />
    </div>
  );
}
