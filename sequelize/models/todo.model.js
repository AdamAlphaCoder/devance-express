const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('todo', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    body: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  })
}
