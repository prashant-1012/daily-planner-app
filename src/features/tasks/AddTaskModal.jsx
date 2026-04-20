import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X, Calendar, Clock, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addTask } from './taskSlice';
import { formatDateKey } from '../../utils/dateHelpers';
import { useToast } from '../../context/ToastContext';

const AddTaskModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(formatDateKey(new Date()));
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Reset form on close
  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setDate(formatDateKey(new Date()));
      setStartTime('');
      setEndTime('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      date,
      startTime: startTime || null,
      endTime: endTime || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    dispatch(addTask(newTask));
    addToast({ message: 'Task created successfully!' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white dark:bg-[#121a2b] rounded-3xl shadow-2xl overflow-hidden pointer-events-auto border border-gray-200/50 dark:border-gray-700/50"
            >
              {/* Header */}
              <div className="relative p-6 pb-2">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Create New Task</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Plan your next big thing.</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 ml-1">
                    Task Title
                  </label>
                  <input
                    id="title"
                    autoFocus
                    type="text"
                    required
                    placeholder="Enter task name..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl px-4 py-3 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>

                {/* Date Input */}
                <div className="space-y-2">
                  <label htmlFor="date" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 ml-1">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500 pointer-events-none" />
                    <input
                      id="date"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl pl-11 pr-4 py-3 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm appearance-none"
                    />
                  </div>
                </div>

                {/* Time Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="startTime" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 ml-1">
                      Start Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500 pointer-events-none" />
                      <input
                        id="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="endTime" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 ml-1">
                      End Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500 pointer-events-none" />
                      <input
                        id="endTime"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl pl-10 pr-3 py-2.5 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl py-3.5 font-bold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 mt-4 hover:shadow-indigo-500/40 transition-all"
                >
                  <Plus className="w-5 h-5" strokeWidth={3} />
                  Create Task
                </motion.button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddTaskModal;
