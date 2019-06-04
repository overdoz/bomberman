"use strict";

import Player from './Player.js';
import Wall from './Wall.js';

export default class Game {

    constructor(canvas, width=13, height=13, assets) {
        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.assets = assets;

        this.width = width;
        this.height = height;


        this.gridSize = this.canvas.width / width;

        // TODO: initialize each player inside constructor or inside App.js?
        /*for (let i = 0; i < players.length; i++) {
            this.players.push(new Player([3,3], 1.0, 14, 7))
        }*/
        // this.grid = new Grid(height, width);


        let gameOver = false;



        // this.player = new Player({x:1, y:1}, assets, 1, 14, 7);
        this.players = [];
        this.players.push(new Player(1, 1, this.assets, 1, 14, 7, this.gridSize, this.context));


        this.startAnimating();
    }

    // TODO: update function
    update() {
      /*  this.players.map(player => {
            player.update();
            console.log("draw player");
        })*/

    }

    // renders each player into the map
    draw() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.players.map(player => {
            player.draw(this.context);

        });

        // draw walls
        for (let i = 1; i < 12; i += 2) {
            for (let j = 1; j < 12; j += 2) {
                new Wall(i*40, j*40, 1, true, this.assets).draw(this.context);
            }
        };

    }

    startAnimating() {
        this.frameTime = 1000 / 500;
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