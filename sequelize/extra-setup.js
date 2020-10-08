function applyExtraSetup (sequelize) {
  const { todo, user } = sequelize.models

  user.hasMany(todo, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
  todo.belongsTo(user, {
    foreignKey: { allowNull: false },
    onDelete: 'CASCADE'
  })
}

module.exports = { applyExtraSetup }
