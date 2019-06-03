"use strict";

// import Player from './Player';

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

        this.startAnimating();
    }

    // TODO: update function
    update() {

    }

    // renders each player onto the map
    draw() {
        this.players.map(player => {
            player.draw();
            console.log("draw player");
        })
    }

    startAnimating() {
        this.frameTime = 1000 / 2;
        this.then = window.performance.now();
        this.animate(this.then);
    }

    animate(currentTime) {
        window.requestAnimationFrame(this.animate.bind(this));

        const now = currentTime;
        const elapsed = now - this.then;

        if (elapsed > this.frameTime) {
            this.then = now;

            this.update();
            this.draw();
        }
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