# Project 3 Writeup — Sudoku Dojo Full Stack

## Challenges

One of the biggest challenges was configuring the deployment on Render. Since the frontend and backend are separate, getting Express to serve the React build in production required careful path configuration and understanding how `NODE_ENV` affects the app behavior. Setting up cookie-based authentication to work correctly across both development and production environments was also tricky — cookies behave differently on HTTP vs HTTPS, requiring different `sameSite` and `secure` settings.

Another challenge was designing the game data model in MongoDB. Deciding how to track which users completed which games led to the `completedBy` array approach, which turned out to be elegant and efficient — no separate collection needed for highscores.

Generating valid Sudoku puzzles on the backend using a backtracking algorithm was also a learning experience. Ensuring the generated puzzles were always solvable required careful implementation of the solver.

Finally, restructuring the Project 2 React frontend into a full stack app required rethinking how state was managed — moving from local puzzle generation to fetching real game data from MongoDB by game ID.

## Additional Features

Given more time, I would add:
- A timer-based leaderboard showing fastest completion times per game
- The ability for users to see their personal game history
- A custom game creator where users can design their own puzzles (+10 bonus)
- Social features like challenging a friend to beat your score
- Dark mode toggle for better user experience
- Delete game button for game creators (+5 bonus)

## Assumptions

- Users are identified by username only, no email required
- Each game can be completed by multiple users independently
- Easy and Normal games both use a 9x9 grid, differentiated only by number of empty cells (30 for Easy, 50 for Normal)
- A game is considered "won" when the puzzle is fully and correctly completed with no errors
- Users who are not logged in can view all pages but cannot create or interact with games
- Game names are randomly generated using 3 random words from a predefined word list to ensure uniqueness

## Time to Complete

This assignment took approximately 15-20 hours to complete, including:
- Setting up the Express backend and MongoDB Atlas connection
- Implementing cookie-based authentication with bcrypt password hashing
- Building all RESTful APIs (user, sudoku, highscore)
- Adapting the Project 2 React frontend to connect to the backend APIs
- Debugging deployment issues on Render
- Testing the full stack end to end

## Bonus Points

### Password Encryption (+2 pts)
All user passwords are hashed using `bcryptjs` before being stored in MongoDB. Plain text passwords are never saved to the database. The implementation uses `bcrypt.hash()` during registration and `bcrypt.compare()` during login. Relevant code is in `backend/routes/userRoutes.js`.

## GitHub Repository
[https://github.com/Helenyixuanwang/yixuan-wang-project3](https://github.com/Helenyixuanwang/yixuan-wang-project3)

## Deployed App
[https://yixuan-wang-project3-server.onrender.com](https://yixuan-wang-project3-server.onrender.com)