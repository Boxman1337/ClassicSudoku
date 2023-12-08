class Canvas {

    constructor() {

        this.canvas = document.getElementById("canvas");
        this.canvasContext = this.canvas.getContext("2d");

        this.cellColor = "#a89984";
        this.borderColor = "#7c6f64";
        this.borderColorDark = "#665c54";
        this.textColor = "#ebdbb2";

        this.sideSize = this.canvas.width / 9;
        this.wallWidth = this.sideSize / 50;
    }

    drawRect(x, y, width, height, color) {
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(x, y, width, height);
    }

    drawBoxEmphasis() {

        let sideSize = this.sideSize;
        let wallWidth = this.wallWidth;

        this.drawRect(0, 3 * sideSize, 9 * sideSize, 3 * wallWidth, this.borderColorDark);
        this.drawRect(0, 6 * sideSize, 9 * sideSize, 3 * wallWidth, this.borderColorDark);
        this.drawRect(3 * sideSize, 0, 3 * wallWidth, 9 * sideSize, this.borderColorDark);
        this.drawRect(6 * sideSize, 0, 3 * wallWidth, 9 * sideSize, this.borderColorDark);
    }

    drawGrid(matrix) {

        let sideSize = this.sideSize;
        let wallWidth = this.wallWidth;

        for (let row = 0; row < matrix.length; row++) {
            for (let column = 0; column < matrix[0].length; column++) {
                
                // Draw cell
                this.drawRect(
                    column * sideSize, 
                    row * sideSize, 
                    sideSize, 
                    sideSize, 
                    this.cellColor
                );
            
                // Draw Top Cell-wall
                this.drawRect(
                    column * sideSize,
                    row * sideSize,
                    wallWidth + sideSize,
                    wallWidth,
                    this.borderColor
                );
    
                // Draw Left Cell-walsl
                this.drawRect(
                    column * sideSize,
                    row * sideSize,
                    wallWidth,
                    wallWidth + sideSize,
                    this.borderColor
                );
    
                // Draw Bottom Cell-wall
                this.drawRect(
                    column * sideSize,
                    row * sideSize + sideSize - 1,
                    wallWidth + sideSize,
                    wallWidth,
                    this.borderColor
                );
    
                // Draw Right Cell-wall
                this.drawRect(
                    column * sideSize + sideSize - 1,
                    row * sideSize,
                    wallWidth,
                    wallWidth + sideSize,
                    this.borderColor
                );
    
                // Draw Cell Number
                this.canvasContext.font = "36px Arial"
                this.canvasContext.fillStyle = this.textColor;
    
                let number = matrix[row][column];
                let x = column * sideSize + (sideSize - 20) / 2;
                let y = row * sideSize + (sideSize + 25) / 2;
                
                if (number != 0) {
                    this.canvasContext.fillText(number, x, y);
                }
            }
        }
    }
}

export { Canvas }