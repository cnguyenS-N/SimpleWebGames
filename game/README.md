# Tic-Tac-Toe

Tic-Tac-Toe is a classic 3x3 browser game where the player uses X and the
computer uses O. The implementation files currently live at the repository root.

## Files

- `../tic-tac-toe.html` - Tic-Tac-Toe landing page with a play button.
- `../game.html` - play screen with the board, status message, reset button, and
  navigation link.
- `../game.js` - game state, win and tie detection, player clicks, computer move
  selection, rendering, and reset behavior.
- `../tic-tac-toe.css` - landing page, board, cells, status states, and button
  styles.

## Gameplay

- The player goes first as X.
- Click an empty square to place a mark.
- The computer responds as O after a short delay.
- The game ends on a player win, computer win, or tie.
- The "New Game" button clears the board and starts over.

## Computer strategy

The computer usually looks for an immediate winning move, blocks most immediate
player wins, then prefers the center, corners, and edges. A small random branch
keeps the opponent from playing identically every game.

## Tests

Tic-Tac-Toe behavior is covered by `../test/games.test.js`, including winner
detection, ties, empty-cell discovery, winning moves, computer move priorities,
and player-win UI behavior.
