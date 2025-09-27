const { DataTypes } = require("sequelize");
const bdmysqlNube = require("../database/mySqlConnection");

const Protagonista = bdmysqlNube.define("Protagonista", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  papel: {
    type: DataTypes.STRING(50)
  },
  fecha_participacion: {
    type: DataTypes.DATE
  },
  heroes_id: {
    type: DataTypes.INTEGER
  },
  peliculas_id: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: "protagonistas",
  timestamps: false
});

module.exports = Protagonista;
