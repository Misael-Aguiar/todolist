import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import TaskList from './components/TaskList.jsx';
import TaskModal from './components/TaskModal.jsx';
import FloatingButton from './components/FloatingButton.jsx';
import useDebounce from './hooks/useDebounce.js';
import * as api from './services/api.js';

// Data local de hoje no formato YYYY-MM-DD (mesmo formato do due_date da API)
function todayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

// Data mais próxima primeiro; tarefas sem data vão para o final
function sortByDueDate(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.due_date && b.due_date) return a.due_date.localeCompare(b.due_date);
    if (a.due_date) return -1;
    if (b.due_date) return 1;
    return 0;
  });
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [totals, setTotals] = useState({ total: 0, completed: 0 });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [modal, setModal] = useState(null); // null | { task: null | {...} }
  const [error, setError] = useState('');

  const debouncedSearch = useDebounce(search, 400);

  const loadTasks = useCallback(async () => {
    try {
      const data = await api.listTasks({ search: debouncedSearch, status });
      setTasks(data.tasks);
      setTotals({ total: data.total, completed: data.completed });
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }, [debouncedSearch, status]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const sortedTasks = useMemo(() => sortByDueDate(tasks), [tasks]);

  const today = todayString();
  const isOverdue = (task) => !task.completed && Boolean(task.due_date) && task.due_date < today;

  async function run(action) {
    try {
      await action();
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleSave(data) {
    const editing = modal.task;
    setModal(null);
    run(() => (editing ? api.updateTask(editing.id, data) : api.createTask(data)));
  }

  function handleToggle(task) {
    run(() => api.toggleTask(task.id, !task.completed));
  }

  function handleDelete(task) {
    if (!window.confirm(`Excluir a tarefa "${task.title}"?`)) return;
    run(() => api.deleteTask(task.id));
  }

  return (
    <div className="page">
      <main className="card">
        <Header
          search={search}
          onSearch={setSearch}
          status={status}
          onStatus={setStatus}
          total={totals.total}
          completed={totals.completed}
        />

        {error && <p className="error">{error}</p>}

        <TaskList
          tasks={sortedTasks}
          isOverdue={isOverdue}
          onToggle={handleToggle}
          onEdit={(task) => setModal({ task })}
          onDelete={handleDelete}
        />
      </main>

      <FloatingButton onClick={() => setModal({ task: null })} />

      {modal && (
        <TaskModal task={modal.task} onSave={handleSave} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
