let timerElement = document.getElementById('timer');
let startTime = null;
let timerInterval = null;
let isRunning = false;
let holdStartTime = null;
let holdThreshold = 500; // 0.5 second hold
let readyToStart = false;

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        let elapsedTime = Date.now() - startTime;
        updateTimer(elapsedTime);
    }, 10);
    isRunning = true;
    timerElement.style.color = 'black';
}

function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    readyToStart = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerElement.textContent = '00:00.000';
    startTime = null;
    isRunning = false;
    readyToStart = false;
    timerElement.style.color = 'black';
}

function updateTimer(elapsedTime) {
    let totalSeconds = (elapsedTime / 1000).toFixed(3);
    let minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    let seconds = (totalSeconds % 60).toFixed(3).padStart(6, '0');
    timerElement.textContent = `${minutes}:${seconds}`;
}

window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (!isRunning) {
            if (holdStartTime === null) {
                holdStartTime = Date.now();
            } else {
                let holdDuration = Date.now() - holdStartTime;
                if (holdDuration >= holdThreshold && !readyToStart) {
                    timerElement.style.color = 'green';
                    readyToStart = true;
                }
            }
        }
    }
});

window.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
        if (isRunning) {
            stopTimer();
        } else if (readyToStart) {
            startTimer();
        }
        holdStartTime = null;
    }
});
