const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let gameOver = false;
let player = "X";

function placeSymbol(board, player, row, col) {
    if (row < 0 || row > 2 || col < 0 || col > 2) {
        // invalid position
        return false;
    }
    if (board[row][col] !== "") {
        // cell already occupied
        return false;
    }
    board[row][col] = player;
    return board;
}

function checkGameOver(board) {
    // check rows
    for (let row of board) {
        if (row[0] === row[1] && row[1] === row[2] && row[0] !== "") {
            return row[0];
        }
    }
    // check columns
    for (let col = 0; col < 3; col++) {
        if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] !== "") {
            return board[0][col];
        }
    }
    // check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
        return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
        return board[0][2];
    }
    // check for draw
    for (let row of board) {
        for (let cell of row) {
            if (cell === "") {
                return "";
            }
        }
    }
    // no empty cells, it's a draw
    return "D";
}

function createBoard(board) {
    // create the table element and append it to the div
    const boardEl = document.getElementById("board");
    const table = document.createElement("table");
    for (let i = 0; i < board.length; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < board[i].length; j++) {
            const cell = document.createElement("td");
            cell.textContent = board[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    boardEl.appendChild(table);

    // call the addEventListeners function
    addEventListeners(board);
}


function addEventListeners(board) {
    // add a click event listener to each cell
    const cells = document.querySelectorAll("td");
    for (let cell of cells) {
        cell.addEventListener("click", function() {
            // get the row and column of the cell that was clicked
            const row = this.parentNode.rowIndex;
            const col = this.cellIndex;
            // place the symbol on the board
            if (placeSymbol(board, player, row, col)) {
                this.textContent = player;
                // check if the game is over
                const result = checkGameOver(board);
                if (result !== "") {
                    gameOver = true;
                    if (result === "D") {
                        alert("The game is a draw!");
                    } else {
                        alert(`${result} wins!`);
                    }
                } else {
                    // switch players
                    player = (player === "X") ? "O" : "X";
                }
            }
        });
    }
}


window.addEventListener("load", function() {
    createBoard(board);
});

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function() {
    // reset the board
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = "";
        }
    }
    // reset the gameOver flag
    gameOver = false;
    // reset the player
    player = "X";
    // reset the cells
    const cells = document.querySelectorAll("td");
    for (let cell of cells) {
        cell.textContent = "";
    }
});
