import React, { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo } from './utils/todoSlice';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const [task, setTask] = useState('');

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const addTask = () => {
    if (task !== '') {
      dispatch(addTodo(task));
      setTask('');
    }
  };

  const removeTask = (index) => {
    dispatch(removeTodo(index)); 
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input type="text" value={task} onChange={handleChange} placeholder="Add a task"/>
      <button onClick={addTask}>Add Task</button>
      <ul className='items'>
        {todos.map((task, index) => (
          <li key={index}>
            {task} <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
