import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // ← Add this import
import SudokuGrid from '../components/SudokuGrid';
import { useGame } from '../context/GameContext';
import { generate9x9Puzzle } from '../utils/sudokuGenerator';

function GameNormal() {
  const navigate = useNavigate();  // ← Add this
  const { timer, formatTime, resetGame, initializeGame } = useGame();

  const startNewGame = () => {
    const { puzzle, solution } = generate9x9Puzzle();
    initializeGame(9, puzzle, solution);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleNewGame = () => {  // ← Add this function
    navigate('/games/normal');
    setTimeout(() => {
      startNewGame();
    }, 10);
  };

  return (
    <div className="page-container">
      <h2>Normal Game - 9x9 Grid</h2>
      <div className="game-info">
        <p>Difficulty: Normal</p>
        <p>Timer: {formatTime(timer)}</p>
      </div>
      
      <SudokuGrid size={9} onNewGame={handleNewGame} />  {/* ← Pass handler */}
      
      <div className="button-group">
        <button className="btn btn-secondary" onClick={resetGame}>Reset</button>
        <button className="btn btn-primary" onClick={handleNewGame}>New Game</button>  {/* ← Use handler */}
      </div>
    </div>
  );
}

export default GameNormal;