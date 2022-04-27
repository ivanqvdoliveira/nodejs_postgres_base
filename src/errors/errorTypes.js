const ErrorInvalidModel = class ErrorInvalidModel {

  /**
   * Classe utilizada para exceções de modelos e dtos
   * @param {Number} status 
   * @param {String} message 
   */

  constructor(status, message) {
    this.status = status || 400
    this.message = message || 'O Modelo informado é inválido'
    this.name = 'ErrorInvalidModel'
    this.stack = (new Error()).stack
  }
}

const NotAuthorizedError = class NotAuthorizedError {
  /**
   * Classe utilizada para exceções de acessos ou recursos não autorizados
   * @param {Number} status 
   * @param {String} message 
   */

  constructor(status, message) {
    this.status = status || 403
    this.message = message || 'Recurso não autorizado'
    this.name = 'NotAuthorizedError'
    this.stack = (new Error()).stack
  }
}

const NotFoundError = class NotFoundError {
  /**
   * Classe utilizada para exceções de objetos ou recusos nao encontrados
   * @param {Number} status 
   * @param {String} message 
   */

  constructor(status, message) {
    this.status = status || 404
    this.message = message || 'Não Encontrado'
    this.name = 'NotFoundError'
    this.stack = (new Error()).stack
  }
}

const ApplicationError = class ApplicationError {
  /**
   * Classe utilizada para exceções de modelos e dtos
   * @param {Number} status 
   * @param {String} message 
   */

  constructor(status, message) {
    this.status = status || 500
    this.message = `Erro interno na aplicação ${ message && '- ' + message }`
    this.name = 'ApplicationError'
    this.stack = (new Error()).stack
  }
}

module.exports = {
  ErrorInvalidModel,
  NotAuthorizedError,
  NotFoundError,
  ApplicationError
}
