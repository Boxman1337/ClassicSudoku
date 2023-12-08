import { Sudoku } from './sudoku.js';
import { Canvas } from './canvas.js';

class Game {
    
    constructor(sideSize, difficulty) {

        this.fps = 30;

        this.sudoku = new Sudoku(sideSize, difficulty);
        this.canvas = new Canvas();

    }

    setup() {
        this.sudoku.generateGrid();
    }

    updateGameState() {
        this.update();
        this.draw();
    }

    update() {
        return null;
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
        setTimeout(() => {
            this.updateGameState();
            this.gameLoop();
        }), 1000 / this.fps;
    }

}

const printbutton = document.getElementById("printbutton");

printbutton.addEventListener("click", () => {
    console.log(game.sudoku.printSudoku());
});



const game = new Game(9, 50);
game.setup();
game.gameLoop();

