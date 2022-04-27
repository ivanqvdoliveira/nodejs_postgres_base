const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const connection = new Sequelize(dbConfig)

const Profile = require('../models/Profile')
const User = require('../models/User')

Profile.init(connection)
User.init(connection)

module.exports = connection
