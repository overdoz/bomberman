import Element from './Element.js';

export default class Wall extends Element {

    constructor(position, strength = 1, destroyable = true, assets, gridSize) {
        super(position, assets);

        this.destroyable = destroyable;
        this.strength = strength;

        this.spriteSize = {
            destroyable: {
                x: 32,
                y: 32,
            },
            notDestroyable: {
                x: 15,
                y: 16,
            }
        };

        this.gridSize = gridSize;
    }


    destroy() {
        if (this.destroyable) {
            this.active = false;
        }
    }

    draw(context) {
        if (this.destroyable === true) {
            context.drawImage(
                this.assets.wall,
                0,
                0,
                this.spriteSize.destroyable.x,
                this.spriteSize.destroyable.y,
                this.position.x * this.gridSize,
                this.position.y * this.gridSize,
                this.gridSize,
                this.gridSize,
            )
        } else {
            context.drawImage(
                this.assets.grid_option2,
                0,
                0,
                this.spriteSize.notDestroyable.x,
                this.spriteSize.notDestroyable.y,
                this.position.x * this.gridSize,
                this.position.y * this.gridSize,
                this.gridSize,
                this.gridSize,
            )
        }

    }


    getDamage(damage) {

    }

}