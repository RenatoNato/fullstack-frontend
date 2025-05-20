import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios.js';
import { toast } from 'react-toastify';

export default function AddressForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cep, setCep]                   = useState('');
  const [logradouro, setLogradouro]     = useState('');
  const [numero, setNumero]             = useState('');
  const [complemento, setComplemento]   = useState('');
  const [bairro, setBairro]             = useState('');
  const [cidade, setCidade]             = useState('');
  const [estado, setEstado]             = useState('');
  const [usuarios, setUsuarios]         = useState([]);
  const [usuarioId, setUsuarioId]       = useState('');
  const [loading, setLoading]           = useState(false);

  useEffect(() => {
    api.get('/usuarios?page=0&size=100&sort=nome,asc')
      .then(res => setUsuarios(res.data.content || []))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (id) {
      api.get(`/enderecos/${id}`)
        .then(res => {
          const a = res.data;
          setCep(a.cep);
          setLogradouro(a.logradouro);
          setNumero(a.numero);
          setComplemento(a.complemento);
          setBairro(a.bairro);
          setCidade(a.cidade);
          setEstado(a.estado);
          setUsuarioId(a.usuario.id);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleCepBlur = () => {
    const onlyNums = cep.replace(/\D/g, '');
    if (onlyNums.length !== 8) return;
    fetch(`https://viacep.com.br/ws/${onlyNums}/json/`)
      .then(r => r.json())
      .then(data => {
        if (!data.erro) {
          setLogradouro(data.logradouro || '');
          setBairro(data.bairro || '');
          setCidade(data.localidade || '');
          setEstado(data.uf || '');
        }
      })
      .catch(() => toast.error('Cep inválido'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      userId: usuarioId
    };

    const req = id
      ? api.put(`/enderecos/${id}`, payload)
      : api.post('/enderecos', payload);

    req.then(() => {
      toast.success(id ? 'Atualizado' : 'Criado');
      navigate('/addresses');
    })
      .catch(err => {
        console.error(err.response?.data);
        toast.error('Erro ao salvar');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2>{id ? 'Editar Endereço' : 'Novo Endereço'}</h2>
      <form onSubmit={handleSubmit}>
        {/* CEP */}
        <div className="mb-3">
          <label>CEP</label>
          <input
            className="form-control"
            value={cep}
            onChange={e => setCep(e.target.value)}
            onBlur={handleCepBlur}
            required
          />
        </div>
        {/* resto dos campos... */}
        <div className="mb-3">
          <label>Usuário</label>
          <select
            className="form-select"
            value={usuarioId}
            onChange={e => setUsuarioId(e.target.value)}
            required
          >
            <option value="">-- selecione --</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>
                {u.nome} ({u.email})
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
