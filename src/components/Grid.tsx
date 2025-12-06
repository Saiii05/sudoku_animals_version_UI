// src/components/Grid.tsx
import React from 'react'
import { SudokuBoard, Animal } from '../types'

type Props = {
  board: SudokuBoard
  onCellClick: (r: number, c: number) => void;
  isReadOnly: boolean[][]
  animals: Animal[]
}

export default function Grid({ board, onCellClick, isReadOnly, animals }: Props) {
  // Safety: ensure puzzle shape
  if (!Array.isArray(board) || board.length !== 9) {
    return <div style={{ color: '#b91c1c' }}>Invalid puzzle data — cannot render grid.</div>
  }

  return (
    <div className="grid grid-cols-9 gap-1 bg-gray-300 dark:bg-gray-700 p-2 rounded-lg">
      {board.map((row, r) =>
        row.map((cell, c) => (
          <CellView
            key={`${r}-${c}`}
            r={r}
            c={c}
            cellValue={cell}
            onClick={() => onCellClick(r, c)}
            isReadOnly={isReadOnly[r][c]}
            animals={animals}
          />
        ))
      )}
    </div>
  )
}

function CellView({ r, c, cellValue, onClick, isReadOnly, animals }: any) {
  const animal = animals.find((a: any) => a.id === cellValue);

  const cellClasses = [
    'w-12 h-12',
    'flex items-center justify-center',
    'text-2xl font-bold rounded-md',
    isReadOnly
      ? 'bg-gray-200 dark:bg-gray-600'
      : 'bg-gray-100 dark:bg-gray-800 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-700',
  ].join(' ');

  return (
    <button
      className={cellClasses}
      onClick={onClick}
      aria-label={`cell ${r + 1}-${c + 1}`}
      data-row={r}
      data-col={c}
    >
      {animal?.emoji}
    </button>
  )
}