import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Navbar() {
  const { isAuthenticated, roles, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">MinhaApp</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {roles.includes('ADMIN') && (
              <li className="nav-item">
                <Link className="nav-link" to="/users">Usuários</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/addresses">Endereços</Link>
            </li>
          </ul>
          <button
            className="btn btn-outline-secondary"
            onClick={() => { logout(); navigate('/login'); }}
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}
