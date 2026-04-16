import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AvatarSelector from './AvatarSelector';
import { saveUserProfile } from '../../utils/userProfile';

const ProfileDrawer = ({ isOpen, onClose, currentProfile, onSave }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);

  // Sync state when opened
  useEffect(() => {
    if (isOpen && currentProfile) {
      setName(currentProfile.name || '');
      setAvatar(currentProfile.avatar || null);
    }
  }, [isOpen, currentProfile]);

  const handleSave = () => {
    if (!name.trim()) return;
    
    const newProfile = { name: name.trim(), avatar };
    saveUserProfile(newProfile);
    onSave(newProfile);
    onClose();
  };

  // Close via Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer Wrapper */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[101] w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Edit Profile</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 flex flex-col gap-8">
              
              {/* Avatar Preview Section */}
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-1 shadow-lg shadow-blue-500/10">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                    {avatar ? (
                      <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-gray-300 dark:text-gray-700">
                        {name.charAt(0).toUpperCase() || 'P'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Name Input */}
              <div className="w-full">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Name <span className="text-red-500">*</span>
                </h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What should we call you?"
                  className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:text-white outline-none transition-all"
                  maxLength={30}
                />
              </div>

              {/* Avatar Selector */}
              <AvatarSelector avatar={avatar} setAvatar={setAvatar} />

            </div>

            {/* Footer / Save Button sticky at bottom */}
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
              <button
                onClick={handleSave}
                disabled={!name.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-2xl py-3.5 font-semibold text-lg transition-all duration-300 disabled:cursor-not-allowed hover:scale-[0.98] active:scale-[0.95]"
              >
                Save Changes
              </button>
            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileDrawer;
