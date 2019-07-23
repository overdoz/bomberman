import Element from './Element.js';

export default class Wall extends Element {

    constructor(position, strength, isDestructible, assets, gridSize, id) {
        super(position, assets);

        this.id = id;
        this.isDestructible = isDestructible;
        // this.strength = strength;

        this.spriteSize = {
            x: 40,
            y: 40,
        };

        this.gridSize = gridSize;
    }



    draw(context) {
        if (this.isDestructible === true) {
            context.drawImage(
                this.assets['wall'],
                0,
                0,
                this.spriteSize.x,
                this.spriteSize.y,
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
                this.spriteSize.x,
                this.spriteSize.y,
                this.position.x * this.gridSize,
                this.position.y * this.gridSize,
                this.gridSize,
                this.gridSize,
            )
        }

    }


}