"use strict";
import Element from './Element.js';
import Bomb from './Bomb.js';
import Wall from './Wall.js';


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



        // display initial bombs and walls counter on HTML
        try {
            document.getElementById("amountBombs").innerText = this.amountBombs;
            document.getElementById("amountWalls").innerText = this.amountWalls;
        } catch (e) {
            console.log(e)
        }



    }


    setDead() {
        this.dead = true;
    }


    /**
     * @description is being called in App.js every time the user presses a key
     * calls the movePlayer() method in Game.js
     * @param e = {id: '9fh3j4', key: 'ArrowLeft'}
     * @required in Game.js
     */
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
            this.game.broadcastDirection({id: this.id, direction: this.direction});

        }
    }


    /**
     * @description renders the avatar
     * note, that we added 6px to our x axis to center the image
     * draw() is being called inside of Game.js each render loop
     * @required in Game.js
     */
    draw(context) {

            // the +6 centers the image in this particular case
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
            context.fillText(this.id, this.position.x * this.gridSize + this.gridSize / 2, this.position.y * this.gridSize - 5);
            context.textAlign = "center";
            context.globalCompositeOperation='destination-over';

    }


    /**
     * change the direction of our avatar
     * and move it one grid size on the x or y axis
     */
    update() {
            // initialize next move
            let nextPosition = this.getNextPosition();

            // if next position is not blocked by an object
            if (this.isPositionColliding(nextPosition)) {
                this.position.x = nextPosition.x;
                this.position.y = nextPosition.y;

                // if successful, send movement to server
                this.game.broadcastPosition({id: this.id, x: this.position.x, y: this.position.y, direction: this.direction});
            }

    }


    /**
     * @description buildWall() determines if you're allowed to set a wall at this position (let coords).
     * Set wall at this position, if there isn't a Player or Wall.
     * @requires this.game
     */
    buildWall() {

        // if there's enough walls left
        if (this.amountWalls > 0) {

            // initialize next position
            let nextPosition = this.getNextPosition();

            let randomID = '';

            // if next position is not blocked by an object
            if (this.isPositionColliding(nextPosition)) {

                // generate randomID for easier removal
                randomID = '_' + Math.random().toString(36).substr(2, 9);


                // push wall at into our wall array
                this.game.walls.push(new Wall(nextPosition, 1, true, this.assets, this.gridSize, randomID));

                this.amountWalls--;

                // data to be send to server
                let data = {id: this.id, x: nextPosition.x, y: nextPosition.y, wallId: randomID, amountWalls: this.amountWalls, amountBombs: this.amountBombs};


                this.game.broadcastWall(data);

                // display the amount of walls you have currently have
                document.getElementById("amountWalls").innerText = this.amountWalls;

            }
        }
    }


    /**
     * set Bomb at your current position
     * @requires this.game
     */
    setBomb() {

        // if there's enough bombs left
        if (this.amountBombs > 0) {


            // place bomb inside your game
            this.game.bombs.push(new Bomb({x: this.position.x, y: this.position.y}, 1500, 1, this.assets, this.gridSize, this.game));

            this.amountBombs--;

            // create object with current position
            let playerState = {id: this.id, x: this.position.x, y: this.position.y, amountBombs: this.amountBombs};


            // send position of your bomb to all enemies
            this.game.broadcastBomb(playerState);

            // set counter of your bombs in the browser
            document.getElementById("amountBombs").innerHTML = this.amountBombs;
        }
    }


    /**
     * takes the current position and checks, if the next step is possible
     * @param position
     * @returns {boolean}
     * @requires this.game.walls & this.game.players
     */
    isPositionColliding(position) {
        return !this.doesPlayerCrossPlayer(position) && !this.doesPlayerTouchAWall(position) && !this.isPlayerOutOfBounds(position);
    }

    doesPlayerTouchAWall(position) {

        // checks, if there is a wall object on your position
        for (let i = 0; i < this.game.walls.length; i++) {
            if (this.game.walls[i].position.x === position.x && this.game.walls[i].position.y === position.y) {
                return true;
            }
        }
        return false;
    }

    doesPlayerCrossPlayer(position) {

        // checks, if there is a player object on your position
        for (let i = 0; i < this.game.players.length; i++) {
            if (this.game.players[i].position.x === position.x && this.game.players[i].position.y === position.y) {
                return true;
            }
        }
        return false;
    }

    isPlayerOutOfBounds(position) {

        //checks of position is out of bounds
        return position.x > this.game.width - 1 || position.y > this.game.height - 1 || position.x < 0 || position.y < 0;
    }


    /**
     * determines the next position based on your current direction
     * @returns {{x: number, y: *}|{x: *, y: number}|{x: *, y: *}}
     * @requires this.direction
     */
    getNextPosition() {

        switch (this.direction) {
            case "east":
                return {x: this.position.x + 1, y: this.position.y};

            case "west":
                return {x: this.position.x - 1, y: this.position.y};

            case "south":
                return {x: this.position.x, y: this.position.y + 1};

            case "north":
                return {x: this.position.x, y: this.position.y - 1};

        }
    }
}



























