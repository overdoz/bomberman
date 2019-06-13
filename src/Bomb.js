import Element from './Element.js';

export default class Bomb extends Element {

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
                console.log(this.game.walls);
                if (value.position.x === position.x && value.position.y === position.y) {
                    v = this.game.players.splice(index, 1);
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

