// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login         from './pages/Login.jsx';
import Register      from './pages/Register.jsx';
import Home          from './pages/Home.jsx';
import UsersList     from './pages/UsersList.jsx';
import UserForm      from './pages/UserForm.jsx';
import AddressesList from './pages/AddressesList.jsx';
import AddressForm   from './pages/AddressForm.jsx';

import ProtectedRoute from './routes/ProtectedRoute.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* públicas */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* landing page (Home) com opções */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* CRUD Usuários */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/new"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id/edit"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />

        {/* CRUD Endereços */}
        <Route
          path="/addresses"
          element={
            <ProtectedRoute>
              <AddressesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addresses/new"
          element={
            <ProtectedRoute>
              <AddressForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addresses/:id/edit"
          element={
            <ProtectedRoute>
              <AddressForm />
            </ProtectedRoute>
          }
        />

        {/* fallback: rotas desconhecidas redirecionam para Home/login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
