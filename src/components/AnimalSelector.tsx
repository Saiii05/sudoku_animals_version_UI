import React, { useState } from 'react';
import { Animal } from '../types';
import { builtinAnimals } from '../data/builtinAnimals';

interface AnimalSelectorProps {
  selectedAnimals: Animal[];
  onSelectionChange: (animals: Animal[]) => void;
  onClose: () => void;
}

const AnimalSelector: React.FC<AnimalSelectorProps> = ({ selectedAnimals, onSelectionChange, onClose }) => {
  const [customEmoji, setCustomEmoji] = useState('');

  const handleSelectAnimal = (animal: Animal) => {
    if (selectedAnimals.length < 9 && !selectedAnimals.find(a => a.id === animal.id)) {
      onSelectionChange([...selectedAnimals, animal]);
    }
  };

  const handleRemoveAnimal = (animal: Animal) => {
    onSelectionChange(selectedAnimals.filter(a => a.id !== animal.id));
  };

  const handleAddCustomAnimal = () => {
    if (customEmoji) {
      const newAnimal: Animal = {
        id: customEmoji,
        name: 'Custom',
        emoji: customEmoji,
        source: 'custom',
      };
      handleSelectAnimal(newAnimal);
      setCustomEmoji('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Select 9 Animals</h2>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Selected Animals ({selectedAnimals.length}/9)</h3>
          <div className="flex flex-wrap gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
            {selectedAnimals.map(animal => (
              <div key={animal.id} className="relative">
                <span className="text-3xl">{animal.emoji}</span>
                <button
                  onClick={() => handleRemoveAnimal(animal)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Animal Gallery</h3>
          <div className="flex flex-wrap gap-2">
            {builtinAnimals.map(animal => (
              <button key={animal.id} onClick={() => handleSelectAnimal(animal)} className="text-3xl p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                {animal.emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Add Custom Animal (Emoji)</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={customEmoji}
              onChange={(e) => setCustomEmoji(e.target.value)}
              className="p-2 border rounded dark:bg-gray-700"
              placeholder="Enter an emoji"
            />
            <button onClick={handleAddCustomAnimal} className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
          </div>
        </div>

        <button
          onClick={onClose}
          disabled={selectedAnimals.length !== 9}
          className="w-full px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
        >
          {selectedAnimals.length === 9 ? 'Play with these animals!' : 'Select exactly 9 animals'}
        </button>
      </div>
    </div>
  );
};

export default AnimalSelector;
