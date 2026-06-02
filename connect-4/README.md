# Connect 4

Connect 4 is a browser-based 6x7 board game where the player drops red discs against a computer-controlled green opponent.

## Files

- `connect-4.html` - Play screen with column buttons, board container, status text, reset button, and navigation link.
- `connect-4.js` - Board creation, legal move detection, win detection, computer move selection, rendering, and reset behavior.
- `connect-4.css` - Board grid, disc colors, winning-cell highlight, controls, and responsive page styling.

## Gameplay notes

- The player chooses a column to drop a red disc.
- The computer looks for immediate wins, blocks most immediate player wins, and otherwise favors center columns.
- Wins are detected horizontally, vertically, and diagonally.
- Winning cells are highlighted, and ties are detected when the board fills.

## Testing

Connect 4 behavior is covered by the Node test harness in `../test/games.test.js`.
