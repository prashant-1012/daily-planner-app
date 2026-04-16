import React, { useState, useEffect } from 'react';
import { Sun, Sunrise, Sunset, Moon } from 'lucide-react';

const Greeting = ({ name }) => {
  const [greetingInfo, setGreetingInfo] = useState({ text: '', Icon: Sun });

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreetingInfo({ text: 'Good morning', Icon: Sunrise });
      } else if (hour >= 12 && hour < 17) {
        setGreetingInfo({ text: 'Good afternoon', Icon: Sun });
      } else if (hour >= 17 && hour < 21) {
        setGreetingInfo({ text: 'Good evening', Icon: Sunset });
      } else {
        setGreetingInfo({ text: 'Good night', Icon: Moon });
      }
    };

    updateGreeting();
    // Periodically update the greeting every minute in case the user leaves the tab open
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const { text, Icon } = greetingInfo;
  const displayName = name || 'there';

  return (
    <div className="flex items-center gap-2 mb-6 md:mb-8 text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 opacity-90 animate-in fade-in slide-in-from-top-2 duration-700">
      <Icon className="w-4 h-4 md:w-5 md:h-5 text-amber-500 dark:text-amber-400" />
      <span>{text}, <span className="text-gray-700 dark:text-gray-300 capitalize">{displayName}</span></span>
    </div>
  );
};

export default Greeting;
