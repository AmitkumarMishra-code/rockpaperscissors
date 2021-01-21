const io = require("socket.io-client");
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// write your code here
rl.question("What is your name?\n> ", (name) => {
    const socket = io('http://127.0.0.1:3000')
    socket.on('connect', () => message(socket, name,'Successfully connected to server'))
    socket.on('disconnect', () => message(socket, name, 'Connection lost...'))
    socket.on('simple chat message', (incoming) => message(socket, name, incoming))
})
function message(socket, name, displayMessage){
    console.log(displayMessage)
    rl.question("> ", (msg)=> {
        socket.emit("simple chat message", name + ' says: ' + '"' + msg + '"')
        message(socket, name, 'Sending Message : "' + msg + '"');
    })
}



