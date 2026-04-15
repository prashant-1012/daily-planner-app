import React from 'react';
import { Search, Plus, Sun, Moon, Bell } from 'lucide-react';

const Header = ({ isDark, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Left Side: Logo & Search */}
        <div className="flex items-center gap-6 flex-1 max-w-xl">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">P</span>
            </div>
            <span className="font-bold text-xl tracking-tight dark:text-white">Planner</span>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 dark:text-gray-100 outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Add Task Button (Desktop) */}
          <button className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95">
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>

          {/* Icon Buttons */}
          <div className="flex items-center gap-1 border-l border-gray-200 dark:border-gray-800 ml-2 pl-2">
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-2 ml-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-0.5">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="User Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="hidden lg:block text-sm font-semibold dark:text-gray-200 group-hover:text-blue-600 transition-colors">Prashant</span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
