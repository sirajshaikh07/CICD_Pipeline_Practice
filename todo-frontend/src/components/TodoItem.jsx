import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description || '');

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDesc.trim(),
      completed: todo.completed,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDesc(todo.description || '');
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') handleCancel();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (editing) {
    return (
      <div className="edit-form" id={`edit-todo-${todo.id}`}>
        <input
          className="edit-form__input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Task title..."
          autoFocus
          id={`edit-title-${todo.id}`}
        />
        <textarea
          className="edit-form__input edit-form__input--desc"
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Description (optional)..."
          id={`edit-desc-${todo.id}`}
        />
        <div className="edit-form__actions">
          <button
            className="edit-form__btn"
            onClick={handleCancel}
            id={`cancel-edit-${todo.id}`}
          >
            Cancel
          </button>
          <button
            className="edit-form__btn edit-form__btn--save"
            onClick={handleSave}
            disabled={!editTitle.trim()}
            id={`save-edit-${todo.id}`}
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}
      id={`todo-${todo.id}`}
    >
      <input
        type="checkbox"
        className="todo-item__checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        id={`checkbox-${todo.id}`}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <div className="todo-item__content">
        <div className="todo-item__title">{todo.title}</div>
        {todo.description && (
          <div className="todo-item__desc">{todo.description}</div>
        )}
        <div className="todo-item__meta">
          {formatDate(todo.createdAt)}
        </div>
      </div>
      <div className="todo-item__actions">
        <button
          className="todo-item__action-btn"
          onClick={() => setEditing(true)}
          id={`edit-btn-${todo.id}`}
          aria-label={`Edit "${todo.title}"`}
        >
          ✏️ Edit
        </button>
        <button
          className="todo-item__action-btn todo-item__action-btn--delete"
          onClick={() => onDelete(todo.id)}
          id={`delete-btn-${todo.id}`}
          aria-label={`Delete "${todo.title}"`}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
