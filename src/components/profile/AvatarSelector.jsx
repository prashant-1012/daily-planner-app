import React from 'react';
import { Upload, Check } from 'lucide-react';

const AVATAR_SEEDS = [
  'Felix', 'Aneka', 'Oliver', 'Mia', 'Jack', 'Lucy', 'Max', 'Luna'
];

const getDiceBearUrl = (seed) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

const AvatarSelector = ({ avatar, setAvatar }) => {

  const handlePresetSelect = (seed) => {
    setAvatar(getDiceBearUrl(seed));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Convert file to base64 Data URI ensuring it persists inside localStorage
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Choose Avatar
      </h3>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {AVATAR_SEEDS.map((seed) => {
          const url = getDiceBearUrl(seed);
          const isSelected = avatar === url;
          return (
            <button
              key={seed}
              type="button"
              onClick={() => handlePresetSelect(seed)}
              className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
                isSelected 
                  ? 'border-blue-500 ring-4 ring-blue-500/20' 
                  : 'border-transparent bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <img src={url} alt={seed} className="w-full h-full object-cover p-2" />
              {isSelected && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <label className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 rounded-2xl transition-all border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.98]">
        <Upload className="w-4 h-4" />
        <span>Upload Photo</span>
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileUpload} 
        />
      </label>
    </div>
  );
};

export default AvatarSelector;
