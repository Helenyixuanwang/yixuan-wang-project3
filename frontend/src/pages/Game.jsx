import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SudokuGrid from '../components/SudokuGrid';
import { useGame } from '../context/GameContext';

function Game() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { user, timer, formatTime, resetGame, initializeGame, isComplete } = useGame();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);

  useEffect(() => {
    fetchGame();
  }, [gameId]);

  // When game is completed, record the score
  useEffect(() => {
    if (isComplete && user && gameId && !alreadyCompleted) {
      recordScore();
    }
  }, [isComplete]);

  const fetchGame = async () => {
    try {
      const res = await fetch(`/api/sudoku/${gameId}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Game not found');
      const data = await res.json();
      setGameData(data);

      // Check if current user already completed this game
      if (user && data.completedBy.includes(user)) {
        setAlreadyCompleted(true);
        // Show solution directly
        initializeGame(9, data.solution.map(row => row.map(String)), data.solution.map(row => row.map(String)));
      } else {
        // Start the game with the board
        initializeGame(9, data.board.map(row => row.map(n => n === 0 ? '' : String(n))), data.solution.map(row => row.map(String)));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const recordScore = async () => {
    try {
      await fetch('/api/highscore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ gameId })
      });
    } catch (err) {
      console.error('Failed to record score:', err);
    }
  };

  if (loading) return <div className="page-container"><p>Loading game...</p></div>;
  if (error) return <div className="page-container"><p className="error-message">{error}</p></div>;

  return (
    <div className="page-container">
      <h2>{gameData?.name}</h2>
      <div className="game-info">
        <p>Difficulty: {gameData?.difficulty}</p>
        <p>Created by: {gameData?.createdBy}</p>
        {!alreadyCompleted && <p>Timer: {formatTime(timer)}</p>}
      </div>

      {alreadyCompleted && (
        <div className="completion-banner">
          ✅ You already completed this game!
        </div>
      )}

      {isComplete && !alreadyCompleted && (
        <div className="completion-banner">
          🎉 Congratulations! You completed this game!
        </div>
      )}

      <SudokuGrid size={9} onNewGame={() => navigate('/games')} />

      <div className="button-group">
        {!alreadyCompleted && (
          <button className="btn btn-secondary" onClick={resetGame}>Reset</button>
        )}
        <button className="btn btn-primary" onClick={() => navigate('/games')}>
          Back to Games
        </button>
      </div>
    </div>
  );
}

export default Game;