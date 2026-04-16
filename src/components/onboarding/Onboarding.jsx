import React, { useState } from 'react';
import NameStep from './NameStep';
import AvatarStep from './AvatarStep';
import { saveUserProfile } from '../../utils/userProfile';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1); // 1 = Name, 2 = Avatar
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleNameContinue = () => {
    setStep(2);
  };

  const handleFinish = () => {
    const profile = { name, avatar };
    saveUserProfile(profile);
    onComplete(profile);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6 transition-colors duration-300">
      <div className="w-full max-w-md mx-auto">
        
        {/* Step Indicator */}
        <div className="flex gap-2 mb-8">
          <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-800'}`} />
          <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-800'}`} />
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-10 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-800">
          {step === 1 && (
            <NameStep 
              name={name} 
              setName={setName} 
              onContinue={handleNameContinue} 
            />
          )}
          {step === 2 && (
            <AvatarStep 
              avatar={avatar} 
              setAvatar={setAvatar} 
              onComplete={handleFinish} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
