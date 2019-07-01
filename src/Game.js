"use strict";

import Player from './Player.js';
import Wall from './Wall.js';
import Bomb from "./Bomb.js";

export default class Game {

    constructor(canvas, width=13, height=13, assets, id) {

        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.assets = assets;


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
     * create new player
     * is being called in App.js whenever socket receives a signal
     * @param data = {id: data.id, x: 0, y: 0, direction: 'east'}
     */
    pushPlayer(data) {

        // create position of this player
        let position = {x: data.x, y: data.y};

        // we expect, that there is no player with this particular ID (data.id)
        let doesContain = false;

        // checks if there's already a player with this ID
        this.players.forEach(player => {
            if (player.id === data.id) {
                doesContain = true;
            }
        });

        // If there is no player with this particular ID, create new Player
        if (!doesContain) {
            this.players.push(new Player(position, this.assets, 1, 99, 99, this.gridSize, this, data.id, data.direction));
            // this.creatHTMLnode(data);
        }


    }


    /**
     * move own player
     * is being called in App.js whenever user presses a key
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
     * is being called in App.js whenever socket receives a signal
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
     * is being called in App.js whenever socket receives a signal
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
     * is being called in App.js whenever socket receives a signal
     * @param position = {x: 0, y: 0}
     */
    getBomb(position) {
        this.bombs.push(new Bomb(position, 1500, 1, this.assets, this.gridSize, this));
    }


    /**
     * receive walls from enemy players
     * is being called in App.js whenever socket receives a signal
     * @param data = {x: 0, y: 0, id: 'dasr43g4'}
     */
    getWall(data) {
        let tempPosition = {x: data.x, y: data.y};
        console.log('Game received wall: ', tempPosition);
        let doesntContains = true;
        this.walls.forEach(wall => {
            if (wall.id === data.id) {
                doesntContains = false;
            }
        });
        if (doesntContains) {
            this.walls.push(new Wall(tempPosition, 1, true, this.assets, this.gridSize, data.id));
        }
    }


    /**
     * render method to display all elements on the game board
     * canvas has to be cleared each render loop
     */
    draw() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.players.forEach(player => {
            player.draw(this.context);
        });

        this.bombs.forEach(bomb => {
            bomb.draw(this.context);
        });

        this.walls.forEach(wall => {
            wall.draw(this.context);
        });



    }


    startAnimating() {
        this.frameTime = 1000;
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
        // this.frameCount++;
    }


    /**
     * creates an HTML node every time a player has been created
     * @param data = {id: #344gds, amountBombs: 29, amountWalls: 93}
     * TODO: sync all counters
     */
    creatHTMLnode(data) {
        if (this.players.length > 1) {



            let enemyInventory = document.getElementById('inventoryEnemy');
            let container = document.createElement("div");
            container.id = 'bombs';

            let id = document.createElement("p");
            id.innerText = data.id;

            let img = document.createElement("img");
            img.id = data.id + 'BombImg';
            img.src = "dist/bomb_icon.png";

            let p = document.createElement("p");
            p.id = data.id + 'BombText';
            p.innerText = data.amountBombs;

            let img2 = document.createElement("img");
            img2.id = data.id + 'WallImg';
            img2.src = "dist/wall.png";

            let p2 = document.createElement("p");
            p2.id = data.id + 'WallText';
            p2.innerText = data.amountWalls;

            container.appendChild(id);
            container.appendChild(img);
            container.appendChild(p);
            container.appendChild(img2);
            container.appendChild(p2);
            enemyInventory.appendChild(container);

        }
    }
}