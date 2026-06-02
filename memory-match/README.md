# Memory Match

Memory Match is a 12-card browser matching game with 6 illustrated pairs. The
player flips two cards at a time and wins after finding every pair.

## Files

- `memory-match.html` - game screen markup, board container, reset button, and
  navigation link.
- `memory-match.js` - deck creation, shuffle logic, card rendering, flip and
  match handling, board locking, move counting, and reset behavior.
- `memory-match.css` - responsive 4-column card grid, 3D flip animation, matched
  card styling, and button/status styles.

## Card pairs

The deck contains two cards for each of these inline SVG icons:

- apple
- banana
- orange
- bicycle
- basketball
- briefcase

## Gameplay

- Click a face-down card to flip it.
- Flip a second card to attempt a match.
- Matching cards stay face up and are disabled.
- Mismatched cards flip back after an 800 ms delay while the board is locked.
- The game reports the number of moves when all 6 pairs are matched.
- The "New Game" button shuffles a fresh deck and resets the move count.

## Accessibility and tests

Cards use gridcell roles and update their `aria-label` values as they flip. The
game logic is covered by `test/games.test.js`, including deck creation,
non-mutating shuffle behavior, board locking, mismatch delays, matched cards,
and final move counting.
