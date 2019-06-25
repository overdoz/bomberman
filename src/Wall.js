import Element from './Element.js';

export default class Wall extends Element {

    constructor(position, strength, isDestructible, assets, gridSize, id) {
        super(position, assets);

        this.id = id;
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