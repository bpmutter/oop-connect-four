
// export default
class Game {
    constructor(board, player1Turn, gameOver) {
        this.board = board;
        this.player1Turn = player1Turn;
        this.gameOver = gameOver;
        this.winner = null;
    }
    createBoard() {
        const board = [];
        for (let i = 0; i < 7; i++) {
            const column = [];
            for (let i = 0; i < 6; i++) {
                column.push('');
            }
            board.push(column);
        }
        return board;
    }

    newGame() {
        this.board = this.createBoard();
        this.player1Turn = true;
        this.gameOver = false;
        this.winner = null;
    }


    playerMove(columnNumber, playerValue) {
        const col = this.board[columnNumber]
        for (let i = col.length - 1; i >= 0; i--) {
            const gameSpace = col[i];
            if (col[i] === '') {
                return col[i] = playerValue;
            }
        }
    }
    isPlayerOneTurn() {
        return this.player1Turn;
    }

    isGameOver() {
        return this.gameOver;
    }

    changePlayerTurn() {
        this.player1Turn = !this.player1Turn;
    }

    getSquareValue(col, row) {
        return this.board[col][row];
    }

    getWinner() {
        return this.winner;
    }

    checkWinner() {
        if (this.checkWinnerVertical()) {
            return this.gameOver = true;
        }
        else if (this.checkWinnerHorizontal()) {
            return this.gameOver = true;
        }
        else if (this.checkWinnerDiagonal()) {
            return this.gameOver = true;
        } else if (this.isBoardFull()) {
            return this.gameOver = true;
        }
    }

    isBoardFull() {
        // return this.board.every(function (col, idx) {
        //     console.log(idx);
        //     return !this.board.isColumnOpen(idx);
        // });
        for (let i = 0; i < this.board.length; i++) {
            if (this.isColumnOpen(i)) return false;
        }
        return true;
    }

    isColumnOpen(columnNum) {
        const col = this.board[columnNum];
        if (col[0] === "") return true;
        return false;
    }

    checkWinnerVertical() {
        for (let i = 0; i < this.board.length; i++) { //goes through every column
            for (let j = 0; j < this.board[i].length - 3; j++) {
                const col = this.board[i];
                if (col[j] !== '' && col[j] === col[j + 1] && col[j] === col[j + 2] && col[j] === col[j + 3]) {
                    this.winner = col[j];
                    // console.log(`the winning spaces are:
                    //     [${i}][${j}],
                    //     [${i}][${j + 1}],
                    //     [${i}][${j + 2}],
                    //     [${i}][${j + 3}]`);
                    return true;
                }
            }
        }
    }
    checkWinnerHorizontal() {
        const numOfRows = this.board[0].length;
        for (let i = 0; i < numOfRows; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[j][i] !== '' &&
                    this.board[j][i] === this.board[j + 1][i] &&
                    this.board[j][i] === this.board[j + 2][i] &&
                    this.board[j][i] === this.board[j + 3][i]) {
                    this.winner = this.board[j][i];
                    // console.log(`the winning spaces are:
                    // [${j}][${i}],
                    // [${j + 1}][${i}]
                    // [${j + 2}][${i}]
                    // [${j + 3}][${i}]`);
                    return true;
                }
            }
        }
    }

    checkWinnerDiagonal() {
        for (let i = 0; i < this.board.length - 3; i++) {
            for (let j = this.board[i].length - 1; j >= 0; j--) {

                if (this.board[i][j] !== '' &&
                    this.board[i][j] === this.board[i + 1][j - 1] &&
                    this.board[i][j] === this.board[i + 2][j - 2] &&
                    this.board[i][j] === this.board[i + 3][j - 3]) {
                    this.winner = this.board[i][j];
                    return true;
                }
            }
        }
        for (let i = this.board.length - 1; i >= 3; i--) {
            for (let j = this.board[i].length - 1; j >= 0; j--) {
                if (this.board[i][j] !== '' &&
                    this.board[i][j] === this.board[i - 1][j - 1] &&
                    this.board[i][j] === this.board[i - 2][j - 2] &&
                    this.board[i][j] === this.board[i - 3][j - 3]) {
                    this.winner = this.board[i][j];
                    return true;
                }
            }
        }

    }
}


// const stringTieArr = [['0', '1', '1', '1', '0', '0'],
// ['0', '1', '0', '0', '1', '0'],
// ['0', '1', '1', '0', '1', '0'],
// ['1', '0', '0', '1', '1', '1'],

// ['0', '0', '1', '1', '0', '0'],
// ['1', '0', '0', '1', '0', '0'],
// ['1', '1', '0', '0', '1', '1']]

// const tieArr = [];
// for (let i = 0; i < stringTieArr.length; i++) {
//     const strCol = stringTieArr[i];
//     const col = [];
//     for (let j = 0; j < strCol.length; j++) {
//         const num = Number(strCol[j]);
//         col.push(num);
//     }
//     tieArr.push(col);
// }
// console.table(tieArr)
// const tie = new Game(tieArr, true, false);
// tie.checkWinner();
// console.log(tie.gameOver, tie.winner);
