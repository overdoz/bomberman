"use strict";

import Element from './Element.js';

export default class Player extends Element {



    constructor(x, y, assets, health = 1, numberOfBombs = 14, numberOfWalls = 7, gridSize) {
        super(/*position, assets*/);
        // this.position = {x: 1, y: 1}
        // this.position = position;
        this.assets = assets;
        this.health = health; // double
        this.numberOfBombs = numberOfBombs; // 14 at the beginning
        this.numberOfWalls = numberOfWalls; //  7 walls at the beginning
        this.maximumNumberOfBombs = this.numberOfBombs*2;
        this.powerUps = null;
        this.timeLeftToBuildWall = 15;
        this.dead = false;
        this.direction = 'east';
        this.spriteSizeX = 27;
        this.spriteSizeY = 40;
        this.gridSize = gridSize;

        this.x = x;
        this.y = y;
        // console.log(this.position)

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
        }
        document.addEventListener('keyup', this.changeDirection.bind(this));
    }

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
        // this.update(this.direction);
    }


    /*getGridPositionX() {
        return super.getX();
    }

    getGridPositionY() {
        return super.getY();
    }*/
    getPosition() {
        return super.getPosition();
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


    throwBomb() {
        // throws a bomb at the current position
        if (this.numberOfBombs > 0) {
            this.numberOfBombs--;
            // return new Bomb(this.position);
        }
        return null;
    }

    // for what purpose?
    getNumberOfBombs() {
        return this.numberOfBombs;
    }
    // TODO: RENDER FUNCTION
    draw(context) {
        context.drawImage(
            this.assets.bomberman,
            this.spriteSheet[this.direction].x,
            this.spriteSheet[this.direction].y,
            this.spriteSizeX,
            this.spriteSizeY,
            this.x,
            this.y,
            this.spriteSizeX,
            this.spriteSizeY
        )

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
        if (this.timeLeftToBuildWall == 0) {
            this.timeLeftToBuildWall = 15;
            return new Wall(this.position)
        } else {
            return null;
        }
    }


}

