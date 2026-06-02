const PAIRS = ["apple", "banana", "orange", "bicycle", "basketball", "briefcase"];
const TOTAL_PAIRS = PAIRS.length;
const FLIP_BACK_DELAY = 800;

const ICONS = {
  apple: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M32 8c-2 0-4 2-4 5 0 2 1 4 2 5-6 1-11 6-12 13-1 8 5 15 13 16 8 1 15-5 16-13 1-7-4-13-11-15 1-1 2-3 2-5 0-3-2-6-6-6z" fill="#e53935" stroke="#b71c1c" stroke-width="2"/>
    <path d="M32 6c0-2 2-4 4-4" fill="none" stroke="#558b2f" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="38" cy="5" rx="4" ry="2" fill="#7cb342" stroke="#558b2f" stroke-width="1"/>
  </svg>`,
  banana: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 48c8-4 14-12 18-22 4-10 6-18 8-24 2 6 4 14 2 22-2 10-8 18-16 24-4 3-8 2-12 0z" fill="#fdd835" stroke="#f9a825" stroke-width="2"/>
    <path d="M38 8c2 4 2 10 0 16" fill="none" stroke="#8d6e1a" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M14 46c6-2 12-8 16-16" fill="none" stroke="#f9a825" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  orange: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="32" cy="34" r="22" fill="#ff9800" stroke="#e65100" stroke-width="2"/>
    <circle cx="32" cy="34" r="18" fill="none" stroke="#ffb74d" stroke-width="1" opacity="0.6"/>
    <path d="M32 10c0-2 2-4 4-4" fill="none" stroke="#558b2f" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="38" cy="9" rx="3" ry="2" fill="#7cb342" stroke="#558b2f" stroke-width="1"/>
  </svg>`,
  bicycle: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="16" cy="42" r="12" fill="none" stroke="#37474f" stroke-width="3"/>
    <circle cx="48" cy="42" r="12" fill="none" stroke="#37474f" stroke-width="3"/>
    <circle cx="16" cy="42" r="3" fill="#78909c"/>
    <circle cx="48" cy="42" r="3" fill="#78909c"/>
    <path d="M16 42 L28 22 L38 22 L48 42" fill="none" stroke="#37474f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28 22 L38 42" fill="none" stroke="#37474f" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M38 22 L44 14" fill="none" stroke="#37474f" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="42" y="10" width="8" height="4" rx="1" fill="#ef5350" stroke="#c62828" stroke-width="1"/>
    <circle cx="28" cy="22" r="2" fill="#78909c"/>
  </svg>`,
  basketball: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="32" cy="32" r="24" fill="#ff6f00" stroke="#e65100" stroke-width="2"/>
    <path d="M32 8v48" fill="none" stroke="#bf360c" stroke-width="2"/>
    <path d="M8 32h48" fill="none" stroke="#bf360c" stroke-width="2"/>
    <path d="M14 14c8 6 8 30 0 36" fill="none" stroke="#bf360c" stroke-width="2"/>
    <path d="M50 14c-8 6-8 30 0 36" fill="none" stroke="#bf360c" stroke-width="2"/>
  </svg>`,
  briefcase: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="8" y="22" width="48" height="32" rx="4" fill="#5d4037" stroke="#3e2723" stroke-width="2"/>
    <rect x="8" y="22" width="48" height="8" rx="2" fill="#6d4c41" stroke="#3e2723" stroke-width="1"/>
    <path d="M24 22v-6c0-3 3-6 8-6s8 3 8 6v6" fill="none" stroke="#3e2723" stroke-width="2.5"/>
    <rect x="28" y="36" width="8" height="6" rx="1" fill="#ffd54f" stroke="#f9a825" stroke-width="1"/>
  </svg>`,
};

const statusEl = document.getElementById("status");
const boardEl = document.getElementById("board");
const newGameBtn = document.getElementById("new-game");

let deck = [];
let cards = [];
let flippedIndices = [];
let matchedCount = 0;
let moves = 0;
let gameOver = false;
let boardLocked = false;

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createDeck() {
  return shuffle(PAIRS.flatMap((id) => [id, id]));
}

function setBoardLocked(locked) {
  boardLocked = locked;
  boardEl.classList.toggle("locked", locked);
}

function buildBoard() {
  boardEl.innerHTML = "";
  cards = [];
  flippedIndices = [];
  matchedCount = 0;
  moves = 0;
  gameOver = false;
  setBoardLocked(false);
  statusEl.textContent = "Find all 6 matching pairs";
  statusEl.className = "status";

  deck.forEach((pairId, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.dataset.index = String(index);
    card.setAttribute("role", "gridcell");
    card.setAttribute("aria-label", "Face down card");

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const back = document.createElement("div");
    back.className = "card-face card-back";
    back.textContent = "?";

    const front = document.createElement("div");
    front.className = "card-face card-front";
    front.innerHTML = ICONS[pairId];

    inner.appendChild(back);
    inner.appendChild(front);
    card.appendChild(inner);

    card.addEventListener("click", () => handleCardClick(index));
    boardEl.appendChild(card);
    cards.push(card);
  });
}

function handleCardClick(index) {
  if (boardLocked || gameOver) return;

  const card = cards[index];
  if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  card.setAttribute("aria-label", `Face up: ${deck[index]}`);
  flippedIndices.push(index);

  if (flippedIndices.length < 2) return;

  moves += 1;
  const [first, second] = flippedIndices;
  const isMatch = deck[first] === deck[second];

  if (isMatch) {
    cards[first].classList.add("matched");
    cards[second].classList.add("matched");
    cards[first].disabled = true;
    cards[second].disabled = true;
    flippedIndices = [];
    matchedCount += 1;

    if (matchedCount === TOTAL_PAIRS) {
      endGame(`You win in ${moves} move${moves === 1 ? "" : "s"}!`);
    }
    return;
  }

  setBoardLocked(true);
  setTimeout(() => {
    cards[first].classList.remove("flipped");
    cards[second].classList.remove("flipped");
    cards[first].setAttribute("aria-label", "Face down card");
    cards[second].setAttribute("aria-label", "Face down card");
    flippedIndices = [];
    setBoardLocked(false);
  }, FLIP_BACK_DELAY);
}

function endGame(message) {
  gameOver = true;
  statusEl.textContent = message;
  statusEl.className = "status win";
}

function resetGame() {
  deck = createDeck();
  buildBoard();
}

newGameBtn.addEventListener("click", resetGame);

deck = createDeck();
buildBoard();
