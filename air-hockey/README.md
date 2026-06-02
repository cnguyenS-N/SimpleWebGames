# Air Hockey

Air Hockey is a canvas-based browser game that runs from `../air-hockey.html` with logic in `../air-hockey.js` and styles in `../air-hockey.css`.

## Gameplay

- Drag the blue player mallet with the mouse on the lower half of the table.
- The red computer mallet tracks and defends from the upper half.
- Score by sending the puck through the opponent's goal opening.
- The first side to reach 2 goals wins.
- Use **New Game** to reset scores, mallets, puck position, and status text.

## Implementation notes

- The game uses a fixed 600x400 canvas and `requestAnimationFrame` for the render loop.
- Puck motion includes friction, wall bounces, goal detection, collision resolution, and speed limiting.
- Player and computer mallets are clamped to their own halves of the table.
- The computer follows the puck while it is in the top half and otherwise returns toward a defensive home position.

