"use strict";
import Element from './Element.js';
import Bomb from './Bomb.js';
import Wall from './Wall.js';
import io from "socket.io-client";


export default class Player extends Element {

    constructor(position, assets, health, amountBombs, amountWalls, gridSize, game, id, direction) {

        super(position, assets);

        this.game = game;
        this.id = id;

        this.direction = direction;

        /**
         * assets required to render player and bombs
         * individual dimensions of our sprites
         * display each sprite with grid size measurements on the given context
         */
        this.assets = assets;
        this.spriteSize = {
            x: 27,
            y: 40,
        };

        this.gridSize = gridSize;


        /**
         * amount of live, bombs and walls
         */
        this.health = health; // double
        this.amountBombs = amountBombs;
        this.amountWalls = amountWalls;

        this.dead = false;

        this.spriteSheet = {
            south: {
                x: 0,
                y: 0
            },
            west: {
                x: 0,
                y: this.spriteSize.y
            },
            north: {
                x: 0,
                y: 2 * this.spriteSize.y
            },
            east: {
                x: 0,
                y: 3 * this.spriteSize.y
            }
        };


        this.socket = io.connect('http://localhost:9000');


        document.getElementById("amountBombs").innerHTML = this.amountBombs;
        document.getElementById("amountWalls").innerHTML = this.amountWalls;

    }


    setDead() {
        this.dead = true;
    }

    triggerEvent(e) {
        // console.log("We are now into the trigger zone...");

        if (!this.dead) {
            switch (e.key) {
                case 'ArrowLeft':
                    if (this.direction === 'west') {
                        this.update();
                    } else {
                        this.direction = 'west';
                    }
                    break;

                case 'ArrowRight':
                    if (this.direction === 'east') {
                        this.update();
                    } else {
                        this.direction = 'east';
                    }
                    break;

                case 'ArrowUp':
                    if (this.direction === 'north') {
                        this.update();
                    } else {
                        this.direction = 'north';
                    }
                    break;

                case 'ArrowDown':
                    if (this.direction === 'south') {
                        this.update();
                    } else {
                        this.direction = 'south';
                    }
                    break;

                case "b":
                    this.setBomb();
                    break;

                case " ":
                    this.buildWall();
                    break;
            }

        };


        this.socket.emit('changeDirection', {id: this.id, direction: this.direction});

    }





    /**
     * renders the avatar
     * note, that we added 6px to our x axis to center the image
     * draw() will also render our set of bombs
     */
    draw(context) {
            context.drawImage(
                this.assets['bomberman'],
                this.spriteSheet[this.direction].x,
                this.spriteSheet[this.direction].y,
                this.spriteSize.x,
                this.spriteSize.y,
                this.position.x * this.gridSize + 6,
                this.position.y * this.gridSize,
                this.spriteSize.x,
                this.spriteSize.y,
            );

            // Display nickname at the top of each player
            context.font = "10px Arial";
            context.fillText(this.id, this.position.x * this.gridSize + 20, this.position.y * this.gridSize - 5);
            context.textAlign = "center";
            context.globalCompositeOperation='destination-over';

    }

    /**
     * change the direction of our avatar
     * and move it one grid size on the x or y axis
     */
    update() {
            let coords = null;
            switch (this.direction) {
                case "east":
                    coords = {x: this.position.x + 1, y: this.position.y};
                    if (this.isPositionColliding(coords)) {
                        this.position.x++;
                    }
                    break;

                case "west":
                    coords = {x: this.position.x - 1, y: this.position.y};
                    if (this.isPositionColliding(coords)) {
                        this.position.x++;
                    }
                    break;

                case "south":
                    coords = {x: this.position.x, y: this.position.y + 1};
                    if (this.isPositionColliding(coords)) {
                        this.position.y++;
                    }
                    break;

                case "north":
                    coords = {x: this.position.x, y: this.position.y - 1};
                    if (this.isPositionColliding(coords)) {
                        this.position.y++;
                    }
                    break;
            };
            this.socket.emit('movePlayer', {id: this.id, x: this.position.x, y: this.position.y, direction: this.direction});
    }

    /**
     * buildWall() determines if you're allowed to set a wall at this position (let coords).
     * Set wall at this position, if there isn't a Player or Wall.
     */
    buildWall() {
        if (this.amountWalls > 0) {
            let coords = null;
            switch (this.direction) {
                case "east":
                    coords = {x: this.position.x + 1, y: this.position.y};
                    if (this.isPositionColliding(coords)) {
                        this.game.walls.push(new Wall(coords, 1, true, this.assets, this.gridSize));
                    }
                    break;

                case "west":
                    coords = {x: this.position.x - 1, y: this.position.y};
                    if (this.isPositionColliding(coords)) {
                        this.game.walls.push(new Wall(coords, 1, true, this.assets, this.gridSize));
                    }
                    break;

                case "south":
                    coords = {x: this.position.x, y: this.position.y + 1};
                    if (this.isPositionColliding(coords)) {
                        this.game.walls.push(new Wall(coords, 1, true, this.assets, this.gridSize));
                    }
                    break;

                case "north":
                    coords = {x: this.position.x, y: this.position.y - 1};
                    if (this.isPositionColliding(coords)) {
                        this.game.walls.push(new Wall(coords, 1, true, this.assets, this.gridSize));
                    }
                    break;
            }
            this.amountWalls--;

            coords['id'] = '_' + Math.random().toString(36).substr(2, 9);

            this.socket.emit('setWall', coords);

            document.getElementById("amountWalls").innerHTML = this.amountWalls;
        }
    }

    /**
     * set Bomb at your current position
     */
    setBomb() {
        if (this.amountBombs > 0) {
            let tempPosition = {x: this.position.x, y: this.position.y};
            this.game.bombs.push(new Bomb(tempPosition, 1500, 1, this.assets, this.gridSize, this.game));
            this.amountBombs--;

            // HTML manipulation
            document.getElementById("amountBombs").innerHTML = this.amountBombs;
            // TODO: Find a way to explode every bomb at its time

            this.socket.emit('setBomb', tempPosition);

        }
    }

    isPositionColliding(position) {
        return !this.doesPlayerCrossPlayer(position) && this.doesPlayerTouchAWall(position) && this.isPlayerOutOfBounds(position);
    }

    doesPlayerTouchAWall(position) {
        this.game.walls.forEach(wall => {
            if (wall.position.x === position.x && wall.position.y === position.y) {
                return true;
            }
        });
        return false;
    }

    // TODO: doesn't work yet
    doesPlayerCrossPlayer(position) {
        this.game.players.forEach(player => {
            if (player.position.x === position.x && player.position.y === position.y) {
                return true;
            }
        });
        return false;
    }

    isPlayerOutOfBounds(position) {
        return position.x > this.game.width - 1 || position.y > this.game.height - 1 || position.x < 0 || position.y < 0;
    }




}



























