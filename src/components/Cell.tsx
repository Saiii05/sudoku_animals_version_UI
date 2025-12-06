import type { Animal } from '../types';

interface CellProps {
  animalId: string | null;
  onClick: () => void;
  isReadOnly: boolean;
  animals: Animal[];
}

const Cell: React.FC<CellProps> = ({ animalId, onClick, isReadOnly, animals }) => {
  const animal = animals.find((a) => a.id === animalId);

  const cellClasses = [
    'w-12 h-12',
    'flex items-center justify-center',
    'text-2xl font-bold rounded-md',
    isReadOnly
      ? 'bg-gray-200 dark:bg-gray-600'
      : 'bg-gray-100 dark:bg-gray-800 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-700',
  ].join(' ');

  return (
    <div
      className={cellClasses}
      onClick={!isReadOnly ? onClick : undefined}
    >
      {animal?.emoji}
    </div>
  );
};

export default Cell;