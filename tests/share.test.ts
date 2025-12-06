import { describe, it, expect } from 'vitest';
import { exportPuzzle, importPuzzle } from '../src/utils/share';
import { builtinAnimals } from '../src/data/builtinAnimals';
import { generatePuzzle } from '../src/utils/sudoku';
import { Animal } from '../src/types';

const animals = builtinAnimals.slice(0, 9);
const customAnimals: Animal[] = [
  ...animals.slice(0, 8),
  { id: '🦖', name: 'T-Rex', emoji: '🦖', source: 'custom' },
];

describe('Share System', () => {
  it('should export and import a puzzle with built-in animals', () => {
    const puzzle = generatePuzzle('Easy', animals);
    const exported = exportPuzzle(puzzle.board, animals);
    const imported = importPuzzle(exported);
    expect(imported).not.toBeNull();
    if (imported) {
      expect(imported.board).toEqual(puzzle.board);
      expect(imported.animals).toEqual(animals);
    }
  });

  it('should export and import a puzzle with custom animals', () => {
    const puzzle = generatePuzzle('Easy', customAnimals);
    const exported = exportPuzzle(puzzle.board, customAnimals);
    const imported = importPuzzle(exported);
    expect(imported).not.toBeNull();
    if (imported) {
      expect(imported.board).toEqual(puzzle.board);
      expect(imported.animals).toEqual(customAnimals);
    }
  });

  it('should handle invalid data', () => {
    const imported = importPuzzle('invalid data');
    expect(imported).toBeNull();
  });
});
