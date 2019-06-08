function blankGrid() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

// check not changed all grids of board
function compare(a, b) {
    for (let i = 0; i < 4; i++) {           // nested loop
        for (let j = 0; j < 4; j++) {
            if (a[i][j] !== b[i][j]) {
                return true;
            }
        }
    }
    return false;
}

function copyGrid(root) {
    let extra = blankGrid();

    for (let i = 0; i < 4; i++) {           // nested loop
        for (let j = 0; j < 4; j++) {
            extra[i][j] = root[i][j];
        }
    }

    return extra;
}

// flip and rotate function for direction
function flipGrid() {
    for (let i = 0; i < 4; i++) {
        grid[i].reverse();
    }
    return grid;
}

function rotateGrid(grid) {
    let newGrid = blankGrid();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newGrid[i][j] = grid[j][i];
        }
    }
    return newGrid;
}

// random number 2 or 4 
function addNumber() {
    let options = [];

    for (let i = 0; i < 4; i++) {           // check for valid grid
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                options.push({
                    x: i,
                    y: j
                });
            }
        }
    }

    if (options.length > 0) {           // random 2 or 4 in random valid grid
        let spot = random(options);
        let r = random(1);

        grid[spot.x][spot.y] = r > 0.5 ? 2 : 4;    // fair condition chance for 2 and 4 
    }
}