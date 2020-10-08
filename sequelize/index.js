const { Sequelize } = require('sequelize')
const { applyExtraSetup } = require('./extra-setup')

const sequelize = new Sequelize(
  process.env.SEQUELIZE_DATABASE,
  process.env.SEQUELIZE_USER,
  process.env.SEQUELIZE_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    dialect: process.env.SEQUELIZE_DIALECT
  }
)

const modelDefiners = [
  require('./models/user.model'),
  require('./models/todo.model')
  // Add more models here...
]

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize)
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize)

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize
