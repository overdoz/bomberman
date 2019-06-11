const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server,{});


app.get('/',function (req,res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/',express.static(__dirname + '/'));

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

io.on('connection', function(socket){
    console.log('A user is connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on("send message", function(sent_msg, callback) {
        sent_msg = "[ " + "an active user" + " ]: " + sent_msg;
        io.sockets.emit("update messages", sent_msg);
        callback();
    });
    socket.on("update messages", function(msg){
        var final_message = $("<p />").text(msg);
        $("#history").append(final_message);
    });

});



io.on('send message', function(message) {
    console.log(message);
});

