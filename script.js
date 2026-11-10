const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const boardSize = 400;

let snake = [{ x: 100, y: 100 }];
let direction = "RIGHT";
let food = { x: 200, y: 200 };
let score=0;

function drawSnake() {
    ctx.fillStyle = "lime";

    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
    });
}
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function drawGame() {
    ctx.clearRect(0, 0, boardSize, boardSize);
    let headX=snake[0].x;
    let headY=snake[0].y;
    
    if (direction === "RIGHT") headX += gridSize;
    if (direction === "LEFT") headX -= gridSize;
    if (direction === "UP") headY -= gridSize;
    if (direction === "DOWN") headY += gridSize;
    let newHead={
        x:headX,
        y:headY
    };
    snake.unshift(newHead);

    if (headX === food.x && headY === food.y) {
        score++;
        document.getElementById("score").innerText=score;
        
        food = {
            x: Math.floor(Math.random() * (boardSize / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (boardSize / gridSize)) * gridSize
        };
    }else{
        snake.pop();
    }

    if (snake[0].x < 0 || snake[0].x >= boardSize || snake[0].y < 0 || snake[0].y >= boardSize) {
        clearInterval(game);
        alert("Game Over!\nYour Score:" +score);
        if (confirm("Play Again")){
            location.reload();
        }else{
            alert("Thanks for playing");
        return;
    }
    }
    drawFood();
    drawSnake();
    
}


document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}
function restartGame(){
    location.reload();
}
let game=setInterval(drawGame, 200);
