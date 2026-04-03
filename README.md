# Sudoku Dojo - Full Stack

A full stack Sudoku web application built with React, Express, and MongoDB.

## Live Demo
[Deployed App](https://yixuan-wang-project3-server.onrender.com)

## Features
- 🎮 Create and play Sudoku games (Easy and Normal difficulty)
- 👤 User authentication with cookie-based sessions
- 🏆 High scores leaderboard
- 💾 Persistent game data stored in MongoDB
- 🔒 Bcrypt password hashing
- 📱 Responsive design for mobile and desktop

## Tech Stack
**Frontend:**
- React 19
- React Router v7
- Vite

**Backend:**
- Node.js
- Express 4
- MongoDB Atlas
- Mongoose
- bcryptjs
- cookie-parser

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account

### Installation

**Server:**
```bash
cd server
npm install
npm run dev
```

**Client:**
```bash
cd client
npm install
npm run dev
```

### Environment Variables
Create `server/.env`:
```
MONGO_URI=your_mongodb_connection_string
COOKIE_SECRET=your_secret_key
PORT=5001
```

## Pages
- `/` - Home page
- `/games` - Game selection and creation
- `/game/:gameId` - Play a specific game
- `/rules` - Game rules and credits
- `/scores` - High scores leaderboard
- `/login` - User login
- `/register` - User registration

## Author
Helen Wang
- [GitHub](https://github.com/Helenyixuanwang)
- [LinkedIn](https://www.linkedin.com/in/helenyixuanwang/)