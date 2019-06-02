class Element {

    constructor(positionX, positionY, assets) {
        this.position = [];
        this.position[0] = positionX;
        this.position[1] = positionY;
    }

    getX() {
        return this.position[0];
    }

    getY() {
        return this.position[1];
    }

    setX(x) {
        this.position[0] = x;
    }

    setY(y) {
        this.position[1] = y;
    }

}

module.exports = Element;