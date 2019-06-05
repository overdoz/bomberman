import Wall from "./Wall.js";

export default class Grid {

    constructor(width, height, numberOfWalls, wallAssets) {
        this.width = width;
        this.height = height;
        this.walls = [];
        this.players = [];
        this.newWalls = [];
        this.wallAssets = wallAssets;
        this.generateRandomWalls(numberOfWalls);
    }

    // Draw the Grid
    draw() {
    }

    /**
     * At the start of the game, it generates walls at random
     * positions all over the grid
     * @param number
     */
    generateRandomWalls(number) {
        for (let i = 0; i < number; i++) {
            let wall_x = this.random(this.width) * 40;
            let wall_y = this.random(this.height) * 40;
            if (this.findDuplicates(wall_x, wall_y)) {
                i--;
            } else {
                this.walls.push(new Wall({x:wall_x, y: wall_y}, 1, true, this.wallAssets));
            }
        }
    }

    getWall(index) {
        // TODO: Index out of bounds Error
        return this.walls[index];
    }

    addWall(wall_x,wall_y) {
        if (!this.findPlayerWallConflict(wall_x, wall_y)) {
            this.newWalls.push(new Wall({x:wall_x, y: wall_y}, 1, true, this.wallAssets));
        }
    }

    /**
     * Checks if there is a conflict at the players next step -
     * Checks if there is a wall or out of canvas
     * @param player_x
     * @param player_y
     * @returns {boolean}
     */
    findPlayerWallConflict(player_x, player_y) {
        if (player_x + 1 >= this.width*40 || player_y + 1 >= this.height*40) {
            return true;
        } else if (player_x + 1 < 0 || player_y + 1 < 0) {
            return true;
        }
        for (let i = 0; i < this.walls.length; i++) {
            if (this.walls[i].getPositionX() === player_x) {
                if (this.walls[i].getPositionY() === player_y) {
                    // there is conflict = true
                    return true;
                }
            }
        }
        // There is no conflict with the already generated walls
        // now search to find if there is a conflict with the Walls
        // that the players created
        return this.findPlayerNewWallConflict(player_x, player_y);
    }

    /**
     * Searches to find if the player has conflict with one of the walls
     * that the player builded
     * @param player_x
     * @param player_y
     * @returns {boolean}
     */
    findPlayerNewWallConflict(player_x, player_y) {
        for (let i = 0; i < this.newWalls.length; i++) {
            if (this.newWalls[i].getPositionX() === player_x) {
                if (this.newWalls[i].getPositionY() === player_y) {
                    // there is conflict = true
                    return true;
                }
            }
        }
        return false;
    }

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
            let distance = this.distance(x,y,this.walls[i].getPositionX(), this.walls[i].getPositionY());
            if (distance < 60) {
                console.log("Destroyed distance: " +  distance);
                this.walls[i].destroy();
                this.walls.splice(i,1);
            }
        }

        for (let i = 0; i < this.newWalls.length; i++) {
            // let distance = Math.floor(Math.sqrt(Math.pow(this.walls[i].getPositionX() - x, 2) + Math.pow(this.walls[i].getPositionY() - y, 2)));
            let distance = this.distance(x,y,this.newWalls[i].getPositionX(), this.newWalls[i].getPositionY());
            if (distance < 60) {
                console.log("Destroyed distance: " +  distance);
                this.newWalls[i].destroy();
                this.newWalls.splice(i,1);
            }
        }

        // TODO: FIX that the player doesn't dies if inbetween there are walls !!!
        for (let i = 0; i < this.players.length; i++) {
            let distance = this.distance(x,y,this.players[i].getPositionX(), this.players[i].getPositionY());
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
     * @param x
     * @param y
     * @returns {boolean}
     */
    findDuplicates(x,y) {
        for (let i = 0; i < this.walls.length; i++) {
            if (x === this.walls[i].getPositionX() && (y === this.walls[i].getPositionY())) {
                return true;
            }
        }
        return false;
    }

    // Temporary
    setPlayers(players) {
        this.players = players;
    }
}