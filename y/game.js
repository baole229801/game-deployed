function operate(row) {         // slide first and combine then slide again for the zero
    row = slide(row);
    row = combine(row);
    row = slide(row);

    return row;
}

// make new array
function slide(row) {
    let arr = row.filter(val => val);
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);     // fill all the missing by 0
    arr = zeros.concat(arr);                // attach the zeros into array
    return arr;
}

// operate on array itself
function combine(row) {
    for (let i = 3; i >= 1; i--) {
        let a = row[i];
        let b = row[i - 1];

        if (a === b) {           // if a = b then it combine
            row[i] = a + b;
            score += row[i];
            row[i - 1] = 0;
        }
    }
    return row;
}

function isGameOver() {
    for (let i = 0; i < 4; i++) {           // nested loop
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                return false;
            }
            if (j < 3 && grid[i][j] === grid[i][j + 1]) {
                return false;
            }
            if (i < 3 && grid[i][j] === grid[i + 1][j]) {      // still not enough
                return false;
            }
        }
    }
    return true;
}

function isGameWon() {
    for (let i = 0; i < 4; i++) {           // nested loop
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 2048) {
                return true;
            }
        }
    }
    return false;
}