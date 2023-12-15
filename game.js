import { Sudoku } from './sudoku.js';
import { Canvas } from './canvas.js';

class Game {
    
    constructor(sideSize, difficulty) {

        this.sideSize = sideSize;
        this.difficulty = difficulty;

        this.fps = 30;

        this.sudoku = new Sudoku(sideSize, difficulty);
        this.canvas = new Canvas();
        
    }

    setup() {
        this.sudoku.generateGrid();
    }

    update() {
        
    }

    draw() {

        let matrix = this.sudoku.matrix;

        let canvasWidth = this.canvas.width;
        let canvasHeight = this.canvas.height;

        this.canvas.canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        this.canvas.drawRect(0, 0, canvasWidth, canvasHeight, "black");
        this.canvas.drawGrid(matrix);
        this.canvas.drawBoxEmphasis();
    }

    gameLoop() {
        this.update();
        this.draw();

        let isSolved = this.sudoku.checkIfMatrixIsCorrect();

        if (isSolved) {
            alert("You win!");
            clearInterval(intervalID);
        }

    }

}

window.addEventListener("keydown", function onEvent(event) {

    let currentCell = game.canvas.selectedCell;
    let size = game.sideSize;

    let xPos = currentCell.x;
    let yPos = currentCell.y;

    let keyPressed = event.key;
    
    let reg = /^\d+$/;
    let passesReg = reg.test(keyPressed);

    if (keyPressed === "ArrowLeft") {
        if (xPos <= 0) return;
        game.canvas.selectedCell = {x: (xPos - 1), y: yPos};
    } else if (keyPressed === "ArrowRight") {
        if (xPos >= size - 1) return;
        game.canvas.selectedCell = {x: (xPos + 1), y: yPos};
    } else if (keyPressed === "ArrowUp") {
        if (yPos <= 0) return;
        game.canvas.selectedCell = {x: xPos, y: (yPos - 1)};
    } else if (keyPressed === "ArrowDown") {
        if (yPos >= size - 1) return;
        game.canvas.selectedCell = {x: xPos, y: (yPos + 1)};
    } else if (passesReg) {
        game.sudoku.matrix[yPos][xPos] = keyPressed;
    } 

});

const game = new Game(9, 10);
game.setup();

const intervalID = setInterval(() => {
    game.gameLoop();
}, 1000 / game.fps);

