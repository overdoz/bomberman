import Element from './Element.js';



export default class Bomb extends Element {


    constructor(position, timeToExplode = 5, radius, assets, gridSize, game) {
        super(position, assets);

        this.game = game;
        this.ID = '_' + Math.random().toString(36).substr(2, 9);
        this.gridSize = gridSize;
        this.isExploded = false;

        this.timeToExplode = timeToExplode; // init for 5 seconds
        this.radius = 2;        // init for 2 grid wide

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


        setTimeout(() => {
            this.animateExplosion();
        }, 1000)
    }

    animateExplosion() {
        this.isExploded = true;
        setTimeout(() => {
            this.deleteBomb();
        }, 500);
    }

    deleteBomb() {
        let index = this.game.bombs.map(bomb => {
            return bomb.ID
        }).indexOf(this.ID);

        // delete bomb at index
        let v = this.game.bombs.splice(index, 1);

        let x = this.position.x;
        let y = this.position.y;

        let positions = [
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


        // delete affected players
        this.game.players.forEach((value, index) => {
            positions.forEach(position => {
                if (value.position.x === position.x && value.position.y === position.y) {
                    v = this.game.players.splice(index, 1);
                }
            })
        });

        // delete affected walls
        this.game.walls.forEach((value, index) => {
            positions.forEach(position => {
                if (value.position.x === position.x && value.position.y === position.y && value.destroyable === true) {
                    v = this.game.walls.splice(index, 1);
                }
            })
        });


    }




    draw(context) {
        if (!this.isExploded) {
            context.drawImage(
                this.assets.bomb,
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
            context.drawImage(
                this.assets.fire,
                0,
                0,
                this.spriteSize.fire.x,
                this.spriteSize.fire.y,
                this.position.x * this.gridSize,
                this.position.y * this.gridSize,
                this.gridSize,
                this.gridSize,
            )
        }
    }

}

