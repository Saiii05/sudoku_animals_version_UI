// src/utils/sudoku.ts
import { Puzzle, Animal } from '../types';
import { builtinAnimals } from '../data/builtinAnimals';

export const SIZE = 9
export const BOX = 3

// Create a proper independent 9x9 puzzle (no shared references)
export function emptyPuzzle(): Puzzle {
  return {
    board: Array.from({ length: SIZE }, () =>
      Array.from({ length: SIZE }, () => null)
    ),
    solution: Array.from({ length: SIZE }, () =>
      Array.from({ length: SIZE }, () => null)
    ),
    difficulty: 'Easy',
  };
}

// helpers
function inRow(p: Puzzle, r: number, v: string) {
  return p.board[r].some(c => c === v)
}
function inCol(p: Puzzle, c: number, v: string) {
  return p.board.some(row => row[c] === v)
}
function inBox(p: Puzzle, r: number, c: number, v: string) {
  const br = Math.floor(r / BOX) * BOX
  const bc = Math.floor(c / BOX) * BOX
  for (let i = 0; i < BOX; i++) for (let j = 0; j < BOX; j++) if (p.board[br + i][bc + j] === v) return true
  return false
}

export function isMoveValid(p: Puzzle, row: number, col: number, animalId: string) {
  if (!p || !Array.isArray(p.board) || row < 0 || col < 0) return false
  if (inRow(p, row, animalId)) return false
  if (inCol(p, col, animalId)) return false
  if (inBox(p, row, col, animalId)) return false
  return true
}

export function getConflicts(p: Puzzle) {
  const conflicts: { r: number; c: number }[] = []
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
    const val = p.board[r][c]
    if (!val) continue
    // temporarily clear to test conflict
    p.board[r][c] = null
    if (!isMoveValid(p, r, c, val)) conflicts.push({ r, c })
    p.board[r][c] = val
  }
  return conflicts
}

// Solve via backtracking — returns a deep clone of solved puzzle or null
export function solvePuzzle(puzzle: Puzzle, animals: Animal[]) {
  const p = {
    ...puzzle,
    board: puzzle.board.map(row => [...row]),
  };

  function findEmpty() {
    for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) if (!p.board[r][c]) return [r, c] as const
    return null
  }

  const ids = animals.map(a => a.id)

  function backtrack(): boolean {
    const pos = findEmpty()
    if (!pos) return true
    const [r, c] = pos
    for (const id of shuffle(ids)) {
      if (isMoveValid(p, r, c, id)) {
        p.board[r][c] = id
        if (backtrack()) return true
        p.board[r][c] = null
      }
    }
    return false
  }

  const ok = backtrack()
  if (!ok) return null
  return p
}

function shuffle<T>(arr: T[]) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Simple generator: fill diag boxes and solve, then remove cells
export function generatePuzzle(difficulty: 'Easy' | 'Medium' | 'Hard' = 'Easy', animals: Animal[]) {
  const base = emptyPuzzle()

  const solved = solvePuzzle(base, animals)
  if (!solved) throw new Error('Failed to generate base solved board')

  const puzzle = {
    ...solved,
    board: solved.board.map(row => [...row]),
  };
  let removeCount = difficulty === 'Easy' ? 36 : difficulty === 'Medium' ? 46 : 54
  while (removeCount > 0) {
    const r = Math.floor(Math.random() * SIZE)
    const c = Math.floor(Math.random() * SIZE)
    if (!puzzle.board[r][c]) continue
    puzzle.board[r][c] = null
    removeCount--
  }
  return puzzle
}