import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { useDarkMode } from './hooks/useDarkMode';
import CalendarGrid from './features/calendar/CalendarGrid';
import Onboarding from './components/onboarding/Onboarding';
import Greeting from './components/Greeting';
import ProfileDrawer from './components/profile/ProfileDrawer';
import { getUserProfile } from './utils/userProfile';

import FloatingActionButton from './ui/FloatingActionButton';
import AddTaskModal from './features/tasks/AddTaskModal';
import NavDrawer from './components/navigation/NavDrawer';
import UncompletedTasksPage from './features/tasks/UncompletedTasksPage';

function App() {
  const [isDark, toggleDarkMode] = useDarkMode();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

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
    <div className="min-h-screen overflow-x-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Header component with dark mode toggle props */}
      <Header 
        isDark={isDark} 
        toggleDarkMode={toggleDarkMode} 
        userProfile={userProfile}
        onProfileClick={() => setIsProfileOpen(true)}
        onMenuClick={() => setIsNavDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 animate-in fade-in duration-500">
        {currentPage === 'home' ? (
          <>
            <Greeting name={userProfile?.name} />
            <CalendarGrid />
          </>
        ) : currentPage === 'uncompleted' ? (
          <UncompletedTasksPage />
        ) : null}
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setIsAddTaskModalOpen(true)} />

      {/* Add Task Modal */}
      <AddTaskModal 
        isOpen={isAddTaskModalOpen} 
        onClose={() => setIsAddTaskModalOpen(false)} 
      />

      {/* Profile Edit Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentProfile={userProfile}
        onSave={(updatedProfile) => setUserProfile(updatedProfile)}
      />

      {/* Navigation Drawer */}
      <NavDrawer
        isOpen={isNavDrawerOpen}
        onClose={() => setIsNavDrawerOpen(false)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
    </div>
  );
}

export default App;