export default function Header({ search, onSearch, status, onStatus, total, completed }) {
  return (
    <header className="header">
      <h1 className="title">To-Do List</h1>

      <div className="toolbar">
        <input
          className="search"
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        <select className="filter" value={status} onChange={(e) => onStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <p className="counters">
        <span>{total} total</span>
        <span className="dot">•</span>
        <span>{completed} concluídas</span>
      </p>
    </header>
  );
}
