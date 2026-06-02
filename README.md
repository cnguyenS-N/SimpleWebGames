# SimpleWebGames

SimpleWebGames is a small collection of browser games built with plain HTML, CSS, and JavaScript. The project is static, so games can be opened directly in a browser or served from any basic local web server.

## Games

| Game | Entry point | Description |
| --- | --- | --- |
| Tic-Tac-Toe | `tic-tac-toe.html` -> `game.html` | Classic 3x3 Tic-Tac-Toe against a computer opponent that can win, block, and prefer strategic board positions. |
| Air Hockey | `air-hockey/air-hockey.html` | Canvas-based air hockey against a computer-controlled mallet. Drag your mallet to score; the first player to 2 goals wins. |
| Connect 4 | `connect-4/connect-4.html` | 6x7 Connect 4 against a computer opponent. Drop red discs by column while the computer plays green discs, with win highlighting and tie detection. |
| Memory Match | `memory-match.html` | 12-card matching game with 6 illustrated SVG pairs, move counting, accessible card labels, restart support, and a short delay before missed matches flip back. |

## Running locally

Open `index.html` in a browser to use the game picker:

```text
index.html
```

You can also start a local web server from the repository root:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Testing

The repository includes a Node test suite for the browser game logic. Run it from the repository root:

```sh
npm test
```

## Project structure

```text
.
|-- index.html                  # Game picker landing page
|-- tic-tac-toe.html            # Tic-Tac-Toe intro page
|-- game.html                   # Tic-Tac-Toe play screen
|-- game.js                     # Tic-Tac-Toe game logic and computer moves
|-- tic-tac-toe.css             # Tic-Tac-Toe styles
|-- air-hockey/
|   |-- air-hockey.html         # Air Hockey play screen
|   |-- air-hockey.js           # Canvas loop, scoring, puck physics, and computer mallet
|   `-- air-hockey.css          # Air Hockey styles
|-- connect-4/
|   |-- connect-4.html          # Connect 4 play screen
|   |-- connect-4.js            # Board helpers, win checks, and computer moves
|   `-- connect-4.css           # Connect 4 styles
|-- memory-match.html           # Memory Match play screen
|-- memory-match.js             # Memory Match deck, matching, move count, and reset logic
|-- memory-match.css            # Memory Match card flip styles
|-- test/
|   `-- games.test.js           # Node tests for game helpers and state changes
`-- package.json                # npm test script
```

## Development notes

- There is no build step for normal development.
- Each game keeps its UI, styles, and game logic in small static files.
- Game pages include an "All games" link intended to return players to the shared `index.html` game picker.
