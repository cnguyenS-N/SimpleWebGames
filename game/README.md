# Game Picker and Tic-Tac-Toe Board

This folder currently contains the browser-games picker page source and the Tic-Tac-Toe play screen.

## Files

- `index.html` - game picker page with links for Tic-Tac-Toe, Air Hockey, Connect 4, and Memory Match.
- `game.html` - Tic-Tac-Toe board screen with status text, a 3x3 grid, reset button, and "All games" navigation link.
- `game.js` - Tic-Tac-Toe state management, win/tie detection, rendering, and computer move selection.

## Tic-Tac-Toe behavior

- The player uses `X`; the computer uses `O`.
- Player clicks are ignored once a cell is occupied or the game is over.
- The computer move is delayed briefly so the turn change is visible.
- The computer usually takes a win, blocks an immediate player win, then prefers the center, corners, and edges.
- The reset button clears the board and restores the opening "Your turn (X)" state.

## Local use

Serve the repository root and open the Tic-Tac-Toe board:

```sh
python3 -m http.server 8000
```

```text
http://localhost:8000/game/game.html
```

When updating file locations, keep the relative links in `index.html` and `game.html` synchronized with the repository layout.
