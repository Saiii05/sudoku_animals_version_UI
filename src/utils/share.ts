import { Animal, SudokuBoard } from '../types';

export function exportPuzzle(board: SudokuBoard, animals: Animal[]): string {
  const data = {
    board: board.map(row => row.map(cell => cell || '.').join(',')).join('|'),
    animals,
  };
  const json = JSON.stringify(data);
  const encoded = btoa(encodeURIComponent(json));
  return encoded;
}

export function importPuzzle(data: string): { board: SudokuBoard; animals: Animal[] } | null {
  try {
    const decoded = decodeURIComponent(atob(data));
    const parsed = JSON.parse(decoded);

    const board: SudokuBoard = parsed.board.split('|').map((rowStr: string) =>
      rowStr.split(',').map((cellStr: string) => (cellStr === '.' ? null : cellStr))
    );

    const animals: Animal[] = parsed.animals;

    if (!Array.isArray(animals) || animals.length !== 9) {
      return null;
    }

    return { board, animals };
  } catch (error) {
    return null;
  }
}
