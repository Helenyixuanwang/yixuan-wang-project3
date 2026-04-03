import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

function Selection() {
  const { user } = useGame();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  // Fetch all games on page load
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch('/api/sudoku', { credentials: 'include' });
      const data = await res.json();
      setGames(data);
    } catch (err) {
      setError('Failed to load games');
    } finally {
      setLoading(false);
    }
  };

  const createGame = async (difficulty) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setCreating(true);
    try {
      const res = await fetch('/api/sudoku', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ difficulty })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      navigate(`/game/${data.gameId}`);
    } catch (err) {
      setError(err.message);
      setCreating(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="page-container">
      <h2>Select a Game</h2>

      {/* Create game buttons */}
      <div className="button-group">
        <button
          className="btn btn-primary"
          onClick={() => createGame('NORMAL')}
          disabled={creating}
        >
          {creating ? 'Creating...' : 'Create Normal Game'}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => createGame('EASY')}
          disabled={creating}
        >
          {creating ? 'Creating...' : 'Create Easy Game'}
        </button>
      </div>

      {!user && (
        <p className="info-message">Login to create or play games</p>
      )}

      {error && <p className="error-message">{error}</p>}

      {/* Games list */}
      <h3>Available Games</h3>
      {loading ? (
        <p>Loading games...</p>
      ) : games.length === 0 ? (
        <p>No games yet. Create one above!</p>
      ) : (
        <table className="scores-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Difficulty</th>
              <th>Created By</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game._id}>
                <td>{game.name}</td>
                <td>
                  <span className={`difficulty-badge ${game.difficulty.toLowerCase()}`}>
                    {game.difficulty}
                  </span>
                </td>
                <td>{game.createdBy}</td>
                <td>{formatDate(game.createdAt)}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/game/${game._id}`)}
                  >
                    Play
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Selection;