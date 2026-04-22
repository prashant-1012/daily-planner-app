import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus, Sun, Moon, Bell, X, Calendar, Menu } from 'lucide-react';
import { setSearchFilter, setDateFilter } from '../features/tasks/taskSlice';


const Header = ({ isDark, toggleDarkMode, userProfile, onProfileClick, onMenuClick }) => {
  const dispatch = useDispatch();
  const searchFilter = useSelector((state) => state.tasks.filters.search);
  const dateFilter = useSelector((state) => state.tasks.filters.date);
  const dateInputRef = React.useRef(null);

  const handleSearchChange = (e) => {
    dispatch(setSearchFilter(e.target.value));
  };

  const clearSearch = () => {
    dispatch(setSearchFilter(''));
  };

  const handleDateChange = (e) => {
    dispatch(setDateFilter(e.target.value));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Left Side: Logo & Search */}
        <div className="flex items-center gap-3 md:gap-6 flex-1 max-w-xl">
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
            <span className="hidden sm:block font-bold text-xl tracking-tight dark:text-white">Plannium</span>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 group max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              value={searchFilter}
              onChange={handleSearchChange}
              placeholder="Search tasks..." 
              className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-xl py-2 pl-10 pr-10 text-sm focus:ring-2 focus:ring-blue-500/20 dark:text-gray-100 outline-none transition-all"
            />
            {searchFilter && (
              <button 
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                title="Clear search"
              >
                <X className="w-3 h-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Quick Add Button (Desktop) */}
          {/* <button className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95">
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button> */}

          {/* Icon Buttons */}
          <div className="flex items-center gap-1 border-l border-gray-200 dark:border-gray-800 ml-1 pl-1 md:ml-2 md:pl-2">
            {/* Date Picker Button */}
            <div className="relative group">
              <button 
                onClick={() => dateInputRef.current.showPicker()}
                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2"
                title="Change Date Range"
              >
                <Calendar className="w-5 h-5" />
                <span className="hidden xl:block text-xs font-medium text-gray-400">{dateFilter}</span>
              </button>
              <input 
                ref={dateInputRef}
                type="date" 
                value={dateFilter}
                onChange={handleDateChange}
                className="absolute opacity-0 pointer-events-none"
              />
            </div>

            <button 
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button> */}
          </div>

          {/* Profile Section */}
          <div 
            className="flex items-center gap-2 ml-1 cursor-pointer group"
            onClick={onProfileClick}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-0.5 shadow-sm transition-transform active:scale-95 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                {userProfile?.avatar ? (
                  <img 
                    src={userProfile.avatar} 
                    alt="User Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {userProfile?.name?.charAt(0).toUpperCase() || 'P'}
                  </span>
                )}
              </div>
            </div>
            <span className="hidden lg:block text-sm font-semibold dark:text-gray-200 group-hover:text-blue-600 transition-colors">
              {userProfile?.name || 'Prashant'}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};


export default Header;

