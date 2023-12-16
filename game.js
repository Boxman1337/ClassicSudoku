import { Sudoku } from './sudoku.js';
import { Canvas } from './canvas.js';

const canvas = new Canvas();

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

class GameInstance {

    constructor(difficulty) {

        // Set grid-size
        this.cellsPerSide = 9;
        
        // Set difficulty
        this.difficulty = difficulty;

        // Set fps
        this.fps = 60;

        // Sets a variable containing the intervalID
        this.gameLoopIntervalID = null;

        // Initializes a new sudoku-game
        this.sudoku = new Sudoku(this.cellsPerSide, difficulty);

    }

    setup() {
        this.sudoku.generateGrid();
    }

    update() {

    }

    draw() {

        let matrix = this.sudoku.matrix;

        canvas.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvas.drawRect(0, 0, canvasWidth, canvasHeight, "black");
        canvas.drawGrid(matrix);
        canvas.drawBoxEmphasis();

    }

    gameLoop() {

        this.update();
        this.draw();

        let isSolved = this.sudoku.checkIfMatrixIsCorrect();

        if (isSolved) {
            console.log("You win!");
            clearInterval(this.gameLoopIntervalID);
        }
    }

}


class Game {

    constructor(gameInstance) {

        if (!gameInstance) return;

        this.newGameInstance(gameInstance);
    }

    newGameInstance(gameInstance) {

        this.gameInstance = gameInstance;

        this.gameInstance.setup();

        this.gameInstance.gameLoopIntervalID = setInterval(() => {
            this.gameInstance.gameLoop();
        }, 1000 / gameInstance.fps);
    }

}

window.addEventListener("keydown", function onEvent(event) {

    let currentCell = canvas.selectedCell;
    let cellsPerSide = game.gameInstance.cellsPerSide;

    let xPos = currentCell.x;
    let yPos = currentCell.y;

    let keyPressed = event.key;
    
    let reg = /^\d+$/;
    let passesReg = reg.test(keyPressed);

    if (keyPressed === "ArrowLeft") {
        
        if (xPos <= 0) return;
        canvas.selectedCell = {x: (xPos - 1), y: yPos};
    
    } else if (keyPressed === "ArrowRight") {
        
        if (xPos >= cellsPerSide - 1) return;
        canvas.selectedCell = {x: (xPos + 1), y: yPos};
    
    } else if (keyPressed === "ArrowUp") {
        
        if (yPos <= 0) return;
        canvas.selectedCell = {x: xPos, y: (yPos - 1)};
   
    } else if (keyPressed === "ArrowDown") {
        
        if (yPos >= cellsPerSide - 1) return;
        canvas.selectedCell = {x: xPos, y: (yPos + 1)};
    
    } else if (passesReg) {
        
        game.gameInstance.sudoku.matrix[yPos][xPos] = keyPressed;

    } 

});

const newGameButton = document.getElementById("newGameButton");
const difficultySelector = document.getElementById("selectDifficulty");
newGameButton.addEventListener("click", () => {

    clearInterval(game.gameInstance.gameLoopIntervalID);

    let difficulty = difficultySelector.value;

    game.newGameInstance(new GameInstance(difficulty));

});

const game = new Game(new GameInstance(55));





