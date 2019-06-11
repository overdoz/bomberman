"use strict";
import Element from './Element.js';
import Bomb from './Bomb.js';
import Wall from './Wall.js';

export default class Player extends Element {

    constructor(position, assets, health = 1, numberOfBombs = 14, numberOfWalls = 7, gridSize, context, game) {

        super(position, assets);

        this.game = game;

        /**
         * assets required to render player and bombs
         * individual dimensions of our sprites
         * display each sprite with grid size measurements on the given context
         */
        this.assets = assets;
        this.spriteSizeX = 27;
        this.spriteSizeY = 40;
        this.gridSize = gridSize;
        this.context = context;


        /**
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

        document.addEventListener("keydown", this.triggerEvent.bind(this));

    }

    /**
     * Declares a player dead!
     */
    setDead() {
        this.dead = true;
    }



    /**
     * Check in Grid if there is any wall
     * @param e
     */
    triggerEvent(e) {
        switch (e.key) {
            case 'ArrowLeft':
                this.direction = 'west';
                this.update();
                break;
            case 'ArrowRight':
                this.direction = 'east';
                this.update();
                break;
            case 'ArrowUp':
                this.direction = 'north';
                this.update();
                break;
            case 'ArrowDown':
                this.direction = 'south';
                this.update();
                break;
            case "b":
                if (this.numberOfBombs > 0) {
                    let tempPosition = {x: this.position.x, y: this.position.y};
                    this.game.bombs.push(new Bomb(tempPosition, 1, 1, this.assets, this.gridSize, this.game));
                    this.numberOfBombs--;
                    // TODO: Find a way to explode every bomb at its time
                };
                break;
            case " ":
                this.buildWall();
                break;
        }


    }



    /**
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
                this.position.x * this.gridSize + 6,
                this.position.y * this.gridSize,
                this.spriteSizeX,
                this.spriteSizeY
            );

        }
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
                    this.position.x += 1;
                }
                break;
            case "west":
                let west = {x: this.position.x - 1, y: this.position.y};
                if (!this.isPlayerOutOfBounds(west) && !this.doesPlayerTouchAWall(west)) {
                    this.position.x -= 1;
                }
                break;
            case "south":
                let south = {x: this.position.x, y: this.position.y + 1};
                if (!this.isPlayerOutOfBounds(south) && !this.doesPlayerTouchAWall(south)) {
                    this.position.y += 1;
                }
                break;
            case "north":
                let north = {x: this.position.x, y: this.position.y - 1};
                if (!this.isPlayerOutOfBounds(north) && !this.doesPlayerTouchAWall(north)) {
                    this.position.y -= 1;
                }
                break;
        }

    }

    buildWall() {
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
    }

    doesPlayerTouchAWall(position) {
        for (let i = 0; i < this.game.walls.length; i++) {
            if (this.game.walls[i].position.x === position.x && this.game.walls[i].position.y === position.y) {
                console.log(i);
                return true;
            }
        }
        return false;



    }

    isPlayerOutOfBounds(position) {
        if (position.x > this.game.width - 1 || position.y > this.game.height - 1 || position.x < 0 || position.y < 0) {
            return true;
        } else {
            return false;
        }
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



























