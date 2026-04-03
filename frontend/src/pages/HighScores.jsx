import { useState, useEffect } from 'react';

function HighScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const res = await fetch('/api/highscore', { credentials: 'include' });
      const data = await res.json();
      setScores(data);
    } catch (err) {
      setError('Failed to load scores');
    } finally {
      setLoading(false);
    }
  };

  const getRankEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return index + 1;
  };

  return (
    <div className="page-container">
      <h2>🏆 High Scores Leaderboard</h2>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading scores...</p>
      ) : scores.length === 0 ? (
        <p>No scores yet. Play some games!</p>
      ) : (
        <table className="scores-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={score.username}>
                <td>{getRankEmoji(index)}</td>
                <td>{score.username}</td>
                <td>{score.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HighScores;