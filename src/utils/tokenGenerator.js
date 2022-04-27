const md5 = require('md5')
const SECRET = 'vaiCorinthians'

function generatePasswordHash (senha) {
  return md5(`@${senha}:${SECRET}@`)
}

function createToken (usuario) {
  let base64Email = Buffer.from(usuario.email).toString('base64')
  let date = new Date()
  return md5(`${base64Email}.${SECRET}.${date.getTime()}`)
}

function generateExpirationDate () {
  let date = new Date()
  let duration = process.env.DURACAO_TOKEN * 60000
  return new Date(date.getTime() + duration)
}

module.exports = {
  generatePasswordHash,
  createToken,
  generateExpirationDate
}
