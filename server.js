const GAME_WIDTH = 13;
const GAME_HEIGHT = 13;

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server,{});


let positionPlayers = [];
let positionWalls = [];
let dir = '/index.html';

// serve root folder
app.get('/',function (req,res) {
    res.sendFile(__dirname + dir);
});

// serve everything from local
app.use(express.static('.'));


server.listen(9000, function() {
    console.log("Server is now listening at the PORT: 9000");
});

/**
 * creates wall objects and stores them in positionWalls array
 * @param amount = amount of walls to be generated
 */
const generateRandomWalls = (amount) => {

    // create grid of indestructible walls
    for (let i = 1; i < GAME_WIDTH-1; i += 2) {
        for (let j = 1; j < GAME_HEIGHT-1; j += 2) {
            // unique ID
            let randomID = '_' + Math.random().toString(36).substr(2, 9);
            positionWalls.push({id: randomID, x: i, y: j, isDestructible: false});
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
            let randomID = '_' + Math.random().toString(36).substr(2, 9);
            positionWalls.push({id: randomID, x: atRandomPosition.x, y: atRandomPosition.y, isDestructible: true});
        }
    }
}


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
    };
    return false;
}

/**
 * create destructible and indestructible walls after server starts
 * @param amount = number
 */
generateRandomWalls(30);


io.on('connection', function(socket){

    // after user pressed the login button
    socket.on('loginPlayer', function (data) {

        // determines where to place each incoming player
        let playerDetails = {id: data.id, x: 0, y: 0, direction: 'east'}
        switch (positionPlayers.length) {
            case 0:
                break;
            case 1:
                playerDetails = {id: data.id, x: GAME_WIDTH - 1, y: 0, direction: 'south'}
                break;
            case 2:
                playerDetails = {id: data.id, x: GAME_WIDTH - 1, y: GAME_HEIGHT - 1, direction: 'west'}
                break;
            case 3:
                playerDetails = {id: data.id, x: 0, y: GAME_HEIGHT - 1, direction: 'north'}
                break;
            default:
                break;
        };

        // store incoming player
        positionPlayers.push(playerDetails);

        // create all currently attending player
        if (positionPlayers.length > 0) {
            for (let i = 0; i < positionPlayers.length; i++) {
                socket.emit('createNewPlayer', positionPlayers[i]);
            }
        }

        // send all wall objects to client
        socket.emit('createWalls', [...positionWalls]);

        // notify each client and create new player
        socket.broadcast.emit('createNewPlayer', playerDetails);
    });


    /**
     * broadcast new direction change to each client
     * @param data = {id: this.id, direction: this.direction}
     */
    socket.on('changeDirection', function(data) {
        socket.broadcast.emit('directionChanged', data);
        positionPlayers.forEach(player => {
            if (player.id === data.id) {
                player.direction = data.direction;
            }
        });
    });


    /**
     * broadcast new player movement to each client
     * @param data = {x: 4, y: 2, id: randomID, direction: 'east'}
     */
    socket.on('movePlayer', function(data) {
        socket.broadcast.emit('playerMoved', data);
        positionPlayers.forEach(player => {
            if (player.id === data.id) {
                player.x = data.x;
                player.y = data.y;
                player.direction = data.direction;
            }
        });

    });


    /**
     * broadcast new bomb object to each client
     * @param data = {x: 4, y: 2}
     */
    socket.on('setBomb', function(data) {
        socket.broadcast.emit('getBomb', data);
    });


    /**
     * broadcast new wall object to each client
     * @param data = {x: 4, y: 2, id: 'h28fkf#'}
     */
    socket.on('setWall', function(data) {
        socket.broadcast.emit('getWall', data);
        positionWalls.push({id: data.id, x: data.x, y: data.y, isDestructible: true});
    });


    /**
     * look for index of the player to be deleted based on data.id
     * @param data = {id: 'playerID''}
     */
    socket.on('deletePlayer', function (data) {
        for (let i = positionPlayers.length - 1; i > 0; i--) {
            if (positionPlayers[i].id === data.id) {
                positionPlayers.splice(i, 1);
            }
        }
    });


    /**
     * look for index of the wall to be deleted based on data.id
     * @param data = {id: '#fhs7fi''}
     */
    socket.on('deleteWall', function (data) {
        for (let i = positionWalls.length - 1; i > 0; i--) {
            if (positionWalls[i].id === data.id) {
                console.log('wall to delete: ', positionWalls[i]);
                console.log(positionWalls.length);
                positionWalls.splice(i, 1);
            }
        }
    });

});








