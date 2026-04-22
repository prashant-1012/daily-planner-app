import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckSquare, Home } from 'lucide-react';

const NavDrawer = ({ isOpen, onClose, currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'uncompleted', label: 'Uncompleted Tasks', icon: <CheckSquare className="w-5 h-5" /> },
  ];

  const handleNavigate = (id) => {
    onNavigate(id);
    onClose();
  };

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-[110] w-[75%] md:w-64 bg-white dark:bg-gray-900 shadow-2xl rounded-r-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">Plannium</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Plan your next big thing</p>
              </div>
              <button
                onClick={onClose}
                className="md:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left
                      ${isActive 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(drawerContent, document.body) : null;
};

export default NavDrawer;
