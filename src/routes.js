import express from 'express'

const routes = express.Router()

// Routes
routes.get('/henriqueGaeta', function(req, res) {
  res.sendFile('/public/henriqueGaeta/index.html', { root: '.' })
})
routes.get('/fruitGame', function(req, res) {
  res.send('/public/fruitGame/', { root: '.' })
})
routes.get('/brunoGalvao', function(req, res) {
  res.send('/public/bruno/', { root: '.' })
})

export default routes