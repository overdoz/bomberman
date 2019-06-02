class Element {

    // position should have the format: {x: 12, y: 82}
    // e.g. return this.position.x || this.position["x"]
    constructor(position, assets) {
        this.position = position;
    }

    getPosition() {
        return this.position;
    }


}

module.exports = Element;