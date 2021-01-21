var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    let eventName = 'simple chat message';
    let broadcast = (msg) => socket.broadcast.emit(eventName, msg);
    socket.on(eventName, (msg, ackFn) => {
        console.log('message: ' + msg);
        // broadcast to other clients after 1.5 seconds
        setTimeout(broadcast, 1500, msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});