import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, removeTodo } from "./utils/todoSlice";

const App = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos when the component mounts
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Handle adding a new todo
  const handleAddTodo = () => {
    if (newTodo!=='') {
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  };

  // Handle removing a todo
  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div>
      <div className="input-tags">
        <h1>To-Do List</h1>
      </div>

      <div className="input-tag">
        <input type="text" placeholder="Enter a new task" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
        <button onClick={handleAddTodo}>Add Task</button>
      </div>
      
      <ul>
        {todos.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.todo}
              <button onClick={() => handleRemoveTodo(todo.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;














