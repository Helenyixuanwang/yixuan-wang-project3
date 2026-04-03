import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// GET /api/user/isLoggedIn
router.get('/isLoggedIn', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.json({ username });
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
});

// POST /api/user/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if username already exists
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = new User({ username, password: hashedPassword });
    await user.save();
    // Set cookie
    res.cookie('username', username, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.json({ username });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/user/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    // Set cookie
    res.cookie('username', username, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production'
  }); 
    res.json({ username });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// POST /api/logout
router.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.json({ message: 'Logged out' });
});

export default router;