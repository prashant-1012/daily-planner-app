import React, { useState } from 'react';
import { Upload, Check } from 'lucide-react';

const AVATAR_SEEDS = [
  'Felix', 'Aneka', 'Oliver', 'Mia', 'Jack', 'Lucy', 'Max', 'Luna'
];

const getDiceBearUrl = (seed) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

const AvatarStep = ({ avatar, setAvatar, onComplete }) => {
  const [selectedSeed, setSelectedSeed] = useState(avatar || null);

  const handleSelect = (seed) => {
    const url = getDiceBearUrl(seed);
    setSelectedSeed(url);
    setAvatar(url);
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
          Choose your avatar
        </h2>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
          Pick a predefined avatar or skip for now.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-4 mb-8">
        {AVATAR_SEEDS.map((seed) => {
          const url = getDiceBearUrl(seed);
          const isSelected = selectedSeed === url;
          return (
            <button
              key={seed}
              onClick={() => handleSelect(seed)}
              className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                isSelected 
                  ? 'border-blue-500 ring-4 ring-blue-500/20' 
                  : 'border-transparent bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <img src={url} alt={seed} className="w-full h-full object-cover p-2" />
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Upload Photo Option (Aesthetics only for now) */}
      <button 
        className="w-full flex items-center justify-center gap-2 py-4 mb-8 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 rounded-2xl transition-all border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
      >
        <Upload className="w-4 h-4" />
        <span>Upload custom photo (coming soon)</span>
      </button>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleComplete}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 font-semibold text-lg transition-all duration-300 hover:scale-[0.98] active:scale-[0.95]"
        >
          {selectedSeed ? 'Finish Setup' : 'Skip & Finish'}
        </button>
      </div>
    </div>
  );
};

export default AvatarStep;
