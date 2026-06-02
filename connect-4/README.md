# Connect 4

A 6-row by 7-column Connect 4 game against a computer opponent.

## Files

- `connect-4.html` - play screen with column buttons, board grid, reset button, and "All games" navigation link.
- `connect-4.js` - board creation, legal move checks, win detection, computer move selection, rendering, and reset behavior.
- `connect-4.css` - board, disc, column button, and status styling.

## Gameplay

- You play red discs; the computer plays green discs.
- Choose a column button to drop a red disc into the lowest open slot.
- Full columns are disabled and their accessible labels update with the remaining slot count.
- The computer waits briefly before dropping a disc.
- The computer can:
  - take an immediate winning column,
  - block most immediate player wins,
  - prefer center-biased columns,
  - choose randomly from legal columns when no stronger move is selected.
- The game detects horizontal, vertical, and diagonal wins, highlights the winning cells, and handles tied boards.

## Running locally

From the repository root:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/connect-4/connect-4.html
```

## Tests

The Node test suite includes Connect 4 coverage for board helpers, legal columns, immutable drop simulation, win detection, winning-cell lookup, computer move priority, and full-board handling.
