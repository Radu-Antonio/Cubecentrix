const moves = ["U", "D", "L", "R", "F", "B"];
const endings = ["", "'", "2"];
const active = new Set();

const n = moves.length;
const m = endings.length;
const opposite = {
  U: "D",
  D: "U",
  L: "R",
  R: "L",
  F: "B",
  B: "F",
};

const randomNum = (limit) => Math.floor(Math.random() * limit);
const removeIntersections = function (curr) {
  active.forEach((move) => {
    if (move !== curr && move !== opposite[curr]) active.delete(move);
  });
};

const generateScramble = function (length) {
  const scramble = [];
  let count = 0;
  while (count < length) {
    const randMove = moves[randomNum(n)];
    if (
      (scramble[count - 1] && scramble[count - 1].startsWith(randMove)) ||
      active.has(randMove)
    ) {
      continue;
    }
    active.add(randMove);
    scramble.push(randMove + endings[randomNum(m)]);
    removeIntersections(randMove);
    count++;
  }
  return scramble;
};

let timerElement = document.getElementById("timer");
let startTime = null;
let timerInterval = null;
let isRunning = false;
let holdStartTime = null;
let holdThreshold = 250;
let readyToStart = false;

document.getElementById("scramble").innerText = generateScramble(20).join(" ");

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    let elapsedTime = Date.now() - startTime;
    updateTimer(elapsedTime);
  }, 10);
  isRunning = true;
  timerElement.style.color = "black";
}

function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  readyToStart = false;
  document.getElementById("scramble").innerText =
    generateScramble(20).join(" ");
}

function updateTimer(elapsedTime) {
  let totalSeconds = (elapsedTime / 1000).toFixed(3);
  let minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  let seconds = (totalSeconds % 60).toFixed(2).padStart(5, "0");
  timerElement.textContent = `${minutes}:${seconds}`;
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    if (!isRunning) {
      if (holdStartTime === null) {
        holdStartTime = Date.now();
      } else {
        let holdDuration = Date.now() - holdStartTime;
        if (holdDuration >= holdThreshold && !readyToStart) {
          timerElement.style.color = "green";
          readyToStart = true;
        }
      }
    }
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    if (isRunning) {
      stopTimer();
    } else if (readyToStart) {
      startTimer();
    }
    holdStartTime = null;
  }
});
