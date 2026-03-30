import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { GameProvider } from './context/GameContext';  // ← Import

// Import page components
import Home from './pages/Home';
import Selection from './pages/Selection';
import GameEasy from './pages/GameEasy';
import GameNormal from './pages/GameNormal';
import Rules from './pages/Rules';
import HighScores from './pages/HighScores';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <GameProvider>  {/* ← Wrap everything with GameProvider */}
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Selection />} />
            <Route path="/games/easy" element={<GameEasy />} />
            <Route path="/games/normal" element={<GameNormal />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/scores" element={<HighScores />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </GameProvider>  {/* ← Close GameProvider */}
    </BrowserRouter>
  );
}

export default App;