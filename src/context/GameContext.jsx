import { createContext, useContext, useState, useEffect } from 'react';
import { soundManager } from '../utils/sounds';

// Create the context
const GameContext = createContext();

// Custom hook to use the context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// Provider component
export function GameProvider({ children }) {
  // Game state
  const [grid, setGrid] = useState([]);
  const [solution, setSolution] = useState([]);
  const [givenCells, setGivenCells] = useState([]);
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });
  const [gameSize, setGameSize] = useState(9);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning && !isComplete) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isComplete]);

  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Initialize a new game
  const initializeGame = (size, puzzle, puzzleSolution) => {
    setGameSize(size);
    setGrid(puzzle);
    setSolution(puzzleSolution);
    
    // Mark given cells (pre-filled cells)
    const given = puzzle.map(row => 
      row.map(cell => cell !== '')
    );
    setGivenCells(given);
    
    // Reset game state
    setSelectedCell({ row: -1, col: -1 });
    setTimer(0);
    setIsTimerRunning(true);
    setIsComplete(false);
  };

  // Update a cell value
  const updateCell = (row, col, value) => {
    if (givenCells[row]?.[col]) return; // Can't change given cells
    
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = value;
    setGrid(newGrid);

    // Check if game is complete
    checkCompletion(newGrid);
  };

  // Check if cell value is incorrect
  // Check if cell value is incorrect
const isCellIncorrect = (row, col) => {
  const value = grid[row]?.[col];
  if (!value || value === '') return false;

  // Check row
  for (let c = 0; c < gameSize; c++) {
    if (c !== col && grid[row][c] === value) return true;
  }

  // Check column
  for (let r = 0; r < gameSize; r++) {
    if (r !== row && grid[r][col] === value) return true;
  }

  // Check sub-grid
  const subGridRows = gameSize === 9 ? 3 : 2;
  const subGridCols = gameSize === 9 ? 3 : 3;
  const startRow = Math.floor(row / subGridRows) * subGridRows;
  const startCol = Math.floor(col / subGridCols) * subGridCols;

  for (let r = startRow; r < startRow + subGridRows; r++) {
    for (let c = startCol; c < startCol + subGridCols; c++) {
      // Skip the current cell
      if (r === row && c === col) continue;
      // Check for duplicate
      if (grid[r][c] === value) return true;
    }
  }

  return false;
};

  // Check if the game is complete and correct
  const checkCompletion = (currentGrid) => {
    // Check if all cells are filled
    const isFilled = currentGrid.every(row => 
      row.every(cell => cell !== '')
    );

    if (!isFilled) return;

    // Check if no cells are incorrect
    let hasErrors = false;
    for (let r = 0; r < gameSize; r++) {
      for (let c = 0; c < gameSize; c++) {
        if (isCellIncorrect(r, c)) {
          hasErrors = true;
          break;
        }
      }
      if (hasErrors) break;
    }

    if (!hasErrors) {
      setIsComplete(true);
      setIsTimerRunning(false);
       soundManager.play('success'); 
    }
  };

  // Reset game to initial state
  const resetGame = () => {
    const initialGrid = givenCells.map((row, r) =>
      row.map((isGiven, c) => isGiven ? grid[r][c] : '')
    );
    setGrid(initialGrid);
    setSelectedCell({ row: -1, col: -1 });
    setTimer(0);
    setIsTimerRunning(true);
    setIsComplete(false);
  };

  // Select a cell
  const selectCell = (row, col) => {
    setSelectedCell({ row, col });
  };

  // Context value
  const value = {
    // State
    grid,
    solution,
    givenCells,
    selectedCell,
    gameSize,
    timer,
    isTimerRunning,
    isComplete,
    
    // Functions
    initializeGame,
    updateCell,
    isCellIncorrect,
    resetGame,
    selectCell,
    formatTime,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}