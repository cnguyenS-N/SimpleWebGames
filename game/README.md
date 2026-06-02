# Tic-Tac-Toe play screen

This directory contains `game.html`, the play screen for the Tic-Tac-Toe game. It was moved under `game/` from the repository root, while the game landing page and shared assets remain alongside the root README.

## Related files

- `../tic-tac-toe.html` - Tic-Tac-Toe landing page with the play button.
- `../game.js` - Board state, win/tie detection, reset behavior, and computer move selection.
- `../tic-tac-toe.css` - Landing-page and play-screen styles.

## Gameplay behavior

- The player uses X and clicks an empty 3x3 board cell to move.
- The computer uses O after a short delay.
- Computer moves can win immediately, block most immediate player wins, or choose strategic positions such as the center and corners.
- The status text reports wins, losses, ties, and whose turn is next.
- The New Game button resets the board without leaving the page.

## Maintenance notes

- Keep `game.html` asset links synchronized with `../game.js` and `../tic-tac-toe.css` if files move again.
- Keep the root `README.md` project structure in sync with this folder when adding or renaming Tic-Tac-Toe files.

