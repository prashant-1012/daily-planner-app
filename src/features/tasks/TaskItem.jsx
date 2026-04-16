import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Trash2, Edit3, X, Check } from 'lucide-react';
import { toggleTaskComplete, deleteTask, updateTask } from './taskSlice';

/**
 * TaskItem - Handles individual task display, completion, editing, and deletion.
 */
const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const editInputRef = useRef(null);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleUpdate = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      dispatch(updateTask({ ...task, title: editedTitle.trim() }));
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleUpdate();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(task.title);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`group flex items-center gap-3 p-3 rounded-2xl border transition-all duration-200
        ${task.completed 
          ? 'bg-gray-50/50 dark:bg-gray-800/20 border-transparent shadow-inner' 
          : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50'
        }`}
    >
      {/* Checkbox Icon */}
      <button 
        onClick={() => dispatch(toggleTaskComplete(task.id))}
        className="relative flex items-center justify-center w-6 h-6 shrink-0 transition-transform active:scale-95 group"
        aria-label="Toggle Complete"
      >
        <div 
          className={`absolute inset-0 rounded-[8px] border-[2px] transition-all duration-300 ease-out
            ${task.completed 
              ? 'bg-green-500 border-green-500 scale-[1.15]' 
              : 'bg-transparent border-gray-300 dark:border-gray-600 group-hover:border-green-400 scale-100'
            }`}
        />
        <Check 
          strokeWidth={3.5}
          className={`relative z-10 w-3.5 h-3.5 text-white transition-all duration-300 delay-75 ${
            task.completed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`} 
        />
      </button>

      {/* Task Text / Edit Input */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              ref={editInputRef}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleUpdate}
              className="w-full bg-blue-50 dark:bg-blue-900/20 border-none px-2 py-1 rounded-lg text-sm dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        ) : (
          <p 
            onClick={() => setIsEditing(true)}
            className={`text-sm truncate cursor-text select-none ${
              task.completed 
                ? 'text-gray-400 line-through' 
                : 'text-gray-700 dark:text-gray-200 font-medium'
            }`}
          >
            {task.title}
          </p>
        )}
      </div>

      {/* Action Buttons (Desktop Hover / Always on Mobile) */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 lg:opacity-0 transition-opacity">
        <button 
          onClick={() => setIsEditing(true)}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
          title="Edit Task"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button 
          onClick={() => dispatch(deleteTask(task.id))}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
          title="Delete Task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* For Tablet/Mobile: Action icons always visible if not editing */}
      <style>
        {`
          @media (max-width: 1024px) {
            .opacity-0.group-hover\\:opacity-100 {
              opacity: 1 !important;
            }
          }
        `}
      </style>
    </motion.div>
  );
};

export default TaskItem;
