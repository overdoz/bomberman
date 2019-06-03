"use strict";

import Player from './Player.js';

export default class Game {

    constructor(canvas, width=12, height=12, assets, players) {
        console.log("initialize Game");
        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.assets = assets;

        this.width = width;
        this.height = height;
        this.players = [...players];

        const gridSize = this.canvas.width / width;

        // TODO: initialize each player inside constructor or inside App.js?
        /*for (let i = 0; i < players.length; i++) {
            this.players.push(new Player([3,3], 1.0, 14, 7))
        }*/
        // this.grid = new Grid(height, width);
        let gameOver = false;

        // this.player = new Player({x:1, y:1}, assets, 1, 14, 7);


        this.startAnimating();
    }

    // TODO: update function
    update() {

    }

    // renders each player onto the map
    draw() {
        this.players.map(player => {
            player.draw(this.context);
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