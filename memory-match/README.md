# Memory Match

Memory Match is a browser-based card matching game built with plain HTML, CSS, and JavaScript. The game lives entirely in this directory and can be opened directly from `memory-match.html`.

## Files

```text
memory-match/
|-- README.md           # Game-specific notes
|-- memory-match.html   # Play screen and markup
|-- memory-match.js     # Deck creation, matching rules, move count, and reset logic
`-- memory-match.css    # 4-column grid layout and card flip styles
```

## How to play

- The board contains 12 cards made from 6 shuffled pairs.
- Flip two cards at a time to look for a match.
- Matched cards stay face up and are disabled.
- Missed matches flip back after a short delay.
- Match every pair to win; the status message reports the move count.
- Use **New Game** to shuffle and restart.

## Implementation notes

- Card art is defined as inline SVG strings in `memory-match.js`.
- The board is rendered as accessible button elements with `role="gridcell"` and descriptive `aria-label` values.
- A temporary board lock prevents extra clicks while mismatched cards are waiting to flip back.
- The game uses no external dependencies and does not require a build step.

## Running locally

Open `memory-match/memory-match.html` from the repository root, or serve the repository and browse to `/memory-match/memory-match.html`:

```sh
python3 -m http.server 8000
```

## Tests

Repository-level tests cover Memory Match deck creation, board rendering, board locking, mismatch handling, matched pairs, and win messaging:

```sh
npm test
```
