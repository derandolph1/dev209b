import React, { useState, useEffect, useCallback } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import './Dashboard.css';

const Dashboard = ({ token, onLogout, API_URL }) => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

//   // Load todos on mount
//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const fetchTodos = async () => {
//     try {
//       const res = await fetch(`${API_URL}/todos`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setTodos(data);
//       } else if (res.status === 401) {
//         onLogout(); // Token expired or invalid
//       }
//     } catch (err) {
//       console.error("Failed to fetch todos", err);
//     }
//   };

//   return (
//     <div className="dashboard-layout">
//       <header className="dashboard-header">
//         <h1>My Tasks</h1>
//         <button onClick={onLogout} className="logout-btn">Logout</button>
//       </header>

//       <main>
//         {/* Form for both Create and Edit */}
//         <TodoForm 
//           token={token} 
//           API_URL={API_URL} 
//           fetchTodos={fetchTodos} 
//           editingTodo={editingTodo} 
//           clearEdit={() => setEditingTodo(null)} 
//         />

//         <hr />

//         {/* List of Tasks */}
//         <TodoList 
//           todos={todos} 
//           token={token} 
//           API_URL={API_URL} 
//           fetchTodos={fetchTodos} 
//           onEditTask={(todo) => setEditingTodo(todo)} 
//         />
//       </main>
//     </div>
//   );
// };

const fetchTodos = useCallback(async () => {
    const res = await fetch(`${API_URL}/todos`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) setTodos(await res.json());
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