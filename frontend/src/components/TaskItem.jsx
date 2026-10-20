function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

export default function TaskItem({ task, overdue, onToggle, onEdit, onDelete }) {
  const done = Boolean(task.completed);

  return (
    <li className={`task ${done ? 'done' : ''}`}>
      <div className="task-info">
        <span className={`task-title ${overdue ? 'overdue' : ''}`}>{task.title}</span>
        {task.due_date && <span className="task-date">{formatDate(task.due_date)}</span>}
        {overdue && <span className="badge">Em atraso</span>}
      </div>

      <div className="task-actions">
        <button className="icon-btn" onClick={() => onEdit(task)} aria-label="Editar" title="Editar">
          ✎
        </button>
        <button
          className="icon-btn"
          onClick={() => onDelete(task)}
          aria-label="Excluir"
          title="Excluir"
        >
          🗑
        </button>
      </div>

      <input
        className="check"
        type="checkbox"
        checked={done}
        onChange={() => onToggle(task)}
        aria-label="Concluir tarefa"
      />
    </li>
  );
}
