import Player from './Player';

export default class Game {

    constructor(players) {
        console.log("initialize Game");
        this.players = [...players];

        // TODO: initialize each player inside constructor or inside App.js?
        for (let i = 0; i < players.length; i++) {
            this.players.push(new Player([3,3], 1.0, 14, 7))
        }
        // this.grid = new Grid(height, width);
        let gameOver = false;
    }

    // renders each player onto the map
    draw() {
        this.players.map(player => {
            player.draw();
            console.log("draw player");
        })
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