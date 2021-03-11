import express from 'express'
import http from 'http'
import createGame from '../public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const socket = socketio(server)

app.use(express.static('public'))

const game = createGame()
game.start()

game.subscribe((command) => {
    console.log(`> Emitting ${command.type}`)
    socket.emit(command.type, command)
})

let numUsers = 0;

socket.on('connection', (socket) => {
    let addedUser = false;
    
    const playerId = socket.id
    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        if(username){
            socket.username = username;
            ++numUsers;
            addedUser = true;
            socket.emit('login', {
                numUsers: numUsers
            });
            console.log(`> Player connected: ${playerId}`)
        
            game.addPlayer({ playerId: playerId, playerName: username })
        }
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({ playerId: playerId })
        console.log(`> Player disconnected: ${playerId}`)
    })

    socket.on('move-player', (command) => {
        command.playerId = playerId
        command.type = 'move-player'
        
        game.movePlayer(command)
    })
})

server.listen(process.env.PORT || 3333, () => {
    console.log(`> Server listening on port: 3333`)
})