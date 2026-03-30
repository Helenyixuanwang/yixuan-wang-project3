import { Link } from 'react-router-dom';

function Selection() {
  const games = [
    { id: 1, title: 'Easy Sudoku', difficulty: 'Easy', size: '6x6', author: 'Piper', link: '/games/easy' },
    { id: 2, title: 'Normal Sudoku', difficulty: 'Normal', size: '9x9', author: 'Michael Jackson', link: '/games/normal' },
    { id: 3, title: 'Expert Challenge', difficulty: 'Hard', size: '9x9', author: 'Alysa Liu', link: '/games/normal' },
    { id: 4, title: 'Quick Game', difficulty: 'Easy', size: '6x6', author: 'Robbin Williams', link: '/games/easy' },
  ];

  return (
    <div className="page-container">
      <h2>Select a Game</h2>
      <div className="game-cards">
        {games.map(game => (
          <div key={game.id} className="game-card">
            <h3>{game.title}</h3>
            <span className={`difficulty-badge ${game.difficulty.toLowerCase()}`}>
              {game.difficulty}
            </span>
            <p className="game-size">{game.size} Grid</p>
            <p className="game-author">Created by: {game.author}</p>
            <Link to={game.link} className="btn btn-primary">Play Now</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Selection;