import { useState } from 'react';

export default function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;

    setSubmitting(true);
    try {
      await onAdd({
        title: title.trim(),
        description: description.trim(),
        completed: false,
      });
      setTitle('');
      setDescription('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && title.trim()) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit} id="add-todo-form">
      <div className="add-form__row">
        <input
          className="add-form__input"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          id="add-todo-title"
        />
        <button
          className="add-form__btn"
          type="submit"
          disabled={!title.trim() || submitting}
          id="add-todo-submit"
        >
          {submitting ? '⏳' : '✚'} Add
        </button>
      </div>
      <div className="add-form__row">
        <textarea
          className="add-form__input add-form__input--desc"
          placeholder="Add a description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          id="add-todo-description"
        />
      </div>
    </form>
  );
}
