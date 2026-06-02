# SimpleWebGames

A small collection of browser-based games built with plain HTML, CSS, and JavaScript. The games are static pages, so they can be opened directly in a browser or served from any simple local web server.

## Games

- **Tic-Tac-Toe** (`tic-tac-toe/tic-tac-toe.html`, `game/game.html`, `game/game.js`, `tic-tac-toe/tic-tac-toe.css`)
  - Classic 3x3 Tic-Tac-Toe against a computer opponent.
  - The computer looks for winning moves, blocks most immediate threats, and otherwise favors strategic positions.
  - The latest layout keeps the Tic-Tac-Toe landing page and styles under `tic-tac-toe/`, while the play screen and game logic remain under `game/`.
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

Open any game HTML file directly in a browser, or serve the repository root and navigate to the desired path. For a local web server, run one of the following from the repository root:

```sh
python3 -m http.server 8000
```

or

```sh
npx serve .
```

Useful entry points in the current layout:

```text
game/index.html
tic-tac-toe/tic-tac-toe.html
game/game.html
air-hockey/air-hockey.html
connect-4/connect-4.html
memory-match/memory-match.html
```

## Project structure

```text
.
|-- README.md
|-- air-hockey/
|   |-- air-hockey.html     # Air Hockey play screen
|   |-- air-hockey.js       # Air Hockey canvas game loop and AI
|   `-- air-hockey.css      # Air Hockey styles
|-- connect-4/
|   |-- connect-4.html      # Connect 4 play screen
|   |-- connect-4.js        # Connect 4 board logic and computer moves
|   `-- connect-4.css       # Connect 4 styles
|-- game/
|   |-- index.html          # Game picker landing page
|   |-- game.html           # Tic-Tac-Toe play screen
|   |-- game.js             # Tic-Tac-Toe game logic
|   `-- README.md
|-- memory-match/
|   |-- memory-match.html   # Memory Match play screen
|   |-- memory-match.js     # Memory Match deck, matching, and reset logic
|   |-- memory-match.css    # Memory Match card flip styles
|   `-- README.md
|-- tic-tac-toe/
|   |-- tic-tac-toe.html    # Tic-Tac-Toe landing page
|   |-- tic-tac-toe.css     # Tic-Tac-Toe styles
|   `-- README.md
`-- test/
    |-- games.test.js       # Node test coverage for game logic
    `-- package.json        # Test script definition
```

## Development notes

- Each game uses plain browser APIs and does not require a build step.
- Keep relative `href` and `src` paths synchronized when moving HTML, CSS, or JavaScript files between directories.
- Run tests with `npm --prefix test test` from the repository root.
