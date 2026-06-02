# Game Directory

This directory contains the repository's game picker and the Tic-Tac-Toe runtime files that were moved under `game/`.

## Files

- `index.html` - Game picker landing page for the browser games collection.
- `game.html` - Playable Tic-Tac-Toe board with status text, a reset button, and an "All games" link.
- `game.js` - Tic-Tac-Toe state management, winner/tie detection, computer move selection, rendering, and reset behavior.
- `../tic-tac-toe.html` - Tic-Tac-Toe intro page at the repository root.
- `../tic-tac-toe.css` - Shared Tic-Tac-Toe landing and play styles.

## Tic-Tac-Toe behavior

- The player uses `X` and plays first on a 3x3 grid.
- The computer uses `O`, looks for winning moves, usually blocks immediate player wins, and otherwise favors the center, corners, then edges.
- The game reports wins, losses, and ties, disables completed boards, and supports starting a new game without reloading the page.
