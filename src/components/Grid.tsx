import React from 'react';
import Cell from './Cell';
import { SudokuBoard, Animal } from '../types';

interface GridProps {
  board: SudokuBoard;
  onCellClick: (row: number, col: number) => void;
  isReadOnly: boolean[][];
  animals: Animal[];
}

const Grid: React.FC<GridProps> = ({ board, onCellClick, isReadOnly, animals }) => {
  return (
    <div className="grid grid-cols-9 gap-1 bg-gray-300 dark:bg-gray-700 p-2 rounded-lg">
      {board.map((row, rowIndex) =>
        row.map((animalId, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            animalId={animalId}
            onClick={() => onCellClick(rowIndex, colIndex)}
            isReadOnly={isReadOnly[rowIndex][colIndex]}
            animals={animals}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
