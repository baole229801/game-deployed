let grid;
let score = 0;

function setup() {
    var myCanvas = createCanvas(500, 500);
    myCanvas.parent('game-board');
    noLoop();           // browser not render again when grid change
    grid = blankGrid();

    addNumber();            // 2 random number 2 or 4 appear
    addNumber();
    updateCanvas();
}

// one move
function keyPressed() {
    let flipped = false;
    let rotated = false;
    let played = true;

    if (keyCode === DOWN_ARROW) {
        // do nothing
    } else if (keyCode === UP_ARROW) {
        grid = flipGrid(grid);
        flipped = true;
    } else if (keyCode === RIGHT_ARROW) {
        grid = rotateGrid(grid);
        rotated = true;
    } else if (keyCode === LEFT_ARROW) {
        grid = rotateGrid(grid);
        grip = flipGrid(grid);
        rotated = true;
        flipped = true;
    } else {
        played = false;         // other keyCode will not generate game function
    }

    if (played) {
        let past = copyGrid(grid);      // check for changed value if not, dont random more number

        for (let i = 0; i < 4; i++) {
            grid[i] = operate(grid[i]);
        }
        let changed = compare(past, grid);

        if (flipped) {          // get back for default key
            grid = flipGrid(grid);
        }

        if (rotated) {
            grid = rotateGrid(grid);
            grid = rotateGrid(grid);
            grid = rotateGrid(grid);
        }

        if (changed) {
            addNumber();
        }
        updateCanvas();

        // check condition
        let gameover = isGameOver();
        let gamewin = isGameWon();
        if (gameover) {
            alert("GAME OVER");
        }
        if (gamewin) {
            alert("YOU WIN");
        }
    }
}

function updateCanvas() {
    background(255);
    drawGrid();
    select('#score').html(score);
}

function drawGrid() {
    let w = 125;    // size 

    for (let i = 0; i < 4; i++) {           // nested loop
        for (let j = 0; j < 4; j++) {
            let val = grid[i][j];
            let s = '' + val;          // get the size of grid value // convert to string

            if (val === 0) {
                let c = color(238, 228, 218);
                fill(c);
                strokeWeight(12);
                stroke(175, 162, 149);
            } else {
                fill(colorSizes[s].background);
                strokeWeight(12);
                stroke(175, 162, 149);
            }
            rect(i * w, j * w, w, w);       // draw rectangle for each value of 2di arr

            if (grid[i][j] !== 0) {           // get number into grid, no zero
                textAlign(CENTER, CENTER);

                fill(colorSizes[s].color);
                textSize(colorSizes[s].size);
                noStroke();
                text(val, i * w + w / 2, j * w + w / 2);
            }
        }
    }
}
