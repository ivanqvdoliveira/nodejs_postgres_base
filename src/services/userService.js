const User = require('../models/User')
const Profile = require('../models/Profile')
const { NotAuthorizedError, NotFoundError, ApplicationError } = require('../errors/errorTypes')
const tokenGenerator = require('../utils/tokenGenerator')
const userCache = require('../cache/userCache')
const UserDTO = require('../dtos/UserDTO')
const ProfileDTO = require('../dtos/ProfileDTO')

async function userValidate(email, password){
  email = email.toString().toLowerCase();
    let user = await User.findOne({ where: { email }});
  password = tokenGenerator.generatePasswordHash(password)

  if(!user || (user.password !== password)){
    throw new NotAuthorizedError(401, "Usuário ou senha inválidos");
  }

  let credential = _createCredential(user)

  return credential
}

async function logout (token) {
  userCache.removeFromCache(token)
}

async function getUserById (id) {
  let user = await User.findByPk(id)

  if(!user) {
    throw new NotFoundError(404, `Não foi possível encontrar o usuário pelo ID ${id}`)
  }

  user.senha = undefined
  let userDTO = new UserDTO(user)
  let profile = await Profile.findByPk(user.profileId)
  userDTO.profile = new ProfileDTO(profile)

  return userDTO
}

async function authValidation (token) {
  let credential = userCache.getCredentialByToken(token)
  if (!credential || credential.expirationDate < new Date()) {
    if (credential) {
      userCache.removeFromCache(credential.token)
    }
    return false
  }

  return true
}

async function registerUser (userDTO) {
  userDTO.password = tokenGenerator.generatePasswordHash(userDTO.password)

  let user = await User.create(userDTO)

  if (!user) {
    throw new ApplicationError(500, 'Falha ao cadastrar o user')
  }

  let dto = new UserDTO(user)
  dto.password = undefined
  dto.profile = new ProfileDTO(await Profile.findByPk(dto.profileId))
  return dto
}

async function updateUser (userDTO) {
  let user = await User.findByPk(userDTO.id)

  if(!user) {
    throw new NotFoundError(404, `Não foi possível encontrar o usuário pelo ID ${id}`)
  }
  userDTO.senha = user.senha

  user = await User.update(userDTO, {where: { id: userDTO.id}})

  if (!user || !user[0]) {
    throw new ApplicationError(500, `Falha ao atualizar o user com id ${userDTO.id}`)
  }

  userDTO.senha = undefined
  return new UserDTO(userDTO)
}

function _createCredential (user) {

  let expirationDate = tokenGenerator.generateExpirationDate()
  let credential = userCache.getCredential(user)

  if(credential) {
    if(credential.expirationDate < new Date()) {
      userCache.removeFromCache(credential.token)
    } else {
      userCache.UpdateExpirationDate(credential.token, expirationDate)
      return credential
    }
  }

  let token = tokenGenerator.createToken(user)
  user.password = undefined
  credential = {token, user, expirationDate}
  userCache.addToCache(credential)

  return credential
}

module.exports = {
  userValidate,
  logout,
  getUserById,
  authValidation,
  registerUser,
  updateUser
}
