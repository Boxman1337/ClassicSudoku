class Sudoku {

    constructor(sideSize, difficulty) {
        
        this.sideSize = sideSize;
        this.difficulty = difficulty;

        let sqrt = Math.sqrt(sideSize);
        this.sqrtSideSize = Math.floor(sqrt);

        this.matrix = Array.from({
            length: sideSize
        }, () => Array.from({
            length: sideSize
        }, () => 0));

    }

    checkIfMatrixIsCorrect() {
        
        let currentMatrix = this.matrix;
        let correctMatrix = this.correctMatrix;

        if (!currentMatrix || !correctMatrix) {
            return false;
        }
        
        if ((currentMatrix.length != correctMatrix.length) || (currentMatrix[0].length != correctMatrix[0].length)) {
            return false;
        } 

        for (let i = 0; i < currentMatrix.length; i++) {
            for (let j = 0; j < currentMatrix[0].length; j++) {
                if (currentMatrix[i][j] != correctMatrix[i][j]) {
                    return false; 
                }
            }
        }
        
        return true;

    }

    generateGrid() {

        // Fill the 3 diagonal boxes
        this.fillDiagonalBoxes();
        
        // Fill the remaining boxes
        this.fillRemaining(0, 0);

        // Clones the matrix by-value into the variable holding the correct matrix
        this.correctMatrix = JSON.parse(JSON.stringify(this.matrix));

        // Remove digits from the grid according to difficulty
        this.removeDigits();
    }

    fillBox(row, column) {

        let number = 0;
        let sideSize = this.sideSize;
        let sqrtSideSize = this.sqrtSideSize;
        
        for (let i = 0; i < sqrtSideSize; i++) {
            for (let j = 0; j < sqrtSideSize; j++) {
                while (true) {

                    number = this.generateNumber(sideSize);
                    
                    if (this.validInBox(row, column, number)) {
                        break;
                    }
                }

                this.matrix[row + i][column + j] = number;
            }
        }
    }

    fillDiagonalBoxes() {
        for (let i = 0; i < this.sideSize; i += this.sqrtSideSize) {
            this.fillBox(i, i);
        }
    }

    fillRemaining(row, column) {

        let sideSize = this.sideSize;
        let matrix = this.matrix;

        // If at the last cell of the row
        if (column === sideSize) {

            // End of the matrix?
            if (row === sideSize - 1) {
                return true;
            }

            row += 1;
            column = 0;
        }

        // If cell is already filled
        if (matrix[row][column] !== 0) {
            return this.fillRemaining(row, column + 1);
        }

        // Try filling the current cell with a valid number
        for (let number = 1; number <= sideSize; number++) {

            let isValid = this.checkIfValid(row, column, number);

            if (isValid) {
            
                matrix[row][column] = number;
            
                if (this.fillRemaining(row, column + 1)) {
                    return true;
                }

                matrix[row][column] = 0;
            }
        }

        return false;

    }

    checkIfValid(row, column, number) {

        let sqrtSideSize = this.sqrtSideSize;

        return (
            this.validInRow(row, number) &&
            this.validInCol(column, number) &&
            this.validInBox(row - (row % sqrtSideSize), column - (column % sqrtSideSize), number)
        );
    }

    validInBox(rowStart, columnStart, number) {

        let sqrtSideSize = this.sqrtSideSize;
        let matrix = this.matrix;

        for (let i = 0; i < sqrtSideSize; i++) {
            for (let j = 0; j < sqrtSideSize; j++) {
                if (matrix[rowStart + i][columnStart + j] === number) {
                    return false;
                }
            }
        }
        return true;
    }

    validInRow(i, number) {
        
        let sideSize = this.sideSize;
        let matrix = this.matrix;

        for (let j = 0; j < sideSize; j++) {
            if (matrix[i][j] === number) {
                return false;
            }
        }

        return true;
    }
    
    validInCol(j, number) {

        let sideSize = this.sideSize;
        let matrix = this.matrix;

        for (let i = 0; i < sideSize; i++) {
            if (matrix[i][j] === number) {
                return false;
            }
        }

        return true;
    }

    removeDigits() {

        let count = this.difficulty;

        while (count !== 0) {
            let row = Math.floor(Math.random() * this.sideSize);
            let column = Math.floor(Math.random() * this.sideSize);

            if (this.matrix[row][column] !== 0) {
                count--;
                this.matrix[row][column] = 0;
            }
        }
    }    

    generateNumber(maxNumber) {
        return Math.floor(Math.random() * maxNumber + 1);
    }

    printSudoku() {
        console.log("Current matrix: ");
        console.log(this.matrix);
        console.log("Correct matrix: ");
        console.log(this.correctMatrix);
    }

}

export { Sudoku }