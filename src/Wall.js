
export default class Wall extends Element {

    constructor(position, assets, strength = 1, destroyable = true) {
        super(position, assets);
        this.active = true;
        this.destroyable = destroyable;
        this.strength = strength;
    }

    destroy() {
        if (this.destroyable = true) {
            this.active = false;
        }
    }
}