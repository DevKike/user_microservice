const { Sequelize } = require("sequelize");
const { DATABASE } = require("../config/config");
const setupModel = require("./setupModel");

const { dbUser, dbPassword, dbHost, dbName, dbPort } = DATABASE;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "mysql",
});

setupModel(sequelize);

module.exports = sequelize;