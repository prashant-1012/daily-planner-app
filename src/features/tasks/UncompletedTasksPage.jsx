import React from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckSquare } from 'lucide-react';
import TaskItem from './TaskItem';

const UncompletedTasksPage = () => {
  const allTasks = useSelector((state) => state.tasks.tasks);
  
  // Filter only uncompleted tasks
  const uncompletedTasks = allTasks.filter(task => !task.completed);

  // Sort tasks by date (newest first or oldest first). Let's sort oldest first.
  const sortedTasks = [...uncompletedTasks].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="w-full max-w-2xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">Uncompleted Tasks</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Stay on top of your pending work</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center justify-center px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {uncompletedTasks.length} {uncompletedTasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                showDate={true} 
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">All Caught Up!</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">You have no uncompleted tasks.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UncompletedTasksPage;
