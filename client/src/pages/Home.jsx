import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page-container text-center">
      <h1>Sudoku Dojo</h1>
      <h2>Welcome to Sudoku!</h2>
      <p>Challenge your mind with classic number puzzles</p>
      <div className="button-group">
        <Link to="/games" className="btn btn-primary">Start Playing</Link>
        <Link to="/rules" className="btn btn-secondary">Learn Rules</Link>
      </div>
    </div>
  );
}

export default Home;