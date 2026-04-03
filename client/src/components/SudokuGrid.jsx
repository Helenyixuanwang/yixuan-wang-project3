import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useGame } from '../context/GameContext';
import Cell from './Cell';
import './SudokuGrid.css';

function SudokuGrid({ size = 9, onNewGame }) {
  const { 
    grid, 
    givenCells, 
    selectedCell, 
    updateCell, 
    selectCell,
    isCellIncorrect,
    isComplete,
    timer,
    formatTime
  } = useGame();

  const subGridRows = size === 9 ? 3 : 2;
  const subGridCols = size === 9 ? 3 : 3;

  const handleCloseModal = () => {
  // You could add a state here if you want to hide it completely
  // For now, clicking will just let them see the board
};

  // Trigger confetti when puzzle is complete
  useEffect(() => {
    if (isComplete) {
      // First burst of confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Second burst from left
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
      }, 250);
      
      // Third burst from right
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    }
  }, [isComplete]);

  const handleCellChange = (row, col, value) => {
    updateCell(row, col, value);
  };

  const handleCellClick = (row, col) => {
    selectCell(row, col);
  };

  const getCellClassName = (row, col) => {
    const classes = [];
    
    if (size === 9) {
      if (col === 2 || col === 5) {
        classes.push('border-right-thick');
      }
      if (row === 2 || row === 5) {
        classes.push('border-bottom-thick');
      }
    } else if (size === 6) {
      if (col === 2) {
        classes.push('border-right-thick');
      }
      if (row === 1 || row === 3) {
        classes.push('border-bottom-thick');
      }
    }
    
    return classes.join(' ');
  };

  if (!grid || grid.length === 0) {
    return <div>Loading game...</div>;
  }

  return (
  <div className="sudoku-grid-container">
    {/* MODAL OVERLAY - Shows when puzzle is complete */}
    {isComplete && (
  <div className="congratulations-overlay">
    <div className="congratulations">
      <div className="congratulations-emoji">🎉</div>
      <div className="congratulations-content">
        <h2>Congratulations!</h2>
        <p>You solved the puzzle!</p>
        <p>Time: {formatTime(timer)}</p>
        <button 
          className="btn btn-primary" 
          onClick={onNewGame}
          style={{ marginTop: '1.5rem' }}
        >
          🎮 Play Again
        </button>
      </div>
    </div>
  </div>
)}
    
    {/* SUDOKU GRID */}
    <div className={`sudoku-grid grid-${size}x${size}`}>
      {grid.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className={getCellClassName(rowIndex, colIndex)}>
            <Cell
              value={cellValue}
              isGiven={givenCells[rowIndex]?.[colIndex] || false}
              isSelected={selectedCell.row === rowIndex && selectedCell.col === colIndex}
              isIncorrect={isCellIncorrect(rowIndex, colIndex)}
              onChange={handleCellChange}
              onClick={handleCellClick}
              row={rowIndex}
              col={colIndex}
              maxValue={size}
            />
          </div>
        ))
      )}
    </div>
  </div>
);
}

export default SudokuGrid;