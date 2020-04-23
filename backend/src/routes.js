const { Router } = require('express')

const routes = Router()

const SessionsController = require('./controllers/SessionsController')
const AdminController = require('./controllers/AdminController')
const MenuController = require('./controllers/MenuController')
const middleware = require('./middlewares/auth')
const { Joi, Segments, celebrate } = require('celebrate')

routes.get('/', (req, res) => {
  return res.json({ message: 'Testing' })
})

routes.post('/sessions', SessionsController.create)
routes.post('/admins', AdminController.create)
routes.put('/admins', middleware, AdminController.update)

routes.get('/menu/item', MenuController.index)
routes.post('/menu/item', middleware, celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    img_url: Joi.string().required(),
    price: Joi.number().required()
  })
}), MenuController.create)

routes.put('/menu/item/:id', middleware, celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    img_url: Joi.string().required(),
    price: Joi.number().required()
  })
}), MenuController.update)

routes.delete('/menu/item/:id', middleware, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
}), MenuController.delete)
module.exports = routes
