import createGame from '../../public/shared/fruitGame.js'
import socket from '../socketio.js'

export default (server) => {
  const game = createGame()

  socket(server, game)
}