function HighScores() {
  const scores = [
    { rank: 1, player: 'James Bond', completed: 487, time: '5:47' },
    { rank: 2, player: 'Robin Williams', completed: 423, time: '6:12' },
    { rank: 3, player: 'Sean Penn', completed: 398, time: '6:33' },
    { rank: 4, player: 'Bruce Lee', completed: 356, time: '6:58' },
    { rank: 5, player: 'Jet Li', completed: 312, time: '7:21' },
  ];

  return (
    <div className="page-container">
      <h2>🏆 High Scores Leaderboard</h2>
      
      <table className="scores-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Completed</th>
            <th>Best Time</th>
          </tr>
        </thead>
        <tbody>
          {scores.map(score => (
            <tr key={score.rank}>
              <td>{score.rank === 1 ? '🥇' : score.rank === 2 ? '🥈' : score.rank === 3 ? '🥉' : score.rank}</td>
              <td>{score.player}</td>
              <td>{score.completed}</td>
              <td>{score.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HighScores;