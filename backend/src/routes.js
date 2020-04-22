const { Router } = require('express')

const routes = Router()

const SessionsController = require('./controllers/SessionsController')

routes.get('/', (req, res) => {
  return res.json({ message: 'Testing' })
})

routes.post('/sessions', SessionsController.create)

module.exports = routes
