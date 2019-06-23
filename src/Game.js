"use strict";

import Player from './Player.js';
import Wall from './Wall.js';
import Bomb from "./Bomb.js";
import io from 'socket.io-client';


export default class Game {

    constructor(canvas, width=13, height=13, assets, id) {


        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.assets = assets;

        // this.position = null;
        // this.direction = null;

        this.id = id;

        this.width = width;
        this.height = height;

        this.frameCount = 0;


        this.gridSize = this.canvas.width / width;

        // TODO: initialize each player inside constructor or inside App.js?


        // let gameOver = false;

        this.bombs = [];
        this.players = [];
        this.walls = [];




        this.startAnimating();








    }

    // TODO: update function
    update() {

    }

    /**
     *
     * @param data = {id: data.id, x: 0, y: 0, direction: 'east'}
     */
    pushPlayer(data) {
        //console.log(this.players);
        let position = {x: data.x, y: data.y};
        let doesnotcontain = true;

        //console.log(this.players);
        this.players.forEach(player => {
            if (player.id === data.id) {
                doesnotcontain = false;
            }
        });

        if (doesnotcontain) {
            this.players.push(new Player(position, this.assets, 1, 10, 10, this.gridSize, this, data.id, data.direction));
        } else {
            return;
        }
    }


    event(data) {
        this.players.forEach(player => {
            if (player.id === data.id) {
                player.triggerEvent(data);
            }
        });
    }

    movePlayer(data) {
        console.log("in Game now.. :");
        this.players.forEach(player => {
            if (player.id === data.id) {
                console.log("hat geklappptptptptptpp");
                player.triggerEvent(data);
            }
        });
    }

    playerMoved(data) {
            console.log("--------------------------------------------");
            console.log(data);
            this.players.forEach(player => {
             if (player.id === data.id) {
                  player.position.x = data.x;
                  player.position.y = data.y;
                  player.direction = data.direction;
             }
         });
    }

    changeDirection(data) {
        this.players.forEach(player => {
            if (player.id === data.id) {
                player.direction = data.direction;
            }
        })
    }

    getBomb(data) {

        this.bombs.push(new Bomb(data, 1500, 1, this.assets, this.gridSize, this));


    }

    getWall(data) {
        this.walls.push(new Wall(data, 1, true, this.assets, this.gridSize));
        // TODO: fix bug whenever you set a wall
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
        //console.log(this.players);

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





}