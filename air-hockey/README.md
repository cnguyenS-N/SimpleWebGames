# Air Hockey

Air Hockey is a canvas-based browser game where the player controls the lower
mallet against a computer-controlled opponent on the upper half of the table.
The first side to score 2 goals wins.

## Files

- `air-hockey.html` - Play screen with the score display, canvas table, new-game
  button, and navigation link.
- `air-hockey.css` - Styles for the Air Hockey page, table canvas, status text,
  and controls.
- `../air-hockey.js` - Game loop, puck physics, mallet collision handling,
  scoring, reset behavior, and computer mallet movement.

## Gameplay

- Drag the blue mallet with the mouse to hit the puck.
- The computer moves the red mallet toward the puck while defending its half of
  the table.
- Goals are counted when the puck crosses the top or bottom goal opening.
- After each goal, the puck and mallets reset briefly before play resumes.
- Use **New Game** to reset both scores and start again.

## Running locally

From the repository root, open `air-hockey/air-hockey.html` directly in a
browser or serve the static files with a local web server:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/air-hockey/air-hockey.html`.

