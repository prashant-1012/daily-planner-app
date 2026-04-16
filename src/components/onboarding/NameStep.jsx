import React, { useEffect, useRef } from 'react';

const NameStep = ({ name, setName, onContinue }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus on load
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onContinue();
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
          Welcome 👋
        </h2>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
          What should we call you?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4 text-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:text-white outline-none transition-all"
            maxLength={30}
          />
        </div>

        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-2xl py-4 font-semibold text-lg transition-all duration-300 disabled:cursor-not-allowed hover:scale-[0.98] active:scale-[0.95]"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default NameStep;
