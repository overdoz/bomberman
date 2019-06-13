"use strict";
import Element from './Element.js';
import Bomb from './Bomb.js';
import Wall from './Wall.js';


export default class Player extends Element {

    constructor(position, assets, health, amountBombs, amountWalls, gridSize, game) {

        super(position, assets);

        this.game = game;

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


        // this.maximumNumberOfBombs = this.numberOfBombs*2;
        // this.powerUps = null;
        // this.timeLeftToBuildWall = 15; // move this logic inside setBomb() ???
        this.dead = false;
        this.direction = 'east';

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

        document.addEventListener("keydown", this.triggerEvent.bind(this));

        document.getElementById("amountBombs").innerHTML = this.amountBombs;
        document.getElementById("amountWalls").innerHTML = this.amountWalls;

    }

    isDead() {
        return this.dead;
    }

    setDead() {
        this.dead = true;
    }



    triggerEvent(e) {
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
        }
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

    }

    /**
     * change the direction of our avatar
     * and move it one grid size on the x or y axis
     */
    update() {

            switch (this.direction) {
                case "east":
                    let east = {x: this.position.x + 1, y: this.position.y};
                    if (!this.isPlayerOutOfBounds(east) && !this.doesPlayerTouchAWall(east)) {
                        this.position = east;
                    }
                    break;

                case "west":
                    let west = {x: this.position.x - 1, y: this.position.y};
                    if (!this.isPlayerOutOfBounds(west) && !this.doesPlayerTouchAWall(west)) {
                        this.position = west;
                    }
                    break;

                case "south":
                    let south = {x: this.position.x, y: this.position.y + 1};
                    if (!this.isPlayerOutOfBounds(south) && !this.doesPlayerTouchAWall(south)) {
                        this.position = south;
                    }
                    break;

                case "north":
                    let north = {x: this.position.x, y: this.position.y - 1};
                    if (!this.isPlayerOutOfBounds(north) && !this.doesPlayerTouchAWall(north)) {
                        this.position = north;
                    }
                    break;
            }
    }

    buildWall() {
        if (this.amountWalls > 0) {
            switch (this.direction) {
                case "east":
                    let east = {x: this.position.x + 1, y: this.position.y};
                    if (!this.isPlayerOutOfBounds(east) && !this.doesPlayerTouchAWall(east)) {
                        this.game.walls.push(new Wall(east, 1, true, this.assets, this.gridSize));
                    }
                    break;

                case "west":
                    let west = {x: this.position.x - 1, y: this.position.y};
                    if (!this.isPlayerOutOfBounds(west) && !this.doesPlayerTouchAWall(west)) {
                        this.game.walls.push(new Wall(west, 1, true, this.assets, this.gridSize));
                    }
                    break;

                case "south":
                    let south = {x: this.position.x, y: this.position.y + 1};
                    if (!this.isPlayerOutOfBounds(south) && !this.doesPlayerTouchAWall(south)) {
                        this.game.walls.push(new Wall(south, 1, true, this.assets, this.gridSize));
                    }
                    break;

                case "north":
                    let north = {x: this.position.x, y: this.position.y - 1};
                    if (!this.isPlayerOutOfBounds(north) && !this.doesPlayerTouchAWall(north)) {
                        this.game.walls.push(new Wall(north, 1, true, this.assets, this.gridSize));
                    }
                    break;
            }
            this.amountWalls--;
            document.getElementById("amountWalls").innerHTML = this.amountWalls;
        }
    }

    setBomb() {
        if (this.amountBombs > 0) {
            let tempPosition = {x: this.position.x, y: this.position.y};
            this.game.bombs.push(new Bomb(tempPosition, 1500, 1, this.assets, this.gridSize, this.game));
            this.amountBombs--;

            // HTML manipulation
            document.getElementById("amountBombs").innerHTML = this.amountBombs;
            // TODO: Find a way to explode every bomb at its time
        }
    }

    doesPlayerTouchAWall(position) {
        for (let i = 0; i < this.game.walls.length; i++) {
            if (this.game.walls[i].position.x === position.x && this.game.walls[i].position.y === position.y) {
                return true;
            }
        }
        return false;
    }

    isPlayerOutOfBounds(position) {
        return position.x > this.game.width - 1 || position.y > this.game.height - 1 || position.x < 0 || position.y < 0;
    }




    // Reduces the Life Left of the current Player
    getDamage(damage) {
        // damage must always be a negative double
        if (damage < 0) {
            throw new Error("Damage must be a negative double number!");
        }
        this.health -= damage;
        // Player is dead
        if (this.health <= 0) {
            this.dead = true;
        }
    }


}



























