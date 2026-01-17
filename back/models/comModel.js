const Comments = sequelize.define("comments",{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})