import { useState, useEffect } from "react";
import API from "../api";

export default function TodoItem({ todo, refresh }) {
  const [checked, setChecked] = useState(todo.status === "completed");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChecked(todo.status === "completed");
  }, [todo.status]);


  const toggleStatus = async () => {
    const newStatus = checked ? "ongoing" : "completed";
    setChecked(!checked);
    setLoading(true);
    try {
      await API.put(`/todos/${todo._id}`, { status: newStatus });
      refresh();
    } catch (err) {
      setChecked(checked);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async () => {
    setLoading(true);
    try {
      await API.delete(`/todos/${todo._id}`);
      refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="todo-item">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={toggleStatus}
          disabled={loading}
        />
        <span className={checked ? "done" : ""}>{todo.description}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className={`status ${todo.status === "completed" ? "status-completed" : "status-ongoing"}`}>
          {todo.status === "completed" ? "Completed" : "Ongoing"}
        </span>
        <button onClick={deleteTodo} disabled={loading}>
          Delete❌
        </button>
      </div>
    </div>
  );
}

