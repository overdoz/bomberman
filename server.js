
//###################################################//
//                                                   //
//          G A M E    S E T T I N G S               //
//                                                   //
//###################################################//


const GAME_WIDTH = 13;
const GAME_HEIGHT = 13;

const AMOUNT_RANDOM_WALLS = 55;
const AMOUNT_BOMBS = 30;
const AMOUNT_WALLS = 20;
const HEALTH = 2;

const DIRECTIONS = {
    EAST: 'east',
    WEST: 'west',
    SOUTH: 'south',
    NORTH: 'north',
};

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
const UPDATE_INVENTORY = 'updateInventory';
const REACTION = 'reaction';
const TIMEOUT = 'timeout';






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
let server_overload = false;
let name = "";

/**
 * generates an unique ID
 * @returns {string}
 */
const generateRandomID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * creates wall objects and returns them
 * @param amount = amount of walls to be generated
 * @returns [walls]
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
 * @param position = {x: NUMBER, y: NUMBER}
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
                default:
                    break;
            }
        }
    }
    return false;
};






//###################################################//
//                                                   //
//           S O C K E T     C A L L S               //
//                                                   //
//###################################################//


// TODO: check for duplicates @Paula
io.on('connection', function(socket){

    // let name = "";

    /**
     * broadcast new player registration after user has pressed the login button
     * @param data = {id: STRING}
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

        // The id name of the player that was connected. Used to kick out
        // the player of the server at: "disconnect"
        name = data.id;

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
                check_server();
        }

        if ((!server_overload) && isNameUnique(name)) {


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

        }
    });

    /**
     * broadcast new direction change to each client
     * @param data = {id: STRING, direction: STRING}
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
        positionPlayers = positionPlayers.filter(player => player.id !== name);
        socket.broadcast.emit(DELETE_PLAYER, {id: name});

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
     * @param data = {id: STRING, x: NUMBER, y: NUMBER, direction: STRING}
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
     * @param data = {id: STRING, x: NUMBER, y: NUMBER, amountBombs: NUMBER}
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
     * @param data = {position: {x: NUMBER, y: NUMBER}, type: "spoil_life"}
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
     * @param data = {id: STRING, wallId: STRING, x: NUMBER, y: NUMBER, amountWalls: NUMBER}
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
     * @param data = {id: STRING}
     */
    socket.on(DELETE_PLAYER, function (data) {
        positionPlayers = positionPlayers.filter(player => player.id !== data.id);
        socket.broadcast.emit(DELETE_PLAYER, data);
    });


    /**
     * look for index of the wall to be deleted based on data.id
     * @param data = {id: STRING}
     */
    socket.on(DELETE_WALL, function (data) {
        positionWalls = positionWalls.filter(wall => wall.wallId !== data.wallId);
    });

    /**
     * Sends reaction to the rest players
     */
    socket.on(REACTION, function(data) {
        socket.broadcast.emit(REACTION, data);
    });

    /**
     * update player inventory
     * @param data = {id: STRING, amountWalls: NUMBER, amountBombs: NUMBER, health: NUMBER}
     */
    socket.on(UPDATE_INVENTORY, function (data) {
        socket.broadcast.emit(UPDATE_INVENTORY, data);
        positionPlayers.forEach(player => {
            if (player.id === data.id) {
                player.amountBombs = data.amountBombs;
                player.amountWalls = data.amountWalls;
                player.health = data.health;
            }
        });
    });

});

/**
 * Checks if the server has reached its maximum
 * capacity
 */
function check_server() {
    server_overload = positionPlayers.length >= 4;
    console.log("checks server .. and is full === " + server_overload);
}


/**
 * Checks if name that wants to join already exists in positionPlayers array
 */
function isNameUnique(name) {

    for (let i = 0; i < positionPlayers.length; i++) {
        if (positionPlayers[i].id === name) {
            return false;
        }
    }
    return true;

}
