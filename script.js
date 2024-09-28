const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle a cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (boardState[index] !== "" || !gameActive) {
        return;
    }

    updateCell(cell, index);
    checkWinner();
}

// Update the when clicked cell
function updateCell(cell, index) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Check if there's a winner or draw
function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset the game
function resetGame() {
    currentPlayer = "X";
    boardState = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => (cell.textContent = ""));
    gameActive = true;
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
