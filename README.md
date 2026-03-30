# Sudoku Dojo - Project 2

**Author:** Helen Wang (Yixuan Wang)  
**Course:** CS5610 Web Development  
**Semester:** Spring 2026

## Project Links

- **Live Application:** https://yixuan-wang-sudoku.onrender.com
- **GitHub Repository:** https://github.com/Helenyixuanwang/yixuan-wang-project2
- **Video Walkthrough:** https://www.youtube.com/watch?v=1SyvdSQ1-Eg

## Project Overview

This is a React-based Sudoku game with two difficulty levels: Easy (6×6 grid) and Normal (9×9 grid). The game features real-time validation, a timer, puzzle generation, and celebration effects upon completion.

## Features

- **Two Game Modes:**
  - Easy: 6×6 grid with 18 pre-filled cells
  - Normal: 9×9 grid with 28-30 pre-filled cells
  
- **Core Functionality:**
  - Real-time validation with visual feedback (red borders for invalid moves)
  - Timer that starts automatically
  - New Game and Reset buttons
  - Win detection with confetti celebration and frosted glass modal
  - Pre-filled cells are locked (not editable)
  - User inputs are validated (only 1-6 or 1-9 allowed)

- **Technical Implementation:**
  - React with Context API for state management
  - React Router for navigation
  - Puzzle generation using backtracking algorithm (6×6) and sudoku library (9×9)
  - Responsive design for mobile and desktop
  - Canvas-confetti for celebration effects

## Tech Stack

- **Frontend:** React 18, React Router 6
- **Build Tool:** Vite 7
- **Styling:** Custom CSS with CSS Grid and Flexbox
- **Libraries:** 
  - `sudoku` - for 9×9 puzzle generation
  - `canvas-confetti` - for celebration effects
  - `howler` - for sound effects 
- **Deployment:** Render (Static Site)
- **Version Control:** Git & GitHub

## Installation & Setup
```bash
# Clone the repository
git clone https://github.com/Helenyixuanwang/yixuan-wang-project2.git

# Navigate to project directory
cd yixuan-wang-project2

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Design Decisions

### State Management
I used React Context API to manage all game state (grid, timer, validation, completion status) as required by the rubric. This allows components like `Cell` to communicate with parent components without prop drilling, and enables child-to-parent data flow through Context rather than callback functions.

### Puzzle Generation
- **6×6 puzzles:** Implemented custom backtracking algorithm to generate valid puzzles with exactly 18 given cells
- **9×9 puzzles:** Used the `sudoku` npm library for reliable puzzle generation with 28-30 given cells

Both approaches ensure every puzzle has a unique, valid solution.

### Component Architecture
The project follows React best practices with small, reusable components:
- `Cell` - Individual cell with input validation
- `SudokuGrid` - Grid container with layout logic and win detection
- `Navbar` - Navigation across all pages with active state highlighting
- Page components for each route (Home, Selection, Game pages, Rules, etc.)

### Validation Strategy
Real-time validation checks three Sudoku rules:
1. No duplicates in the same row
2. No duplicates in the same column  
3. No duplicates in the same sub-grid (3×3 for 9×9, 2×3 for 6×6)

Invalid cells are immediately highlighted in red, providing instant feedback to users.

### User Experience
- **Celebration Modal:** Implemented a frosted glass effect modal with confetti animation when puzzle is completed
- **Responsive Design:** Grid cells resize appropriately on mobile devices while maintaining sub-grid borders
- **Timer:** Auto-starts when game loads and displays completion time in the celebration modal

## Challenges & Solutions

### Challenge 1: Context API Data Flow
**Problem:** Needed child-to-parent communication without using callback functions as per rubric requirements  
**Solution:** Used Context API's `updateCell` function that components can call directly, allowing bidirectional data flow while maintaining unidirectional architecture

### Challenge 2: Puzzle Validation
**Problem:** Initial manually-created 6×6 puzzles had validation errors (duplicate values in sub-grids)  
**Solution:** Implemented a backtracking algorithm with built-in validation to generate mathematically correct puzzles every time. The algorithm validates row, column, and sub-grid constraints before placing each number.

### Challenge 3: Responsive Grid Layout
**Problem:** 9×9 grid was too large on mobile devices (81 cells difficult to interact with on small screens)  
**Solution:** Used CSS Grid with media queries to resize cells based on screen width (50px on desktop, 35px on mobile) while maintaining proper sub-grid borders using thick border classes applied conditionally

### Challenge 4: Render Deployment
**Problem:** Initial Web Service deployment failed with port binding issues  
**Solution:** Switched to Static Site deployment which is more appropriate for frontend-only React applications. This simplified the deployment process and improved performance.

## What I Learned

1. **Context API Mastery:** Learned how to use React Context for global state management, how it enables child-to-parent communication without prop drilling, and how it compares to other state management solutions

2. **Algorithm Implementation:** Gained hands-on experience implementing backtracking algorithms for puzzle generation, including validation logic and recursion patterns

3. **React Router:** Deepened understanding of client-side routing, nested routes, and how NavLink components automatically handle active states

4. **Component Design:** Practiced creating reusable, single-purpose components that follow React best practices and the single responsibility principle

5. **Deployment Workflows:** Learned the differences between static hosting (GitHub Pages), static site deployment (Render Static), and server-side deployment (Render Web Service), and when to use each approach

6. **CSS Advanced Techniques:** Implemented frosted glass effects using backdrop-filter, created responsive grids with dynamic sub-grid borders, and built animated modals

7. **Audio Integration:** Learned how to use Howler.js for web audio and trigger sounds based on game events 

## Bonus Points Attempted

- [x] **Backtracking Algorithm (4 points):** Implemented custom backtracking algorithm for 6×6 puzzle generation in `src/utils/puzzleData.js`. The algorithm fills the grid recursively while validating Sudoku constraints (no duplicates in rows, columns, or 2×3 sub-grids).
- [x] **Early Submission (2 points):** Submitted 48+ hours before the deadline
- [ ] LocalStorage persistence (3 points) - Not attempted
- [ ] Hint system (5 points) - Not attempted

### Backtracking Implementation Details:
The algorithm works by:
1. Generating a complete valid solution using recursive backtracking
2. Trying numbers 1-6 in random order for each empty cell
3. Validating against row, column, and sub-grid constraints
4. Backtracking when no valid number can be placed
5. Removing exactly 18 cells from the solution to create the puzzle

Code location: `src/utils/puzzleData.js` - functions `isValidPlacement()`, `fillGrid()`, and `getRandomEasy6x6()`

## Resources Used

- React Documentation: https://react.dev
- Anthropic Claude: For debugging, algorithm suggestions, and code review
- MDN Web Docs: For CSS Grid and JavaScript reference
- Sudoku npm package: https://www.npmjs.com/package/sudoku
- Canvas Confetti: https://www.npmjs.com/package/canvas-confetti
- Render Documentation: https://render.com/docs

## Future Improvements

- Add difficulty selection on the selection page (currently hardcoded Easy/Normal links)
- Implement localStorage to save game progress and resume later
- Add a hint system that highlights cells with only one valid option
- Track and display real high scores with completion times
- Add sound effects for cell input, invalid moves
- Implement undo/redo functionality
- Add keyboard navigation for cell selection
- Create multiple puzzle difficulty levels within each grid size

---

**Made with ❤️ by Helen Wang (Yixuan Wang)**