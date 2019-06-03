
const Bomb = require('./Bomb.js');

class Grid {

    constructor(width, height, numberOfWalls) {
        this.width = width;
        this.height = height;
        this.numberOfWalls = numberOfWalls;
        // TODO: create Walls in Random Positions on the Grid
        this.bomb = new Bomb(1,1,1);
    }

    // Draw the Grid
    draw() {
    }



}

module.exports = Grid;
