import React from 'react';
import { Animal } from '../types';

interface PaletteProps {
  onSelect: (animal: Animal) => void;
  selectedAnimal: Animal | null;
  animals: Animal[];
}

const Palette: React.FC<PaletteProps> = ({ onSelect, selectedAnimal, animals }) => {
  return (
    <div className="flex flex-col space-y-2 p-4">
      {animals.map((animal) => {
        const isSelected = selectedAnimal?.id === animal.id;
        const classes = [
          'w-12 h-12',
          'flex items-center justify-center',
          'text-2xl rounded-lg cursor-pointer',
          isSelected
            ? 'bg-blue-500'
            : 'bg-gray-200 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-blue-700',
        ].join(' ');

        return (
          <div
            key={animal.id}
            className={classes}
            onClick={() => onSelect(animal)}
          >
            {animal.emoji}
          </div>
        );
      })}
    </div>
  );
};

export default Palette;
