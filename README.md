# SimpleWebGames

A small collection of browser-based games built with plain HTML, CSS, and JavaScript. The repository has no build step; each game is a static page with its own script and styles.

## Games

- **Tic-Tac-Toe**
  - Files: `tic-tac-toe.html`, `tic-tac-toe.css`, `game/game.html`, `game/game.js`
  - Classic 3x3 Tic-Tac-Toe against a computer opponent.
  - The computer can take winning moves, block most immediate threats, and otherwise favors the center, corners, then edges.
- **Air Hockey**
  - Files: `air-hockey/air-hockey.html`, `air-hockey/air-hockey.js`, `air-hockey/air-hockey.css`
  - Canvas-based air hockey match against a computer-controlled mallet.
  - Drag your mallet with the mouse; the first player to 2 goals wins.
- **Connect 4**
  - Files: `connect-4/connect-4.html`, `connect-4/connect-4.js`, `connect-4/connect-4.css`
  - 6x7 Connect 4 game against a computer opponent.
  - Drop red discs by choosing a column while the computer plays green discs.
  - Detects horizontal, vertical, and diagonal wins, highlights the winning line, and supports ties and quick restarts.
- **Memory Match**
  - Files: `memory-match/memory-match.html`, `memory-match/memory-match.js`, `memory-match/memory-match.css`
  - 12-card matching game with 6 pairs of inline SVG illustrated cards in a 4-column grid.
  - Flip two cards at a time, match all pairs, and track the number of moves needed to win.
  - Supports quick restarts, accessible card labels, and a short flip-back delay for missed matches.

## Running locally

You can open an HTML file directly in a browser, or serve the repository root with a simple static server:

```sh
python3 -m http.server 8000
```

Then open one of the game entry points in the browser:

```text
http://localhost:8000/game/game.html
http://localhost:8000/air-hockey/air-hockey.html
http://localhost:8000/connect-4/connect-4.html
http://localhost:8000/memory-match/memory-match.html
```

## Project structure

```text
.
|-- README.md
|-- tic-tac-toe.html          # Tic-Tac-Toe landing page
|-- tic-tac-toe.css           # Tic-Tac-Toe visual styles
|-- game/
|   |-- README.md
|   |-- index.html            # Browser games picker page source
|   |-- game.html             # Tic-Tac-Toe play screen
|   `-- game.js               # Tic-Tac-Toe game logic and computer moves
|-- air-hockey/
|   |-- README.md
|   |-- air-hockey.html       # Air Hockey play screen
|   |-- air-hockey.js         # Canvas game loop, puck physics, scoring, and AI
|   `-- air-hockey.css        # Air Hockey styles
|-- connect-4/
|   |-- README.md
|   |-- connect-4.html        # Connect 4 play screen
|   |-- connect-4.js          # Board logic, win detection, and computer moves
|   `-- connect-4.css         # Connect 4 styles
|-- memory-match/
|   |-- README.md
|   |-- memory-match.html     # Memory Match play screen
|   |-- memory-match.js       # Deck creation, matching, accessibility labels, and reset logic
|   `-- memory-match.css      # Memory Match card flip styles
|-- tic-tac-toe/
|   `-- README.md
`-- test/
    |-- package.json          # Node test script
    `-- games.test.js         # DOM-light game logic tests
```

## Development notes

- Keep HTML links, script paths, and stylesheet paths synchronized whenever files move between folders.
- The JavaScript is written for direct browser execution; shared logic is exposed through top-level functions that the Node tests load in a VM.
- The available test command is `npm test` from the `test/` directory.
