# SimpleWebGames

A small collection of browser-based games built with plain HTML, CSS, and JavaScript. Open the landing page to choose a game, then play directly in the browser without installing dependencies.

## Games

- **Tic-Tac-Toe** (`tic-tac-toe.html`, `game.html`, `game.js`, `tic-tac-toe.css`)
  - Classic 3x3 Tic-Tac-Toe against a computer opponent.
  - The computer looks for winning moves, blocks most immediate threats, and otherwise favors strategic positions.
- **Air Hockey** (`air-hockey.html`, `air-hockey.js`, `air-hockey.css`)
  - Canvas-based air hockey match against a computer-controlled mallet.
  - Drag your mallet with the mouse; the first player to 2 goals wins.
- **Connect 4** (`connect-4.html`, `connect-4.js`, `connect-4.css`)
  - 6x7 Connect 4 game against a computer opponent.
  - Drop red discs by choosing a column while the computer plays green discs.
  - Detects horizontal, vertical, and diagonal wins, highlights the winning line, and supports ties and quick restarts.

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

## Project structure

```text
.
|-- index.html          # Game picker landing page
|-- tic-tac-toe.html    # Tic-Tac-Toe landing page
|-- game.html           # Tic-Tac-Toe play screen
|-- game.js             # Tic-Tac-Toe game logic
|-- tic-tac-toe.css     # Tic-Tac-Toe styles
|-- air-hockey.html     # Air Hockey play screen
|-- air-hockey.js       # Air Hockey canvas game loop and AI
|-- air-hockey.css      # Air Hockey styles
|-- connect-4.html      # Connect 4 play screen
|-- connect-4.js        # Connect 4 board logic and computer moves
`-- connect-4.css       # Connect 4 styles
```

## Development notes

- Each game is self-contained in its own HTML/CSS/JS files.
- Shared navigation returns to `index.html` via the "All games" link.
- No build step or package manager setup is required for normal development.
