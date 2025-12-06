# Animal Sudoku

A fun and engaging Sudoku game that replaces numbers with your favorite animals! Choose from a gallery of built-in animals or add your own custom emojis to create a unique and personalized puzzle experience.

## Features

-   **Animal Sudoku:** Play Sudoku with animals instead of numbers. The classic 9x9 grid and rules apply.
-   **User-Selectable Animals:** Choose any 9 animals from the built-in gallery or add your own custom emojis.
-   **Multiple Difficulty Levels:** Puzzles are available in Easy, Medium, and Hard difficulties.
-   **Interactive Gameplay:** Enjoy a smooth and intuitive gameplay experience with features like pencil mode, undo/redo, hints, and mistake checking.
-   **Light & Dark Themes:** Switch between light and dark themes to suit your preference.
-   **Persistence:** Your game state, selected animals, and settings are automatically saved to your browser's local storage.
-   **Sharing:** Share your favorite puzzles with friends using a unique URL that includes the puzzle and your custom animal set.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/animal-sudoku.git
cd animal-sudoku
npm install
```

## Available Commands

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run test`: Runs the tests.
-   `npm run preview`: Previews the production build.

## Directory Structure

```
.
├── public
├── src
│   ├── assets
│   ├── components
│   ├── data
│   ├── hooks
│   ├── i18n
│   ├── types
│   └── utils
├── tests
└── README.md
```

## Puzzle Engine

The Sudoku engine is located in `src/utils/sudoku.ts`. It's responsible for generating, solving, and validating puzzles. The engine uses a backtracking algorithm to create and solve the puzzles.

## Animal Selection

The animal selection logic is handled by the `AnimalSelector` component. Users can choose from a list of built-in animals or add their own custom emojis. The selected animals are stored in local storage and used to generate the puzzles.

## Sharing

The sharing system, located in `src/utils/share.ts`, encodes the puzzle state and the selected animal set into a Base64 string, which is then added to the URL. This allows users to share their puzzles with others.

## Themes

The application supports both light and dark themes. The theme can be changed using the theme toggle button. The user's theme preference is stored in local storage.
