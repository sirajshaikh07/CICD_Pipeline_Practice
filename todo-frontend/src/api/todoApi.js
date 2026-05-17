import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api/todos',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllTodos = (completed) => {
  const params = completed !== undefined ? { completed } : {};
  return API.get('', { params });
};

export const getTodoById = (id) => API.get(`/${id}`);

export const createTodo = (todo) => API.post('', todo);

export const updateTodo = (id, todo) => API.put(`/${id}`, todo);

export const toggleTodo = (id) => API.patch(`/${id}/toggle`);

export const deleteTodo = (id) => API.delete(`/${id}`);
