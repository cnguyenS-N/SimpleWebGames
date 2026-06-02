# Game picker and Tic-Tac-Toe

This directory contains the game picker page plus the Tic-Tac-Toe play screen and JavaScript logic.

## Files

- `index.html` - Browser games picker page.
- `game.html` - Tic-Tac-Toe play screen with a 3x3 button grid.
- `game.js` - Tic-Tac-Toe state management, win detection, reset behavior, and computer move heuristic.

The shared Tic-Tac-Toe stylesheet currently lives at `../tic-tac-toe.css`, and the Tic-Tac-Toe intro page lives at `../tic-tac-toe.html`.

## Gameplay notes

- The player uses `X`; the computer uses `O`.
- The computer can take a winning move, block most immediate player wins, and otherwise favors the center, corners, then edges.
- The game reports wins, losses, and ties and disables the board after the game ends.

## Testing

Tic-Tac-Toe behavior is covered by the Node test harness in `../test/games.test.js`.
