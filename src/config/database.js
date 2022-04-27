let environment = undefined

switch (process.env.PUBLICAR) {
  case 'HLG':
    environment = configHLG()
    break;
  case 'PROD':
    environment = configPROD()
    break;
  default :
    environment = configLOCAL()
}

function configHLG () {
  return {
    dialect: process.env.HLG_DIALECT,
    host: process.env.HLG_HOST,
    port: process.env.HLG_PORT,
    username: process.env.HLG_USER_NAME,
    password: process.env.HLG_PASSWORD,
    database: process.env.HLG_DATABASE,
    define: {
      timestamps: true,
      underscored: true,
    }
  }
}

function configPROD () {
  return {
    dialect: process.env.PROD_DIALECT,
    host: process.env.PROD_HOST,
    port: process.env.PROD_PORT,
    username: process.env.PROD_USER_NAME,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DATABASE,
    define: {
      timestamps: true,
      underscored: true,
    }
  }
}

function configLOCAL () {
  return {
    dialect: process.env.LOCAL_DIALECT,
    host: process.env.LOCAL_HOST,
    port: process.env.LOCAL_PORT,
    username: process.env.LOCAL_USER_NAME,
    password: process.env.LOCAL_PASSWORD,
    database: process.env.LOCAL_DATABASE,
    define: {
      timestamps: true,
      underscored: true,
    }
  }
}

module.exports = environment
