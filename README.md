# SimpleWebGames

A small collection of browser-based games built with plain HTML, CSS, and JavaScript. The games run as static files and do not require a build step.

## Games

- **Tic-Tac-Toe** (`tic-tac-toe.html`, `game/game.html`, `game/game.js`, `tic-tac-toe.css`)
  - Classic 3x3 Tic-Tac-Toe against a computer opponent.
  - The computer looks for winning moves, blocks most immediate threats, and otherwise favors strategic positions.
- **Air Hockey** (`air-hockey/air-hockey.html`, `air-hockey/air-hockey.js`, `air-hockey/air-hockey.css`)
  - Canvas-based air hockey match against a computer-controlled mallet.
  - Drag your mallet with the mouse; the first player to 2 goals wins.
- **Connect 4** (`connect-4/connect-4.html`, `connect-4/connect-4.js`, `connect-4/connect-4.css`)
  - 6x7 Connect 4 game against a computer opponent.
  - Drop red discs by choosing a column while the computer plays green discs.
  - Detects horizontal, vertical, and diagonal wins, highlights the winning line, and supports ties and quick restarts.
- **Memory Match** (`memory-match/memory-match.html`, `memory-match/memory-match.js`, `memory-match/memory-match.css`)
  - 12-card matching game with 6 pairs of inline SVG illustrated cards in a 4-column grid.
  - Flip two cards at a time, match all pairs, and track the number of moves needed to win.
  - Supports quick restarts, accessible card labels, and a short flip-back delay for missed matches.

## Running locally

Because the site is static, you can serve the repository root and open the checked-in HTML pages directly:

```sh
python3 -m http.server 8000
```

Then open a page such as:

```text
http://localhost:8000/game/index.html
http://localhost:8000/air-hockey/air-hockey.html
http://localhost:8000/connect-4/connect-4.html
http://localhost:8000/memory-match/memory-match.html
```

You can also use any other static file server, such as `npx serve .`, from the repository root.

## Testing

The Node test harness lives in `test/`, and the npm manifest was moved to `test/package.json`. Run the test script from the repository root with:

```sh
npm --prefix test test
```

The tests use Node's built-in `node:test` runner with a lightweight fake DOM to exercise the browser game scripts.

## Project structure

```text
.
|-- tic-tac-toe.html          # Tic-Tac-Toe intro page
|-- tic-tac-toe.css           # Tic-Tac-Toe styles
|-- game/
|   |-- index.html            # Game picker page
|   |-- game.html             # Tic-Tac-Toe play screen
|   |-- game.js               # Tic-Tac-Toe game logic
|   `-- README.md             # Tic-Tac-Toe notes
|-- air-hockey/
|   |-- air-hockey.html       # Air Hockey play screen
|   |-- air-hockey.js         # Canvas game loop, scoring, and AI
|   |-- air-hockey.css        # Air Hockey styles
|   `-- README.md             # Air Hockey notes
|-- connect-4/
|   |-- connect-4.html        # Connect 4 play screen
|   |-- connect-4.js          # Board logic and computer moves
|   |-- connect-4.css         # Connect 4 styles
|   `-- README.md             # Connect 4 notes
|-- memory-match/
|   |-- memory-match.html     # Memory Match play screen
|   |-- memory-match.js       # Deck, matching, and reset logic
|   |-- memory-match.css      # Card flip styles
|   `-- README.md             # Memory Match notes
`-- test/
    |-- package.json          # npm test script
    `-- games.test.js         # Node-based game logic tests
```

## Development notes

- Each game is implemented with browser-native HTML, CSS, and JavaScript.
- Shared "All games" links point to `index.html` relative to each page, so update links when moving files between directories.
- Keep README path listings, HTML asset references, and `test/games.test.js` script paths synchronized when files move.
