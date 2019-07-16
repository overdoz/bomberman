"use strict";

import Player from './Player.js';
import Wall from './Wall.js';
import Bomb from "./Bomb.js";
import io from "socket.io-client";
import {
    CHANGE_DIRECTION,
    MOVE_PLAYER,
    PLACE_BOMB,
    PLACE_WALL,
    DELETE_WALL,
    CREATE_PLAYER,
    LOGIN_PLAYER,
    CREATE_WALLS,
    DELETE_PLAYER,
    CREATE_SPOIL,
    GRAB_SPOIL,
    SPOIL_TYPE_LIFE,
    SPOIL_TYPE_BOMB,
    SPOIL_TYPE_RUN,
    HURT_PLAYER,
} from "./constant.js";
import Spoil from './Spoil.js';

export default class Game {

    constructor(canvas, width=13, height=13, assets, id) {

        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.assets = assets;

        this.reactionCanvas = document.getElementById('reactionCanvas');
        this.reactionContext = this.reactionCanvas.getContext('2d');




        // ID of your client
        this.id = id;

        this.width = width;
        this.height = height;

        this.frameCount = 0;


        this.gridSize = this.canvas.width / width;


        this.gameOver = false;

        this.bombs = [];
        this.players = [];
        this.walls = [];
        this.spoils = [];

        this.socket = io.connect('http://localhost:9000');

        // send notification to server in order to create your player
        this.socket.emit(LOGIN_PLAYER, { id: this.id });

        // disable input
        document.getElementById("login").disabled = true;
        document.getElementById("lname").disabled = true;

        // set focus on canvas
        document.getElementById("myCanvas").focus();

        // keyboard events
        document.addEventListener("keyup", (e) => {
            if (!this.gameOver) {
                this.movePlayer({id: id, key: e.key})
            }

        });








//###################################################//
//                                                   //
//         S O C K E T    A C T I O N S              //
//                                                   //
//###################################################//

        this.socket.on('reaction', (data) => {
            this.drawReaction(data);
        });

        this.socket.on('timeout', (data) => {
            this.disconnected(data);
        });

        // after logging in your player, the server will send you all generated walls
        this.socket.on(CREATE_WALLS, (data) => {
            data.forEach(d => {
                let pos = {x: d.x, y: d.y};
                this.walls.push(new Wall(pos, 1, d.isDestructible, assets, 40, d.wallId));
            });
        });

        this.socket.on(CREATE_PLAYER, (data) => {
            this.pushPlayer(data);
        });

        this.socket.on(HURT_PLAYER, (data) => {
            this.hurtPlayer(data);
        });

        // receive direction changes
        this.socket.on(CHANGE_DIRECTION, (data) => {
            this.changeDirection(data)
        });

        // receive enemy player movements
        this.socket.on(MOVE_PLAYER, (data) => {
            this.playerMoved(data);
        });

        // player grabbed spoil
        this.socket.on(GRAB_SPOIL, (data) => {
            this.grabbedSpoil(data);
        });

        // receive bombs set by enemies
        // {x: nextPosition.x, y: nextPosition.y, id: randomID, amountWalls: this.amountWalls, amountBombs: this.amountBombs}
        this.socket.on(PLACE_BOMB, (data) => {
            this.getBomb(data);

            try {
                let bomb = document.getElementById(data.id + 'BombText');
                bomb.innerText = data.amountBombs;
            } catch (e) {
                console.log(e.message);
            }
        });

        // receive spoils created by exploding walls
        // {x: nextPosition.x, y: nextPosition.y, id: randomID, amountWalls: this.amountWalls, amountBombs: this.amountBombs}
        this.socket.on(CREATE_SPOIL, (data) => {
            this.getSpoil(data);
        });

        // receive walls set by enemies
        this.socket.on(PLACE_WALL, (data) => {
            console.log('got wall', data);
            this.getWall(data);
            try {
                let wall = document.getElementById(data.id + 'WallText');
                wall.innerText = data.amountWalls;
            } catch (e) {
                console.log(e.message);
            }
        });


        this.socket.on('updateHealth', (data) => {
            let healthIndicator = document.getElementById(data.id + 'HealthText');
            healthIndicator.innerText = data.health;
        });




        // START GAME
        this.startAnimating();
    }





//###################################################//
//                                                   //
//       S O C K E T    B R O A D C A S T            //
//                                                   //
//###################################################//

    broadcastReaction(reaction) {
        this.socket.emit("reaction", {id:this.id, reaction:reaction});
    }

    // evoked by Player.js
    broadcastPosition(position) {
        this.socket.emit(MOVE_PLAYER, position);
    }

    // evoked by Player.js
    broadcastDirection(direction) {
        this.socket.emit(CHANGE_DIRECTION, direction);
    }

    // evoked by Player.js
    // {id: this.id, x: this.position.x, y: this.position.y, amountBombs: this.amountBombs}
    broadcastWall(wall) {
        this.socket.emit(PLACE_WALL, wall);
    }

    // evoked by Player.js
    // {id: this.id, x: this.position.x, y: this.position.y, amountBombs: this.amountBombs}
    broadcastBomb(bomb) {
        this.socket.emit(PLACE_BOMB, bomb);
    }

    broadcastSpoil(spoil) {
        this.socket.emit(CREATE_SPOIL, spoil);
    }

    broadcastDestroyedWall(wall) {
        this.socket.emit(DELETE_WALL, {wallId: wall.wallId});
    }

    broadcastDeletedPlayer(player) {
        this.socket.emit(DELETE_PLAYER, player);
    }


    hurtPlayer(hurtPlayer) {
        if (hurtPlayer.id !== this.id) {
            this.players.forEach(player => {
                if (player.id === hurtPlayer.id) {
                    player.health--;
                    player.updateHealth(hurtPlayer.id === this.id, player.id);
                }
            });
        }
    }







//###################################################//
//                                                   //
//         G A M E     M U T A T I O N S             //
//                                                   //
//###################################################//


    disconnected(data) {
        console.log("-------------------------------------------------------");
        this.players.forEach((player, i) => {
            if (this.players[i].id === data.id) {
                document.getElementById(this.players[i].id).style.display = "none";
                this.players.splice(i, 1);
            }
        });
    }

    /**
     * create new player
     * is being called in App.js whenever socket receives a signal
     * @param data = {id: data.id, x: 0, y: 0, direction: 'east', amountWalls: 99, amountBombs: 99, health: 99}
     */
    pushPlayer(data) {
        // create position of this player
        let position = {x: data.x, y: data.y};

        // we expect, that there is no player with this particular ID (data.id)
        let doesContain = false;

        // checks if there's already a player with this ID
        this.players.forEach(player => {
            if (player.id === data.id) {
                doesContain = true;
            }
        });

        // If there is no player with this particular ID, create new Player
        if (!doesContain) {
            this.players.push(new Player(position, this.assets, 1, data.amountBombs, data.amountWalls, this.gridSize, this, data.id, data.direction));
            this.creatHTMLnode(data);
        }


    }
    /**
     * the player grab the spoil
     * is being called in App.js whenever socket receives a signal
     * check the type of the spoil and update then broadcast it
     * @param data = {id: data.id, x: 0, y: 0, direction: 'east', amountWalls: 99, amountBombs: 99, health: 99}
     */
    grabbedSpoil(data) {
        let spoil = data.spoil;
        let localPlayer = data.player.id === this.id;

        this.players.forEach((player) => {
            if (player.id === data.player.id) {
                if (data.spoil.type === SPOIL_TYPE_BOMB) {
                    console.log("Player gets an extra bomb!");
                    player.updateBombCount(1, localPlayer);
                } else if (data.spoil.type === SPOIL_TYPE_LIFE) {
                    console.log("Player gets an extra life!");
                    player.health++;
                    player.updateHealth(this.id === data.player.id, data.player.id);

                    let playerState = {id: player.id, health: player.health};

                    this.socket.emit('updateHealth', playerState)
                } else if (data.spoil.type === SPOIL_TYPE_RUN) {

                    // TODO: stop running after 30 secs @Sophia
                    console.log("Player becomes faster!");
                    // make player faster

                    if (!player.isARunner && localPlayer) {

                        // TODO
                        document.addEventListener("keydown", (e) => {
                            if (!this.gameOver) {
                                this.movePlayer({id: this.id, key: e.key}, true)
                            }
                        });
                        player.isARunner = true;
                    }
                }
            }
        });

        let removalIndex = -1;

        for (let i = 0; i < this.spoils.length; i++) {
            let pos = this.spoils[i].position;
            if (pos.x === spoil.position.x && pos.y === spoil.position.y) {
                removalIndex = i;
                break;
            }
        }

        if (removalIndex >= 0) {
            this.spoils.splice(removalIndex, 1);
        }
    }


    /**
     * move own player
     * is being called in App.js whenever user presses a key
     * @param data = {id: data.id, x: 0, y: 0, direction: 'east'}
     * @param fastMode type boolean
     */
    movePlayer(data, fastMode) {
        this.players.forEach(player => {
            if (player.id === data.id) {
                player.triggerEvent(data, fastMode);
            }
        });
    }


    /**
     * receive movement from enemy players
     * is being called in App.js whenever socket receives a signal
     * @param data = {id: data.id, x: 0, y: 0, direction: 'east'}
     * TODO: rename method @Thanh
     */
    playerMoved(data) {
        this.players.forEach(player => {
            if (player.id === data.id) {
                player.position.x = data.x;
                player.position.y = data.y;
                player.direction = data.direction;
            }
        });
    }

    checkForWinner() {
        let winner = false;
        if (this.players.length === 1 && this.players[0].id === this.id) {
            winner = true;
        }
        if (winner) {
            this.gameOver = true;
        }
        return winner;
    }


    /**
     * receive direction change from enemy players
     * is being called in App.js whenever socket receives a signal
     * @param data = {id: data.id, x: 0, y: 0, direction: 'east'}
     */
    changeDirection(data) {
        this.players.forEach(player => {
            if (player.id === data.id) {
                player.direction = data.direction;
            }
        })
    }


    /**
     * receive bombs from enemy players
     * is being called in App.js whenever socket receives a signal
     * @param position = {x: 0, y: 0}
     */
    getBomb(position) {
        this.bombs.push(new Bomb(position, 1500, 1, this.assets, this.gridSize, this, true));
    }

    getSpoil(data) {
        this.spoils.push(new Spoil(data.position, data.type, this.assets, this.gridSize, this));
    }

    /**
     * receive walls from enemy players
     * is being called in App.js whenever socket receives a signal
     * @param data = {x: 0, y: 0, id: 'dasr43g4'}
     * TODO: rename method -> receiveWall
     */
    getWall(data) {
        let tempPosition = {x: data.x, y: data.y};
        console.log('Game received wall: ', tempPosition);
        let doesntContains = true;
        this.walls.forEach(wall => {
            if (wall.wallId === data.wallId) {
                doesntContains = false;
            }
        });
        if (doesntContains) {
            this.walls.push(new Wall(tempPosition, 1, true, this.assets, this.gridSize, data.wallId));
        }
    }


    /**
     * render method to display all elements on the game board
     * canvas has to be cleared each render loop
     */
    draw() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.players.forEach(player => {
            player.draw(this.context);
        });

        this.bombs.forEach(bomb => {
            bomb.draw(this.context);
        });

        this.walls.forEach(wall => {
            wall.draw(this.context);
        });

        this.spoils.forEach(spoil => {
            spoil.draw(this.context);
        });

    }

    // TODO: replace with soft emojis @Angelos
    drawReaction(data) {
        switch (data.reaction) {
            case "you_suck":
                document.getElementById("you_suck").style.display = "flex";
                setTimeout(() => {
                    document.getElementById("you_suck").style.display = "none";
                }, 5000);
                break;

            case "finger":
                this.reactionContext.drawImage(this.assets['finger'], 15, 10, 75, 75);
                setTimeout(() => {
                    this.reactionContext.clearRect(0,0, this.reactionCanvas.width, this.reactionCanvas.height);
                }, 4000);
                break;
            case "love":
                this.reactionContext.drawImage(this.assets['love'], 13, 160, 75, 75);
                setTimeout(() => {
                    this.reactionContext.clearRect(0,0, this.reactionCanvas.width, this.reactionCanvas.height);
                }, 4000);
                break;
            case "lol":
                this.reactionContext.drawImage(this.assets['lol'], 20, 290, 65, 75);
                setTimeout(() => {
                    this.reactionContext.clearRect(0,0, this.reactionCanvas.width, this.reactionCanvas.height);
                }, 4000);
                break;
        }

    }


    startAnimating() {
        this.frameTime = 1000 / 30;
        this.then = window.performance.now();
        this.animate(this.then);
    }


    animate(currentTime) {
        window.requestAnimationFrame(this.animate.bind(this));

        const now = currentTime;
        const elapsed = now - this.then;

        if (elapsed > this.frameTime) {
            this.then = now;
            this.draw();
        }
        this.frameCount++;
    }


    /**
     * creates an HTML node every time a player has been created
     * @param data = {id: #344gds, amountBombs: 29, amountWalls: 93}
     * TODO: rename variables & delete node when dead @Thanh
     */
    creatHTMLnode(data) {
        if (this.players.length > 1) {

            let enemyInventory = document.getElementById('inventoryEnemy');
            let container = document.createElement("div");
            container.className = 'playerInfos';
            container.id = data.id;


            let id = document.createElement("p");
            id.innerText = data.id;
            id.id = "nickname";

            // START LIVES

            let img3 = document.createElement("img");
            img3.id = data.id + 'LifeImg';
            img3.src = "images/spoilLife.png";

            let p3Container = document.createElement("div");
            p3Container.className = "countBox";

            let p3 = document.createElement("p");
            p3.id = data.id + 'HealthText';
            p3.innerText = data.health;
            p3Container.appendChild(p3);

            // LIVES END

            let img = document.createElement("img");
            img.id = data.id + 'BombImg';
            img.src = "dist/bomb_icon.png";

            let pContainer = document.createElement("div");
            pContainer.className = "countBox";

            let p = document.createElement("p");
            p.id = data.id + 'BombText';
            p.innerText = data.amountBombs;
            pContainer.appendChild(p);

            let img2 = document.createElement("img");
            img2.id = data.id + 'WallImg';
            img2.src = "dist/wall.png";

            let p2Container = document.createElement("div");
            p2Container.className = "countBox";

            let p2 = document.createElement("p");
            p2.id = data.id + 'WallText';
            p2.innerText = data.amountWalls;
            p2Container.appendChild(p2);


            container.appendChild(id);
            container.appendChild(img3);
            container.appendChild(p3Container);
            container.appendChild(img);
            container.appendChild(pContainer);
            container.appendChild(img2);
            container.appendChild(p2Container);
            enemyInventory.appendChild(container);

        }
    }
}