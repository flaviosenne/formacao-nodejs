const routes = require('express').Router()
const { UserController} = require('./controllers/UserController')

const userController = new UserController()

routes.get('/', (req, res) => {
    res.json({})
})

routes.post("/users", userController.save)
routes.delete("/users/:email", userController.delete)
routes.post("/auth", userController.login)

module.exports = {routes}