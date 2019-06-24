const GAME_WIDTH = 13;
const GAME_HEIGHT = 13;

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server,{});


let positionPlayers = [];
let positionWalls = [];
let dir = '/index.html';



app.get('/',function (req,res) {
    // console.log("HTTP GET/");
    res.sendFile(__dirname + dir);
});

// app.use('/',express.static(__dirname + 'dist/main.js'));
app.use(express.static('.'));


server.listen(9000, function() {
    console.log("Server is now listening at the PORT: 9000");
});


const generateRandomWalls = (amount) => {

    // create grid of indestructible walls
    for (let i = 1; i < GAME_WIDTH; i += 2) {
        for (let j = 1; j < GAME_HEIGHT; j += 2) {
            let randomID = '_' + Math.random().toString(36).substr(2, 9);
            positionWalls.push({id: randomID, x: i, y: j, isDestructible: false});
        }
    }

    // create random destructible walls
    let random = (limit) => {return Math.floor(Math.random() * limit)};
    for (let i = 0; i < amount; i++) {
        let atRandomPosition = {x: random(GAME_WIDTH), y: random(GAME_HEIGHT)};

        if (isAlreadyExisting(atRandomPosition)) {
            i--;
        } else {
            let randomID = '_' + Math.random().toString(36).substr(2, 9);
            positionWalls.push({id: randomID, x: atRandomPosition.x, y: atRandomPosition.y, isDestructible: true});
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
                socket.emit('createNewPlayer', positionPlayers[0]);
                socket.emit('createNewPlayer', positionPlayers[1]);
                socket.emit('createNewPlayer', positionPlayers[2]);

                socket.emit('createWalls', [...positionWalls]);
                socket.broadcast.emit('createNewPlayer', playerDetails);
                break;

            default:
                return;
        }
    });

    /**
     * @param data = {id: this.id, direction: this.direction}
     */
    socket.on('changeDirection', function(data) {
        socket.broadcast.emit('changeDirection', data);
    });

   socket.on('reset', function (data) {
       positionPlayers = [];
   })

    /**
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
        console.log('[server] position changed: ',data);

    });

    /**
     * @param data = {x: 4, y: 2}
     */
    socket.on('setBomb', function(data) {
        socket.broadcast.emit('getBomb', data);
    });

    /**
     * @param data = {x: 4, y: 2, id: 'h28fkf#'}
     */
    socket.on('setWall', function(data) {
        socket.broadcast.emit('getWall', data);
        positionWalls.push({id: data.id, x: data.x, y: data.y, isDestructible: true});
    });

    /**
     * @param data = {id: 'playerID''}
     */
    socket.on('deletePlayer', function (data) {
        // index of the player to be deleted
        let index = positionPlayers.map(player => {return player.id}).indexOf(data.id);

        // delete player at index
        let player = positionPlayers.splice(index, 1);
    });

    /**
     * @param data = {id: '#fhs7fi''}
     */
    socket.on('deleteWall', function (data) {
        // index of the wall to be deleted
        let index = positionWalls.map(wall => {return wall.id}).indexOf(data.id);

        // delete wall at index
        let wall = positionWalls.splice(index, 1);
    })

});








