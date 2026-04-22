import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Trash2, Edit3, X, Check, Calendar, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { toggleTaskComplete, deleteTask, addTask } from './taskSlice';
import { useToast } from '../../context/ToastContext';
import AddTaskModal from './AddTaskModal';

/**
 * TaskItem - Handles individual task display, completion, editing, and deletion.
 */
const TaskItem = ({ task, showDate }) => {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatTime = (time) => {
    if (!time) return '';
    try {
      const [hours, minutes] = time.split(':');
      const h = parseInt(hours, 10);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const formattedHours = h % 12 || 12;
      return `${formattedHours}:${minutes} ${ampm}`;
    } catch (e) {
      return time;
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        className={`group flex items-center gap-2.5 p-2 rounded-xl border transition-all duration-200
          ${task.completed 
            ? 'bg-gray-50/50 dark:bg-gray-800/30 border-transparent shadow-inner' 
            : 'bg-white dark:bg-gray-800/80 border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50'
          }`}
      >
        {/* Checkbox Icon */}
        <button 
          onClick={() => dispatch(toggleTaskComplete(task.id))}
          className="relative flex items-center justify-center w-5 h-5 shrink-0 transition-transform active:scale-95 group"
          aria-label="Toggle Complete"
        >
          <div 
            className={`absolute inset-0 rounded-[6px] border-[1.5px] transition-all duration-300 ease-out
              ${task.completed 
                ? 'bg-green-500 border-green-500 scale-[1.15]' 
                : 'bg-transparent border-gray-300 dark:border-gray-600 group-hover:border-green-400 scale-100'
              }`}
          />
          <Check 
            strokeWidth={4}
            className={`relative z-10 w-2.5 h-2.5 text-white transition-all duration-300 delay-75 ${
              task.completed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`} 
          />
        </button>

        {/* Task Text */}
        <div className="flex-1 min-w-0 py-0.5">
          <div className="flex flex-col">
            <p 
              onClick={() => dispatch(toggleTaskComplete(task.id))}
              className={`text-xs truncate cursor-pointer select-none leading-tight ${
                task.completed 
                  ? 'text-gray-400 line-through' 
                  : 'text-gray-700 dark:text-gray-200 font-medium'
              }`}
            >
              {task.title}
            </p>
            {(showDate || task.startTime || task.endTime) && (
              <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 space-y-1">
                {showDate && task.date && (
                  <p className="flex items-center gap-1.5 leading-none">
                    <Calendar className="w-3 h-3" />
                    <span>{format(parseISO(task.date), 'dd MMM yyyy')}</span>
                  </p>
                )}
                {(task.startTime || task.endTime) && (
                  <p className="flex items-center gap-1.5 leading-none">
                    <Clock className="w-3 h-3" />
                    <span>
                      {task.startTime ? formatTime(task.startTime) : ''}
                      {task.startTime && task.endTime ? ' - ' : ''}
                      {task.endTime ? formatTime(task.endTime) : ''}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons (Desktop Hover / Always on Mobile) */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 lg:opacity-0 transition-opacity">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
            title="Edit Task"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => {
              dispatch(deleteTask(task.id));
              addToast({
                message: 'Task deleted',
                actionText: 'Undo',
                onAction: () => dispatch(addTask(task)),
                duration: 4000
              });
            }}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
            title="Delete Task"
          >
            <Trash2 className="w-3.5 h-3.5" />
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

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={task}
      />
    </>
  );
};

export default TaskItem;
