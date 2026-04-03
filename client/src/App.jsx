import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { GameProvider } from './context/GameContext';

import Home from './pages/Home';
import Selection from './pages/Selection';
import Game from './pages/Game';
import Rules from './pages/Rules';
import HighScores from './pages/HighScores';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Selection />} />
            <Route path="/game/:gameId" element={<Game />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/scores" element={<HighScores />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;