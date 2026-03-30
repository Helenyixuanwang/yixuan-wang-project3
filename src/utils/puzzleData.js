// Simple valid 6x6 Sudoku generator with proper validation

// Check if placing num at (row, col) is valid
const isValidPlacement = (grid, row, col, num) => {
  // Check row
  for (let c = 0; c < 6; c++) {
    if (grid[row][c] === num) return false;
  }
  
  // Check column
  for (let r = 0; r < 6; r++) {
    if (grid[r][col] === num) return false;
  }
  
  // Check 2x3 sub-grid
  const boxRow = Math.floor(row / 2) * 2;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let r = boxRow; r < boxRow + 2; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (grid[r][c] === num) return false;
    }
  }
  
  return true;
};

// Fill grid using backtracking
const fillGrid = (grid) => {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (grid[row][col] === 0) {
        // Shuffle numbers 1-6
        const numbers = [1, 2, 3, 4, 5, 6];
        for (let i = numbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        
        for (let num of numbers) {
          if (isValidPlacement(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

// Generate a complete valid 6x6 solution
const generateSolution = () => {
  const grid = Array(6).fill(null).map(() => Array(6).fill(0));
  fillGrid(grid);
  return grid;
};

// Generate puzzle with exactly 18 given cells
export const getRandomEasy6x6 = () => {
  // Generate complete solution
  const solution = generateSolution();
  
  // Deep copy for puzzle
  const puzzle = solution.map(row => [...row]);
  
  // Create array of all positions
  const positions = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      positions.push({ r, c });
    }
  }
  
  // Shuffle positions
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  
  // Remove 18 cells (leaving 18 given cells)
  for (let i = 0; i < 18; i++) {
    const { r, c } = positions[i];
    puzzle[r][c] = 0;
  }
  
  // Convert to string format (0 -> '', number -> string)
  const puzzleStr = puzzle.map(row => 
    row.map(cell => cell === 0 ? '' : cell.toString())
  );
  
  const solutionStr = solution.map(row => 
    row.map(cell => cell.toString())
  );
  
  console.log('Generated 6x6 puzzle with', 
    puzzleStr.flat().filter(c => c !== '').length, 
    'given cells');
  
  return {
    puzzle: puzzleStr,
    solution: solutionStr
  };
};