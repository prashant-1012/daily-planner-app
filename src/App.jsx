import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { useDarkMode } from './hooks/useDarkMode';
import CalendarGrid from './features/calendar/CalendarGrid';
import Onboarding from './components/onboarding/Onboarding';
import { getUserProfile } from './utils/userProfile';

function App() {
  const [isDark, toggleDarkMode] = useDarkMode();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const profile = getUserProfile();
    setUserProfile(profile);
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = (profile) => {
    setUserProfile(profile);
  };

  if (isLoading) {
    return null; // Don't flash onboarding if already setup
  }

  if (!userProfile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header component with dark mode toggle props */}
      <Header isDark={isDark} toggleDarkMode={toggleDarkMode} userProfile={userProfile} />

      {/* Main Content Area */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 animate-in fade-in duration-500">
        <CalendarGrid />
      </main>
    </div>
  );
}

export default App;