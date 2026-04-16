import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Plus, MoreVertical, X, ChevronDown, Coffee } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { formatDayHeader, isToday, isTomorrow, formatDateKey } from '../../utils/dateHelpers';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { addTask } from '../tasks/taskSlice';
import TaskItem from '../tasks/TaskItem';


const DayCard = ({ date, tasks = [] }) => {
  const dispatch = useDispatch();
  const isCurrentDay = isToday(date);
  const isNextDay = isTomorrow(date);
  const [isAdding, setIsAdding] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [isExpanded, setIsExpanded] = useState(isCurrentDay || isNextDay);
  const inputRef = useRef(null);

  const { text: statusText, remaining } = getTaskStatus(tasks);

  // Auto-focus the input when entering "add mode"
  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleCreateTask = () => {
    if (taskTitle.trim()) {
      const newTask = {
        id: crypto.randomUUID(),
        title: taskTitle.trim(),
        date: formatDateKey(date),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      dispatch(addTask(newTask));
      setTaskTitle('');
      setIsAdding(false);
    } else {
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCreateTask();
    if (e.key === 'Escape') {
      setIsAdding(false);
      setTaskTitle('');
    }
  };

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className={`flex flex-col bg-white dark:bg-gray-900 rounded-3xl border transition-all duration-300 group
      ${isExpanded ? 'min-h-[450px] md:min-h-[450px]' : 'min-h-fit md:min-h-[450px]'}
      ${isCurrentDay 
        ? 'ring-2 ring-blue-500/20 border-blue-200 dark:border-blue-900/50 shadow-xl shadow-blue-500/5' 
        : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-lg'
      }`}>
      
      {/* Card Header */}
      <div 
        className="p-5 flex items-center justify-between cursor-pointer md:cursor-default"
        onClick={toggleExpand}
      >
        <div className="flex items-center flex-wrap gap-2">
          <h3 className={`font-bold text-lg dark:text-gray-100 ${isCurrentDay ? 'text-blue-600' : 'text-gray-800'}`}>
            {formatDayHeader(date)}
          </h3>
          {isCurrentDay && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
              Today
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* Animated Premium Counter */}
          <AnimatePresence mode="wait">
            <motion.span
              key={statusText}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`text-xs font-medium tracking-wide ${
                remaining === 0 && tasks.length > 0
                  ? 'text-green-500 dark:text-green-400' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {statusText}
            </motion.span>
          </AnimatePresence>

          <div className="flex items-center gap-1">
            <button className="md:hidden p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-transform duration-300">
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            <button 
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Task List & Add Button Container */}
      <div 
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out md:grid-rows-[1fr] md:opacity-100 md:flex-1 ${
          isExpanded ? 'grid-rows-[1fr] opacity-100 flex-1' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden flex flex-col h-full min-h-0">
          {/* Task List */}
          <div className="flex-1 px-5 space-y-3 overflow-y-auto max-h-[350px] custom-scrollbar pb-4" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="popLayout" initial={false}>
              {tasks.length > 0 ? (
                tasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))
              ) : (
                !isAdding && (
                  <div className="h-28 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl gap-2 text-gray-400 dark:text-gray-500">
                    <Coffee className="w-5 h-5 opacity-60" strokeWidth={1.5} />
                    <p className="text-xs font-medium">Nothing on the agenda</p>
                  </div>
                )
              )}
            </AnimatePresence>
          </div>

          {/* Add Task Input / Button */}
          <div 
            className="p-4 mt-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {isAdding ? (
              <div className="relative animate-in fade-in slide-in-from-bottom-2 duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleCreateTask}
                  placeholder="What needs to be done?"
                  className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-blue-500/30 rounded-2xl py-2.5 px-4 pr-10 text-sm outline-none focus:border-blue-500 dark:text-gray-100 transition-all shadow-lg shadow-blue-500/5"
                />
                <button 
                  onClick={() => setIsAdding(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAdding(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-2xl transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 group/add"
              >
                <Plus className="w-4 h-4 transition-transform group-hover/add:rotate-90" />
                <span>Add Task</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayCard;

