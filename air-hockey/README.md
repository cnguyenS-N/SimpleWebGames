# Air Hockey

A canvas-based air hockey game against a computer-controlled mallet.

## Files

- `air-hockey.html` - play screen with score display, canvas table, reset button, and "All games" navigation link.
- `air-hockey.js` - game state, puck physics, mallet movement, scoring, computer behavior, and render loop.
- `air-hockey.css` - page and canvas styling.

## Gameplay

- Drag the blue player mallet with the mouse.
- The red computer mallet tracks the puck on its half of the table and returns to a defensive position otherwise.
- The puck bounces off walls and mallets, slows with friction, and has a capped maximum speed.
- Goals are scored through the centered openings at the top and bottom of the table.
- The first side to 2 goals wins.
- The new-game button resets scores, puck position, mallets, and game status.

## Running locally

From the repository root:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/air-hockey/air-hockey.html
```
