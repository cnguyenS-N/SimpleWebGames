const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");

class FakeClassList {
  constructor(element) {
    this.element = element;
    this.classes = new Set();
  }

  add(...names) {
    names.forEach((name) => this.classes.add(name));
    this.sync();
  }

  remove(...names) {
    names.forEach((name) => this.classes.delete(name));
    this.sync();
  }

  contains(name) {
    return this.classes.has(name);
  }

  toggle(name, force) {
    const shouldAdd = force === undefined ? !this.classes.has(name) : Boolean(force);
    if (shouldAdd) {
      this.classes.add(name);
    } else {
      this.classes.delete(name);
    }
    this.sync();
    return shouldAdd;
  }

  setFromString(value) {
    this.classes = new Set(String(value).split(/\s+/).filter(Boolean));
    this.sync();
  }

  sync() {
    this.element._className = Array.from(this.classes).join(" ");
  }
}

class FakeElement {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.dataset = {};
    this.attributes = new Map();
    this.listeners = new Map();
    this.disabled = false;
    this.type = "";
    this._className = "";
    this._textContent = "";
    this._innerHTML = "";
    this.classList = new FakeClassList(this);
  }

  get className() {
    return this._className;
  }

  set className(value) {
    this.classList.setFromString(value);
  }

  get textContent() {
    return this._textContent;
  }

  set textContent(value) {
    this._textContent = String(value);
  }

  get innerHTML() {
    return this._innerHTML;
  }

  set innerHTML(value) {
    this._innerHTML = String(value);
    if (value === "") {
      this.children = [];
    }
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  setAttribute(name, value) {
    const stringValue = String(value);
    this.attributes.set(name, stringValue);
    if (name === "class") {
      this.className = stringValue;
    }
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  addEventListener(type, listener) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(listener);
  }

  click() {
    for (const listener of this.listeners.get("click") ?? []) {
      listener({ currentTarget: this, target: this });
    }
  }

  matches(selector) {
    if (selector.startsWith(".")) {
      return this.classList.contains(selector.slice(1));
    }
    if (selector.startsWith("#")) {
      return this.getAttribute("id") === selector.slice(1);
    }
    return this.tagName.toLowerCase() === selector.toLowerCase();
  }

  querySelectorAll(selector) {
    const matches = [];
    const visit = (element) => {
      for (const child of element.children) {
        if (child.matches(selector)) {
          matches.push(child);
        }
        visit(child);
      }
    };
    visit(this);
    return matches;
  }
}

class FakeDocument {
  constructor(elementsById) {
    this.elementsById = elementsById;
  }

  getElementById(id) {
    return this.elementsById[id] ?? null;
  }

  createElement(tagName) {
    return new FakeElement(tagName);
  }
}

function makeRandomQueue(values = []) {
  const queue = values.slice();
  return () => (queue.length > 0 ? queue.shift() : 0.5);
}

function loadBrowserScript(fileName, elementsById, randomValues = []) {
  const timers = [];
  const context = {
    console,
    document: new FakeDocument(elementsById),
    Math: Object.create(Math),
    setTimeout(callback, delay) {
      timers.push({ callback, delay });
      return timers.length;
    },
    clearTimeout() {},
  };
  context.Math.random = makeRandomQueue(randomValues);
  context.window = context;
  vm.createContext(context);
  vm.runInContext(
    fs.readFileSync(path.join(ROOT, fileName), "utf8"),
    context,
    { filename: fileName }
  );
  return {
    context,
    timers,
    runNextTimer() {
      const timer = timers.shift();
      assert.ok(timer, "expected a pending timer");
      timer.callback();
      return timer;
    },
  };
}

function runInGame(context, code) {
  return vm.runInContext(code, context);
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeTicTacToeGame(randomValues = []) {
  const status = new FakeElement("p");
  const board = new FakeElement("div");
  const newGame = new FakeElement("button");

  for (let index = 0; index < 9; index++) {
    const cell = new FakeElement("button");
    cell.className = "cell";
    cell.dataset.index = String(index);
    board.appendChild(cell);
  }

  return {
    status,
    board,
    newGame,
    ...loadBrowserScript("game.js", { status, board, "new-game": newGame }, randomValues),
  };
}

function makeConnect4Game(randomValues = []) {
  const status = new FakeElement("p");
  const board = new FakeElement("div");
  const columns = new FakeElement("div");
  const newGame = new FakeElement("button");

  for (let col = 0; col < 7; col++) {
    const button = new FakeElement("button");
    button.className = "col-btn";
    button.dataset.col = String(col);
    columns.appendChild(button);
  }

  return {
    status,
    board,
    columns,
    newGame,
    ...loadBrowserScript(
      "connect-4/connect-4.js",
      { status, board, columns, "new-game": newGame },
      randomValues
    ),
  };
}

function makeMemoryMatchGame(randomValues = []) {
  const status = new FakeElement("p");
  const board = new FakeElement("div");
  const newGame = new FakeElement("button");

  return {
    status,
    board,
    newGame,
    ...loadBrowserScript(
      "memory-match.js",
      { status, board, "new-game": newGame },
      randomValues
    ),
  };
}

function setMemoryDeck(game, deck) {
  runInGame(
    game.context,
    `deck = ${JSON.stringify(deck)}; buildBoard();`
  );
}

function emptyConnectBoard() {
  return Array.from({ length: 6 }, () => Array(7).fill(0));
}

test("Tic-Tac-Toe detects winners, ties, empty cells, and winning moves", () => {
  const { context } = makeTicTacToeGame();

  assert.equal(context.getWinner(["X", "X", "X", null, null, null, null, null, null]), "X");
  assert.equal(context.getWinner(["O", null, null, null, "O", null, null, null, "O"]), "O");
  assert.equal(context.getWinner(["X", "O", "X", "O", "X", "O", "O", "X", "O"]), null);

  assert.equal(context.isTie(["X", "O", "X", "O", "X", "O", "O", "X", "O"]), true);
  assert.equal(context.isTie(["X", null, "O", null, null, null, null, null, null]), false);
  assert.deepEqual(plain(context.getEmptyCells(["X", null, "O", null, null, "X", "O", null, null])), [1, 3, 4, 7, 8]);

  assert.equal(context.findWinningMove(["O", "O", null, "X", null, null, null, null, "X"], "O"), 2);
  assert.equal(context.findWinningMove(["X", null, "O", null, "X", null, null, null, null], "X"), 8);
  assert.equal(context.findWinningMove(["X", "O", "X", null, "O", null, null, "X", null], "O"), null);
});

test("Tic-Tac-Toe computer move prioritizes random, winning, blocking, and heuristic choices", () => {
  assert.equal(
    makeTicTacToeGame([0.99]).context.getComputerMove(["O", "O", null, "X", null, null, null, null, "X"]),
    2
  );
  assert.equal(
    makeTicTacToeGame([0.99, 0.1]).context.getComputerMove(["X", "X", null, "O", null, null, null, null, null]),
    2
  );
  assert.equal(
    makeTicTacToeGame([0.99, 0.99]).context.getComputerMove(Array(9).fill(null)),
    4
  );
  assert.equal(
    makeTicTacToeGame([0.1, 0.99]).context.getComputerMove(["X", null, "O", null, null, null, null, null, null]),
    8
  );
});

test("Tic-Tac-Toe player win ends the game and disables all cells", () => {
  const game = makeTicTacToeGame();
  runInGame(
    game.context,
    `board = ["X", "X", null, null, "O", null, null, null, "O"]; renderBoard();`
  );

  game.context.handlePlayerClick(2);

  assert.equal(game.status.textContent, "You win!");
  assert.equal(game.status.className, "status win");
  assert.ok(game.board.children.every((cell) => cell.disabled));
});

test("Connect 4 board helpers drop discs without mutating input and identify legal columns", () => {
  const { context } = makeConnect4Game();
  const board = context.createEmptyBoard();
  board[0][0] = 1;

  assert.equal(board[1][0], 0, "rows should not share array references");

  const fullColumn = context.createEmptyBoard();
  for (let row = 0; row < 6; row++) {
    fullColumn[row][0] = 1;
  }

  assert.equal(context.getDropRowForBoard(board, 0), 5);
  assert.equal(context.getDropRowForBoard(fullColumn, 0), -1);
  assert.deepEqual(plain(context.getLegalColumns(fullColumn)), [1, 2, 3, 4, 5, 6]);

  const dropped = context.dropInColumn(board, 0, 2);
  assert.equal(dropped.row, 5);
  assert.equal(dropped.board[5][0], 2);
  assert.equal(board[5][0], 0, "dropInColumn should leave the source board unchanged");
  assert.equal(context.dropInColumn(fullColumn, 0, 2), null);
});

test("Connect 4 detects horizontal, vertical, and diagonal wins with winning cells", () => {
  const { context } = makeConnect4Game();

  const horizontal = emptyConnectBoard();
  horizontal[5][0] = horizontal[5][1] = horizontal[5][2] = horizontal[5][3] = 1;
  assert.equal(context.checkWinFrom(horizontal, 5, 3, 1), true);
  assert.deepEqual(plain(context.getWinningCells(horizontal, 5, 1, 1)), [[5, 0], [5, 1], [5, 2], [5, 3]]);

  const vertical = emptyConnectBoard();
  vertical[5][2] = vertical[4][2] = vertical[3][2] = vertical[2][2] = 2;
  assert.equal(context.checkWinFrom(vertical, 2, 2, 2), true);

  const diagonal = emptyConnectBoard();
  diagonal[5][0] = diagonal[4][1] = diagonal[3][2] = diagonal[2][3] = 1;
  assert.equal(context.checkWinFrom(diagonal, 3, 2, 1), true);
  assert.deepEqual(plain(context.getWinningCells(diagonal, 3, 2, 1)), [[2, 3], [3, 2], [4, 1], [5, 0]]);

  assert.equal(context.getWinningCells(emptyConnectBoard(), 5, 0, 1), null);
});

test("Connect 4 computer move wins, blocks, prefers center, and handles a full board", () => {
  const winningGame = makeConnect4Game();
  const winningBoard = emptyConnectBoard();
  winningBoard[5][0] = winningBoard[5][1] = winningBoard[5][2] = 2;
  assert.equal(winningGame.context.findWinningColumn(winningBoard, 2), 3);
  assert.equal(winningGame.context.getComputerMove(winningBoard), 3);

  const blockingGame = makeConnect4Game([0.5]);
  const blockingBoard = emptyConnectBoard();
  blockingBoard[5][0] = blockingBoard[5][1] = blockingBoard[5][2] = 1;
  assert.equal(blockingGame.context.getComputerMove(blockingBoard), 3);

  const centerGame = makeConnect4Game([0.99, 0.1]);
  assert.equal(centerGame.context.getComputerMove(emptyConnectBoard()), 3);

  const fullGame = makeConnect4Game();
  const fullBoard = Array.from({ length: 6 }, () => Array(7).fill(1));
  assert.equal(fullGame.context.isBoardFull(fullBoard), true);
  assert.equal(fullGame.context.getComputerMove(fullBoard), null);
});

test("Memory Match creates a two-card deck for every pair and shuffles without mutation", () => {
  const { context } = makeMemoryMatchGame(Array(20).fill(0));
  const original = ["a", "b", "c"];

  assert.deepEqual(context.shuffle(original), ["b", "c", "a"]);
  assert.deepEqual(original, ["a", "b", "c"]);

  const deck = context.createDeck();
  assert.equal(deck.length, 12);
  assert.deepEqual(
    deck.reduce((counts, id) => {
      counts[id] = (counts[id] ?? 0) + 1;
      return counts;
    }, {}),
    {
      apple: 2,
      banana: 2,
      orange: 2,
      bicycle: 2,
      basketball: 2,
      briefcase: 2,
    }
  );
});

test("Memory Match builds accessible cards and toggles the board lock", () => {
  const game = makeMemoryMatchGame();

  assert.equal(game.board.children.length, 12);
  assert.equal(game.status.textContent, "Find all 6 matching pairs");
  assert.equal(game.board.children[0].getAttribute("role"), "gridcell");
  assert.equal(game.board.children[0].getAttribute("aria-label"), "Face down card");

  game.context.setBoardLocked(true);
  assert.equal(game.board.classList.contains("locked"), true);
  game.context.setBoardLocked(false);
  assert.equal(game.board.classList.contains("locked"), false);
});

test("Memory Match flips mismatched cards back after the delay and ignores locked clicks", () => {
  const game = makeMemoryMatchGame();
  setMemoryDeck(game, [
    "apple",
    "banana",
    "apple",
    "banana",
    "orange",
    "orange",
    "bicycle",
    "bicycle",
    "basketball",
    "basketball",
    "briefcase",
    "briefcase",
  ]);

  game.board.children[0].click();
  game.board.children[1].click();

  assert.equal(game.board.classList.contains("locked"), true);
  assert.equal(game.board.children[0].classList.contains("flipped"), true);
  assert.equal(game.board.children[1].classList.contains("flipped"), true);
  assert.equal(game.timers[0].delay, 800);

  game.board.children[2].click();
  assert.equal(game.board.children[2].classList.contains("flipped"), false);

  game.runNextTimer();

  assert.equal(game.board.children[0].classList.contains("flipped"), false);
  assert.equal(game.board.children[1].classList.contains("flipped"), false);
  assert.equal(game.board.children[0].getAttribute("aria-label"), "Face down card");
  assert.equal(game.board.classList.contains("locked"), false);
});

test("Memory Match marks pairs as matched and reports the final move count", () => {
  const game = makeMemoryMatchGame();
  setMemoryDeck(game, [
    "apple",
    "apple",
    "banana",
    "banana",
    "orange",
    "orange",
    "bicycle",
    "bicycle",
    "basketball",
    "basketball",
    "briefcase",
    "briefcase",
  ]);

  for (let index = 0; index < game.board.children.length; index += 2) {
    game.board.children[index].click();
    game.board.children[index + 1].click();
  }

  assert.equal(game.status.textContent, "You win in 6 moves!");
  assert.equal(game.status.className, "status win");
  assert.ok(game.board.children.every((card) => card.classList.contains("matched")));
  assert.ok(game.board.children.every((card) => card.disabled));

  game.board.children[0].click();
  assert.equal(game.status.textContent, "You win in 6 moves!");
});
