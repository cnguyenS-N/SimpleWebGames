const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const CENTER = 4;
const CORNERS = [0, 2, 6, 8];
const EDGES = [1, 3, 5, 7];

const statusEl = document.getElementById("status");
const boardEl = document.getElementById("board");
const cells = boardEl.querySelectorAll(".cell");
const newGameBtn = document.getElementById("new-game");

let board = Array(9).fill(null);
let gameOver = false;

function getWinner(b) {
  for (const [a, c, d] of WIN_LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) {
      return b[a];
    }
  }
  return null;
}

function isTie(b) {
  return b.every((cell) => cell !== null);
}

function getEmptyCells(b) {
  return b.reduce((acc, val, i) => (val === null ? acc.concat(i) : acc), []);
}

function findWinningMove(b, player) {
  for (const i of getEmptyCells(b)) {
    const copy = b.slice();
    copy[i] = player;
    if (getWinner(copy) === player) return i;
  }
  return null;
}

function randomEmptyCell(b) {
  const empty = getEmptyCells(b);
  return empty[Math.floor(Math.random() * empty.length)];
}

function pickBestHeuristic(b) {
  if (b[CENTER] === null) return CENTER;

  const emptyCorners = CORNERS.filter((i) => b[i] === null);
  if (emptyCorners.length > 0) {
    return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
  }

  const emptyEdges = EDGES.filter((i) => b[i] === null);
  return emptyEdges[Math.floor(Math.random() * emptyEdges.length)];
}

function getComputerMove(b) {
  if (Math.random() < 0.2) return randomEmptyCell(b);

  const win = findWinningMove(b, "O");
  if (win !== null) return win;

  if (Math.random() < 0.85) {
    const block = findWinningMove(b, "X");
    if (block !== null) return block;
  }

  return pickBestHeuristic(b);
}

function renderCell(index) {
  const cell = cells[index];
  cell.textContent = board[index] ?? "";
  cell.classList.remove("x", "o");
  if (board[index] === "X") cell.classList.add("x");
  if (board[index] === "O") cell.classList.add("o");
  cell.disabled = board[index] !== null || gameOver;
}

function renderBoard() {
  for (let i = 0; i < 9; i++) renderCell(i);
}

function setStatus(message, type) {
  statusEl.textContent = message;
  statusEl.className = "status" + (type ? " " + type : "");
}

function endGame(message, type) {
  gameOver = true;
  setStatus(message, type);
  cells.forEach((cell) => (cell.disabled = true));
}

function handlePlayerClick(index) {
  if (gameOver || board[index] !== null) return;

  board[index] = "X";
  renderCell(index);

  if (getWinner(board) === "X") {
    endGame("You win!", "win");
    return;
  }
  if (isTie(board)) {
    endGame("It's a tie!", "tie");
    return;
  }

  setTimeout(() => {
    const move = getComputerMove(board);
    board[move] = "O";
    renderCell(move);

    if (getWinner(board) === "O") {
      endGame("Computer wins!", "lose");
      return;
    }
    if (isTie(board)) {
      endGame("It's a tie!", "tie");
      return;
    }

    setStatus("Your turn (X)");
  }, 300);
}

function resetGame() {
  board = Array(9).fill(null);
  gameOver = false;
  renderBoard();
  setStatus("Your turn (X)");
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => handlePlayerClick(Number(cell.dataset.index)));
});

newGameBtn.addEventListener("click", resetGame);

renderBoard();
