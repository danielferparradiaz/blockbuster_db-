const Heroe = require("./mySqlHeroes.model");
const Multimedia = require("./multimedia.model");
const Pelicula = require("./pelicula.model");
const Protagonista = require("./protagonista.model");

// 🔹 Relación Heroe <-> Multimedia (N:M)
Heroe.belongsToMany(Multimedia, {
  through: { model: "multimedias_heroe", timestamps: false },
  foreignKey: "heroes_id",
  otherKey: "idmultimedia"
});

Multimedia.belongsToMany(Heroe, {
  through: { model: "multimedias_heroe", timestamps: false },
  foreignKey: "idmultimedia",
  otherKey: "heroes_id"
});

// 🔹 Relación Protagonista <-> Pelicula y Heroe
Protagonista.belongsTo(Heroe, { foreignKey: "heroes_id" });
Protagonista.belongsTo(Pelicula, { foreignKey: "peliculas_id" });

Pelicula.hasMany(Protagonista, { foreignKey: "peliculas_id" });
Heroe.hasMany(Protagonista, { foreignKey: "heroes_id" });

module.exports = { Heroe, Multimedia, Pelicula, Protagonista };
