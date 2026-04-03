import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // ← Add this import
import SudokuGrid from '../components/SudokuGrid';
import { useGame } from '../context/GameContext';
import { getRandomEasy6x6 } from '../utils/puzzleData';

function GameEasy() {
  const navigate = useNavigate();  // ← Add this
  const { timer, formatTime, resetGame, initializeGame } = useGame();

  const startNewGame = () => {
    const { puzzle, solution } = getRandomEasy6x6();
    initializeGame(6, puzzle, solution);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleNewGame = () => {  // ← Add this function
    navigate('/games/easy');
    setTimeout(() => {
      startNewGame();
    }, 10);
  };

  return (
    <div className="page-container">
      <h2>Easy Game - 6x6 Grid</h2>
      <div className="game-info">
        <p>Difficulty: Easy</p>
        <p>Timer: {formatTime(timer)}</p>
      </div>
      
      <SudokuGrid size={6} onNewGame={handleNewGame} />  {/* ← Pass handler */}
      
      <div className="button-group">
        <button className="btn btn-secondary" onClick={resetGame}>Reset</button>
        <button className="btn btn-primary" onClick={handleNewGame}>New Game</button>  {/* ← Use handler */}
      </div>
    </div>
  );
}

export default GameEasy;