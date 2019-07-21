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
import Loot from './Loot.js';

export default class Game {

    constructor(canvas, width=13, height=13, assets, id) {

        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');
        this.assets = assets;




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

        this.backgroundMusic = new Audio("/sounds/backgroundMusic.mp4");
        // background music plays when game starts
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();
        this.backgroundMusic.volume = 0.5;
        this.spoilMusic = new Audio("/sounds/spoilMusic.mp4");
        this.spoilMusic.loop = true;


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
        //this.spoilMusic.addEventListener('timeupdate', function () {
            //if (this.spoilMusic.currentTime > Math.round(Number(0) + Number(6)) && !this.paused)  {
               // this.spoilMusic.pause();
           // }
       // });








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
            this.moveEnemy(data);
        });

        // player grabbed spoil
        this.socket.on(GRAB_SPOIL, (data) => {
            this.pickUpItem(data);
        });

        // receive bombs set by enemies
        // {x: nextPosition.x, y: nextPosition.y, id: randomID, amountWalls: this.amountWalls, amountBombs: this.amountBombs}
        this.socket.on(PLACE_BOMB, (data) => {
            this.receiveBomb(data);

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
            this.receiveItem(data);
        });

        // receive walls set by enemies
        this.socket.on(PLACE_WALL, (data) => {
            console.log('got wall', data);
            this.receiveWall(data);
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

        this.socket.on(DELETE_PLAYER, (data) => {
            this.players.forEach((player, index) => {
                if (player.id === data.id) {
                    this.players.splice(index, 1);
                }
            })
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
    pickUpItem(data) {
        let spoil = data.spoil;
        let localPlayer = data.player.id === this.id;

        this.players.forEach((player) => {
            if (player.id === data.player.id) {
                // change the music for the player
                if (!this.backgroundMusic.paused) {
                    this.backgroundMusic.currentTime = 0;
                    this.backgroundMusic.pause();
                    console.log("Background music stopped!");
                    this.spoilMusic.play();
                    console.log("Spoil music is playing!");
                }
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

                        // make the player into a runner by adding key event
                        let eventFunction =  (e) => {
                            if (!this.gameOver) {
                                this.movePlayer({id: this.id, key: e.key}, true)
                            }
                        }

                        document.addEventListener("keydown", eventFunction);
                        player.isARunner = true;

                        // set the runner duration as 30 seconds
                        setTimeout(() => {
                            document.removeEventListener("keydown", eventFunction);
                            player.isARunner = false;
                        }, 30000);
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
     */
    moveEnemy(data) {
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
            this.spoilMusic.pause();
            this.backgroundMusic.pause();
            this.players[0].winnerMusic.play();
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
    receiveBomb(position) {
        this.bombs.push(new Bomb(position, 1500, 2, this.assets, this.gridSize, this, true));
    }

    receiveItem(data) {
        this.spoils.push(new Loot(data.position, data.type, this.assets, this.gridSize, this));
    }

    /**
     * receive walls from enemy players
     * is being called in App.js whenever socket receives a signal
     * @param data = {x: 0, y: 0, id: 'dasr43g4'}
     */
    receiveWall(data) {
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


    drawReaction(data) {
        let chat = document.getElementById('echat');
        let container = document.createElement("div");
        let message = document.createElement("p");
        let name = data.id === this.id ?  'You' : data.id;

        switch (data.reaction) {
            case "you_suck":
                message.innerText = `${name}: 🤬`;
                break;
            case "finger":
                message.innerText = `${name}: 🖕`;
                break;
            case "love":
                message.innerText = `${name}: ❤️`;
                break;
            case "lol":
                message.innerText = `${name}: 😂`;
                break;
            default:
                break;
        }

        message.id = "chat_text";
        container.appendChild(message);
        chat.appendChild(container);
        chat.scrollTop = chat.scrollHeight;
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

            let healthImage = document.createElement("img");
            healthImage.id = data.id + 'LifeImg';
            healthImage.src = "images/spoilLife.png";

            let healthBox = document.createElement("div");
            healthBox.className = "countBox";

            let healthText = document.createElement("p");
            healthText.id = data.id + 'HealthText';
            healthText.innerText = data.health;
            healthBox.appendChild(healthText);

            // LIVES END

            let bombImage = document.createElement("img");
            bombImage.id = data.id + 'BombImg';
            bombImage.src = "dist/bomb_icon.png";

            let bombBox = document.createElement("div");
            bombBox.className = "countBox";

            let bombText = document.createElement("p");
            bombText.id = data.id + 'BombText';
            bombText.innerText = data.amountBombs;
            bombBox.appendChild(bombText);

            let wallImage = document.createElement("img");
            wallImage.id = data.id + 'WallImg';
            wallImage.src = "dist/wall.png";

            let wallBox = document.createElement("div");
            wallBox.className = "countBox";

            let wallText = document.createElement("p");
            wallText.id = data.id + 'WallText';
            wallText.innerText = data.amountWalls;
            wallBox.appendChild(wallText);


            container.appendChild(id);
            container.appendChild(healthImage);
            container.appendChild(healthBox);
            container.appendChild(bombImage);
            container.appendChild(bombBox);
            container.appendChild(wallImage);
            container.appendChild(wallBox);
            enemyInventory.appendChild(container);

        }
    }
}