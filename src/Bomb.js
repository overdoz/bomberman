const Element = require('./Element.js');

class Bomb extends Element {


    constructor(width, height, timeToExplode, radius, isFake) {
        super();
        this.width = width;
        this.height = height;
        this.timeToExplode = 5; // init for 5 seconds
        this.radius = 2;        // init for 2 grid wide
        this.isFake = isFake;
    }
    //will be called when the bomb is bombing
    //width & height: center position of the fire
    fire(width, height,timeToExplode){

    }

}
module.exports = Bomb;
