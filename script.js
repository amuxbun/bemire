const startBtn = document.getElementById('start-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const resultDiv = document.getElementById('result');
const heart = document.getElementById('heart');
const player = document.getElementById('player');
const gameArea = document.getElementById('game-area');
const instructions = document.getElementById('instructions');
let score = 0;

let heartInterval;

function startGame() {
    startBtn.classList.add('hidden');
    instructions.classList.add('hidden');
    heart.style.animation = "fall 2s infinite";

    heartInterval = setInterval(function() {
        const heartClone = heart.cloneNode();
        gameArea.appendChild(heartClone);

        const heartPosition = Math.floor(Math.random() * (gameArea.offsetWidth - 30));
        heartClone.style.left = heartPosition + 'px';
        
        heartClone.addEventListener('animationend', () => {
            gameArea.removeChild(heartClone);
        });

        heartClone.addEventListener('click', () => {
            score++;
            if (score >= 10) {
                clearInterval(heartInterval);
                displayResult();
            }
        });
    }, 1500);
}

function displayResult() {
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `<h2>Yay! You caught ${score} hearts! 💖</h2>`;
}

function playAgain() {
    resultDiv.classList.add('hidden');
    score = 0;
    startBtn.classList.remove('hidden');
    instructions.classList.remove('hidden');
}

startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', playAgain);

// Move the player left or right using the arrow keys
document.addEventListener('keydown', function(event) {
    const playerLeft = parseInt(window.getComputedStyle(player).left, 10);
    if (event.key === 'ArrowLeft' && playerLeft > 0) {
        player.style.left = (playerLeft - 20) + 'px';
    }
    if (event.key === 'ArrowRight' && playerLeft < gameArea.offsetWidth - 50) {
        player.style.left = (playerLeft + 20) + 'px';
    }
});
