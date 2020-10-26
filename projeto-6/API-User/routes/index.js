const {Router} = require('express')

const HomeController = require('../controllers/HomeController')
const UserController = require('../controllers/UserController')
const auth = require('../middleware/AdminAuth')
const routes = Router()

routes.get('/', HomeController.index)

routes.post('/user', UserController.create)
routes.get('/user', auth, UserController.index)
routes.get('/user/:id', UserController.findUser)
routes.put('/user/:id', UserController.updateUser)
routes.delete('/user/:id', UserController.delete)

routes.post('/recover-password', UserController.recoveryPassword)
routes.post('/change-password', UserController.changePassword)
routes.post('/login', UserController.login)
module.exports = routes