/**
 * Safely loads tasks from local storage.
 * @returns {Array} List of tasks or empty array if none exist/error occurs.
 */
export const loadTasks = () => {
  try {
    const serializedState = localStorage.getItem('planner_tasks');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load tasks from local storage", err);
    return [];
  }
};

/**
 * Safely saves tasks to local storage.
 * @param {Array} tasks - List of tasks to save.
 */
export const saveTasks = (tasks) => {
  try {
    const serializedState = JSON.stringify(tasks);
    localStorage.setItem('planner_tasks', serializedState);
  } catch (err) {
    console.error("Could not save tasks to local storage", err);
  }
};
