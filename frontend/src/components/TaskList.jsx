import TaskItem from './TaskItem.jsx';
import EmptyState from './EmptyState.jsx';

export default function TaskList({ tasks, isOverdue, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) return <EmptyState />;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          overdue={isOverdue(task)}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
