"use strict";
import Element from './Element.js';
import Bomb from './Bomb.js';
import Queue from './Queue.js';

export default class Player extends Element {

    constructor(x, y, assets, health = 1, numberOfBombs = 14, numberOfWalls = 7, gridSize, context, grid) {


        super(/*position, assets*/);
        // this.position = {x: 1, y: 1}
        /*
         * current position
         * change x or y to move our player
         */
        this.x = x;
        // this.position = position;
        this.y = y;

        //save grid to check for wall collisions
        this.grid = grid;

        /*
         * assets required to render player and bombs
         * individual dimensions of our sprites
         * display each sprite with grid size measurements on the given context
         */
        this.assets = assets;
        this.spriteSizeX = 27;
        this.spriteSizeY = 40;
        this.gridSize = gridSize;
        this.context = context;


        /*
         * amount of live, bombs and walls
         */
        this.health = health; // double
        this.numberOfBombs = numberOfBombs; // 14 at the beginning
        this.numberOfWalls = numberOfWalls; //  7 walls at the beginning
        this.bombsSet = [];

        this.maximumNumberOfBombs = this.numberOfBombs*2;
        this.powerUps = null;
        this.timeLeftToBuildWall = 15; // move this logic inside setBomb() ???
        this.dead = false;
        this.direction = 'east';



        this.spriteSheet = {
            south: {
                x: 0 * this.spriteSizeX,
                y: 0 * this.spriteSizeY
            },
            west: {
                x: 0 * this.spriteSizeX,
                y: 1 * this.spriteSizeY
            },
            north: {
                x: 0 * this.spriteSizeX,
                y: 2 * this.spriteSizeY
            },
            east: {
                x: 0 * this.spriteSizeX,
                y: 3 * this.spriteSizeY
            }
        };

        /*
         * react to keypress
         * 1. move our player
         * 2. set bomb at position of our player
         */
        document.addEventListener('keyup', this.conflictFind.bind(this));
        document.addEventListener("keydown", this.pressedKey.bind(this));
        // document.addEventListener("space", this.buildWall())
    }

    /**
     * Declares a player dead!
     */
    setDead() {
        this.dead = true;
    }


    /*
     * check if the pressed key is equal to "b"
     * if true and the amount of bombs is greater than 0
     * => add a bomb to our array
     */
    pressedKey(e) {
        // throw a Bomb || ONLY A BOMB AT A TIME
        if (e.key === "b" && this.bombsSet.length === 0) {
            if (this.numberOfBombs > 0) {
                this.bombsSet.push(new Bomb(this.x, this.y, 1, 1, true, this.assets));
                this.numberOfBombs--;
                // TODO: Find a way to explode every bomb at its time
                var that = this;
                setTimeout(function () {
                    that.makeFire();
                }, 2000);
            }
            // Build a Wall
        } else if (e.key === " ") {
            this.buildWall();
        }
    }

    makeFire() {
        Bomb.explode = true;
        let that = this;
        setTimeout(function () {
            let bomb = that.bombsSet.shift();
            that.explode(bomb);
            Bomb.explode = false;
        }, 500);
    }


    /**
     * Bomb exploding and does damage
     */
    explode(bomb) {
        this.grid.getDamage(bomb.x, bomb.y);
    }

    /**
     * Check in Grid if there is any wall
     * @param e
     */
    conflictFind(e) {
        let x = this.x - 1;
        let y = this.y - 1;
        switch (e.key) {
            case 'ArrowLeft':
                this.direction = 'west';
                x -= this.gridSize;
                break;
            case 'ArrowRight':
                this.direction = 'east';
                x += this.gridSize;
                break;
            case 'ArrowUp':
                this.direction = 'north';
                y -= this.gridSize;
                break;
            case 'ArrowDown':
                this.direction = 'south';
                y += this.gridSize;
                break;
        }
        if (!this.grid.findPlayerWallConflict(x,y)) {
            this.changeDirection(e);
        }
    }

    /*
     * change the direction of our avatar
     * and move it one grid size on the x or y axis
     */
    changeDirection(e) {
        switch (e.key) {
            case 'ArrowLeft':
                this.direction = 'west';
                this.x -= this.gridSize;
                break;
            case 'ArrowRight':
                this.direction = 'east';
                this.x += this.gridSize;
                break;
            case 'ArrowUp':
                this.direction = 'north';
                this.y -= this.gridSize;
                break;
            case 'ArrowDown':
                this.direction = 'south';
                this.y += this.gridSize;
                break;
        }
    }


    /*
     * renders the avatar
     * note, that we added 6px to our x axis to center the image
     * draw() will also render our set of bombs
     */
    draw(context) {
        if (!this.dead) {
            context.drawImage(
                this.assets.bomberman,
                this.spriteSheet[this.direction].x,
                this.spriteSheet[this.direction].y,
                this.spriteSizeX,
                this.spriteSizeY,
                this.x + 6,
                this.y,
                this.spriteSizeX,
                this.spriteSizeY
            );
            this.bombsSet.map(bomb => {
                bomb.draw(this.context)
            });
        }
    }


    getPosition() {
        return super.getPosition();
    }

    getPositionX() {
        return this.x;
    }

    getPositionY() {
        return this.y;
    }


    getNumberOfBombs() {
        return this.numberOfBombs;
    }

    getHealth() {
        return this.health;
    }

    update() {
        // TODO: OUT OF CANVAS
        // TODO: A WALL IN FRONT OF THE PLAYER
        switch (this.direction) {
            case "east":
                this.x += this.gridSize;
                break;
            case "west":
                this.x -= this.gridSize;
                break;
            case "south":
                this.y += this.gridSize;
                break;
            case "north":
                this.y -= this.gridSize;
                break;
        }

    }

    buildWall() {
        var wall_x = this.x - 1;
        var wall_y = this.y - 1;

        switch(this.direction) {
            case "north":
                wall_y -= this.gridSize;
                break;
            case "south":
                wall_y += this.gridSize;
                break;
            case "east":
                wall_x += this.gridSize;
                break;
            case "west":
                wall_x -= this.gridSize;
        }

        this.grid.addWall(wall_x, wall_y);
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



























