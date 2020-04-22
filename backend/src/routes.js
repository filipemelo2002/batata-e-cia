const { Router } = require('express')

const routes = Router()

const SessionsController = require('./controllers/SessionsController')
const AdminController = require('./controllers/AdminController')

routes.get('/', (req, res) => {
  return res.json({ message: 'Testing' })
})

routes.post('/sessions', SessionsController.create)
routes.post('/admins', AdminController.create)

module.exports = routes
