import React, { useEffect, useState } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

const SoundToggle: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const savedSoundSetting = loadFromLocalStorage<boolean>('animal-sudoku-sound-enabled');
    if (savedSoundSetting !== null) {
      setSoundEnabled(savedSoundSetting);
    }
  }, []);

  const toggleSound = () => {
    const newSoundSetting = !soundEnabled;
    setSoundEnabled(newSoundSetting);
    saveToLocalStorage('animal-sudoku-sound-enabled', newSoundSetting);
  };

  return (
    <button onClick={toggleSound} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
      Sound: {soundEnabled ? 'On' : 'Off'}
    </button>
  );
};

export default SoundToggle;
