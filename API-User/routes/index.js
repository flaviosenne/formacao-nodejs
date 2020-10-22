const {Router} = require('express')

const HomeController = require('../controllers/HomeController')
const UserController = require('../controllers/UserController')

const routes = Router()

routes.get('/', HomeController.index)

routes.post('/user', UserController.create)
routes.get('/user', UserController.index)
routes.get('/user/:id', UserController.findUser)
routes.put('/user/:id', UserController.updateUser)
routes.delete('/user/:id', UserController.delete)

module.exports = routes