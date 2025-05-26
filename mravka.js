const canvas = document.getElementById("antCanvas");
const ctx = canvas.getContext("2d");

const stopBtn = document.getElementById("stopBtn");
const startBtn=document.getElementById("startBtn");

let running = false;

const gridSize = 150;
const cellSize = canvas.width / gridSize;

const grid = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(0)
);

let x = Math.floor(gridSize / 2);
let y = Math.floor(gridSize / 2);
let dir = 0;

// Get references to the color pickers
const whiteColorPicker = document.getElementById("whiteColorPicker");
const blackColorPicker = document.getElementById("blackColorPicker");

function drawCell(x, y, isBlack) {
    ctx.fillStyle = isBlack ? blackColorPicker.value : whiteColorPicker.value;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
}

function step() {
    const isWhite = grid[y][x] === 0;

    // Turn first
    dir = (dir + (isWhite ? 1 : -1) + 4) % 4;

    // Flip and draw
    grid[y][x] ^= 1;
    drawCell(x, y, grid[y][x]);

    // Move
    if (dir === 0) y--;
    else if (dir === 1) x++;
    else if (dir === 2) y++;
    else if (dir === 3) x--;

    x = (x + gridSize) % gridSize;
    y = (y + gridSize) % gridSize;
}

function animate() {
    if (!running) return;

    const speed = parseInt(speedSlider.value, 10);
    for (let i = 0; i < speed; i++) step();

    requestAnimationFrame(animate);
}

startBtn.addEventListener("click", () => {
    if (!running) {
        running = true;
        animate();
    }
});

stopBtn.addEventListener("click", () => {
    running = false;
});

animate();