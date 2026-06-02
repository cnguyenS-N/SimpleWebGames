const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER = 1;
const COMPUTER = 2;

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
];

const CENTER_BIAS = [3, 2, 4, 1, 5, 0, 6];

const statusEl = document.getElementById("status");
const boardEl = document.getElementById("board");
const columnsEl = document.getElementById("columns");
const colBtns = columnsEl.querySelectorAll(".col-btn");
const newGameBtn = document.getElementById("new-game");

let board = createEmptyBoard();
let cells = [];
let gameOver = false;
let waitingForComputer = false;

function createEmptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
}

function buildBoardDom() {
  boardEl.innerHTML = "";
  cells = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);
      cell.setAttribute("role", "gridcell");
      cell.setAttribute("aria-label", `Row ${row + 1}, column ${col + 1}, empty`);
      boardEl.appendChild(cell);
      cells.push(cell);
    }
  }
}

function cellAt(row, col) {
  return cells[row * COLS + col];
}

function getDropRow(col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === EMPTY) return row;
  }
  return -1;
}

function getLegalColumns(b) {
  const legal = [];
  for (let col = 0; col < COLS; col++) {
    if (getDropRowForBoard(b, col) !== -1) legal.push(col);
  }
  return legal;
}

function getDropRowForBoard(b, col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (b[row][col] === EMPTY) return row;
  }
  return -1;
}

function dropInColumn(b, col, player) {
  const row = getDropRowForBoard(b, col);
  if (row === -1) return null;
  const copy = b.map((r) => r.slice());
  copy[row][col] = player;
  return { board: copy, row, col };
}

function countInDirection(b, row, col, dr, dc, player) {
  let count = 0;
  let r = row;
  let c = col;
  while (r >= 0 && r < ROWS && c >= 0 && c < COLS && b[r][c] === player) {
    count++;
    r += dr;
    c += dc;
  }
  return count;
}

function checkWinFrom(b, row, col, player) {
  for (const [dr, dc] of DIRECTIONS) {
    const forward =
      countInDirection(b, row + dr, col + dc, dr, dc, player) + 1;
    const backward =
      countInDirection(b, row - dr, col - dc, -dr, -dc, player);
    if (forward + backward >= 4) return true;
  }
  return false;
}

function getWinningCells(b, row, col, player) {
  for (const [dr, dc] of DIRECTIONS) {
    const line = [[row, col]];
    let r = row + dr;
    let c = col + dc;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && b[r][c] === player) {
      line.push([r, c]);
      r += dr;
      c += dc;
    }
    r = row - dr;
    c = col - dc;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && b[r][c] === player) {
      line.unshift([r, c]);
      r -= dr;
      c -= dc;
    }
    if (line.length >= 4) return line;
  }
  return null;
}

function isBoardFull(b) {
  return b[0].every((cell) => cell !== EMPTY);
}

function findWinningColumn(b, player) {
  for (const col of getLegalColumns(b)) {
    const result = dropInColumn(b, col, player);
    if (result && checkWinFrom(result.board, result.row, result.col, player)) {
      return col;
    }
  }
  return null;
}

function pickByCenterBias(legal) {
  for (const col of CENTER_BIAS) {
    if (legal.includes(col)) return col;
  }
  return legal[0];
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getComputerMove(b) {
  const legal = getLegalColumns(b);
  if (legal.length === 0) return null;

  const win = findWinningColumn(b, COMPUTER);
  if (win !== null) return win;

  if (Math.random() < 0.85) {
    const block = findWinningColumn(b, PLAYER);
    if (block !== null) return block;
  }

  const biased = CENTER_BIAS.filter((col) => legal.includes(col));
  if (biased.length > 0 && Math.random() < 0.7) {
    return pickByCenterBias(biased);
  }

  return randomFrom(legal);
}

function renderCell(row, col) {
  const cell = cellAt(row, col);
  const value = board[row][col];
  cell.classList.remove("player", "computer", "winning");
  if (value === PLAYER) {
    cell.classList.add("player");
    cell.setAttribute("aria-label", `Row ${row + 1}, column ${col + 1}, red`);
  } else if (value === COMPUTER) {
    cell.classList.add("computer");
    cell.setAttribute("aria-label", `Row ${row + 1}, column ${col + 1}, green`);
  } else {
    cell.setAttribute("aria-label", `Row ${row + 1}, column ${col + 1}, empty`);
  }
}

function renderBoard() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      renderCell(row, col);
    }
  }
}

function highlightWinningCells(winCells) {
  for (const [row, col] of winCells) {
    cellAt(row, col).classList.add("winning");
  }
}

function updateColumnButtons() {
  const disabled = gameOver || waitingForComputer;
  colBtns.forEach((btn) => {
    const col = Number(btn.dataset.col);
    const full = getDropRow(col) === -1;
    btn.disabled = disabled || full;
    const emptySlots = full ? 0 : getDropRow(col) + 1;
    btn.setAttribute(
      "aria-label",
      `Column ${col + 1}${full ? ", full" : `, ${emptySlots} empty slots`}`
    );
  });
}

function setStatus(message, type) {
  statusEl.textContent = message;
  statusEl.className = "status" + (type ? " " + type : "");
}

function endGame(message, type, winCells) {
  gameOver = true;
  waitingForComputer = false;
  setStatus(message, type);
  if (winCells) highlightWinningCells(winCells);
  updateColumnButtons();
}

function applyMove(col, player) {
  const row = getDropRow(col);
  if (row === -1) return null;
  board[row][col] = player;
  renderCell(row, col);
  return { row, col };
}

function afterPlayerMove(row, col) {
  if (checkWinFrom(board, row, col, PLAYER)) {
    const winCells = getWinningCells(board, row, col, PLAYER);
    endGame("You win!", "win", winCells);
    return;
  }
  if (isBoardFull(board)) {
    endGame("It's a tie!", "tie");
    return;
  }

  waitingForComputer = true;
  setStatus("Computer is thinking…");
  updateColumnButtons();

  setTimeout(() => {
    const moveCol = getComputerMove(board);
    if (moveCol === null) {
      waitingForComputer = false;
      updateColumnButtons();
      return;
    }

    const { row: compRow, col: compCol } = applyMove(moveCol, COMPUTER);

    if (checkWinFrom(board, compRow, compCol, COMPUTER)) {
      const winCells = getWinningCells(board, compRow, compCol, COMPUTER);
      endGame("Computer wins!", "lose", winCells);
      return;
    }
    if (isBoardFull(board)) {
      endGame("It's a tie!", "tie");
      return;
    }

    waitingForComputer = false;
    setStatus("Your turn — drop a red disc");
    updateColumnButtons();
  }, 300);
}

function handleColumnClick(col) {
  if (gameOver || waitingForComputer) return;
  const row = getDropRow(col);
  if (row === -1) return;

  applyMove(col, PLAYER);
  updateColumnButtons();
  afterPlayerMove(row, col);
}

function resetGame() {
  board = createEmptyBoard();
  gameOver = false;
  waitingForComputer = false;
  renderBoard();
  setStatus("Your turn — drop a red disc");
  updateColumnButtons();
}

colBtns.forEach((btn) => {
  btn.addEventListener("click", () => handleColumnClick(Number(btn.dataset.col)));
});

newGameBtn.addEventListener("click", resetGame);

buildBoardDom();
renderBoard();
updateColumnButtons();
