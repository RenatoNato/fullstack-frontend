# Documentação do Frontend – Fullstack React + Vite

Este documento descreve apenas a parte **frontend** da aplicação, desenvolvida com **Vite + React**. Aqui você encontra instruções de instalação, estrutura de pastas, dependências e propósito de cada arquivo/componente.

---

## 🚀 Pré-requisitos

- Node.js ≥ 18  
- npm (ou yarn)

---

## 🔧 Instalação & Execução

```bash
# na raiz do projeto frontend
cd fullstack-frontend
npm install
npm run dev -- --force
```

Abra o navegador em [http://localhost:5173](http://localhost:5173).

---

## 📂 Estrutura de Diretórios

```
fullstack-frontend/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── api/
    │   └── axios.js
    ├── contexts/
    │   └── AuthContext.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   └── Pagination.jsx
    ├── routes/
    │   └── ProtectedRoute.jsx
    └── pages/
        ├── Home.jsx
        ├── Login.jsx
        ├── Register.jsx
        ├── UsersList.jsx
        ├── UserForm.jsx
        ├── AddressesList.jsx
        └── AddressForm.jsx
```

---

## 📦 Descrição dos Arquivos

### `main.jsx`  
Ponto de entrada:  
- Envolve a aplicação em `<AuthProvider>`  
- Monta o `<App />` em `#root`

### `App.jsx`  
Define todas as rotas:  
- Rotas públicas: `/login`, `/register`  
- Rotas protegidas: `/` (Home), `/users*`, `/addresses*`  
- Exibe `<Navbar />` e `<ToastContainer />` globalmente

### `api/axios.js`  
Instância Axios com `baseURL` para `http://localhost:8080/api` e interceptor que injeta o token JWT via `Authorization` em todas as requisições.

### `contexts/AuthContext.jsx`  
Context API para autenticação:  
- `isAuthenticated`: booleano  
- `loadingAuth`: só renderiza rotas protegidas após checar `localStorage`  
- `login(token)`: salva token e configura header  
- `logout()`

### `routes/ProtectedRoute.jsx`  
Wrapper de rota que:  
1. Aguarda `loadingAuth` ser `false`.  
2. Se `!isAuthenticated`, redireciona a `/login`.  
3. Caso contrário, renderiza o componente filho.

### `components/Navbar.jsx`  
Barra de navegação condicionada a `isAuthenticated`:  
- Links para Home, Usuários e Endereços  
- Botão “Sair” chama `logout()` e redireciona a `/login`

### `components/Pagination.jsx`  
Componente genérico de paginação:  
- Botões “Anterior”/“Próximo”  
- Informação de página atual / total  
- Seletor de itens por página (5, 10, 20, 50)

---

## 🖥️ Descrição das Telas (`pages/`)

### `Login.jsx` (`/login`)  
- Formulário com campos **Email** e **Senha**  
- Ao submeter, faz POST `/auth/login`, armazena token e navega para `/`

### `Register.jsx` (`/register`)  
- Formulário com **Nome**, **Email** e **Senha**  
- Ao submeter, faz POST `/auth/register` e redireciona a `/login`

### `Home.jsx` (`/`)  
- “Landing page” pós-login  
- Botões: **Gerenciar Usuários** (rota `/users`) e **Gerenciar Endereços** (rota `/addresses`)

### `UsersList.jsx` (`/users`)  
- Tabela de usuários com colunas **Nome**, **Email**, **Data Criação**, **Ações**  
- Cabeçalhos clicáveis para ordenar (asc/desc)  
- Uso de `<Pagination />` para navegar páginas  
- Botão **Novo Usuário**

### `UserForm.jsx` (`/users/new`, `/users/:id/edit`)  
- Campos **Nome**, **Email**, **Senha** (obrigatória apenas em criação)  
- Ao submeter: POST ou PUT `/usuarios`

### `AddressesList.jsx` (`/addresses`)  
- Tabela de endereços com colunas **Logradouro**, **Número**, **Bairro**, **Cidade/UF**, **CEP**, **Usuário**, **Ações**  
- Ordenação por cabeçalho e paginação

### `AddressForm.jsx` (`/addresses/new`, `/addresses/:id/edit`)  
- Campos de endereço: **CEP**, **Logradouro**, **Número**, **Complemento**, **Bairro**, **Cidade**, **Estado** e **Usuário** (select)  
- Autocomplete de endereço via [ViaCEP](https://viacep.com.br) no blur do campo CEP  
- POST ou PUT `/enderecos`

---

## 📋 Dependências Principais

- **React 18+**  
- **Vite**  
- **axios**  
- **react-router-dom**  
- **react-toastify**  
- **bootstrap**  
- **jwt-decode** (opcional)

---

## 🔄 Fluxo de Autenticação

1. **Login** → armazena JWT no `localStorage` e configura header Axios  
2. `AuthContext` sinaliza `isAuthenticated = true`  
3. `ProtectedRoute` permite acesso às rotas internas  
4. **Logout** → limpa token e retorna ao `/login`

---

### 🎉 Pronto para usar!

Suba o **backend** em `8080` e o **frontend** em `5173`, siga os passos de instalação, e você terá o sistema completo em funcionamento.
