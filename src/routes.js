import express from 'express'

const routes = express.Router()

// Routes
routes.get('/', function(req, res) {
  res.sendFile('/public/home/index.html', { root: '.' })
})
routes.get('/fruitGame', function(req, res) {
  res.send('/public/fruitGame/', { root: '.' })
})

export default routes