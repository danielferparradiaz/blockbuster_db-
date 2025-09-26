const { DataTypes } = require("sequelize");
const bdmysqlNube = require("../database/mySqlConnection");
const Heroe = require("../models/mySqlHeroes.model");
const Pelicula = require("./Pelicula.model");

const Protagonista = bdmysqlNube.define("Protagonista", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  papel: DataTypes.TEXT,
  fecha_participacion: DataTypes.DATE,
  heroes_id: {
    type: DataTypes.INTEGER,
    references: { model: Heroe, key: "id" }
  },
  peliculas_id: {
    type: DataTypes.INTEGER,
    references: { model: Pelicula, key: "id" }
  }
}, {
  tableName: "protagonistas",
  timestamps: false
});

// Relaciones
Heroe.hasMany(Protagonista, { foreignKey: "heroes_id" });
Protagonista.belongsTo(Heroe, { foreignKey: "heroes_id" });

Pelicula.hasMany(Protagonista, { foreignKey: "peliculas_id" });
Protagonista.belongsTo(Pelicula, { foreignKey: "peliculas_id" });

module.exports = Protagonista;
