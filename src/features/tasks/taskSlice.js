import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filters: {
    search: '',
    date: null,
  },
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    toggleTaskComplete: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
  },
});

export const { 
  setTasks, 
  addTask, 
  updateTask, 
  deleteTask, 
  toggleTaskComplete,
  setSearchFilter 
} = taskSlice.actions;

export default taskSlice.reducer;
