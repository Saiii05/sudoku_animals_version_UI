import { SudokuBoard, Puzzle, Animal, Conflict } from '../types';

const SIZE = 9;

export function emptyPuzzle(): SudokuBoard {
  return Array(SIZE).fill(null).map(() => Array(SIZE).fill(null));
}

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function isMoveValid(
  board: SudokuBoard,
  row: number,
  col: number,
  animalId: string,
): boolean {
  // Check row
  for (let c = 0; c < SIZE; c++) {
    if (board[row][c] === animalId) {
      return false;
    }
  }

  // Check column
  for (let r = 0; r < SIZE; r++) {
    if (board[r][col] === animalId) {
      return false;
    }
  }

  // Check 3x3 sub-grid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[startRow + r][startCol + c] === animalId) {
        return false;
      }
    }
  }

  return true;
}

function findEmpty(board: SudokuBoard): [number, number] | null {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === null) {
        return [r, c];
      }
    }
  }
  return null;
}

export function solvePuzzle(
  board: SudokuBoard,
  animals: Animal[]
): SudokuBoard | null {
  const find = findEmpty(board);
  let row, col;
  if (!find) {
    return board;
  } else {
    [row, col] = find;
  }

  const shuffledAnimals = shuffle([...animals]);

  for (const animal of shuffledAnimals) {
    if (isMoveValid(board, row, col, animal.id)) {
      board[row][col] = animal.id;

      if (solvePuzzle(board, animals)) {
        return board;
      }

      board[row][col] = null;
    }
  }

  return null;
}

export function generatePuzzle(
  difficulty: 'Easy' | 'Medium' | 'Hard',
  animals: Animal[]
): Puzzle {
  const board = emptyPuzzle();
  solvePuzzle(board, animals);
  const solution = JSON.parse(JSON.stringify(board));

  let cellsToRemove = 0;
  switch (difficulty) {
    case 'Easy':
      cellsToRemove = 40;
      break;
    case 'Medium':
      cellsToRemove = 50;
      break;
    case 'Hard':
      cellsToRemove = 60;
      break;
  }

  let attempts = cellsToRemove;
  while (attempts > 0) {
    const row = Math.floor(Math.random() * SIZE);
    const col = Math.floor(Math.random() * SIZE);

    if (board[row][col] !== null) {
      board[row][col] = null;
      attempts--;
    }
  }

  return { board, solution, difficulty };
}

export function getConflicts(board: SudokuBoard): Conflict[] {
  const conflicts: Conflict[] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const value = board[r][c];
      if (value === null) continue;
      board[r][c] = null; // Temporarily remove to check validity
      if (!isMoveValid(board, r, c, value)) {
        conflicts.push({ row: r, col: c });
      }
      board[r][c] = value; // Restore the value
    }
  }
  return conflicts;
}
