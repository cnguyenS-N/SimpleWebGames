# SimpleWebGames

A small collection of browser-based games built with plain HTML, CSS, and JavaScript. Each game runs directly in the browser without a build step.

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
- **Memory Match** (`memory-match/memory-match.html`, `memory-match/memory-match.js`, `memory-match/memory-match.css`)
  - 12-card matching game with 6 pairs of inline SVG illustrated cards in a 4-column grid.
  - Flip two cards at a time, match all pairs, and track the number of moves needed to win.
  - Supports quick restarts, accessible card labels, and a short flip-back delay for missed matches.

## Running locally

Because the site is static, you can open the HTML files directly in a browser. From the repository root, start with the landing page or open a game page directly:

```text
index.html
tic-tac-toe.html
game.html
air-hockey/air-hockey.html
connect-4/connect-4.html
memory-match/memory-match.html
```

For a local web server, run one of the following from the repository root and open the shown localhost URL:

```sh
python3 -m http.server 8000
```

or

```sh
npx serve .
```

## Project structure

```text
.
|-- index.html                    # Game picker landing page
|-- tic-tac-toe.html              # Tic-Tac-Toe landing page
|-- game.html                     # Tic-Tac-Toe play screen
|-- game.js                       # Tic-Tac-Toe game logic
|-- tic-tac-toe.css               # Tic-Tac-Toe styles
|-- air-hockey/
|   |-- air-hockey.html           # Air Hockey play screen
|   |-- air-hockey.js             # Air Hockey canvas game loop and AI
|   `-- air-hockey.css            # Air Hockey styles
|-- connect-4/
|   |-- connect-4.html            # Connect 4 play screen
|   |-- connect-4.js              # Connect 4 board logic and computer moves
|   `-- connect-4.css             # Connect 4 styles
|-- memory-match/
|   |-- README.md                 # Memory Match game notes
|   |-- memory-match.html         # Memory Match play screen
|   |-- memory-match.js           # Memory Match deck, matching, and reset logic
|   `-- memory-match.css          # Memory Match card flip styles
|-- test/
|   `-- games.test.js             # Node.js tests for game logic
`-- package.json                  # npm script definitions
```

## Development notes

- Each game keeps its HTML, CSS, and JavaScript together, with newer games grouped in per-game folders.
- Shared navigation is exposed through an "All games" link on gameplay screens.
- No build step or package manager setup is required for normal play.
- Run the game logic tests with `npm test`.
