# Connect 4

A browser-based Connect 4 game built with plain HTML, CSS, and JavaScript.

## Gameplay

- Play as red discs against a green computer opponent.
- Choose a column button to drop a disc into the 6-row by 7-column board.
- The computer can take winning moves, usually blocks immediate player wins, and otherwise favors center columns.
- The game detects horizontal, vertical, and diagonal four-in-a-row wins.
- Winning discs are highlighted, ties are reported, and the **New Game** button resets the board.

## Files

```text
connect-4/
|-- connect-4.html   # Connect 4 page markup
|-- connect-4.css    # Board, disc, status, and button styles
`-- README.md        # This game-specific guide

../connect-4.js      # Board state, win detection, AI move selection, and DOM updates
```

## Running locally

From the repository root, serve the static files and open the Connect 4 page:

```sh
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/connect-4/connect-4.html
```

## Development notes

- The play screen now lives in the `connect-4/` folder with its stylesheet.
- The JavaScript logic remains at the repository root in `connect-4.js`.
- Column buttons use ARIA labels that update when columns fill or become unavailable during the computer turn.

