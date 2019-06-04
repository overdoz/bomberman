import Bomb from './Bomb.js'

export default class Queue {

    constructor() {
        this.arr = [];
        this.length = 0;
        this.index = 0;
    }

    add(bomb) {
        this.arr.push(bomb);
    }

    pop() {
        if (this.arr.length > 0) {
            let result = {x:this.arr[0].x, y: this.arr[0].y};
            this.arr.splice(0);
            return result;
        }
    }

    map = function(context) {
        for (let i = 0; i < this.arr.length; i++) {
            this.arr[i].draw(context);
        }
    }

}