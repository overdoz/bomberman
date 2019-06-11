import Wall from "./Wall.js";

export default class Grid {

    constructor(width, height, numberOfWalls, assets, game) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.walls = [];
        this.players = [];
        this.newWalls = [];
        this.assets = assets;
        this.tileSize = 40;
        // this.generateRandomWalls(numberOfWalls);
    }

    // Draw the Grid
    draw() {
    }

    /**
     * At the start of the game, it generates walls at random
     * positions all over the grid
     * @param number
     */
   /* generateRandomWalls(number) {
        for (let i = 0; i < number; i++) {
            let randomCoordinate = {x: this.random(this.width) * this.tileSize, y: this.random(this.height) * this.tileSize};

            if (this.findDuplicates(randomCoordinate)) {
                i--;
            } else {
                this.walls.push(new Wall(randomCoordinate, 1, true, this.assets));
            }
        }
    }*/

    getWall(index) {
        // TODO: Index out of bounds Error
        return this.walls[index];
    }

    addWall(position) {
        if (!this.doesPlayerTouchAWall(position)) {
            this.walls.push(new Wall( {x: position.x, y: position.y}, 1, false, this.wallAssets));
        }
    }

    /**
     * Checks if there is a conflict at the players next step -
     * Checks if there is a wall or out of canvas
     * @param position
     * @returns {boolean}
     */

    /*isPlayerOutOfBounds(position) {
        if (position.x + 1 >= this.width * this.tileSize || position.y + 1 >= this.height * this.tileSize) {
            return true;
        } else if (position.x + 1 < 0 || position.y + 1 < 0) {
            return true;
        } else {
            return false;
        }
    }*/

    /*doesPlayerTouchAWall(position) {
        for (let i = 0; i < this.walls.length; i++) {
            if (this.walls[i].position.x === position.x) {
                if (this.walls[i].position.y === position.y) {
                    // there is conflict = true
                    return true;
                }
            }
        }
        return false;
    }*/


    /*findPlayerWallConflict(position) {
        if (position.x + 1 >= this.width * this.tileSize || position.y + 1 >= this.height * this.tileSize) {
            return true;
        } else if (position.x + 1 < 0 || position.y + 1 < 0) {
            return true;
        }
        for (let i = 0; i < this.walls.length; i++) {
            if (this.walls[i].position.x === position.x) {
                if (this.walls[i].position.y === position.y) {
                    // there is conflict = true
                    return true;
                }
            }
        }
        // There is no conflict with the already generated walls
        // now search to find if there is a conflict with the Walls
        // that the players created
        return this.findPlayerNewWallConflict(position);
    }*/

    /**
     * Searches to find if the player has conflict with one of the walls
     * that the player builded
     * @param player_x
     * @param player_y
     * @returns {boolean}
     */
/*    findPlayerNewWallConflict(position) {
        for (let i = 0; i < this.newWalls.length; i++) {
            if (this.newWalls[i].position.x === position.x) {
                if (this.newWalls[i].position.y === position.y) {
                    // there is conflict = true
                    return true;
                }
            }
        }
        return false;
    }*/

    /**
     * return a random integer between 0 and "limit"
     * @param limit
     * @returns {number}
     */
    random(limit) {
        return Math.floor(Math.random() * limit);
    }

    /**
     * Checks the damage that a bomb does -- if
     * there are any destructable walls within the distance
     * of 60 (cm - mm ?) then it destroyes those Walls
     * @param x
     * @param y
     */
    getDamage(x,y) {
        for (let i = 0; i < this.walls.length; i++) {
            // let distance = Math.floor(Math.sqrt(Math.pow(this.walls[i].getPositionX() - x, 2) + Math.pow(this.walls[i].getPositionY() - y, 2)));
            let distance = this.distance(x,y,this.walls[i].position.x, this.walls[i].position.y);
            if (distance < 60 && this.walls[i].destroyable === true) {
                console.log("Destroyed distance: " +  distance);
                this.walls[i].destroy();
                this.walls.splice(i,1);
            }
        }



        // TODO: FIX that the player doesn't dies if inbetween there are walls !!!
        for (let i = 0; i < this.players.length; i++) {
            let distance = this.distance(x,y,this.players[i].position.x, this.players[i].position.y);
            // console.log(x,y,this.players[i].getPositionX(), this.players[i].getPositionY());
            if (distance < 60) {
                this.players[i].setDead();
            }
        }
    }

    distance(x,y,a,b) {
        return Math.floor(Math.sqrt(Math.pow(a - x, 2) + Math.pow(b - y, 2)));
    }

    /**
     * To make sure that there aren't together 2 Walls at the same position
     * @returns {boolean}
     * @param position
     */
    /*findDuplicates(position) {
        for (let i = 0; i < this.walls.length; i++) {
            if (position.x === this.walls[i].position.x && (position.y === this.walls[i].position.y)) {
                return true;
            }
        }
        return false;
    }*/

    // Temporary
    setPlayers(players) {
        this.players = players;
    }
}