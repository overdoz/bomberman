
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server,{});

var players = [];
var dir = '/src/start.html';


app.get('/',function (req,res) {
    // console.log("HTTP GET/");
    res.sendFile(__dirname + dir);
});

// app.use('/',express.static(__dirname + 'dist/main.js'));

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/src'));


server.listen(9000, function() {
    console.log("Server is now listening at the PORT: 9000");
});

server.on('upgrade', (req, socket) => {
// Make sure that we only handle WebSocket upgrade requests
    if (req.headers['upgrade'] !== 'websocket') {
        socket.end('HTTP/1.1 400 Bad Request');
        return;
    }
});

server.on('start game', (e) => {
    console.log("Start game !!!");
    players.forEach(player => {
        player.sendFile(__dirname + '/dist/index.html');
    })
});


io.on('connection', function(socket){
    players.push(socket);
    console.log('A user is connected');

    socket.on('disconnect', function() {
        players.splice(socket,1);
    });

    socket.on('start', function() {
        if (players.length >= 1) {
            dir = '/dist/index.html';
            console.log("game starts!!!");
            socket.broadcast.emit("start");
            socket.emit("start");
    }

    });

    socket.on('move', function(direction) {
        console.log("the fucking player moved " + direction.direction);
        socket.broadcast.emit('move', direction);
    })


});



// io.on('send message', function(message) {
//     console.log(message);
// });

