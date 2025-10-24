const mongoose = require("mongoose");

const PeliculaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
}, {
  collection: "peliculas",
  versionKey: false,
  timestamps: false
});

module.exports = mongoose.model("Pelicula", PeliculaSchema);
