const mongoose = require("mongoose");

const ProtagonistaSchema = new mongoose.Schema(
  {
    papel: { type: String, maxlength: 50 },
    fecha_participacion: { type: Date },
    heroe: { type: mongoose.Schema.Types.ObjectId, ref: "Heroe", required: true },
    pelicula: { type: mongoose.Schema.Types.ObjectId, ref: "Pelicula", required: true }
  },
  {
    collection: "protagonistas",
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("Protagonista", ProtagonistaSchema);
