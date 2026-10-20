const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw new Error('Não foi possível conectar ao servidor.');
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || 'Erro ao comunicar com o servidor.');
  }

  return response.status === 204 ? null : response.json();
}

// GET /api/tasks -> { tasks, total, completed }
export function listTasks({ search = '', status = 'all' } = {}) {
  const params = new URLSearchParams({ search, status });
  return request(`/api/tasks?${params}`);
}

// POST /api/tasks { title, dueDate? }
export function createTask({ title, dueDate }) {
  return request('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({ title, dueDate: dueDate || null }),
  });
}

// PATCH /api/tasks/:id { title?, dueDate? }
export function updateTask(id, { title, dueDate }) {
  return request(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title, dueDate: dueDate || null }),
  });
}

// PATCH /api/tasks/:id { completed }
export function toggleTask(id, completed) {
  return request(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed }),
  });
}

// DELETE /api/tasks/:id
export function deleteTask(id) {
  return request(`/api/tasks/${id}`, { method: 'DELETE' });
}
