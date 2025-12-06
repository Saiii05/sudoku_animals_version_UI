import React from 'react';

interface ToolbarProps {
  onOpenAnimalSelector: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onReset: () => void;
  onSolve: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onOpenAnimalSelector,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onReset,
  onSolve,
}) => {
  return (
    <div className="flex justify-center space-x-2 p-4">
      <button onClick={onReset} className="px-4 py-2 bg-blue-500 text-white rounded-lg">New Game</button>
      <button onClick={onUndo} disabled={!canUndo} className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400">Undo</button>
      <button onClick={onRedo} disabled={!canRedo} className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400">Redo</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Pencil</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Hint</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Check Mistakes</button>
      <button onClick={onSolve} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Solve</button>
      <button onClick={onReset} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Reset</button>
      <button onClick={onOpenAnimalSelector} className="px-4 py-2 bg-purple-500 text-white rounded-lg">Select Animals</button>
    </div>
  );
};

export default Toolbar;
