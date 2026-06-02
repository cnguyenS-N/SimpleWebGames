# Connect 4

Connect 4 is a static browser game built with plain HTML, CSS, and JavaScript. The player drops red discs into a 6-by-7 board while the computer responds with green discs.

## Files

```text
connect-4/
|-- README.md       # Game-specific documentation
|-- connect-4.html  # Game markup and controls
|-- connect-4.js    # Board state, win detection, and computer moves
`-- connect-4.css   # Board layout, disc colors, and status styles
```

## Running

From the repository root, open the game page directly:

```text
connect-4/connect-4.html
```

You can also serve the repository with a static file server and visit that path in the browser:

```sh
python3 -m http.server 8000
```

## Gameplay

- Choose a column button from 1 to 7 to drop a red disc.
- The computer plays green discs after a short thinking delay.
- The game detects horizontal, vertical, and diagonal wins.
- Winning discs are highlighted, ties are announced, and the **New Game** button resets the board.

## Implementation notes

- `connect-4.js` stores the board as a 6-row by 7-column array.
- Computer moves first take any immediate win, then usually block an immediate player win, then prefer center columns before falling back to a legal random move.
- Column buttons are disabled while the computer is moving, after the game ends, or when a column is full.
- The rendered board uses ARIA grid and gridcell labels so occupied and empty cells are announced with row, column, and disc color.

