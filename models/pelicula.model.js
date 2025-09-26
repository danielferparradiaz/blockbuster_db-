const { DataTypes } = require("sequelize");
const bdmysqlNube = require("../database/mySqlConnection");

const Pelicula = bdmysqlNube.define("Pelicula", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(100)
  }
}, {
  tableName: "peliculas",
  timestamps: false
});

module.exports = Pelicula;
