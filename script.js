const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

let score = 0;
let gameTime = 15; 
let speed = 1000; 
let pumpkins = [];
let gameInterval;
let timer;
let isGameOver = false; 

function movePumpkin(pumpkin) {
    const maxX = window.innerWidth - pumpkin.clientWidth;
    const maxY = window.innerHeight - pumpkin.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    pumpkin.style.left = `${randomX}px`;
    pumpkin.style.top = `${randomY}px`;
}

function clickPumpkin() {
    if (!isGameOver) { 
        score++;
        scoreDisplay.textContent = score;
    }
}

function addPumpkin() {
    const pumpkin = document.createElement("img");
    pumpkin.src = "img.png";
    pumpkin.classList.add("pumpkin");
    pumpkin.addEventListener("click", clickPumpkin);
    gameArea.appendChild(pumpkin);
    pumpkins.push(pumpkin);
    movePumpkin(pumpkin);
}

function moveAllPumpkins() {
    pumpkins.forEach(pumpkin => movePumpkin(pumpkin));
}

function startGame() {
    addPumpkin();
    gameInterval = setInterval(moveAllPumpkins, speed);

    
    timer = setInterval(() => {
        if (gameTime > 0) { 
            gameTime--; 
            timerDisplay.textContent = `제한 시간: ${gameTime}초`; 
        }

        if (gameTime === 0) { 
            clearInterval(timer); 
            clearInterval(gameInterval); 
            timerDisplay.textContent = "게임 종료!";
            isGameOver = true; 
        } else if (gameTime % 10 === 0) { 
            addPumpkin();
            speed = Math.max(300, speed - 200); 
            clearInterval(gameInterval); 
            gameInterval = setInterval(moveAllPumpkins, speed); 
        }
    }, 1000); 
}


startGame();
