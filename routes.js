const express = require('express')
const routes = express.Router()
const userService = require('./src/services/userService')

const UserController = require('./src/controllers/UserController')
const userController = new UserController()

routes.use(async (req, res, next) => {
  if (process.env.AUTENTICACAO === 'TRUE') {
    const { authorization } = req.headers
    let autenticado = await userService.authValidation(authorization)
    if (!autenticado && req.originalUrl !== '/login') {
      return res.status(401).json({
        status: 401,
        message: 'Usuário não autenticado',
        name: 'NaoAutorizado'
      })
    }
  }

  next()
})

routes.post("/login", userController.login)
routes.post("/register", userController.registerUser)
routes.delete("/logout", userController.logout)
routes.get("/user/:id", userController.getUserById)
routes.put('/user/:id', userController.updateUser)

module.exports = routes
