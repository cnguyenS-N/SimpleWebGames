(function () {
  const WIDTH = 600;
  const HEIGHT = 400;
  const CENTER_Y = HEIGHT / 2;
  const WALL = 20;
  const GOAL_WIDTH = 140;
  const MALLET_R = 28;
  const PUCK_R = 12;
  const WIN_SCORE = 2;
  const FRICTION = 0.992;
  const PUCK_MAX_SPEED = 14;
  const COMPUTER_SPEED = 4.5;
  const GOAL_PAUSE_MS = 1000;

  const canvas = document.getElementById("table");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("score");
  const statusEl = document.getElementById("status");
  const newGameBtn = document.getElementById("new-game");

  const state = {
    puck: { x: WIDTH / 2, y: HEIGHT / 2, vx: 0, vy: 0 },
    player: { x: WIDTH / 2, y: HEIGHT - WALL - MALLET_R - 10 },
    computer: { x: WIDTH / 2, y: WALL + MALLET_R + 10 },
    playerScore: 0,
    computerScore: 0,
    playing: true,
    pausedUntil: 0,
    mouseDown: false,
  };

  let lastTime = 0;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function clampMallet(mallet, isPlayer) {
    const minX = WALL + MALLET_R;
    const maxX = WIDTH - WALL - MALLET_R;
    mallet.x = clamp(mallet.x, minX, maxX);

    if (isPlayer) {
      mallet.y = clamp(mallet.y, CENTER_Y + MALLET_R, HEIGHT - WALL - MALLET_R);
    } else {
      mallet.y = clamp(mallet.y, WALL + MALLET_R, CENTER_Y - MALLET_R);
    }
  }

  function resetPuck() {
    state.puck.x = WIDTH / 2;
    state.puck.y = HEIGHT / 2;
    state.puck.vx = 0;
    state.puck.vy = 0;
  }

  function resetMallets() {
    state.player.x = WIDTH / 2;
    state.player.y = HEIGHT - WALL - MALLET_R - 10;
    state.computer.x = WIDTH / 2;
    state.computer.y = WALL + MALLET_R + 10;
  }

  function updateScoreDisplay() {
    scoreEl.textContent = `You: ${state.playerScore} — Computer: ${state.computerScore}`;
  }

  function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = "status" + (type ? " " + type : "");
  }

  function capSpeed(obj, maxSpeed) {
    const speed = Math.hypot(obj.vx, obj.vy);
    if (speed > maxSpeed) {
      const scale = maxSpeed / speed;
      obj.vx *= scale;
      obj.vy *= scale;
    }
  }

  function moveToward(mallet, targetX, targetY, speed) {
    const dx = targetX - mallet.x;
    const dy = targetY - mallet.y;
    const dist = Math.hypot(dx, dy);
    if (dist === 0) return;
    const step = Math.min(speed, dist);
    mallet.x += (dx / dist) * step;
    mallet.y += (dy / dist) * step;
  }

  function resolveMalletCollision(mallet) {
    const dx = state.puck.x - mallet.x;
    const dy = state.puck.y - mallet.y;
    const dist = Math.hypot(dx, dy);
    const minDist = MALLET_R + PUCK_R;

    if (dist >= minDist || dist === 0) return;

    const nx = dx / dist;
    const ny = dy / dist;
    const overlap = minDist - dist;

    state.puck.x += nx * overlap;
    state.puck.y += ny * overlap;

    const relVx = state.puck.vx;
    const relVy = state.puck.vy;
    const dot = relVx * nx + relVy * ny;

    if (dot < 0) {
      state.puck.vx -= 2 * dot * nx;
      state.puck.vy -= 2 * dot * ny;
    }

    state.puck.vx += nx * 3;
    state.puck.vy += ny * 3;
    capSpeed(state.puck, PUCK_MAX_SPEED);
  }

  function isInGoal(x) {
    const goalLeft = WIDTH / 2 - GOAL_WIDTH / 2;
    const goalRight = WIDTH / 2 + GOAL_WIDTH / 2;
    return x >= goalLeft && x <= goalRight;
  }

  function handleGoal(scorer) {
    if (scorer === "player") {
      state.playerScore += 1;
    } else {
      state.computerScore += 1;
    }

    updateScoreDisplay();
    resetPuck();
    resetMallets();
    state.pausedUntil = performance.now() + GOAL_PAUSE_MS;

    if (state.playerScore >= WIN_SCORE) {
      state.playing = false;
      setStatus("You win!", "win");
      return;
    }
    if (state.computerScore >= WIN_SCORE) {
      state.playing = false;
      setStatus("Computer wins!", "lose");
      return;
    }

    setStatus(scorer === "player" ? "Goal! You scored." : "Goal! Computer scored.");
  }

  function updateComputer() {
    if (state.puck.y < CENTER_Y) {
      moveToward(state.computer, state.puck.x, state.puck.y, COMPUTER_SPEED);
    } else {
      moveToward(state.computer, WIDTH / 2, WALL + MALLET_R + 30, COMPUTER_SPEED * 0.6);
    }
    clampMallet(state.computer, false);
  }

  function updatePuck() {
    state.puck.x += state.puck.vx;
    state.puck.y += state.puck.vy;
    state.puck.vx *= FRICTION;
    state.puck.vy *= FRICTION;

    const minX = WALL + PUCK_R;
    const maxX = WIDTH - WALL - PUCK_R;

    if (state.puck.x < minX) {
      state.puck.x = minX;
      state.puck.vx = Math.abs(state.puck.vx);
    } else if (state.puck.x > maxX) {
      state.puck.x = maxX;
      state.puck.vx = -Math.abs(state.puck.vx);
    }

    if (state.puck.y < WALL + PUCK_R) {
      if (isInGoal(state.puck.x)) {
        handleGoal("player");
        return;
      }
      state.puck.y = WALL + PUCK_R;
      state.puck.vy = Math.abs(state.puck.vy);
    } else if (state.puck.y > HEIGHT - WALL - PUCK_R) {
      if (isInGoal(state.puck.x)) {
        handleGoal("computer");
        return;
      }
      state.puck.y = HEIGHT - WALL - PUCK_R;
      state.puck.vy = -Math.abs(state.puck.vy);
    }

    resolveMalletCollision(state.player);
    resolveMalletCollision(state.computer);
    capSpeed(state.puck, PUCK_MAX_SPEED);
  }

  function update() {
    if (!state.playing) return;
    if (performance.now() < state.pausedUntil) return;

    updateComputer();
    updatePuck();
  }

  function drawTable() {
    ctx.fillStyle = "#7dd3fc";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#0c4a6e";
    ctx.fillRect(0, 0, WIDTH, WALL);
    ctx.fillRect(0, HEIGHT - WALL, WIDTH, WALL);
    ctx.fillRect(0, 0, WALL, HEIGHT);
    ctx.fillRect(WIDTH - WALL, 0, WALL, HEIGHT);

    const goalLeft = WIDTH / 2 - GOAL_WIDTH / 2;
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(WALL, 0, goalLeft - WALL, WALL);
    ctx.fillRect(goalLeft + GOAL_WIDTH, 0, WIDTH - WALL - (goalLeft + GOAL_WIDTH), WALL);
    ctx.fillRect(WALL, HEIGHT - WALL, goalLeft - WALL, WALL);
    ctx.fillRect(goalLeft + GOAL_WIDTH, HEIGHT - WALL, WIDTH - WALL - (goalLeft + GOAL_WIDTH), WALL);

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.setLineDash([12, 10]);
    ctx.beginPath();
    ctx.moveTo(WALL, CENTER_Y);
    ctx.lineTo(WIDTH - WALL, CENTER_Y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(WIDTH / 2, CENTER_Y, 40, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawMallet(mallet, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(mallet.x, mallet.y, MALLET_R, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function render() {
    drawTable();
    drawMallet(state.computer, "#dc2626");
    drawMallet(state.player, "#2563eb");
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.arc(state.puck.x, state.puck.y, PUCK_R, 0, Math.PI * 2);
    ctx.fill();
  }

  function loop(timestamp) {
    update();
    render();
    lastTime = timestamp;
    requestAnimationFrame(loop);
  }

  function canvasCoords(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = WIDTH / rect.width;
    const scaleY = HEIGHT / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  function setPlayerFromEvent(event) {
    const { x, y } = canvasCoords(event);
    state.player.x = x;
    state.player.y = y;
    clampMallet(state.player, true);
  }

  canvas.addEventListener("mousedown", (event) => {
    state.mouseDown = true;
    setPlayerFromEvent(event);
  });

  canvas.addEventListener("mousemove", (event) => {
    if (!state.mouseDown) return;
    setPlayerFromEvent(event);
  });

  window.addEventListener("mouseup", () => {
    state.mouseDown = false;
  });

  function resetGame() {
    state.playerScore = 0;
    state.computerScore = 0;
    state.playing = true;
    state.pausedUntil = 0;
    state.mouseDown = false;
    resetPuck();
    resetMallets();
    updateScoreDisplay();
    setStatus("Drag your mallet with the mouse. First to 2 wins!");
  }

  newGameBtn.addEventListener("click", resetGame);

  resetGame();
  requestAnimationFrame(loop);
})();
