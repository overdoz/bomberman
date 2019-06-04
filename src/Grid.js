import Wall from "./Wall.js";

export default class Grid {

    constructor(width, height, numberOfWalls, wallAssets) {
        this.width = width;
        this.height = height;
        this.walls = [];
        this.wallAssets = wallAssets;
        this.generateRandomWalls(numberOfWalls);
    }

    // Draw the Grid
    draw() {
    }

    generateRandomWalls(number) {
        for (let i = 0; i < number; i++) {
            let wall_x = this.random(this.width) * 40;
            let wall_y = this.random(this.height) * 40;
            this.walls.push(new Wall({x:wall_x, y: wall_y}, 1, true, this.wallAssets));
        }
    }

    getWall(index) {
        // TODO: Index out of bounds Error
        return this.walls[index];
    }

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
        // There is no conflict
        return false;
    }

    random(limit) {
        return Math.floor(Math.random() * limit);
    }

    getDamage(x,y) {
        console.log("getDamage one time");
        console.log(this.walls.length);
        for (let i = 0; i < this.walls.length; i++) {
            let distance = Math.floor(Math.sqrt(Math.pow(this.walls[i].getPositionX() - x, 2) + Math.pow(this.walls[i].getPositionY() - y, 2)));
            if (distance < 60) {
                console.log("Destroyed distance: " +  distance);
                this.walls[i].destroy();
                this.walls.splice(i,1);
            }
        }
        console.log(this.walls.length);
    }



}