export function getTaskStatus(tasks) {
  if (!tasks || tasks.length === 0) {
    return { text: "No tasks", remaining: 0 };
  }

  const remaining = tasks.filter(t => !t.completed).length;

  if (remaining === 0) {
    return { text: "All done", remaining: 0 };
  }
  
  return { text: `${remaining} left`, remaining };
}
