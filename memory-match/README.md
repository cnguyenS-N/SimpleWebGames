# Memory Match

A 12-card memory game with 6 illustrated pairs.

## Files

- `memory-match.html` - play screen with status text, card grid, reset button, and "All games" navigation link.
- `memory-match.js` - deck creation, shuffle logic, card rendering, matching rules, move counting, and reset behavior.
- `memory-match.css` - responsive grid layout and card flip styling.

## Gameplay

- The deck contains two cards for each pair: apple, banana, orange, bicycle, basketball, and briefcase.
- Cards start face down with accessible labels.
- Flip two cards at a time:
  - matching cards stay face up and become disabled,
  - mismatched cards flip back after a short delay,
  - board input is locked while mismatched cards are waiting to flip back.
- The status message reports the final move count after all 6 pairs are matched.
- The new-game button shuffles a fresh deck and resets all counters.

## Running locally

From the repository root:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/memory-match/memory-match.html
```

## Tests

The Node test suite includes Memory Match coverage for deck creation, shuffle immutability, card accessibility labels, board locking, mismatch delays, matched pairs, and final win messaging.
