import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/taskSlice';
import { saveTasks } from '../utils/storage';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

// Subscribe to store changes to save tasks to local storage
store.subscribe(() => {
  saveTasks(store.getState().tasks.tasks);
});

