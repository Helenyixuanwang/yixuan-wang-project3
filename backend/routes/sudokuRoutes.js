import express from 'express';
import Game from '../models/Game.js';

const router = express.Router();

// Word list for random game names
const words = [
  'Apple', 'Banana', 'Cherry', 'Dragon', 'Eagle', 'Forest', 'Galaxy', 'Harbor',
  'Island', 'Jungle', 'Kitten', 'Lemon', 'Mango', 'Nebula', 'Ocean', 'Panda',
  'Quartz', 'River', 'Sunset', 'Thunder', 'Umbrella', 'Violet', 'Walnut',
  'Xenon', 'Yellow', 'Zebra', 'Amber', 'Blaze', 'Cactus', 'Dagger', 'Ember',
  'Falcon', 'Glacier', 'Horizon', 'Ivory', 'Jasper', 'Kelp', 'Lantern', 'Maple',
  'Nomad', 'Orchid', 'Pepper', 'Quantum', 'Raven', 'Silver', 'Topaz', 'Ultra',
  'Vortex', 'Willow', 'Xray', 'Yarn', 'Zephyr', 'Arctic', 'Bronze', 'Coral',
  'Dust', 'Echo', 'Frost', 'Granite', 'Haze', 'Indigo', 'Jade', 'Karma',
  'Luna', 'Mystic', 'Nova', 'Opal', 'Pine', 'Quest', 'Ruby', 'Storm',
  'Terra', 'Umber', 'Vale', 'Wind', 'Apex', 'Bolt', 'Crane', 'Dawn',
  'Flare', 'Glow', 'Hawk', 'Iron', 'Jewel', 'Knot', 'Leaf', 'Mint',
  'Night', 'Onyx', 'Peak', 'Rain', 'Sand', 'Tide', 'Ursa', 'Vine',
  'Wave', 'Zen', 'Ash', 'Birch', 'Cloud', 'Dune', 'Elm', 'Fern'
];

// Generate a unique 3-word name
const generateGameName = () => {
  const shuffle = () => words[Math.floor(Math.random() * words.length)];
  return `${shuffle()} ${shuffle()} ${shuffle()}`;
};

// Generate a Sudoku board
// Returns { board, solution }
// board has some cells set to 0 (empty)
const generateBoard = (difficulty) => {
  // Create a solved board using backtracking
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

  const isValid = (grid, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num) return false;
      if (grid[i][col] === num) return false;
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (grid[boxRow][boxCol] === num) return false;
    }
    return true;
  };

  const solve = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          const nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
          for (const num of nums) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              if (solve(grid)) return true;
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  solve(grid);
  const solution = grid.map(row => [...row]);

  // Remove cells based on difficulty
  const cellsToRemove = difficulty === 'EASY' ? 30 : 50;
  const board = grid.map(row => [...row]);
  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col] !== 0) {
      board[row][col] = 0;
      removed++;
    }
  }

  return { board, solution };
};

// GET /api/sudoku - get all games
router.get('/sudoku', async (req, res) => {
  try {
    const games = await Game.find({}, 'name difficulty createdBy createdAt _id');
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// POST /api/sudoku - create a new game
router.post('/sudoku', async (req, res) => {
  const { difficulty } = req.body;
  const username = req.cookies.username;

  if (!username) {
    return res.status(401).json({ error: 'Must be logged in to create a game' });
  }
  if (!['EASY', 'NORMAL'].includes(difficulty)) {
    return res.status(400).json({ error: 'Invalid difficulty' });
  }

  try {
    const { board, solution } = generateBoard(difficulty);
    let name = generateGameName();

    // Ensure unique name
    let exists = await Game.findOne({ name });
    while (exists) {
      name = generateGameName();
      exists = await Game.findOne({ name });
    }

    const game = new Game({
      name,
      difficulty,
      board,
      solution,
      createdBy: username,
      completedBy: []
    });

    await game.save();
    res.json({ gameId: game._id, name });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create game' });
  }
});

// GET /api/sudoku/:gameId - get a specific game
router.get('/sudoku/:gameId', async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch game' });
  }
});

// PUT /api/sudoku/:gameId - update a game (mark as completed)
router.put('/sudoku/:gameId', async (req, res) => {
  const username = req.cookies.username;
  if (!username) {
    return res.status(401).json({ error: 'Must be logged in' });
  }
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    // Add user to completedBy if not already there
    if (!game.completedBy.includes(username)) {
      game.completedBy.push(username);
      await game.save();
    }
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update game' });
  }
});

// DELETE /api/sudoku/:gameId - delete a game
router.delete('/sudoku/:gameId', async (req, res) => {
  const username = req.cookies.username;
  if (!username) {
    return res.status(401).json({ error: 'Must be logged in' });
  }
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    if (game.createdBy !== username) {
      return res.status(403).json({ error: 'Only the creator can delete this game' });
    }
    await Game.findByIdAndDelete(req.params.gameId);
    res.json({ message: 'Game deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete game' });
  }
});

// GET /api/highscore - get all highscores
router.get('/highscore', async (req, res) => {
  try {
    const games = await Game.find({ completedBy: { $ne: [] } });
    const scoreMap = {};
    games.forEach(game => {
      game.completedBy.forEach(username => {
        scoreMap[username] = (scoreMap[username] || 0) + 1;
      });
    });
    const scores = Object.entries(scoreMap)
      .map(([username, wins]) => ({ username, wins }))
      .filter(s => s.wins > 0)
      .sort((a, b) => b.wins - a.wins || a.username.localeCompare(b.username));
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch highscores' });
  }
});

// GET /api/highscore/:gameId - get highscore for specific game
router.get('/highscore/:gameId', async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json({ gameId: req.params.gameId, completedBy: game.completedBy });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch highscore' });
  }
});

// POST /api/highscore - record a game completion
router.post('/highscore', async (req, res) => {
  const { gameId } = req.body;
  const username = req.cookies.username;
  if (!username) {
    return res.status(401).json({ error: 'Must be logged in' });
  }
  try {
    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    if (!game.completedBy.includes(username)) {
      game.completedBy.push(username);
      await game.save();
    }
    res.json({ message: 'Score recorded' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record score' });
  }
});

export default router;