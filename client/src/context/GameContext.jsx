import { createContext, useContext, useState, useEffect } from 'react';
import { soundManager } from '../utils/sounds';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};

export function GameProvider({ children }) {
  // Auth state
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Game state
  const [grid, setGrid] = useState([]);
  const [solution, setSolution] = useState([]);
  const [givenCells, setGivenCells] = useState([]);
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });
  const [gameSize, setGameSize] = useState(9);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Check if user is already logged in on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/user/isLoggedIn', {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.username);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Auth functions
  const login = async (username, password) => {
    const res = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    setUser(data.username);
    return data;
  };

  const register = async (username, password) => {
    const res = await fetch('/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    setUser(data.username);
    return data;
  };

  const logout = async () => {
    await fetch('/api/user/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
  };

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const initializeGame = (size, puzzle, puzzleSolution) => {
    setGameSize(size);
    setGrid(puzzle);
    setSolution(puzzleSolution);
    const given = puzzle.map(row => row.map(cell => cell !== ''));
    setGivenCells(given);
    setSelectedCell({ row: -1, col: -1 });
    setTimer(0);
    setIsTimerRunning(true);
    setIsComplete(false);
  };

  const updateCell = (row, col, value) => {
    if (givenCells[row]?.[col]) return;
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = value;
    setGrid(newGrid);
    checkCompletion(newGrid);
  };

  const isCellIncorrect = (row, col) => {
    const value = grid[row]?.[col];
    if (!value || value === '') return false;
    for (let c = 0; c < gameSize; c++) {
      if (c !== col && grid[row][c] === value) return true;
    }
    for (let r = 0; r < gameSize; r++) {
      if (r !== row && grid[r][col] === value) return true;
    }
    const subGridRows = gameSize === 9 ? 3 : 2;
    const subGridCols = gameSize === 9 ? 3 : 3;
    const startRow = Math.floor(row / subGridRows) * subGridRows;
    const startCol = Math.floor(col / subGridCols) * subGridCols;
    for (let r = startRow; r < startRow + subGridRows; r++) {
      for (let c = startCol; c < startCol + subGridCols; c++) {
        if (r === row && c === col) continue;
        if (grid[r][c] === value) return true;
      }
    }
    return false;
  };

  const checkCompletion = (currentGrid) => {
    const isFilled = currentGrid.every(row => row.every(cell => cell !== ''));
    if (!isFilled) return;
    let hasErrors = false;
    for (let r = 0; r < gameSize; r++) {
      for (let c = 0; c < gameSize; c++) {
        if (isCellIncorrect(r, c)) { hasErrors = true; break; }
      }
      if (hasErrors) break;
    }
    if (!hasErrors) {
      setIsComplete(true);
      setIsTimerRunning(false);
      soundManager.play('success');
    }
  };

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

  const selectCell = (row, col) => setSelectedCell({ row, col });

  const value = {
    // Auth
    user,
    authLoading,
    login,
    register,
    logout,
    // Game state
    grid,
    solution,
    givenCells,
    selectedCell,
    gameSize,
    timer,
    isTimerRunning,
    isComplete,
    // Game functions
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