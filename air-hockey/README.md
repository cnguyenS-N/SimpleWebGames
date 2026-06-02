# Air Hockey

Canvas-based air hockey game where the player drags a mallet against a computer-controlled opponent. The first side to score 2 goals wins the match.

## Files

- `../air-hockey.html` renders the game screen, scoreboard, canvas, reset button, and navigation back to the game picker.
- `../air-hockey.js` contains the table drawing, puck physics, mallet collision handling, scoring, reset flow, and computer mallet movement.
- `air-hockey.css` styles the Air Hockey screen. From `air-hockey.html`, reference it as `air-hockey/air-hockey.css`.

## Gameplay notes

- The game runs on a 600x400 canvas with top and bottom goals.
- The player mallet is constrained to the lower half of the table and follows mouse drag input.
- The computer mallet tracks the puck on its half and returns toward center while defending.
- Goals pause play briefly, reset the puck and mallets, and update the scoreboard.

