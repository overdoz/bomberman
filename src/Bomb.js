const Element = require('./Element.js');

class Bomb extends Element {

    constructor(width, height, timeToExplode) {
        super();
        this.width = width;
        this.height = height;
    }

}
module.exports = Bomb;
