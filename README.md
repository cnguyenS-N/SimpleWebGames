# SimpleWebGames

A small collection of browser-based games built with plain HTML, CSS, and JavaScript. The game picker now lives at `game/index.html`, and each game can be opened directly in a browser without a build step.

## Games

- **Tic-Tac-Toe** (`tic-tac-toe.html`, `game/game.html`, `game/game.js`, `tic-tac-toe.css`)
  - Classic 3x3 Tic-Tac-Toe against a computer opponent.
  - The root `tic-tac-toe.html` file is the game landing page, while `game/game.html` contains the playable board.
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

Because the site is static, you can open the current game picker directly in a browser:

```text
game/index.html
```

You can also open an individual game entry file directly, such as:

```text
tic-tac-toe.html
air-hockey/air-hockey.html
connect-4/connect-4.html
memory-match/memory-match.html
```

For a local web server, run one of the following from the repository root and open the desired path from the localhost URL:

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
|-- README.md
|-- package.json
|-- tic-tac-toe.html          # Tic-Tac-Toe landing page
|-- tic-tac-toe.css           # Tic-Tac-Toe landing and play styles
|-- game/
|   |-- README.md             # Game picker and Tic-Tac-Toe runtime notes
|   |-- index.html            # Game picker landing page
|   |-- game.html             # Tic-Tac-Toe play screen
|   `-- game.js               # Tic-Tac-Toe game logic and computer move selection
|-- air-hockey/
|   |-- air-hockey.html       # Air Hockey play screen
|   |-- air-hockey.js         # Air Hockey canvas game loop and AI
|   `-- air-hockey.css        # Air Hockey styles
|-- connect-4/
|   |-- connect-4.html        # Connect 4 play screen
|   |-- connect-4.js          # Connect 4 board logic and computer moves
|   `-- connect-4.css         # Connect 4 styles
|-- memory-match/
|   |-- README.md
|   |-- memory-match.html     # Memory Match play screen
|   |-- memory-match.js       # Memory Match deck, matching, and reset logic
|   `-- memory-match.css      # Memory Match card flip styles
`-- test/
    `-- games.test.js         # Node.js tests for browser game logic
```

## Development notes

- Each game is implemented with plain browser APIs and game-specific HTML/CSS/JS files.
- The latest landing-page rename moved the game picker from `index.html` to `game/index.html`.
- No build step is required for normal development.
- Run `npm test` to execute the Node.js test suite.
