// database/mySqlConnection.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

let dbConfig = {};

if (process.env.DB_ENV === "local") {
  console.log("🌍 Conectando a MySQL LOCAL...");
  dbConfig = {
    database: process.env.MYSQL_DB_LOCAL,
    username: process.env.MYSQL_USER_LOCAL,
    password: process.env.MYSQL_PASSWORD_LOCAL,
    host: process.env.MYSQL_HOST_LOCAL,
    port: process.env.MYSQL_PORT_LOCAL,
  };
} else {
  console.log("☁️ Conectando a MySQL NUBE...");
  dbConfig = {
    database: process.env.MYSQL_DB_REMOTE,
    username: process.env.MYSQL_USER_REMOTE,
    password: process.env.MYSQL_PASSWORD_REMOTE,
    host: process.env.MYSQL_HOST_REMOTE,
    port: process.env.MYSQL_PORT_REMOTE,
  };
}

const bdmysqlNube = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: "mysql",
    logging: false,
  }
);

module.exports = bdmysqlNube;
