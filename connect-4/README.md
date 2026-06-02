# Connect 4

Connect 4 is a browser-based game against a computer opponent. The player drops red discs into a 6-row by 7-column board, and the computer responds with green discs.

## How to play

1. Open `connect-4.html` in a browser.
2. Choose one of the numbered column buttons to drop a red disc.
3. Wait for the computer to place a green disc.
4. Connect four discs horizontally, vertically, or diagonally to win.

Use **New Game** to reset the board at any time, or **All games** to return to the shared game picker.

## Gameplay details

- The board prevents moves in full columns and disables input while the computer is thinking.
- Winning lines are highlighted on the board.
- Ties are detected when the board fills without a winner.
- Column buttons expose accessible labels that report whether a column is full and how many empty slots remain.

## Computer strategy

The computer chooses moves in this order:

1. Take an immediate winning move when one is available.
2. Usually block the player's immediate winning move.
3. Prefer center columns when no urgent move is available.
4. Fall back to a random legal column.

## Files

```text
connect-4/
|-- README.md       # Game documentation
|-- connect-4.html  # Page markup and controls
|-- connect-4.css   # Board, disc, status, and button styles
`-- connect-4.js    # Board state, win detection, computer moves, and reset logic
```

## Development

The game has no build step. From the repository root, run a local static server and open `/connect-4/connect-4.html`:

```sh
python3 -m http.server 8000
```

Game logic coverage is included in the repository-level test suite:

```sh
npm test
```
