export interface Animal {
  id: string;
  name: string;
  emoji: string; // Can be an emoji or an SVG string
  source: 'builtin' | 'custom';
}

export type CellValue = string | null; // animal id

export type SudokuBoard = CellValue[][];

export type PencilMarks = {
  [key: string]: Set<string>; // key: "r-c", value: set of animal ids
};

export interface Puzzle {
  board: SudokuBoard;
  solution: SudokuBoard;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Conflict {
  row: number;
  col: number;
}
