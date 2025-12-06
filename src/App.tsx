// src/App.tsx
import React, { useEffect, useState } from 'react'
import Grid from './components/Grid'
import Palette from './components/Palette'
import { emptyPuzzle, generatePuzzle, isMoveValid, solvePuzzle } from './utils/sudoku'
import { builtinAnimals } from './data/builtinAnimals'
import { exportPuzzle, importPuzzle } from './utils/share'
import TutorialOverlay from './components/TutorialOverlay'
import { Animal, SudokuBoard, Puzzle } from './types'

/**
 * Defensive App:
 * - safe initialisation
 * - fallback to generated puzzle if parsing fails
 * - smokeTest toggle to switch to minimal UI quickly
 */

export default function App() {
  const [smokeTest] = useState(false) // set true temporarily to use minimal UI
  const [animals, setAnimals] = useState(() => builtinAnimals.slice(0, 9))
  const [puzzle, setPuzzle] = useState<Puzzle>(() => {
    // Try localStorage parse safely
    try {
      const raw = localStorage.getItem('animal-sudoku-v1')
      if (!raw) return generatePuzzle('Easy', animals)
      const parsed = JSON.parse(raw)
      // Basic shape check
      if (!parsed.board || !Array.isArray(parsed.board) || parsed.board.length !== 9) return generatePuzzle('Easy', animals)
      return parsed
    } catch (e) {
      console.warn('Failed to load puzzle from storage, generating new one', e)
      return generatePuzzle('Easy', animals)
    }
  })

  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null)
  const [activeAnimal, setActiveAnimal] = useState<Animal | null>(animals[0] ?? null)
  const [pencil, setPencil] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('animal-sudoku-theme') === 'dark' ? 'dark' : 'light'))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '')
    localStorage.setItem('animal-sudoku-theme', theme)
  }, [theme])

  useEffect(() => {
    // persist puzzle safely
    try {
      const serial = JSON.stringify(puzzle)
      localStorage.setItem('animal-sudoku-v1', serial)
    } catch (e) {
      console.warn('Failed to save puzzle to storage', e)
    }
  }, [puzzle])

  // Simple place function with defensive cloning
  function place(r: number, c: number, id: string) {
    setPuzzle(prev => {
      if (!prev.board || !Array.isArray(prev.board) || prev.board.length !== 9) return prev
      const copy = {
        ...prev,
        board: prev.board.map(row => [...row]),
      };
      const cell = copy.board[r][c]
      if (pencil) {
        // Pencil mode not implemented yet
      } else {
        copy.board[r][c] = id
      }
      return copy
    })
  }

  function onSelectCell(r: number, c: number) {
    setSelected({ r, c })
  }

  function onPlaceSelectedCell() {
    if (!selected || !activeAnimal) return
    place(selected.r, selected.c, activeAnimal.id)
  }

  function newPuzzle(d: 'Easy' | 'Medium' | 'Hard') {
    setPuzzle(generatePuzzle(d, animals))
  }

  function hint() {
    const sol = solvePuzzle(puzzle, animals)
    if (!sol) return alert('No solution found')
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) if (!puzzle.board[r][c]) {
      place(r, c, sol.board[r][c]!)
      return
    }
  }

  function exportState() {
    try {
      const token = exportPuzzle(puzzle.board, animals)
      const url = `${location.origin}${location.pathname}?p=${token}`
      navigator.clipboard.writeText(url)
      alert('Share link copied to clipboard')
    } catch (e) {
      alert('Failed to export puzzle')
    }
  }

  // Parse incoming share token once on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search)
      const t = params.get('p')
      if (t) {
        const imported = importPuzzle(t)
        if (imported) {
          setPuzzle({ ...puzzle, board: imported.board })
          setAnimals(imported.animals)
        }
      }
    } catch (e) {
      // ignore
    }
  }, [])

  // Smoke test: minimal UI if developer toggles smokeTest flag
  if (smokeTest) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Minimal Smoke Test</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9,48px)', gap: 4 }}>
          {Array.from({ length: 81 }).map((_, i) => (
            <div key={i} style={{ width: 48, height: 48, border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {i % 9 === 0 ? '🐼' : ''}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Normal app UI
  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-800">
      <TutorialOverlay />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <button onClick={() => newPuzzle('Easy')} className="px-4 py-2 bg-blue-500 text-white rounded-lg">New</button>
              <select onChange={e => newPuzzle(e.target.value as any)} defaultValue="Easy" className="border px-2 py-1 rounded dark:bg-gray-600">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <button onClick={() => setPuzzle(generatePuzzle('Easy', animals))} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Reset</button>
            </div>

            <div className="flex gap-2 items-center">
              <label className="flex items-center gap-1"><input type="checkbox" checked={pencil} onChange={e => setPencil(e.target.checked)} /> Pencil</label>
              <label className="flex items-center gap-1"><input type="checkbox" checked={theme === 'dark'} onChange={e => setTheme(e.target.checked ? 'dark' : 'light')} /> Dark</label>
              <button onClick={() => hint()} className="px-4 py-2 bg-blue-500 text-white rounded-lg">💡 Hint</button>
              <button onClick={() => exportState()} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Share</button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Grid board={puzzle.board} onCellClick={onSelectCell} isReadOnly={puzzle.board.map(row => row.map(cell => cell !== null))} animals={animals} />
            <div className="mt-4 w-full">
              <Palette onSelect={animal => setActiveAnimal(animal)} selectedAnimal={activeAnimal} animals={animals} />
              <div className="mt-2">
                <button onClick={() => onPlaceSelectedCell()} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Place</button>
                <button onClick={() => setSelected(null)} className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2">Clear Selection</button>
              </div>
            </div>
          </div>
        </div>

        <aside className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Settings / Info</h3>
          <p className="text-sm text-gray-600 mt-2">Tips: select an animal from the palette then tap a cell. Use pencil mode for notes.</p>
          <div className="mt-4">
            <button onClick={() => {
              const s = solvePuzzle(puzzle, animals)
              if (s) setPuzzle(s)
            }} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Solve</button>
          </div>
        </aside>
      </div>
    </div>
  )
}