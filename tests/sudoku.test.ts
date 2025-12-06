import { describe, it, expect } from 'vitest';
import {
  generatePuzzle,
  solvePuzzle,
  isMoveValid,
  getConflicts,
  emptyPuzzle,
} from '../src/utils/sudoku';
import { builtinAnimals } from '../src/data/builtinAnimals';
import { Puzzle } from '../src/types';

const animals = builtinAnimals.slice(0, 9);

describe('Sudoku Logic', () => {
  it('should generate a valid puzzle', () => {
    const puzzle = generatePuzzle('Easy', animals);
    expect(puzzle.board).toHaveLength(9);
    expect(puzzle.board[0]).toHaveLength(9);
  });

  it('should solve a puzzle', () => {
    const puzzle = generatePuzzle('Easy', animals);
    // FIX: Pass the entire puzzle object, not just the board.
    const solution = solvePuzzle(puzzle, animals);
    expect(solution).not.toBeNull();
  });

  it('should identify a valid move', () => {
    const puzzle = emptyPuzzle();
    expect(isMoveValid(puzzle, 0, 0, animals[0].id)).toBe(true);
  });

  it('should identify an invalid move', () => {
    const puzzle = emptyPuzzle();
    // FIX: Access the .board property of the puzzle object.
    puzzle.board[0][0] = animals[0].id;
    expect(isMoveValid(puzzle, 0, 1, animals[0].id)).toBe(false);
  });

  it('should get conflicts', () => {
    const puzzle = emptyPuzzle();
    // FIX: Access the .board property of the puzzle object.
    puzzle.board[0][0] = animals[0].id;
    puzzle.board[0][1] = animals[0].id;
    const conflicts = getConflicts(puzzle);
    expect(conflicts).toHaveLength(2);
  });
});
