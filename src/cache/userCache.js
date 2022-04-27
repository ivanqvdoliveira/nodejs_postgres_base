const loggedUser = []
const { NotAuthorizedError } = require('../errors/errorTypes')

function addToCache (credential) {
  if(!credential
    || !credential.user
    || !credential.token
    || !credential.expirationDate
  ) {
    throw new NotAuthorizedError()
  }

  loggedUser.push(credential)
}

function removeFromCache (token) {
  let index = loggedUser.findIndex(credential => credential.token === token)

  if(!isNaN(index)) {
    loggedUser.splice(index, 1)
  }
}

function getCredential (user) {
  let credential = loggedUser.find(c => c.user.id === user.id)
  return credential
}

function getCredentialByToken (token) {
  let credential = loggedUser.find((c) => (c.token === token))
  return credential
}

function UpdateExpirationDate (token, expirationDate) {
  let index = loggedUser.findIndex(c => c.token == token)

  if(!isNaN(index)) {
    loggedUser[index].expirationDate = expirationDate
  }
}

module.exports = {
  removeFromCache,
  addToCache,
  getCredential,
  getCredentialByToken,
  UpdateExpirationDate
}

