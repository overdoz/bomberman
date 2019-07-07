import Element from './Element.js';

export default class Spoil extends Element {


    constructor(position, type, assets, gridSize, game) {
        super(position, assets);

        this.game = game;
        this.type = type;  

        // unique ID function from stackoverflow
        this.ID = '_' + Math.random().toString(36).substr(2, 9);

        this.gridSize = gridSize;

        this.spriteSize = {
            spoil: {
                x: 28,
                y: 28,
            }
        };


        this.currentAnimationState = 0;

        this.animationSpeed = 20;

        this.animationSheet = [
            {x: 0, y: 0},
            {x: 28, y: 0},
            {x: 2 * 28, y: 0},
            {x: 3 * 28, y: 0},
            {x: 4 * 28, y: 0},

        ];

    }

    // display bomb or fire image
    draw(context) {
        context.drawImage(
            this.assets[this.type],
            this.animationSheet[this.currentAnimationState].x,
            0,
            this.spriteSize.spoil.x,
            this.spriteSize.spoil.y,
            this.position.x * this.gridSize,
            this.position.y * this.gridSize,
            this.gridSize,
            this.gridSize,
        )


    }


}

