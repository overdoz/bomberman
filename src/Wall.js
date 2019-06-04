import Element from './Element.js';

export default class Wall extends Element {

    constructor(position, strength = 1, destroyable = true, assets) {
        super();
        this.assets = assets;
        this.active = true;
        this.destroyable = destroyable;
        this.strength = strength;

        this.spriteSizeX = 32;
        this.spriteSizeY = 32;
        this.x = position.x;
        this.y = position.y;
    }

    getPositionX() {
        return this.x;
    }

    getPositionY() {
        return this.y;
    }

    destroy() {
        if (this.destroyable) {
            this.active = false;
        }
    }

    draw(context) {
        context.drawImage(
            this.assets.wall,
            0,
            0,
            this.spriteSizeX,
            this.spriteSizeY,
            this.x,
            this.y,
            40,
            40,
        )

    }

    getDamage(damage) {

    }

}