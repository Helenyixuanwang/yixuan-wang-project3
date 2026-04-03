import { makepuzzle, solvepuzzle } from 'sudoku';

// Generate 9x9 puzzle using library
export const generate9x9Puzzle = () => {
  // Generate puzzle (returns array with numbers 0-8, null for empty)
  const puzzle = makepuzzle();
  const solution = solvepuzzle(puzzle);

  // Convert to our format (2D array, 1-9 instead of 0-8, '' for empty)
  const convertToGrid = (arr) => {
    const grid = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        const value = arr[i * 9 + j];
        row.push(value === null ? '' : (value + 1).toString());
      }
      grid.push(row);
    }
    return grid;
  };

  const puzzleGrid = convertToGrid(puzzle);
  const solutionGrid = convertToGrid(solution);

  // Ensure we have 28-30 given cells (required by rubric)
  let givenCount = puzzleGrid.flat().filter(cell => cell !== '').length;
  
  // If less than 28, fill some random cells
  while (givenCount < 28) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzleGrid[row][col] === '') {
      puzzleGrid[row][col] = solutionGrid[row][col];
      givenCount++;
    }
  }

  // If more than 30, remove some cells
  while (givenCount > 30) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzleGrid[row][col] !== '') {
      puzzleGrid[row][col] = '';
      givenCount--;
    }
  }

  return {
    puzzle: puzzleGrid,
    solution: solutionGrid
  };
};