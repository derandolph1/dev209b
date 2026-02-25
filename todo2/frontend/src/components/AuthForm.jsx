import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Auth.css';

const AuthForm = ({ onAuth, API_URL }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin ? '/login' : '/register';
    
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
console.log(data);
      if (res.ok) {
        if (isLogin) {
          onAuth(data.token); // Save token to cookie/state in App.js
          navigate('/');      // Redirect to Dashboard
        } else {
          alert('Registration successful! Please login.');
          setIsLogin(true);   // Switch to login mode automatically
        }
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Server connection failed.');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
      
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="primary-btn">
          {isLogin ? 'Sign In' : 'Register'}
        </button>
      </form>

      <p className="toggle-text">
        {isLogin ? "New here? " : "Already have an account? "} 
        <a
          className="link-btn" 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Register' : 'Sign in'}
        </a>
      </p>
    </div>
  );
};

export default AuthForm;