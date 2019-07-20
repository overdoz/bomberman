
//###################################################//
//                                                   //
//          G A M E    S E T T I N G S               //
//                                                   //
//###################################################//


const GAME_WIDTH = 13;
const GAME_HEIGHT = 13;

const AMOUNT_BOMBS = 20;
const AMOUNT_WALLS = 20;
const HEALTH = 1;

const DIRECTIONS = {
    EAST: 'east',
    WEST: 'west',
    SOUTH: 'south',
    NORTH: 'north',
};

const AMOUNT_RANDOM_WALLS = 30;

// TODO: couldn't use import {const, ...} -> maybe require()
const CHANGE_DIRECTION = 'changeDirection';
const MOVE_PLAYER = 'movePlayer';
const PLACE_BOMB = 'placeBomb';
const PLACE_WALL = 'placeWall';
const DELETE_PLAYER = 'deletePlayer';
const DELETE_WALL = 'deleteWall';
const CREATE_PLAYER ='createPlayer';
const CREATE_WALLS = 'createWalls';
const CREATE_SPOIL = 'createSpoil';
const GRAB_SPOIL = 'grabSpoil';
const HURT_PLAYER = 'hurtPlayer';






//###################################################//
//                                                   //
//          S E R V E R    S E T T I N G S           //
//                                                   //
//###################################################//


const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server,{});
const ROOT = '/index.html';
const PORT = 9000;


// serve root folder
app.get('/',function (req,res) {
    res.sendFile(__dirname + ROOT);
});

// serve everything from local
app.use(express.static('.'));


server.listen(PORT, function() {
    console.log("Server is now listening at the PORT: " + PORT);
});






//###################################################//
//                                                   //
//             S T A R T      G A M E                //
//                                                   //
//###################################################//


let positionPlayers = [];
let positionWalls = [];
let spoils = [];

/**
 * generates an unique ID
 * @returns {string}
 */
const generateRandomID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * creates wall objects and stores them in positionWalls array
 * @param amount = amount of walls to be generated
 */
const generateRandomWalls = (amount) => {

    let randomWalls = [];

    // create grid of indestructible walls
    for (let i = 1; i < GAME_WIDTH-1; i += 2) {
        for (let j = 1; j < GAME_HEIGHT-1; j += 2) {
            randomWalls.push({wallId: generateRandomID(), x: i, y: j, isDestructible: false});
        }
    }

    let random = (limit) => {return Math.floor(Math.random() * limit)};

    // create random destructible walls
    for (let i = 0; i < amount; i++) {

        // generate random coordinates every loop
        let atRandomPosition = {x: random(GAME_WIDTH), y: random(GAME_HEIGHT)};

        // if there is already a wall object at this position, add an extra loop
        if (isAlreadyExisting(atRandomPosition)) {
            i--;
        } else {
            // if not, generate an unique ID and push object into positionWalls
            randomWalls.push({wallId: generateRandomID(), x: atRandomPosition.x, y: atRandomPosition.y, isDestructible: true});
        }
    }

    return randomWalls;
};


/**
 * checks if there is already a wall at this position
 * @param position = {x: 45, y: 26}
 * @returns {boolean}
 */
const isAlreadyExisting = (position) => {
    for (let i = 0; i < positionWalls.length; i++) {
        if (position.x === positionWalls[i].x && position.y === positionWalls[i].y) {
            return true;
        }
    }

    // don't render walls at each corner within 3 blocks
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            switch (true) {
                case ((position.x === i) && (position.y === j)):
                    return true;
                case ((position.x === (GAME_WIDTH-1-i)) && (position.y === (GAME_HEIGHT-1-j))):
                    return true;
                case ((position.x === i) && (position.y === (GAME_HEIGHT-1-j))):
                    return true;
                case ((position.x === (GAME_WIDTH-1-i)) && (position.y === j)):
                    return true;
            }
        }
    }
    return false;
};

/**
 * create destructible and indestructible walls after server starts
 * @param amount = number
 */
// generateRandomWalls(AMOUNT_RANDOM_WALLS);






//###################################################//
//                                                   //
//           S O C K E T     C A L L S               //
//                                                   //
//###################################################//


// TODO: check for duplicates @Paula
io.on('connection', function(socket){

    let name = "";

    /**
     * broadcast new player registration after user has pressed the login button
     * @param data = {id: 'MICKEYMOUSE'}
     */
    socket.on('loginPlayer', function (data) {

        // determines where to place each incoming player
        let playerDetails = {
            id: data.id,
            x: 0,
            y: 0,
            direction: DIRECTIONS.EAST,
            amountBombs: AMOUNT_BOMBS,
            amountWalls: AMOUNT_WALLS,
            health: HEALTH,
        };

        // TODO: fix full lobby @Angelos

        switch (positionPlayers.length) {
            case 0:
                positionWalls = generateRandomWalls(AMOUNT_RANDOM_WALLS);
                console.log(playerDetails);
                break;
            case 1:
                playerDetails.x = GAME_WIDTH - 1;
                playerDetails.y = 0;
                playerDetails.direction = DIRECTIONS.SOUTH;
                console.log(playerDetails);
                break;
            case 2:
                playerDetails.x = GAME_WIDTH - 1;
                playerDetails.y = GAME_HEIGHT - 1;
                playerDetails.direction = DIRECTIONS.WEST;
                console.log(playerDetails);
                break;
            case 3:
                playerDetails.x = 0;
                playerDetails.y = GAME_HEIGHT - 1;
                playerDetails.direction = DIRECTIONS.NORTH;
                console.log(playerDetails);
                break;
            default:
                break;
        }

        // store incoming player
        positionPlayers.push(playerDetails);



        // create incoming player
        socket.emit(CREATE_PLAYER, playerDetails);


        // create rest of all currently attending player
        if (positionPlayers.length > 0) {
            for (let i = 0; i < positionPlayers.length - 1; i++) {
                socket.emit(CREATE_PLAYER, positionPlayers[i]);
            }
        }

        // send all wall objects to client
        socket.emit(CREATE_WALLS, [...positionWalls]);

        // notify each client and send them new incoming player
        socket.broadcast.emit(CREATE_PLAYER, playerDetails);
    });

    /**
     * broadcast new direction change to each client
     * @param data = {id: 'SANTACLAUS', direction: this.direction}
     */
    socket.on(CHANGE_DIRECTION, function(data) {
        socket.broadcast.emit(CHANGE_DIRECTION, data);
        positionPlayers.forEach(player => {
            if (player.id === data.id) {
                player.direction = data.direction;
            }
        });

    });

    socket.on('disconnect', function() {
        for (let i = 0; i < positionPlayers.length; i++) {
            if (name === positionPlayers[i].id) {
                positionPlayers.splice(i,1);
                socket.broadcast.emit('timeout', {id: name});
                console.log("JUST KICKED OFF THE PLAYER: " + name);
            }
        }
    });
    socket.on(HURT_PLAYER, function(data) {
        socket.broadcast.emit(HURT_PLAYER, data);
        positionPlayers.forEach(player => {
            if (player.id === data.id) {
                player.health--;
            }
        });

    });

    /**
     * broadcast new player movement to each client
     * @param data = {x: 4, y: 2, id: 'THOR', direction: 'east'}
     */
    socket.on(MOVE_PLAYER, function(data) {
        socket.broadcast.emit(MOVE_PLAYER, data);

        positionPlayers.forEach(player => {
            if (player.id === data.id) {
                player.x = data.x;
                player.y = data.y;
                player.direction = data.direction;


                let spoilIndex = -1;
                let spoil = null;
                for (let i = 0; i < spoils.length; i++) {
                    spoil = spoils[i];

                    if (spoil.position.x === data.x && spoil.position.y === data.y) {
                        spoilIndex = i;
                        break;
                    }
                }

                if (spoilIndex >= 0) {
                    spoils.splice(spoilIndex, 1);
                    socket.broadcast.emit(GRAB_SPOIL, {spoil: spoil, player: player});
                    socket.emit(GRAB_SPOIL, {spoil: spoil, player: player});
                    console.log("A player cought the spoil at: ", spoil.position);
                    
                }

            }
        });

    });


    /**
     * broadcast new bomb object to each client
     * @param data = {x: 4, y: 2}
     */
    socket.on(PLACE_BOMB, function(data) {
        socket.broadcast.emit(PLACE_BOMB, data);
        positionPlayers.forEach(player => {
            if (player.id === data.id) {
                player.amountBombs = data.amountBombs;
                console.log(player)
            }
        })
    });

    /**
     * broadcast new available spoil object to each client
     * @param data = {position: {x: 4, y: 2}, type: "spoil_life"}
     */
    socket.on(CREATE_SPOIL, function(data) {
        socket.broadcast.emit(CREATE_SPOIL, data);

        let spoilDetails = {
            position: data.position,
            type: data.type,
        };

        spoils.push(spoilDetails);

    });


    /**
     * broadcast new wall object to each client
     * @param data = {x: 4, y: 2, id: 'SPIDERMAN'}
     */
    socket.on(PLACE_WALL, function(data) {
        socket.broadcast.emit(PLACE_WALL, data);
        positionPlayers.forEach(player => {
            if (player.id === data.id) {
                player.amountWalls = data.amountWalls;
            }
        });
        positionWalls.push({id: data.wallId, x: data.x, y: data.y, isDestructible: true});
    });


    /**
     * look for index of the player to be deleted based on data.id
     * @param data = {id: 'HULK'}
     */
    socket.on(DELETE_PLAYER, function (data) {
        positionPlayers.forEach((player, i) => {
            if (player.id === data.id) {
                positionPlayers.splice(i, 1);
            }
        });
        socket.broadcast.emit()
    });


    /**
     * look for index of the wall to be deleted based on data.id
     * @param data = {id: 'BATMAN'}
     */
    socket.on(DELETE_WALL, function (data) {
        for (let i = positionWalls.length - 1; i > 0; i--) {
            if (positionWalls[i].wallId === data.wallId) {
                console.log('wall to delete: ', positionWalls[i]);

                positionWalls.splice(i, 1);
            }
        }
    });

    /**
     * Sends reaction to the rest players
     */
    socket.on("reaction", function(data) {
        socket.broadcast.emit('reaction', data);
    });


    // TODO: sync states at server @Thanh
    socket.on('updateHealth', function (playerState) {
        positionPlayers.forEach((player) => {
            if (player.id === playerState.id) {
                player.health = playerState.health;
            }
        });
        socket.broadcast.emit('updateHealth', playerState);
    })

});








