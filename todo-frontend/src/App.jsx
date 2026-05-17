import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { getAllTodos, createTodo, updateTodo, toggleTodo, deleteTodo } from './api/todoApi';
import TodoItem from './components/TodoItem';
import AddTodoForm from './components/AddTodoForm';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // ─── Toast helper ──────────────────────────────────────────────────────────
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // ─── Fetch todos ───────────────────────────────────────────────────────────
  const fetchTodos = useCallback(async () => {
    try {
      const params =
        filter === 'active' ? false : filter === 'completed' ? true : undefined;
      const res = await getAllTodos(params);
      setTodos(res.data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      showToast('Failed to load todos. Is the backend running?', 'error');
    } finally {
      setLoading(false);
    }
  }, [filter, showToast]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // ─── CRUD handlers ────────────────────────────────────────────────────────
  const handleAdd = async (todoData) => {
    try {
      const res = await createTodo(todoData);
      setTodos((prev) => [res.data, ...prev]);
      showToast('Task added! 🎯');
    } catch (err) {
      console.error('Create failed:', err);
      showToast('Failed to create task', 'error');
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await toggleTodo(id);
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? res.data : t))
      );
      showToast(res.data.completed ? 'Task completed! ✅' : 'Task reopened');
    } catch (err) {
      console.error('Toggle failed:', err);
      showToast('Failed to update task', 'error');
    }
  };

  const handleUpdate = async (id, todoData) => {
    try {
      const res = await updateTodo(id, todoData);
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? res.data : t))
      );
      showToast('Task updated! ✏️');
    } catch (err) {
      console.error('Update failed:', err);
      showToast('Failed to update task', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      showToast('Task deleted 🗑️');
    } catch (err) {
      console.error('Delete failed:', err);
      showToast('Failed to delete task', 'error');
    }
  };

  // ─── Computed stats ────────────────────────────────────────────────────────
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <span className="header__icon" role="img" aria-label="rocket">🚀</span>
        <h1>Todo App</h1>
        <p>Stay productive. Get things done.</p>
      </header>

      {/* Stats */}
      <div className="stats" id="stats-bar">
        <div className="stat-card">
          <div className="stat-card__value">{totalCount}</div>
          <div className="stat-card__label">Total</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value stat-card__value--warning">{activeCount}</div>
          <div className="stat-card__label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value stat-card__value--success">{completedCount}</div>
          <div className="stat-card__label">Done</div>
        </div>
      </div>

      {/* Add Form */}
      <AddTodoForm onAdd={handleAdd} />

      {/* Filter Tabs */}
      <div className="filters" id="filter-tabs">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            className={`filters__btn ${filter === f ? 'filters__btn--active' : ''}`}
            onClick={() => setFilter(f)}
            id={`filter-${f}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Todo List */}
      {loading ? (
        <div className="spinner" id="loading-spinner">
          <div className="spinner__dot"></div>
          <div className="spinner__dot"></div>
          <div className="spinner__dot"></div>
        </div>
      ) : todos.length === 0 ? (
        <div className="empty-state" id="empty-state">
          <span className="empty-state__icon" role="img" aria-label="empty">
            {filter === 'completed' ? '🎯' : filter === 'active' ? '🎉' : '📝'}
          </span>
          <div className="empty-state__title">
            {filter === 'completed'
              ? 'No completed tasks yet'
              : filter === 'active'
                ? 'All tasks are done!'
                : 'No tasks yet'}
          </div>
          <div className="empty-state__desc">
            {filter === 'all'
              ? 'Add your first task above to get started.'
              : 'Try switching filters.'}
          </div>
        </div>
      ) : (
        <div className="todo-list" id="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`toast ${toast.type === 'error' ? 'toast--error' : ''}`}
          id="toast-notification"
        >
          {toast.type === 'error' ? '⚠️' : '✅'} {toast.message}
        </div>
      )}
    </div>
  );
}

export default App;
