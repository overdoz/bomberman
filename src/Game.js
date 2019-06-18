"use strict";

import Player from './Player.js';
import Wall from './Wall.js';
import Bomb from "./Bomb.js";
import Client from "./App.js";

export default class Game {

    constructor(canvas, width=13, height=13, assets) {
        this.client = new Client();

        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.assets = assets;

        this.width = width;
        this.height = height;

        this.frameCount = 0;


        this.gridSize = this.canvas.width / width;

        // TODO: initialize each player inside constructor or inside App.js?


        // let gameOver = false;

        this.bombs = [];
        this.players = [];
        this.walls = [];



        this.players.push(new Player({x: 0, y: 0}, this.assets, 1, 14, 77, this.gridSize, this));


        this.generateRandomWalls(30);
        this.startAnimating();
    }

    // TODO: update function
    update() {
        /*this.players.map(player => {
            player.update(this.frameCount);

        })*/
        let random = (limit) => {return Math.floor(Math.random() * limit)};
        let atRandomPosition = {x: random(this.width), y: random(this.height)};
        if (/*this.frameCount % 200 === 0*/ false) {
            this.bombs.push(new Bomb(atRandomPosition, 5000, 1, this.assets, this.gridSize, this));
        }

    }

    /**
     * render method to display all elements on the game board
     */
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
        this.frameTime = 1000 / 30;
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
        this.frameCount++;
    }

    /**
     * generate a grid of indestructible walls and destructible walls at random positions
     * @param number - max amount of indestructible walls to create
     */
    generateRandomWalls(amount) {
        // create grid of indestructible walls
        for (let i = 1; i < this.width; i += 2) {
            for (let j = 1; j < this.height; j += 2) {
                this.walls.push(new Wall({x: i, y: j}, 1, false, this.assets, this.gridSize));
            }
        }

        // create random destructible walls
        let random = (limit) => {return Math.floor(Math.random() * limit)};
        for (let i = 0; i < amount; i++) {
            let atRandomPosition = {x: random(this.width), y: random(this.height)};

            if (this.isAlreadyExisting(atRandomPosition)) {
                i--;
            } else {
                this.walls.push(new Wall(atRandomPosition, 1, true, this.assets, this.gridSize));
            }
        }
    }

    isAlreadyExisting(position) {
        for (let i = 0; i < this.walls.length; i++) {
            if (position.x === this.walls[i].position.x && position.y === this.walls[i].position.y) {
                return true;
            }
        }

        // don't render walls at each corner within 3 blocks
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                switch (true) {
                    case ((position.x === i) && (position.y === j)):
                        return true;
                    case ((position.x === (this.width-1-i)) && (position.y === (this.height-1-j))):
                        return true;
                    case ((position.x === i) && (position.y === (this.height-1-j))):
                        return true;
                    case ((position.x === (this.width-1-i)) && (position.y === j)):
                        return true;
                }
                /*if (    (   (position.x === i)                            &&      (position.y === j)  )      ||
                    (   (   position.x === (this.width - 1  - i)    )          &&      (position.y === (this.height - 1 - j) )) ||
                    (   (   position.x === i)                             &&      (position.y  ===     (this.height - 1 - j) )  ) ||
                    (   (   position.x === (this.width - 1 - i))              &&      (position.y === j ))
                ) {
                    return true;
                }*/
            }
        };
        return false;
    }

    notifyClient(event) {
        console.log("enters norifyClient");
        switch (event.id) {
            case 'direction':
                console.log("enters switch");
                this.client.move(event.direction);
        }
    }



}