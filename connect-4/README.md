# Connect 4

Connect 4 is a browser-based 6x7 grid game built with plain HTML, CSS, and JavaScript. The player drops red discs by selecting a numbered column, then the computer responds with green discs.

## How to play

1. Open `connect-4.html` from the repository root or serve the repository with a local static server.
2. Choose a column button to drop a red disc into the lowest available row.
3. Connect four discs horizontally, vertically, or diagonally before the computer does.
4. Use **New Game** to reset the board at any time.

## Implementation notes

- `connect-4.html` defines the board container, column controls, status area, and reset button.
- `connect-4.css` styles the grid, discs, highlighted winning line, and page layout.
- `connect-4.js` builds the board DOM, tracks game state, detects wins and ties, and picks computer moves.
- The computer first takes winning moves, usually blocks immediate player wins, and otherwise prefers center columns before falling back to a random legal column.

## Tests

Connect 4 helper logic and gameplay behavior are covered by the repository-level Node test suite:

```sh
npm test
```
