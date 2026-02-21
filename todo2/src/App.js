import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import { getCookie, setCookie, deleteCookie } from './utils/cookies';

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
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={!token ? <AuthForm mode="login" onAuth={login} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/register" 
          element={!token ? <AuthForm mode="register" onAuth={login} /> : <Navigate to="/" />} 
        />

        {/* Protected Route */}
        <Route 
          path="/" 
          element={token ? <Dashboard token={token} onLogout={logout} /> : <Navigate to="/login" />} 
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;