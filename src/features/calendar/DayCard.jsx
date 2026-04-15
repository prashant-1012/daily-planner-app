import React from 'react';
import { Plus, MoreVertical, CheckCircle2, Circle } from 'lucide-react';
import { formatDayHeader, isToday } from '../../utils/dateHelpers';

const DayCard = ({ date, tasks = [] }) => {
  const isCurrentDay = isToday(date);
  
  return (
    <div className={`flex flex-col min-h-[400px] bg-white dark:bg-gray-900 rounded-3xl border transition-all duration-300 group
      ${isCurrentDay 
        ? 'ring-2 ring-blue-500/20 border-blue-200 dark:border-blue-900/50 shadow-xl shadow-blue-500/5' 
        : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-lg'
      }`}>
      
      {/* Card Header */}
      <div className="p-5 flex items-center justify-between">
        <div>
          <h3 className={`font-bold text-lg dark:text-gray-100 ${isCurrentDay ? 'text-blue-600' : 'text-gray-800'}`}>
            {formatDayHeader(date)}
          </h3>
          {isCurrentDay && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
              Today
            </span>
          )}
        </div>
        <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Task List (Placeholder for now) */}
      <div className="flex-1 px-5 space-y-3 overflow-y-auto max-h-[300px] custom-scrollbar">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.id} className="flex items-center gap-3 p-2 rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all cursor-pointer group/task">
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0 group-hover/task:text-blue-400" />
              )}
              <span className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                {task.title}
              </span>
            </div>
          ))
        ) : (
          <div className="h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl">
            <p className="text-xs text-gray-400">No tasks planned</p>
          </div>
        )}
      </div>

      {/* Add Task Trigger */}
      <div className="p-4 mt-auto">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-2xl transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 group/add">
          <Plus className="w-4 h-4 transition-transform group-hover/add:rotate-90" />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
};

export default DayCard;
