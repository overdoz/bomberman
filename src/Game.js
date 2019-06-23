"use strict";

import Player from './Player.js';
import Wall from './Wall.js';
import Bomb from "./Bomb.js";

export default class Game {

    constructor(canvas, width=13, height=13, assets, id) {


        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.assets = assets;

        this.position = null;
        this.direction = null;

        this.id = id;

        this.width = width;
        this.height = height;

        this.frameCount = 0;


        this.gridSize = this.canvas.width / width;


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
     * @param data = {id: data.id, x: 0, y: 0, direction: 'east'}
     */
    pushPlayer(data) {

        let position = {x: data.x, y: data.y};
        let doesContain = false;

        // checks if there's already a player with this ID
        this.players.forEach(player => {
            if (player.id === data.id) {
                doesContain = true;
            }
        });

        // If there is no player with this particular ID, create new Player
        if (!doesContain) {
            this.players.push(new Player(position, this.assets, 1, 10, 10, this.gridSize, this, data.id, data.direction));
        } else {
            return;
        }


    }

    /**
     * move own player
     * @param data = {id: data.id, x: 0, y: 0, direction: 'east'}
     */
    movePlayer(data) {
        this.players.forEach(player => {
            if (player.id === data.id) {
                player.triggerEvent(data);
            }
        });
    }

    /**
     * receive movement from enemy players
     * @param data = {id: data.id, x: 0, y: 0, direction: 'east'}
     */
    playerMoved(data) {
        this.players.forEach(player => {
            if (player.id === data.id) {
                player.position.x = data.x;
                player.position.y = data.y;
                player.direction = data.direction;
            }
        });
    }

    /**
     * receive direction change from enemy players
     * @param data = {id: data.id, x: 0, y: 0, direction: 'east'}
     */
    changeDirection(data) {
        this.players.forEach(player => {
            if (player.id === data.id) {
                player.direction = data.direction;
            }
        })
    }

    /**
     * receive bombs from enemy players
     * @param position = {x: 0, y: 0}
     */
    getBomb(position) {
        this.bombs.push(new Bomb(position, 1500, 1, this.assets, this.gridSize, this));
    }

    /**
     * receive walls from enemy players
     * @param position = {x: 0, y: 0}
     */
    getWall(position) {
        this.walls.push(new Wall(position, 1, true, this.assets, this.gridSize, position.id));
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
        });

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