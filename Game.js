const Player = require('./Player.js');
const Grid = require('./Grid.js');

class Game {

    constructor(players, height, width) {
        this.players = [];
        for (let i = 0; i < players; i++) {
            this.players.push(new Player([3,3], 1.0, 14, 7))
        }
        this.grid = new Grid(height, width);
        this.gameOver = false;
    }

}

//
// console.log("before:");
// console.log(game.players[0].getX(), game.players[0].getY());
//
// game.players[0].move('NORTH');
//
// console.log("after:");
// console.log(game.players[0].getX(), game.players[0].getY());