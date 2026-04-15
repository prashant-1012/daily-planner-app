import React from 'react';
import { useSelector } from 'react-redux';
import DayCard from './DayCard';
import { getNextDays, formatDateKey } from '../../utils/dateHelpers';

const CalendarGrid = () => {
  // Generate next 7 days
  const days = getNextDays(7);
  
  // Get tasks from Redux
  const allTasks = useSelector((state) => state.tasks.tasks);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {days.map((date) => {
        const dateKey = formatDateKey(date);
        
        // Filter tasks for this specific day
        const dayTasks = allTasks.filter(task => task.date === dateKey);

        return (
          <DayCard 
            key={dateKey} 
            date={date} 
            tasks={dayTasks}
          />
        );
      })}
    </div>
  );
};

export default CalendarGrid;
