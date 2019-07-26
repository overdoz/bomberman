import Element from './Element.js';
import Loot from './Loot.js';

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


        this.bombMusic = new Audio("/sounds/bombMusic.mp3");

        this.spriteSize = {
            bomb: {
                x: 40,
                y: 40,
            },
            fire: {
                x: 40,
                y: 40,
            }
        };

        this.currentAnimationState = 0;

        this.animationSpeed = 20;

        this.animationSheet = [
            {x: 0, y: 0},
            {x: 40, y: 0},
            {x: 2 * 40, y: 0},
            {x: 3 * 40, y: 0},
            {x: 4 * 40, y: 0},

        ];

        // bomb destroys itself after being created
        setTimeout(() => {
            this.animateExplosion();
        }, this.timeToExplode)
    }

    animateExplosion() {
        this.bombMusic.play();
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

        let positionsHorizontal = [
            {x: this.position.x+1, y: this.position.y},
            {x: this.position.x-1, y: this.position.y},
        ];

        let positionsVertical = [
            {x: this.position.x, y: this.position.y+1},
            {x: this.position.x, y: this.position.y-1},
        ];

        let horizontalCollision = false;
        let verticalCollision = false;

        for (let i = 0; i < this.game.walls.length; i++) {
            for (let j = 0; j < positionsHorizontal.length; j++) {
                if (this.game.walls[i].position.x === positionsHorizontal[j].x && this.game.walls[i].position.y === positionsHorizontal[j].y && this.game.walls[i].isDestructible === false) {
                    horizontalCollision = true;
                }
            }
            for (let j = 0; j < positionsVertical.length; j++) {
                if (this.game.walls[i].position.x === positionsVertical[j].x && this.game.walls[i].position.y === positionsVertical[j].y && this.game.walls[i].isDestructible === false) {
                    verticalCollision = true;
                }
            }
        }

        if (horizontalCollision) {
            for (let i = (-this.radius); i < this.radius+1; i++) {
                positions.push({x: this.position.x, y: (this.position.y + i)})
            }
        } else if (verticalCollision) {
            for (let i = (-this.radius); i < this.radius+1; i++) {
                positions.push({x: (this.position.x + i), y: this.position.y})
            }
        } else {
            for (let i = (-this.radius); i < this.radius+1; i++) {
                positions.push({x: this.position.x, y: (this.position.y + i)})
            }
            for (let i = (-this.radius); i < this.radius+1; i++) {
                if (i === 0) { continue; }
                positions.push({x: (this.position.x + i), y: this.position.y})
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

        this.game.bombs = this.game.bombs.filter(bomb => bomb.ID !== this.ID);

        // delete affected players
        this.game.players.forEach((player, index) => {

            // compare with positions of fire animation
            this.getSurroundingPositions().forEach(position => {

                // if explosion position matches player position
                if (player.position.x === position.x && player.position.y === position.y) {

                    // if the player is still alive, then plays died music for the player
                    if(player.health >= 1){
                        player.diedMusic.play();
                    }

                    // decrease player health
                    player.health--;

                    // update DOM
                    player.updateHealth(player.id === this.game.id, player.id);

                    // if player is dead
                    if(player.health < 1) {

                        // play loser music for the player
                        player.game.backgroundMusic.pause();
                        player.game.spoilMusic.pause();
                        player.loserMusic.play();
                        console.log("Loser music is playing!");


                        // broadcast deleted player
                        this.game.broadcastDeletedPlayer({id: player.id});
                        this.game.deletePlayer({id: player.id});

                        // hide enemy inventory
                        try {
                            document.getElementById(player.id).style.display = "none";
                        } catch (e) {
                            console.log(e);
                        }

        
                        if (this.game.checkForWinner()) {
                            // show winner notification
                            try {
                                document.getElementById("youwinscreen").style.display = "flex";
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    }
                }
            })
        });



        // delete affected walls
        let indexes = [];
        this.game.walls.forEach((wall, index) => {
            this.getSurroundingPositions().forEach(position => {
                if (wall.position.x === position.x && wall.position.y === position.y && wall.isDestructible === true) {
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
                let lootType = SPOIL_TYPE_LIFE;
                let spoilDetermination = Math.random();

                if (spoilDetermination > 0.66) {
                    lootType = SPOIL_TYPE_BOMB;
                } else if (spoilDetermination > 0.33) {
                    lootType = SPOIL_TYPE_RUN;
                }

                console.log("spoil is: ", lootType);
                
                this.game.broadcastSpoil({position:position, type: lootType});
                this.game.items.push(new Loot({x: position.x, y: position.y}, lootType, this.assets, this.gridSize, this.game));
                console.log("Creating spoil with type: ", lootType);
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

