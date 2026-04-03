import { NavLink, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useGame();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src="/images/icons8-sudoku-64.png" alt="Sudoku Icon" className="nav-logo" />
        <h1>Sudoku Dojo</h1>
      </div>

      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/games">Play</NavLink></li>
        <li><NavLink to="/rules">Rules</NavLink></li>
        <li><NavLink to="/scores">High Scores</NavLink></li>
        {user ? (
          <>
            <li className="nav-username">👤 {user}</li>
            <li>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;