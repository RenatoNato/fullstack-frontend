// src/pages/AddressesList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination.jsx';

export default function AddressesList() {
  const navigate = useNavigate();
  const [addrs, setAddrs]         = useState([]);
  const [page, setPage]           = useState(0);
  const [size, setSize]           = useState(10);
  const [sortField, setSortField] = useState('cidade');
  const [sortDir, setSortDir]     = useState('asc');
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]     = useState(true);

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
    api.get(`/enderecos?page=${page}&size=${size}&sort=${sortField},${sortDir}`)
      .then(res => {
        const data = res.data;
        setAddrs(data.content || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(err => {
        console.error(err.response?.data);
        toast.error('Erro ao carregar endereços');
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
      <h2 className="mb-4">Endereços</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate('/addresses/new')}
      >
        Novo Endereço
      </button>

      <table className="table table-hover">
        <thead>
          <tr>
            <th 
              className={headerClass('bairro')} 
              onClick={() => handleSort('bairro')}
              style={{ cursor: 'pointer' }}
            >
              Bairro
            </th>
            <th 
              className={headerClass('cidade')} 
              onClick={() => handleSort('cidade')}
              style={{ cursor: 'pointer' }}
            >
              Cidade
            </th>
            <th>Logradouro</th>
            <th>CEP</th>
            <th>Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {addrs.map(a => (
            <tr key={a.id}>
              <td>{a.bairro}</td>
              <td>{a.cidade}/{a.estado}</td>
              <td>{a.logradouro}</td>
              <td>{a.cep}</td>
              <td>{a.usuario?.nome}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => navigate(`/addresses/${a.id}/edit`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (!window.confirm('Excluir?')) return;
                    api.delete(`/enderecos/${a.id}`)
                      .then(() => {
                        setAddrs(prev => prev.filter(x => x.id !== a.id));
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
