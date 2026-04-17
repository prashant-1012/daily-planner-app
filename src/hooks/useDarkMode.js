import { useEffect, useState } from 'react';

/**
 * Custom hook to handle dark mode state and persistence.
 * @returns [isDark, toggleDarkMode]
 */
export const useDarkMode = () => {
  // Check if user has a preference in localStorage or system settings
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    // Default to dark if no saved preference
    if (!saved) return true;
    return saved === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return [isDark, toggleDarkMode];
};
