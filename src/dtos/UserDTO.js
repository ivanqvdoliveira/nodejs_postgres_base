const { ErrorInvalidModel } = require("../errors/errorTypes")
const ProfileDTO = require("./ProfileDTO")

module.exports = class UserDTO {
  constructor(obj) {
    obj = obj || {}
    this.id = obj.id
    this.name = obj.name
    this.email = obj.email
    this.password = obj.password
    this.profile = obj.profile && new ProfileDTO(obj.profile)
    this.profileId = obj.profileId
    this.disabledDate = obj.disabledDate
    this.createdAt = obj.createdAt
    this.updatedAt = obj.updatedAt
  }

  validRegisterModel () {
    let validation = !!(this.email &&
      this.password &&
      this.name &&
      this.profileId
    )

    if (!validation) {
      throw new ErrorInvalidModel(400, 'Os campos Nome, Email, Senha e profileId são obrigatórios.')
    }
  }

  validUpdateModel () {
    let validation = !!(this.email &&
      this.id &&
      this.name &&
      this.profileId
    )

    if (!validation) {
      throw new ErrorInvalidModel(400, 'Os campos ID, Nome, Email e profileId são obrigatórios.')
    }
  }
}
