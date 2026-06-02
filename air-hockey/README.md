# Air Hockey

Air Hockey is a canvas-based browser game where the player controls the lower mallet against a computer-controlled opponent.

## Files

- `air-hockey.html` - Play screen with score display, canvas, status text, reset button, and navigation link.
- `air-hockey.js` - Canvas game loop, puck physics, mallet movement, scoring, computer movement, and reset behavior.
- `air-hockey.css` - Air Hockey page layout, canvas presentation, status states, and controls.

## Gameplay notes

- Drag the player mallet with the mouse on the lower half of the table.
- The computer mallet tracks the puck on the upper half and returns toward a defensive position.
- Goals are detected at the top and bottom openings.
- The first side to reach 2 goals wins.

## Testing

Air Hockey does not currently have dedicated assertions in `../test/games.test.js`; its behavior is primarily exercised in the browser.
