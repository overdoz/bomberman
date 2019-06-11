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


        // let gameOver = false;

        this.bombs = [];
        this.players = [];
        this.walls = [];



        this.players.push(new Player({x: 0, y: 0}, this.assets, 1, 14, 7, this.gridSize, this));


        this.generateRandomWalls(30);
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

        this.players.forEach(player => {
            player.draw(this.context);
        });

        this.walls.forEach(wall => {
            wall.draw(this.context);
        });

        this.bombs.forEach(bomb => {
            bomb.draw(this.context);
        })

    }

    startAnimating() {
        this.frameTime = 1000 / 1600;
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

    generateRandomWalls(number) {
        // create grid of indestructible walls
        for (let i = 1; i < this.width; i += 2) {
            for (let j = 1; j < this.height; j += 2) {
                this.walls.push(new Wall({x: i, y: j}, 1, false, this.assets, this.gridSize));
            }
        }

        // create random destructible walls
        let random = (limit) => {return Math.floor(Math.random() * limit)};
        for (let i = 0; i < number; i++) {
            let randomCoordinate = {x: random(this.width), y: random(this.height)};

            if (this.findDuplicates(randomCoordinate)) {
                i--;
            } else {
                this.walls.push(new Wall(randomCoordinate, 1, true, this.assets, this.gridSize));
            }
        }
    }

    findDuplicates(position) {
        for (let i = 0; i < this.walls.length; i++) {
            if (position.x === this.walls[i].position.x && (position.y === this.walls[i].position.y)) {
                return true;
            }
        }
        return false;
    }



}