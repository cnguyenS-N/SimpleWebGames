# SimpleWebGames

A small collection of browser-based games built with plain HTML, CSS, and JavaScript. Each game runs directly in the browser without a build step or application server.

## Games

- **Tic-Tac-Toe** (`tic-tac-toe.html`, `game.html`, `game.js`, `tic-tac-toe.css`)
  - Classic 3x3 Tic-Tac-Toe against a computer opponent.
  - The computer looks for winning moves, blocks most immediate threats, and otherwise favors strategic positions.
- **Air Hockey** (`air-hockey/air-hockey.html`, `air-hockey/air-hockey.js`, `air-hockey/air-hockey.css`)
  - Canvas-based air hockey match against a computer-controlled mallet.
  - Drag your mallet with the mouse; the first player to 2 goals wins.
- **Connect 4** (`connect-4/connect-4.html`, `connect-4/connect-4.js`, `connect-4/connect-4.css`)
  - 6x7 Connect 4 game against a computer opponent.
  - Drop red discs by choosing a column while the computer plays green discs.
  - Detects horizontal, vertical, and diagonal wins, highlights the winning line, and supports ties and quick restarts.
- **Memory Match** (`memory-match.html`, `memory-match.js`, `memory-match.css`)
  - 12-card matching game with 6 pairs of inline SVG illustrated cards in a 4-column grid.
  - Flip two cards at a time, match all pairs, and track the number of moves needed to win.
  - Supports quick restarts, accessible card labels, and a short flip-back delay for missed matches.

## Running locally

Because the site is static, you can open `index.html` directly in a browser:

```text
index.html
```

For a local web server, run one of the following from the repository root and open the shown localhost URL:

```sh
python3 -m http.server 8000
```

or

```sh
npx serve .
```

## Testing

Run the browser-game logic tests with:

```sh
npm test
```

## Project structure

```text
.
|-- index.html          # Game picker landing page
|-- tic-tac-toe.html    # Tic-Tac-Toe landing page
|-- game.html           # Tic-Tac-Toe play screen
|-- game.js             # Tic-Tac-Toe game logic
|-- tic-tac-toe.css     # Tic-Tac-Toe styles
|-- air-hockey/
|   |-- air-hockey.html # Air Hockey play screen
|   |-- air-hockey.js   # Air Hockey canvas game loop and AI
|   `-- air-hockey.css  # Air Hockey styles
|-- connect-4/
|   |-- README.md       # Connect 4 documentation
|   |-- connect-4.html  # Connect 4 play screen
|   |-- connect-4.js    # Connect 4 board logic and computer moves
|   `-- connect-4.css   # Connect 4 styles
|-- memory-match.html   # Memory Match play screen
|-- memory-match.js     # Memory Match deck, matching, and reset logic
`-- memory-match.css    # Memory Match card flip styles
```

## Development notes

- Each game is self-contained in its own HTML/CSS/JS files.
- Shared navigation returns to `index.html` via the "All games" link.
- No build step or package manager setup is required for normal development.
