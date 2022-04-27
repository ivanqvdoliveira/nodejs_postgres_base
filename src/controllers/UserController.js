const userService = require('../services/userService')
const { NotAuthorizedError, ErrorInvalidModel } = require('../errors/errorTypes');
const UserDTO = require('../dtos/UserDTO');

class UserController {
  async login (req, res) {
    const { email, password } = req.body
    try {
      if (!email || !password) {
        throw new NotAuthorizedError(401, 'Usuário ou senha inválidos')
      }

      let credential = await userService.userValidate(email, password);
      return res.json(credential)

    } catch (error) {
      console.log(error)
      return res.status(error.status).json(error)
    }
  }

  async logout (req, res) {
    try {
      await userService.logout(req.headers.authorization)
    } catch (error) {
      console.log(error)
      return res.status(error.status).json(error)
    }
  }

  async getUserById (req, res) {
    const { id } = req.params
    try {
      if (!id) {
        throw new ErrorInvalidModel(400, 'O ID é obrigatório para obter o usuário')
      }

      let usuario = await userService.getUserById(id)
      return res.json(usuario)
    } catch (error) {
      console.log(error)
      return res.status(error.status).json(error)
    }
  }

  async registerUser (req, res) {
    try {
      let userDTO = new UserDTO(req.body)
      userDTO.validRegisterModel()

      let usuarioCadastrado = await userService.registerUser(userDTO)
      return res.json(usuarioCadastrado)

    } catch (error) {
      console.log(error)
      return res.status(error.status).json(error)
    }
  }

  async updateUser (req, res) {
    const { id } = req.params

    try {
      if (!id) {
        throw new ErrorInvalidModel(400, 'O ID é obrigatório para atualizar o usuário')
      }

      let userDTO = new UserDTO(req.body)
      userDTO.id = parseInt(id)
      userDTO.validUpdateModel()

      let usuarioAtualizado = await userService.updateUser(userDTO)
      return res.json(usuarioAtualizado)

    } catch (error) {
      console.log(error)
      return res.status(error.status).json(error)
    }
  }
}

module.exports = UserController
