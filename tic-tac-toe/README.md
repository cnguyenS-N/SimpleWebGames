# Tic-Tac-Toe

This folder contains the Tic-Tac-Toe landing page and shared styles for the game experience.

## Files

- `tic-tac-toe.html` - Landing page with the Tic-Tac-Toe preview board and play link.
- `tic-tac-toe.css` - Styles for both the landing-page layout and Tic-Tac-Toe board UI.
- `../game/game.html` - Current Tic-Tac-Toe play screen.
- `../game/game.js` - Board state, winner detection, tie detection, reset handling, and computer move selection.

## Gameplay

- The player uses X and takes the first turn.
- The computer uses O.
- The computer first looks for a winning move, then usually blocks an immediate player win, and otherwise prefers the center, corners, then edges.
- A new game button resets the 3x3 board and status text.

## Development notes

The latest file move placed the Tic-Tac-Toe landing page at `tic-tac-toe/tic-tac-toe.html`. If the play screen or styles are moved into this folder later, update the relative `href` and `src` attributes in the HTML files at the same time.
