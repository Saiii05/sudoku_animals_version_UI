import { describe, it, expect } from 'vitest';
import {
  generatePuzzle,
  solvePuzzle,
  isMoveValid,
  getConflicts,
  emptyPuzzle,
} from '../src/utils/sudoku';
import { builtinAnimals } from '../src/data/builtinAnimals';

const animals = builtinAnimals.slice(0, 9);

describe('Sudoku Logic', () => {
  it('should generate a valid puzzle', () => {
    const puzzle = generatePuzzle('Easy', animals);
    expect(puzzle.board).toHaveLength(9);
    expect(puzzle.board[0]).toHaveLength(9);
  });

  it('should solve a puzzle', () => {
    const puzzle = generatePuzzle('Easy', animals);
    const solution = solvePuzzle(puzzle.board, animals);
    expect(solution).not.toBeNull();
  });

  it('should identify a valid move', () => {
    const board = emptyPuzzle();
    expect(isMoveValid(board, 0, 0, animals[0].id)).toBe(true);
  });

  it('should identify an invalid move', () => {
    const board = emptyPuzzle();
    board[0][0] = animals[0].id;
    expect(isMoveValid(board, 0, 1, animals[0].id)).toBe(false);
  });

  it('should get conflicts', () => {
    const board = emptyPuzzle();
    board[0][0] = animals[0].id;
    board[0][1] = animals[0].id;
    const conflicts = getConflicts(board);
    expect(conflicts).toHaveLength(2);
  });
});
