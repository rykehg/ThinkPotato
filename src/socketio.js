import socketio from 'socket.io'

let numUsers = 0;

export default (http, game) => {
  const socket = socketio(http);


    game.subscribe((command) => {
        console.log(`> Emitting ${command.type}`)
        socket.emit(command.type, command)
    })

    socket.on('connection', (socket) => {
        let addedUser = false
        
        const playerId = socket.id
        // when the client emits 'add user', this listens and executes
        socket.on('add user', (username) => {
            if (addedUser) return

            // we store the username in the socket session for this client
            if(username){
                socket.username = username
                numUsers++
                addedUser = true
                socket.emit('login', {
                    numUsers: numUsers
                })
                console.log(`> Player connected: ${playerId} ${username}`)
            
                game.addPlayer({ playerId: playerId, playerName: username })
            }
            if (numUsers === 1){
                game.start()
            }
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('user joined', {
                username: socket.username,
                numUsers: numUsers
            })
        })

        socket.emit('setup', game.state)

        socket.on('disconnect', () => {
            game.removePlayer({ playerId: playerId })
            numUsers--
            console.log(`> Player disconnected: ${playerId}`)
        })

        socket.on('move-player', (command) => {
            command.playerId = playerId
            command.type = 'move-player'
            
            game.movePlayer(command)
        })
    })
  
}