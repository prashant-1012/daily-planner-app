import React from 'react';
import Header from './components/Header';
import { useDarkMode } from './hooks/useDarkMode';

import CalendarGrid from './features/calendar/CalendarGrid';

function App() {
  const [isDark, toggleDarkMode] = useDarkMode();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header component with dark mode toggle props */}
      <Header isDark={isDark} toggleDarkMode={toggleDarkMode} />

      {/* Main Content Area */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        <CalendarGrid />
      </main>
    </div>
  );
}


export default App;