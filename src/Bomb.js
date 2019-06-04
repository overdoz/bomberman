import Element from './Element.js';

export default class Bomb extends Element {


    constructor(x, y, timeToExplode = 5, radius, isFake, assets) {
        super();
        this.assets = assets;
        this.x = x;
        this.y = y;
        this.timeToExplode = timeToExplode; // init for 5 seconds
        this.radius = 2;        // init for 2 grid wide
        this.isFake = isFake;
        this.spriteSize = 28;
    }
    //will be called when the bomb is bombing
    //width & height: center position of the fire

    fire(width, height,timeToExplode){

    }

    draw(context) {
        context.drawImage(
            this.assets.bomb,
            0,
            0,
            this.spriteSize,
            this.spriteSize,
            this.x,
            this.y,
            40,
            40,
        )

    }

}

