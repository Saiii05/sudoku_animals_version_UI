import React, { useState } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

interface TutorialOverlayProps {
  onClose: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      if (dontShowAgain) {
        saveToLocalStorage('animal-sudoku-tutorial-dismissed', true);
      }
      onClose();
    }
  };

  const steps = [
    "Welcome to Animal Sudoku! Select 9 animals to play with.",
    "Click on an animal in the palette to select it, then click on a cell to place it.",
    "Use the toolbar to undo, redo, get hints, and more. Enjoy!",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md w-full text-center">
        <p className="text-lg mb-4">{steps[step]}</p>
        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded mb-4">
          {step < 2 ? 'Next' : 'Finish'}
        </button>
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            id="dont-show-again"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="dont-show-again">Don't show again</label>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
