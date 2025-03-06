import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, removeTodo, updateTodo } from "./utils/todoSlice"; // Import updateTodo

const App = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  // Fetch todos when the component mounts
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Handle adding a new todo
  const handleAddTodo = () => {
    if (newTodo !== "") {
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  };

  // Handle removing a todo
  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  // Handle start editing a todo
  const handleEditTodo = (todo) => {
    setEditingTodoId(todo.id);
    setEditTodoText(todo.todo); // Pre-populate input with task text
  };

  // Handle updating a todo
  const handleUpdateTodo = () => {
    if (editTodoText !== "") {
      dispatch(updateTodo({ id: editingTodoId, updatedText: editTodoText }));
      setEditingTodoId(null);
      setEditTodoText(""); // Clear the input
    }
  };

  return (
    <div>
      <div className="input-tags">
        <h1>To-Do List</h1>
      </div>

      <div className="input-tag">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="input" onClick={handleAddTodo}>
          Add Task
        </button>
      </div>

      {editingTodoId && (
        <div>
          <input
            type="text"
            value={editTodoText}
            onChange={(e) => setEditTodoText(e.target.value)}
          />
          <button onClick={handleUpdateTodo}>Update Task</button>
        </div>
      )}

      <ul>
        {todos.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id}>
              <span className="todo-text">{todo.todo}</span>{" "}
              <div>
                <button onClick={() => handleRemoveTodo(todo.id)}>Delete</button>
                <button className="edit" onClick={() => handleEditTodo(todo)}>Edit</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
