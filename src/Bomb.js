import Element from './Element.js';
import Spoil from './Spoil.js';

import {
    SPOIL_TYPE_BOMB,
    SPOIL_TYPE_LIFE,
    SPOIL_TYPE_RUN
} from "./constant.js";

export default class Bomb extends Element {

    constructor(position, timeToExplode = 5000, radius, assets, gridSize, game, remote=false) {
        super(position, assets);

        this.game = game;
        this.remoteBomb = remote;

        // unique ID function from stackoverflow
        this.ID = '_' + Math.random().toString(36).substr(2, 9);

        this.gridSize = gridSize;
        this.isExploded = false;

        this.timeToExplode = timeToExplode;
        this.radius = radius;

        this.spriteSize = {
            bomb: {
                x: 28,
                y: 28,
            },
            fire: {
                x: 38,
                y: 38,
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

        // bomb destroys itself after being created
        setTimeout(() => {
            this.animateExplosion();
        }, this.timeToExplode)
    }

    animateExplosion() {
        this.isExploded = true;
        setTimeout(() => {
            this.destroySurrounding();
        }, 500);
    }

    /**
     * calculate all positions within this.radius
     *
     * @returns {Array} with position objects
     */
    getSurroundingPositions() {
        let positions = [];
        for (let i = -this.radius; i <= this.radius; i++) {
            for (let j = -this.radius; j <= this.radius; j++) {
                positions.push({x: this.position.x + i ,     y: this.position.y + j});
            }
        }
        return positions;
    }

    /**
     * destroySurrounding() iterates through this.games.bombs and deletes this particular bomb with the given ID
     * after detonation it scans all surrounding players and destructible walls, which are affected
     *
     * let position determines the surrounding positions
     */
    destroySurrounding() {
        // index of the bomb to be deleted
        let index = this.game.bombs.map(bomb => {return bomb.ID}).indexOf(this.ID);

        // delete bomb at index
        this.game.bombs.splice(index, 1);


        // delete affected players
        this.game.players.forEach((player, index) => {
            this.getSurroundingPositions().forEach(position => {
                if (player.position.x === position.x && player.position.y === position.y) {
                    player.health--;

                    player.updateHealth(player.id == this.game.id, player.id);
                    
                    if(player.health < 1) {

                        let deletedPlayer = this.game.players.splice(index, 1);
                        this.game.broadcastDeletedPlayer({id: player.id});

                        if (player.id === this.game.id) {
                            document.getElementById("inventory").style.display = "none";
                            document.getElementById("gameOverScreen").style.display = "flex";
                        } else {
                            if (this.game.checkForWinner()) {
                                document.getElementById("inventory").style.display = "none";
                                document.getElementById("youwinscreen").style.display = "flex";
                            } else {
                                document.getElementById(player.id).style.display = "none";
                            }
                        }
                        console.log(deletedPlayer);
                    }
                }
            })
        });

        // delete affected walls
        let indexes = [];
        this.game.walls.forEach((wall, index) => {
            this.getSurroundingPositions().forEach(position => {
                if (wall.position.x === position.x && wall.position.y === position.y && wall.isDestructible === true) {
                    // v = this.game.walls.splice(index, 1, null);
                    indexes.push(index);

                }
            })
        });
        // IMPORTANT! Because .splice() shortens the array, we safe all indexes, which have to be deleted inside of 'let indexes'
        indexes.sort((a, b) => {return b-a}).forEach((index) => {
            let wallId = this.game.walls[index].id;
            let position = this.game.walls[index].position;

            this.game.broadcastDestroyedWall({wallId: wallId});
            // this.socket.emit('deleteWall', {id: this.game.walls[index].id});
            this.game.walls.splice(index, 1);


            if (Math.random() <= 0.3 && !this.remoteBomb) {
                let spoilType = SPOIL_TYPE_LIFE;
                let spoilDetermination = Math.random();

                if (spoilDetermination > 0.66) {
                    spoilType = SPOIL_TYPE_BOMB;
                } else if (spoilDetermination > 0.33) {
                    spoilType = SPOIL_TYPE_RUN;
                }

                console.log("spoil is: ", spoilType);
                
                this.game.broadcastSpoil({position:position, type: spoilType});
                this.game.spoils.push(new Spoil({x: position.x, y: position.y}, spoilType, this.assets, this.gridSize, this.game));
                console.log("Creating spoil with type: ", spoilType);
            } else {
                console.log("Not creating a new spoil at position: ", position);
            }

        });
    }

    // display bomb or fire image
    draw(context) {
        if (!this.isExploded) {
            if (this.game.frameCount % this.animationSpeed === 0) {
                this.currentAnimationState = (this.currentAnimationState + 1) % this.animationSheet.length;
            }
            context.drawImage(
                this.assets['bomb'],
                this.animationSheet[this.currentAnimationState].x,
                0,
                this.spriteSize.bomb.x,
                this.spriteSize.bomb.y,
                this.position.x * this.gridSize,
                this.position.y * this.gridSize,
                this.gridSize,
                this.gridSize,
            )
        } else {
            // draw surrounding fire
            this.getSurroundingPositions().forEach(position => {
                context.drawImage(
                    this.assets['fire'],
                    0,
                    0,
                    this.spriteSize.fire.x,
                    this.spriteSize.fire.y,
                    position.x * this.gridSize,
                    position.y * this.gridSize,
                    this.gridSize,
                    this.gridSize,
                );
                context.globalCompositeOperation='destination-over';

            });

        }
    }


}

