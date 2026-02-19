import { useState } from "react";
import API from "../api";

export default function TodoForm({ refresh, onAdd }) {
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("ongoing");

  const addTodo = async () => {
    if (!desc.trim()) return;

    try {
      const res = await API.post("/todos", {
        description: desc,
        status
      });
      setDesc("");
      setStatus("ongoing");
      if (onAdd) onAdd(res.data);
      else refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="todo-form">
      <input
        value={desc}
        onChange={e => setDesc(e.target.value)}
        placeholder="Enter task"
      />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={addTodo}>Add</button>
    </div>
  );
}
