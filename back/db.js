const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Art", "postgres", "Svorgan1305)", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});

module.exports = sequelize;
