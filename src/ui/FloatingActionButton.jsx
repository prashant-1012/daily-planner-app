import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingActionButton = ({ onClick }) => {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
      aria-label="Add New Task"
    >
      <Plus className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
    </motion.button>
  );
};

export default FloatingActionButton;
