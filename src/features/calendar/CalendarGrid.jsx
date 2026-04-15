import React from 'react';
import { useSelector } from 'react-redux';
import { parseISO } from 'date-fns';
import DayCard from './DayCard';
import { getNextDays, formatDateKey } from '../../utils/dateHelpers';

const CalendarGrid = () => {
  // Get tasks and date filter from Redux
  const allTasks = useSelector((state) => state.tasks.tasks);
  const searchFilter = useSelector((state) => state.tasks.filters.search);
  const startDateStr = useSelector((state) => state.tasks.filters.date);
  
  // Convert date string to Date object
  const startDate = startDateStr ? parseISO(startDateStr) : undefined;

  // Generate 7 days starting from selected date
  const days = getNextDays(7, startDate);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {days.map((date) => {
        const dateKey = formatDateKey(date);
        
        // Filter tasks for this specific day AND match search query
        const dayTasks = allTasks.filter(task => 
          task.date === dateKey && 
          task.title.toLowerCase().includes(searchFilter.toLowerCase())
        );


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
