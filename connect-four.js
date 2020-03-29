import Game from './Game.js';
import Player from './Player.js';
import GameUI from './ui.js';

const game = new Game();
const player1 = new Player("player 1", 1, "red");
const player2 = new Player("player 2", 0, "black");
const ui = new GameUI(game,player1,player2);

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('isLocalStorageActive')) {
        getLocalStorage();
        ui.renderGameStatus();
        checkDisabledStartButton();
        ui.renderWinner();
    }

    //checks if 2 player names before starting game
    document.getElementById("form-holder")
        .addEventListener("keyup", checkDisabledStartButton);

    //start new game on click of 'new game' button
    document.getElementById("new-game")
        .addEventListener('click', startNewGame);

    //when player makes a move on one of the top squares
    document.getElementById("click-targets")
        .addEventListener("click", handlePlayerTurn);


});

function startNewGame() {
    ui.clearGameWinner();
    ui.clearGameBoard();
    const player1Name = document.getElementById("player-1-name");
    const player2Name = document.getElementById("player-2-name");
    player1.name = player1Name.value;
    player2.name = player2Name.value;
    game.newGame();
    ui.renderGameStatus();
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

function handlePlayerTurn(event){
    const columns = document.getElementById("click-targets");

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
        ui.renderGameStatus(game.board);
        if (game.isGameOver()) {
            ui.renderWinner();
        }
    }
    saveToLocalStorage();

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
