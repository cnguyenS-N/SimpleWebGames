# Tic-Tac-Toe

Classic 3x3 Tic-Tac-Toe against a computer opponent.

## Source files

- `../tic-tac-toe.html` - Tic-Tac-Toe landing page.
- `../tic-tac-toe.css` - visual styles for the Tic-Tac-Toe landing and board views.
- `../game/game.html` - playable board view with accessible grid cells and a new-game button.
- `../game/game.js` - board state, win/tie detection, rendering, and computer move logic.

## Gameplay

- You play as `X`; the computer plays as `O`.
- The game checks all rows, columns, and diagonals after each move.
- Wins, losses, and ties update the status message and disable further board input.
- The computer can:
  - choose a random empty cell occasionally,
  - take an immediate winning move,
  - block most immediate player wins,
  - otherwise prefer the center, then corners, then edges.

## Running locally

From the repository root:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/game/game.html
```

## Tests

The Node test suite includes Tic-Tac-Toe coverage for winner detection, ties, empty-cell selection, computer move priorities, and player win behavior.
