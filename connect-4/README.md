# Connect 4

Connect 4 is a 6-row by 7-column browser game against a computer opponent. The
player uses red discs and the computer uses green discs.

## Files

- `connect-4.html` - game screen markup, column controls, board container,
  reset button, and navigation link.
- `connect-4.js` - board creation, legal move detection, win detection,
  winning-cell highlighting, computer move selection, and reset behavior.
- `connect-4.css` - responsive board layout, disc colors, column buttons,
  highlighted wins, and status styles.

## Gameplay

- Choose a numbered column to drop a red disc.
- The computer responds after a short delay.
- The game detects horizontal, vertical, and diagonal runs of four.
- Winning discs are highlighted when a player wins.
- Full boards without a winner are reported as ties.
- The "New Game" button clears the board and starts over.

## Computer strategy

The computer checks for an immediate winning column first. If it cannot win, it
usually blocks an immediate player win, then prefers center columns before
choosing randomly among legal columns.

## Tests

Connect 4 behavior is covered by `test/games.test.js`, including board helper
functions, legal columns, win detection, winning cells, computer move priorities,
and full-board handling.
