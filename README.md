# SimpleWebGames

SimpleWebGames is a small collection of browser-based games built with plain
HTML, CSS, and JavaScript. The project is static, so the games can be opened
directly in a browser or served from any lightweight local web server.

## Games

| Game | Files | Summary |
| --- | --- | --- |
| Tic-Tac-Toe | `tic-tac-toe.html`, `game.html`, `game.js`, `tic-tac-toe.css` | Classic 3x3 Tic-Tac-Toe against a computer opponent that can win, block most immediate threats, and prefer strategic cells. |
| Air Hockey | `air-hockey/air-hockey.html`, `air-hockey/air-hockey.js`, `air-hockey/air-hockey.css` | Canvas-based air hockey against a computer-controlled mallet. Drag your mallet with the mouse; first to 2 goals wins. |
| Connect 4 | `connect-4/connect-4.html`, `connect-4/connect-4.js`, `connect-4/connect-4.css` | 6x7 Connect 4 against a green computer player, including center-biased AI, win detection, highlighted winning lines, ties, and quick restarts. |
| Memory Match | `memory-match/memory-match.html`, `memory-match/memory-match.js`, `memory-match/memory-match.css` | 12-card matching game with 6 illustrated SVG pairs, move counting, accessible labels, board locking during mismatches, and quick restarts. |

## Running locally

Open a game file directly in a browser, or start a local server from the
repository root:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/` for the game picker, or open an individual
game path such as `http://localhost:8000/connect-4/connect-4.html`.

You can also use:

```sh
npx serve .
```

## Tests

The repository uses Node's built-in test runner for game logic coverage:

```sh
npm test
```

The tests create small fake DOM objects and load the browser scripts in a VM so
core behaviors can be checked without a browser.

## Project structure

```text
.
|-- index.html                         # Game picker landing page
|-- tic-tac-toe.html                   # Tic-Tac-Toe landing page
|-- game.html                          # Tic-Tac-Toe play screen
|-- game.js                            # Tic-Tac-Toe game logic
|-- tic-tac-toe.css                    # Tic-Tac-Toe styles
|-- air-hockey/
|   |-- README.md
|   |-- air-hockey.html                # Air Hockey play screen
|   |-- air-hockey.js                  # Canvas game loop, physics, scoring, and AI
|   `-- air-hockey.css                 # Air Hockey styles
|-- connect-4/
|   |-- README.md
|   |-- connect-4.html                 # Connect 4 play screen
|   |-- connect-4.js                   # Board logic, win detection, and computer moves
|   `-- connect-4.css                  # Connect 4 styles
|-- memory-match/
|   |-- README.md
|   |-- memory-match.html              # Memory Match play screen
|   |-- memory-match.js                # Deck, matching, locking, and reset logic
|   `-- memory-match.css               # Card flip styles
|-- game/
|   `-- README.md                      # Tic-Tac-Toe documentation
|-- test/
|   `-- games.test.js                  # Node tests for browser game logic
`-- package.json                       # Test script
```

## Development notes

- Each game is implemented with self-contained HTML, CSS, and JavaScript.
- There is no build step for normal development.
- Keep README files synchronized with file moves, new games, controls, scoring
  rules, and test commands when the code changes.
