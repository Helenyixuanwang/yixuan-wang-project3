import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/register">Register</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;