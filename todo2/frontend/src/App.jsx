import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/Dashboard';
import { getCookie, setCookie, deleteCookie } from './utils/cookies';
import './index.css';

const API_URL = 'http://localhost:3000';

function App() {
  const [token, setToken] = useState(getCookie('authToken'));

  const login = (newToken) => {
    setCookie('authToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    deleteCookie('authToken');
    setToken(null);
  };

  return (
    <Router>
      <div className="app-container">
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={!token ? <AuthForm mode="login" onAuth={login} API_URL={API_URL} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/register" 
          element={!token ? <AuthForm mode="register" onAuth={login} API_URL={API_URL} /> : <Navigate to="/" />} 
        />

        {/* Protected Route */}
        <Route 
          path="/" 
          element={token ? <Dashboard token={token} onLogout={logout} API_URL={API_URL}  /> : <Navigate to="/login" />} 
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;