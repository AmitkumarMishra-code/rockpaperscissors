var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const winCondition = {
    'rock': { win: 'scissor', lose: 'paper' },
    'scissor': { win: 'paper', lose: 'rock' },
    'paper': { win: 'rock', lose: 'scissor' }
}

const admin = require('firebase-admin');            // https://firebase.google.com/docs/firestore
var serviceAccount = require("./rockpaperscissors-35744-firebase-adminsdk-gqcn3-b4a5bc82e1.json");          // unique authorization key for database
const date = new Date()

const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount)
};

// Initialize Firebase
admin.initializeApp(firebaseConfig);
const db = admin.firestore();
let rpsChatRef;

let gameId = 0;
let users = []

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    let eventName = 'game input';
    socket.on(eventName, (msg, ackFn) => {
        let choice = msg.slice(msg.lastIndexOf(' ') + 1)
        users.push([socket.id, msg, choice])
        if (users.length == 2) {
            checkGameStatus(users)
            // sending game status message to both players
            io.to(users[0][0]).emit(eventName, users[1][1] + ". " + users[0][3])
            io.to(users[1][0]).emit(eventName, users[0][1] + ". " + users[1][3])
            
            // setting up our database parameters
            rpsChatRef = db.collection('rpschat').doc('GameNum' + gameId + "-" + getIdentifier())
            storeData(users)
            console.log("game id = " + gameId)
            users = []                          // emptying the users array for next round of game
            gameId++
        }
    });
});

// function to determine game status. Win/Lose or Draw
function checkGameStatus(users) {
    if (users[0][2] == users[1][2]) {
        users[0].push('Draw')
        users[1].push('Draw')
    }
    else {
        // storing win/lose message for each player
        users[0].push(winCondition[users[0][2]]['lose'] == users[1][2] ? "You Lose :(" : "You Win :)")
        users[1].push(winCondition[users[1][2]]['lose'] == users[0][2] ? "You Lose :(" : "You Win :)")
    }
}


// Function to store game data to Firebase Firestore db
async function storeData(users) {
    // slicing the name of both players
    let playerOne = users[0][1].slice(0, users[0][1].indexOf(' '))
    let playerTwo = users[1][1].slice(0, users[1][1].indexOf(' '))
    
    // sending data to database
    await rpsChatRef.set({
        id: gameId,
        player1: { name: playerOne, choice: users[0][2] },
        player2: { name: playerTwo, choice: users[1][2] },
        status: users[0][3] == 'Draw' ? "Draw" : users[0][3].includes('Win') ? playerOne + " wins" : playerTwo + " wins"
    }).then(() => (console.log('success')), (reason) => console.log('fail - ' + reason))
}

// function to make a unique time code to our document name, this helps avoid any potential rewrite of our data
function getIdentifier() {
    return "" + date.getDate() + date.getMonth() + 1 + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds()
}

http.listen(3000, () => {
    console.log('listening on *:3000');
});
