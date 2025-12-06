# QA Report — Animal Sudoku

## Tests included
- `tests/sudoku.test.ts` — generator/solver/isMoveValid/getConflicts
- `tests/share.test.ts` — export/import round-trip
- `tests/animalSelection.test.ts` — selection persistence & limits

## Coverage (summary)
- Sudoku core logic: ✅ covered by unit tests
- Share/export/import: ✅ covered
- Animal selector: ✅ basic tests included (selection length validation + persistence)
- UI components: ⚠️ smoke-tested via manual checks; component unit tests limited
- End-to-end: ⚠️ Not included in CI by default (Playwright recommended as next step)

## How to run tests
```bash
npm ci
npm run test

Sample test output (stub)
$ npm run test

  ✓ sudoku core generates and solves (50ms)
  ✓ isMoveValid rejects invalid moves (5ms)
  ✓ share export/import roundtrip (8ms)
  ✓ animal selector persistence (6ms)

  4 passed, 0 failed

Outstanding manual verifications

Frontend rendering across browsers (Chrome, Firefox) — recommended manual check

SVG sanitization on custom upload — recommend production-hardening
