import React, { useState, useEffect, useCallback } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import './Dashboard.css';

const Dashboard = ({ token, onLogout, API_URL }) => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

const fetchTodos = useCallback(async () => {
    const res = await fetch(`${API_URL}/todos`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json ();
    if (res.ok) setTodos(data);
  }, [token, API_URL]);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  return (
    <div className="dashboard">
      <header>
        <h1>My Todos</h1>
        <button onClick={onLogout}>Logout</button>
      </header>
      <TodoForm 
        token={token} 
        API_URL={API_URL} 
        fetchTodos={fetchTodos} 
        editingTodo={editingTodo} 
        clearEdit={() => setEditingTodo(null)} 
      />
      <TodoList 
        todos={todos} 
        token={token} 
        API_URL={API_URL} 
        fetchTodos={fetchTodos} 
        onEdit={setEditingTodo} 
      />
    </div>
  );
};

export default Dashboard;