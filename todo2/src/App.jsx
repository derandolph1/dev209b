import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/Dashboard';
import { getCookie, setCookie, deleteCookie } from './utils/cookies';
import './index.css';

const API_URL = 'http://localhost:3000/api';

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
      </div>
    </Router>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import AuthForm from './components/AuthForm';
// import TodoList from './components/TodoList';
// import TodoForm from './components/TodoForm';
// import { getCookie, setCookie, deleteCookie } from './utils/cookies';

// const API_URL = 'http://localhost:3000';

// function App() {
//   const [token, setToken] = useState(getCookie('authToken'));
//   const [todos, setTodos] = useState([]);
//   const [editingTodo, setEditingTodo] = useState(null);

//   // Fetch todos whenever the token changes
//   useEffect(() => {
//     if (token) {
//       console.log("Token is presented. Try to get todos");
//       fetchTodos();
//     }
//   }, [token]);

//   const fetchTodos = async () => {
//     const res = await fetch(`${API_URL}/todos`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     const data = await res.json();
//     setTodos(data);
//   };

//   const handleLogout = () => {
//     deleteCookie('authToken');
//     setToken(null);
//     setTodos([]);
//   };

//   if (!token) {
//     return <AuthForm onAuth={(t) => { setCookie('authToken', t); setToken(t); }} API_URL={API_URL} />;
//   }

//   return (
//     <div className="app-container">
//       <header>
//         <h1>My Tasks</h1>
//         <button onClick={handleLogout}>Logout</button>
//       </header>

//       <TodoForm 
//         fetchTodos={fetchTodos} 
//         editingTodo={editingTodo} 
//         clearEdit={() => setEditingTodo(null)}
//         token={token}
//         API_URL={API_URL}
//       />

//       <TodoList 
//         todos={todos} 
//         fetchTodos={fetchTodos} 
//         setEditingTodo={setEditingTodo}
//         token={token}
//         API_URL={API_URL}
//       />
//     </div>
//   );
// }

// export default App;