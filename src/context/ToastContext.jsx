import React, { createContext, useState, useContext, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, actionText, onAction, duration = 4000 }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, actionText, onAction, duration }]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-0 mb-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 w-full max-w-sm px-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto flex items-center justify-between gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-3 rounded-2xl shadow-xl shadow-black/20 dark:shadow-white/10 border border-gray-800 dark:border-gray-100"
            >
              <span className="text-sm font-medium">{toast.message}</span>
              
              <div className="flex items-center gap-2">
                {toast.actionText && toast.onAction && (
                  <button
                    onClick={() => {
                      toast.onAction();
                      removeToast(toast.id);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-400 dark:text-blue-600 hover:text-amber-300 dark:hover:text-blue-500 uppercase tracking-wider px-2 py-1 rounded-lg hover:bg-white/10 dark:hover:bg-black/5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {toast.actionText}
                  </button>
                )}
                
                <button
                  onClick={() => removeToast(toast.id)}
                  className="p-1 text-gray-400 hover:text-gray-200 dark:hover:text-gray-600 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
