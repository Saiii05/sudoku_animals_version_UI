import React, { useState, useEffect, useCallback } from 'react';
import Grid from './components/Grid';
import Palette from './components/Palette';
import Toolbar from './components/Toolbar';
import AnimalSelector from './components/AnimalSelector';
import ThemeToggle from './components/ThemeToggle';
import TutorialOverlay from './components/TutorialOverlay';
import SoundToggle from './components/SoundToggle';
import { SudokuBoard, Animal } from './types';
import { generatePuzzle, emptyPuzzle } from './utils/sudoku';
import { builtinAnimals } from './data/builtinAnimals';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storage';
import { useUndoRedo } from './hooks/useUndoRedo';

const App: React.FC = () => {
  const {
    present: board,
    set: setBoard,
    undo: undoBoard,
    redo: redoBoard,
    reset: resetBoard,
    canUndo,
    canRedo,
  } = useUndoRedo<SudokuBoard>(emptyPuzzle());

  const [solution, setSolution] = useState<SudokuBoard>(emptyPuzzle());
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [isReadOnly, setIsReadOnly] = useState<boolean[][]>(
    Array(9).fill(null).map(() => Array(9).fill(false))
  );
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isAnimalSelectorOpen, setIsAnimalSelectorOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const tutorialDismissed = loadFromLocalStorage<boolean>('animal-sudoku-tutorial-dismissed');
    if (!tutorialDismissed) {
      setShowTutorial(true);
    }
  }, []);

  const newGame = useCallback((difficulty: 'Easy' | 'Medium' | 'Hard') => {
    const newPuzzle = generatePuzzle(difficulty, animals);
    resetBoard(newPuzzle.board);
    setSolution(newPuzzle.solution);
    const newIsReadOnly = newPuzzle.board.map(row => row.map(cell => cell !== null));
    setIsReadOnly(newIsReadOnly);
    setMistakes(0);
    setTime(0);
  }, [animals, resetBoard]);

  useEffect(() => {
    const savedAnimals = loadFromLocalStorage<Animal[]>('animal-sudoku-animals');
    if (savedAnimals && savedAnimals.length === 9) {
      setAnimals(savedAnimals);
    } else {
      setAnimals(builtinAnimals.slice(0, 9));
    }
  }, []);

  useEffect(() => {
    if (animals.length === 9) {
      newGame('Easy');
      saveToLocalStorage('animal-sudoku-animals', animals);
    }
  }, [animals, newGame]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (isReadOnly[row][col] || !selectedAnimal) {
      return;
    }

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = selectedAnimal.id;
    setBoard(newBoard);

    if (solution[row][col] !== selectedAnimal.id) {
      setMistakes(m => m + 1);
    }
  };

  const handleSolve = () => {
    setBoard(solution);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center">
      {showTutorial && <TutorialOverlay onClose={() => setShowTutorial(false)} />}
      <header className="p-4 text-center">
        <h1 className="text-4xl font-bold">Animal Sudoku</h1>
        <div className="flex justify-center space-x-4">
          <span>Mistakes: {mistakes}</span>
          <span>Time: {time}s</span>
        </div>
      </header>
      <div className="flex items-center">
        <Toolbar
          onOpenAnimalSelector={() => setIsAnimalSelectorOpen(true)}
          onUndo={undoBoard}
          onRedo={redoBoard}
          canUndo={canUndo}
          canRedo={canRedo}
          onReset={() => newGame('Easy')}
          onSolve={handleSolve}
        />
        <ThemeToggle />
        <SoundToggle />
      </div>
      <main className="p-4 flex items-center gap-8">
        <Grid board={board} onCellClick={handleCellClick} isReadOnly={isReadOnly} animals={animals} />
        <Palette onSelect={setSelectedAnimal} selectedAnimal={selectedAnimal} animals={animals} />
      </main>
      {isAnimalSelectorOpen && (
        <AnimalSelector
          selectedAnimals={animals}
          onSelectionChange={setAnimals}
          onClose={() => setIsAnimalSelectorOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
