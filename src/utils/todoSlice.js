import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },
  reducers: {
    // Set Todos (used to update the list of tasks)
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    // Add a new Todo
    addTodo: (state, action) => {
      state.todos.push({ id: Date.now(), todo: action.payload });
    },
    // Remove a Todo by id
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((task) => task.id !== action.payload);
    },
  },
});

// Async Action: Fetch Todos from API
export const fetchTodos = () => async (dispatch) => {
    const response = await fetch('https://dummyjson.com/todos');
    const data= await response.json();
    dispatch(setTodos(data.todos)); // Set the fetched todos in the state
};

// Export the actions
export const { addTodo, removeTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
