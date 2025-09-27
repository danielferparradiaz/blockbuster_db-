const Heroe = require("./mySqlHeroes.model");
const Multimedia = require("./multimedia.model");
const Pelicula = require("./pelicula.model");
const Protagonista = require("./protagonista.model");
const MultimediasHeroe = require("./multimediasHeroe.model");


Heroe.belongsToMany(Multimedia, {
  through: MultimediasHeroe,
  as: "multimedias",           
  foreignKey: "heroes_id",
  otherKey: "multimedia_id"
});

Multimedia.belongsToMany(Heroe, {
  through: MultimediasHeroe,
  as: "heroes",                 
  foreignKey: "multimedia_id",
  otherKey: "heroes_id"
});

// 🔹 Relación Protagonista <-> Pelicula y Heroe
Protagonista.belongsTo(Heroe, { foreignKey: "heroes_id" });
Protagonista.belongsTo(Pelicula, { foreignKey: "peliculas_id" });

Pelicula.hasMany(Protagonista, { foreignKey: "peliculas_id" });
Heroe.hasMany(Protagonista, { foreignKey: "heroes_id" });

module.exports = { Heroe, Multimedia, Pelicula, Protagonista };
