export default function FloatingButton({ onClick }) {
  return (
    <button className="fab" onClick={onClick} aria-label="Create Task" title="Create Task">
      +
    </button>
  );
}
