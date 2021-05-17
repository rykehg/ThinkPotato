import express from 'express'

const routes = express.Router()

// Routes
routes.get('/', function(req, res) {
  res.sendFile('/public/home/index.html', { root: '.' })
})
routes.get('/fruitGame', function(req, res) {
  res.send('/public/fruitGame/', { root: '.' })
})

routes.get('/a31ecc0596d72f84e5ee403ddcacb3dea94ce0803fc9e6dc2eca1', function(req, res) {
  res.send('/public/fruitGame/game-admin.html', { root: '.' })
})
export default routes