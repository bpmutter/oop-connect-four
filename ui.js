export default class GameUI{
    constructor(game, player1, player2){
        this.game = game;
        this.player1 = player1;
        this.player2 = player2;
    };

    renderGameStatus() {
        const gameSquares = document.querySelectorAll('.token-square');

        gameSquares.forEach( (square) =>{
            const squareId = square.id.toString();

            const squareCol = squareId[9]; //get column from square ID in HTML
            const squareRow = squareId[7]; //get row from square ID in HTML
            const boardValue = this.game.getSquareValue(squareCol, squareRow);
            if (boardValue === this.player1.id) {
                square.classList.add('token');
                square.classList.add(this.player1.color);
            } else if (boardValue === this.player2.id) {
                square.classList.add('token');
                square.classList.add(this.player2.color);
            }
        });
        const player1Name = document.getElementById("player-1-name");
        const player2Name = document.getElementById("player-2-name");
        player1Name.value = this.player1.name;
        player2Name.value = this.player2.name;

        const clickTargets = document.querySelectorAll(".click-target");

        if (this.game.isPlayerOneTurn()) {
            clickTargets.forEach(target => {
                target.classList.remove("black-click-target");
                target.classList.add("red-click-target");
            });
        } else {
            clickTargets.forEach(target => {
                target.classList.remove("red-click-target");
                target.classList.add("black-click-target");

            });
        }
    }

    clearGameBoard() {
        const gameSquares = document.querySelectorAll('.token-square');
        gameSquares.forEach((square)=>{
            square.classList.remove('token');
            const p1color = this.player1.color;
            const p2color = this.player2.color;
            square.classList.remove(p1color);
            square.classList.remove(p2color);
        }); 
    }

    renderWinner() {
        const gameWinner = document.getElementById("game-winner");
        if (this.game.isGameOver()) {
            if (this.game.winner === null) {
                gameWinner.innerHTML = "The game is a tie!";
            } else if (this.game.winner === this.player1.id) {
                gameWinner.innerHTML = `The winner is ${this.player1.name}`;
            } else {
                gameWinner.innerHTML = `The winner is ${this.player2.name}`;
            }
        }

    }

    clearGameWinner() {
        const gameWinner = document.getElementById("game-winner");
        gameWinner.innerHTML = '';
}

}