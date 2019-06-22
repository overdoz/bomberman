const GAME_WIDTH = 13;
const GAME_HEIGHT = 13;

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server,{});


let positionPlayers = [];
let positionBombs = [];
let positionWalls = [];
var dir = '/index.html';



app.get('/',function (req,res) {
    // console.log("HTTP GET/");
    res.sendFile(__dirname + dir);
});

// app.use('/',express.static(__dirname + 'dist/main.js'));
app.use(express.static('.'));


server.listen(9000, function() {
    console.log("Server is now listening at the PORT: 9000");
});

/*server.on('upgrade', (req, socket) => {
// Make sure that we only handle WebSocket upgrade requests
    if (req.headers['upgrade'] !== 'websocket') {
        socket.end('HTTP/1.1 400 Bad Request');
        return;
    }
});*/

const generateRandomWalls = (amount) => {
    // create grid of indestructible walls
    for (let i = 1; i < GAME_WIDTH; i += 2) {
        for (let j = 1; j < GAME_HEIGHT; j += 2) {
            positionWalls.push({x: i, y: j, isDestructible: false});
        }
    }

    // create random destructible walls
    let random = (limit) => {return Math.floor(Math.random() * limit)};
    for (let i = 0; i < amount; i++) {
        let atRandomPosition = {x: random(GAME_WIDTH), y: random(GAME_HEIGHT)};

        if (isAlreadyExisting(atRandomPosition)) {
            i--;
        } else {
            positionWalls.push({x: atRandomPosition.x, y: atRandomPosition.y, isDestructible: true});
        }
    }
}

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

generateRandomWalls(30);


io.on('connection', function(socket){

    socket.on('loginPlayer', function (data) {

        let playerDetails = {id: data.id, x: 0, y: 0, direction: 'east'}
        switch (positionPlayers.length) {
            case 0:
                positionPlayers.push(playerDetails);
                socket.emit('createNewPlayer', playerDetails);
                socket.emit('createWalls', [...positionWalls]);

                socket.broadcast.emit('createNewPlayer', playerDetails);

                break;
            case 1:
                playerDetails = {id: data.id, x: GAME_WIDTH - 1, y: 0, direction: 'south'}
                positionPlayers.push(playerDetails);
                socket.emit('createNewPlayer', playerDetails);
                socket.emit('createNewPlayer', positionPlayers[0]);


                socket.emit('createWalls', [...positionWalls]);
                socket.broadcast.emit('createNewPlayer', playerDetails);


                break;
            case 2:
                playerDetails = {id: data.id, x: GAME_WIDTH - 1, y: GAME_HEIGHT - 1, direction: 'west'}
                positionPlayers.push(playerDetails);
                socket.emit('createNewPlayer', playerDetails);
                socket.emit('createNewPlayer', positionPlayers[0]);
                socket.emit('createNewPlayer', positionPlayers[1]);


                socket.emit('createWalls', [...positionWalls]);
                socket.broadcast.emit('createNewPlayer', playerDetails);


                break;
            case 3:
                playerDetails = {id: data.id, x: 0, y: GAME_HEIGHT - 1, direction: 'north'}
                positionPlayers.push(playerDetails);
                socket.emit('createNewPlayer', playerDetails);
                socket.broadcast.emit('createNewPlayer', playerDetails);
                break;
            default:
                return;
        }
    });


    socket.on('changeDirection', function(data) {
        socket.broadcast.emit('changeDirection', data);
    });



    socket.on('playerMoved', function(data) {
        socket.broadcast.emit('playerMoved', data);
    });


    socket.on('setBomb', function(data) {
        socket.broadcast.emit('getBomb', data);
    });

    socket.on('setWall', function(data) {
        socket.broadcast.emit('getWall', data);
    });

});








