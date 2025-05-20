// src/components/Pagination.jsx
import React from 'react';

export default function Pagination({ page, size, totalPages, onPageChange, onSizeChange }) {
  const canPrev = page > 0;
  const canNext = page + 1 < totalPages;

  return (
    <div className="d-flex align-items-center justify-content-between my-3">
      <div>
        <button 
          className="btn btn-outline-primary me-2" 
          disabled={!canPrev} 
          onClick={() => onPageChange(page - 1)}
        >
          Anterior
        </button>
        <button 
          className="btn btn-outline-primary" 
          disabled={!canNext} 
          onClick={() => onPageChange(page + 1)}
        >
          Próximo
        </button>
      </div>

      <div>
        Página {page + 1} de {totalPages}
      </div>

      <div className="d-flex align-items-center">
        <label className="me-2 mb-0">Itens por página:</label>
        <select 
          className="form-select form-select-sm w-auto" 
          value={size} 
          onChange={e => onSizeChange(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
