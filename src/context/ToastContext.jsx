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

  // return (
  //   <ToastContext.Provider value={{ addToast, removeToast }}>
  //     {children}
  //     <div className="fixed bottom-0 mb-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 w-full max-w-sm px-4 pointer-events-none">
  //       <AnimatePresence>
  //         {toasts.map(toast => (
  //           <motion.div
  //             key={toast.id}
  //             layout
  //             initial={{ opacity: 0, y: 50, scale: 0.9 }}
  //             animate={{ opacity: 1, y: 0, scale: 1 }}
  //             exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
  //             className="pointer-events-auto flex items-center justify-between gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-3 rounded-2xl shadow-xl shadow-black/20 dark:shadow-white/10 border border-gray-800 dark:border-gray-100"
  //           >
  //             <span className="text-sm font-medium">{toast.message}</span>
              
  //             <div className="flex items-center gap-2">
  //               {toast.actionText && toast.onAction && (
  //                 <button
  //                   onClick={() => {
  //                     toast.onAction();
  //                     removeToast(toast.id);
  //                   }}
  //                   className="flex items-center gap-1.5 text-xs font-bold text-amber-400 dark:text-blue-600 hover:text-amber-300 dark:hover:text-blue-500 uppercase tracking-wider px-2 py-1 rounded-lg hover:bg-white/10 dark:hover:bg-black/5 transition-colors"
  //                 >
  //                   <RotateCcw className="w-3.5 h-3.5" />
  //                   {toast.actionText}
  //                 </button>
  //               )}
                
  //               <button
  //                 onClick={() => removeToast(toast.id)}
  //                 className="p-1 text-gray-400 hover:text-gray-200 dark:hover:text-gray-600 rounded-full transition-colors"
  //               >
  //                 <X className="w-4 h-4" />
  //               </button>
  //             </div>
  //           </motion.div>
  //         ))}
  //       </AnimatePresence>
  //     </div>
  //   </ToastContext.Provider>
  // );

  return (
  <ToastContext.Provider value={{ addToast, removeToast }}>
    {children}

    <div className="fixed bottom-0 mb-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 w-full max-w-sm px-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="
              relative overflow-hidden
              pointer-events-auto flex items-center justify-between gap-4
              px-5 py-3.5 rounded-2xl

              bg-[#0f172a]/90 dark:bg-white/90
              backdrop-blur-md

              text-white/90 dark:text-gray-900

              border border-white/10 dark:border-black/10

              shadow-[0_10px_30px_rgba(0,0,0,0.25)]
              dark:shadow-[0_10px_30px_rgba(0,0,0,0.1)]
            "
          >
            {/* Message */}
            <span className="text-sm font-medium">
              {toast.message}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-2">
              
              {toast.actionText && toast.onAction && (
                <button
                  onClick={() => {
                    toast.onAction();
                    removeToast(toast.id);
                  }}
                  className="
                    flex items-center gap-1.5
                    text-xs font-medium
                    text-blue-400 dark:text-blue-600
                    px-2 py-1 rounded-lg
                    hover:bg-white/10 dark:hover:bg-black/5
                    transition
                  "
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {toast.actionText}
                </button>
              )}

              <button
                onClick={() => removeToast(toast.id)}
                className="
                  p-1 rounded-full
                  text-white/40 hover:text-white/70
                  dark:text-black/40 dark:hover:text-black/70
                  transition
                "
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ⏱ Progress bar (time indicator) */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
              className="
                absolute bottom-0 left-0 h-[2px]
                bg-blue-500/70 dark:bg-blue-400/70
              "
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </ToastContext.Provider>
);
};

export const useToast = () => useContext(ToastContext);
