const Sequelize = require("sequelize");
const sequelize = require("../db.js");

const Article = sequelize.define("article", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

const Comments = sequelize.define("comments", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Article.hasMany(Comments);

sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));

module.exports = {Article, Comments};

