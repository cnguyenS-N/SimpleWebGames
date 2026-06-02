# Air Hockey

Air Hockey is a canvas-based browser game where the player controls the bottom
mallet against a computer-controlled top mallet.

## Files

- `air-hockey.html` - game screen markup, score display, canvas, reset button,
  and navigation link.
- `air-hockey.js` - puck physics, mallet movement, goal detection, scoring,
  computer movement, drawing, and reset behavior.
- `air-hockey.css` - centered layout, table sizing, button styling, and win/loss
  status colors.

## Gameplay

- Drag the player mallet with the mouse inside the lower half of the table.
- The computer mallet tracks the puck in the upper half and recenters when the
  puck is on the player's side.
- Goals are scored when the puck crosses the top or bottom goal opening.
- The first side to reach 2 goals wins.
- The "New Game" button resets the score, puck, mallets, and status message.

## Implementation notes

- The table is rendered on a 600 by 400 canvas.
- Puck velocity uses friction and is capped to keep gameplay controllable.
- Mallets are clamped to their own half of the table.
- After each goal, the puck and mallets reset and play pauses briefly before
  continuing.
