import { useEffect, useState } from "react";
import API from "./api";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>📝 ToDo Dashboard</h1>

      <TodoForm refresh={fetchTodos} onAdd={todo => setTodos(prev => [todo, ...prev])} />

      {todos.length === 0 && <p>No tasks yet. Add one 👆</p>}

      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} refresh={fetchTodos} />
      ))}
    </div>
  );
}

export default App;
