import Game from './Game.js';

const game = new Game();
game.newGame();

class Player {
    constructor(name, id, color) {
        this.name = name;
        this.id = id;
        this.color = color;
    }
    move(columnNumber) {
        game.playerMove(columnNumber, this.id);
        game.changePlayerTurn();
    }
}

const player1 = new Player("player 1", 1, "red");
const player2 = new Player("player 2", 0, "black");

window.addEventListener("DOMContentLoaded", () => {
    const columns = document.getElementById("click-targets");
    columns.addEventListener("click", (event) => {
        if (event.target === columns) {
            return;
        }
        const colId = event.target.id;
        const colNum = colId[colId.length - 1];
        if (game.isColumnOpen(colNum) && !game.isGameOver()) {
            if (game.isPlayerOneTurn() === true) {
                player1.move(colNum);
            } else {
                player2.move(colNum);
            }
            game.checkWinner();
            renderGameStatus(game.board);
            if (game.isGameOver()) {
                renderWinner();
            }
        }
    });
});

function renderGameStatus(gameBoard) {
    const gameSquares = document.querySelectorAll('.token-square');
    gameSquares.forEach(function (square) {
        const squareId = square.id.toString();

        const squareCol = squareId[9];
        const squareRow = squareId[7];
        const boardValue = game.getSquareValue(squareCol, squareRow);
        if (boardValue === player1.id) {
            square.classList.add('token');
            square.classList.add(player1.color);
        } else if (boardValue === player2.id) {
            square.classList.add('token');
            square.classList.add(player2.color);
        }
    });
}

function renderWinner() {
    const gameWinner = document.getElementById("game-winner");
    if (game.winner === null) {
        gameWinner.innerHTML = "The game is a tie!";
    } else if (game.winner === player1.id) {
        gameWinner.innerHTML = `The winner is ${player1.name}`;
    } else {
        gameWinner.innerHTML = `The winner is ${player2.name}`;
    }
}
