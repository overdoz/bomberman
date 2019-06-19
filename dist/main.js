/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/App.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: AssetLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssetLoader", function() { return AssetLoader; });
/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game.js */ "./src/Game.js");



/*import _ from 'lodash';
import './main.css';
import Bomberman from '../images/bomberman.png';
import DestructibleWall from '../images/wall.png';
import Bomb from '../images/bomb.png';
import IndestructibleWall from '../images/grid_option2.png';
import Fire from '../images/fire.png';*/

class AssetLoader {
    loadAsset(name, url) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.addEventListener('load', function() {
                return resolve({ name, image: this });
            });
        });
    }

    loadAssets(assetsToLoad) {
        return Promise.all(
            assetsToLoad.map(asset => this.loadAsset(asset.name, asset.url))
        ).then(assets =>
            assets.reduceRight(
                (acc, elem) => ({ ...acc, [elem.name]: elem.image }),
                {}
            )
        );
    }
}



new AssetLoader()
    /*.loadAssets([
        { name: 'bomberman', url: Bomberman },
        { name: 'wall', url: DestructibleWall },
        { name: 'bomb', url: Bomb },
        { name: 'grid_option2', url: IndestructibleWall },
        { name: 'fire', url: Fire },
    ])*/
    .loadAssets([
        { name: 'bomberman', url: '../images/bomberman.png' },
        { name: 'wall', url: '../images/wall.png' },
        { name: 'bomb', url: '../images/bomb.png' },
        { name: 'grid_option2', url: '../images/grid_option2.png' },
        { name: 'fire', url: '../images/fire.png' },
    ])
    .then(assets => {
        let players = []
        new _Game_js__WEBPACK_IMPORTED_MODULE_0__["default"]("myCanvas", 13, 13, assets);
    }).catch(err => {
        window.location.href = "http://stackoverflow.com/search?q=[js]+" + err;
})



/***/ }),

/***/ "./src/Bomb.js":
/*!*********************!*\
  !*** ./src/Bomb.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Bomb; });
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Element.js */ "./src/Element.js");


class Bomb extends _Element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {

    constructor(position, timeToExplode = 5000, radius, assets, gridSize, game) {
        super(position, assets);

        this.game = game;

        // unique ID function from stackoverflow
        this.ID = '_' + Math.random().toString(36).substr(2, 9);

        this.gridSize = gridSize;
        this.isExploded = false;

        this.timeToExplode = timeToExplode; // init for 5 seconds
        this.radius = 2;

        this.spriteSize = {
            bomb: {
                x: 28,
                y: 28,
            },
            fire: {
                x: 38,
                y: 38,
            }
        };

        // bomb destroys itself after being created
        setTimeout(() => {
            this.animateExplosion();
        }, this.timeToExplode)
    }

    animateExplosion() {
        this.isExploded = true;
        setTimeout(() => {
            this.destroySurrounding();
        }, 500);
    }

    getSurroundingPositions() {
        let x = this.position.x;
        let y = this.position.y;
        return [
            {x: x ,     y: y},
            {x: x+1,    y: y},
            {x: x,      y: y+1},
            {x: x+1,    y: y+1},
            {x: x-1,    y: y},
            {x: x,      y: y-1},
            {x: x-1,    y: y-1},
            {x: x-1,    y: y+1},
            {x: x+1,    y: y-1},
        ];
    }

    /**
     * destroySurrounding() iterates through this.games.bombs and deletes this particular bomb with the given ID
     * after detonation it scans all surrounding players and destructible walls, which are affected
     *
     * let position determines the surrounding positions
     */
    destroySurrounding() {
        // index of the bomb to be deleted
        let index = this.game.bombs.map(bomb => {return bomb.ID}).indexOf(this.ID);

        // delete bomb at index
        let v = this.game.bombs.splice(index, 1);


        // delete affected players
        this.game.players.forEach((value, index) => {
            this.getSurroundingPositions().forEach(position => {
                if (value.position.x === position.x && value.position.y === position.y) {
                    v = this.game.players.splice(index, 1);
                    //TODO: The f*** player doesn't die!!!
                    v.setDead();
                }
            })
        });

        // TODO: not all walls are getting destroyed :( I guess, each time an element is deleted, ell upcoming indexes also change
        // delete affected walls
        let indexes = [];
        this.game.walls.forEach((value, index) => {
            this.getSurroundingPositions().forEach(position => {
                if (value.position.x === position.x && value.position.y === position.y && value.isDestructible === true) {
                    // v = this.game.walls.splice(index, 1, null);
                    indexes.push(index);
                }
            })
        });
        // IMPORTANT! Because .splice() shortens the array, we safe all indexes, which have to be deleted inside of 'let indexes'
        indexes.sort((a, b) => {return b-a}).forEach((index) => {this.game.walls.splice(index, 1)});
    }

    // display bomb or fire image
    draw(context) {
        if (!this.isExploded) {
            context.drawImage(
                this.assets['bomb'],
                0,
                0,
                this.spriteSize.bomb.x,
                this.spriteSize.bomb.y,
                this.position.x * this.gridSize,
                this.position.y * this.gridSize,
                this.gridSize,
                this.gridSize,
            )
        } else {
            // draw surrounding fire
            this.getSurroundingPositions().forEach(position => {
                context.drawImage(
                    this.assets['fire'],
                    0,
                    0,
                    this.spriteSize.fire.x,
                    this.spriteSize.fire.y,
                    position.x * this.gridSize,
                    position.y * this.gridSize,
                    this.gridSize,
                    this.gridSize,
                );
            })

        }
    }


}



/***/ }),

/***/ "./src/Element.js":
/*!************************!*\
  !*** ./src/Element.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Element; });


class Element {

    // position should have the format: {x: 12, y: 82}
    // e.g. return this.position.x || this.position["x"]
    constructor(position, assets) {
        this.position = position;
        this.assets = assets;
    }

    getPosition() {
        return this.position;
    }


}


/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player.js */ "./src/Player.js");
/* harmony import */ var _Wall_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Wall.js */ "./src/Wall.js");
/* harmony import */ var _Bomb_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Bomb.js */ "./src/Bomb.js");






class Game {

    constructor(canvas, width=13, height=13, assets) {
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



        this.players.push(new _Player_js__WEBPACK_IMPORTED_MODULE_0__["default"]({x: 0, y: 0}, this.assets, 1, 14, 77, this.gridSize, this));


        this.generateRandomWalls(30);
        this.startAnimating();
    }

    // TODO: update function
    update() {
        /**
         * update player in the game board
         */
        this.players.forEach(player => {
            if(this.frameCount % player.moveSpeed === 0) {
                switch (player.direction) {
                    case "east":
                        let east = {x: player.position.x + 1, y: player.position.y};
                        if (!player.isPlayerOutOfBounds(east) && !player.doesPlayerTouchAWall(east)) {
                            player.position = east;
                        }
                        break;

                    case "west":
                        let west = {x: player.position.x - 1, y: player.position.y};
                        if (!player.isPlayerOutOfBounds(west) && !player.doesPlayerTouchAWall(west)) {
                            player.position = west;
                        }
                        break;

                    case "south":
                        let south = {x: player.position.x, y: player.position.y + 1};
                        if (!player.isPlayerOutOfBounds(south) && !player.doesPlayerTouchAWall(south)) {
                            player.position = south;
                        }
                        break;

                    case "north":
                        let north = {x: player.position.x, y: player.position.y - 1};
                        if (!player.isPlayerOutOfBounds(north) && !player.doesPlayerTouchAWall(north)) {
                            player.position = north;
                        }
                }
            }

        });

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
        this.frameTime = 1000 / 10;
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
                this.walls.push(new _Wall_js__WEBPACK_IMPORTED_MODULE_1__["default"]({x: i, y: j}, 1, false, this.assets, this.gridSize));
            }
        }

        // create random destructible walls
        let random = (limit) => {return Math.floor(Math.random() * limit)};
        for (let i = 0; i < amount; i++) {
            let atRandomPosition = {x: random(this.width), y: random(this.height)};

            if (this.isAlreadyExisting(atRandomPosition)) {
                i--;
            } else {
                this.walls.push(new _Wall_js__WEBPACK_IMPORTED_MODULE_1__["default"](atRandomPosition, 1, true, this.assets, this.gridSize));
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



}

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Element.js */ "./src/Element.js");
/* harmony import */ var _Bomb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bomb.js */ "./src/Bomb.js");
/* harmony import */ var _Wall_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Wall.js */ "./src/Wall.js");






class Player extends _Element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {

    constructor(position, assets, health, moveSpeed, amountBombs, amountWalls, gridSize, game) {

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
        /**
         * move speed of a player
         */
        this.moveSpeed = 20; //double


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
        if(this.game.frameCount % this.moveSpeed === 0) {
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
    }

    buildWall() {
        if (this.amountWalls > 0) {
            switch (this.direction) {
                case "east":
                    let east = {x: this.position.x + 1, y: this.position.y};
                    if (!this.isPlayerOutOfBounds(east) && !this.doesPlayerTouchAWall(east)) {
                        this.game.walls.push(new _Wall_js__WEBPACK_IMPORTED_MODULE_2__["default"](east, 1, true, this.assets, this.gridSize));
                    }
                    break;

                case "west":
                    let west = {x: this.position.x - 1, y: this.position.y};
                    if (!this.isPlayerOutOfBounds(west) && !this.doesPlayerTouchAWall(west)) {
                        this.game.walls.push(new _Wall_js__WEBPACK_IMPORTED_MODULE_2__["default"](west, 1, true, this.assets, this.gridSize));
                    }
                    break;

                case "south":
                    let south = {x: this.position.x, y: this.position.y + 1};
                    if (!this.isPlayerOutOfBounds(south) && !this.doesPlayerTouchAWall(south)) {
                        this.game.walls.push(new _Wall_js__WEBPACK_IMPORTED_MODULE_2__["default"](south, 1, true, this.assets, this.gridSize));
                    }
                    break;

                case "north":
                    let north = {x: this.position.x, y: this.position.y - 1};
                    if (!this.isPlayerOutOfBounds(north) && !this.doesPlayerTouchAWall(north)) {
                        this.game.walls.push(new _Wall_js__WEBPACK_IMPORTED_MODULE_2__["default"](north, 1, true, this.assets, this.gridSize));
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
            this.game.bombs.push(new _Bomb_js__WEBPACK_IMPORTED_MODULE_1__["default"](tempPosition, 1500, 1, this.assets, this.gridSize, this.game));
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





























/***/ }),

/***/ "./src/Wall.js":
/*!*********************!*\
  !*** ./src/Wall.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Wall; });
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Element.js */ "./src/Element.js");


class Wall extends _Element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {

    constructor(position, strength, isDestructible, assets, gridSize) {
        super(position, assets);

        this.isDestructible = isDestructible;
        // this.strength = strength;

        this.spriteSize = {
            destructible: {
                x: 32,
                y: 32,
            },
            indestructible: {
                x: 15,
                y: 16,
            }
        };

        this.gridSize = gridSize;
    }



    draw(context) {
        if (this.isDestructible === true) {
            context.drawImage(
                this.assets['wall'],
                0,
                0,
                this.spriteSize.destructible.x,
                this.spriteSize.destructible.y,
                this.position.x * this.gridSize,
                this.position.y * this.gridSize,
                this.gridSize,
                this.gridSize,
            )
        } else {
            context.drawImage(
                this.assets['grid_option2'],
                0,
                0,
                this.spriteSize.indestructible.x,
                this.spriteSize.indestructible.y,
                this.position.x * this.gridSize,
                this.position.y * this.gridSize,
                this.gridSize,
                this.gridSize,
            )
        }

    }


}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQm9tYi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9XYWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQWE7O0FBRWdCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQzs7QUFFL0I7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLG9CQUFvQjtBQUNwRCxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsa0NBQWtDO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0EsU0FBUyxvQ0FBb0M7QUFDN0MsU0FBUyxzQ0FBc0M7QUFDL0MsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyxnREFBZ0Q7QUFDekQsU0FBUywwQkFBMEI7QUFDbkM7QUFDQTtBQUNBLFNBQVMsb0RBQW9EO0FBQzdELFNBQVMsMENBQTBDO0FBQ25ELFNBQVMsMENBQTBDO0FBQ25ELFNBQVMsMERBQTBEO0FBQ25FLFNBQVMsMENBQTBDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0RBQUk7QUFDaEIsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUN4REQ7QUFBQTtBQUFBO0FBQW1DOztBQUVwQixtQkFBbUIsbURBQU87O0FBRXpDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJDQUEyQztBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0JBQWdCO0FBQzdCLGFBQWEsZ0JBQWdCO0FBQzdCLGFBQWEsa0JBQWtCO0FBQy9CLGFBQWEsa0JBQWtCO0FBQy9CLGFBQWEsZ0JBQWdCO0FBQzdCLGFBQWEsa0JBQWtCO0FBQy9CLGFBQWEsa0JBQWtCO0FBQy9CLGFBQWEsa0JBQWtCO0FBQy9CLGFBQWEsa0JBQWtCO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxlQUFlOztBQUVoRTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLGdDQUFnQyxXQUFXLHNCQUFzQixpQ0FBaUM7QUFDbEc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7O0FDcElBO0FBQUE7QUFBYTs7QUFFRTs7QUFFZix5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOzs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBYTs7QUFFb0I7QUFDSjtBQUNBOztBQUVkOztBQUVmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7QUFJQSw4QkFBOEIsa0RBQU0sRUFBRSxXQUFXOzs7QUFHakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGdCQUFnQjtBQUN2QywyQkFBMkIsaUJBQWlCO0FBQzVDLG9DQUFvQyxnREFBSSxFQUFFLFdBQVc7QUFDckQ7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQyx1QkFBdUIsWUFBWTtBQUNuQyxvQ0FBb0M7O0FBRXBDO0FBQ0E7QUFDQSxhQUFhO0FBQ2Isb0NBQW9DLGdEQUFJO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1Qix1QkFBdUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsT0FBTztBQUM5QiwyQkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBLEM7Ozs7Ozs7Ozs7OztBQ3BMQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWE7QUFDc0I7QUFDTjtBQUNBOzs7QUFHZCxxQkFBcUIsbURBQU87O0FBRTNDOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qjs7O0FBRzVCO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0EsaURBQWlELGdEQUFJO0FBQ3JEO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxpREFBaUQsZ0RBQUk7QUFDckQ7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBLGlEQUFpRCxnREFBSTtBQUNyRDtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0EsaURBQWlELGdEQUFJO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMscUNBQXFDLGdEQUFJO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsNEJBQTRCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFRQTtBQUFBO0FBQUE7QUFBbUM7O0FBRXBCLG1CQUFtQixtREFBTzs7QUFFekM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0EsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvQXBwLmpzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWUuanNcIjtcbi8qaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAnLi9tYWluLmNzcyc7XG5pbXBvcnQgQm9tYmVybWFuIGZyb20gJy4uL2ltYWdlcy9ib21iZXJtYW4ucG5nJztcbmltcG9ydCBEZXN0cnVjdGlibGVXYWxsIGZyb20gJy4uL2ltYWdlcy93YWxsLnBuZyc7XG5pbXBvcnQgQm9tYiBmcm9tICcuLi9pbWFnZXMvYm9tYi5wbmcnO1xuaW1wb3J0IEluZGVzdHJ1Y3RpYmxlV2FsbCBmcm9tICcuLi9pbWFnZXMvZ3JpZF9vcHRpb24yLnBuZyc7XG5pbXBvcnQgRmlyZSBmcm9tICcuLi9pbWFnZXMvZmlyZS5wbmcnOyovXG5cbmV4cG9ydCBjbGFzcyBBc3NldExvYWRlciB7XG4gICAgbG9hZEFzc2V0KG5hbWUsIHVybCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHVybDtcbiAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7IG5hbWUsIGltYWdlOiB0aGlzIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRBc3NldHMoYXNzZXRzVG9Mb2FkKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgICAgIGFzc2V0c1RvTG9hZC5tYXAoYXNzZXQgPT4gdGhpcy5sb2FkQXNzZXQoYXNzZXQubmFtZSwgYXNzZXQudXJsKSlcbiAgICAgICAgKS50aGVuKGFzc2V0cyA9PlxuICAgICAgICAgICAgYXNzZXRzLnJlZHVjZVJpZ2h0KFxuICAgICAgICAgICAgICAgIChhY2MsIGVsZW0pID0+ICh7IC4uLmFjYywgW2VsZW0ubmFtZV06IGVsZW0uaW1hZ2UgfSksXG4gICAgICAgICAgICAgICAge31cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuXG5uZXcgQXNzZXRMb2FkZXIoKVxuICAgIC8qLmxvYWRBc3NldHMoW1xuICAgICAgICB7IG5hbWU6ICdib21iZXJtYW4nLCB1cmw6IEJvbWJlcm1hbiB9LFxuICAgICAgICB7IG5hbWU6ICd3YWxsJywgdXJsOiBEZXN0cnVjdGlibGVXYWxsIH0sXG4gICAgICAgIHsgbmFtZTogJ2JvbWInLCB1cmw6IEJvbWIgfSxcbiAgICAgICAgeyBuYW1lOiAnZ3JpZF9vcHRpb24yJywgdXJsOiBJbmRlc3RydWN0aWJsZVdhbGwgfSxcbiAgICAgICAgeyBuYW1lOiAnZmlyZScsIHVybDogRmlyZSB9LFxuICAgIF0pKi9cbiAgICAubG9hZEFzc2V0cyhbXG4gICAgICAgIHsgbmFtZTogJ2JvbWJlcm1hbicsIHVybDogJy4uL2ltYWdlcy9ib21iZXJtYW4ucG5nJyB9LFxuICAgICAgICB7IG5hbWU6ICd3YWxsJywgdXJsOiAnLi4vaW1hZ2VzL3dhbGwucG5nJyB9LFxuICAgICAgICB7IG5hbWU6ICdib21iJywgdXJsOiAnLi4vaW1hZ2VzL2JvbWIucG5nJyB9LFxuICAgICAgICB7IG5hbWU6ICdncmlkX29wdGlvbjInLCB1cmw6ICcuLi9pbWFnZXMvZ3JpZF9vcHRpb24yLnBuZycgfSxcbiAgICAgICAgeyBuYW1lOiAnZmlyZScsIHVybDogJy4uL2ltYWdlcy9maXJlLnBuZycgfSxcbiAgICBdKVxuICAgIC50aGVuKGFzc2V0cyA9PiB7XG4gICAgICAgIGxldCBwbGF5ZXJzID0gW11cbiAgICAgICAgbmV3IEdhbWUoXCJteUNhbnZhc1wiLCAxMywgMTMsIGFzc2V0cyk7XG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9zZWFyY2g/cT1banNdK1wiICsgZXJyO1xufSlcblxuIiwiaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi9FbGVtZW50LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9tYiBleHRlbmRzIEVsZW1lbnQge1xuXG4gICAgY29uc3RydWN0b3IocG9zaXRpb24sIHRpbWVUb0V4cGxvZGUgPSA1MDAwLCByYWRpdXMsIGFzc2V0cywgZ3JpZFNpemUsIGdhbWUpIHtcbiAgICAgICAgc3VwZXIocG9zaXRpb24sIGFzc2V0cyk7XG5cbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcblxuICAgICAgICAvLyB1bmlxdWUgSUQgZnVuY3Rpb24gZnJvbSBzdGFja292ZXJmbG93XG4gICAgICAgIHRoaXMuSUQgPSAnXycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XG5cbiAgICAgICAgdGhpcy5ncmlkU2l6ZSA9IGdyaWRTaXplO1xuICAgICAgICB0aGlzLmlzRXhwbG9kZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnRpbWVUb0V4cGxvZGUgPSB0aW1lVG9FeHBsb2RlOyAvLyBpbml0IGZvciA1IHNlY29uZHNcbiAgICAgICAgdGhpcy5yYWRpdXMgPSAyO1xuXG4gICAgICAgIHRoaXMuc3ByaXRlU2l6ZSA9IHtcbiAgICAgICAgICAgIGJvbWI6IHtcbiAgICAgICAgICAgICAgICB4OiAyOCxcbiAgICAgICAgICAgICAgICB5OiAyOCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaXJlOiB7XG4gICAgICAgICAgICAgICAgeDogMzgsXG4gICAgICAgICAgICAgICAgeTogMzgsXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gYm9tYiBkZXN0cm95cyBpdHNlbGYgYWZ0ZXIgYmVpbmcgY3JlYXRlZFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUV4cGxvc2lvbigpO1xuICAgICAgICB9LCB0aGlzLnRpbWVUb0V4cGxvZGUpXG4gICAgfVxuXG4gICAgYW5pbWF0ZUV4cGxvc2lvbigpIHtcbiAgICAgICAgdGhpcy5pc0V4cGxvZGVkID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTdXJyb3VuZGluZygpO1xuICAgICAgICB9LCA1MDApO1xuICAgIH1cblxuICAgIGdldFN1cnJvdW5kaW5nUG9zaXRpb25zKCkge1xuICAgICAgICBsZXQgeCA9IHRoaXMucG9zaXRpb24ueDtcbiAgICAgICAgbGV0IHkgPSB0aGlzLnBvc2l0aW9uLnk7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7eDogeCAsICAgICB5OiB5fSxcbiAgICAgICAgICAgIHt4OiB4KzEsICAgIHk6IHl9LFxuICAgICAgICAgICAge3g6IHgsICAgICAgeTogeSsxfSxcbiAgICAgICAgICAgIHt4OiB4KzEsICAgIHk6IHkrMX0sXG4gICAgICAgICAgICB7eDogeC0xLCAgICB5OiB5fSxcbiAgICAgICAgICAgIHt4OiB4LCAgICAgIHk6IHktMX0sXG4gICAgICAgICAgICB7eDogeC0xLCAgICB5OiB5LTF9LFxuICAgICAgICAgICAge3g6IHgtMSwgICAgeTogeSsxfSxcbiAgICAgICAgICAgIHt4OiB4KzEsICAgIHk6IHktMX0sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZGVzdHJveVN1cnJvdW5kaW5nKCkgaXRlcmF0ZXMgdGhyb3VnaCB0aGlzLmdhbWVzLmJvbWJzIGFuZCBkZWxldGVzIHRoaXMgcGFydGljdWxhciBib21iIHdpdGggdGhlIGdpdmVuIElEXG4gICAgICogYWZ0ZXIgZGV0b25hdGlvbiBpdCBzY2FucyBhbGwgc3Vycm91bmRpbmcgcGxheWVycyBhbmQgZGVzdHJ1Y3RpYmxlIHdhbGxzLCB3aGljaCBhcmUgYWZmZWN0ZWRcbiAgICAgKlxuICAgICAqIGxldCBwb3NpdGlvbiBkZXRlcm1pbmVzIHRoZSBzdXJyb3VuZGluZyBwb3NpdGlvbnNcbiAgICAgKi9cbiAgICBkZXN0cm95U3Vycm91bmRpbmcoKSB7XG4gICAgICAgIC8vIGluZGV4IG9mIHRoZSBib21iIHRvIGJlIGRlbGV0ZWRcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nYW1lLmJvbWJzLm1hcChib21iID0+IHtyZXR1cm4gYm9tYi5JRH0pLmluZGV4T2YodGhpcy5JRCk7XG5cbiAgICAgICAgLy8gZGVsZXRlIGJvbWIgYXQgaW5kZXhcbiAgICAgICAgbGV0IHYgPSB0aGlzLmdhbWUuYm9tYnMuc3BsaWNlKGluZGV4LCAxKTtcblxuXG4gICAgICAgIC8vIGRlbGV0ZSBhZmZlY3RlZCBwbGF5ZXJzXG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXJzLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRTdXJyb3VuZGluZ1Bvc2l0aW9ucygpLmZvckVhY2gocG9zaXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5wb3NpdGlvbi54ID09PSBwb3NpdGlvbi54ICYmIHZhbHVlLnBvc2l0aW9uLnkgPT09IHBvc2l0aW9uLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdiA9IHRoaXMuZ2FtZS5wbGF5ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogVGhlIGYqKiogcGxheWVyIGRvZXNuJ3QgZGllISEhXG4gICAgICAgICAgICAgICAgICAgIHYuc2V0RGVhZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRPRE86IG5vdCBhbGwgd2FsbHMgYXJlIGdldHRpbmcgZGVzdHJveWVkIDooIEkgZ3Vlc3MsIGVhY2ggdGltZSBhbiBlbGVtZW50IGlzIGRlbGV0ZWQsIGVsbCB1cGNvbWluZyBpbmRleGVzIGFsc28gY2hhbmdlXG4gICAgICAgIC8vIGRlbGV0ZSBhZmZlY3RlZCB3YWxsc1xuICAgICAgICBsZXQgaW5kZXhlcyA9IFtdO1xuICAgICAgICB0aGlzLmdhbWUud2FsbHMuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdldFN1cnJvdW5kaW5nUG9zaXRpb25zKCkuZm9yRWFjaChwb3NpdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnBvc2l0aW9uLnggPT09IHBvc2l0aW9uLnggJiYgdmFsdWUucG9zaXRpb24ueSA9PT0gcG9zaXRpb24ueSAmJiB2YWx1ZS5pc0Rlc3RydWN0aWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB2ID0gdGhpcy5nYW1lLndhbGxzLnNwbGljZShpbmRleCwgMSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ZXMucHVzaChpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIElNUE9SVEFOVCEgQmVjYXVzZSAuc3BsaWNlKCkgc2hvcnRlbnMgdGhlIGFycmF5LCB3ZSBzYWZlIGFsbCBpbmRleGVzLCB3aGljaCBoYXZlIHRvIGJlIGRlbGV0ZWQgaW5zaWRlIG9mICdsZXQgaW5kZXhlcydcbiAgICAgICAgaW5kZXhlcy5zb3J0KChhLCBiKSA9PiB7cmV0dXJuIGItYX0pLmZvckVhY2goKGluZGV4KSA9PiB7dGhpcy5nYW1lLndhbGxzLnNwbGljZShpbmRleCwgMSl9KTtcbiAgICB9XG5cbiAgICAvLyBkaXNwbGF5IGJvbWIgb3IgZmlyZSBpbWFnZVxuICAgIGRyYXcoY29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFeHBsb2RlZCkge1xuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgdGhpcy5hc3NldHNbJ2JvbWInXSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVTaXplLmJvbWIueCxcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVNpemUuYm9tYi55LFxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCAqIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICogdGhpcy5ncmlkU2l6ZSxcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkcmF3IHN1cnJvdW5kaW5nIGZpcmVcbiAgICAgICAgICAgIHRoaXMuZ2V0U3Vycm91bmRpbmdQb3NpdGlvbnMoKS5mb3JFYWNoKHBvc2l0aW9uID0+IHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3NldHNbJ2ZpcmUnXSxcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVTaXplLmZpcmUueCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVTaXplLmZpcmUueSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24ueCAqIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLnkgKiB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudCB7XG5cbiAgICAvLyBwb3NpdGlvbiBzaG91bGQgaGF2ZSB0aGUgZm9ybWF0OiB7eDogMTIsIHk6IDgyfVxuICAgIC8vIGUuZy4gcmV0dXJuIHRoaXMucG9zaXRpb24ueCB8fCB0aGlzLnBvc2l0aW9uW1wieFwiXVxuICAgIGNvbnN0cnVjdG9yKHBvc2l0aW9uLCBhc3NldHMpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLmFzc2V0cyA9IGFzc2V0cztcbiAgICB9XG5cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG4gICAgfVxuXG5cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyLmpzJztcbmltcG9ydCBXYWxsIGZyb20gJy4vV2FsbC5qcyc7XG5pbXBvcnQgQm9tYiBmcm9tIFwiLi9Cb21iLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuXG4gICAgY29uc3RydWN0b3IoY2FudmFzLCB3aWR0aD0xMywgaGVpZ2h0PTEzLCBhc3NldHMpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXMpO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLmFzc2V0cyA9IGFzc2V0cztcblxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuZnJhbWVDb3VudCA9IDA7XG5cblxuICAgICAgICB0aGlzLmdyaWRTaXplID0gdGhpcy5jYW52YXMud2lkdGggLyB3aWR0aDtcblxuICAgICAgICAvLyBUT0RPOiBpbml0aWFsaXplIGVhY2ggcGxheWVyIGluc2lkZSBjb25zdHJ1Y3RvciBvciBpbnNpZGUgQXBwLmpzP1xuXG5cbiAgICAgICAgLy8gbGV0IGdhbWVPdmVyID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5ib21icyA9IFtdO1xuICAgICAgICB0aGlzLnBsYXllcnMgPSBbXTtcbiAgICAgICAgdGhpcy53YWxscyA9IFtdO1xuXG5cblxuICAgICAgICB0aGlzLnBsYXllcnMucHVzaChuZXcgUGxheWVyKHt4OiAwLCB5OiAwfSwgdGhpcy5hc3NldHMsIDEsIDE0LCA3NywgdGhpcy5ncmlkU2l6ZSwgdGhpcykpO1xuXG5cbiAgICAgICAgdGhpcy5nZW5lcmF0ZVJhbmRvbVdhbGxzKDMwKTtcbiAgICAgICAgdGhpcy5zdGFydEFuaW1hdGluZygpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IHVwZGF0ZSBmdW5jdGlvblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHVwZGF0ZSBwbGF5ZXIgaW4gdGhlIGdhbWUgYm9hcmRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGxheWVycy5mb3JFYWNoKHBsYXllciA9PiB7XG4gICAgICAgICAgICBpZih0aGlzLmZyYW1lQ291bnQgJSBwbGF5ZXIubW92ZVNwZWVkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChwbGF5ZXIuZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlYXN0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWFzdCA9IHt4OiBwbGF5ZXIucG9zaXRpb24ueCArIDEsIHk6IHBsYXllci5wb3NpdGlvbi55fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGxheWVyLmlzUGxheWVyT3V0T2ZCb3VuZHMoZWFzdCkgJiYgIXBsYXllci5kb2VzUGxheWVyVG91Y2hBV2FsbChlYXN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5wb3NpdGlvbiA9IGVhc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2VzdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdlc3QgPSB7eDogcGxheWVyLnBvc2l0aW9uLnggLSAxLCB5OiBwbGF5ZXIucG9zaXRpb24ueX07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBsYXllci5pc1BsYXllck91dE9mQm91bmRzKHdlc3QpICYmICFwbGF5ZXIuZG9lc1BsYXllclRvdWNoQVdhbGwod2VzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIucG9zaXRpb24gPSB3ZXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNvdXRoXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc291dGggPSB7eDogcGxheWVyLnBvc2l0aW9uLngsIHk6IHBsYXllci5wb3NpdGlvbi55ICsgMX07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBsYXllci5pc1BsYXllck91dE9mQm91bmRzKHNvdXRoKSAmJiAhcGxheWVyLmRvZXNQbGF5ZXJUb3VjaEFXYWxsKHNvdXRoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5wb3NpdGlvbiA9IHNvdXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5vcnRoXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9ydGggPSB7eDogcGxheWVyLnBvc2l0aW9uLngsIHk6IHBsYXllci5wb3NpdGlvbi55IC0gMX07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBsYXllci5pc1BsYXllck91dE9mQm91bmRzKG5vcnRoKSAmJiAhcGxheWVyLmRvZXNQbGF5ZXJUb3VjaEFXYWxsKG5vcnRoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5wb3NpdGlvbiA9IG5vcnRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxufVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIG1ldGhvZCB0byBkaXNwbGF5IGFsbCBlbGVtZW50cyBvbiB0aGUgZ2FtZSBib2FyZFxuICAgICAqL1xuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaChwbGF5ZXIgPT4ge1xuICAgICAgICAgICAgcGxheWVyLmRyYXcodGhpcy5jb250ZXh0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy53YWxscy5mb3JFYWNoKHdhbGwgPT4ge1xuICAgICAgICAgICAgd2FsbC5kcmF3KHRoaXMuY29udGV4dCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYm9tYnMuZm9yRWFjaChib21iID0+IHtcbiAgICAgICAgICAgIGJvbWIuZHJhdyh0aGlzLmNvbnRleHQpO1xuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgc3RhcnRBbmltYXRpbmcoKSB7XG4gICAgICAgIHRoaXMuZnJhbWVUaW1lID0gMTAwMCAvIDEwO1xuICAgICAgICB0aGlzLnRoZW4gPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLnRoZW4pO1xuICAgIH1cblxuICAgIGFuaW1hdGUoY3VycmVudFRpbWUpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgY29uc3Qgbm93ID0gY3VycmVudFRpbWU7XG4gICAgICAgIGNvbnN0IGVsYXBzZWQgPSBub3cgLSB0aGlzLnRoZW47XG5cbiAgICAgICAgaWYgKGVsYXBzZWQgPiB0aGlzLmZyYW1lVGltZSkge1xuICAgICAgICAgICAgdGhpcy50aGVuID0gbm93O1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mcmFtZUNvdW50Kys7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2VuZXJhdGUgYSBncmlkIG9mIGluZGVzdHJ1Y3RpYmxlIHdhbGxzIGFuZCBkZXN0cnVjdGlibGUgd2FsbHMgYXQgcmFuZG9tIHBvc2l0aW9uc1xuICAgICAqIEBwYXJhbSBudW1iZXIgLSBtYXggYW1vdW50IG9mIGluZGVzdHJ1Y3RpYmxlIHdhbGxzIHRvIGNyZWF0ZVxuICAgICAqL1xuICAgIGdlbmVyYXRlUmFuZG9tV2FsbHMoYW1vdW50KSB7XG4gICAgICAgIC8vIGNyZWF0ZSBncmlkIG9mIGluZGVzdHJ1Y3RpYmxlIHdhbGxzXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy53aWR0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IHRoaXMuaGVpZ2h0OyBqICs9IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxzLnB1c2gobmV3IFdhbGwoe3g6IGksIHk6IGp9LCAxLCBmYWxzZSwgdGhpcy5hc3NldHMsIHRoaXMuZ3JpZFNpemUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSByYW5kb20gZGVzdHJ1Y3RpYmxlIHdhbGxzXG4gICAgICAgIGxldCByYW5kb20gPSAobGltaXQpID0+IHtyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGltaXQpfTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbW91bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IGF0UmFuZG9tUG9zaXRpb24gPSB7eDogcmFuZG9tKHRoaXMud2lkdGgpLCB5OiByYW5kb20odGhpcy5oZWlnaHQpfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNBbHJlYWR5RXhpc3RpbmcoYXRSYW5kb21Qb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud2FsbHMucHVzaChuZXcgV2FsbChhdFJhbmRvbVBvc2l0aW9uLCAxLCB0cnVlLCB0aGlzLmFzc2V0cywgdGhpcy5ncmlkU2l6ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNBbHJlYWR5RXhpc3RpbmcocG9zaXRpb24pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndhbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocG9zaXRpb24ueCA9PT0gdGhpcy53YWxsc1tpXS5wb3NpdGlvbi54ICYmIHBvc2l0aW9uLnkgPT09IHRoaXMud2FsbHNbaV0ucG9zaXRpb24ueSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG9uJ3QgcmVuZGVyIHdhbGxzIGF0IGVhY2ggY29ybmVyIHdpdGhpbiAzIGJsb2Nrc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAoKHBvc2l0aW9uLnggPT09IGkpICYmIChwb3NpdGlvbi55ID09PSBqKSk6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAoKHBvc2l0aW9uLnggPT09ICh0aGlzLndpZHRoLTEtaSkpICYmIChwb3NpdGlvbi55ID09PSAodGhpcy5oZWlnaHQtMS1qKSkpOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgKChwb3NpdGlvbi54ID09PSBpKSAmJiAocG9zaXRpb24ueSA9PT0gKHRoaXMuaGVpZ2h0LTEtaikpKTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICgocG9zaXRpb24ueCA9PT0gKHRoaXMud2lkdGgtMS1pKSkgJiYgKHBvc2l0aW9uLnkgPT09IGopKTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKmlmICggICAgKCAgIChwb3NpdGlvbi54ID09PSBpKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAgICAgIChwb3NpdGlvbi55ID09PSBqKSAgKSAgICAgIHx8XG4gICAgICAgICAgICAgICAgICAgICggICAoICAgcG9zaXRpb24ueCA9PT0gKHRoaXMud2lkdGggLSAxICAtIGkpICAgICkgICAgICAgICAgJiYgICAgICAocG9zaXRpb24ueSA9PT0gKHRoaXMuaGVpZ2h0IC0gMSAtIGopICkpIHx8XG4gICAgICAgICAgICAgICAgICAgICggICAoICAgcG9zaXRpb24ueCA9PT0gaSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICAgICAgKHBvc2l0aW9uLnkgID09PSAgICAgKHRoaXMuaGVpZ2h0IC0gMSAtIGopICkgICkgfHxcbiAgICAgICAgICAgICAgICAgICAgKCAgICggICBwb3NpdGlvbi54ID09PSAodGhpcy53aWR0aCAtIDEgLSBpKSkgICAgICAgICAgICAgICYmICAgICAgKHBvc2l0aW9uLnkgPT09IGogKSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5pbXBvcnQgRWxlbWVudCBmcm9tICcuL0VsZW1lbnQuanMnO1xuaW1wb3J0IEJvbWIgZnJvbSAnLi9Cb21iLmpzJztcbmltcG9ydCBXYWxsIGZyb20gJy4vV2FsbC5qcyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgRWxlbWVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbiwgYXNzZXRzLCBoZWFsdGgsIG1vdmVTcGVlZCwgYW1vdW50Qm9tYnMsIGFtb3VudFdhbGxzLCBncmlkU2l6ZSwgZ2FtZSkge1xuXG4gICAgICAgIHN1cGVyKHBvc2l0aW9uLCBhc3NldHMpO1xuXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFzc2V0cyByZXF1aXJlZCB0byByZW5kZXIgcGxheWVyIGFuZCBib21ic1xuICAgICAgICAgKiBpbmRpdmlkdWFsIGRpbWVuc2lvbnMgb2Ygb3VyIHNwcml0ZXNcbiAgICAgICAgICogZGlzcGxheSBlYWNoIHNwcml0ZSB3aXRoIGdyaWQgc2l6ZSBtZWFzdXJlbWVudHMgb24gdGhlIGdpdmVuIGNvbnRleHRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYXNzZXRzID0gYXNzZXRzO1xuICAgICAgICB0aGlzLnNwcml0ZVNpemUgPSB7XG4gICAgICAgICAgICB4OiAyNyxcbiAgICAgICAgICAgIHk6IDQwLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhbW91bnQgb2YgbGl2ZSwgYm9tYnMgYW5kIHdhbGxzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhlYWx0aCA9IGhlYWx0aDsgLy8gZG91YmxlXG4gICAgICAgIHRoaXMuYW1vdW50Qm9tYnMgPSBhbW91bnRCb21icztcbiAgICAgICAgdGhpcy5hbW91bnRXYWxscyA9IGFtb3VudFdhbGxzO1xuICAgICAgICAvKipcbiAgICAgICAgICogbW92ZSBzcGVlZCBvZiBhIHBsYXllclxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tb3ZlU3BlZWQgPSAyMDsgLy9kb3VibGVcblxuXG4gICAgICAgIC8vIHRoaXMubWF4aW11bU51bWJlck9mQm9tYnMgPSB0aGlzLm51bWJlck9mQm9tYnMqMjtcbiAgICAgICAgLy8gdGhpcy5wb3dlclVwcyA9IG51bGw7XG4gICAgICAgIC8vIHRoaXMudGltZUxlZnRUb0J1aWxkV2FsbCA9IDE1OyAvLyBtb3ZlIHRoaXMgbG9naWMgaW5zaWRlIHNldEJvbWIoKSA/Pz9cbiAgICAgICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Vhc3QnO1xuXG4gICAgICAgIHRoaXMuc3ByaXRlU2hlZXQgPSB7XG4gICAgICAgICAgICBzb3V0aDoge1xuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdlc3Q6IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuc3ByaXRlU2l6ZS55XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9ydGg6IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDIgKiB0aGlzLnNwcml0ZVNpemUueVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVhc3Q6IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDMgKiB0aGlzLnNwcml0ZVNpemUueVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMudHJpZ2dlckV2ZW50LmJpbmQodGhpcykpO1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW1vdW50Qm9tYnNcIikuaW5uZXJIVE1MID0gdGhpcy5hbW91bnRCb21icztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbW91bnRXYWxsc1wiKS5pbm5lckhUTUwgPSB0aGlzLmFtb3VudFdhbGxzO1xuXG4gICAgfVxuXG4gICAgaXNEZWFkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWFkO1xuICAgIH1cblxuICAgIHNldERlYWQoKSB7XG4gICAgICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgfVxuXG5cblxuICAgIHRyaWdnZXJFdmVudChlKSB7XG4gICAgICAgIGlmICghdGhpcy5kZWFkKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGUua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSAnd2VzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICd3ZXN0JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdlYXN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Vhc3QnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ25vcnRoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ25vcnRoJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ3NvdXRoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3NvdXRoJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgXCJiXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Qm9tYigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgXCIgXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRXYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIHJlbmRlcnMgdGhlIGF2YXRhclxuICAgICAqIG5vdGUsIHRoYXQgd2UgYWRkZWQgNnB4IHRvIG91ciB4IGF4aXMgdG8gY2VudGVyIHRoZSBpbWFnZVxuICAgICAqIGRyYXcoKSB3aWxsIGFsc28gcmVuZGVyIG91ciBzZXQgb2YgYm9tYnNcbiAgICAgKi9cbiAgICBkcmF3KGNvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXRzWydib21iZXJtYW4nXSxcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVNoZWV0W3RoaXMuZGlyZWN0aW9uXS54LFxuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlU2hlZXRbdGhpcy5kaXJlY3Rpb25dLnksXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVTaXplLngsXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVTaXplLnksXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi54ICogdGhpcy5ncmlkU2l6ZSArIDYsXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICogdGhpcy5ncmlkU2l6ZSxcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVNpemUueCxcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVNpemUueSxcbiAgICAgICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGFuZ2UgdGhlIGRpcmVjdGlvbiBvZiBvdXIgYXZhdGFyXG4gICAgICogYW5kIG1vdmUgaXQgb25lIGdyaWQgc2l6ZSBvbiB0aGUgeCBvciB5IGF4aXNcbiAgICAgKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmKHRoaXMuZ2FtZS5mcmFtZUNvdW50ICUgdGhpcy5tb3ZlU3BlZWQgPT09IDApIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZWFzdFwiOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZWFzdCA9IHt4OiB0aGlzLnBvc2l0aW9uLnggKyAxLCB5OiB0aGlzLnBvc2l0aW9uLnl9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQbGF5ZXJPdXRPZkJvdW5kcyhlYXN0KSAmJiAhdGhpcy5kb2VzUGxheWVyVG91Y2hBV2FsbChlYXN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IGVhc3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFwid2VzdFwiOlxuICAgICAgICAgICAgICAgICAgICBsZXQgd2VzdCA9IHt4OiB0aGlzLnBvc2l0aW9uLnggLSAxLCB5OiB0aGlzLnBvc2l0aW9uLnl9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQbGF5ZXJPdXRPZkJvdW5kcyh3ZXN0KSAmJiAhdGhpcy5kb2VzUGxheWVyVG91Y2hBV2FsbCh3ZXN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHdlc3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFwic291dGhcIjpcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNvdXRoID0ge3g6IHRoaXMucG9zaXRpb24ueCwgeTogdGhpcy5wb3NpdGlvbi55ICsgMX07XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BsYXllck91dE9mQm91bmRzKHNvdXRoKSAmJiAhdGhpcy5kb2VzUGxheWVyVG91Y2hBV2FsbChzb3V0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBzb3V0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgXCJub3J0aFwiOlxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9ydGggPSB7eDogdGhpcy5wb3NpdGlvbi54LCB5OiB0aGlzLnBvc2l0aW9uLnkgLSAxfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzUGxheWVyT3V0T2ZCb3VuZHMobm9ydGgpICYmICF0aGlzLmRvZXNQbGF5ZXJUb3VjaEFXYWxsKG5vcnRoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IG5vcnRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVpbGRXYWxsKCkge1xuICAgICAgICBpZiAodGhpcy5hbW91bnRXYWxscyA+IDApIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZWFzdFwiOlxuICAgICAgICAgICAgICAgICAgICBsZXQgZWFzdCA9IHt4OiB0aGlzLnBvc2l0aW9uLnggKyAxLCB5OiB0aGlzLnBvc2l0aW9uLnl9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQbGF5ZXJPdXRPZkJvdW5kcyhlYXN0KSAmJiAhdGhpcy5kb2VzUGxheWVyVG91Y2hBV2FsbChlYXN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLndhbGxzLnB1c2gobmV3IFdhbGwoZWFzdCwgMSwgdHJ1ZSwgdGhpcy5hc3NldHMsIHRoaXMuZ3JpZFNpemUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgXCJ3ZXN0XCI6XG4gICAgICAgICAgICAgICAgICAgIGxldCB3ZXN0ID0ge3g6IHRoaXMucG9zaXRpb24ueCAtIDEsIHk6IHRoaXMucG9zaXRpb24ueX07XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BsYXllck91dE9mQm91bmRzKHdlc3QpICYmICF0aGlzLmRvZXNQbGF5ZXJUb3VjaEFXYWxsKHdlc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUud2FsbHMucHVzaChuZXcgV2FsbCh3ZXN0LCAxLCB0cnVlLCB0aGlzLmFzc2V0cywgdGhpcy5ncmlkU2l6ZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBcInNvdXRoXCI6XG4gICAgICAgICAgICAgICAgICAgIGxldCBzb3V0aCA9IHt4OiB0aGlzLnBvc2l0aW9uLngsIHk6IHRoaXMucG9zaXRpb24ueSArIDF9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQbGF5ZXJPdXRPZkJvdW5kcyhzb3V0aCkgJiYgIXRoaXMuZG9lc1BsYXllclRvdWNoQVdhbGwoc291dGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUud2FsbHMucHVzaChuZXcgV2FsbChzb3V0aCwgMSwgdHJ1ZSwgdGhpcy5hc3NldHMsIHRoaXMuZ3JpZFNpemUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgXCJub3J0aFwiOlxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9ydGggPSB7eDogdGhpcy5wb3NpdGlvbi54LCB5OiB0aGlzLnBvc2l0aW9uLnkgLSAxfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzUGxheWVyT3V0T2ZCb3VuZHMobm9ydGgpICYmICF0aGlzLmRvZXNQbGF5ZXJUb3VjaEFXYWxsKG5vcnRoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLndhbGxzLnB1c2gobmV3IFdhbGwobm9ydGgsIDEsIHRydWUsIHRoaXMuYXNzZXRzLCB0aGlzLmdyaWRTaXplKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFtb3VudFdhbGxzLS07XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFtb3VudFdhbGxzXCIpLmlubmVySFRNTCA9IHRoaXMuYW1vdW50V2FsbHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRCb21iKCkge1xuICAgICAgICBpZiAodGhpcy5hbW91bnRCb21icyA+IDApIHtcbiAgICAgICAgICAgIGxldCB0ZW1wUG9zaXRpb24gPSB7eDogdGhpcy5wb3NpdGlvbi54LCB5OiB0aGlzLnBvc2l0aW9uLnl9O1xuICAgICAgICAgICAgdGhpcy5nYW1lLmJvbWJzLnB1c2gobmV3IEJvbWIodGVtcFBvc2l0aW9uLCAxNTAwLCAxLCB0aGlzLmFzc2V0cywgdGhpcy5ncmlkU2l6ZSwgdGhpcy5nYW1lKSk7XG4gICAgICAgICAgICB0aGlzLmFtb3VudEJvbWJzLS07XG5cbiAgICAgICAgICAgIC8vIEhUTUwgbWFuaXB1bGF0aW9uXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFtb3VudEJvbWJzXCIpLmlubmVySFRNTCA9IHRoaXMuYW1vdW50Qm9tYnM7XG4gICAgICAgICAgICAvLyBUT0RPOiBGaW5kIGEgd2F5IHRvIGV4cGxvZGUgZXZlcnkgYm9tYiBhdCBpdHMgdGltZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZG9lc1BsYXllclRvdWNoQVdhbGwocG9zaXRpb24pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWUud2FsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUud2FsbHNbaV0ucG9zaXRpb24ueCA9PT0gcG9zaXRpb24ueCAmJiB0aGlzLmdhbWUud2FsbHNbaV0ucG9zaXRpb24ueSA9PT0gcG9zaXRpb24ueSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc1BsYXllck91dE9mQm91bmRzKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiBwb3NpdGlvbi54ID4gdGhpcy5nYW1lLndpZHRoIC0gMSB8fCBwb3NpdGlvbi55ID4gdGhpcy5nYW1lLmhlaWdodCAtIDEgfHwgcG9zaXRpb24ueCA8IDAgfHwgcG9zaXRpb24ueSA8IDA7XG4gICAgfVxuXG5cblxuXG4gICAgLy8gUmVkdWNlcyB0aGUgTGlmZSBMZWZ0IG9mIHRoZSBjdXJyZW50IFBsYXllclxuICAgIGdldERhbWFnZShkYW1hZ2UpIHtcbiAgICAgICAgLy8gZGFtYWdlIG11c3QgYWx3YXlzIGJlIGEgbmVnYXRpdmUgZG91YmxlXG4gICAgICAgIGlmIChkYW1hZ2UgPCAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEYW1hZ2UgbXVzdCBiZSBhIG5lZ2F0aXZlIGRvdWJsZSBudW1iZXIhXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGVhbHRoIC09IGRhbWFnZTtcbiAgICAgICAgLy8gUGxheWVyIGlzIGRlYWRcbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi9FbGVtZW50LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbCBleHRlbmRzIEVsZW1lbnQge1xuXG4gICAgY29uc3RydWN0b3IocG9zaXRpb24sIHN0cmVuZ3RoLCBpc0Rlc3RydWN0aWJsZSwgYXNzZXRzLCBncmlkU2l6ZSkge1xuICAgICAgICBzdXBlcihwb3NpdGlvbiwgYXNzZXRzKTtcblxuICAgICAgICB0aGlzLmlzRGVzdHJ1Y3RpYmxlID0gaXNEZXN0cnVjdGlibGU7XG4gICAgICAgIC8vIHRoaXMuc3RyZW5ndGggPSBzdHJlbmd0aDtcblxuICAgICAgICB0aGlzLnNwcml0ZVNpemUgPSB7XG4gICAgICAgICAgICBkZXN0cnVjdGlibGU6IHtcbiAgICAgICAgICAgICAgICB4OiAzMixcbiAgICAgICAgICAgICAgICB5OiAzMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmRlc3RydWN0aWJsZToge1xuICAgICAgICAgICAgICAgIHg6IDE1LFxuICAgICAgICAgICAgICAgIHk6IDE2LFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZ3JpZFNpemUgPSBncmlkU2l6ZTtcbiAgICB9XG5cblxuXG4gICAgZHJhdyhjb250ZXh0KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGVzdHJ1Y3RpYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2V0c1snd2FsbCddLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZVNpemUuZGVzdHJ1Y3RpYmxlLngsXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVTaXplLmRlc3RydWN0aWJsZS55LFxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCAqIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICogdGhpcy5ncmlkU2l6ZSxcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2V0c1snZ3JpZF9vcHRpb24yJ10sXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlU2l6ZS5pbmRlc3RydWN0aWJsZS54LFxuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlU2l6ZS5pbmRlc3RydWN0aWJsZS55LFxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb24ueCAqIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbi55ICogdGhpcy5ncmlkU2l6ZSxcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRTaXplLFxuICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFNpemUsXG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgIH1cblxuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==