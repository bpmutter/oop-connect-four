import Game from './Game.js';
import Player from './Player.js';

const game = new Game();
const player1 = new Player("player 1", 1, "red");
const player2 = new Player("player 2", 0, "black");

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('isLocalStorageActive')) {
        getLocalStorage();
        renderGameStatus();
        checkDisabledStartButton();
        renderWinner();
    }

    const formHolder = document.getElementById("form-holder");
    formHolder.addEventListener("keyup", checkDisabledStartButton);

    const playButton = document.getElementById("new-game");
    playButton.addEventListener('click', (e) => {
        startNewGame();
        console.log(game.board);

    });
    const columns = document.getElementById("click-targets");
    columns.addEventListener("click", (event) => {
        if (!game.board) return;
        if (event.target === columns) {
            return;
        }
        const colId = event.target.id;
        const colNum = colId[colId.length - 1];
        if (game.isColumnOpen(colNum) && !game.isGameOver()) {
            if (game.isPlayerOneTurn() === true) {
                player1.move(game, colNum);
            } else {
                player2.move(game, colNum);
            }
            game.checkWinner();
            renderGameStatus(game.board);
            if (game.isGameOver()) {
                renderWinner();
            }
        }
        saveToLocalStorage();
    });


});

function startNewGame() {
    clearGameWinner();
    clearGameBoard();
    const player1Name = document.getElementById("player-1-name");
    const player2Name = document.getElementById("player-2-name");
    player1.name = player1Name.value;
    player2.name = player2Name.value;
    game.newGame();
    renderGameStatus(game.board);
    saveToLocalStorage();
}

function checkDisabledStartButton() {
    const player1Name = document.getElementById("player-1-name");
    const player2Name = document.getElementById("player-2-name");
    const playButton = document.getElementById("new-game");
    if (player1Name.value !== "" && player2Name.value !== "") {
        playButton.disabled = false;
    } else {
        playButton.disabled = true;
    }
}

function renderGameStatus(gameBoard) {
    const gameSquares = document.querySelectorAll('.token-square');
    gameSquares.forEach(function (square) {
        const squareId = square.id.toString();

        const squareCol = squareId[9]; //get column from square ID in HTML
        const squareRow = squareId[7]; //get row from square ID in HTML
        const boardValue = game.getSquareValue(squareCol, squareRow);
        if (boardValue === player1.id) {
            square.classList.add('token');
            square.classList.add(player1.color);
        } else if (boardValue === player2.id) {
            square.classList.add('token');
            square.classList.add(player2.color);
        }
    });
    const player1Name = document.getElementById("player-1-name");
    const player2Name = document.getElementById("player-2-name");
    player1Name.value = player1.name;
    player2Name.value = player2.name;


}

function clearGameBoard() {
    const gameSquares = document.querySelectorAll('.token-square');
    gameSquares.forEach(function (square) {
        square.classList.remove('token');
        square.classList.remove(player1.color);
        square.classList.remove(player2.color);
    })
}

function renderWinner() {
    const gameWinner = document.getElementById("game-winner");
    if (game.isGameOver()) {
        if (game.winner === null) {
            gameWinner.innerHTML = "The game is a tie!";
        } else if (game.winner === player1.id) {
            gameWinner.innerHTML = `The winner is ${player1.name}`;
        } else {
            gameWinner.innerHTML = `The winner is ${player2.name}`;
        }
    }

}

function clearGameWinner() {
    const gameWinner = document.getElementById("game-winner");
    gameWinner.innerHTML = '';
}

function saveToLocalStorage() {

    const boardString = JSON.stringify(game.board);
    localStorage.setItem('isLocalStorageActive', true);
    localStorage.setItem("board", boardString);
    localStorage.setItem("player1Turn", game.player1Turn);
    localStorage.setItem("gameOver", game.gameOver);
    localStorage.setItem("winner", game.winner);
    localStorage.setItem("player1Name", player1.name);
    localStorage.setItem("player2Name", player2.name);
}

function getLocalStorage() {
    game.board = JSON.parse(localStorage.getItem("board"));
    game.player1Turn = JSON.parse(localStorage.getItem("player1Turn"));
    game.gameOver = JSON.parse(localStorage.getItem("gameOver"));
    game.Winner = JSON.parse(localStorage.getItem("winner"));
    player1.name = localStorage.getItem("player1Name");
    player2.name = localStorage.getItem("player2Name");
}
