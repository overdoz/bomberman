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

        console.log(this.ID)
        let x = this.game.bombs.splice(index, 1);

        console.log(x)
        let positions = [
            {x: this.position.x ,       y: this.position.y},
            {x: this.position.x + 1,    y: this.position.y},
            {x: this.position.x,        y: this.position.y + 1},
            {x: this.position.x + 1,    y: this.position.y + 1},
            {x: this.position.x - 1,    y: this.position.y},
            {x: this.position.x,        y: this.position.y - 1},
            {x: this.position.x - 1,    y: this.position.y - 1},
            {x: this.position.x - 1,    y: this.position.y + 1},
            {x: this.position.x + 1,    y: this.position.y - 1},
            ];

        for (let i = 0; i < this.game.players; i++) {
            console.log(this.game.players[i])
            for (let j = 0; j < positions.length; j++) {
                console.log(positions[j])
                if (this.game.players[i].x === positions[j].x && this.game.players[i].y === positions[j].y) {
                    console.log("delete player");
                    x = this.game.players.splice(i, 1);
                }
            }
        }

        for (let i = 0; i < this.game.walls; i++) {
            for (let j = 0; j < positions.length; j++) {
                if (this.game.walls[i].x === positions[j].x && this.game.walls[i].y === positions[j].y && (this.game.walls[i].destroyable === true)) {
                    console.log("delete wall");
                    x = this.game.walls.splice(i, 1);
                }
            }
        }
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

