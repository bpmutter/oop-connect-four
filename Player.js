export default class Player {
    constructor(name, id, color) {
        this.name = name;
        this.id = id;
        this.color = color;
    }
    move(game, columnNumber) {
        game.playerMove(columnNumber, this.id);
        game.changePlayerTurn();
    }
}
