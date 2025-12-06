import React, { useEffect, useState } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const savedTheme = loadFromLocalStorage<'light' | 'dark' | 'system'>('animal-sudoku-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveToLocalStorage('animal-sudoku-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length] as 'light' | 'dark' | 'system';
    setTheme(nextTheme);
  };

  return (
    <button onClick={toggleTheme} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
      Theme: {theme}
    </button>
  );
};

export default ThemeToggle;
