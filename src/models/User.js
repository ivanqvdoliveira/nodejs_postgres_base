const { Model, DataTypes} = require('sequelize')

class Usuario extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
      profileId: DataTypes.BIGINT,
      disabledDate: DataTypes.DATE
    }, {
      sequelize: connection,
      schema: 'public',
      tableName: 'users',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      timestamps: true,
      underscored: false
    })
  }
}

module.exports = Usuario;
