# Animal Sudoku — Submission Package

## Summary
This repository contains the complete Animal Sudoku web application (React + TypeScript + Vite + Tailwind). The app replaces Sudoku digits with animals, supports custom animal selection, persistence, sharing, themes, sound toggle, an animated tutorial, and a full test suite.

## Quick start
```bash
npm install
npm run dev
# open http://localhost:5173

Tests
npm run test

Important troubleshooting

If the UI renders blank, open browser DevTools Console (F12) and check for the first error. The app includes an ErrorBoundary that surfaces render-time exceptions.

To run a minimal smoke test, in src/App.tsx set const [smokeTest] = useState(true). This renders a small static grid for verification.

Project structure

src/components/ — UI components (Grid, Palette, TutorialOverlay, ErrorBoundary, etc.)

src/utils/ — sudoku engine, share/storage helpers

src/data/ — animals list & sample puzzles

tests/ — Vitest tests for core logic and sharing

Known limitations

Puzzle generator does not enforce absolute uniqueness for every generated puzzle (reasonable tradeoff for speed). Unit tests validate solver/generator consistency.

Custom SVG upload sanitization is basic; production environment should sanitize and sanitize again.

Contact

If you need help running the project or encounter issues, include console error text and I will help iterate.
